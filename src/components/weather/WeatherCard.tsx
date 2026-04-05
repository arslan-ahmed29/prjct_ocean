// ─────────────────────────────────────────────────────────────────────────────
// src/components/weather/WeatherCard.tsx
//
// The main weather panel. It assembles all the weather sub-components and
// includes a °C / °F toggle so the user can switch temperature units.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import styles from './WeatherCard.module.css'
import { WeatherData } from '../../types'
import { UVBadge } from './UVBadge'
import { WindInfo } from './WindInfo'
import { WaveConditions } from './WaveConditions'
import { formatTemp } from '../../utils/formatters'

interface WeatherCardProps {
  data: WeatherData
}

// Map OWM condition codes to emoji icons — a quick visual without loading images
function conditionEmoji(code: number): string {
  if (code >= 200 && code < 300) return '⛈️'   // Thunderstorm
  if (code >= 300 && code < 400) return '🌦️'   // Drizzle
  if (code >= 500 && code < 600) return '🌧️'   // Rain
  if (code >= 600 && code < 700) return '❄️'   // Snow
  if (code >= 700 && code < 800) return '🌫️'   // Atmosphere (fog/haze)
  if (code === 800)              return '☀️'   // Clear sky
  if (code === 801)              return '🌤️'   // Few clouds
  if (code === 802)              return '⛅'    // Scattered clouds
  return '☁️'                                  // Broken/overcast clouds
}

export function WeatherCard({ data }: WeatherCardProps) {
  // Track whether to show Fahrenheit or Celsius
  // false = Celsius (default), true = Fahrenheit
  const [isFahrenheit, setIsFahrenheit] = useState(false)

  return (
    <div className={styles.card}>
      {/* Card header: title + C°/F° toggle button */}
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>
          <span aria-hidden="true">🌤️</span> Weather
        </h2>
        {/* Toggle button switches between °C and °F on each click */}
        <button
          className={styles.unitToggle}
          onClick={() => setIsFahrenheit(f => !f)}   // Flip the boolean
          title="Toggle temperature unit"
          aria-label={`Switch to ${isFahrenheit ? 'Celsius' : 'Fahrenheit'}`}
        >
          {isFahrenheit ? '°C' : '°F'}
        </button>
      </div>

      {/* Main temperature row: big number + condition */}
      <div className={styles.mainRow}>
        <div className={styles.tempBlock}>
          {/* Large temperature display */}
          <div className={styles.temp}>{formatTemp(data.tempC, isFahrenheit)}</div>
          {/* Feels-like underneath in smaller text */}
          <div className={styles.feelsLike}>
            Feels like {formatTemp(data.feelsLikeC, isFahrenheit)}
          </div>
        </div>

        {/* Condition emoji + label */}
        <div className={styles.conditionBlock}>
          <span className={styles.conditionEmoji} aria-hidden="true">
            {conditionEmoji(data.conditionCode)}
          </span>
          <span className={styles.conditionText}>{data.condition}</span>
        </div>
      </div>

      {/* Stats row: humidity and pressure */}
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Humidity</span>
          <span className={styles.statValue}>{data.humidity}%</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Pressure</span>
          <span className={styles.statValue}>{data.pressure} hPa</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Visibility</span>
          <span className={styles.statValue}>
            {data.visibility >= 10000 ? '10+ km' : `${(data.visibility / 1000).toFixed(1)} km`}
          </span>
        </div>
      </div>

      {/* Divider line */}
      <hr className={styles.divider} />

      {/* Wind section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Wind</h3>
        <WindInfo speedMs={data.windSpeedMs} gustMs={data.windGustMs} deg={data.windDeg} />
      </div>

      <hr className={styles.divider} />

      {/* UV section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>UV Index</h3>
        <UVBadge uvIndex={data.uvIndex} />
      </div>

      <hr className={styles.divider} />

      {/* Wave conditions section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Surf Conditions</h3>
        <WaveConditions waveHeightM={data.waveHeightM} swellDirection={data.swellDirection} />
      </div>
    </div>
  )
}
