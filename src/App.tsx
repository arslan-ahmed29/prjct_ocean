// ─────────────────────────────────────────────────────────────────────────────
// src/App.tsx
//
// The root component of the whole app. It:
//   1. Calls all three data hooks to fetch weather, parking, and traffic
//   2. Runs the warnings engine to derive alerts from the weather data
//   3. Renders the layout: Header → grid of four cards → Footer
//
// Think of App.tsx as the "manager" that gathers all the data and hands it
// off to the display components.
// ─────────────────────────────────────────────────────────────────────────────

import './index.css'          // Import global styles (must come before component imports)
import styles from './App.module.css'

// ── Data hooks ────────────────────────────────────────────────────────────────
import { useWeather } from './hooks/useWeather'
import { useParking } from './hooks/useParking'
import { useTraffic } from './hooks/useTraffic'

// ── Business logic ────────────────────────────────────────────────────────────
import { deriveWarnings } from './utils/warningsEngine'

// ── Layout components ─────────────────────────────────────────────────────────
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

// ── Feature cards ─────────────────────────────────────────────────────────────
import { WeatherCard } from './components/weather/WeatherCard'
import { ParkingCard } from './components/parking/ParkingCard'
import { TrafficCard } from './components/traffic/TrafficCard'
import { WarningsCard } from './components/warnings/WarningsCard'

function App() {
  // ── Fetch all data ──────────────────────────────────────────────────────────
  // Each hook returns { data, loading, error }.
  // We destructure just what we need from each one.
  const { data: weather, loading: weatherLoading, error: weatherError } = useWeather()
  const { data: parking, loading: parkingLoading } = useParking()
  const { data: traffic, loading: trafficLoading } = useTraffic()

  // ── Derive warnings from weather data ──────────────────────────────────────
  // Pass null when weather hasn't loaded yet — the engine handles that gracefully
  const warnings = deriveWarnings(weather)

  // ── Determine overall mock state ────────────────────────────────────────────
  // Show the demo banner if we're using mock weather (or if weather hasn't loaded yet)
  const isMockData = weather?.isMock ?? true

  // ── Determine last update time ──────────────────────────────────────────────
  const lastUpdated = weather?.timestamp ?? Date.now()

  return (
    <div className={styles.shell}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <Header isMockData={isMockData} />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className={styles.main}>
        {/* If the weather API call completely failed, show an error message */}
        {weatherError && (
          <div className={styles.errorCard}>
            <div className={styles.errorTitle}>⚠️ Weather data unavailable</div>
            <div>{weatherError}</div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
              Showing demo data — check your API key in the .env file
            </div>
          </div>
        )}

        {/* ── The four-card grid ─────────────────────────────────────────── */}
        <div className={styles.grid}>

          {/* ── Weather card ──────────────────────────────────────────────── */}
          {weatherLoading ? (
            // "Skeleton" placeholder while loading — better UX than a blank space
            <div className={`${styles.skeleton} ${styles.skeletonWeather}`} aria-busy="true" />
          ) : weather ? (
            <WeatherCard data={weather} />
          ) : null}

          {/* ── Parking card ──────────────────────────────────────────────── */}
          {parkingLoading ? (
            <div className={`${styles.skeleton} ${styles.skeletonParking}`} aria-busy="true" />
          ) : (
            <ParkingCard lots={parking} />
          )}

          {/* ── Traffic & Crowds card ─────────────────────────────────────── */}
          {trafficLoading ? (
            <div className={`${styles.skeleton} ${styles.skeletonTraffic}`} aria-busy="true" />
          ) : traffic ? (
            <TrafficCard data={traffic} />
          ) : null}

          {/* ── Warnings card ─────────────────────────────────────────────── */}
          {/* Always shown — the card itself handles the "All Clear" state */}
          {!weatherLoading && (
            <WarningsCard warnings={warnings} />
          )}

        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer lastUpdated={lastUpdated} isMockData={isMockData} />
    </div>
  )
}

export default App
