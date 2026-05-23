"use client";
import { motion } from "framer-motion";
import { useKebunStore } from "@/lib/store";
import { TrendingUp, Leaf, Trophy, Calendar, Flame } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ProgressPage() {
  const { user, gardenStats, harvestHistory } = useKebunStore();
  const { streak } = user;
  const maxHarvest = Math.max(...harvestHistory);

  // Generate streak calendar (30 days)
  const streakDays = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    active: i >= 30 - streak,
  }));

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-kebun-500" /> Progress
          </h1>
          <p className="text-gray-500 text-sm mt-1">Track your growth journey</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card text-center">
            <Trophy className="w-6 h-6 mx-auto text-sunlight mb-2" />
            <div className="text-2xl font-bold text-white">Lv.{user.level}</div>
            <div className="text-xs text-gray-500">Current Level</div>
          </div>
          <div className="stat-card text-center">
            <Leaf className="w-6 h-6 mx-auto text-kebun-400 mb-2" />
            <div className="text-2xl font-bold text-white">{user.totalHarvestPoints}</div>
            <div className="text-xs text-gray-500">Total HP Earned</div>
          </div>
          <div className="stat-card text-center">
            <TrendingUp className="w-6 h-6 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-white">{gardenStats.totalGrowth}</div>
            <div className="text-xs text-gray-500">Growth Points</div>
          </div>
          <div className="stat-card text-center">
            <Flame className="w-6 h-6 mx-auto text-orange-400 mb-2" />
            <div className="text-2xl font-bold text-white">{streak}</div>
            <div className="text-xs text-gray-500">Day Streak</div>
          </div>
        </motion.div>

        {/* Level Progress */}
        <motion.div variants={fadeUp} className="glass-card p-6 mb-6">
          <h3 className="text-sm font-bold text-white mb-4">Level Progress</h3>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-kebun-400">Lv.{user.level}</div>
            <div className="flex-1">
              <div className="h-4 bg-soil-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((user.totalHarvestPoints % 2000) / 2000) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-kebun-600 to-kebun-400 rounded-full"
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500">{user.totalHarvestPoints % 2000} / 2000 HP</span>
                <span className="text-kebun-400">Lv.{user.level + 1}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Harvest Chart */}
          <motion.div variants={fadeUp} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-kebun-500" /> Weekly Harvests
            </h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {harvestHistory.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-gray-400">{val}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxHarvest) * 120}px` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-kebun-600 to-kebun-400"
                  />
                  <span className="text-[10px] text-gray-500">{days[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Streak Calendar */}
          <motion.div variants={fadeUp} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sunlight" /> Growth Streak Calendar
            </h3>
            <div className="grid grid-cols-10 gap-1.5">
              {streakDays.map((d) => (
                <motion.div
                  key={d.day}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: d.day * 0.02 }}
                  className={`aspect-square rounded-md flex items-center justify-center text-[8px] ${
                    d.active
                      ? "bg-kebun-500/30 border border-kebun-500/50 text-kebun-400"
                      : "bg-soil-bg border border-soil-border text-gray-600"
                  }`}
                >
                  {d.day}
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-kebun-500/30 border border-kebun-500/50" />
                <span className="text-gray-500">Active</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-soil-bg border border-soil-border" />
                <span className="text-gray-500">Inactive</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Summary */}
        <motion.div variants={fadeUp} className="glass-card p-6 mt-6">
          <h3 className="text-sm font-bold text-white mb-4">Achievement Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-kebun-400">{gardenStats.totalHarvests}</div>
              <div className="text-xs text-gray-500">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-sunlight">{gardenStats.plantsAlive}</div>
              <div className="text-xs text-gray-500">Plants Alive</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-water">{gardenStats.waterLevel}%</div>
              <div className="text-xs text-gray-500">Avg Water Level</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-400">{gardenStats.soilHealth}%</div>
              <div className="text-xs text-gray-500">Soil Health</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
