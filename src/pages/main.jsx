import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/App.css'
import App from './App.jsx'
import { AuthProvider } from '../context/AuthContext'
import { BrowserRouter } from 'react-router-dom'

import { AppDataProvider } from '../context/AppDataContext'
createRoot(document.getElementById('root')).render(
 <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppDataProvider>
          <App />
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
