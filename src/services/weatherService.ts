// ─────────────────────────────────────────────────────────────────────────────
// src/services/weatherService.ts
//
// This file is responsible for fetching weather data from OpenWeatherMap (OWM).
// It's a "service" — a module whose only job is to talk to an external API
// and hand back clean, typed data.
//
// Flow:
//   1. Check if we have a real API key
//   2. If yes → call the OWM API, normalize the raw JSON into our WeatherData shape
//   3. If no  → return the mock data instead (app still works, just demo data)
// ─────────────────────────────────────────────────────────────────────────────

import { WeatherData } from '../types'
import { OWM_BASE, OWM_API_KEY, BEACH_LAT, BEACH_LON, BEACH_CITY } from '../config/constants'
import { mockWeather } from '../data/mockWeather'


// ── Helper: estimate wave height from wind speed ──────────────────────────────
// OpenWeatherMap's free tier doesn't include wave/swell data.
// We use a simplified version of the Pierson-Moskowitz wave height formula:
//   H ≈ 0.0248 * windSpeed² (for open-ocean fetch ~100 km)
// It's not perfectly accurate but gives a realistic ballpark figure.

function estimateWaveHeight(windSpeedMs: number): number {
  // Returns estimated wave height in metres, capped at 6 m
  return Math.min(6, parseFloat((0.0248 * Math.pow(windSpeedMs, 2)).toFixed(1)))
}


// ── Helper: convert wind degrees to a compass direction label ─────────────────
// 0° = North, 90° = East, 180° = South, 270° = West.
// We divide the 360° circle into 8 equal 45° sectors.

function windDegToDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  // Add 22.5 so that, e.g., 337.5–22.5° all map to "N" (not just 0°)
  const index = Math.round(deg / 45) % 8
  return dirs[index]
}


// ── Main export: fetchWeather() ───────────────────────────────────────────────
// This is the function our React hook will call to get weather data.
// It's async because network requests take time — we have to wait for the response.

export async function fetchWeather(): Promise<WeatherData> {
  // If no API key is configured (or it's still the placeholder), use mock data
  if (!OWM_API_KEY || OWM_API_KEY === 'YOUR_KEY_HERE' || OWM_API_KEY.trim() === '') {
    // Small artificial delay so the UI shows the loading state briefly
    // (makes it obvious the app is "fetching" even in demo mode)
    await new Promise(r => setTimeout(r, 600))
    return { ...mockWeather, timestamp: Date.now() }
  }

  // ── Fetch current weather ─────────────────────────────────────────────────
  // The "units=metric" parameter tells OWM to return Celsius and metres/second
  const weatherUrl =
    `${OWM_BASE}/weather?lat=${BEACH_LAT}&lon=${BEACH_LON}&units=metric&appid=${OWM_API_KEY}`

  const weatherRes = await fetch(weatherUrl)

  // If the API returns an error (wrong key, network down, etc.) throw clearly
  if (!weatherRes.ok) {
    throw new Error(`Weather API error: ${weatherRes.status} ${weatherRes.statusText}`)
  }

  // Parse the JSON response body
  // "any" here is intentional — the raw OWM response is untyped, we normalize it below
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w: any = await weatherRes.json()

  // ── Fetch UV index (separate endpoint on the free tier) ───────────────────
  let uvIndex = 0
  try {
    const uvUrl =
      `${OWM_BASE}/uvi?lat=${BEACH_LAT}&lon=${BEACH_LON}&appid=${OWM_API_KEY}`
    const uvRes = await fetch(uvUrl)
    if (uvRes.ok) {
      const uvData = await uvRes.json()
      // OWM returns { value: 7.22, ... }
      uvIndex = Math.round(uvData.value ?? 0)
    }
  } catch {
    // UV fetch failing is non-fatal — we just show 0
  }

  // ── Normalize raw OWM data into our WeatherData interface ─────────────────
  // OWM's JSON structure looks like:
  //   { main: { temp, feels_like, humidity, pressure },
  //     wind: { speed, deg, gust },
  //     weather: [{ main, id }],
  //     visibility, ... }
  // We pick out exactly what we need and rename fields to match our interface.

  const windSpeedMs: number = w.wind?.speed ?? 0

  return {
    location: BEACH_CITY,
    timestamp: Date.now(),

    condition: w.weather?.[0]?.main ?? 'Unknown',
    conditionCode: w.weather?.[0]?.id ?? 800,

    tempC: Math.round(w.main?.temp ?? 20),
    feelsLikeC: Math.round(w.main?.feels_like ?? 20),
    humidity: w.main?.humidity ?? 50,
    pressure: w.main?.pressure ?? 1013,

    windSpeedMs,
    windDeg: w.wind?.deg ?? 0,
    windGustMs: w.wind?.gust,

    uvIndex,
    visibility: w.visibility ?? 10000,

    // Wave height and swell direction are estimated from wind
    waveHeightM: estimateWaveHeight(windSpeedMs),
    swellDirection: windDegToDirection(w.wind?.deg ?? 315),

    isMock: false,
  }
}
