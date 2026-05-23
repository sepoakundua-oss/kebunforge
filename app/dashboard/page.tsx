"use client";
import { motion } from "framer-motion";
import { useKebunStore } from "@/lib/store";
import { Leaf, Sun, Droplets, FlaskConical, TrendingUp, Swords } from "lucide-react";
import StreakBadge from "@/components/StreakBadge";
import HPBar from "@/components/HPBar";
import DeviceStatus from "@/components/DeviceStatus";
import TaskCard from "@/components/TaskCard";
import Link from "next/link";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

export default function DashboardPage() {
  const { user, gardenStats, devices, tasks } = useKebunStore();

  const recentTasks = tasks.filter((t) => !t.completed).slice(0, 3);
  const connectedDevices = devices.filter((d) => d.connected);

  const statCards = [
    { label: "Plants Alive", value: gardenStats.plantsAlive, icon: Leaf, color: "text-kebun-400", bg: "bg-kebun-500/10" },
    { label: "Soil Health", value: `${gardenStats.soilHealth}%`, icon: FlaskConical, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Sunlight Hours", value: `${gardenStats.sunlightHours}h`, icon: Sun, color: "text-sunlight", bg: "bg-yellow-500/10" },
    { label: "Water Level", value: `${gardenStats.waterLevel}%`, icon: Droplets, color: "text-water", bg: "bg-blue-500/10" },
  ];

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Welcome back, <span className="text-kebun-400">{user.userName}</span> 🌱
            </h1>
            <p className="text-gray-500 text-sm mt-1">Your garden is thriving. Keep growing!</p>
          </div>
          <HPBar />
        </motion.div>

        {/* Stat Cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="stat-card"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Tasks + Streak */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={fadeUp} className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Swords className="w-5 h-5 text-kebun-500" /> Active Tasks
              </h2>
              <Link href="/map" className="text-sm text-kebun-500 hover:text-kebun-400">View All →</Link>
            </motion.div>
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </motion.div>
          </div>

          {/* Right: Streak + Devices */}
          <div className="space-y-6">
            <motion.div variants={fadeUp}>
              <StreakBadge streak={user.streak} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-kebun-500" /> Growth Overview
              </h3>
              <div className="glass-card p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Growth</span>
                  <span className="text-kebun-400 font-bold">{gardenStats.totalGrowth}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Harvests</span>
                  <span className="text-sunlight font-bold">{gardenStats.totalHarvests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Harvest Points</span>
                  <span className="text-kebun-300 font-bold">{user.harvestPoints} HP</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-bold text-white mb-3">Connected Devices</h3>
              <div className="space-y-2">
                {connectedDevices.map((d) => (
                  <DeviceStatus key={d.id} device={d} />
                ))}
              </div>
              <Link href="/devices" className="block text-center text-xs text-kebun-500 mt-3 hover:text-kebun-400">
                Manage Devices →
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
