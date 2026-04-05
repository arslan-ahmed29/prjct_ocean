// ─────────────────────────────────────────────────────────────────────────────
// src/components/layout/Header.tsx
//
// The top bar of the app. Shows the beach name, current time,
// and a "Demo Data" banner if no real API key is configured.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import styles from './Header.module.css'
import { BEACH_NAME } from '../../config/constants'

// Props = the data passed into this component from its parent.
// isMockData tells the header whether to show the demo-mode banner.
interface HeaderProps {
  isMockData: boolean
}

export function Header({ isMockData }: HeaderProps) {
  // State to hold the current time — we'll update it every second
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // Update the clock every 1000ms (1 second)
    const tick = setInterval(() => setTime(new Date()), 1000)
    // Cancel the interval when this component unmounts (cleanup)
    return () => clearInterval(tick)
  }, []) // [] = only run once on mount

  // Format the time as "Saturday, April 5 • 2:34 PM"
  const dateStr = time.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const timeStr = time.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <header className={styles.header}>
      {/* Wave icon + beach name */}
      <div className={styles.brand}>
        <span className={styles.wave} aria-hidden="true">🌊</span>
        <h1 className={styles.title}>{BEACH_NAME}</h1>
      </div>

      {/* Live clock */}
      <div className={styles.clock}>
        <span className={styles.date}>{dateStr}</span>
        <span className={styles.time}>{timeStr}</span>
      </div>

      {/* Demo data banner — only visible when running without an API key */}
      {isMockData && (
        <div className={styles.mockBanner} role="status">
          Demo mode — add a real API key to see live weather
        </div>
      )}
    </header>
  )
}
