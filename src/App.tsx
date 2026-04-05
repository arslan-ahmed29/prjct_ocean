import './index.css'
import styles from './App.module.css'
import { useState, useEffect, useRef, TouchEvent } from 'react'

import { useWeather } from './hooks/useWeather'
import { useParking } from './hooks/useParking'
import { useTraffic } from './hooks/useTraffic'
import { deriveWarnings } from './utils/warningsEngine'

import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WeatherCard } from './components/weather/WeatherCard'
import { ParkingCard } from './components/parking/ParkingCard'
import { TrafficCard } from './components/traffic/TrafficCard'
import { WarningsCard } from './components/warnings/WarningsCard'

// Labels shown on the dot indicators below the carousel
const CARD_LABELS = ['🌤️ Weather', '🅿️ Parking', '🚗 Traffic', '⚠️ Warnings']

// How many milliseconds before the carousel auto-advances to the next card
const AUTO_ADVANCE_MS = 6000

function App() {
  const { data: weather, loading: weatherLoading, error: weatherError } = useWeather()
  const { data: parking, loading: parkingLoading } = useParking()
  const { data: traffic, loading: trafficLoading } = useTraffic()
  const warnings = deriveWarnings(weather)
  const isMockData = weather?.isMock ?? true
  const lastUpdated = weather?.timestamp ?? Date.now()

  // Which card is currently showing (0 = Weather, 1 = Parking, 2 = Traffic, 3 = Warnings)
  const [activeIndex, setActiveIndex] = useState(0)

  // Track touch start position for swipe detection
  const touchStartX = useRef<number | null>(null)

  // Pause auto-advance briefly after user manually navigates
  const [paused, setPaused] = useState(false)

  // Auto-advance the carousel every AUTO_ADVANCE_MS milliseconds
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % 4)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [paused])

  // Resume auto-advance 10 seconds after user last interacted
  useEffect(() => {
    if (!paused) return
    const resume = setTimeout(() => setPaused(false), 10000)
    return () => clearTimeout(resume)
  }, [paused])

  function goTo(index: number) {
    setActiveIndex(index)
    setPaused(true)
  }

  function goPrev() { goTo((activeIndex + 3) % 4) }
  function goNext() { goTo((activeIndex + 1) % 4) }

  // Swipe left → next card, swipe right → previous card
  function onTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: TouchEvent) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev()
    touchStartX.current = null
  }

  // Build the four card elements (or skeleton placeholders while loading)
  const cards = [
    weatherLoading
      ? <div key="wx" className={`${styles.skeleton} ${styles.skeletonWeather}`} aria-busy="true" />
      : weather
        ? <WeatherCard key="wx" data={weather} />
        : null,

    parkingLoading
      ? <div key="pk" className={`${styles.skeleton} ${styles.skeletonParking}`} aria-busy="true" />
      : <ParkingCard key="pk" lots={parking} />,

    trafficLoading
      ? <div key="tr" className={`${styles.skeleton} ${styles.skeletonTraffic}`} aria-busy="true" />
      : traffic
        ? <TrafficCard key="tr" data={traffic} />
        : null,

    !weatherLoading
      ? <WarningsCard key="wn" warnings={warnings} />
      : <div key="wn" className={`${styles.skeleton} ${styles.skeletonWarnings}`} aria-busy="true" />,
  ]

  return (
    <div className={styles.shell}>
      <Header isMockData={isMockData} />

      <main className={styles.main}>
        {weatherError && (
          <div className={styles.errorCard}>
            <div className={styles.errorTitle}>⚠️ Weather data unavailable</div>
            <div>{weatherError}</div>
          </div>
        )}

        {/* ── Carousel ─────────────────────────────────────────────────────── */}
        <div
          className={styles.carousel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Left arrow */}
          <button className={styles.arrowBtn} onClick={goPrev} aria-label="Previous card">
            ‹
          </button>

          {/* cardClip hides the horizontal overflow of off-screen cards.
              cardViewport grows to the height of whichever card is active. */}
          <div className={styles.cardClip}>
            <div className={styles.cardViewport}>
              {cards.map((card, i) => (
                <div
                  key={i}
                  style={{
                    // Active card: position:relative so the viewport stretches to its height.
                    // Inactive cards: position:absolute so they don't affect the layout height.
                    position: i === activeIndex ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateX(${(i - activeIndex) * 100}%)`,
                    transition: 'transform 0.35s ease, opacity 0.35s ease',
                    opacity: i === activeIndex ? 1 : 0,
                    // Inactive cards can't be clicked or focused
                    pointerEvents: i === activeIndex ? 'auto' : 'none',
                  }}
                  aria-hidden={i !== activeIndex}
                >
                  {card}
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button className={styles.arrowBtn} onClick={goNext} aria-label="Next card">
            ›
          </button>
        </div>

        {/* ── Dot indicators ───────────────────────────────────────────────── */}
        <div className={styles.dots} role="tablist">
          {CARD_LABELS.map((label, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to ${label}`}
              title={label}
            />
          ))}
        </div>

        {/* Current card label */}
        <div className={styles.cardLabel}>{CARD_LABELS[activeIndex]}</div>
      </main>

      <Footer lastUpdated={lastUpdated} isMockData={isMockData} />
    </div>
  )
}

export default App
