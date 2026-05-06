import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'
import { StoreProvider } from './store/StoreContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
      <Toaster position="top-center" />
    </StoreProvider>
  </StrictMode>,
)
