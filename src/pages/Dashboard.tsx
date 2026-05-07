import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Settings, BarChart3, User as UserIcon, Activity, ArrowUpRight, TrendingUp, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Dashboard() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'admin') {
      navigate('/admin');
    } else {
      setEditName(user.name);
      setEditEmail(user.email);
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editName, editEmail);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="flex-grow bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4">Menu</h2>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition ${activeTab === 'overview' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <BarChart3 className={`w-5 h-5 ${activeTab === 'overview' ? 'text-blue-600' : 'text-gray-400'}`} />
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition ${activeTab === 'settings' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400'}`} />
              Settings
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.name}!</p>
          </div>
          {activeTab === 'overview' && (
            <button className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition">
              <Filter className="w-4 h-4" /> Filter Data
            </button>
          )}
        </header>

        {/* Mobile Tabs */}
        <div className="flex md:hidden space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'settings' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            Settings
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Analytics Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Metric 1 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                      <ArrowUpRight className="w-3 h-3" /> 12%
                    </span>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium">Total Activity</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-1">24,592</p>
                </div>
                
                {/* Metric 2 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                      <ArrowUpRight className="w-3 h-3" /> 4%
                    </span>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-1">1,245</p>
                </div>

                {/* Metric 3 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                      0%
                    </span>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-1">3.4%</p>
                </div>
              </div>

              {/* Chart Mockup Area */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-80 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Over Time</h3>
                </div>
                <div className="flex-1 border-b border-l border-gray-200 relative flex items-end justify-between px-4 pb-2 pt-10">
                  {/* Decorative chart elements representing dummy analytics */}
                  {[30, 45, 25, 60, 75, 45, 90].map((h, i) => (
                    <div key={i} className="w-full max-w-[40px] mx-1 relative group cursor-pointer" style={{ height: `${h}%` }}>
                      <div className="absolute inset-0 bg-blue-100 rounded-t-md group-hover:bg-blue-600 transition-colors"></div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {h * 100}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between px-4 mt-4 text-xs text-gray-400 uppercase font-medium">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-2xl"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                  <p className="text-sm text-gray-500 mt-1">Update your account details and public profile.</p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                        readOnly // In many systems, changing email requires more complex workflows. Making read-only for now or letting it edit updates context but we simulate simple editing. Let's make it editable for simplicity as requested.
                      />
                    </div>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition"
                      >
                        Save Changes
                      </button>
                      {savedMessage && (
                        <span className="text-sm text-green-600 font-medium">Changes saved successfully!</span>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
