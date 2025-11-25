import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateSecurityReport } from '../services/geminiService';
import { SecurityReport } from '../types';
import { BrainCircuit, Fingerprint, FileCode, Wifi } from 'lucide-react';

interface ScannerProps {
  onScanComplete: (report: SecurityReport) => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing Liquid Engine...');
  const [scannedFile, setScannedFile] = useState('System Boot');
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Progress Simulation
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) {
          clearInterval(timer);
          return 92; // Hold while fetching
        }
        return prev + 0.5;
      });
    }, 40);

    // 2. Stage Simulation & File Text
    const stageTimer = setInterval(() => {
      const files = [
        "com.android.systemui", "kernel_task", "network_stack", 
        "user_data_0", "crypt_key_store", "camera_permissions",
        "downloads/unknown.apk", "temp/cache_v2.db"
      ];
      setScannedFile(files[Math.floor(Math.random() * files.length)]);

      setProgress(p => {
        if (p < 20) setStage('Mapping File System...');
        else if (p < 45) setStage('Heuristic Analysis...');
        else if (p < 70) setStage('Checking Permissions...');
        else if (p < 90) setStage('AI Threat Detection...');
        return p;
      });
    }, 200);

    // 3. API Call
    const runScan = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 6000)); // Ensure animation plays for a bit
        
        setStage('Gemini AI: Finalizing Report...');
        const report = await generateSecurityReport("Android 14 Pixel 8"); 
        
        setProgress(100);
        setStage('Scan Complete');
        
        setTimeout(() => {
          onScanComplete(report);
          navigate('/report');
        }, 800);

      } catch (e) {
        console.error("Scan failed", e);
        setStage("Error during scan");
      }
    };

    runScan();

    return () => {
      clearInterval(timer);
      clearInterval(stageTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 relative overflow-hidden bg-brand-950">
      
      {/* Background Grid & Noise */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,44,34,0.9),rgba(2,44,34,0.9)),url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40"></div>
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 blur-[120px] rounded-full animate-pulse delay-700"></div>

      <div className="z-10 w-full max-w-xl text-center relative">
        
        {/* Liquid Radar Visualizer */}
        <div className="relative w-80 h-80 mx-auto mb-12">
           {/* Outer Ring */}
           <div className="absolute inset-0 rounded-full border border-white/5 shadow-[0_0_50px_rgba(16,185,129,0.1)]"></div>
           
           {/* Rotating Segments */}
           <div className="absolute inset-4 rounded-full border-t border-l border-brand-400/30 animate-spin-slow"></div>
           <div className="absolute inset-8 rounded-full border-b border-r border-accent-400/30 animate-spin direction-reverse duration-[10s]"></div>

           {/* Liquid Fill Container */}
           <div className="absolute inset-10 rounded-full bg-slate-900/40 backdrop-blur-xl overflow-hidden border border-white/10 shadow-inner">
             
             {/* The Liquid Wave */}
             <div 
               className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-600 to-accent-500 transition-all duration-300 ease-out"
               style={{ height: `${progress}%`, opacity: 0.8 }}
             >
                <div className="absolute top-0 left-0 w-[200%] h-4 bg-white/20 blur-sm animate-liquid-rise origin-bottom"></div>
             </div>

             {/* Center Percentage */}
             <div className="absolute inset-0 flex items-center justify-center z-10">
               <span className="text-5xl font-bold text-white drop-shadow-lg">{Math.floor(progress)}%</span>
             </div>
           </div>
           
           {/* Scanning Radar Beam */}
           <div className="absolute inset-0 rounded-full overflow-hidden animate-scan-beam">
             <div className="w-full h-1/2 bg-gradient-to-b from-transparent to-brand-500/10 border-b border-brand-400/50"></div>
           </div>
        </div>

        {/* Text Info */}
        <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">{stage}</h2>
        <p className="text-accent-300 font-mono text-sm mb-10 h-6">Scanning: {scannedFile}</p>

        {/* Active Modules Indicators */}
        <div className="flex justify-center gap-6 mb-8">
           <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${progress > 10 ? 'opacity-100 text-brand-300' : 'opacity-30 text-slate-500'}`}>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10"><FileCode size={20}/></div>
              <span className="text-xs">Files</span>
           </div>
           <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${progress > 40 ? 'opacity-100 text-brand-300' : 'opacity-30 text-slate-500'}`}>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10"><Fingerprint size={20}/></div>
              <span className="text-xs">Behavior</span>
           </div>
           <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${progress > 60 ? 'opacity-100 text-brand-300' : 'opacity-30 text-slate-500'}`}>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10"><Wifi size={20}/></div>
              <span className="text-xs">Network</span>
           </div>
           <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${progress > 80 ? 'opacity-100 text-accent-300' : 'opacity-30 text-slate-500'}`}>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(45,212,191,0.3)]"><BrainCircuit size={20}/></div>
              <span className="text-xs font-bold">AI Brain</span>
           </div>
        </div>
      </div>
    </div>
  );
};