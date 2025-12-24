
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [ffUid, setFfUid] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulated Auth Logic using LocalStorage
    const usersJson = localStorage.getItem('booyah_users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    if (isLogin) {
      const user = users.find(u => u.email === email);
      if (user) {
        // In a real app, verify password here
        onLogin(user);
      } else {
        setError('Invalid email or password.');
      }
    } else {
      if (users.some(u => u.email === email)) {
        setError('Email already exists.');
        return;
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        ffUid,
        balance: 0,
        role: email.includes('admin') ? 'admin' : 'player', // Simple logic to allow admin testing
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
      };

      users.push(newUser);
      localStorage.setItem('booyah_users', JSON.stringify(users));
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-orange-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-lg shadow-orange-900/40">
            <i className="fa-solid fa-fire-flame-curved text-white text-3xl"></i>
          </div>
          <h2 className="text-3xl font-gaming font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Login to join the battlefield' : 'Join the elite Free Fire tournament community'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-xl mb-6 flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Username</label>
                <div className="relative">
                  <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:border-orange-500 outline-none transition-all text-sm"
                    placeholder="GameNinja2024"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Free Fire UID</label>
                <div className="relative">
                  <i className="fa-solid fa-hashtag absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input
                    required
                    type="text"
                    value={ffUid}
                    onChange={(e) => setFfUid(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:border-orange-500 outline-none transition-all text-sm"
                    placeholder="1234567890"
                  />
                </div>
              </div>
            </>
          )}
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Email Address</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:border-orange-500 outline-none transition-all text-sm"
                placeholder="survivor@email.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Password</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:border-orange-500 outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-xl font-bold text-white shadow-lg shadow-orange-900/20 transition-all mt-4"
          >
            {isLogin ? 'Login to Booyah' : 'Register Now'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-slate-400 hover:text-orange-500 transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-slate-800"></div>
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Admin Test Mode</span>
            <div className="h-[1px] w-8 bg-slate-800"></div>
        </div>
        <p className="text-[10px] text-slate-600 text-center mt-2">Use 'admin@app.com' for administrative access</p>
      </div>
    </div>
  );
};

export default Auth;
