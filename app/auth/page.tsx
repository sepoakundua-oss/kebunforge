"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sprout, Mail, Lock, User } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 grid-pattern">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-md green-glow"
      >
        <div className="text-center mb-8">
          <Sprout className="w-12 h-12 mx-auto text-kebun-500 mb-3" />
          <h1 className="text-2xl font-bold text-white">
            {isSignUp ? "Join KebunForge" : "Welcome Back"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isSignUp ? "Create your garden account" : "Sign in to your garden"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Gardener Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-soil-bg border border-soil-border rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-kebun-500 transition-colors"
                />
              </div>
            </motion.div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              placeholder="garden@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-soil-bg border border-soil-border rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-kebun-500 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-soil-bg border border-soil-border rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-kebun-500 transition-colors"
            />
          </div>

          <button type="submit" className="btn-primary w-full py-3 text-sm">
            {isSignUp ? "🌱 Create Account" : "🌿 Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-kebun-500 hover:text-kebun-400 transition-colors"
          >
            {isSignUp ? "Already have an account? Sign in" : "New gardener? Sign up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
