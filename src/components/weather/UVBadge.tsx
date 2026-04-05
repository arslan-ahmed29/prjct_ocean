// ─────────────────────────────────────────────────────────────────────────────
// src/components/weather/UVBadge.tsx
//
// A coloured badge showing the UV index number, label, and sunscreen advice.
// Color transitions from green (safe) → yellow → orange → red → purple (extreme).
// ─────────────────────────────────────────────────────────────────────────────

import styles from './UVBadge.module.css'
import { uvLabel, uvColor, uvTextColor, uvAdvice } from '../../utils/uvIndex'

interface UVBadgeProps {
  uvIndex: number
}

export function UVBadge({ uvIndex }: UVBadgeProps) {
  // Get the color and label for this UV level
  const bgColor = uvColor(uvIndex)
  const textColor = uvTextColor(uvIndex)
  const label = uvLabel(uvIndex)
  const advice = uvAdvice(uvIndex)

  return (
    <div className={styles.container}>
      {/* Coloured circle with the UV number — inline styles for dynamic colors */}
      <div
        className={styles.badge}
        style={{ background: bgColor, color: textColor }}
        title={`UV Index ${uvIndex}: ${label}`}
      >
        <span className={styles.number}>{uvIndex}</span>
        <span className={styles.label}>{label}</span>
      </div>

      {/* Sunscreen recommendation text underneath */}
      <p className={styles.advice}>{advice}</p>
    </div>
  )
}
