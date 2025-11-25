
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Smartphone, AlertTriangle, CheckCircle, Wifi, Clock, Activity, Zap, X, Lock, FileSearch, Trash2, Gauge, ChevronRight } from 'lucide-react';
import { User } from '../types';
import { useRealtimeAlerts } from '../hooks/useRealtimeAlerts';

interface UserDashboardProps {
  user: User;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const { alert, dismissAlert } = useRealtimeAlerts();

  const handleStartScan = () => {
    navigate('/scan');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 relative z-10 pb-20">
      
      {/* Real-time Alert */}
      {alert && (
        <div className="fixed top-24 right-4 z-50 animate-blob max-w-sm w-full">
          <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(16,185,129,0.2)]">
            <div className="p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Shield size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-white font-bold text-sm mb-1">{alert.title}</h4>
                  <button onClick={dismissAlert} className="text-slate-400 hover:text-white"><X size={16} /></button>
                </div>
                <p className="text-slate-300 text-xs mb-2">{alert.message}</p>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 w-full opacity-50"></div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-2xl font-bold text-white">Security Hub</h1>
           <p className="text-slate-400 text-sm">Welcome, {user.name}</p>
        </div>
        <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-brand-300 bg-brand-900/30 border border-brand-500/20">
           <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
           Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Action Card */}
        <div className="md:col-span-2 glass-card rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute right-0 top-0 w-48 h-48 bg-brand-500/10 blur-[50px] rounded-full"></div>
          
          <div className="relative z-10">
             <div className="flex items-center gap-3 mb-4">
               <Shield size={32} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               <h2 className="text-2xl font-bold text-white">System Protected</h2>
             </div>
             <p className="text-slate-300 text-sm max-w-sm mb-6">
               Liquid engine is monitoring background processes. No immediate threats detected in last check.
             </p>
          </div>
          
          <div className="relative z-10">
            <button 
              onClick={handleStartScan}
              className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-accent-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <Zap size={18} />
              Run Smart Scan
            </button>
          </div>
        </div>

        {/* Status Donut / Quick Info */}
        <div className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center relative">
           <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="transparent" />
                <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="12" fill="transparent" strokeDasharray="351" strokeDashoffset="35" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col items-center">
                 <span className="text-3xl font-bold text-white">98%</span>
                 <span className="text-[10px] text-slate-400 uppercase">Health</span>
              </div>
           </div>
           <p className="text-xs text-slate-400">Next scheduled scan in 2 hrs</p>
        </div>
      </div>

      {/* Shortcuts Grid */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap size={18} className="text-yellow-400" /> Quick Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <button className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Wifi size={24} />
            </div>
            <span className="text-sm font-bold text-slate-200">WiFi Scan</span>
          </button>

          <button className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Lock size={24} />
            </div>
            <span className="text-sm font-bold text-slate-200">App Lock</span>
          </button>

          <button className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Trash2 size={24} />
            </div>
            <span className="text-sm font-bold text-slate-200">Deep Clean</span>
          </button>

          <button 
             onClick={() => navigate('/performance')}
             className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <Gauge size={24} />
            </div>
            <span className="text-sm font-bold text-slate-200">Boost RAM</span>
          </button>

        </div>
      </div>

      {/* Activity List Compact */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
        <div className="glass-card rounded-2xl overflow-hidden mb-8">
           {[
             { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20', title: 'Auto-scan completed', time: '10 mins ago' },
             { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20', title: 'Unused permissions found', time: '1 hour ago' },
             { icon: Smartphone, color: 'text-blue-400', bg: 'bg-blue-500/20', title: 'New app installed', time: '3 hours ago' }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors last:border-0">
                <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                  <item.icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">{item.title}</p>
                </div>
                <span className="text-xs text-slate-500">{item.time}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Advanced Utilities Bottom Shortcuts */}
      <div className="border-t border-white/10 pt-8 mt-8">
        <h3 className="text-lg font-bold text-white mb-4">Advanced Utilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <button 
            onClick={() => navigate('/performance')}
            className="group relative glass-card p-6 rounded-2xl flex items-center justify-between hover:border-brand-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-500/5 group-hover:bg-brand-500/10 transition-colors"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400">
                <Gauge size={24} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white">Performance Check</h4>
                <p className="text-xs text-slate-400">Optimize RAM & Storage</p>
              </div>
            </div>
            <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all">
              <ChevronRight size={16} />
            </div>
          </button>

          <button 
            onClick={() => navigate('/extra-security')}
            className="group relative glass-card p-6 rounded-2xl flex items-center justify-between hover:border-blue-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Shield size={24} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white">Extra Security</h4>
                <p className="text-xs text-slate-400">Breach Monitor & Phishing</p>
              </div>
            </div>
             <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
              <ChevronRight size={16} />
            </div>
          </button>

        </div>
      </div>

    </div>
  );
};
    