// ─────────────────────────────────────────────────────────────────────────────
// src/data/mockWeather.ts
//
// Realistic sample weather for a typical warm summer day at Wrightsville Beach, NC.
// NC coast is much more humid than California — expect higher feels-like temps.
// ─────────────────────────────────────────────────────────────────────────────

import { WeatherData } from '../types'
import { BEACH_CITY } from '../config/constants'

export const mockWeather: WeatherData = {
  location: BEACH_CITY,
  timestamp: Date.now(),

  condition: 'Partly Cloudy',
  conditionCode: 802,              // OWM code 802 = "scattered clouds"

  tempC: 30,                       // 30°C = 86°F — hot NC summer day
  feelsLikeC: 35,                  // Feels like 95°F due to high humidity

  humidity: 82,                    // NC coast is very humid in summer
  pressure: 1014,                  // Slightly above standard sea level pressure

  windSpeedMs: 5.8,                // Moderate sea breeze off the Atlantic (~21 km/h)
  windDeg: 202,                    // South-southwest — typical summer Atlantic coast wind
  windGustMs: 9.2,                 // Occasional stronger gusts

  uvIndex: 9,                      // Very high UV — strong mid-summer sun in NC
  visibility: 16000,               // 16 km — clear day with slight coastal haze

  // Moderate Atlantic swell — typical for summer at Wrightsville
  waveHeightM: 1.1,
  swellDirection: 'SSE',           // Swell coming in from the southeast off the Atlantic

  isMock: true,
}
