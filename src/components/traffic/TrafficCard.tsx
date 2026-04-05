// ─────────────────────────────────────────────────────────────────────────────
// src/components/traffic/TrafficCard.tsx
//
// The traffic & crowds panel. Shows the beach crowd meter at the top,
// then a road status row for each tracked road segment.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './TrafficCard.module.css'
import { TrafficData } from '../../types'
import { CrowdMeter } from './CrowdMeter'
import { RoadStatus } from './RoadStatus'

interface TrafficCardProps {
  data: TrafficData
}

export function TrafficCard({ data }: TrafficCardProps) {
  return (
    <div className={styles.card}>
      {/* Card header */}
      <h2 className={styles.cardTitle}>
        <span aria-hidden="true">🚗</span> Traffic & Crowds
      </h2>

      {/* Beach crowding section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Beach Crowd Level</h3>
        <CrowdMeter level={data.beachCrowdLevel} count={data.crowdCount} />
      </div>

      <hr className={styles.divider} />

      {/* Road status section — one row per road segment */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Road Conditions</h3>
        <div className={styles.roadList}>
          {data.roads.map((road, index) => (
            // We use index as the key here since roads don't have unique IDs
            <RoadStatus key={`${road.name}-${road.direction}-${index}`} segment={road} />
          ))}
        </div>
      </div>
    </div>
  )
}
