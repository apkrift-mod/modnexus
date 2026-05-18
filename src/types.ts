export interface Game {
  id: string;
  name: string;
  version: string;
  size: string;
  downloads: string;
  rating: number;
  description: string;
  modFeatures: string[];
  category: string;
  imageColor: string;
  imageUrl: string;
}

export const GAMES: Game[] = [
  {
    id: "zooba",
    name: "ZOOBA",
    version: "4.12.0",
    size: "168 MB",
    downloads: "1M+",
    rating: 4.8,
    description: "Battle Royale like never before! Fight with diverse zoo animals in this epic action-packed survival game.",
    modFeatures: ["Unlimited Gems", "All Characters Unlocked", "No Ads", "Map Hack"],
    category: "Action",
    imageColor: "from-orange-500 to-red-600",
    imageUrl: "https://i.imgur.com/r0KGnF0.png",
  },
  {
    id: "truckers-europe-3",
    name: "Truckers of Europe 3",
    version: "0.40.2",
    size: "450 MB",
    downloads: "500K+",
    rating: 4.7,
    description: "Experience the most realistic truck driving simulation. Travel across Europe delivering cargo in powerful trucks.",
    modFeatures: ["Unlimited Money", "Max Fuel", "All Trucks Unlocked", "Realistic Physics Mod"],
    category: "Simulation",
    imageColor: "from-blue-600 to-indigo-800",
    imageUrl: "https://i.imgur.com/MUbuYOf.jpeg",
  },
  {
    id: "geometry-dash",
    name: "Geometry Dash",
    version: "2.2.13",
    size: "85 MB",
    downloads: "10M+",
    rating: 4.9,
    description: "Jump and fly your way through danger in this rhythm-based action platformer!",
    modFeatures: ["All Levels Unlocked", "God Mode", "Unlimited Orbs", "Custom Icons"],
    category: "Arcade",
    imageColor: "from-emerald-500 to-teal-700",
    imageUrl: "https://i.imgur.com/j2WAmkq.png",
  },
  {
    id: "football-league-2026",
    name: "Football League 2026",
    version: "1.0.5",
    size: "320 MB",
    downloads: "250K+",
    rating: 4.6,
    description: "The ultimate football experience. Manage your team, climb the ranks, and dominate the world stage.",
    modFeatures: ["Unlimited Budget", "Max Player Stats", "All Kits Unlocked", "Stadium Upgrades"],
    category: "Sports",
    imageColor: "from-green-500 to-lime-600",
    imageUrl: "https://i.imgur.com/OvKZ97w.png",
  },
  {
    id: "off-road-4x4-5",
    name: "Off Road 4x4 Driving Sim 5",
    version: "5.2.1",
    size: "210 MB",
    downloads: "150K+",
    rating: 4.5,
    description: "Conquer the toughest terrains with powerful 4x4 vehicles. Physics-based off-road challenges await.",
    modFeatures: ["Unlimited Coins", "All 4x4s Unlocked", "Free Upgrades", "No Ads"],
    category: "Simulation",
    imageColor: "from-amber-600 to-yellow-800",
    imageUrl: "https://i.imgur.com/n9nblBg.png",
  }
];
