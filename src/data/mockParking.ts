// ─────────────────────────────────────────────────────────────────────────────
// src/data/mockParking.ts
//
// Fake parking lot data with a realistic variety of situations:
// some lots almost full, one closed, one free street parking.
// In a real app this would come from a city/sensor API.
// ─────────────────────────────────────────────────────────────────────────────

import { ParkingLot } from '../types'

export const mockParking: ParkingLot[] = [
  {
    id: 'north-lot',
    name: 'North Beach Lot',
    totalSpaces: 240,
    availableSpaces: 38,        // Only 38 of 240 left — getting full (about 16% free)
    status: 'open',
    distanceFromBeachM: 80,     // Very close — just an 80m walk to the sand
    hourlyRate: 3.50,
    isFree: false,
  },
  {
    id: 'south-lot',
    name: 'South Beach Lot',
    totalSpaces: 180,
    availableSpaces: 91,        // About half full — decent availability (51% free)
    status: 'open',
    distanceFromBeachM: 120,
    hourlyRate: 3.50,
    isFree: false,
  },
  {
    id: 'pier-garage',
    name: 'Pier Parking Garage',
    totalSpaces: 1100,
    availableSpaces: 423,       // Multi-storey garage — plenty of room (38% free)
    status: 'open',
    distanceFromBeachM: 200,    // 200m walk, but lots of spaces
    hourlyRate: 5.00,
    isFree: false,
  },
  {
    id: 'overflow-lot',
    name: 'Overflow Lot B',
    totalSpaces: 90,
    availableSpaces: 0,         // Completely full
    status: 'full',
    distanceFromBeachM: 350,
    hourlyRate: 2.00,
    isFree: false,
  },
  {
    id: 'street-parking',
    name: 'Street Parking (Ocean Ave)',
    totalSpaces: 60,
    availableSpaces: 7,         // Almost none left on the street
    status: 'open',
    distanceFromBeachM: 50,     // Right across from the beach!
    hourlyRate: 0,
    isFree: true,               // Free but very competitive — arrives early
  },
]
