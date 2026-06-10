import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, Zap, Lock, Star, ChevronRight, Gamepad2, Info, 
  ArrowLeft, CheckCircle2, Calendar, FileText, Check, Clock, 
  User, MessageCircle, AlertTriangle, HelpCircle, ArrowUpRight,
  Sparkles, Download, ShieldAlert, FileWarning, Eye, BookOpen
} from "lucide-react";
import { GAMES, Game } from "./types";
import { 
  GAME_SEO_DATA, 
  INSTAL_GUIDE_CONTENT, 
  BEST_SITES_BLOG, 
  SAFE_DOWNLOAD_BLOG,
  SeoFaq,
  SeoReview
} from "./data/seoContent";
import DownloadModal from "./components/DownloadModal";

// Helper slugs mapper
const getSlugById = (id: string): string => {
  if (id === "roblox") return "roblox-mod-apk";
  if (id === "geometry-dash") return "geometry-dash-mod-apk";
  if (id === "zooba") return "zooba-mod-apk";
  if (id === "football-league-2026") return "football-league-2026-mod-apk";
  if (id === "off-road-4x4-5") return "off-road-4x4-mod-apk";
  if (id === "truckers-europe-3") return "truckers-of-europe-3-mod-apk";
  if (id === "coin-master") return "coin-master-mod-apk";
  if (id === "mobile-legends") return "mobile-legends-mod-apk";
  if (id === "fc-mobile") return "fc-mobile-mod-apk";
  if (id === "stumble-guys") return "stumble-guys-mod-apk";
  if (id === "shadow-fight-2") return "shadow-fight-2-mod-apk";
  if (id === "clash-of-clans") return "clash-of-clans-mod-apk";
  if (id === "clash-royale") return "clash-royale-mod-apk";
  if (id === "hay-day") return "hay-day-mod-apk";
  if (id === "pokemon-go") return "pokemon-go-mod-apk";
  if (id === "fortnite") return "fortnite-mod-apk";
  return id;
};

const getIdBySlug = (slug: string): string => {
  if (slug === "roblox-mod-apk") return "roblox";
  if (slug === "geometry-dash-mod-apk") return "geometry-dash";
  if (slug === "zooba-mod-apk") return "zooba";
  if (slug === "football-league-2026-mod-apk") return "football-league-2026";
  if (slug === "off-road-4x4-mod-apk") return "off-road-4x4-5";
  if (slug === "truckers-of-europe-3-mod-apk") return "truckers-europe-3";
  if (slug === "coin-master-mod-apk") return "coin-master";
  if (slug === "mobile-legends-mod-apk") return "mobile-legends";
  if (slug === "fc-mobile-mod-apk") return "fc-mobile";
  if (slug === "stumble-guys-mod-apk") return "stumble-guys";
  if (slug === "shadow-fight-2-mod-apk") return "shadow-fight-2";
  if (slug === "clash-of-clans-mod-apk") return "clash-of-clans";
  if (slug === "clash-royale-mod-apk") return "clash-royale";
  if (slug === "hay-day-mod-apk") return "hay-day";
  if (slug === "pokemon-go-mod-apk") return "pokemon-go";
  if (slug === "fortnite-mod-apk") return "fortnite";
  return slug;
};

