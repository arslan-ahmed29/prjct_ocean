// ─────────────────────────────────────────────────────────────────────────────
// src/config/constants.ts
//
// A central place for settings you might want to change later.
// Instead of scattering magic numbers/strings across 20 files,
// we define them once here and import them wherever needed.
// ─────────────────────────────────────────────────────────────────────────────


// ── BEACH LOCATION ───────────────────────────────────────────────────────────
// These coordinates tell the weather API where our beach is.
// To change beaches: look up the lat/lon on Google Maps (right-click → "What's here?")

export const BEACH_LAT = 34.0195    // Latitude for Santa Monica, CA
export const BEACH_LON = -118.4912  // Longitude for Santa Monica, CA
export const BEACH_NAME = 'Santa Monica Beach'
export const BEACH_CITY = 'Santa Monica, CA'


// ── OPENWEATHERMAP API ───────────────────────────────────────────────────────
// Base URL for the OpenWeatherMap free-tier API
// We read the key from the .env file — it's never hardcoded here for security

export const OWM_BASE = 'https://api.openweathermap.org/data/2.5'

// The API key is stored in a .env file as VITE_OWM_API_KEY.
// Vite exposes env variables that start with "VITE_" to our frontend code.
// If the key is missing or still says "YOUR_KEY_HERE", we fall back to mock data.
export const OWM_API_KEY = import.meta.env.VITE_OWM_API_KEY as string | undefined


// ── DATA REFRESH ─────────────────────────────────────────────────────────────
// How often (in milliseconds) to re-fetch weather data from the API.
// 10 minutes = 10 * 60 * 1000 = 600,000 ms
// The free OWM tier updates weather data every 10 minutes, so polling faster is wasteful.

export const WEATHER_REFRESH_MS = 10 * 60 * 1000
