// ─────────────────────────────────────────────────────────────────────────────
// src/data/mockTraffic.ts
//
// Fake crowd and traffic data for a busy Saturday afternoon.
// Simulates what you'd get from a real traffic/sensor API.
// ─────────────────────────────────────────────────────────────────────────────

import { TrafficData } from '../types'

export const mockTraffic: TrafficData = {
  beachCrowdLevel: 'busy',     // The beach itself is busy but not impossible to find a spot
  crowdCount: 3800,            // Estimated 3,800 people currently on the beach

  roads: [
    {
      name: 'Pacific Coast Highway',
      direction: 'inbound',         // Heading toward the beach
      congestion: 'heavy',          // Slow going — bumper to bumper in spots
      estimatedDelayMin: 22,        // Expect ~22 extra minutes compared to normal
    },
    {
      name: 'Pacific Coast Highway',
      direction: 'outbound',        // Heading away from the beach
      congestion: 'moderate',       // Moving, but slower than usual
      estimatedDelayMin: 10,
    },
    {
      name: 'Lincoln Boulevard',
      direction: 'inbound',
      congestion: 'moderate',
      estimatedDelayMin: 12,
    },
    {
      name: 'Lincoln Boulevard',
      direction: 'outbound',
      congestion: 'low',            // Flowing freely outbound
      estimatedDelayMin: 2,
    },
  ],

  timestamp: Date.now(),
  isMock: true,                     // Flag so the UI can show a "Demo data" badge
}
