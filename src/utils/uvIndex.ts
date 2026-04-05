// ─────────────────────────────────────────────────────────────────────────────
// src/utils/uvIndex.ts
//
// Helpers for turning a numeric UV index (0–11+) into a human-readable label
// and a color that matches the standard WHO UV color scale.
// ─────────────────────────────────────────────────────────────────────────────

// UV risk level label based on WHO guidelines
export function uvLabel(uv: number): string {
  if (uv <= 2)  return 'Low'
  if (uv <= 5)  return 'Moderate'
  if (uv <= 7)  return 'High'
  if (uv <= 10) return 'Very High'
  return 'Extreme'
}

// CSS color for the UV badge — matches the WHO color scale (green → purple)
export function uvColor(uv: number): string {
  if (uv <= 2)  return '#4caf50'   // Green for low risk
  if (uv <= 5)  return '#ffeb3b'   // Yellow for moderate
  if (uv <= 7)  return '#ff9800'   // Orange for high
  if (uv <= 10) return '#f44336'   // Red for very high
  return '#9c27b0'                 // Purple for extreme
}

// Text color for contrast on the badge background (dark text on light badges)
export function uvTextColor(uv: number): string {
  if (uv <= 5) return '#333333'    // Dark text on green/yellow backgrounds
  return '#ffffff'                 // White text on orange/red/purple backgrounds
}

// Sunscreen recommendation message based on UV level
export function uvAdvice(uv: number): string {
  if (uv <= 2)  return 'No protection needed'
  if (uv <= 5)  return 'SPF 30+ recommended'
  if (uv <= 7)  return 'SPF 50+ required — seek shade midday'
  if (uv <= 10) return 'Minimize sun exposure 10am–4pm'
  return 'Avoid outdoor exposure — extreme burn risk'
}
