import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Security from './Security.tsx'

const root = createRoot(document.getElementById('root')!)
const isSecurity = window.location.pathname.replace(/\/$/, '') === '/security'
const AppOrSecurity = isSecurity ? <Security /> : <App />
if (import.meta.env.DEV) {
  root.render(AppOrSecurity)
} else {
  const { StrictMode } = await import('react')
  root.render(
    <StrictMode>
      {AppOrSecurity}
    </StrictMode>
  )
}
