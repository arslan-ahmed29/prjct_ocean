// ─────────────────────────────────────────────────────────────────────────────
// src/components/layout/Footer.tsx
//
// A simple footer showing data source credits and the last update time.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './Footer.module.css'
import { formatTime } from '../../utils/formatters'

interface FooterProps {
  lastUpdated: number   // Unix timestamp (ms) of the most recent data fetch
  isMockData: boolean   // True = show "Demo data" instead of "OpenWeatherMap"
}

export function Footer({ lastUpdated, isMockData }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <span>
        Weather: {isMockData ? 'Demo data' : 'OpenWeatherMap API'}
        {' · '}
        Parking & Traffic: Demo data
      </span>
      <span>
        Last updated: {formatTime(lastUpdated)}
      </span>
    </footer>
  )
}
