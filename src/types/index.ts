// ─────────────────────────────────────────────────────────────────────────────
// src/types/index.ts
//
// This file defines the "shape" of all our data using TypeScript interfaces.
// An interface is like a contract — it says "any object of this type MUST
// have exactly these fields, with exactly these data types."
//
// Why bother? If you accidentally write weather.temp instead of weather.tempC,
// TypeScript will underline it in red right away instead of crashing at runtime.
// ─────────────────────────────────────────────────────────────────────────────


// ── WEATHER ──────────────────────────────────────────────────────────────────

// All the weather info we display for the beach
export interface WeatherData {
  location: string          // Name of the beach/city, e.g. "Santa Monica, CA"
  timestamp: number         // When this data was fetched (milliseconds since 1970 — standard JS time)
  condition: string         // Human-readable sky condition, e.g. "Clear", "Clouds", "Rain"
  conditionCode: number     // OpenWeatherMap's numeric code — used to pick the right weather icon
  tempC: number             // Temperature in Celsius
  feelsLikeC: number        // "Feels like" temperature — accounts for wind chill and humidity
  humidity: number          // Relative humidity, 0–100 (percent)
  pressure: number          // Atmospheric pressure in hPa (hectopascals); typical sea level = ~1013
  windSpeedMs: number       // Wind speed in metres per second
  windDeg: number           // Wind direction in degrees (0 = North, 90 = East, 180 = South, 270 = West)
  windGustMs?: number       // Gust speed — the "?" means this field is optional (not always available)
  uvIndex: number           // UV index: 0–2 low, 3–5 moderate, 6–7 high, 8–10 very high, 11+ extreme
  visibility: number        // How far you can see, in metres
  waveHeightM: number       // Estimated wave height in metres (we calculate this from wind speed)
  swellDirection: string    // Which direction waves are coming from, e.g. "NW"
  isMock: boolean           // True = we're using fake demo data; False = real API data
}


// ── PARKING ──────────────────────────────────────────────────────────────────

// Whether a parking lot is open and usable
export type LotStatus = 'open' | 'full' | 'closed'

// All the info for one parking lot
export interface ParkingLot {
  id: string                   // Unique identifier for this lot, e.g. "north-lot"
  name: string                 // Display name, e.g. "North Beach Lot"
  totalSpaces: number          // How many spaces the lot has in total
  availableSpaces: number      // How many are currently free
  status: LotStatus            // Is it open, full, or temporarily closed?
  distanceFromBeachM: number   // Walking distance to the beach in metres
  hourlyRate: number           // Cost per hour in USD (0 if free)
  isFree: boolean              // True if it's free to park here
}


// ── TRAFFIC & CROWDS ─────────────────────────────────────────────────────────

// How backed-up a road is
export type CongestionLevel = 'low' | 'moderate' | 'heavy' | 'standstill'

// Info about one road section (like "Coastal Highway inbound")
export interface RoadSegment {
  name: string                        // Road name, e.g. "Pacific Coast Highway"
  direction: 'inbound' | 'outbound' | 'both'  // Which way traffic is measured
  congestion: CongestionLevel         // How bad is it right now?
  estimatedDelayMin: number           // Extra minutes added to your drive because of traffic
}

// How busy the beach itself is (not the roads)
export type CrowdLevel = 'empty' | 'light' | 'moderate' | 'busy' | 'packed'

// Everything about traffic and crowds
export interface TrafficData {
  beachCrowdLevel: CrowdLevel   // How crowded the beach itself is
  crowdCount: number            // Estimated number of people currently on the beach
  roads: RoadSegment[]          // Array of road segments ([] means a list of them)
  timestamp: number             // When this snapshot was taken
  isMock: boolean               // True = demo data
}


// ── WARNINGS & ALERTS ────────────────────────────────────────────────────────

// How serious a warning is (from least to most urgent)
export type WarningSeverity = 'info' | 'advisory' | 'warning' | 'danger'

// A single beach warning or alert
export interface Warning {
  id: string                       // Unique ID so React can track it in lists
  severity: WarningSeverity        // How serious this is
  title: string                    // Short headline, e.g. "Rip Current Advisory"
  description: string              // Longer explanation of the hazard
  source: 'weather' | 'static'    // Did we generate this from weather data, or is it hardcoded?
  timestamp: number                // When this alert was created/issued
}
