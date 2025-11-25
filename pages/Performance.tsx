
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gauge, Cpu, HardDrive, Zap, ArrowLeft, CheckCircle } from 'lucide-react';

export const Performance: React.FC = () => {
  const navigate = useNavigate();
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);
  const [metrics, setMetrics] = useState({
    cpu: 45,
    ram: 78,
    storage: 62,
    temp: 38
  });

  useEffect(() => {
    // Simulate fluctuating metrics
    const interval = setInterval(() => {
      if (!optimized) {
        setMetrics(prev => ({
          cpu: Math.min(99, Math.max(10, prev.cpu + (Math.random() * 10 - 5))),
          ram: Math.min(95, Math.max(40, prev.ram + (Math.random() * 6 - 3))),
          storage: 62,
          temp: Math.min(50, Math.max(30, prev.temp + (Math.random() * 2 - 1)))
        }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [optimized]);

  const handleBoost = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setOptimized(true);
      setMetrics({
        cpu: 12,
        ram: 35,
        storage: 61,
        temp: 34
      });
    }, 2000);
  };

  const MetricCard = ({ icon: Icon, label, value, unit, color, max = 100 }: any) => (
    <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
      <div className={`absolute inset-0 bg-${color}-500/5 blur-xl`}></div>
      <div className={`w-12 h-12 rounded-full bg-${color}-500/20 flex items-center justify-center text-${color}-400 mb-3`}>
        <Icon size={24} />
      </div>
      <span className="text-3xl font-bold text-white mb-1">{Math.round(value)}{unit}</span>
      <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
      
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
        <div 
          className={`h-full bg-${color}-500 transition-all duration-500`} 
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="glass-panel p-8 rounded-3xl border border-brand-500/30 shadow-[0_0_40px_rgba(16,185,129,0.1)] mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[80px] rounded-full"></div>
        
        <h1 className="text-3xl font-bold text-white mb-2 relative z-10">System Performance</h1>
        <p className="text-slate-300 mb-8 relative z-10">Real-time device health metrics</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
          <MetricCard icon={Cpu} label="CPU Load" value={metrics.cpu} unit="%" color="orange" />
          <MetricCard icon={Gauge} label="RAM Usage" value={metrics.ram} unit="%" color={metrics.ram > 70 ? 'red' : 'emerald'} />
          <MetricCard icon={HardDrive} label="Storage" value={metrics.storage} unit="%" color="blue" />
          <MetricCard icon={Zap} label="Temp" value={metrics.temp} unit="°C" max={60} color="yellow" />
        </div>

        <div className="relative z-10 flex justify-center">
          {optimized ? (
             <div className="flex items-center gap-3 px-8 py-4 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-emerald-400 font-bold animate-in fade-in zoom-in">
               <CheckCircle size={24} /> Device Optimized
             </div>
          ) : (
            <button 
              onClick={handleBoost}
              disabled={optimizing}
              className="group relative px-10 py-4 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              {optimizing ? (
                <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Boosting...</span>
              ) : (
                <span className="flex items-center gap-2"><Zap size={20} className="fill-current" /> Boost Performance</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
    