// ─────────────────────────────────────────────────────────────────────────────
// src/utils/formatters.ts
//
// Pure functions that convert raw numbers into nicely formatted strings.
// "Pure" means they only depend on their inputs — no side effects, no state.
// That makes them trivial to test and reason about.
// ─────────────────────────────────────────────────────────────────────────────


// ── Temperature ───────────────────────────────────────────────────────────────

/** Convert Celsius to Fahrenheit (the classic formula: × 9/5, + 32) */
export function cToF(celsius: number): number {
  return Math.round(celsius * 9 / 5 + 32)
}

/** Display temperature with the right unit symbol */
export function formatTemp(tempC: number, isFahrenheit: boolean): string {
  return isFahrenheit ? `${cToF(tempC)}°F` : `${Math.round(tempC)}°C`
}


// ── Wind ──────────────────────────────────────────────────────────────────────

/** Convert metres per second to kilometres per hour */
export function msToKmh(ms: number): number {
  return Math.round(ms * 3.6)
}

/** Convert metres per second to miles per hour */
export function msToMph(ms: number): number {
  return Math.round(ms * 2.237)
}

/**
 * Get a descriptive Beaufort scale label for wind speed.
 * The Beaufort scale (0–12) describes wind in human terms like "Calm" or "Gale".
 */
export function beaufortLabel(ms: number): string {
  if (ms < 0.5)  return 'Calm'
  if (ms < 1.6)  return 'Light air'
  if (ms < 3.4)  return 'Light breeze'
  if (ms < 5.5)  return 'Gentle breeze'
  if (ms < 8.0)  return 'Moderate breeze'
  if (ms < 10.8) return 'Fresh breeze'
  if (ms < 13.9) return 'Strong breeze'
  if (ms < 17.2) return 'High wind'
  if (ms < 20.8) return 'Gale'
  if (ms < 24.5) return 'Severe gale'
  if (ms < 28.5) return 'Storm'
  return 'Violent storm'
}

/**
 * Convert wind degrees (0–360) to a compass direction label.
 * 0° = North, 90° = East, 180° = South, 270° = West.
 */
export function windDegToLabel(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  // 16 directions, each covers 22.5°
  const index = Math.round(deg / 22.5) % 16
  return dirs[index]
}


// ── Distance ──────────────────────────────────────────────────────────────────

/** Format a distance in metres as a human-friendly walking description */
export function formatDistance(metres: number): string {
  if (metres < 1000) return `${metres}m walk`
  return `${(metres / 1000).toFixed(1)}km walk`
}


// ── Time ──────────────────────────────────────────────────────────────────────

/** Format a Unix timestamp (ms) into a short time string like "2:34 PM" */
export function formatTime(timestampMs: number): string {
  return new Date(timestampMs).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}
