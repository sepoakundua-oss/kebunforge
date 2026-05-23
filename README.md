# 🌱 KebunForge - Garden RPG Adventure

> **🔗 Live Demo:** [https://kebunforge.vercel.app](https://kebunforge.vercel.app)

A gamified gardening game built with Next.js 14, TypeScript, Tailwind CSS, Zustand, and Framer Motion.

## Features

- 🌴 **4 Garden Types**: Tropical, Desert, Aquatic, Forest
- ⚔️ **Battle Pests**: Fight aphids, locusts, drought, weeds, and frost dragons
- 🔧 **Craft Tools**: Watering cans, pruning shears, soil kits, and legendary gear
- 📊 **Garden Health**: Track soil pH, sunlight hours, and water levels
- 🏆 **Leaderboard**: Compete with other gardeners weekly
- 🎁 **Reward Shop**: Spend Harvest Points on seeds, tools, and cosmetics
- 📱 **Smart Devices**: Connect IoT sensors for your garden
- 🔥 **Growth Streaks**: Maintain daily gardening streaks

## Tech Stack

- Next.js 14 (App Router)
- TypeScript 5
- Tailwind CSS 3.4
- Zustand 5 (state management)
- Framer Motion 12 (animations)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── layout.tsx        # Root layout with NavBar
├── page.tsx          # Landing page
├── globals.css       # Green nature theme
├── auth/             # Sign in/up
├── onboarding/       # 3-step setup wizard
├── dashboard/        # Main hub
├── map/              # Task board with filters
├── quest/[id]/       # 3-phase battle system
├── activity/         # Guided garden activities
├── garden/           # Health charts
├── inventory/        # Tool crafting & materials
├── leaderboard/      # Weekly rankings
├── rewards/          # HP shop
├── progress/         # Growth tracking
└── devices/          # Smart device hub

components/
├── NavBar.tsx        # Sidebar + mobile bottom bar
├── TaskCard.tsx      # Reusable task card
├── StreakBadge.tsx   # Growth streak display
├── HPBar.tsx         # Level & harvest points
└── DeviceStatus.tsx  # Device status badges

lib/
└── store.ts          # Zustand global store
```
