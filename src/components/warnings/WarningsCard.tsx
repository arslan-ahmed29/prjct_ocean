// ─────────────────────────────────────────────────────────────────────────────
// src/components/warnings/WarningsCard.tsx
//
// The warnings panel. If there are no active warnings, shows a green "All Clear"
// message instead. Otherwise lists all warnings sorted by severity.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './WarningsCard.module.css'
import { Warning } from '../../types'
import { AlertBanner } from './AlertBanner'

interface WarningsCardProps {
  warnings: Warning[]
}

export function WarningsCard({ warnings }: WarningsCardProps) {
  return (
    <div className={styles.card}>
      {/* Card header */}
      <h2 className={styles.cardTitle}>
        <span aria-hidden="true">⚠️</span> Warnings & Alerts
        {/* Badge showing the count of active warnings */}
        {warnings.length > 0 && (
          <span className={styles.countBadge}>{warnings.length}</span>
        )}
      </h2>

      {/* All clear state — shown when there are no warnings */}
      {warnings.length === 0 ? (
        <div className={styles.allClear}>
          <span className={styles.checkEmoji} aria-hidden="true">✅</span>
          <div>
            <div className={styles.allClearTitle}>All Clear</div>
            <div className={styles.allClearSub}>No active beach warnings or advisories</div>
          </div>
        </div>
      ) : (
        // Map each warning to an AlertBanner component
        <div className={styles.alertList}>
          {warnings.map(warning => (
            <AlertBanner key={warning.id} warning={warning} />
          ))}
        </div>
      )}
    </div>
  )
}
