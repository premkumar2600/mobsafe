
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, User as UserIcon, LogOut } from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => 
    location.pathname === path 
      ? "text-brand-300 font-semibold drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" 
      : "text-slate-200 hover:text-white transition-colors";

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-brand-600 to-brand-800 p-2.5 rounded-xl text-white border border-white/20">
                <ShieldCheck size={28} />
              </div>
            </div>
            {/* Logo Text: Bright Green for visibility */}
            <span className="text-2xl font-bold text-brand-400 tracking-tight drop-shadow-md">
              MobSafe
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-10 bg-black/20 px-8 py-2 rounded-full border border-white/10 backdrop-blur-sm">
            <Link to="/" className={isActive('/')}>Home</Link>
            {user && (
              <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
            )}
            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" className={isActive('/admin')}>Admin Insights</Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <>
                {/* Login Link: Button style for visibility */}
                <Link to="/login" className="bg-white text-brand-900 px-5 py-2 rounded-lg font-bold hover:bg-slate-100 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  Log In
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex items-center gap-3 text-sm text-slate-100">
                  <div className="p-1.5 bg-brand-900/50 rounded-full border border-brand-400/30">
                     <UserIcon size={16} className="text-brand-300"/>
                  </div>
                  <span className="hidden sm:inline font-medium">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
