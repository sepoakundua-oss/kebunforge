"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Star, Lock } from "lucide-react";
import type { Task } from "@/lib/store";

const diffColors: Record<string, string> = {
  starter: "difficulty-starter",
  easy: "difficulty-easy",
  medium: "difficulty-medium",
  hard: "difficulty-hard",
  master: "difficulty-master",
};

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Link href={task.locked ? "#" : `/quest/${task.id}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`glass-card glass-card-hover p-5 cursor-pointer relative overflow-hidden ${
          task.locked ? "opacity-50 pointer-events-none" : ""
        } ${task.completed ? "border-kebun-500/40" : ""}`}
      >
        {task.completed && (
          <div className="absolute top-3 right-3 bg-kebun-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            ✓ Done
          </div>
        )}
        {task.locked && (
          <div className="absolute top-3 right-3">
            <Lock className="w-4 h-4 text-gray-500" />
          </div>
        )}

        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{task.enemyIcon}</span>
          <div className="flex-1">
            <h3 className="font-bold text-white text-sm">{task.title}</h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{task.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${diffColors[task.difficulty]}`}>
            {task.difficulty}
          </span>
          <span className="text-xs text-gray-500 capitalize">{task.type}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-kebun-400">
              <Star className="w-3 h-3" /> {task.hpReward} HP
            </span>
            <span className="flex items-center gap-1 text-sunlight">
              +{task.growthPoints} Growth
            </span>
          </div>
          <span className="flex items-center gap-1 text-gray-500">
            <Clock className="w-3 h-3" /> {task.duration}m
          </span>
        </div>

        {/* Glow effect */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-kebun-500/5 rounded-full blur-2xl" />
      </motion.div>
    </Link>
  );
}
