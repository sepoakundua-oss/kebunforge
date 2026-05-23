import { create } from "zustand";

// Types
export type GardenType = "tropical" | "desert" | "aquatic" | "forest";
export type ActivityType = "planting" | "harvesting" | "weeding" | "watering" | "composting" | "pruning" | "mulching";
export type Difficulty = "starter" | "easy" | "medium" | "hard" | "master";
export type MaterialType = "seed" | "nutrient" | "compost" | "rare_seed" | "golden_fertilizer";
export type ToolSlot = "hand" | "soil" | "water" | "cut" | "protect" | "fertilizer";
export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface User {
  userName: string;
  email: string;
  gardenType: GardenType | null;
  level: number;
  harvestPoints: number;
  streak: number;
  totalHarvestPoints: number;
}

export interface GardenStats {
  totalGrowth: number;
  totalHarvests: number;
  plantsAlive: number;
  soilHealth: number;
  sunlightHours: number;
  waterLevel: number;
}

export interface Device {
  id: string;
  name: string;
  model: string;
  connected: boolean;
  battery?: number;
  lastSync?: string;
}

export interface Material {
  type: MaterialType;
  name: string;
  icon: string;
  count: number;
}

export interface Tool {
  id: string;
  name: string;
  slot: ToolSlot;
  rarity: Rarity;
  stats: { growth: number; harvest: number; protection: number };
  crafted: boolean;
  equipped: boolean;
  recipe: { type: MaterialType; count: number }[];
  description: string;
  icon: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  difficulty: Difficulty;
  hpReward: number;
  materialReward: { type: MaterialType; name: string; count: number };
  duration: number;
  growthPoints: number;
  completed: boolean;
  locked: boolean;
  enemy: string;
  enemyIcon: string;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  type: "seed" | "tool" | "cosmetic" | "booster";
  cost: number;
  icon: string;
  purchased: boolean;
}

interface KebunState {
  user: User;
  gardenStats: GardenStats;
  devices: Device[];
  materials: Material[];
  tools: Tool[];
  tasks: Task[];
  rewards: RewardItem[];
  soilHistory: number[];
  sunlightHistory: number[];
  waterHistory: number[];
  harvestHistory: number[];
  weeklyLeaderboard: { rank: number; name: string; hp: number; gardenType: GardenType; avatar: string }[];
  setUser: (user: Partial<User>) => void;
  setGardenType: (t: GardenType) => void;
  completeTask: (id: string) => void;
  craftTool: (id: string) => void;
  equipTool: (id: string) => void;
  purchaseReward: (id: string) => void;
  connectDevice: (id: string) => void;
  addHarvestPoints: (hp: number) => void;
}

