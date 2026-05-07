import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold tracking-tighter group-hover:bg-blue-700 transition">
                SP
              </div>
              <span className="font-semibold text-xl tracking-tight text-gray-900">SaaSPlatform</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Features</Link>
            <Link to="/#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Pricing</Link>
            <Link to="/#faq" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">FAQ</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition flex items-center gap-1">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-600 transition rounded-md hover:bg-gray-50">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">Log in</Link>
                <Link to="/signup" className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
          
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg px-4 py-6 flex flex-col gap-4">
          <Link to="/#features" className="text-base font-medium text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
          <Link to="/#pricing" className="text-base font-medium text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/#faq" className="text-base font-medium text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          <div className="h-px bg-gray-100 w-full my-2"></div>
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-base font-medium text-gray-700 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-base font-medium text-red-600 flex items-center gap-2 text-left">
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" className="w-full text-center text-sm font-medium text-gray-700 border border-gray-200 py-2.5 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link to="/signup" className="w-full text-center text-sm font-medium bg-gray-900 text-white py-2.5 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
