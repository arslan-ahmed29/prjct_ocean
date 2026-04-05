import { StrictMode, Component, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Simple error boundary — catches any crash in the app and shows a message
// instead of a blank white page. Helpful for diagnosing production issues.
class ErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null }
  static getDerivedStateFromError(e: Error) { return { error: e.message } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#fff',
          background: '#0a2342', minHeight: '100vh' }}>
          <h2>🌊 App failed to load</h2>
          <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>{this.state.error}</p>
        </div>
      )
    }
    return this.props.children
  }
}

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
