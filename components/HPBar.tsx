"use client";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import { useKebunStore } from "@/lib/store";

export default function HPBar() {
  const { level, harvestPoints, totalHarvestPoints } = useKebunStore((s) => s.user);
  const hpInLevel = totalHarvestPoints % 2000;
  const hpProgress = (hpInLevel / 2000) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-kebun-600/30 flex items-center justify-center border border-kebun-500/40">
        <span className="text-sm font-bold text-kebun-400">{level}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Level {level}</span>
          <span className="text-kebun-400 font-semibold">{harvestPoints} HP</span>
        </div>
        <div className="h-2 bg-soil-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hpProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-kebun-600 to-kebun-400 rounded-full"
          />
        </div>
        <div className="text-[10px] text-gray-500 mt-0.5">{hpInLevel}/2000 to next level</div>
      </div>
    </div>
  );
}
