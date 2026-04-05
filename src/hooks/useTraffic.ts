// ─────────────────────────────────────────────────────────────────────────────
// src/hooks/useTraffic.ts
//
// Returns crowd and traffic data. Same pattern as useParking —
// mock data now, real API later by only editing this one file.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { TrafficData } from '../types'
import { mockTraffic } from '../data/mockTraffic'

interface UseTrafficResult {
  data: TrafficData | null
  loading: boolean
}

export function useTraffic(): UseTrafficResult {
  const [data, setData] = useState<TrafficData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate network delay (300ms feels snappy but shows the skeleton state)
    const timer = setTimeout(() => {
      setData(mockTraffic)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return { data, loading }
}
