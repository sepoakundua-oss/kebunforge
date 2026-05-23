"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKebunStore } from "@/lib/store";
import { Play, Pause, RotateCcw, Timer, Leaf, Droplets, Scissors, TreePine } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const activities = [
  { id: "act-1", name: "Composting Session", icon: "🍂", desc: "Turn kitchen scraps into rich garden compost", duration: 300, type: "composting", xp: 15, iconComp: Leaf },
  { id: "act-2", name: "Pruning Workshop", icon: "✂️", desc: "Learn proper pruning techniques for healthier plants", duration: 600, type: "pruning", xp: 25, iconComp: Scissors },
  { id: "act-3", name: "Mulching Meditation", icon: "🌿", desc: "Apply protective mulch while practicing mindfulness", duration: 450, type: "mulching", xp: 20, iconComp: TreePine },
  { id: "act-4", name: "Deep Watering Ritual", icon: "💧", desc: "Slow, deep watering for root strength", duration: 300, type: "watering", xp: 15, iconComp: Droplets },
  { id: "act-5", name: "Soil Enrichment", icon: "🧪", desc: "Mix nutrients and test soil composition", duration: 900, type: "planting", xp: 35, iconComp: Leaf },
  { id: "act-6", name: "Seed Starting", icon: "🌱", desc: "Start seeds in trays for the next growing season", duration: 1200, type: "planting", xp: 40, iconComp: Leaf },
];

export default function ActivityPage() {
  const addHarvestPoints = useKebunStore((s) => s.addHarvestPoints);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [timers, setTimers] = useState<Record<string, number>>({});
  const [running, setRunning] = useState<Record<string, boolean>>({});

  const startActivity = (id: string, duration: number) => {
    setActiveId(id);
    setTimers((prev) => ({ ...prev, [id]: duration }));
    setRunning((prev) => ({ ...prev, [id]: true }));
  };

  const toggleTimer = (id: string) => {
    setRunning((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetTimer = (id: string, duration: number) => {
    setTimers((prev) => ({ ...prev, [id]: duration }));
    setRunning((prev) => ({ ...prev, [id]: false }));
    setActiveId(null);
  };

  // Simple countdown effect
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Timer className="w-7 h-7 text-kebun-500" /> Garden Activities
          </h1>
          <p className="text-gray-500 text-sm mt-1">Free guided garden activities to boost your growth</p>
        </motion.div>

        <motion.div initial="initial" animate="animate" variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((act) => {
            const time = timers[act.id] ?? act.duration;
            const isRunning = running[act.id] ?? false;
            const isActive = activeId === act.id;
            const completed = time <= 0;

            return (
              <motion.div key={act.id} variants={fadeUp} className="glass-card glass-card-hover p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">{act.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm">{act.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{act.desc}</p>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-4xl font-mono font-bold text-kebun-400 green-text-glow">
                    {completed ? "✅" : formatTime(time)}
                  </div>
                  {completed && <p className="text-xs text-kebun-400 mt-1">+{act.xp} HP earned!</p>}
                </div>

                <div className="flex gap-2">
                  {!isActive && !completed && (
                    <button
                      onClick={() => startActivity(act.id, act.duration)}
                      className="btn-primary flex-1 text-xs py-2 flex items-center justify-center gap-1"
                    >
                      <Play className="w-3 h-3" /> Start
                    </button>
                  )}
                  {isActive && !completed && (
                    <>
                      <button
                        onClick={() => toggleTimer(act.id)}
                        className="btn-secondary flex-1 text-xs py-2 flex items-center justify-center gap-1"
                      >
                        {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        {isRunning ? "Pause" : "Resume"}
                      </button>
                      <button
                        onClick={() => {
                          resetTimer(act.id, act.duration);
                          addHarvestPoints(act.xp);
                        }}
                        className="btn-primary text-xs py-2 px-3"
                      >
                        Done
                      </button>
                    </>
                  )}
                  {completed && (
                    <button
                      onClick={() => resetTimer(act.id, act.duration)}
                      className="btn-secondary flex-1 text-xs py-2 flex items-center justify-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Restart
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
