"use client";
import { motion } from "framer-motion";
import { useKebunStore } from "@/lib/store";
import { Cpu, Wifi, WifiOff, Battery, BatteryLow, RefreshCw, Settings } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const deviceIcons: Record<string, string> = {
  "Soil Sensor Pro": "🌡️",
  "Moisture Meter 3": "💧",
  "Grow Light X": "💡",
  "Auto Water System": "🚿",
};

const deviceDescs: Record<string, string> = {
  "Soil Sensor Pro": "Monitors soil pH, nitrogen, phosphorus, and potassium levels in real-time.",
  "Moisture Meter 3": "Tracks soil moisture at multiple depths with wireless connectivity.",
  "Grow Light X": "Full spectrum LED grow light with smart scheduling and intensity control.",
  "Auto Water System": "Automated drip irrigation with weather-adaptive watering schedules.",
};

export default function DevicesPage() {
  const { devices, connectDevice } = useKebunStore();

  const connectedCount = devices.filter((d) => d.connected).length;

  return (
    <div className="lg:ml-64 min-h-screen p-4 md:p-8 pb-24 lg:pb-8">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Cpu className="w-7 h-7 text-kebun-500" /> Smart Devices
          </h1>
          <p className="text-gray-500 text-sm mt-1">Connect and manage your IoT garden sensors</p>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-kebun-400">{connectedCount} Connected</span>
            <span className="text-gray-500">{devices.length - connectedCount} Disconnected</span>
          </div>
        </motion.div>

        <motion.div initial="initial" animate="animate" variants={stagger} className="grid sm:grid-cols-2 gap-6">
          {devices.map((d) => (
            <motion.div
              key={d.id}
              variants={fadeUp}
              className={`glass-card glass-card-hover p-6 border ${
                d.connected ? "border-kebun-500/30" : "border-soil-border"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{deviceIcons[d.name]}</span>
                  <div>
                    <h3 className="font-bold text-white">{d.name}</h3>
                    <p className="text-xs text-gray-500">{d.model}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  d.connected ? "bg-kebun-500/10 text-kebun-400" : "bg-gray-500/10 text-gray-500"
                }`}>
                  {d.connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {d.connected ? "Online" : "Offline"}
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-4">{deviceDescs[d.name]}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-soil-bg/50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Status</div>
                  <div className={`text-sm font-medium ${d.connected ? "text-kebun-400" : "text-gray-500"}`}>
                    {d.connected ? "Active" : "Inactive"}
                  </div>
                </div>
                <div className="bg-soil-bg/50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Last Sync</div>
                  <div className="text-sm font-medium text-white">{d.lastSync}</div>
                </div>
                {d.battery !== undefined && (
                  <div className="bg-soil-bg/50 rounded-lg p-3 col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Battery</span>
                      <div className="flex items-center gap-1">
                        {d.battery < 20 ? (
                          <BatteryLow className="w-4 h-4 text-red-400" />
                        ) : (
                          <Battery className="w-4 h-4 text-kebun-500" />
                        )}
                        <span className="text-sm font-medium text-white">{d.battery}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-soil-border rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          d.battery > 50 ? "bg-kebun-500" : d.battery > 20 ? "bg-sunlight" : "bg-red-500"
                        }`}
                        style={{ width: `${d.battery}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => connectDevice(d.id)}
                  className={`flex-1 text-sm py-2 rounded-xl font-semibold transition-all ${
                    d.connected
                      ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                      : "btn-primary"
                  }`}
                >
                  {d.connected ? "Disconnect" : "Connect"}
                </button>
                <button className="p-2 rounded-xl bg-soil-bg border border-soil-border text-gray-400 hover:text-white transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl bg-soil-bg border border-soil-border text-gray-400 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
