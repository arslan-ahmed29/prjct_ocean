// ─────────────────────────────────────────────────────────────────────────────
// src/components/traffic/RoadStatus.tsx
//
// Shows a single road segment's traffic status as a colored pill
// along with the estimated extra delay.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './RoadStatus.module.css'
import { RoadSegment, CongestionLevel } from '../../types'

interface RoadStatusProps {
  segment: RoadSegment
}

// Color coding for each congestion level
const CONGESTION_CONFIG: Record<CongestionLevel, { label: string; color: string; bg: string }> = {
  low: {
    label: 'Flowing',
    color: '#4caf50',
    bg: 'rgba(76, 175, 80, 0.2)',
  },
  moderate: {
    label: 'Moderate',
    color: '#ffc107',
    bg: 'rgba(255, 193, 7, 0.2)',
  },
  heavy: {
    label: 'Heavy',
    color: '#ff9800',
    bg: 'rgba(255, 152, 0, 0.2)',
  },
  standstill: {
    label: 'Standstill',
    color: '#f44336',
    bg: 'rgba(244, 67, 54, 0.2)',
  },
}

// Arrow icon showing traffic direction
const DIRECTION_ARROW: Record<string, string> = {
  inbound: '→',
  outbound: '←',
  both: '↔',
}

export function RoadStatus({ segment }: RoadStatusProps) {
  const config = CONGESTION_CONFIG[segment.congestion]
  const arrow = DIRECTION_ARROW[segment.direction] ?? '↔'

  return (
    <div className={styles.row}>
      {/* Road name + direction */}
      <div className={styles.roadInfo}>
        <span className={styles.arrow} aria-hidden="true">{arrow}</span>
        <div className={styles.nameGroup}>
          <span className={styles.name}>{segment.name}</span>
          <span className={styles.direction}>{segment.direction}</span>
        </div>
      </div>

      {/* Status pill + delay */}
      <div className={styles.status}>
        {segment.estimatedDelayMin > 0 && (
          <span className={styles.delay}>+{segment.estimatedDelayMin} min</span>
        )}
        <span
          className={styles.pill}
          style={{ color: config.color, background: config.bg, borderColor: config.color }}
        >
          {config.label}
        </span>
      </div>
    </div>
  )
}
