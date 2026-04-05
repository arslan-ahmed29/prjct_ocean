// ─────────────────────────────────────────────────────────────────────────────
// src/utils/warningsEngine.ts
//
// The warnings engine combines two sources of alerts:
//
//   1. WEATHER-DERIVED warnings — generated automatically from live weather data
//      (e.g. "UV is 9, issue a Very High UV advisory")
//
//   2. STATIC warnings — hardcoded alerts that the beach authority would post
//      (e.g. "Rip current advisory in effect" or "North lot construction")
//
// The result is a sorted list of Warning objects, most severe first.
// ─────────────────────────────────────────────────────────────────────────────

import { WeatherData, Warning, WarningSeverity } from '../types'

// ── Static (hardcoded) alerts ─────────────────────────────────────────────────
// These would normally come from a beach authority API or CMS.
// For now they're hardcoded here. To remove an alert, delete its object.
// To add one, copy an existing object and change the fields.

const STATIC_WARNINGS: Warning[] = [
  {
    id: 'static-rip-1',
    severity: 'warning',
    title: 'Rip Current Advisory',
    description: 'Rip currents are present near the pier. Swim parallel to shore if caught.',
    source: 'static',
    timestamp: Date.now(),
  },
  {
    id: 'static-jellyfish-1',
    severity: 'advisory',
    title: 'Jellyfish Sighting',
    description: 'Moon jellyfish spotted in the surf zone. Wear water shoes and watch children.',
    source: 'static',
    timestamp: Date.now(),
  },
]


// ── Severity ordering ─────────────────────────────────────────────────────────
// Used to sort warnings — higher number = more urgent = shown first.

const SEVERITY_RANK: Record<WarningSeverity, number> = {
  info: 1,
  advisory: 2,
  warning: 3,
  danger: 4,
}


// ── Main export: deriveWarnings() ─────────────────────────────────────────────
// Takes the current weather data and returns all active warnings, sorted by severity.

export function deriveWarnings(weather: WeatherData | null): Warning[] {
  const warnings: Warning[] = []

  // ── Weather-derived warnings ───────────────────────────────────────────────
  if (weather) {
    const now = weather.timestamp

    // High UV warning (UV ≥ 8 = Very High; UV ≥ 11 = Extreme)
    if (weather.uvIndex >= 11) {
      warnings.push({
        id: 'wx-uv-extreme',
        severity: 'danger',
        title: 'Extreme UV Index',
        description: `UV index is ${weather.uvIndex}. Risk of severe sunburn in minutes. Avoid direct sun exposure.`,
        source: 'weather',
        timestamp: now,
      })
    } else if (weather.uvIndex >= 8) {
      warnings.push({
        id: 'wx-uv-veryhigh',
        severity: 'warning',
        title: 'Very High UV Index',
        description: `UV index is ${weather.uvIndex}. Apply SPF 50+ sunscreen, wear a hat and UV-protective clothing.`,
        source: 'weather',
        timestamp: now,
      })
    } else if (weather.uvIndex >= 6) {
      warnings.push({
        id: 'wx-uv-high',
        severity: 'advisory',
        title: 'High UV Index',
        description: `UV index is ${weather.uvIndex}. SPF 30+ sunscreen recommended.`,
        source: 'weather',
        timestamp: now,
      })
    }

    // High wind warning (10 m/s ≈ 36 km/h = Fresh breeze; 14 m/s = Strong breeze)
    if (weather.windSpeedMs >= 14) {
      warnings.push({
        id: 'wx-wind-strong',
        severity: 'warning',
        title: 'Strong Wind Warning',
        description: `Wind speeds reaching ${Math.round(weather.windSpeedMs)} m/s. Secure umbrellas and loose items.`,
        source: 'weather',
        timestamp: now,
      })
    } else if (weather.windSpeedMs >= 10) {
      warnings.push({
        id: 'wx-wind-fresh',
        severity: 'advisory',
        title: 'Windy Conditions',
        description: `Fresh breeze at ${Math.round(weather.windSpeedMs)} m/s. Hold onto umbrellas and hats.`,
        source: 'weather',
        timestamp: now,
      })
    }

    // Rain warning (OWM condition codes 500–531 are various rain types)
    if (weather.conditionCode >= 500 && weather.conditionCode < 600) {
      warnings.push({
        id: 'wx-rain',
        severity: 'advisory',
        title: 'Rain Expected',
        description: 'Rainfall in the area. Beach conditions may deteriorate — check back for updates.',
        source: 'weather',
        timestamp: now,
      })
    }

    // Thunderstorm (OWM condition codes 200–232)
    if (weather.conditionCode >= 200 && weather.conditionCode < 300) {
      warnings.push({
        id: 'wx-thunderstorm',
        severity: 'danger',
        title: 'Thunderstorm Warning',
        description: 'Active thunderstorm near the area. Exit water immediately. Seek indoor shelter.',
        source: 'weather',
        timestamp: now,
      })
    }

    // High waves
    if (weather.waveHeightM >= 2.0) {
      warnings.push({
        id: 'wx-waves',
        severity: 'warning',
        title: 'High Surf Advisory',
        description: `Estimated wave height ${weather.waveHeightM.toFixed(1)} m. Strong swimmers only — keep children out of the water.`,
        source: 'weather',
        timestamp: now,
      })
    }
  }

  // ── Combine with static warnings and sort ─────────────────────────────────
  // Spread operator (...) merges both arrays into one
  const all = [...warnings, ...STATIC_WARNINGS]

  // Sort descending by severity (most urgent first)
  return all.sort((a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity])
}
