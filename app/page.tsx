"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sprout, Leaf, TreePine, Sparkles, Shield, Swords, Zap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

const gardenTypes = [
  { name: "Tropical", icon: "🌴", desc: "Lush, humid, fast-growing paradise", color: "from-green-500 to-emerald-600" },
  { name: "Desert", icon: "🌵", desc: "Hardy, resilient, water-efficient", color: "from-yellow-500 to-amber-600" },
  { name: "Aquatic", icon: "💧", desc: "Water-loving, serene pond garden", color: "from-blue-500 to-cyan-600" },
  { name: "Forest", icon: "🌲", desc: "Ancient, mystical, deep-rooted", color: "from-emerald-600 to-green-900" },
];

const features = [
  { icon: Swords, title: "Battle Garden Pests", desc: "Fight aphids, locusts, drought and more in strategic garden combat" },
  { icon: Sprout, title: "Grow & Harvest", desc: "Plant, water, and harvest your way to becoming a master gardener" },
  { icon: Shield, title: "Craft Tools", desc: "Forge legendary gardening tools from seeds, nutrients and compost" },
  { icon: Zap, title: "Smart Devices", desc: "Connect IoT sensors to track soil health, moisture and sunlight" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-kebun-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-kebun-600/5 rounded-full blur-3xl" />

        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <Sprout className="w-16 h-16 mx-auto text-kebun-500 animate-leaf-float" />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-kebun-400 via-kebun-300 to-kebun-500 bg-clip-text text-transparent">
              KebunForge
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-300 mb-4">
            The Garden RPG Adventure
          </motion.p>
          <motion.p variants={fadeUp} className="text-gray-500 mb-10 max-w-2xl mx-auto">
            Battle pests, craft legendary tools, track your garden health with smart devices,
            and grow your way to becoming the ultimate master gardener.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <button className="btn-primary text-lg px-10 py-3 green-glow">
                🌱 Start Growing
              </button>
            </Link>
            <Link href="#features">
              <button className="btn-secondary text-lg px-10 py-3">
                Learn More
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            What Awaits Your Garden
          </motion.h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="glass-card glass-card-hover p-6 text-center"
              >
                <f.icon className="w-10 h-10 mx-auto mb-4 text-kebun-500" />
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Garden Types */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4 text-white"
          >
            Choose Your Garden
          </motion.h2>
          <p className="text-center text-gray-500 mb-12">Each garden type has unique strengths and abilities</p>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {gardenTypes.map((g) => (
              <motion.div
                key={g.name}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="glass-card glass-card-hover p-6 text-center cursor-pointer"
              >
                <span className="text-5xl mb-4 block">{g.icon}</span>
                <h3 className="font-bold text-lg text-white mb-2">{g.name}</h3>
                <p className="text-sm text-gray-400">{g.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center glass-card p-12 green-glow"
        >
          <Sparkles className="w-10 h-10 mx-auto mb-4 text-sunlight" />
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Grow?</h2>
          <p className="text-gray-400 mb-8">Join thousands of gardeners building their dream gardens.</p>
          <Link href="/auth">
            <button className="btn-primary text-lg px-10 py-3 green-glow">
              🌿 Begin Your Journey
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
