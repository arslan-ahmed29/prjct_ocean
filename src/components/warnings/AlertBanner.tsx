// ─────────────────────────────────────────────────────────────────────────────
// src/components/warnings/AlertBanner.tsx
//
// A single alert row with a coloured left border, icon, title, and description.
// Can be dismissed (closed) by clicking the ✕ button — the dismissed state
// is tracked inside this component using useState.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import styles from './AlertBanner.module.css'
import { Warning, WarningSeverity } from '../../types'
import { SeverityIcon } from './SeverityIcon'

interface AlertBannerProps {
  warning: Warning
}

// Left-border and background color for each severity level
const SEVERITY_STYLE: Record<WarningSeverity, { border: string; bg: string }> = {
  info: {
    border: '#64b5f6',
    bg: 'rgba(100, 181, 246, 0.1)',
  },
  advisory: {
    border: '#ffd54f',
    bg: 'rgba(255, 213, 79, 0.1)',
  },
  warning: {
    border: '#ff8a65',
    bg: 'rgba(255, 138, 101, 0.1)',
  },
  danger: {
    border: '#ef5350',
    bg: 'rgba(239, 83, 80, 0.15)',
  },
}

export function AlertBanner({ warning }: AlertBannerProps) {
  // Track whether this alert has been dismissed by the user
  const [dismissed, setDismissed] = useState(false)

  // If the user dismissed this alert, render nothing
  if (dismissed) return null

  const style = SEVERITY_STYLE[warning.severity]

  return (
    <div
      className={styles.banner}
      style={{
        borderLeftColor: style.border,
        background: style.bg,
      }}
      role="alert"
    >
      {/* Severity icon on the left */}
      <div className={styles.icon}>
        <SeverityIcon severity={warning.severity} size={20} />
      </div>

      {/* Text content: title + description */}
      <div className={styles.content}>
        <div className={styles.title}>{warning.title}</div>
        <div className={styles.description}>{warning.description}</div>
      </div>

      {/* Dismiss button in the top-right corner */}
      <button
        className={styles.dismiss}
        onClick={() => setDismissed(true)}
        aria-label={`Dismiss: ${warning.title}`}
        title="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}
