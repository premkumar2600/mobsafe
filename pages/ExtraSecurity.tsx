
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Globe, Search, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

export const ExtraSecurity: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [breachResult, setBreachResult] = useState<null | 'safe' | 'danger'>(null);
  const [phishResult, setPhishResult] = useState<null | 'safe' | 'danger'>(null);
  const [loading, setLoading] = useState<'breach' | 'phish' | null>(null);

  const checkBreach = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('breach');
    setTimeout(() => {
      setLoading(null);
      // Mock random result
      setBreachResult(Math.random() > 0.7 ? 'danger' : 'safe');
    }, 1500);
  };

  const checkPhishing = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('phish');
    setTimeout(() => {
      setLoading(null);
      // Mock random result
      setPhishResult(Math.random() > 0.7 ? 'danger' : 'safe');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Pro Security Tools</h1>
        <p className="text-slate-400">Advanced utilities to keep your digital identity safe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Data Breach Scanner */}
        <div className="glass-card p-8 rounded-3xl border border-white/10">
          <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
            <Mail size={28} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Data Breach Scanner</h2>
          <p className="text-slate-400 text-sm mb-6">Check if your email password has been exposed in known dark web leaks.</p>
          
          <form onSubmit={checkBreach} className="space-y-4">
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full pl-4 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none transition-colors"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading === 'breach'}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex justify-center items-center"
            >
              {loading === 'breach' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Check Now"}
            </button>
          </form>

          {breachResult && (
            <div className={`mt-6 p-4 rounded-xl border flex items-start gap-3 ${breachResult === 'safe' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              {breachResult === 'safe' ? <CheckCircle className="text-emerald-400 shrink-0" /> : <ShieldAlert className="text-red-400 shrink-0" />}
              <div>
                <h4 className={`font-bold ${breachResult === 'safe' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {breachResult === 'safe' ? 'No Breaches Found' : 'Breach Detected!'}
                </h4>
                <p className="text-slate-300 text-xs mt-1">
                  {breachResult === 'safe' 
                    ? "This email does not appear in our known leak databases." 
                    : "This email was found in 2 recent data breaches. Change your password immediately."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Phishing Checker */}
        <div className="glass-card p-8 rounded-3xl border border-white/10">
          <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-400 mb-6">
            <Globe size={28} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Phishing Link Detector</h2>
          <p className="text-slate-400 text-sm mb-6">Analyze suspicious URLs to prevent navigating to malicious scam sites.</p>
          
          <form onSubmit={checkPhishing} className="space-y-4">
            <div className="relative">
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-4 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-orange-500 outline-none transition-colors"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading === 'phish'}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/20 flex justify-center items-center"
            >
              {loading === 'phish' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Analyze Link"}
            </button>
          </form>

          {phishResult && (
            <div className={`mt-6 p-4 rounded-xl border flex items-start gap-3 ${phishResult === 'safe' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              {phishResult === 'safe' ? <CheckCircle className="text-emerald-400 shrink-0" /> : <AlertTriangle className="text-red-400 shrink-0" />}
              <div>
                <h4 className={`font-bold ${phishResult === 'safe' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {phishResult === 'safe' ? 'Safe Link' : 'Malicious Site!'}
                </h4>
                <p className="text-slate-300 text-xs mt-1">
                  {phishResult === 'safe' 
                    ? "Our analysis did not find any malicious code or reputation issues." 
                    : "This URL matches known phishing patterns. Do not visit this site."}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
    