// ─────────────────────────────────────────────────────────────────────────────
// src/data/mockParking.ts
//
// Wrightsville Beach, NC public parking lots.
// Wrightsville has metered town lots along Lumina Ave and near the pier —
// parking fills up fast on summer weekends!
// ─────────────────────────────────────────────────────────────────────────────

import { ParkingLot } from '../types'

export const mockParking: ParkingLot[] = [
  {
    id: 'lot-a',
    name: "Lot A — Johnnie Mercer's Pier",
    totalSpaces: 98,
    availableSpaces: 11,        // Nearly full — popular pier lot
    status: 'open',
    distanceFromBeachM: 60,     // Right next to the pier
    hourlyRate: 3.00,
    isFree: false,
  },
  {
    id: 'lot-b',
    name: 'Lot B — Lumina Ave Central',
    totalSpaces: 145,
    availableSpaces: 52,        // About 36% free — still some room
    status: 'open',
    distanceFromBeachM: 90,
    hourlyRate: 3.00,
    isFree: false,
  },
  {
    id: 'lot-c',
    name: 'Lot C — South Lumina Ave',
    totalSpaces: 120,
    availableSpaces: 0,         // Completely full
    status: 'full',
    distanceFromBeachM: 110,
    hourlyRate: 3.00,
    isFree: false,
  },
  {
    id: 'causeway-lot',
    name: 'Causeway Park & Ride',
    totalSpaces: 280,
    availableSpaces: 134,       // Overflow lot on Harbor Island — usually has space
    status: 'open',
    distanceFromBeachM: 800,    // Farther out but free — shuttle runs in summer
    hourlyRate: 0,
    isFree: true,
  },
  {
    id: 'waynick-street',
    name: 'Waynick Blvd Street Parking',
    totalSpaces: 40,
    availableSpaces: 3,         // Almost gone — right on the water
    status: 'open',
    distanceFromBeachM: 30,     // Steps from the beach
    hourlyRate: 0,
    isFree: true,
  },
]
