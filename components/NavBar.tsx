"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Map, Swords, Activity, Leaf, Package,
  Trophy, Gift, TrendingUp, Cpu, LogOut, Sprout
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/map", label: "Task Board", icon: Map },
  { href: "/activity", label: "Activities", icon: Activity },
  { href: "/garden", label: "Garden", icon: Leaf },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/devices", label: "Devices", icon: Cpu },
];

export default function NavBar() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/auth" || pathname === "/onboarding") return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col glass-card border-r border-kebun-800/30 z-50">
        <Link href="/dashboard" className="flex items-center gap-3 px-6 py-5 border-b border-kebun-800/30">
          <Sprout className="w-8 h-8 text-kebun-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-kebun-400 to-kebun-600 bg-clip-text text-transparent">
            KebunForge
          </span>
        </Link>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-kebun-600/20 text-kebun-400 border border-kebun-600/30"
                      : "text-gray-400 hover:text-kebun-300 hover:bg-kebun-900/30"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                  {active && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-kebun-500"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-kebun-800/30">
          <Link href="/auth">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Sign Out</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-kebun-800/30 z-50 px-2 py-2">
        <div className="flex justify-around">
          {links.slice(0, 5).map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${
                    active ? "text-kebun-400" : "text-gray-500"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-[10px]">{link.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
