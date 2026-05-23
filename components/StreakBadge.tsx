"use client";
import { motion } from "framer-motion";
import { Flame, Flower2 } from "lucide-react";

export default function StreakBadge({ streak }: { streak: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="glass-card p-4 flex items-center gap-3"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 rounded-full bg-kebun-600/20 flex items-center justify-center border border-kebun-500/30"
        >
          <Flower2 className="w-6 h-6 text-kebun-400" />
        </motion.div>
        {streak > 0 && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-sunlight rounded-full flex items-center justify-center"
          >
            <Flame className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-kebun-400 green-text-glow">{streak}</div>
        <div className="text-xs text-gray-400">Day Growth Streak 🌱</div>
      </div>
    </motion.div>
  );
}
