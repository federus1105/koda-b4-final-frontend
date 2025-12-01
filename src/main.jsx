import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
