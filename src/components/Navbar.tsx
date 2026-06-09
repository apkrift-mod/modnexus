import { Cpu, Search, Menu, BookOpen } from "lucide-react";
import { motion } from "motion/react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group cursor-pointer">
          <motion.div 
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-500 transition-colors"
          >
            <Cpu className="text-white w-6 h-6" />
          </motion.div>
          <span className="text-xl font-bold tracking-tighter text-white">MOD<span className="text-indigo-500 group-hover:text-indigo-400 transition-colors">NEXUS</span></span>
        </a>

        {/* Navigation links for SEO content */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-400">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#mods" className="hover:text-white transition-colors">Browse All Mods</a>
          <a href="#how-to-install-mod-apk" className="hover:text-white transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>How to Install</span>
          </a>
          <a href="#blog/best-mod-apk-sites-2026" className="hover:text-white transition-colors">Sites 2026</a>
          <a href="#blog/safe-apk-download-guide" className="hover:text-white transition-colors">Safety Guide</a>
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
