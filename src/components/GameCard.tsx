import { Star, Download, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Game } from "../types";

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={() => onClick(game)}
      className="bg-slate-800/80 border border-white/5 rounded-2xl overflow-hidden cursor-pointer group hover:bg-slate-700/80 hover:border-indigo-500/30 transition-all duration-300 shadow-lg"
    >
      <div className={`h-40 bg-gradient-to-br ${game.imageColor} relative flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
        <div className="relative transform group-hover:scale-105 transition-transform duration-700 w-full h-full">
           {game.imageUrl ? (
             <img 
               src={game.imageUrl} 
               alt={game.name} 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center">
               <span className="text-4xl font-bold text-white select-none">{game.name[0]}</span>
             </div>
           )}
        </div>
        
        <div className="absolute top-3 right-3 z-20">
            <div className="bg-slate-900/80 backdrop-blur-md rounded-full px-2 py-0.5 border border-white/10 flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] font-black text-white">{game.rating}</span>
            </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-400/90 bg-indigo-500/5 px-2 py-0.5 rounded-full border border-indigo-500/10">
            {game.category}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">{game.size}</span>
        </div>
        
        <h3 className="text-base font-bold text-slate-100 mb-1 group-hover:text-white transition-colors line-clamp-1">{game.name}</h3>
        
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Download className="w-3 h-3" />
            <span>{game.downloads}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
            <ShieldCheck className="w-3 h-3" />
            <span>VERIFIED</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
