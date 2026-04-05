/// <reference types="vite/client" />
// ─────────────────────────────────────────────────────────────────────────────
// src/vite-env.d.ts
//
// This file is automatically created by Vite. It tells TypeScript about
// two things that Vite provides:
//
//   1. import.meta.env — Vite exposes environment variables (from .env files)
//      on this object. Without this declaration TypeScript doesn't know it exists.
//
//   2. CSS Modules (*.module.css) — when you import a CSS file as:
//         import styles from './Foo.module.css'
//      TypeScript normally doesn't know what type "styles" is.
//      The declaration below tells it: "treat it as an object where any
//      property name returns a string (the generated CSS class name)."
// ─────────────────────────────────────────────────────────────────────────────

// Teach TypeScript that importing *.module.css gives you a styles object
declare module '*.module.css' {
  // { [key: string]: string } means: any string key → string value
  // e.g. styles.card → "card_abc123" (Vite generates unique class names)
  const classes: { [key: string]: string }
  export default classes
}
