// ─────────────────────────────────────────────────────────────────────────────
// src/components/parking/CapacityBar.tsx
//
// A horizontal fill bar showing how full a parking lot is.
// Color-coded:
//   Green  = plenty of spaces (>50% free)
//   Yellow = getting full (20–50% free)
//   Red    = nearly full (<20% free)
// ─────────────────────────────────────────────────────────────────────────────

import styles from './CapacityBar.module.css'

interface CapacityBarProps {
  total: number      // How many spaces the lot has in total
  available: number  // How many are currently free
}

export function CapacityBar({ total, available }: CapacityBarProps) {
  // Percentage of spaces that are OCCUPIED (used for the filled portion of the bar)
  const occupiedPct = total === 0 ? 100 : Math.round(((total - available) / total) * 100)
  // Percentage that are free (used to pick the color)
  const freePct = 100 - occupiedPct

  // Pick bar color based on how full it is
  let barColor: string
  if (freePct > 50) {
    barColor = '#4caf50'      // Green — lots of room
  } else if (freePct > 20) {
    barColor = '#ffc107'      // Amber — getting full
  } else {
    barColor = '#f44336'      // Red — almost no spaces left
  }

  return (
    <div className={styles.wrapper}>
      {/* The background "track" of the bar */}
      <div className={styles.track} role="progressbar"
        aria-valuenow={occupiedPct} aria-valuemin={0} aria-valuemax={100}
        aria-label={`${freePct}% available`}
      >
        {/* The filled portion — width is set dynamically based on occupancy */}
        <div
          className={styles.fill}
          style={{ width: `${occupiedPct}%`, background: barColor }}
        />
      </div>
    </div>
  )
}
