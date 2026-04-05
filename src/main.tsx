// ─────────────────────────────────────────────────────────────────────────────
// src/main.tsx
//
// The entry point of the app — the very first file that runs.
// Its only job is to find the <div id="root"> in index.html and mount
// our React app inside it.
//
// StrictMode is a React development tool that runs extra checks and
// highlights potential problems in the console. It has no effect in production.
// ─────────────────────────────────────────────────────────────────────────────

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Find the root element in index.html
// The "!" tells TypeScript we're sure this element exists (won't be null)
const rootElement = document.getElementById('root')!

// Mount the React app inside it
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
