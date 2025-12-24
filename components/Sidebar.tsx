
import React, { useState } from 'react';
import { User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user, onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    { id: 'dashboard', icon: 'fa-house', label: 'Dashboard' },
    { id: 'tournaments', icon: 'fa-trophy', label: 'Tournaments' },
    { id: 'leaderboard', icon: 'fa-ranking-star', label: 'Leaderboard' },
    { id: 'wallet', icon: 'fa-wallet', label: 'My Wallet' },
    { id: 'strategy', icon: 'fa-brain', label: 'AI Strategy' },
  ];

  const adminItems = [
    { id: 'admin-dashboard', icon: 'fa-user-shield', label: 'Admin Panel' },
    { id: 'admin-settings', icon: 'fa-gears', label: 'Payments Config' },
  ];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <>
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-gaming font-bold text-orange-500 flex items-center gap-2">
            <i className="fa-solid fa-fire-flame-curved"></i>
            BOOYAH
          </h1>
        </div>
        
        <div className="px-4 py-2">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest px-4 mb-2">Player Menu</p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-6`}></i>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {isAdmin && (
          <div className="px-4 py-6">
            <p className="text-[10px] text-orange-500/70 uppercase font-bold tracking-widest px-4 mb-2">Management</p>
            <nav className="space-y-1">
              {adminItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} w-6`}></i>
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}

        <div className="mt-auto p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700">
                  <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user?.username}</p>
                <p className="text-[10px] text-green-400 font-bold">Balance: ₹{user?.balance.toFixed(2)}</p>
              </div>
            </div>
            <button 
              onClick={handleLogoutClick}
              className="w-full py-2 bg-slate-900/50 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-power-off"></i>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <i className="fa-solid fa-right-from-bracket text-2xl"></i>
              </div>
              <h3 className="text-2xl font-gaming font-bold text-white">Exit Battleground?</h3>
              <p className="text-slate-400 text-sm">Are you sure you want to logout from your Booyah account?</p>
              
              <div className="flex flex-col gap-3 mt-8">
                <button 
                  onClick={confirmLogout}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-900/20 transition-all"
                >
                  Logout Now
                </button>
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
