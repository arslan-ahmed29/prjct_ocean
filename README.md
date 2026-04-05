# 🌊 Beach Dashboard

A real-time beach conditions dashboard showing weather, parking availability, traffic & crowds, and safety warnings.

## Features

- **Weather** — Temperature (°C/°F toggle), feels-like, wind speed & direction, UV index with sunscreen advice, estimated wave height
- **Parking** — Capacity bars for multiple lots with availability counts and pricing
- **Traffic & Crowds** — Beach crowd meter + road congestion status for access routes
- **Warnings & Alerts** — Auto-generated from weather data + static beach advisories; dismissible

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. (Optional) Add a real weather API key

Copy `.env.example` to `.env` and fill in your free [OpenWeatherMap](https://openweathermap.org/api) API key:

```bash
cp .env.example .env
# Then edit .env and replace YOUR_KEY_HERE with your actual key
```

Without a key the app runs in **demo mode** with realistic sample data — all features work.

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customising the Beach Location

Edit `src/config/constants.ts` and change `BEACH_LAT`, `BEACH_LON`, and `BEACH_NAME` to your preferred beach.

## Tech Stack

- React 18 + TypeScript (strict mode)
- Vite for building and local dev server
- CSS Modules with a custom beach theme
- OpenWeatherMap free-tier API for weather