export const useKebunStore = create<KebunState>((set, get) => ({
  user: {
    userName: "Gardener",
    email: "gardener@kebunforge.com",
    gardenType: "tropical",
    level: 7,
    harvestPoints: 2340,
    streak: 12,
    totalHarvestPoints: 15680,
  },
  gardenStats: {
    totalGrowth: 847,
    totalHarvests: 156,
    plantsAlive: 42,
    soilHealth: 78,
    sunlightHours: 6.5,
    waterLevel: 82,
  },
  devices: [
    { id: "dev-1", name: "Soil Sensor Pro", model: "SP-200", connected: true, battery: 87, lastSync: "2 min ago" },
    { id: "dev-2", name: "Moisture Meter 3", model: "MM-300", connected: true, battery: 64, lastSync: "5 min ago" },
    { id: "dev-3", name: "Grow Light X", model: "GL-X1", connected: false, battery: 100, lastSync: "1 hour ago" },
    { id: "dev-4", name: "Auto Water System", model: "AWS-100", connected: true, battery: 92, lastSync: "1 min ago" },
  ],
  materials: [
    { type: "seed", name: "Tomato Seeds", icon: "🌱", count: 24 },
    { type: "seed", name: "Sunflower Seeds", icon: "🌻", count: 18 },
    { type: "nutrient", name: "Nitrogen Boost", icon: "💧", count: 12 },
    { type: "compost", name: "Rich Compost", icon: "🍂", count: 8 },
    { type: "rare_seed", name: "Moon Orchid", icon: "🌸", count: 3 },
    { type: "golden_fertilizer", name: "Golden Fertilizer", icon: "✨", count: 1 },
  ],
  tools: [
    {
      id: "tool-1", name: "Copper Watering Can", slot: "water", rarity: "common",
      stats: { growth: 10, harvest: 5, protection: 0 }, crafted: true, equipped: true,
      recipe: [{ type: "nutrient", count: 3 }], description: "A basic watering can for daily use.", icon: "🚿"
    },
    {
      id: "tool-2", name: "Steel Pruning Shears", slot: "cut", rarity: "uncommon",
      stats: { growth: 5, harvest: 15, protection: 0 }, crafted: true, equipped: false,
      recipe: [{ type: "nutrient", count: 5 }], description: "Sharp shears for precise pruning.", icon: "✂️"
    },
    {
      id: "tool-3", name: "Enchanted Soil Kit", slot: "soil", rarity: "rare",
      stats: { growth: 20, harvest: 10, protection: 5 }, crafted: false, equipped: false,
      recipe: [{ type: "compost", count: 5 }, { type: "rare_seed", count: 1 }],
      description: "Mystical soil kit that boosts plant growth.", icon: "🧪"
    },
    {
      id: "tool-4", name: "Guardian Scarecrow", slot: "protect", rarity: "epic",
      stats: { growth: 5, harvest: 5, protection: 30 }, crafted: false, equipped: false,
      recipe: [{ type: "compost", count: 8 }, { type: "rare_seed", count: 2 }],
      description: "Protects your garden from pests and frost.", icon: "🛡️"
    },
    {
      id: "tool-5", name: "Golden Harvest Sickle", slot: "hand", rarity: "legendary",
      stats: { growth: 25, harvest: 35, protection: 10 }, crafted: false, equipped: false,
      recipe: [{ type: "golden_fertilizer", count: 1 }, { type: "rare_seed", count: 3 }],
      description: "The legendary sickle of the master gardener.", icon: "⚔️"
    },
    {
      id: "tool-6", name: "Compost Accelerator", slot: "fertilizer", rarity: "uncommon",
      stats: { growth: 15, harvest: 8, protection: 0 }, crafted: true, equipped: false,
      recipe: [{ type: "compost", count: 4 }], description: "Speeds up composting significantly.", icon: "♻️"
    },
  ],
  tasks: [
    {
      id: "task-1", title: "Defeat the Aphid Swarm", description: "A swarm of aphids threatens your young seedlings. Use organic pest control to save them!",
      type: "weeding", difficulty: "starter", hpReward: 50, materialReward: { type: "seed", name: "Tomato Seeds", count: 3 },
      duration: 10, growthPoints: 15, completed: false, locked: false, enemy: "Aphid Swarm", enemyIcon: "🐛"
    },
    {
      id: "task-2", title: "Repel the Locusts", description: "Locusts are descending on your crops! Set up defenses and protect your harvest.",
      type: "watering", difficulty: "easy", hpReward: 80, materialReward: { type: "nutrient", name: "Nitrogen Boost", count: 2 },
      duration: 15, growthPoints: 25, completed: false, locked: false, enemy: "Locust Horde", enemyIcon: "🦗"
    },
    {
      id: "task-3", title: "Survive the Drought", description: "A severe drought is parching your garden. Implement water conservation strategies.",
      type: "planting", difficulty: "medium", hpReward: 120, materialReward: { type: "compost", name: "Rich Compost", count: 2 },
      duration: 20, growthPoints: 40, completed: false, locked: false, enemy: "Drought Spirit", enemyIcon: "🏜️"
    },
    {
      id: "task-4", title: "Clear the Weed Forest", description: "Aggressive weeds have formed an impenetrable thicket. Clear them before they choke your plants.",
      type: "harvesting", difficulty: "hard", hpReward: 180, materialReward: { type: "rare_seed", name: "Moon Orchid", count: 1 },
      duration: 25, growthPoints: 60, completed: false, locked: false, enemy: "Weed Titan", enemyIcon: "🌿"
    },
    {
      id: "task-5", title: "Conquer the Frost Dragon", description: "A legendary frost dragon threatens to freeze your entire garden. Only the bravest gardeners dare challenge it.",
      type: "pruning", difficulty: "master", hpReward: 300, materialReward: { type: "golden_fertilizer", name: "Golden Fertilizer", count: 1 },
      duration: 30, growthPoints: 100, completed: false, locked: false, enemy: "Frost Dragon", enemyIcon: "🐉"
    },
  ],
  rewards: [
    { id: "rw-1", name: "Exotic Seed Pack", description: "Contains 5 rare tropical seeds.", type: "seed", cost: 200, icon: "🌱", purchased: false },
    { id: "rw-2", name: "Silver Watering Can", description: "Upgraded watering tool with better coverage.", type: "tool", cost: 500, icon: "🚿", purchased: false },
    { id: "rw-3", name: "Garden Gnome Skin", description: "A cosmetic gnome for your garden display.", type: "cosmetic", cost: 300, icon: "🧙", purchased: false },
    { id: "rw-4", name: "Growth Booster x3", description: "Doubles growth points for 3 tasks.", type: "booster", cost: 150, icon: "⚡", purchased: false },
    { id: "rw-5", name: "Rain Cloud Summon", description: "Instantly waters all plants to 100%.", type: "booster", cost: 400, icon: "🌧️", purchased: false },
    { id: "rw-6", name: "Mystic Greenhouse Frame", description: "Unlocks a greenhouse display cosmetic.", type: "cosmetic", cost: 800, icon: "🏡", purchased: false },
  ],
  soilHistory: [65, 68, 72, 70, 74, 76, 78],
  sunlightHistory: [5.2, 6.0, 5.8, 6.5, 6.2, 7.0, 6.5],
  waterHistory: [70, 75, 80, 72, 85, 78, 82],
  harvestHistory: [12, 18, 15, 22, 28, 24, 32],
  weeklyLeaderboard: [
    { rank: 1, name: "GreenThumb42", hp: 3200, gardenType: "tropical", avatar: "🌴" },
    { rank: 2, name: "DesertRose", hp: 2890, gardenType: "desert", avatar: "🌵" },
    { rank: 3, name: "AquaGardener", hp: 2650, gardenType: "aquatic", avatar: "💧" },
    { rank: 4, name: "ForestKeeper", hp: 2340, gardenType: "forest", avatar: "🌲" },
    { rank: 5, name: "SunflowerSam", hp: 2100, gardenType: "tropical", avatar: "🌻" },
    { rank: 6, name: "CactusKing", hp: 1890, gardenType: "desert", avatar: "🌵" },
    { rank: 7, name: "PondLily", hp: 1720, gardenType: "aquatic", avatar: "🪷" },
    { rank: 8, name: "OakMaster", hp: 1580, gardenType: "forest", avatar: "🌳" },
  ],
  setUser: (u) => set((s) => ({ user: { ...s.user, ...u } })),
  setGardenType: (t) => set((s) => ({ user: { ...s.user, gardenType: t } })),
  completeTask: (id) =>
    set((s) => {
      const task = s.tasks.find((t) => t.id === id);
      if (!task || task.completed) return s;
      return {
        tasks: s.tasks.map((t) => (t.id === id ? { ...t, completed: true } : t)),
        user: {
          ...s.user,
          harvestPoints: s.user.harvestPoints + task.hpReward,
          totalHarvestPoints: s.user.totalHarvestPoints + task.hpReward,
          level: Math.floor((s.user.totalHarvestPoints + task.hpReward) / 2000) + 1,
        },
        gardenStats: {
          ...s.gardenStats,
          totalGrowth: s.gardenStats.totalGrowth + task.growthPoints,
          totalHarvests: s.gardenStats.totalHarvests + 1,
        },
      };
    }),
  craftTool: (id) =>
    set((s) => {
      const tool = s.tools.find((t) => t.id === id);
      if (!tool || tool.crafted) return s;
      const newMaterials = [...s.materials];
      for (const req of tool.recipe) {
        const mat = newMaterials.find((m) => m.type === req.type);
        if (mat) mat.count -= req.count;
      }
      return {
        materials: newMaterials,
        tools: s.tools.map((t) => (t.id === id ? { ...t, crafted: true } : t)),
      };
    }),
  equipTool: (id) =>
    set((s) => {
      const tool = s.tools.find((t) => t.id === id);
      if (!tool || !tool.crafted) return s;
      return {
        tools: s.tools.map((t) => {
          if (t.id === id) return { ...t, equipped: !t.equipped };
          if (t.slot === tool.slot && t.equipped) return { ...t, equipped: false };
          return t;
        }),
      };
    }),
  purchaseReward: (id) =>
    set((s) => {
      const reward = s.rewards.find((r) => r.id === id);
      if (!reward || reward.purchased || s.user.harvestPoints < reward.cost) return s;
      return {
        rewards: s.rewards.map((r) => (r.id === id ? { ...r, purchased: true } : r)),
        user: { ...s.user, harvestPoints: s.user.harvestPoints - reward.cost },
      };
    }),
  connectDevice: (id) =>
    set((s) => ({
      devices: s.devices.map((d) =>
        d.id === id ? { ...d, connected: !d.connected, lastSync: d.connected ? "Disconnected" : "Just now" } : d
      ),
    })),
  addHarvestPoints: (hp) =>
    set((s) => ({
      user: {
        ...s.user,
        harvestPoints: s.user.harvestPoints + hp,
        totalHarvestPoints: s.user.totalHarvestPoints + hp,
        level: Math.floor((s.user.totalHarvestPoints + hp) / 2000) + 1,
      },
    })),
}));
