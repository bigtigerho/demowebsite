import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<{success: boolean, requiresEmailConfirmation?: boolean}>;
  logout: () => Promise<void>;
  updateProfile: (name: string, email: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check active sessions and sets the user
    const loggedInAdmin = localStorage.getItem('currentUser');
    if (loggedInAdmin) {
      const parsedUser = JSON.parse(loggedInAdmin);
      if (parsedUser.role === 'admin') {
        setUser(parsedUser);
        return;
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          role: 'user'
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          role: 'user'
        });
      } else if (!localStorage.getItem('currentUser')) {
        // Only clear if not admin
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUsers = (): User[] => {
    const usersStr = localStorage.getItem('users');
    return usersStr ? JSON.parse(usersStr) : [];
  };

  const login = async (email: string, password: string, isAdmin: boolean = false): Promise<boolean> => {
    if (isAdmin) {
      if (email === 'admin' && password === 'admin123') {
        const adminUser: User = { id: 'admin', email: 'admin@saas.com', name: 'Admin', role: 'admin' };
        setUser(adminUser);
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        setError(null);
        return true;
      }
      setError('Invalid admin credentials.');
      return false;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{success: boolean, requiresEmailConfirmation?: boolean}> => {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      return { success: false };
    }

    // Keep saving to localStorage mainly so the mock Admin has something to view 
    // since Supabase doesn't easily let clients list all auth users.
    const users = getUsers();
    if (!users.some(u => u.email === email)) {
       users.push({ id: data.user?.id || Date.now().toString(), email, name, role: 'user' });
       localStorage.setItem('users', JSON.stringify(users));
    }
    
    setError(null);
    return { 
      success: true, 
      requiresEmailConfirmation: data.session === null 
    };
  };

  const logout = async () => {
    if (user?.role === 'admin') {
      setUser(null);
      localStorage.removeItem('currentUser');
      return;
    }
    
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (name: string, email: string) => {
    if (!user) return;
    
    if (user.role === 'admin') {
      const updatedUser: User = { ...user, name, email };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      email,
      data: { name }
    });

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setUser({ ...user, name, email });
    
    // Update local storage representation too
    const users = getUsers();
    const updatedUsers = users.map(u => u.id === user.id ? { ...u, name, email } : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const clearError = React.useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
