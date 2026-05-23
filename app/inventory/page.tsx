"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKebunStore } from "@/lib/store";
import { Package, Hammer, X, Check } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const rarityColors: Record<string, string> = {
  common: "border-gray-500 bg-gray-500/10 text-gray-400",
  uncommon: "border-green-500 bg-green-500/10 text-green-400",
  rare: "border-blue-500 bg-blue-500/10 text-blue-400",
  epic: "border-purple-500 bg-purple-500/10 text-purple-400",
  legendary: "border-yellow-500 bg-yellow-500/10 text-yellow-400",
};

export default function InventoryPage() {
  const { tools, materials, craftTool, equipTool } = useKebunStore();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [tab, setTab] = useState<"tools" | "materials">("tools");

  const tool = tools.find((t) => t.id === selectedTool);

  const canCraft = (tool: typeof tools[0]) => {
    return tool.recipe.every((req) => {
      const mat = materials.find((m) => m.type === req.type);
      return mat && mat.count >= req.count;
    });
  };

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Package className="w-7 h-7 text-kebun-500" /> Inventory
          </h1>
          <p className="text-gray-500 text-sm mt-1">Craft tools and manage your seeds & materials</p>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeUp} className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("tools")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === "tools" ? "bg-kebun-600 text-white" : "bg-soil-card border border-soil-border text-gray-400"
            }`}
          >
            Tools ({tools.length})
          </button>
          <button
            onClick={() => setTab("materials")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === "materials" ? "bg-kebun-600 text-white" : "bg-soil-card border border-soil-border text-gray-400"
            }`}
          >
            Materials ({materials.length})
          </button>
        </motion.div>

        {/* Tools Grid */}
        {tab === "tools" && (
          <motion.div initial="initial" animate="animate" variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedTool(t.id)}
                className={`glass-card glass-card-hover p-5 cursor-pointer border ${rarityColors[t.rarity]}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{t.icon}</span>
                  <div className="flex gap-1">
                    {t.equipped && (
                      <span className="text-[10px] bg-kebun-600 text-white px-2 py-0.5 rounded-full">Equipped</span>
                    )}
                    {!t.crafted && (
                      <span className="text-[10px] bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full">Uncrafted</span>
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{t.name}</h3>
                <p className="text-xs text-gray-500 capitalize mb-3">{t.slot} • {t.rarity}</p>
                <div className="flex gap-3 text-xs">
                  <span className="text-kebun-400">🌿 {t.stats.growth}</span>
                  <span className="text-sunlight">🌾 {t.stats.harvest}</span>
                  <span className="text-water">🛡 {t.stats.protection}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Materials Grid */}
        {tab === "materials" && (
          <motion.div initial="initial" animate="animate" variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((m) => (
              <motion.div key={m.type} variants={fadeUp} className="glass-card p-5 flex items-center gap-4">
                <span className="text-3xl">{m.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm">{m.name}</h3>
                  <p className="text-xs text-gray-500 capitalize">{m.type.replace("_", " ")}</p>
                </div>
                <div className="text-2xl font-bold text-kebun-400">{m.count}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Tool Detail Modal */}
      <AnimatePresence>
        {tool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTool(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`glass-card p-8 w-full max-w-md border ${rarityColors[tool.rarity]}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-4xl">{tool.icon}</span>
                  <h2 className="text-xl font-bold text-white mt-2">{tool.name}</h2>
                  <p className="text-sm text-gray-400 capitalize">{tool.slot} • {tool.rarity}</p>
                </div>
                <button onClick={() => setSelectedTool(null)} className="text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-gray-400 mb-4">{tool.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-soil-bg/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-kebun-400">+{tool.stats.growth}</div>
                  <div className="text-[10px] text-gray-500">Growth</div>
                </div>
                <div className="bg-soil-bg/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-sunlight">+{tool.stats.harvest}</div>
                  <div className="text-[10px] text-gray-500">Harvest</div>
                </div>
                <div className="bg-soil-bg/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-water">+{tool.stats.protection}</div>
                  <div className="text-[10px] text-gray-500">Protection</div>
                </div>
              </div>

              {!tool.crafted && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-400 mb-2">Recipe</h4>
                  <div className="space-y-1">
                    {tool.recipe.map((r, i) => {
                      const mat = materials.find((m) => m.type === r.type);
                      const has = mat && mat.count >= r.count;
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          {has ? <Check className="w-3 h-3 text-kebun-500" /> : <X className="w-3 h-3 text-red-500" />}
                          <span className={has ? "text-gray-300" : "text-red-400"}>
                            {mat?.icon} {mat?.name} x{r.count} ({mat?.count ?? 0})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {!tool.crafted && (
                  <button
                    onClick={() => {
                      craftTool(tool.id);
                      setSelectedTool(null);
                    }}
                    disabled={!canCraft(tool)}
                    className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-2 disabled:opacity-30"
                  >
                    <Hammer className="w-4 h-4" /> Craft
                  </button>
                )}
                {tool.crafted && (
                  <button
                    onClick={() => equipTool(tool.id)}
                    className={`flex-1 text-sm py-2 rounded-xl font-semibold transition-all ${
                      tool.equipped
                        ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                        : "btn-primary"
                    }`}
                  >
                    {tool.equipped ? "Unequip" : "Equip"}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
