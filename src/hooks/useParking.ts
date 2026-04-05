// ─────────────────────────────────────────────────────────────────────────────
// src/hooks/useParking.ts
//
// Returns the list of parking lots. Currently uses mock data,
// but structured the same way as useWeather so you could swap in
// a real parking API later without touching any component code —
// just update this file.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { ParkingLot } from '../types'
import { mockParking } from '../data/mockParking'

interface UseParkingResult {
  data: ParkingLot[]
  loading: boolean
}

export function useParking(): UseParkingResult {
  const [data, setData] = useState<ParkingLot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate a brief network delay so the UI shows a loading state
    // (In production you'd call a real parking sensor API here)
    const timer = setTimeout(() => {
      setData(mockParking)
      setLoading(false)
    }, 400)

    // Cleanup: cancel the timer if the component unmounts before it fires
    return () => clearTimeout(timer)
  }, [])

  return { data, loading }
}
