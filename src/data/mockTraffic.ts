// ─────────────────────────────────────────────────────────────────────────────
// src/data/mockTraffic.ts
//
// Wrightsville Beach, NC traffic — busy Saturday afternoon in July.
// The Causeway (US-74/76) is the only road on/off the island, so it gets
// seriously backed up on summer weekends. Banks Channel bridge also helps
// but can bottleneck.
// ─────────────────────────────────────────────────────────────────────────────

import { TrafficData } from '../types'

export const mockTraffic: TrafficData = {
  beachCrowdLevel: 'busy',     // Busy but not impossible to find a spot on the sand
  crowdCount: 4200,            // Estimated people on the beach — typical busy summer day

  roads: [
    {
      name: 'Causeway Dr (US-74/76)',
      direction: 'inbound',         // Heading onto the island
      congestion: 'heavy',          // The causeway backs up hard in summer
      estimatedDelayMin: 28,        // Expect nearly 30 extra minutes coming in
    },
    {
      name: 'Causeway Dr (US-74/76)',
      direction: 'outbound',        // Heading off the island
      congestion: 'moderate',       // Outbound is always a bit better
      estimatedDelayMin: 12,
    },
    {
      name: 'Lumina Avenue',
      direction: 'both',            // Main road running along the beach
      congestion: 'heavy',          // Gridlocked near the pier area
      estimatedDelayMin: 18,
    },
    {
      name: 'Eastwood Rd / US-74',
      direction: 'inbound',         // Approach from Wilmington
      congestion: 'moderate',
      estimatedDelayMin: 10,
    },
  ],

  timestamp: Date.now(),
  isMock: true,
}
