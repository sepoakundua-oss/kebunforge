"use client";
import { motion } from "framer-motion";
import { useKebunStore } from "@/lib/store";
import { Leaf, Sun, Droplets, FlaskConical, TrendingUp } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function GardenPage() {
  const { gardenStats, soilHistory, sunlightHistory, waterHistory } = useKebunStore();

  const maxSoil = Math.max(...soilHistory);
  const maxSun = Math.max(...sunlightHistory);
  const maxWater = Math.max(...waterHistory);

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Leaf className="w-7 h-7 text-kebun-500" /> Garden Health
          </h1>
          <p className="text-gray-500 text-sm mt-1">Monitor your garden&apos;s vital signs</p>
        </motion.div>

        {/* Overview Cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-8">
          <div className="stat-card text-center">
            <FlaskConical className="w-6 h-6 mx-auto text-amber-400 mb-2" />
            <div className="text-2xl font-bold text-white">{gardenStats.soilHealth}%</div>
            <div className="text-xs text-gray-500">Soil Health</div>
          </div>
          <div className="stat-card text-center">
            <Sun className="w-6 h-6 mx-auto text-sunlight mb-2" />
            <div className="text-2xl font-bold text-white">{gardenStats.sunlightHours}h</div>
            <div className="text-xs text-gray-500">Sunlight Today</div>
          </div>
          <div className="stat-card text-center">
            <Droplets className="w-6 h-6 mx-auto text-water mb-2" />
            <div className="text-2xl font-bold text-white">{gardenStats.waterLevel}%</div>
            <div className="text-xs text-gray-500">Water Level</div>
          </div>
        </motion.div>

        {/* Soil pH Chart */}
        <motion.div variants={fadeUp} className="glass-card p-6 mb-6">
          <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-amber-400" /> Soil Health Trend (7 days)
          </h3>
          <p className="text-xs text-gray-500 mb-4">Optimal range: 65-80%</p>
          <div className="flex items-end justify-between gap-2 h-40">
            {soilHistory.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-400">{val}%</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / 100) * 120}px` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`w-full rounded-t-lg ${
                    val >= 65 && val <= 80
                      ? "bg-gradient-to-t from-kebun-600 to-kebun-400"
                      : "bg-gradient-to-t from-amber-600 to-amber-400"
                  }`}
                />
                <span className="text-[10px] text-gray-500">{days[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sunlight Chart */}
          <motion.div variants={fadeUp} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Sun className="w-4 h-4 text-sunlight" /> Sunlight Hours
            </h3>
            <p className="text-xs text-gray-500 mb-4">Target: 6+ hours daily</p>
            <div className="flex items-end justify-between gap-2 h-32">
              {sunlightHistory.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxSun) * 100}px` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`w-full rounded-t-lg ${
                      val >= 6 ? "bg-gradient-to-t from-sunlight to-yellow-300" : "bg-gradient-to-t from-orange-500 to-orange-300"
                    }`}
                  />
                  <span className="text-[10px] text-gray-500">{days[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Water Chart */}
          <motion.div variants={fadeUp} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-water" /> Water Level
            </h3>
            <p className="text-xs text-gray-500 mb-4">Optimal: 70-90%</p>
            <div className="flex items-end justify-between gap-2 h-32">
              {waterHistory.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / 100) * 100}px` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`w-full rounded-t-lg ${
                      val >= 70 ? "bg-gradient-to-t from-water to-blue-300" : "bg-gradient-to-t from-red-500 to-red-300"
                    }`}
                  />
                  <span className="text-[10px] text-gray-500">{days[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tips */}
        <motion.div variants={fadeUp} className="glass-card p-6 mt-6">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-kebun-500" /> MiMo AI Garden Tips
          </h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>🌿 Your soil health is trending well. Consider adding compost this week.</p>
            <p>☀️ Sunlight hours are slightly below target. Prune nearby shade trees.</p>
            <p>💧 Water level is optimal. The auto-water system is doing its job!</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
