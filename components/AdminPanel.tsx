
import React, { useState } from 'react';
import { Tournament, MapType, TournamentStatus, AdminSettings, User } from '../types';

interface AdminPanelProps {
  tournaments: Tournament[];
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>;
  adminSettings: AdminSettings;
  setAdminSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ tournaments, setTournaments, adminSettings, setAdminSettings }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'tournaments' | 'payments' | 'users' | 'config'>('overview');
  const [newT, setNewT] = useState<Partial<Tournament>>({
    title: '',
    map: MapType.BERMUDA,
    entryFee: '0',
    prizePool: '0',
    status: TournamentStatus.UPCOMING,
    maxTeams: 48,
    registeredTeams: 0
  });

  // Mock data for Admin Dashboard
  const adminStats = [
    { label: 'Total Revenue', value: '₹1,24,500', icon: 'fa-indian-rupee-sign', color: 'text-green-500' },
    { label: 'Active Players', value: '1,402', icon: 'fa-users', color: 'text-blue-500' },
    { label: 'Pending Payouts', value: '₹12,000', icon: 'fa-clock', color: 'text-yellow-500' },
    { label: 'App Load', value: 'Low', icon: 'fa-server', color: 'text-indigo-500' },
  ];

  const handleAddTournament = () => {
    if (!newT.title) return;
    const t: Tournament = {
      ...newT as Tournament,
      id: Math.random().toString(),
      description: 'Newly created tournament by Admin.',
      startDate: new Date().toISOString().split('T')[0],
      organizer: 'Admin',
      banner: 'https://picsum.photos/seed/' + Math.random() + '/800/400'
    };
    setTournaments([t, ...tournaments]);
    setNewT({ title: '', map: MapType.BERMUDA, entryFee: '0', prizePool: '0', status: TournamentStatus.UPCOMING, maxTeams: 48, registeredTeams: 0 });
    setActiveSubTab('tournaments');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
      {/* Admin Sub-Sidebar */}
      <div className="lg:w-64 flex flex-col gap-2">
        <button 
          onClick={() => setActiveSubTab('overview')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <i className="fa-solid fa-chart-line w-5"></i> Dashboard
        </button>
        <button 
          onClick={() => setActiveSubTab('tournaments')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'tournaments' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <i className="fa-solid fa-trophy w-5"></i> Tournaments
        </button>
        <button 
          onClick={() => setActiveSubTab('payments')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'payments' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <i className="fa-solid fa-credit-card w-5"></i> Payment Hub
        </button>
        <button 
          onClick={() => setActiveSubTab('users')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <i className="fa-solid fa-user-group w-5"></i> User Base
        </button>
        <button 
          onClick={() => setActiveSubTab('config')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'config' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <i className="fa-solid fa-gears w-5"></i> App Settings
        </button>
      </div>

      {/* Main Admin Content */}
      <div className="flex-1 space-y-6">
        
        {activeSubTab === 'overview' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {adminStats.map((stat, i) => (
                <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-gaming font-black text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl ${stat.color}`}>
                    <i className={`fa-solid ${stat.icon}`}></i>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h4 className="font-gaming font-bold text-sm mb-4 text-indigo-400">Server Status</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">CPU Usage</span>
                    <span className="text-white font-mono">14%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[14%] h-full bg-green-500"></div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Memory</span>
                    <span className="text-white font-mono">2.4GB / 8GB</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[30%] h-full bg-blue-500"></div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                 <h4 className="font-gaming font-bold text-sm mb-4 text-indigo-400">Recent Logs</h4>
                 <div className="space-y-3">
                   <div className="flex items-center gap-3 text-xs border-b border-slate-800 pb-2">
                     <span className="text-green-500 font-bold">DEPOSIT</span>
                     <span className="text-slate-400 flex-1">User #9283 deposited ₹500</span>
                     <span className="text-slate-600">2m ago</span>
                   </div>
                   <div className="flex items-center gap-3 text-xs border-b border-slate-800 pb-2">
                     <span className="text-blue-500 font-bold">JOIN</span>
                     <span className="text-slate-400 flex-1">Team Hydra joined Elite Cup</span>
                     <span className="text-slate-600">5m ago</span>
                   </div>
                   <div className="flex items-center gap-3 text-xs">
                     <span className="text-orange-500 font-bold">ADMIN</span>
                     <span className="text-slate-400 flex-1">Updated UPI ID to booyah@ybl</span>
                     <span className="text-slate-600">12m ago</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'tournaments' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
              <h3 className="text-xl font-gaming font-bold mb-6 text-white flex items-center gap-2">
                <i className="fa-solid fa-plus-circle text-indigo-500"></i>
                Deploy New Tournament
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Tournament Name</label>
                  <input 
                    placeholder="e.g. Pro Battle S1" 
                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-indigo-500 outline-none transition-all text-sm"
                    value={newT.title}
                    onChange={e => setNewT({...newT, title: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Map Selection</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-indigo-500 outline-none text-sm"
                    value={newT.map}
                    onChange={e => setNewT({...newT, map: e.target.value as MapType})}
                  >
                    {Object.values(MapType).map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Prize Pool</label>
                  <input 
                    placeholder="₹5000" 
                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-indigo-500 outline-none text-sm"
                    value={newT.prizePool}
                    onChange={e => setNewT({...newT, prizePool: e.target.value})}
                  />
                </div>
                <button 
                  onClick={handleAddTournament}
                  className="lg:col-span-3 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/40 mt-2"
                >
                  <i className="fa-solid fa-rocket mr-2"></i> Launch Live Tournament
                </button>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-4 bg-slate-800/30 border-b border-slate-800 flex items-center justify-between">
                <h4 className="font-gaming font-bold text-xs uppercase tracking-widest text-slate-400">Active Registry</h4>
                <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded font-bold">{tournaments.length} Events</span>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-950/50 text-[10px] uppercase font-bold text-slate-600 tracking-tighter">
                  <tr>
                    <th className="p-4">Tournament Detail</th>
                    <th className="p-4">Map</th>
                    <th className="p-4">Registration</th>
                    <th className="p-4 text-right">Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {tournaments.map(t => (
                    <tr key={t.id} className="hover:bg-indigo-600/5 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-sm text-white">{t.title}</p>
                        <p className="text-[10px] text-slate-500">ID: {t.id.slice(0,8)}</p>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-indigo-400 font-bold bg-indigo-400/10 px-2 py-0.5 rounded uppercase">{t.map}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                           <div className="flex-1 h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-indigo-500" 
                                style={{ width: `${(t.registeredTeams / t.maxTeams) * 100}%` }}
                             ></div>
                           </div>
                           <span className="text-xs text-slate-400">{t.registeredTeams}/{t.maxTeams}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                           <button className="text-slate-500 hover:text-indigo-400 transition-colors"><i className="fa-solid fa-pen"></i></button>
                           <button 
                             onClick={() => setTournaments(tournaments.filter(x => x.id !== t.id))} 
                             className="text-slate-500 hover:text-red-500 transition-colors"
                           >
                             <i className="fa-solid fa-trash"></i>
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'payments' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600/20 text-indigo-500 rounded-xl flex items-center justify-center text-2xl">
                   <i className="fa-solid fa-vault"></i>
                </div>
                <div>
                   <h3 className="text-xl font-gaming font-bold text-white">Payment Gateway</h3>
                   <p className="text-xs text-slate-500">Configure how players pay their entry fees</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Merchant UPI ID</label>
                    <input 
                      type="text" 
                      value={adminSettings.upiId}
                      onChange={(e) => setAdminSettings({...adminSettings, upiId: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-indigo-500 outline-none text-indigo-400 font-mono text-sm"
                      placeholder="business@upi"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">QR Code URL</label>
                    <input 
                      type="text" 
                      value={adminSettings.qrCodeUrl}
                      onChange={(e) => setAdminSettings({...adminSettings, qrCodeUrl: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-indigo-500 outline-none text-xs"
                      placeholder="Paste your QR image URL"
                    />
                  </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all">
                    Apply Changes
                  </button>
                </div>

                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4">
                   <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">User Checkout Preview</p>
                   <div className="p-3 bg-white rounded-xl shadow-2xl">
                      <img 
                        src={adminSettings.qrCodeUrl || "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example"} 
                        alt="QR" 
                        className="w-32 h-32"
                      />
                   </div>
                   <div className="text-center">
                     <p className="text-white font-bold text-sm">{adminSettings.upiId}</p>
                     <p className="text-[10px] text-slate-500">Verify before paying</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'users' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl animate-in slide-in-from-right-4 duration-300">
             <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-gaming font-bold text-lg text-white">Player Database</h3>
                <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-3">
                   <i className="fa-solid fa-magnifying-glass text-slate-500 text-xs"></i>
                   <input type="text" placeholder="Search by Username or UID..." className="bg-transparent outline-none text-xs w-48" />
                </div>
             </div>
             <div className="p-12 text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                   <i className="fa-solid fa-database text-3xl text-slate-600"></i>
                </div>
                <h4 className="font-bold text-slate-300">Database Connection Active</h4>
                <p className="text-xs text-slate-500 mt-2">Currently fetching real-time player data from the cluster...</p>
                <button className="mt-6 px-6 py-2 bg-indigo-600/10 text-indigo-500 rounded-lg text-xs font-bold border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all">
                  Refresh Users
                </button>
             </div>
          </div>
        )}

        {activeSubTab === 'config' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-8">
              <h3 className="text-xl font-gaming font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-sliders text-indigo-500"></i>
                Global Parameters
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Ticker Message (Marquee)</label>
                  <textarea 
                    value={adminSettings.announcement}
                    onChange={(e) => setAdminSettings({...adminSettings, announcement: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-indigo-500 outline-none h-24 text-sm text-slate-300 leading-relaxed"
                    placeholder="Enter urgent alerts or tournament updates..."
                  />
                </div>

                <div className="flex items-center justify-between p-6 bg-red-500/5 rounded-2xl border border-red-500/10">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center">
                       <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div>
                      <p className="font-bold text-red-500 text-sm">System Maintenance</p>
                      <p className="text-[10px] text-slate-500">Lock the app interface for all non-admin users</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setAdminSettings({...adminSettings, isMaintenance: !adminSettings.isMaintenance})}
                    className={`w-12 h-6 rounded-full relative transition-all ${adminSettings.isMaintenance ? 'bg-red-600' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${adminSettings.isMaintenance ? 'left-6.5' : 'left-0.5'}`}></div>
                  </button>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                 <button className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold transition-all">Clear App Cache</button>
                 <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/20">Sync Configuration</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