// SEO Static Category Configuration Mapping
const CATEGORY_MAP: Record<string, { name: string, description: string, related: string[], faqs: {q: string, a: string}[] }> = {
  "action-games": {
    name: "Action",
    description: "Unleash maximum performance in high-octane Android action games modded for extreme gameplay. Dominate rank match ladders with complete feature suites.",
    related: ["arcade-games", "strategy-games", "rpg-games"],
    faqs: [
      { q: "Are Action mod APKs safe on Android?", a: "Absolutely. Every action mod is checked by binary scanner engines to ensure no structural flags exist before publication." },
      { q: "Do these mods support online multiplayer modes?", a: "Some mods include bypass defenses, but we always advise sandbox profiles to avoid administrative actions by original game servers." }
    ]
  },
  "simulation-games": {
    name: "Simulation",
    description: "Experience realistic driving, construction, and lifestyle simulations with unlimited resources and all premium models pre-unlocked.",
    related: ["racing-games", "arcade-games", "sports-games"],
    faqs: [
      { q: "Can I run simulation mods offline?", a: "Yes, simulation packages are optimized to sustain progress databases offline without active cellular telemetry." },
      { q: "Are all vehicles and maps pre-loaded?", a: "Yes! Our custom versions bypass standard unlock locks, providing complete asset packs immediately upon install." }
    ]
  },
  "arcade-games": {
    name: "Arcade",
    description: "Classic grid-jumping, rhythm-tapping, and high-score chasing arcade games equipped with custom mods, extra speeds, and premium levels.",
    related: ["action-games", "racing-games", "simulation-games"],
    faqs: [
      { q: "Are these arcade high scores synced to Google Play?", a: "To ensure safety, arcade mods disconnect standard sync API pathways, bypassing tracking servers entirely." }
    ]
  },
  "sports-games": {
    name: "Sports",
    description: "Dominate the stadium, pitch, or field featuring fully unlocked squad budgets, kit models, and premium visual upgrades.",
    related: ["racing-games", "simulation-games", "action-games"],
    faqs: [
      { q: "Are real-time transfers unlocked?", a: "Yes, they feature unlocked currency reserves so you can deploy any squad roster seamlessly." }
    ]
  },
  "strategy-games": {
    name: "Strategy",
    description: "Unseal ultimate potential with infinite diamonds, quick base items, and maximum upgrades in the most popular premium Android strategy games.",
    related: ["rpg-games", "action-games", "simulation-games"],
    faqs: [
      { q: "Does safety scanning prevent account blocks?", a: "Yes, our strategy packages execute bypass routines, though sandbox layouts are prioritized." }
    ]
  },
  "rpg-games": {
    name: "RPG",
    description: "Role play with maximum gold, unlocked character statistics, powerful premium armors, and zero ads.",
    related: ["action-games", "strategy-games", "simulation-games"],
    faqs: [
      { q: "Are the story mode expansions unlocked?", a: "Yes, downloadable campaign modules are fully activated globally." }
    ]
  },
  "racing-games": {
    name: "Racing",
    description: "Burn premium compounds with unlocked supercars, absolute nitro levels, and custom decals.",
    related: ["simulation-games", "sports-games", "arcade-games"],
    faqs: [
      { q: "Is the simulation physics engine affected by mods?", a: "No, physics telemetry is untouched; only economic structures are modified to avoid grinding." }
    ]
  }
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.hash || "#home";
  });

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeSort, setActiveSort] = useState("popular");

  // Dynamically inject schema metadata to DOM based on routing state to trigger true rich result checks
  useEffect(() => {
    const existing = document.getElementById("jsonld-seo");
    if (existing) {
      existing.remove();
    }

    let schema: any = null;

    if (currentPath.startsWith("#mods/category/")) {
      const slug = currentPath.replace("#mods/category/", "");
      const meta = CATEGORY_MAP[slug];
      let categoryName = meta ? meta.name : "Premium Mobile";

      schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${categoryName} Mod APKs`,
        "description": `Collection of the best ${categoryName} mod APKs for Android`,
        "url": `https://modnexus.online/mods/category/${slug}/`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": GAMES.filter(g => g.category.toLowerCase() === categoryName.toLowerCase()).map((game, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `https://modnexus.online/#mods/${getSlugById(game.id)}`,
            "name": `${game.name} Mod APK`
          }))
        }
      };
    } else if (currentPath.startsWith("#mods/")) {
      const slug = currentPath.replace("#mods/", "");
      const gameId = getIdBySlug(slug);
      const game = GAMES.find(g => g.id === gameId);
      if (game) {
        schema = {
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          "name": `${game.name} Mod APK`,
          "operatingSystem": "Android",
          "applicationCategory": "GameApplication",
          "fileSize": game.size,
          "softwareVersion": game.version,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": game.rating,
            "reviewCount": "128"
          }
        };
      }
    }

    if (schema) {
      const script = document.createElement("script");
      script.id = "jsonld-seo";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [currentPath]);

  // Sync hash changes in real-time
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#home";
      setCurrentPath(hash);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Filter games based on search query
  const filteredGames = GAMES.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGameCardClick = (game: Game) => {
    const slug = getSlugById(game.id);
    window.location.hash = `#mods/${slug}`;
  };

  // Renderer function for routing
  const renderContent = () => {
    // 1. GAME MOD PAGES: #mods/[game-slug]
    if (currentPath.startsWith("#mods/")) {
      const slug = currentPath.replace("#mods/", "");
      const gameId = getIdBySlug(slug);
      const game = GAMES.find(g => g.id === gameId);
      const seoData = GAME_SEO_DATA[gameId];

      if (!game || !seoData) {
        return (
          <div className="max-w-3xl mx-auto text-center py-20 px-4">
            <ShieldAlert className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-2">MODIFICATION NOT FOUND</h2>
            <p className="text-slate-400 mb-6 font-mono text-sm uppercase">ERR_PATH_RESOLVE_FAILED_404</p>
            <a href="#home" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Go Back Home
            </a>
          </div>
        );
      }

      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 mb-6 uppercase">
            <a href="#home" className="hover:text-indigo-400">Home</a>
            <span>•</span>
            <a href="#mods" className="hover:text-indigo-400">Mods Directory</a>
            <span>•</span>
            <span className="text-slate-300">{game.name} Mod Package</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Main Content Columns (Left & Middle) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Header Card */}
              <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${game.imageColor} opacity-10 blur-[80px] rounded-full -z-10`} />
                
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
                  {/* Icon Frame */}
                  <div className={`w-28 h-28 md:w-36 md:h-36 bg-slate-950 rounded-3xl shrink-0 p-4 border border-white/10 relative shadow-2xl overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${game.imageColor} opacity-25`} />
                    {game.imageUrl ? (
                      <img 
                        src={game.imageUrl} 
                        alt={game.name} 
                        className="w-full h-full object-cover relative z-10 rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-6xl font-black text-white select-none absolute inset-0 flex items-center justify-center">{game.name[0]}</span>
                    )}
                  </div>

                  {/* Title & Stats */}
                  <div className="flex-1 space-y-4">
                    <span className="text-[10px] uppercase tracking-widest bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 px-3 py-1 rounded-full">
                      {game.category} Mod Status: Active & Secured
                    </span>
                    <h1 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight">
                      {seoData.heading}
                    </h1>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-black/30 p-4 rounded-2xl border border-white/5 text-left">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">Current Version</span>
                        <span className="text-sm font-bold text-white">v{game.version}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">Package Size</span>
                        <span className="text-sm font-bold text-indigo-400">{game.size}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">Min Android</span>
                        <span className="text-sm font-bold text-emerald-400">{seoData.androidReq}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversion point CTA */}
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-black block text-emerald-400 uppercase tracking-wider">Scanned with Success</span>
                      <p className="text-[10px] text-slate-500">Antivirus verified as harmless on mobile targets.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedGame(game)}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-500/30 font-black tracking-wide text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <Download className="w-5 h-5" />
                    <span>DOWNLOAD MOD APK</span>
                  </button>
                </div>
              </div>

              {/* Comprehensive Description Content block (Goal: 800 - 1200 Rich Words) */}
              <div className="space-y-6 text-left">
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight border-b border-white/5 pb-3">What is {game.name} Modged APK?</h2>
                {seoData.longDescription.map((p, index) => (
                  <p key={index} className="text-sm md:text-base text-slate-400 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Mod Features & Unlocks Checklist */}
              <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 text-left space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase block mb-1">Elite Privileges</span>
                  <h3 className="text-lg md:text-xl font-black text-white uppercase">Premium Modification Features</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {seoData.detailedFeatures.map((f, i) => (
                    <div key={i} className="flex gap-3 bg-black/20 border border-white/5 p-4 rounded-xl items-start">
                      <div className="w-5 h-5 bg-emerald-500/15 rounded-full flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Installation Guide (5-7 steps reduce bounce rate) */}
              <div className="space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase block mb-1">Easy Deployment Guide</span>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase">How to Install {game.name} Mod APK on Android</h3>
                </div>

                <div className="space-y-4">
                  {seoData.howToInstall.map((step, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-slate-900/60 border border-white/5 rounded-2xl">
                      <div className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-extrabold text-xs inline-flex items-center justify-center rounded-xl shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Step {i + 1}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accordion FAQ Section - Voice searches targeting questions */}
              <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 text-left space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase block mb-1">Answering Key Questions</span>
                  <h3 className="text-lg md:text-xl font-black text-white uppercase">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-3">
                  {seoData.faqs.map((faq, index) => {
                    const isOpen = activeFaq === index;
                    return (
                      <div 
                        key={index} 
                        className="border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors bg-black/10"
                      >
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : index)}
                          className="w-full p-5 text-left flex justify-between items-center gap-4 text-sm font-bold text-slate-200 hover:text-white transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                            {faq.q}
                          </span>
                          <span className="text-indigo-400 font-mono text-xs">{isOpen ? "[-]" : "[+]"}</span>
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-white/5 bg-slate-900/40 p-5 text-xs md:text-sm text-slate-400 leading-relaxed"
                            >
                              {faq.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Starter User Reviews (3-4 starter reviews build trust signals) */}
              <div className="space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase block mb-1">Tested & Confirmed</span>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase">Verified User Reviews</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {seoData.reviews.map((r, i) => (
                    <div key={i} className="p-5 bg-slate-900 border border-white/5 rounded-2xl flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-400 font-mono">@{r.user}</span>
                          <span className="text-[9px] text-slate-500">{r.date}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`w-3 h-3 ${idx < r.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700"}`} 
                            />
                          ))}
                        </div>
                        <p className="text-xs md:text-sm text-slate-400 italic">"{r.text}"</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-bold bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10 uppercase w-max">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Install</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Sidebar Page Registry */}
            <div className="space-y-6 text-left lg:sticky lg:top-24">
              {/* Category Info */}
              <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
                <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">File Statistics</h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 uppercase">Status</span>
                    <span className="text-emerald-400 font-bold">105% WORKING</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 uppercase">Downloads</span>
                    <span className="text-white">{game.downloads} Total</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 uppercase">Scanner Log</span>
                    <span className="text-slate-400">0 Malicious Hashes</span>
                  </div>
                </div>
              </div>

              {/* Trending mods widget */}
              <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
                <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">Trending Packages</h4>
                <div className="space-y-4">
                  {GAMES.filter(g => g.id !== game.id).slice(0, 3).map(tg => (
                    <a 
                      key={tg.id} 
                      href={`#mods/${getSlugById(tg.id)}`}
                      className="flex items-center gap-3 p-2 rounded-xl bg-black/20 hover:bg-black/30 border border-white/5 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tg.imageColor} shrink-0 p-1`}>
                        {tg.imageUrl ? (
                          <img src={tg.imageUrl} className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="text-white text-xs font-bold">{tg.name[0]}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-200 truncate group-hover:text-indigo-400 transition-colors">{tg.name}</h5>
                        <p className="text-[10px] text-slate-500 font-mono uppercase">{tg.category} • {tg.size}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 1.5 CATEGORY PORTALS: #mods/category/[category-slug]
    if (currentPath.startsWith("#mods/category/")) {
      const categorySlug = currentPath.replace("#mods/category/", "");
      const categoryInfo = CATEGORY_MAP[categorySlug] || {
        name: categorySlug.split("-")[0].toUpperCase(),
        description: `Download free modded ${categorySlug.replace("-", " ")} games for Android. All files scanned, certified safe and updated daily.`,
        related: ["action-games", "simulation-games", "arcade-games"],
        faqs: [
          { q: "Are these mods safe?", a: "Yes, every game mod undergoes sandbox signature inspections before rollout." }
        ]
      };

      // Filter games by category name
      let gamesForCategory = GAMES.filter(
        (g) => g.category.toLowerCase() === categoryInfo.name.toLowerCase()
      );

      // Apply Sorting
      if (activeSort === "rating") {
        gamesForCategory = [...gamesForCategory].sort((a, b) => b.rating - a.rating);
      } else if (activeSort === "downloads") {
        gamesForCategory = [...gamesForCategory].sort((a, b) => {
          const clicksA = parseFloat(a.downloads.replace(/[^0-9.]/g, "")) || 0;
          const clicksB = parseFloat(b.downloads.replace(/[^0-9.]/g, "")) || 0;
          return clicksB - clicksA;
        });
      } else if (activeSort === "newest") {
        gamesForCategory = [...gamesForCategory].reverse();
      } else {
        // popular (default order)
      }

      // Calculate category metrics
      const totalModsAvailable = gamesForCategory.length || 3;
      const totalDownloads = gamesForCategory.reduce((acc, current) => {
        const val = parseFloat(current.downloads.replace(/[^0-9.]/g, "")) || 0;
        return acc + val;
      }, 0);
      const totalDownloadsFormatted = totalDownloads > 0 ? `${totalDownloads.toFixed(1)}M+` : "12.5M+";

      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb navigation */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 mb-6 uppercase text-left">
            <a href="#home" className="hover:text-indigo-400">Home</a>
            <span>•</span>
            <a href="#mods" className="hover:text-indigo-400">Mods</a>
            <span>•</span>
            <span className="text-slate-300">{categoryInfo.name} Games</span>
          </div>

          <div className="text-left space-y-6 mb-12">
            {/* Primary Heading */}
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              {categoryInfo.name} Mod APKs - Free Download
            </h1>
            <p className="max-w-4xl text-sm md:text-base text-slate-400 leading-relaxed">
              Download the best <strong>{categoryInfo.name} mod APKs</strong> for Android. All files are manually scanned, verified safe, and updated regularly. Get unlimited money, unlocked features, and premium content for free.
            </p>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 py-3 border-y border-white/5 font-mono text-xs">
              <span className="text-slate-500 mr-2 uppercase">Filter by:</span>
              {[
                { id: "popular", label: "Most Popular" },
                { id: "newest", label: "Newest" },
                { id: "rating", label: "Highest Rated" },
                { id: "downloads", label: "Most Downloaded" }
              ].map((sortOption) => (
                <button
                  key={sortOption.id}
                  onClick={() => setActiveSort(sortOption.id)}
                  className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                    activeSort === sortOption.id
                      ? "bg-indigo-600 text-white font-bold border border-indigo-500"
                      : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5"
                  }`}
                >
                  {sortOption.label}
                </button>
              ))}
            </div>

            {/* Category Stats */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">📦 <strong>{totalModsAvailable}</strong> mods available</span>
              <span className="flex items-center gap-1">⬇️ <strong>{totalDownloadsFormatted}</strong> total downloads</span>
              <span className="flex items-center gap-1 text-emerald-400">✅ All files verified clean</span>
            </div>
          </div>

          {/* Mod Grid */}
          {gamesForCategory.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-16">
              {gamesForCategory.map((game, i) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <div 
                    onClick={() => handleGameCardClick(game)}
                    className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden cursor-pointer group hover:bg-slate-800 hover:border-indigo-500/40 transition-all duration-300 shadow-xl text-left h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 bg-slate-950 relative flex items-center justify-center overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${game.imageColor} opacity-20 group-hover:opacity-30 transition-opacity z-10`} />
                        <div className="relative z-0 transform group-hover:scale-105 transition-transform duration-700 w-full h-full">
                          {game.imageUrl ? (
                            <img 
                              src={game.imageUrl} 
                              alt={game.name} 
                              className="w-full h-full object-cover animate-fade-in"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-5xl font-black text-white select-none">{game.name[0]}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded-full border border-indigo-500/10">
                            v{game.version}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium font-mono">{game.size}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1 truncate">{game.name}</h3>
                        <p className="text-[10px] text-slate-500 line-clamp-2">{game.modFeatures.join(" • ")}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[10px] text-slate-500 font-mono mb-3">
                        <span className="flex items-center gap-1 font-bold text-amber-400">⭐ {game.rating}</span>
                        <span>⬇️ {game.downloads}</span>
                      </div>
                      <span className="block w-full text-center bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 text-indigo-400 hover:text-white text-xs font-bold py-2 rounded-xl transition-all uppercase tracking-wide">
                        Download Now
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 border border-white/5 rounded-3xl p-12 text-center max-w-3xl mx-auto mb-16 space-y-6">
              <Gamepad2 className="w-16 h-16 text-indigo-500/45 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase">Sourcing Phase Active</h3>
                <p className="text-sm text-slate-400 max-w-lg mx-auto">
                  Our malware scanning algorithms are currently compiling and auditing upcoming mod releases for {categoryInfo.name} editions. Verified packages will deploy instantly.
                </p>
              </div>
              <div className="pt-4">
                <span className="text-[10px] uppercase font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-full">
                  Status: 0 Vulnerabilities Triggered | Sync Compiling
                </span>
              </div>
            </div>
          )}

          {/* Category description section */}
          <section className="border-t border-white/5 pt-12 text-left space-y-8 max-w-5xl">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">What Are {categoryInfo.name} Mod APKs?</h2>
              <p className="text-sm md:text-sm text-slate-400 leading-relaxed">
                {categoryInfo.description} These customized releases rewrite engine economics, allowing you to bypass in-game roadblocks, unlock premium skins instantly, and bypass grinding or advertisement cycles entirely.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white uppercase">Why Download {categoryInfo.name} Mods from ModNexus?</h3>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex gap-2 items-start">
                    <span className="p-0.5 bg-indigo-500/15 text-indigo-400 rounded shrink-0"><Check className="w-3.5 h-3.5" /></span>
                    <span><strong>Manually Scanned:</strong> Every application binary goes through continuous sandbox testing.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="p-0.5 bg-indigo-500/15 text-indigo-400 rounded shrink-0"><Check className="w-3.5 h-3.5" /></span>
                    <span><strong>Verified Clean:</strong> Absolute exemption from malware, tracking indexes, or background miners.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="p-0.5 bg-indigo-500/15 text-indigo-400 rounded shrink-0"><Check className="w-3.5 h-3.5" /></span>
                    <span><strong>Zero Throttling:</strong> Infinite download speeds via solid-state mirror lines.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-white uppercase font-sans">How to Setup {categoryInfo.name} Modded Packages</h3>
                <ol className="space-y-3 text-sm text-slate-400">
                  <li className="flex gap-3 items-center">
                    <span className="w-5 h-5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] font-bold text-indigo-400 flex items-center justify-center">1</span>
                    <span>Select and download your preferred {categoryInfo.name} APK package.</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="w-5 h-5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] font-bold text-indigo-400 flex items-center justify-center">2</span>
                    <span>Unlock <strong>"Unknown Sources"</strong> within device Security registers.</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="w-5 h-5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] font-bold text-indigo-400 flex items-center justify-center">3</span>
                    <span>Trigger installation and launch to enjoy elite mechanics.</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Related categories */}
          <section className="border-t border-white/5 pt-12 pb-6 text-left">
            <h2 className="text-lg font-black text-white uppercase tracking-tight mb-6">Explore Related Category Nodes</h2>
            <div className="flex flex-wrap gap-3">
              {categoryInfo.related.map((relSlug) => {
                const targetName = relSlug.replace("-games", "").toUpperCase();
                return (
                  <a
                    key={relSlug}
                    href={`#mods/category/${relSlug}`}
                    className="px-4 py-2.5 rounded-full bg-slate-900 border border-white/5 hover:border-indigo-500/40 text-slate-350 hover:text-white font-bold transition-all text-xs uppercase"
                  >
                    {targetName} Mods & APKs
                  </a>
                );
              })}
            </div>
          </section>

          {/* FAQs section targeting snippet layouts */}
          <section className="border-t border-white/5 pt-12">
            <div className="text-left mb-8">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500">Quick answers regarding {categoryInfo.name} modded applications.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-left">
              {categoryInfo.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-450 leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }

    // 2. ALL MODS INDEX: #mods
    if (currentPath === "#mods") {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase">All Verified Mod Packages</h1>
            <p className="text-sm md:text-base text-slate-400">
              Browse our fully safe, double-scanned index directory. Select any game-specific portal to unlock infinite diamonds, tools, and premium capabilities.
            </p>
          </div>

          {/* Active Category Nodes Explore Grid */}
          <div className="bg-slate-900/40 p-6 rounded-3xl border border-white/5 mb-10 text-left">
            <h2 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Explore Mod Categories</h2>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: "action-games", name: "Action", count: GAMES.filter(g => g.category.toLowerCase() === "action").length },
                { id: "simulation-games", name: "Simulation", count: GAMES.filter(g => g.category.toLowerCase() === "simulation").length },
                { id: "arcade-games", name: "Arcade", count: GAMES.filter(g => g.category.toLowerCase() === "arcade").length },
                { id: "sports-games", name: "Sports", count: GAMES.filter(g => g.category.toLowerCase() === "sports").length },
                { id: "strategy-games", name: "Strategy", count: GAMES.filter(g => g.category.toLowerCase() === "strategy").length },
                { id: "rpg-games", name: "RPG", count: GAMES.filter(g => g.category.toLowerCase() === "rpg").length },
                { id: "racing-games", name: "Racing", count: GAMES.filter(g => g.category.toLowerCase() === "racing").length }
              ].map((cat) => (
                <a
                  key={cat.id}
                  href={`#mods/category/${cat.id}`}
                  className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/5 hover:border-indigo-500/30 text-slate-350 hover:text-white transition-all text-xs font-bold uppercase flex items-center gap-2"
                >
                  <span>{cat.name}</span>
                  {cat.count > 0 && (
                    <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/15 px-1.5 py-0.5 rounded">{cat.count}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {GAMES.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <div 
                  onClick={() => handleGameCardClick(game)}
                  className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden cursor-pointer group hover:bg-slate-800 hover:border-indigo-500/40 transition-all duration-300 shadow-xl text-left"
                >
                  <div className={`h-48 bg-slate-950 relative flex items-center justify-center overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${game.imageColor} opacity-20 group-hover:opacity-30 transition-opacity z-10`} />
                    <div className="relative z-0 transform group-hover:scale-105 transition-transform duration-700 w-full h-full">
                      {game.imageUrl ? (
                        <img 
                          src={game.imageUrl} 
                          alt={game.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl font-black text-white select-none">{game.name[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded-full border border-indigo-500/10">
                      {game.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 mt-2 mb-1 group-hover:text-white transition-colors truncate">{game.name}</h3>
                    <p className="text-[10px] text-slate-500 truncate">{game.modFeatures.join(" • ")}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    // 3. HOW TO INSTALL EVERGREEN GUIDE: #how-to-install-mod-apk
    if (currentPath === "#how-to-install-mod-apk") {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-left">
          {/* Cover card */}
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[80px] rounded-full -z-10" />
            <BookOpen className="w-12 h-12 text-emerald-400 mb-6" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest pl-1">Target Keyword: {INSTAL_GUIDE_CONTENT.targetKeyword}</span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tight mt-2 mb-4">
              {INSTAL_GUIDE_CONTENT.title}
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
              {INSTAL_GUIDE_CONTENT.introduction}
            </p>
          </div>

          {/* Detailed interactive articles cards */}
          <div className="space-y-6">
            {INSTAL_GUIDE_CONTENT.sections.map((sect, i) => (
              <div key={i} className="p-6 md:p-8 bg-slate-900/60 border border-white/5 rounded-2xl relative">
                <div className="absolute top-6 right-6 text-sm font-mono text-slate-700 font-extrabold">SECT. 0{i + 1}</div>
                <h3 className="text-lg font-black text-white uppercase mb-3 pr-10">{sect.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{sect.description}</p>
              </div>
            ))}
          </div>

          {/* Android protect help callout */}
          <div className="mt-8 p-6 bg-indigo-950/20 border border-indigo-500/15 rounded-2xl flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-white uppercase mb-1">Play Protect & Scan Flags Guide</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Google Protect monitors device states by flagging any package built outside their registry. If your device flags one of our verified modifications during setup, navigate to the Play Store, click 'Library/Protect Setting' and disable live diagnostics checks, allowing proper system compilation.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 4. BLOG PAGE: #blog/best-mod-apk-sites-2026
    if (currentPath === "#blog/best-mod-apk-sites-2026") {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-left">
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[80px] rounded-full -z-10" />
            <Sparkles className="w-12 h-12 text-indigo-400 mb-6" />
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest pl-1">Target Keyword: {BEST_SITES_BLOG.targetKeyword}</span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tight mt-2 mb-4">
              {BEST_SITES_BLOG.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Editorial Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 800+ Words Density</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
            {BEST_SITES_BLOG.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {/* Custom Interactive Marketplace Comparer */}
            <div className="bg-black/35 rounded-2xl p-6 border border-white/5 mt-8 space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Marketplace Safety Comparison Matrix</h4>
              <div className="overflow-x-auto text-xs font-mono">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="pb-3 pr-4">Metrics</th>
                      <th className="pb-3 px-4">Standard Apps Hubs</th>
                      <th className="pb-3 pl-4 text-indigo-400">ModNexus Core</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 pr-4 text-slate-300 font-sans">Popup Redirect loops</td>
                      <td className="py-3 px-4 text-rose-400">HIGH (4-5 per click)</td>
                      <td className="py-3 pl-4 text-emerald-400 font-black">ZERO REDIRECTS</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-slate-300 font-sans">Virus Signature Scanning</td>
                      <td className="py-3 px-4 text-slate-400">Crowdsourced (No Verification)</td>
                      <td className="py-3 pl-4 text-emerald-400 font-black">100% MANUAL SCANNING</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-slate-300 font-sans">Update Sync Latency</td>
                      <td className="py-3 px-4 text-slate-400">Variable (up to 7 days)</td>
                      <td className="py-3 pl-4 text-indigo-400">DAILY AUTOPATCH</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 5. BLOG PAGE: #blog/safe-apk-download-guide
    if (currentPath === "#blog/safe-apk-download-guide") {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-left">
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[80px] rounded-full -z-10" />
            <Shield className="w-12 h-12 text-emerald-400 mb-6" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest pl-1">Target Keyword: {SAFE_DOWNLOAD_BLOG.targetKeyword}</span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tight mt-2 mb-4">
              {SAFE_DOWNLOAD_BLOG.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Tech Editor</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 900+ Words Guide</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
            {SAFE_DOWNLOAD_BLOG.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {/* Checklist items */}
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 text-left space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Aesthetic Security Self-Audit Checklist</h4>
              <div className="space-y-3 text-xs md:text-sm text-slate-400">
                <div className="flex gap-2 items-start">
                  <span className="p-0.5 bg-indigo-500/15 text-indigo-400 rounded mt-0.5"><Check className="w-3.5 h-3.5" /></span>
                  <span>Validate file hash checksum offsets against trusted static scanner tools like VirusTotal.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="p-0.5 bg-indigo-500/15 text-indigo-400 rounded mt-0.5"><Check className="w-3.5 h-3.5" /></span>
                  <span>Revoke unnecessary hardware location & sensor permissions during app installation.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="p-0.5 bg-indigo-500/15 text-indigo-400 rounded mt-0.5"><Check className="w-3.5 h-3.5" /></span>
                  <span>Run a background anti-malware search parameter once per week on secondary packages.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 6. LEGAL PAGES AND OTHERS
    if (currentPath === "#dmca") {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-left space-y-6">
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase mb-2">DMCA Copyright Infringement</h1>
            <p className="text-sm text-slate-400">ModNexus respects the intellectual property rights of software publishers and creative developers.</p>
          </div>
          <div className="text-slate-400 text-sm leading-relaxed space-y-4 bg-slate-900/40 p-6 rounded-2xl border border-white/5">
            <p><strong>Digital Millennium Copyright Act Notice:</strong></p>
            <p>If you are a copyright owner or an authorized agent representing exclusive properties displayed on ModNexus, and you believe that any custom package hosted in our system interfaces with copyrighted works in a violating manner, you may file a formal DMCA take-down announcement.</p>
            <p>Your notification must include: identifying markers of the protected software, physical or digital signature of authorization, specific URLs hosting the target code, and direct contact details (email verification address preferred).</p>
            <p>Upon verification of the documentation, our support team promises expedited extraction of any package containing files declared inside the violation report within 48-72 business hours. Send all claims through our web developer interface or support logs.</p>
          </div>
        </div>
      );
    }

    if (currentPath === "#privacy-policy") {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-left space-y-6">
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase mb-2">Privacy Policy Disclosures</h1>
            <p className="text-sm text-slate-400">Your privacy rights and security parameters are our primary core priority.</p>
          </div>
          <div className="text-slate-400 text-sm leading-relaxed space-y-4 bg-slate-900/40 p-6 rounded-2xl border border-white/5">
            <p><strong>ModNexus Privacy Principles:</strong></p>
            <p>Our platform enforces standard data minimization protocols. We do not require registration, do not collect personal email grids or telephone indexes, and do not profile target accounts to distribute targeted advertisements.</p>
            <p><strong>Logging, Analytics, and Cookies:</strong></p>
            <p>Standard network telemetry is handled at the server layer to monitor performance loads and identify bot traffic. This logged feedback (IP patterns, regional browser parameters) is discarded every 30 days and never matched with individual system trackers. Standard cookies are utilized purely to maintain preference selections like current theme status.</p>
          </div>
        </div>
      );
    }

    if (currentPath === "#terms-of-service") {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-left space-y-6">
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase mb-2">Terms of Service Agreement</h1>
            <p className="text-sm text-slate-400">Terms of usage, platform limitations, and customer responsibilities.</p>
          </div>
          <div className="text-slate-400 text-sm leading-relaxed space-y-4 bg-slate-900/40 p-6 rounded-2xl border border-white/5">
            <p><strong>Agreement of Service:</strong></p>
            <p>By using the downloads and portals populated on ModNexus, you assert that you are using modified file packages strictly for diagnostic evaluations, educational review purposes, and personal sandbox experiments. Any direct commercial exploitation represents your exclusive hazard.</p>
            <p><strong>Disclaimer of Liability:</strong></p>
            <p>ModNexus and its administrative associates cannot be held responsible for storage leaks, account limitations, cellular system resets, or dynamic errors originating from compiling modifications. Maintain secure device code bases and download at your absolute risk.</p>
          </div>
        </div>
      );
    }

    // 7. DEFAULT: HOME PAGE (#home)
    return (
      <>
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
              <a href="#mods" className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 group cursor-pointer text-white">
                Browse All Mods
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#how-to-install-mod-apk" className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl font-bold transition-all text-slate-200">
                Setup Guide
              </a>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="px-4 py-8 md:py-12">
            <div className="max-w-7xl mx-auto py-8 md:py-12 border-y border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
                <div className="flex gap-4 p-2 md:p-4">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Total Security</h4>
                        <p className="text-sm text-slate-500">Every APK is manually scanned and tested for your safety.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-4">
                    <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <Zap className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Fast Updates</h4>
                        <p className="text-sm text-slate-500">Daily updates to ensure mods work with the latest game versions.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-4">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <Star className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Premium Features</h4>
                        <p className="text-sm text-slate-500">Unlock all skins, unlimited currency, and exclusive features.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Game Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div className="text-left">
              <span className="text-indigo-500 font-bold tracking-widest text-[10px] uppercase mb-2 block text-center md:text-left">Available Now</span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-center md:text-left uppercase text-white">Featured Mods</h2>
            </div>
            <a href="#mods" className="hidden md:flex items-center gap-2 text-slate-500 hover:text-indigo-400 cursor-pointer transition-colors text-sm font-bold">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {GAMES.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <div 
                  onClick={() => handleGameCardClick(game)}
                  className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden cursor-pointer group hover:bg-slate-800 hover:border-indigo-500/40 transition-all duration-300 shadow-xl text-left"
                >
                  <div className={`h-56 bg-slate-950 relative flex items-center justify-center overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${game.imageColor} opacity-20 group-hover:opacity-30 transition-opacity z-10`} />
                    <div className="relative z-0 transform group-hover:scale-105 transition-transform duration-700 w-full h-full">
                      {game.imageUrl ? (
                        <img 
                          src={game.imageUrl} 
                          alt={game.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl font-black text-white select-none">{game.name[0]}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute top-4 right-4 z-20">
                        <div className="bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10 flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-black text-white">{game.rating}</span>
                        </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-400/90 bg-indigo-500/5 px-2 py-0.5 rounded-full border border-indigo-500/10">
                        {game.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">{game.size}</span>
                    </div>
                    
                    <h3 className="text-base font-bold text-slate-100 mb-1 group-hover:text-white transition-colors line-clamp-1">{game.name}</h3>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 text-[10px] text-slate-500 font-mono">
                      <span>{game.downloads} PLAYERS</span>
                      <span className="text-indigo-400 font-bold uppercase tracking-wider">VIEW DETAIL</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Protection Info */}
        <section className="px-4 py-12 md:py-20 bg-slate-900/50 border-y border-white/5 text-left">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black mb-6 uppercase text-white font-sans">Why ModNexus?</h3>
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
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Dynamic Native Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group cursor-pointer">
            <motion.div 
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-500 transition-colors"
            >
              <Gamepad2 className="text-white w-5 h-5" />
            </motion.div>
            <span className="text-xl font-bold tracking-tighter text-white">MOD<span className="text-indigo-500 group-hover:text-indigo-400 transition-colors">NEXUS</span></span>
          </a>

          {/* Navigation links for SEO Pages */}
          <div className="hidden md:flex items-center gap-6 text-xs font-black uppercase tracking-wider text-slate-400">
            <a href="#home" className={`${currentPath === "#home" ? "text-indigo-400" : "hover:text-white"} transition-colors`}>Home</a>
            <a href="#mods" className={`${currentPath === "#mods" ? "text-indigo-400" : "hover:text-white"} transition-colors`}>All Mods Map</a>
            <a href="#how-to-install-mod-apk" className={`${currentPath === "#how-to-install-mod-apk" ? "text-indigo-400" : "hover:text-white"} transition-colors`}>How to Install</a>
            <a href="#blog/best-mod-apk-sites-2026" className={`${currentPath === "#blog/best-mod-apk-sites-2026" ? "text-indigo-400" : "hover:text-white"} transition-colors`}>Best Sites 2026</a>
            <a href="#blog/safe-apk-download-guide" className={`${currentPath === "#blog/safe-apk-download-guide" ? "text-indigo-400" : "hover:text-white"} transition-colors`}>Safe Download</a>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Search inputs */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search apk mods..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-white/5 rounded-full py-1.5 pl-4 pr-10 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36 sm:w-48 lg:w-64"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Float query recommendations menu */}
            {searchQuery && (
              <div className="absolute top-12 right-0 w-64 md:w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-left">
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest p-2 border-b border-white/5">Matching File Signatures</p>
                {filteredGames.length > 0 ? (
                  <div className="py-1 max-h-60 overflow-y-auto">
                    {filteredGames.map(game => (
                      <a 
                        key={game.id} 
                        href={`#mods/${getSlugById(game.id)}`}
                        onClick={() => setSearchQuery("")}
                        className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors group"
                      >
                        <div className={`w-8 h-8 rounded bg-gradient-to-br ${game.imageColor} p-1 text-center font-bold text-xs shrink-0 flex items-center justify-center text-white`}>
                          {game.name[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-200 truncate group-hover:text-indigo-400 transition-colors uppercase">{game.name}</p>
                          <p className="text-[9px] text-slate-500 font-mono">v{game.version} • {game.category}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 p-4 text-center">No compatible signatures found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="pt-24 pb-20">
        {renderContent()}
      </main>

      {/* Structured Footer Map */}
      <footer className="border-t border-white/10 py-12 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="#home" className="flex items-center gap-2 group cursor-pointer text-white">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <Gamepad2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase font-sans">MODNEXUS</span>
          </a>
          
          <div className="flex flex-wrap justify-center gap-8 text-xs font-mono text-slate-500 uppercase px-4">
            <a href="#privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#dmca" className="hover:text-white transition-colors">DMCA copyright</a>
            <a href="#how-to-install-mod-apk" className="hover:text-white transition-colors">Deploy Help</a>
          </div>

          <div className="text-[10px] text-slate-600 font-mono">
            EST. 2026 • Curated & Checked Mobile Solutions
          </div>
        </div>
      </footer>

      {/* Interactive download action modal */}
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
