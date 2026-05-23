"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useKebunStore, GardenType } from "@/lib/store";
import { Sprout, Wifi, Check, ArrowRight, ArrowLeft } from "lucide-react";

const gardenTypes: { type: GardenType; name: string; icon: string; desc: string; color: string }[] = [
  { type: "tropical", name: "Tropical", icon: "🌴", desc: "Fast growth, lush harvests, humidity-loving plants", color: "border-green-500 bg-green-500/10" },
  { type: "desert", name: "Desert", icon: "🌵", desc: "Drought-resistant, resilient, water-efficient crops", color: "border-yellow-500 bg-yellow-500/10" },
  { type: "aquatic", name: "Aquatic", icon: "💧", desc: "Water gardens, lotus, lily pads, aquatic herbs", color: "border-blue-500 bg-blue-500/10" },
  { type: "forest", name: "Forest", icon: "🌲", desc: "Shade-loving, mushrooms, ferns, ancient trees", color: "border-emerald-700 bg-emerald-700/10" },
];

const devices = [
  { id: "dev-1", name: "Soil Sensor Pro", icon: "🌡️", desc: "Monitors soil pH and nutrients" },
  { id: "dev-2", name: "Moisture Meter 3", icon: "💧", desc: "Tracks soil moisture levels" },
  { id: "dev-3", name: "Grow Light X", icon: "💡", desc: "Smart grow light control" },
  { id: "dev-4", name: "Auto Water System", icon: "🚿", desc: "Automated watering schedules" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setGardenType, connectDevice, user } = useKebunStore();
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState<GardenType | null>(null);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  const next = () => {
    if (step === 0 && selectedType) {
      setGardenType(selectedType);
      setStep(1);
    } else if (step === 1) {
      selectedDevices.forEach((id) => connectDevice(id));
      setStep(2);
    } else if (step === 2) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 grid-pattern">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-2xl"
      >
        {/* Progress */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= step ? "w-16 bg-kebun-500" : "w-8 bg-soil-border"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Garden Type */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-2xl font-bold text-white text-center mb-2">Choose Your Garden</h2>
              <p className="text-gray-500 text-center mb-8 text-sm">Each garden type has unique bonuses</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {gardenTypes.map((g) => (
                  <motion.button
                    key={g.type}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedType(g.type)}
                    className={`glass-card p-5 text-left border-2 transition-all ${
                      selectedType === g.type ? g.color : "border-transparent"
                    }`}
                  >
                    <span className="text-3xl mb-2 block">{g.icon}</span>
                    <h3 className="font-bold text-white text-sm">{g.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{g.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Devices */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-2xl font-bold text-white text-center mb-2">Connect Devices</h2>
              <p className="text-gray-500 text-center mb-8 text-sm">Select smart garden devices to connect</p>
              <div className="space-y-3">
                {devices.map((d) => {
                  const sel = selectedDevices.includes(d.id);
                  return (
                    <motion.button
                      key={d.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setSelectedDevices((prev) =>
                          sel ? prev.filter((x) => x !== d.id) : [...prev, d.id]
                        )
                      }
                      className={`w-full glass-card p-4 flex items-center gap-4 text-left border transition-all ${
                        sel ? "border-kebun-500 bg-kebun-500/10" : "border-transparent"
                      }`}
                    >
                      <span className="text-2xl">{d.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-white text-sm">{d.name}</div>
                        <div className="text-xs text-gray-500">{d.desc}</div>
                      </div>
                      {sel && <Check className="w-5 h-5 text-kebun-500" />}
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-center text-xs text-gray-600 mt-4">You can skip and connect later</p>
            </motion.div>
          )}

          {/* Step 3: Ready */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sprout className="w-16 h-16 mx-auto text-kebun-500 mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">You&apos;re Ready!</h2>
              <p className="text-gray-400 mb-2">Welcome, Gardener!</p>
              <p className="text-sm text-gray-500">
                Your {selectedType} garden awaits. Start planting and grow your legacy!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="btn-secondary flex items-center gap-2 text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}
          <button
            onClick={next}
            disabled={step === 0 && !selectedType}
            className="btn-primary flex items-center gap-2 text-sm disabled:opacity-30"
          >
            {step === 2 ? "Enter Garden" : "Continue"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
