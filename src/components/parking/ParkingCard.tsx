// ─────────────────────────────────────────────────────────────────────────────
// src/components/parking/ParkingCard.tsx
//
// The parking panel. Shows a summary count at the top and a LotRow for each lot.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './ParkingCard.module.css'
import { ParkingLot } from '../../types'
import { LotRow } from './LotRow'

interface ParkingCardProps {
  lots: ParkingLot[]
}

export function ParkingCard({ lots }: ParkingCardProps) {
  // Calculate the overall totals across all open lots for the summary line
  const openLots = lots.filter(l => l.status === 'open')
  const totalAvailable = openLots.reduce((sum, l) => sum + l.availableSpaces, 0)
  const totalSpaces = openLots.reduce((sum, l) => sum + l.totalSpaces, 0)

  return (
    <div className={styles.card}>
      {/* Card header */}
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>
          <span aria-hidden="true">🅿️</span> Parking
        </h2>
        {/* Overall summary pill */}
        <div className={styles.summary}>
          <strong>{totalAvailable}</strong> / {totalSpaces} spaces
        </div>
      </div>

      {/* One row per parking lot */}
      <div className={styles.lotList}>
        {lots.map(lot => (
          // key prop tells React how to identify each item in the list
          <LotRow key={lot.id} lot={lot} />
        ))}
      </div>
    </div>
  )
}
