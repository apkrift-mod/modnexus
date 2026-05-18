import { Cpu, Search, Menu } from "lucide-react";
import { motion } from "motion/react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20"
          >
            <Cpu className="text-white w-6 h-6" />
          </motion.div>
          <span className="text-xl font-bold tracking-tighter text-white">MOD<span className="text-indigo-500">NEXUS</span></span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search mods..." 
              className="bg-slate-900 border border-white/5 rounded-full py-1.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-36 sm:w-48 lg:w-64"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
