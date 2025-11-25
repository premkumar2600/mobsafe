import React, { useState } from 'react';
import { UserRole } from '../types';
import { Lock, User, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Specific Admin Credentials Check
    if (identifier === 'kingofmosafe' && password === 'PrEm@KuMaR') {
      onLogin(UserRole.ADMIN);
    } else {
      // Allow any other login as standard user for demo purposes
      if (identifier && password) {
        onLogin(UserRole.USER);
      } else {
        setError('Please enter valid credentials');
      }
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 relative z-10 min-h-[calc(100vh-80px)] overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="glass-card p-8 md:p-10 rounded-3xl w-full max-w-md shadow-2xl relative z-10 border border-white/10">
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
             <Lock size={32} className="text-brand-400" />
           </div>
           <h2 className="text-3xl font-bold text-white mb-2">
            Secure Access
           </h2>
           <p className="text-slate-400 text-sm">Enter your credentials to unlock MobSafe.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-brand-300 uppercase tracking-wider mb-2 ml-1">Username or Email</label>
            <div className="relative">
              <div className="absolute left-4 top-3.5 text-slate-500">
                <User size={20} />
              </div>
              <input 
                type="text" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                placeholder="kingofmosafe"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-300 uppercase tracking-wider mb-2 ml-1">Password</label>
            <div className="relative">
               <div className="absolute left-4 top-3.5 text-slate-500">
                <Lock size={20} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          
          <button 
            type="submit"
            className="w-full group bg-gradient-to-r from-brand-600 to-accent-600 hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] mt-4 flex items-center justify-center gap-2"
          >
            Launch MobSafe <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};