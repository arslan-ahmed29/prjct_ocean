// vite.config.ts
// Vite is our "build tool" — it turns our React/TypeScript code into
// plain HTML+JS that browsers can actually run. Think of it like
// a compiler/bundler that also gives us a live preview server.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // The react plugin lets Vite understand JSX (the HTML-like syntax in React files)
  plugins: [react()],
})
