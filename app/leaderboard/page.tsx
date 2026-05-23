"use client";
import { motion } from "framer-motion";
import { useKebunStore } from "@/lib/store";
import { Trophy, Medal, Crown, Star } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const gardenTypeColors: Record<string, string> = {
  tropical: "text-green-400",
  desert: "text-yellow-400",
  aquatic: "text-blue-400",
  forest: "text-emerald-600",
};

export default function LeaderboardPage() {
  const leaderboard = useKebunStore((s) => s.weeklyLeaderboard);
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd
  const podiumIcons = [Medal, Crown, Medal];
  const podiumColors = ["text-gray-400", "text-yellow-400", "text-amber-600"];
  const podiumBg = ["bg-gray-500/10", "bg-yellow-500/10", "bg-amber-600/10"];
  const podiumHeights = ["h-24", "h-32", "h-20"];

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-3">
            <Trophy className="w-7 h-7 text-sunlight" /> Weekly Leaderboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">Top gardeners by Harvest Points this week</p>
        </motion.div>

        {/* Podium */}
        <motion.div variants={fadeUp} className="flex items-end justify-center gap-4 mb-12 max-w-lg mx-auto">
          {podiumOrder.map((entry, i) => {
            if (!entry) return null;
            const Icon = podiumIcons[i];
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex-1 flex flex-col items-center"
              >
                <span className="text-4xl mb-2">{entry.avatar}</span>
                <div className={`text-sm font-bold ${gardenTypeColors[entry.gardenType]}`}>{entry.name}</div>
                <div className="text-xs text-gray-500 mb-2">{entry.hp} HP</div>
                <Icon className={`w-6 h-6 ${podiumColors[i]} mb-2`} />
                <div className={`w-full ${podiumHeights[i]} ${podiumBg[i]} rounded-t-xl border border-b-0 ${podiumColors[i].replace("text", "border")}/20`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Rest of leaderboard */}
        <motion.div variants={fadeUp} className="max-w-2xl mx-auto space-y-2">
          {rest.map((entry, i) => (
            <motion.div
              key={entry.rank}
              variants={fadeUp}
              className="glass-card p-4 flex items-center gap-4"
            >
              <div className="w-8 text-center font-bold text-gray-500">#{entry.rank}</div>
              <span className="text-2xl">{entry.avatar}</span>
              <div className="flex-1">
                <div className={`font-bold text-sm ${gardenTypeColors[entry.gardenType]}`}>{entry.name}</div>
                <div className="text-xs text-gray-500 capitalize">{entry.gardenType} Garden</div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-kebun-400" />
                <span className="text-white font-bold">{entry.hp}</span>
                <span className="text-gray-500 text-xs">HP</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
