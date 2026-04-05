// ─────────────────────────────────────────────────────────────────────────────
// src/components/weather/WindInfo.tsx
//
// Shows wind speed, gust, direction, and a rotating compass arrow SVG.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './WindInfo.module.css'
import { msToKmh, windDegToLabel, beaufortLabel } from '../../utils/formatters'

interface WindInfoProps {
  speedMs: number       // Wind speed in m/s
  gustMs?: number       // Gust speed — optional
  deg: number           // Wind direction in degrees (0 = North)
}

export function WindInfo({ speedMs, gustMs, deg }: WindInfoProps) {
  const kmh = msToKmh(speedMs)
  const direction = windDegToLabel(deg)
  const description = beaufortLabel(speedMs)

  // Rotate the compass arrow SVG to point in the wind direction.
  // The SVG arrow points "up" by default, which = North (0°).
  // We add 180° because the arrow should show WHERE the wind is blowing TO.
  const arrowRotation = (deg + 180) % 360

  return (
    <div className={styles.container}>
      {/* Compass arrow (inline SVG — no image file needed) */}
      <div className={styles.compass} title={`Wind from ${direction}`}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          style={{ transform: `rotate(${arrowRotation}deg)`, transition: 'transform 0.5s ease' }}
          aria-hidden="true"
        >
          {/* Compass circle */}
          <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
          {/* Arrow pointing upward (toward wind destination) */}
          <polygon points="24,6 28,32 24,28 20,32" fill="rgba(255,255,255,0.9)"/>
          <polygon points="24,42 28,28 24,32 20,28" fill="rgba(255,255,255,0.35)"/>
        </svg>
        <span className={styles.dirLabel}>{direction}</span>
      </div>

      {/* Wind speed info */}
      <div className={styles.info}>
        <div className={styles.speed}>
          <span className={styles.speedValue}>{kmh}</span>
          <span className={styles.speedUnit}> km/h</span>
        </div>
        <div className={styles.desc}>{description}</div>
        {/* Show gust speed if available and significantly higher than average */}
        {gustMs && gustMs > speedMs + 2 && (
          <div className={styles.gust}>Gusts to {msToKmh(gustMs)} km/h</div>
        )}
      </div>
    </div>
  )
}
