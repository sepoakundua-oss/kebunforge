"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useKebunStore } from "@/lib/store";
import { ArrowLeft, Swords, Sparkles, Trophy, Heart, Shield } from "lucide-react";
import Link from "next/link";

type Phase = "info" | "battle" | "victory";

export default function QuestPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const tasks = useKebunStore((s) => s.tasks);
  const completeTask = useKebunStore((s) => s.completeTask);
  const task = tasks.find((t) => t.id === id);

  const [phase, setPhase] = useState<Phase>("info");
  const [progress, setProgress] = useState(0);
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);

  if (!task) {
    return (
      <div className="lg:ml-64 min-h-screen flex items-center justify-center text-gray-500">
        Task not found
      </div>
    );
  }

  // Battle simulation
  useEffect(() => {
    if (phase !== "battle") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + (100 / (task.duration * 2));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase("victory");
            completeTask(task.id);
          }, 500);
          return 100;
        }
        // Simulate HP changes
        setEnemyHp((eh) => Math.max(0, eh - Math.random() * 8));
        setPlayerHp((ph) => Math.max(20, ph - Math.random() * 3));
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [phase, task, completeTask]);

  const diffColors: Record<string, string> = {
    starter: "text-kebun-400",
    easy: "text-green-400",
    medium: "text-yellow-400",
    hard: "text-orange-400",
    master: "text-red-400",
  };

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <Link href="/map" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Task Board
      </Link>

      <AnimatePresence mode="wait">
        {/* Phase 1: Info */}
        {phase === "info" && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card p-8 text-center green-glow">
              <span className="text-6xl mb-4 block">{task.enemyIcon}</span>
              <h1 className="text-3xl font-bold text-white mb-2">{task.title}</h1>
              <p className={`text-sm font-semibold mb-4 ${diffColors[task.difficulty]}`}>
                {task.difficulty.toUpperCase()} • {task.type}
              </p>
              <p className="text-gray-400 mb-8">{task.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-soil-bg/50 rounded-xl p-3">
                  <Sparkles className="w-5 h-5 mx-auto text-kebun-400 mb-1" />
                  <div className="text-lg font-bold text-white">{task.hpReward}</div>
                  <div className="text-[10px] text-gray-500">Harvest Points</div>
                </div>
                <div className="bg-soil-bg/50 rounded-xl p-3">
                  <Heart className="w-5 h-5 mx-auto text-sunlight mb-1" />
                  <div className="text-lg font-bold text-white">+{task.growthPoints}</div>
                  <div className="text-[10px] text-gray-500">Growth Points</div>
                </div>
                <div className="bg-soil-bg/50 rounded-xl p-3">
                  <Trophy className="w-5 h-5 mx-auto text-purple-400 mb-1" />
                  <div className="text-lg font-bold text-white">{task.materialReward.count}x</div>
                  <div className="text-[10px] text-gray-500">{task.materialReward.name}</div>
                </div>
              </div>

              <button
                onClick={() => setPhase("battle")}
                className="btn-primary text-lg px-12 py-3 green-glow"
              >
                <Swords className="w-5 h-5 inline mr-2" />
                Start Planting Battle
              </button>
            </div>
          </motion.div>
        )}

        {/* Phase 2: Battle */}
        {phase === "battle" && (
          <motion.div
            key="battle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-white text-center mb-6">⚔️ Battle in Progress</h2>

              {/* Battle Scene */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-center">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-5xl mb-2"
                  >
                    🧑‍🌾
                  </motion.div>
                  <div className="text-sm font-bold text-kebun-400">You</div>
                  <div className="w-24 h-2 bg-soil-border rounded-full mt-1">
                    <div
                      className="h-full bg-kebun-500 rounded-full transition-all"
                      style={{ width: `${playerHp}%` }}
                    />
                  </div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-3xl"
                >
                  ⚔️
                </motion.div>

                <div className="text-center">
                  <motion.div
                    animate={{ x: [0, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-5xl mb-2"
                  >
                    {task.enemyIcon}
                  </motion.div>
                  <div className="text-sm font-bold text-red-400">{task.enemy}</div>
                  <div className="w-24 h-2 bg-soil-border rounded-full mt-1">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{ width: `${enemyHp}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Battle Progress</span>
                  <span className="text-kebun-400 font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-soil-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-kebun-600 to-kebun-400 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Activity Log */}
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {progress > 10 && <p className="text-xs text-gray-500">🌱 Seeds planted successfully!</p>}
                {progress > 30 && <p className="text-xs text-kebun-400">💧 Watering strengthens your plants!</p>}
                {progress > 50 && <p className="text-xs text-sunlight">☀️ Sunlight boosts growth!</p>}
                {progress > 70 && <p className="text-xs text-purple-400">🧪 Nutrients applied!</p>}
                {progress > 90 && <p className="text-xs text-kebun-300">🌿 Almost there! Keep growing!</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 3: Victory */}
        {phase === "victory" && (
          <motion.div
            key="victory"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass-card p-10 green-glow">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Trophy className="w-16 h-16 mx-auto text-sunlight mb-4" />
              </motion.div>
              <h1 className="text-3xl font-bold text-kebun-400 mb-2 green-text-glow">Harvest Victory!</h1>
              <p className="text-gray-400 mb-8">You defeated the {task.enemy}!</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-soil-bg/50 rounded-xl p-4"
                >
                  <div className="text-2xl font-bold text-kebun-400">+{task.hpReward}</div>
                  <div className="text-xs text-gray-500">Harvest Points</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-soil-bg/50 rounded-xl p-4"
                >
                  <div className="text-2xl font-bold text-sunlight">+{task.growthPoints}</div>
                  <div className="text-xs text-gray-500">Growth Points</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-soil-bg/50 rounded-xl p-4"
                >
                  <div className="text-2xl font-bold text-purple-400">{task.materialReward.count}x</div>
                  <div className="text-xs text-gray-500">{task.materialReward.name}</div>
                </motion.div>
              </div>

              <div className="flex gap-4 justify-center">
                <Link href="/map">
                  <button className="btn-secondary text-sm">Back to Tasks</button>
                </Link>
                <Link href="/dashboard">
                  <button className="btn-primary text-sm">Dashboard</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
