import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate sending email (in a real app, this would call an API)
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
      >
        {!submitted ? (
          <>
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                Reset your password
              </h2>
              <p className="mt-3 text-center text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3.5 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-md"
              >
                Send reset link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 text-green-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
              Check your email
            </h2>
            <p className="text-gray-600 mb-8 mx-auto max-w-sm">
              We've sent a password reset link to <span className="font-medium text-gray-900">{email}</span>. 
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 underline"
            >
              Didn't receive it? Try again.
            </button>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100 flex justify-center">
          <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            <ArrowLeft className="w-4 h-4" /> Back to log in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
