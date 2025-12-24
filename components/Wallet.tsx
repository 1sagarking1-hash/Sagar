
import React, { useState } from 'react';
import { AdminSettings, Transaction } from '../types';

interface WalletProps {
  adminSettings: AdminSettings;
}

const Wallet: React.FC<WalletProps> = ({ adminSettings }) => {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'input' | 'pay' | 'verifying' | 'success'>('input');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', amount: 500, type: 'deposit', status: 'success', date: new Date(Date.now() - 86400000) },
    { id: '2', amount: 50, type: 'entry', status: 'success', date: new Date(Date.now() - 43200000) },
  ]);

  const handleDeposit = () => {
    if (!amount || isNaN(Number(amount))) return;
    setStep('pay');
  };

  const simulatePayment = () => {
    setStep('verifying');
    // Simulate "Automatic Payment Successful" after 3 seconds
    setTimeout(() => {
      const newTx: Transaction = {
        id: Math.random().toString(),
        amount: Number(amount),
        type: 'deposit',
        status: 'success',
        date: new Date()
      };
      setTransactions([newTx, ...transactions]);
      setStep('success');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-2xl border border-indigo-500/30 shadow-2xl">
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Total Balance</h3>
          <p className="text-4xl font-gaming font-black text-white">₹{transactions.reduce((acc, tx) => tx.status === 'success' ? (tx.type === 'deposit' || tx.type === 'win' ? acc + tx.amount : acc - tx.amount) : acc, 0).toFixed(2)}</p>
          <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between text-xs">
            <div className="text-slate-400">Withdrawal Limit: <span className="text-white font-bold">₹500.00</span></div>
          </div>
        </div>

        <div className="md:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-gaming font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-plus-circle text-orange-500"></i>
            Add Funds
          </h3>

          {step === 'input' && (
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (Min ₹10)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-10 pr-4 focus:border-orange-500 focus:outline-none transition-all text-xl font-bold"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 200, 500].map(val => (
                  <button 
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className="bg-slate-800 hover:bg-slate-700 py-2 rounded-lg text-sm font-bold transition-colors"
                  >
                    +₹{val}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleDeposit}
                className="w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-900/20 transition-all"
              >
                Proceed to Pay
              </button>
            </div>
          )}

          {step === 'pay' && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="p-4 bg-white rounded-2xl inline-block">
                <img src={adminSettings.qrCodeUrl || "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example"} alt="QR Code" className="w-48 h-48" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-400 text-sm">UPI ID</p>
                <div className="flex items-center justify-center gap-3">
                  <code className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 text-orange-400 font-bold">{adminSettings.upiId}</code>
                  <button onClick={() => navigator.clipboard.writeText(adminSettings.upiId)} className="text-slate-400 hover:text-white">
                    <i className="fa-solid fa-copy"></i>
                  </button>
                </div>
              </div>
              <button 
                onClick={simulatePayment}
                className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold text-lg"
              >
                I Have Paid ₹{amount}
              </button>
              <button onClick={() => setStep('input')} className="text-slate-500 hover:text-white text-sm font-bold">Cancel</button>
            </div>
          )}

          {step === 'verifying' && (
            <div className="py-12 text-center space-y-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 border-4 border-slate-800 border-t-orange-500 rounded-full animate-spin"></div>
                <i className="fa-solid fa-shield-halved absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-orange-500"></i>
              </div>
              <div>
                <h4 className="text-xl font-bold">Verifying Payment</h4>
                <p className="text-slate-400 text-sm">Our system is checking your transaction automatically...</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 text-center space-y-6 animate-bounce-in">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-900/40">
                <i className="fa-solid fa-check text-4xl text-white"></i>
              </div>
              <div>
                <h4 className="text-2xl font-bold">Payment Successful!</h4>
                <p className="text-slate-400">₹{amount} has been added to your wallet.</p>
              </div>
              <button 
                onClick={() => { setStep('input'); setAmount(''); }}
                className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-xl font-bold"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-800/50">
          <h3 className="font-gaming font-bold text-sm">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-slate-800">
          {transactions.map(tx => (
            <div key={tx.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'deposit' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  <i className={`fa-solid ${tx.type === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                </div>
                <div>
                  <p className="font-bold text-sm capitalize">{tx.type} {tx.status === 'pending' ? '(Processing)' : ''}</p>
                  <p className="text-xs text-slate-500">{tx.date.toLocaleDateString()} • {tx.date.toLocaleTimeString()}</p>
                </div>
              </div>
              <p className={`font-gaming font-bold ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                {tx.type === 'deposit' ? '+' : '-'}₹{tx.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
