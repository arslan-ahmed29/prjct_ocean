// ─────────────────────────────────────────────────────────────────────────────
// src/components/parking/LotRow.tsx
//
// A single row in the parking list: lot name, distance, rate, available count,
// and the capacity bar.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './LotRow.module.css'
import { ParkingLot } from '../../types'
import { CapacityBar } from './CapacityBar'
import { formatDistance } from '../../utils/formatters'

interface LotRowProps {
  lot: ParkingLot
}

export function LotRow({ lot }: LotRowProps) {
  // Decide what to show for the lot's availability status
  const isUnavailable = lot.status !== 'open'

  // Colour and label for the status pill
  const statusInfo = {
    open: { label: 'Open', color: 'rgba(76,175,80,0.3)', border: 'rgba(76,175,80,0.6)' },
    full: { label: 'Full', color: 'rgba(244,67,54,0.3)', border: 'rgba(244,67,54,0.6)' },
    closed: { label: 'Closed', color: 'rgba(120,120,120,0.3)', border: 'rgba(180,180,180,0.4)' },
  }[lot.status]

  return (
    <div className={`${styles.row} ${isUnavailable ? styles.unavailable : ''}`}>
      {/* Lot name and distance */}
      <div className={styles.header}>
        <span className={styles.name}>{lot.name}</span>
        {/* Status pill */}
        <span
          className={styles.statusPill}
          style={{ background: statusInfo.color, borderColor: statusInfo.border }}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Sub-info: distance and price */}
      <div className={styles.meta}>
        <span>📍 {formatDistance(lot.distanceFromBeachM)}</span>
        <span>{lot.isFree ? '🆓 Free' : `$${lot.hourlyRate.toFixed(2)}/hr`}</span>
      </div>

      {/* Capacity bar and count */}
      {lot.status === 'open' && (
        <>
          <CapacityBar total={lot.totalSpaces} available={lot.availableSpaces} />
          <div className={styles.count}>
            <strong>{lot.availableSpaces}</strong> of {lot.totalSpaces} spaces free
          </div>
        </>
      )}
      {lot.status === 'full' && (
        <div className={styles.fullMsg}>No spaces available — try another lot</div>
      )}
      {lot.status === 'closed' && (
        <div className={styles.fullMsg}>Temporarily closed</div>
      )}
    </div>
  )
}
