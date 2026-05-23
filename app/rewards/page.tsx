"use client";
import { motion } from "framer-motion";
import { useKebunStore } from "@/lib/store";
import { Gift, ShoppingCart, Check } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const typeColors: Record<string, string> = {
  seed: "text-green-400 bg-green-500/10 border-green-500/30",
  tool: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  cosmetic: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  booster: "text-sunlight bg-yellow-500/10 border-yellow-500/30",
};

export default function RewardsPage() {
  const { rewards, user, purchaseReward } = useKebunStore();

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Gift className="w-7 h-7 text-kebun-500" /> Reward Shop
          </h1>
          <p className="text-gray-500 text-sm mt-1">Spend your Harvest Points on seeds, tools and cosmetics</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-kebun-600/20 border border-kebun-500/30 px-4 py-2 rounded-xl">
            <span className="text-kebun-400 font-bold text-lg">{user.harvestPoints}</span>
            <span className="text-kebun-500 text-sm">HP Available</span>
          </div>
        </motion.div>

        <motion.div initial="initial" animate="animate" variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((r) => {
            const canBuy = user.harvestPoints >= r.cost && !r.purchased;
            return (
              <motion.div
                key={r.id}
                variants={fadeUp}
                className={`glass-card glass-card-hover p-6 border ${typeColors[r.type]}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{r.icon}</span>
                  {r.purchased && (
                    <span className="flex items-center gap-1 text-xs text-kebun-400 bg-kebun-500/10 px-2 py-1 rounded-full">
                      <Check className="w-3 h-3" /> Owned
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{r.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{r.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-kebun-400 font-bold">{r.cost} HP</span>
                  <button
                    onClick={() => purchaseReward(r.id)}
                    disabled={!canBuy}
                    className={`text-xs px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1 ${
                      r.purchased
                        ? "bg-soil-bg text-gray-600 cursor-default"
                        : canBuy
                        ? "btn-primary"
                        : "bg-soil-bg text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {r.purchased ? (
                      "Purchased"
                    ) : (
                      <>
                        <ShoppingCart className="w-3 h-3" /> Buy
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
