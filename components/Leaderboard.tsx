
import React from 'react';
import { Player } from '../types';

const MOCK_LEADERBOARD: Player[] = [
  { id: '1', name: 'Zoro_FF', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoro', level: 72, rank: 'Grandmaster', kills: 450, wins: 45, points: 2450 },
  { id: '2', name: 'Axe_Gaming', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Axe', level: 68, rank: 'Grandmaster', kills: 380, wins: 38, points: 2100 },
  { id: '3', name: 'SkyLord_07', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sky', level: 65, rank: 'Master', kills: 320, wins: 30, points: 1850 },
  { id: '4', name: 'Viper_Snipe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Viper', level: 60, rank: 'Heroic', kills: 290, wins: 25, points: 1600 },
  { id: '5', name: 'BotKiller_99', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bot', level: 58, rank: 'Heroic', kills: 250, wins: 20, points: 1450 },
  { id: '6', name: 'Storm_FF', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Storm', level: 55, rank: 'Heroic', kills: 210, wins: 18, points: 1300 },
  { id: '7', name: 'Red_Devil', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Red', level: 52, rank: 'Diamond', kills: 180, wins: 15, points: 1150 },
];

const Leaderboard: React.FC = () => {
  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const others = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-gaming font-black text-white tracking-tighter">SURVIVAL RANKINGS</h2>
        <p className="text-slate-400 text-sm">Top gladiators of the current tournament season</p>
      </div>

      {/* Podium Section */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-0 mt-20 mb-12">
        {/* Rank 2 */}
        <div className="order-2 md:order-1 flex flex-col items-center group">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-slate-400 overflow-hidden shadow-lg shadow-slate-400/20">
              <img src={topThree[1].avatar} alt={topThree[1].name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -right-2 bg-slate-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-slate-900">2</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur w-32 h-24 rounded-t-2xl border-t border-x border-slate-700 flex flex-col items-center justify-center p-4">
            <p className="font-bold text-xs truncate w-full text-center text-white">{topThree[1].name}</p>
            <p className="text-[10px] text-slate-400">{topThree[1].points} PTS</p>
          </div>
        </div>

        {/* Rank 1 */}
        <div className="order-1 md:order-2 flex flex-col items-center -mb-4 z-10 group">
          <div className="relative mb-4">
            <i className="fa-solid fa-crown absolute -top-8 left-1/2 -translate-x-1/2 text-orange-500 text-3xl animate-bounce"></i>
            <div className="w-28 h-28 rounded-full border-4 border-orange-500 overflow-hidden shadow-2xl shadow-orange-500/30 ring-4 ring-orange-500/20">
              <img src={topThree[0].avatar} alt={topThree[0].name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-black border-4 border-slate-900 text-lg">1</div>
          </div>
          <div className="bg-gradient-to-b from-orange-600 to-orange-900 w-40 h-32 rounded-t-3xl border-t border-x border-orange-400/30 flex flex-col items-center justify-center p-4 shadow-2xl">
            <p className="font-gaming font-bold text-sm truncate w-full text-center text-white">{topThree[0].name}</p>
            <p className="text-xs font-bold text-orange-200">{topThree[0].points} PTS</p>
            <p className="text-[10px] uppercase font-black text-orange-300/60 mt-2 tracking-widest">Champion</p>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="order-3 md:order-3 flex flex-col items-center group">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-amber-700 overflow-hidden shadow-lg shadow-amber-900/20">
              <img src={topThree[2].avatar} alt={topThree[2].name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -right-2 bg-amber-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-slate-900">3</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur w-32 h-20 rounded-t-2xl border-t border-x border-slate-700 flex flex-col items-center justify-center p-4">
            <p className="font-bold text-xs truncate w-full text-center text-white">{topThree[2].name}</p>
            <p className="text-[10px] text-slate-400">{topThree[2].points} PTS</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
          <h3 className="font-gaming font-bold text-sm flex items-center gap-2">
            <i className="fa-solid fa-list-ol text-orange-500"></i>
            Global Leaderboard
          </h3>
          <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase">
             <span>Season 04</span>
             <span className="text-orange-500">Active</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950/50 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
              <tr>
                <th className="p-6">Rank</th>
                <th className="p-6">Survivor</th>
                <th className="p-6">Rank Tier</th>
                <th className="p-6">Kills</th>
                <th className="p-6">Wins</th>
                <th className="p-6 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {others.map((player, idx) => (
                <tr key={player.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-6">
                    <span className="text-slate-500 font-gaming font-bold">#{idx + 4}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full border border-slate-700 group-hover:border-orange-500/50 transition-colors" />
                      <div>
                        <p className="font-bold text-white text-sm">{player.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">UID: {player.id}109283</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      player.rank === 'Heroic' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {player.rank}
                    </span>
                  </td>
                  <td className="p-6 text-sm text-slate-300 font-mono">{player.kills}</td>
                  <td className="p-6 text-sm text-slate-300 font-mono">{player.wins}</td>
                  <td className="p-6 text-right">
                    <span className="font-gaming font-black text-orange-500">{player.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
