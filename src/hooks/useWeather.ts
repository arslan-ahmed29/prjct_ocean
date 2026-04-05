// ─────────────────────────────────────────────────────────────────────────────
// src/hooks/useWeather.ts
//
// A React "hook" — a reusable piece of logic that components can call.
// This hook fetches weather data and re-fetches it every 10 minutes automatically.
//
// It returns three things:
//   - data:    the WeatherData object (or null while loading)
//   - loading: true while waiting for the first fetch to complete
//   - error:   an error message string if something went wrong, or null
//
// Usage in a component:
//   const { data, loading, error } = useWeather()
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { WeatherData } from '../types'
import { fetchWeather } from '../services/weatherService'
import { WEATHER_REFRESH_MS } from '../config/constants'

// Define what shape this hook returns so TypeScript can check callers
interface UseWeatherResult {
  data: WeatherData | null    // null means "not loaded yet"
  loading: boolean
  error: string | null        // null means "no error"
}

export function useWeather(): UseWeatherResult {
  // useState creates a piece of state — a variable React tracks and re-renders when it changes
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)    // Start as loading=true (we haven't fetched yet)
  const [error, setError] = useState<string | null>(null)

  // useEffect runs code after the component renders. The empty [] at the end means
  // "only run this once when the component first mounts" (not on every re-render).
  // It's the right place for "set up a timer / fetch data" logic.
  useEffect(() => {
    // Define the fetch function separately so we can call it immediately AND on a timer
    async function load() {
      try {
        setError(null)          // Clear any previous error before retrying
        const result = await fetchWeather()
        setData(result)         // Store the fetched data — this triggers a re-render
      } catch (err) {
        // If fetch throws (network error, bad API key, etc.), store the error message
        setError(err instanceof Error ? err.message : 'Failed to load weather')
      } finally {
        // Whether it succeeded or failed, we're no longer loading
        setLoading(false)
      }
    }

    // Fetch immediately on mount
    load()

    // Then set up an automatic refresh every 10 minutes
    // setInterval is like an alarm clock — it calls load() repeatedly on a schedule
    const interval = setInterval(load, WEATHER_REFRESH_MS)

    // Cleanup: when the component is removed from the page, cancel the timer
    // (otherwise it would keep firing even after the component is gone — a memory leak)
    return () => clearInterval(interval)
  }, []) // The [] means "no dependencies" — only run on mount/unmount

  return { data, loading, error }
}
