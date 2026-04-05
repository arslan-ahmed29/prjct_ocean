// ─────────────────────────────────────────────────────────────────────────────
// src/components/weather/WaveConditions.tsx
//
// Shows estimated wave height, swell direction, and a simple wave icon.
// Includes a text description of swimming suitability.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './WaveConditions.module.css'

interface WaveConditionsProps {
  waveHeightM: number     // Estimated wave height in metres
  swellDirection: string  // Direction waves are arriving from, e.g. "NW"
}

// Human-readable swimming suitability based on wave height
function waveDescription(h: number): { label: string; color: string } {
  if (h < 0.5) return { label: 'Glassy — ideal for swimming', color: '#4caf50' }
  if (h < 1.0) return { label: 'Gentle — good for all swimmers', color: '#8bc34a' }
  if (h < 1.5) return { label: 'Moderate — confident swimmers', color: '#ffc107' }
  if (h < 2.5) return { label: 'Rough — strong swimmers only', color: '#ff9800' }
  return { label: 'Dangerous — no swimming advised', color: '#f44336' }
}

export function WaveConditions({ waveHeightM, swellDirection }: WaveConditionsProps) {
  const { label, color } = waveDescription(waveHeightM)

  return (
    <div className={styles.container}>
      {/* Wave SVG icon */}
      <svg width="36" height="24" viewBox="0 0 36 24" aria-hidden="true" className={styles.icon}>
        <path
          d="M0,14 Q4,6 8,14 Q12,22 16,14 Q20,6 24,14 Q28,22 32,14 Q34,10 36,14"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0,20 Q4,12 8,20 Q12,28 16,20 Q20,12 24,20 Q28,28 32,20 Q34,16 36,20"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Wave details */}
      <div className={styles.details}>
        <div className={styles.height}>
          <span className={styles.heightValue}>{waveHeightM.toFixed(1)}</span>
          <span className={styles.heightUnit}> m</span>
          <span className={styles.swell}> · {swellDirection} swell</span>
        </div>
        {/* Color-coded suitability label */}
        <div className={styles.suitability} style={{ color }}>
          {label}
        </div>
      </div>
    </div>
  )
}
