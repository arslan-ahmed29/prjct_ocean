// ─────────────────────────────────────────────────────────────────────────────
// src/data/mockWeather.ts
//
// Realistic sample weather data for a sunny beach day.
// This is shown when no OpenWeatherMap API key is configured.
// Numbers are based on a typical warm, breezy Santa Monica afternoon.
// ─────────────────────────────────────────────────────────────────────────────

import { WeatherData } from '../types'
import { BEACH_CITY } from '../config/constants'

export const mockWeather: WeatherData = {
  location: BEACH_CITY,
  timestamp: Date.now(),           // Current time when the module is first loaded

  condition: 'Clear',              // Clear blue sky
  conditionCode: 800,              // OWM code 800 = "clear sky"

  tempC: 26,                       // 26°C = ~79°F — a pleasant warm day
  feelsLikeC: 27,                  // Feels slightly warmer due to humidity

  humidity: 62,                    // 62% humidity — comfortable but slightly muggy
  pressure: 1013,                  // Standard sea-level atmospheric pressure (hPa)

  windSpeedMs: 4.2,                // Light-moderate breeze (about 15 km/h)
  windDeg: 315,                    // Northwest wind (typical onshore sea breeze)
  windGustMs: 6.8,                 // Occasional gusts a bit stronger

  uvIndex: 7,                      // "High" UV — sunscreen strongly recommended
  visibility: 10000,               // 10 km visibility — clear day

  // Wave height estimated from wind speed (light chop, good for swimming)
  waveHeightM: 0.8,
  swellDirection: 'NW',            // Waves arriving from the northwest

  isMock: true,                    // Flag so the UI can show a "Demo data" banner
}
