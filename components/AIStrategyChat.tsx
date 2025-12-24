
import React, { useState, useRef, useEffect } from 'react';
import { getStrategyTips } from '../services/geminiService';
import { MapType } from '../types';

const AIStrategyChat: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Welcome, Survivor! I am your Booyah AI coach. Need a strategy for Bermuda or maybe a tip for Kalahari? Ask me anything!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Simplified logic: detecting if they mention a map
    const mapMatch = Object.values(MapType).find(m => userMsg.toLowerCase().includes(m.toLowerCase()));
    const response = await getStrategyTips(mapMatch || 'Bermuda', 'aggressive');
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-robot text-white"></i>
          </div>
          <div>
            <h3 className="font-gaming font-bold text-sm">Booyah Strategy Coach</h3>
            <p className="text-[10px] text-green-400">Online • AI Powered</p>
          </div>
        </div>
        <div className="text-slate-400">
            <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
              ? 'bg-orange-600 text-white rounded-tr-none' 
              : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              {msg.text.split('\n').map((line, i) => <p key={i} className="mb-1">{line}</p>)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for match strategy..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 px-4 py-2 rounded-xl transition-colors"
          >
            <i className="fa-solid fa-paper-plane text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIStrategyChat;
