// ─────────────────────────────────────────────────────────────────────────────
// src/components/warnings/SeverityIcon.tsx
//
// An inline SVG icon that changes based on the warning severity.
// Using inline SVGs means zero network requests for images.
// ─────────────────────────────────────────────────────────────────────────────

import { WarningSeverity } from '../../types'

interface SeverityIconProps {
  severity: WarningSeverity
  size?: number   // Size in pixels (default 20)
}

export function SeverityIcon({ severity, size = 20 }: SeverityIconProps) {
  // Pick color based on severity
  const colors: Record<WarningSeverity, string> = {
    info: '#64b5f6',       // Blue — informational
    advisory: '#ffd54f',   // Amber — advisory
    warning: '#ff8a65',    // Orange — warning
    danger: '#ef5350',     // Red — danger
  }
  const color = colors[severity]

  // Render different icons for different severity levels
  if (severity === 'info') {
    // Circle with "i"
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
        <path d="M12 8v1M12 11v5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }

  if (severity === 'danger') {
    // Filled red circle with exclamation
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2"/>
        <path d="M12 7v6M12 16v1" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    )
  }

  // advisory + warning: triangle with exclamation (like a road warning sign)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L2 21h20L12 3z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.15"
      />
      <path d="M12 9v5M12 16v1" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
