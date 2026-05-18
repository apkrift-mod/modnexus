import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Zap, Lock, Star, ChevronRight, Gamepad2, Info } from "lucide-react";
import Navbar from "./components/Navbar";
import GameCard from "./components/GameCard";
import DownloadModal from "./components/DownloadModal";
import { GAMES, Game } from "./types";

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative px-4 pt-10 pb-16 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-400 text-xs font-bold mb-6"
            >
              <Zap className="w-3 h-3 fill-indigo-400" />
              <span>PREMIUM MOD APK HUB</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight uppercase px-4 text-white"
            >
              LEVEL UP YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400">MOBILE GAMING.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 mb-10 leading-relaxed"
            >
              Download premium modded versions of top mobile games. 
              Safe, tested, and updated daily.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 group">
                Browse All Mods
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl font-bold transition-all">
                Join Community
              </button>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="px-4 py-8 md:py-12">
            <div className="max-w-7xl mx-auto py-8 md:py-12 border-y border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="flex gap-4 p-2 md:p-4">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Total Security</h4>
                        <p className="text-sm text-white/40">Every APK is manually scanned and tested for your safety.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-4">
                    <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <Zap className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Fast Updates</h4>
                        <p className="text-sm text-white/40">Daily updates to ensure mods work with the latest game versions.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-4">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <Star className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Premium Features</h4>
                        <p className="text-sm text-white/40">Unlock all skins, unlimited currency, and exclusive features.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Game Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <span className="text-indigo-500 font-bold tracking-widest text-[10px] uppercase mb-2 block text-center md:text-left">Available Now</span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-center md:text-left uppercase">Featured Mods</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/40 hover:text-indigo-400 cursor-pointer transition-colors text-sm font-bold">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {GAMES.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <GameCard game={game} onClick={setSelectedGame} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Protection Info */}
        <section className="px-4 py-12 md:py-20 bg-slate-900/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black mb-6 uppercase text-white">Why ModNexus?</h3>
                        <p className="text-sm md:text-base text-slate-400 mb-8 leading-relaxed">
                            Most mod websites are filled with spam and intrusive ads. We provide a clean, high-performance platform for quality mods without the risk.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "No Subscription", desc: "Access everything without hidden costs." },
                                { title: "High Speed Servers", desc: "No bandwidth throttling on your downloads." },
                                { title: "Active Community", desc: "Tested by thousands of players worldwide." },
                                { title: "Daily Scans", desc: "Every file is re-scanned every 24 hours." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                                    <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-slate-100 text-[13px]">{item.title}</h5>
                                        <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[16/10] sm:aspect-square bg-gradient-to-br from-indigo-600/20 to-transparent rounded-3xl border border-white/10 p-6 md:p-8 flex items-center justify-center overflow-hidden">
                            <Shield className="w-48 h-48 md:w-64 md:h-64 opacity-20 absolute" />
                            <div className="relative z-10 text-center">
                                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                                    <Shield className="w-8 h-8 text-emerald-500" />
                                </div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter">Secure Downloader</h4>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Verified Infrastructure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">MODNEXUS</span>
          </div>
          
          <div className="flex gap-8 text-sm text-white/40 px-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">DMCA</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-[10px] text-white/20 font-mono">
            EST. 2024 • PREMIUM MODDING SOLUTIONS
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedGame && (
          <DownloadModal 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
