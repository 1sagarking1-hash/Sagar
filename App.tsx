
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TournamentCard from './components/TournamentCard';
import AIStrategyChat from './components/AIStrategyChat';
import Wallet from './components/Wallet';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';
import Leaderboard from './components/Leaderboard';
import { INITIAL_TOURNAMENTS } from './constants';
import { Tournament, TournamentStatus, AdminSettings, User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    upiId: 'booyah.gaming@ybl',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=booyah.gaming@ybl&pn=Booyah%20Tournaments&cu=INR',
    announcement: '🔥 Grand S1 Tournament registrations are now OPEN! Join for ₹50,000 prize pool!',
    isMaintenance: false
  });

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('booyah_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('booyah_current_user', JSON.stringify(user));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('booyah_current_user');
    setActiveTab('dashboard');
  };

  const handleJoinTournament = (tournamentId: string, fee: number) => {
    if (!currentUser) return;

    // Deduct balance
    const updatedUser = { ...currentUser, balance: currentUser.balance - fee };
    setCurrentUser(updatedUser);
    localStorage.setItem('booyah_current_user', JSON.stringify(updatedUser));

    // Update tournaments in local users store too if you had one, 
    // but for now let's just update the local state.
    setTournaments(prev => prev.map(t => {
      if (t.id === tournamentId) {
        return { ...t, registeredTeams: Math.min(t.maxTeams, t.registeredTeams + 1) };
      }
      return t;
    }));

    // Alert success (could be a nice toast later)
    alert(`Successfully registered for the tournament! ₹${fee} has been deducted.`);
  };

  const filteredTournaments = tournaments.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Tournaments Played', value: '24', icon: 'fa-trophy', color: 'text-orange-500' },
    { label: 'Wallet Balance', value: `₹${currentUser?.balance.toFixed(2) || '0.00'}`, icon: 'fa-wallet', color: 'text-green-500' },
    { label: 'Rank', value: 'Grandmaster', icon: 'fa-medal', color: 'text-blue-500' },
    { label: 'K/D Ratio', value: '4.8', icon: 'fa-skull', color: 'text-red-500' },
  ];

  // If not logged in, show Auth screen
  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  const isAdmin = currentUser.role === 'admin';

  if (adminSettings.isMaintenance && !isAdmin) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-8">
        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border border-red-500/30 animate-pulse">
           <i className="fa-solid fa-gears text-4xl text-red-500"></i>
        </div>
        <h1 className="text-3xl font-gaming font-bold mb-4">Under Maintenance</h1>
        <p className="text-slate-400 max-w-md mx-auto">We are updating our anti-cheat and tournament servers. We will be back online shortly, survivor!</p>
        <button onClick={handleLogout} className="mt-8 text-[10px] text-slate-800 uppercase font-bold tracking-widest hover:text-slate-600">Logout</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={currentUser} onLogout={handleLogout} />
      
      <main className="flex-1 overflow-y-auto relative">
        {/* Global Admin Announcement */}
        {adminSettings.announcement && (
          <div className="bg-indigo-600/10 border-b border-indigo-500/20 py-2 overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee hover:pause cursor-default">
              <span className="text-xs font-bold text-indigo-400 px-4 flex items-center gap-2">
                <i className="fa-solid fa-bullhorn"></i>
                {adminSettings.announcement}
              </span>
            </div>
          </div>
        )}

        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full w-full max-w-md">
            <i className="fa-solid fa-magnifying-glass text-slate-500"></i>
            <input 
              type="text" 
              placeholder="Search tournaments..."
              className="bg-transparent border-none focus:outline-none text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <div className="bg-indigo-600/10 border border-indigo-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-indigo-500 text-xs"></i>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Admin Mode</span>
              </div>
            )}
            <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>
            <button 
              onClick={() => setActiveTab('wallet')}
              className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:border-orange-500 transition-all"
            >
              <i className="fa-solid fa-wallet text-orange-500"></i>
              ₹{currentUser.balance.toFixed(2)}
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-8">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center gap-4 shadow-lg">
                    <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl ${stat.color}`}>
                      <i className={`fa-solid ${stat.icon}`}></i>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xl font-gaming font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-2xl font-gaming font-bold flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-orange-600 rounded-full"></span>
                    Live Matches
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {tournaments.slice(0, 4).map(t => (
                      <TournamentCard 
                        key={t.id} 
                        tournament={t} 
                        onView={() => {}} 
                        user={currentUser} 
                        onJoinSuccess={handleJoinTournament} 
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-8">
                  <AIStrategyChat />
                </div>
              </div>
            </>
          )}

          {activeTab === 'tournaments' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTournaments.map(t => (
                <TournamentCard 
                  key={t.id} 
                  tournament={t} 
                  onView={() => {}} 
                  user={currentUser} 
                  onJoinSuccess={handleJoinTournament} 
                />
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <Leaderboard />
          )}

          {activeTab === 'wallet' && (
            <Wallet adminSettings={adminSettings} />
          )}

          {activeTab === 'admin-dashboard' && isAdmin && (
            <div className="max-w-6xl mx-auto">
               <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-gaming font-bold text-white flex items-center gap-4">
                    <i className="fa-solid fa-toolbox text-indigo-500"></i>
                    Web Control Panel
                  </h1>
                  <div className="flex gap-2">
                    <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl text-xs font-bold text-indigo-400">
                      System Status: Stable
                    </div>
                  </div>
               </div>
               <AdminPanel 
                tournaments={tournaments} 
                setTournaments={setTournaments} 
                adminSettings={adminSettings} 
                setAdminSettings={setAdminSettings} 
               />
            </div>
          )}

          {activeTab === 'admin-settings' && isAdmin && (
            <div className="max-w-6xl mx-auto">
              <AdminPanel 
                tournaments={tournaments} 
                setTournaments={setTournaments} 
                adminSettings={adminSettings} 
                setAdminSettings={setAdminSettings} 
               />
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="max-w-4xl mx-auto">
               <AIStrategyChat />
            </div>
          )}
        </div>
      </main>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default App;
