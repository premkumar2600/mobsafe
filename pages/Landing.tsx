import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, Wifi, Smartphone, Globe, Download, ArrowRight } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative overflow-hidden bg-brand-950 px-4">
      
      {/* Background Liquid Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-brand-600/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-teal-600/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center">
        
        {/* Main Hero Card */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            <span className="text-xs font-bold text-brand-300 tracking-wider uppercase">System Active</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Mob<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">Safe</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            One-tap liquid security for your digital life.
          </p>
        </div>

        {/* Central Launch Button */}
        <div className="relative group cursor-pointer mb-16">
          <div className="absolute inset-0 bg-brand-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <Link 
            to="/login"
            className="relative w-48 h-48 rounded-full bg-gradient-to-b from-brand-800 to-brand-950 border-4 border-brand-500/30 flex flex-col items-center justify-center shadow-2xl transition-transform transform group-hover:scale-105 active:scale-95"
          >
             <div className="absolute inset-2 rounded-full border border-white/5"></div>
             <Shield size={64} className="text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
             <span className="text-xl font-bold text-white tracking-widest">START</span>
             <span className="text-[10px] text-brand-400 uppercase tracking-widest mt-1">Protection</span>
          </Link>
          
          {/* Orbiting Elements */}
          <div className="absolute inset-[-20px] border border-white/5 rounded-full animate-spin-slow pointer-events-none">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-500 rounded-full shadow-[0_0_10px_#10b981]"></div>
          </div>
        </div>

        {/* Shortcut Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
          
          <Link to="/signup" className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors group border border-white/10">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mb-3 text-teal-400 group-hover:scale-110 transition-transform">
              <Download size={20} />
            </div>
            <span className="text-sm font-bold text-slate-200">Auto Scan</span>
            <span className="text-[10px] text-slate-500">Downloads</span>
          </Link>

          <Link to="/signup" className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors group border border-white/10">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 text-blue-400 group-hover:scale-110 transition-transform">
              <Wifi size={20} />
            </div>
            <span className="text-sm font-bold text-slate-200">Net Shield</span>
            <span className="text-[10px] text-slate-500">WiFi Protect</span>
          </Link>

          <Link to="/signup" className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors group border border-white/10">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-3 text-orange-400 group-hover:scale-110 transition-transform">
              <Lock size={20} />
            </div>
            <span className="text-sm font-bold text-slate-200">App Lock</span>
            <span className="text-[10px] text-slate-500">Privacy</span>
          </Link>

          <Link to="/signup" className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors group border border-white/10">
            <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center mb-3 text-brand-400 group-hover:scale-110 transition-transform">
              <Zap size={20} />
            </div>
            <span className="text-sm font-bold text-slate-200">Boost</span>
            <span className="text-[10px] text-slate-500">Optimize</span>
          </Link>
          
        </div>

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            Already have an account? Login <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};