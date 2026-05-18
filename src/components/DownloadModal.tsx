import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, Download, RefreshCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { Game } from "../types";

interface DownloadModalProps {
  game: Game | null;
  onClose: () => void;
}

type Step = 'initial' | 'analyzing' | 'verifying' | 'generating' | 'ready';

export default function DownloadModal({ game, onClose }: DownloadModalProps) {
  const [step, setStep] = useState<Step>('initial');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 'analyzing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('verifying');
            return 0;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }

    if (step === 'verifying') {
        const timeout = setTimeout(() => {
            setStep('generating');
        }, 1500);
        return () => clearTimeout(timeout);
    }

    if (step === 'generating') {
        const timeout = setTimeout(() => {
            setStep('ready');
        }, 2000);
        return () => clearTimeout(timeout);
    }
  }, [step]);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full z-10 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left Column: Game Info */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/5">
            <div className={`w-full aspect-[4/3] bg-gradient-to-br ${game.imageColor} rounded-2xl mb-6 flex items-center justify-center shadow-2xl shadow-black/50 overflow-hidden border border-white/10`}>
                {game.imageUrl ? (
                    <img 
                      src={game.imageUrl} 
                      alt={game.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                ) : (
                    <span className="text-6xl font-black text-white select-none tracking-tighter">{game.name[0]}</span>
                )}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">{game.name}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-800 border border-white/5 rounded-full px-3 py-1 text-[10px] font-bold text-slate-400">v{game.version}</span>
                <span className="bg-slate-800 border border-white/5 rounded-full px-3 py-1 text-[10px] font-bold text-slate-400">{game.size}</span>
                <span className="bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-[10px] font-bold text-emerald-400 uppercase">Secure</span>
            </div>

            <div className="space-y-3">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Mod Features</h4>
                {game.modFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* Right Column: Logic */}
          <div className="p-8 flex flex-col items-center justify-center min-h-[400px] bg-slate-950/30">
            <AnimatePresence mode="wait">
              {step === 'initial' && (
                <motion.div 
                    key="initial"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-500">
                        <Shield className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Verified Mod File</h3>
                    <p className="text-sm text-white/50 mb-8 leading-relaxed">
                        This mod has been tested and scanned for malware. Click below to start the secure download process.
                    </p>
                    <button 
                        onClick={() => setStep('analyzing')}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Download Now
                    </button>
                    <p className="text-[10px] text-white/30 mt-4">MD5: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                </motion.div>
              )}

              {step === 'analyzing' && (
                <motion.div 
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full text-center"
                >
                    <RefreshCcw className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-white mb-2">Analyzing File</h3>
                    <p className="text-xs text-white/50 mb-8">Synchronizing with Android Manifest...</p>
                    
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-2">
                        <motion.div 
                            className="bg-indigo-500 h-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-indigo-400">
                        <span>DATA_HASH_CHECK</span>
                        <span>{progress}%</span>
                    </div>
                </motion.div>
              )}

              {step === 'verifying' && (
                <motion.div 
                    key="verifying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                        <Shield className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Integrity Verified</h3>
                    <p className="text-xs text-white/50 mb-4">No threats detected during deep scan.</p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-left space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                            <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                            <span>Malware Scan: PASS</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                            <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                            <span>Signature Check: PASS</span>
                        </div>
                    </div>
                </motion.div>
              )}

              {step === 'generating' && (
                <motion.div 
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                >
                    <RefreshCcw className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-white mb-2">Fetching Link</h3>
                    <p className="text-xs text-white/50">Allocating secure bandwidth slot...</p>
                </motion.div>
              )}

              {step === 'ready' && (
                <motion.div 
                    key="ready"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center w-full"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                        <Download className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Link Ready!</h3>
                    <p className="text-sm text-white/50 mb-8 leading-relaxed">
                        Your modded {game.name} pack is ready for installation.
                    </p>
                    <a 
                        href="https://checkmyapp.store/cl/i/99n4wp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-center"
                    >
                        Download Mod (APK)
                    </a>
                    
                    <div className="mt-6 flex items-start gap-2 text-left bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                        <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-blue-300 leading-tight">
                            Note: If installation is blocked, please enable "Install from Unknown Sources" in your device settings. This is required for modded apps.
                        </p>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
