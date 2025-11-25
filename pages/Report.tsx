import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SecurityReport, ThreatLevel } from '../types';
import { CheckCircle, AlertOctagon, Shield, Trash2, RotateCcw, Download, Zap, X } from 'lucide-react';

interface ReportProps {
  report: SecurityReport | null;
}

export const Report: React.FC<ReportProps> = ({ report }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [allFixed, setAllFixed] = useState(false);

  if (!report) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-10">
        <h2 className="text-2xl text-white font-bold mb-4">No report data found.</h2>
        <button onClick={() => navigate('/dashboard')} className="text-brand-400 hover:text-brand-300 underline">Return to Dashboard</button>
      </div>
    );
  }

  // Determine if the device is safe (either originally or after user fixes it)
  const isOriginallySafe = report.overallStatus === ThreatLevel.SAFE || report.overallStatus === ThreatLevel.LOW;
  const isSafe = allFixed || isOriginallySafe;
  
  // Filter vulnerabilities based on fixed state
  const displayVulnerabilities = allFixed ? [] : report.vulnerabilities;
  const displayFileCount = report.scannedFilesCount;
  
  const getStatusColor = (status: ThreatLevel) => {
    switch (status) {
      case ThreatLevel.CRITICAL: return 'bg-red-500';
      case ThreatLevel.HIGH: return 'bg-orange-500';
      case ThreatLevel.MEDIUM: return 'bg-yellow-500';
      case ThreatLevel.LOW: return 'bg-teal-500';
      default: return 'bg-emerald-500';
    }
  };

  const handleFixAllClick = () => {
    setShowConfirm(true);
  };

  const executeFix = () => {
    setIsFixing(true);
    // Simulate remediation process delay
    setTimeout(() => {
      setIsFixing(false);
      setAllFixed(true);
      setShowConfirm(false);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative z-10">
      
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm transition-opacity" onClick={() => !isFixing && setShowConfirm(false)}></div>
          <div className="relative z-10 glass-card max-w-md w-full p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-all scale-100">
            {isFixing ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                 <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                 <h3 className="text-xl font-bold text-white mb-2">Securing Device...</h3>
                 <p className="text-slate-300">Removing malicious files and patching vulnerabilities.</p>
              </div>
            ) : (
              <>
                <div className="absolute top-4 right-4">
                  <button onClick={() => setShowConfirm(false)} className="text-slate-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mb-6 text-brand-400 mx-auto border border-brand-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Zap size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 text-center">Fix All Vulnerabilities?</h3>
                <p className="text-slate-300 mb-8 text-center leading-relaxed">
                  You are about to automatically remediate <span className="text-white font-bold">{displayVulnerabilities.length} issues</span>. 
                  This will remove detected threats and restore secure settings.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-3.5 rounded-xl border border-white/10 text-slate-300 font-bold hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={executeFix}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-500/30"
                  >
                    Yes, Fix All
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header Summary */}
      <div className={`rounded-[2rem] p-10 mb-8 text-white shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden border border-white/10 transition-colors duration-1000 ${isSafe ? 'bg-emerald-900/40' : 'bg-red-900/40'}`}>
        <div className={`absolute inset-0 opacity-20 blur-3xl transition-colors duration-1000 ${isSafe ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className={`p-6 rounded-full backdrop-blur-md shadow-lg transition-all duration-1000 ${isSafe ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {isSafe ? <CheckCircle size={56} /> : <AlertOctagon size={56} />}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{isSafe ? "Your Device is Secure" : "Threats Detected!"}</h1>
              <p className="opacity-80 text-lg flex items-center gap-2">
                 <Shield size={16} /> Scan completed on {new Date(report.scanDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="glass-panel px-8 py-4 rounded-2xl text-center min-w-[150px]">
             <p className="text-sm opacity-60 uppercase tracking-wider mb-1">Files Analyzed</p>
             <p className="text-3xl font-mono font-bold text-white">{displayFileCount.toLocaleString()}</p>
          </div>
        </div>
        <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
           <h3 className="text-sm font-bold uppercase opacity-50 mb-2">Gemini Analysis Summary</h3>
           <p className="text-lg opacity-90 leading-relaxed max-w-4xl">
             {allFixed 
                ? "All detected threats have been successfully neutralized. Your device security settings have been restored to optimal levels. No further action is required." 
                : report.summary}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Vulnerability List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Shield className="text-brand-400" /> 
              Detailed Findings
            </h2>
            
            {!isSafe && displayVulnerabilities.length > 0 && (
              <button 
                onClick={handleFixAllClick}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-600 to-accent-600 text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105 animate-pulse"
              >
                <Zap size={18} /> Fix All Vulnerabilities
              </button>
            )}
            
            {isSafe && (
              <span className="text-emerald-400 font-medium text-sm flex items-center gap-2">
                <CheckCircle size={16} /> All systems operational
              </span>
            )}
          </div>
          
          {displayVulnerabilities.length === 0 ? (
            <div className="glass-card rounded-3xl p-10 text-center border border-emerald-500/20 bg-emerald-900/10 animate-in fade-in duration-700">
              <div className="inline-block p-4 bg-emerald-500/10 rounded-full text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Clean Slate</h3>
              <p className="text-slate-400">No unusual activity or vulnerabilities were detected in your downloads or apps.</p>
            </div>
          ) : (
            displayVulnerabilities.map((vuln) => (
              <div key={vuln.id} className="glass-card rounded-2xl overflow-hidden group hover:border-brand-500/30 transition-all">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full shadow-[0_0_8px] ${getStatusColor(vuln.severity)}`}></span>
                      <h3 className="text-xl font-bold text-slate-100">{vuln.name}</h3>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase border ${
                        vuln.severity === 'CRITICAL' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                        vuln.severity === 'HIGH' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' :
                        'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                      }`}>
                        {vuln.severity}
                      </span>
                  </div>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">{vuln.description}</p>
                  
                  <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                    <h4 className="text-sm font-bold text-brand-300 uppercase mb-3 flex items-center gap-2">
                      <RotateCcw size={14} /> Recommended Action
                    </h4>
                    <p className="text-slate-200 text-sm">{vuln.remediation}</p>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <button 
                      onClick={handleFixAllClick}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all border border-white/10 text-sm flex justify-center items-center gap-2"
                    >
                      <Trash2 size={16} /> Fix This Issue
                    </button>
                    <button className="px-5 py-3 border border-white/10 text-slate-400 rounded-xl hover:bg-white/5 transition-colors font-medium">
                      Ignore
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
             <h3 className="font-bold text-white mb-6 flex items-center gap-2">
               <Shield size={18} className="text-emerald-400"/> Active Defenses
             </h3>
             <ul className="space-y-4">
               <li className="flex items-center gap-3 text-slate-300 text-sm p-3 bg-white/5 rounded-xl">
                 <CheckCircle size={16} className="text-emerald-400" /> Real-time monitoring
               </li>
               <li className="flex items-center gap-3 text-slate-300 text-sm p-3 bg-white/5 rounded-xl">
                 <CheckCircle size={16} className="text-emerald-400" /> Download Auto-Scanner
               </li>
               <li className="flex items-center gap-3 text-slate-300 text-sm p-3 bg-white/5 rounded-xl">
                 <CheckCircle size={16} className="text-emerald-400" /> App Lock enabled
               </li>
             </ul>
             <div className="mt-8 pt-6 border-t border-white/10">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3 border border-brand-500/30 text-brand-300 font-bold rounded-xl hover:bg-brand-500/10 transition-colors"
                >
                  Return to Dashboard
                </button>
             </div>
          </div>

          <div className="rounded-3xl p-6 text-white relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-900 border border-brand-500/30 shadow-xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/30 rounded-full blur-2xl"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl"></div>
             
             <h3 className="font-bold text-xl mb-2 relative z-10">Download PDF Report</h3>
             <p className="text-brand-100 text-sm mb-6 relative z-10 opacity-80">Get a detailed technical breakdown for IT admins.</p>
             <button className="w-full bg-white text-brand-900 font-bold py-3 rounded-xl relative z-10 hover:bg-brand-50 transition-colors flex justify-center items-center gap-2">
               <Download size={18} /> Export PDF
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};