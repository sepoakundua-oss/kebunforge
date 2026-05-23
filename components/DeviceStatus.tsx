"use client";
import { Wifi, WifiOff, Battery, BatteryLow } from "lucide-react";
import type { Device } from "@/lib/store";

export default function DeviceStatus({ device }: { device: Device }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-soil-bg/50 border border-soil-border">
      {device.connected ? (
        <Wifi className="w-4 h-4 text-kebun-500" />
      ) : (
        <WifiOff className="w-4 h-4 text-gray-500" />
      )}
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-white truncate">{device.name}</div>
        <div className="text-[10px] text-gray-500">{device.lastSync}</div>
      </div>
      {device.battery !== undefined && (
        <div className="flex items-center gap-1">
          {device.battery < 20 ? (
            <BatteryLow className="w-4 h-4 text-red-400" />
          ) : (
            <Battery className="w-4 h-4 text-kebun-500" />
          )}
          <span className="text-[10px] text-gray-400">{device.battery}%</span>
        </div>
      )}
    </div>
  );
}
