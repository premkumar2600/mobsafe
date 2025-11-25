
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, AlertCircle } from 'lucide-react';

interface SignupProps {
  onSignup: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [emailError, setEmailError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Email Validation Logic
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  }, [formData.email]);

  // Password Strength Logic
  useEffect(() => {
    let score = 0;
    const pass = formData.password;
    if (!pass) {
      setPasswordStrength(0);
      return;
    }

    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    // Cap at 4
    setPasswordStrength(Math.min(score, 4));
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError) return;
    if (passwordStrength < 1) return; // Prevent empty/very weak password submission
    onSignup();
  };

  const getStrengthColor = (strength: number) => {
    if (strength === 0) return 'bg-slate-700';
    if (strength <= 2) return 'bg-red-500';
    if (strength === 3) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const getStrengthLabel = (strength: number) => {
    if (strength === 0) return '';
    if (strength <= 2) return 'Weak';
    if (strength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 relative z-10 min-h-[calc(100vh-80px)]">
      
       {/* Background Blobs */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="glass-card p-10 rounded-3xl w-full max-w-md shadow-2xl relative z-10 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400 text-sm">Join MobSafe and activate your real-time shield.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-black/20 border text-white placeholder-slate-500 outline-none transition-all ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-brand-500 focus:ring-brand-500 focus:ring-1'}`}
                placeholder="name@example.com"
                required
              />
              {formData.email && (
                <div className="absolute right-3 top-3.5">
                   {emailError ? <AlertCircle size={18} className="text-red-500" /> : <Check size={18} className="text-emerald-500" />}
                </div>
              )}
            </div>
            {emailError && <p className="text-red-400 text-xs mt-1 ml-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              placeholder="Create a strong password"
              required
            />
            
            {/* Password Strength Meter */}
            {formData.password && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">Security Strength</span>
                  <span className={`text-xs font-bold ${passwordStrength <= 2 ? 'text-red-400' : passwordStrength === 3 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                    {getStrengthLabel(passwordStrength)}
                  </span>
                </div>
                <div className="flex gap-1 h-1.5 w-full">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step} 
                      className={`h-full rounded-full flex-1 transition-all duration-300 ${step <= passwordStrength ? getStrengthColor(passwordStrength) : 'bg-white/10'}`}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            type="submit"
            disabled={!!emailError || (!formData.password)}
            className="w-full bg-gradient-to-r from-brand-600 to-accent-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] mt-2"
          >
            Create Free Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-brand-400 font-medium hover:text-brand-300">Log in</Link>
        </p>
      </div>
    </div>
  );
};
