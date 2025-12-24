
import React, { useState } from 'react';
import { Tournament, TournamentStatus, User } from '../types';

interface TournamentCardProps {
  tournament: Tournament;
  onView: (id: string) => void;
  user: User | null;
  onJoinSuccess: (tournamentId: string, fee: number) => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onView, user, onJoinSuccess }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const getStatusColor = (status: TournamentStatus) => {
    switch (status) {
      case TournamentStatus.ONGOING: return 'bg-red-500 text-white';
      case TournamentStatus.UPCOMING: return 'bg-blue-500 text-white';
      case TournamentStatus.COMPLETED: return 'bg-green-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const entryFeeNum = tournament.entryFee.toLowerCase() === 'free' ? 0 : parseInt(tournament.entryFee.replace(/[^\d]/g, ''));
  const canAfford = (user?.balance || 0) >= entryFeeNum;
  const isFull = tournament.registeredTeams >= tournament.maxTeams;

  const handleJoinClick = () => {
    if (tournament.status !== TournamentStatus.UPCOMING) return;
    if (isFull) return;
    setShowConfirm(true);
    setError('');
  };

  const confirmJoin = () => {
    if (!canAfford) {
      setError('Insufficient balance! Please top up your wallet.');
      return;
    }
    onJoinSuccess(tournament.id, entryFeeNum);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-orange-500/50 transition-all group shadow-xl relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={tournament.banner} 
            alt={tournament.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(tournament.status)}`}>
              {tournament.status}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4">
            <h3 className="text-xl font-gaming font-bold truncate text-white">{tournament.title}</h3>
          </div>
        </div>
        
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <div className="text-slate-400 flex items-center gap-2">
              <i className="fa-solid fa-map-location-dot"></i>
              <span>{tournament.map}</span>
            </div>
            <div className="text-orange-500 font-bold">
              {tournament.prizePool} Prize
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Registration</span>
              <span className="text-slate-200">{tournament.registeredTeams}/{tournament.maxTeams} Teams</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-1000" 
                style={{ width: `${(tournament.registeredTeams / tournament.maxTeams) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => onView(tournament.id)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              Details
            </button>
            <button 
              onClick={handleJoinClick}
              disabled={tournament.status !== TournamentStatus.UPCOMING || isFull}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                tournament.status === TournamentStatus.UPCOMING && !isFull
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-900/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isFull ? 'Tournament Full' : 'Join Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-gaming font-bold text-white">Confirm Entry</h3>
              <button onClick={() => setShowConfirm(false)} className="text-slate-500 hover:text-white">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Tournament</p>
                <p className="text-white font-bold">{tournament.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Entry Fee</p>
                  <p className="text-orange-500 font-bold">{tournament.entryFee}</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Your Balance</p>
                  <p className={`font-bold ${canAfford ? 'text-green-500' : 'text-red-500'}`}>₹{user?.balance.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-xl mb-6 flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={confirmJoin}
                className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-900/40 transition-all"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TournamentCard;
