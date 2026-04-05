// ─────────────────────────────────────────────────────────────────────────────
// src/components/traffic/CrowdMeter.tsx
//
// A 5-segment visual meter showing how crowded the beach is.
// Like a battery indicator, but for beach crowding.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './CrowdMeter.module.css'
import { CrowdLevel } from '../../types'

interface CrowdMeterProps {
  level: CrowdLevel
  count: number   // Estimated number of people on the beach
}

// Map crowd level to how many segments to fill (out of 5)
const LEVEL_SEGMENTS: Record<CrowdLevel, number> = {
  empty: 1,
  light: 2,
  moderate: 3,
  busy: 4,
  packed: 5,
}

// Color for the filled segments at each crowd level
const LEVEL_COLOR: Record<CrowdLevel, string> = {
  empty: '#4caf50',     // Green — nearly empty, enjoy!
  light: '#8bc34a',     // Light green — pleasant
  moderate: '#ffc107',  // Amber — getting there
  busy: '#ff9800',      // Orange — crowded but manageable
  packed: '#f44336',    // Red — extremely crowded
}

// Human-readable label for each level
const LEVEL_LABEL: Record<CrowdLevel, string> = {
  empty: 'Nearly Empty',
  light: 'Light Crowds',
  moderate: 'Moderate',
  busy: 'Busy',
  packed: 'Packed',
}

export function CrowdMeter({ level, count }: CrowdMeterProps) {
  const filledCount = LEVEL_SEGMENTS[level]
  const color = LEVEL_COLOR[level]
  const label = LEVEL_LABEL[level]

  return (
    <div className={styles.container}>
      {/* Row of 5 segments */}
      <div className={styles.segments} aria-label={`Beach crowd level: ${label}`}>
        {/* Array.from creates [0,1,2,3,4] which we map over to make 5 segments */}
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={styles.segment}
            style={i < filledCount ? { background: color, borderColor: color } : {}}
          />
        ))}
      </div>

      {/* Label and count below the meter */}
      <div className={styles.info}>
        <span className={styles.levelLabel} style={{ color }}>{label}</span>
        <span className={styles.count}>~{count.toLocaleString()} people estimated</span>
      </div>
    </div>
  )
}
