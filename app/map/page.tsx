"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useKebunStore, ActivityType } from "@/lib/store";
import TaskCard from "@/components/TaskCard";
import { Filter } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const filters: { label: string; value: ActivityType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Planting", value: "planting" },
  { label: "Harvesting", value: "harvesting" },
  { label: "Weeding", value: "weeding" },
  { label: "Watering", value: "watering" },
  { label: "Pruning", value: "pruning" },
];

export default function MapPage() {
  const tasks = useKebunStore((s) => s.tasks);
  const [active, setActive] = useState<ActivityType | "all">("all");

  const filtered = active === "all" ? tasks : tasks.filter((t) => t.type === active);

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Filter className="w-7 h-7 text-kebun-500" /> Task Board
          </h1>
          <p className="text-gray-500 text-sm mt-1">Choose your garden challenge and battle nature&apos;s enemies</p>
        </motion.div>

        {/* Filters */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === f.value
                  ? "bg-kebun-600 text-white green-glow"
                  : "bg-soil-card border border-soil-border text-gray-400 hover:text-white hover:border-kebun-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Task Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((task) => (
            <motion.div key={task.id} variants={fadeUp}>
              <TaskCard task={task} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <motion.div variants={fadeUp} className="col-span-full text-center py-16 text-gray-500">
              No tasks found for this category.
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
