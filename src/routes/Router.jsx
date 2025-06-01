// src/routes/Router.jsx
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import { lazy, Suspense } from 'react'
import Calendar from '../pages/calendar/Calendar'
import Appointments from '../pages/appointments/Appointments'
import Clients from '../pages/clients/Clients'
import Services from '../pages/services/Services'
import Stats from '../pages/stats/Stats'
import Hairdressers from '../pages/hairdressers/Hairdressers'
import ProtectedRoutes from '../components/auth/ProtectedRoutes'
import Profile from '../pages/profile/Profile'

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'))

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Suspense fallback={<div>Cargando dashboard...</div>}>
              <Dashboard />
            </Suspense>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoutes>
            <Calendar />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedRoutes>
            <Appointments />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoutes>
            <Clients />
          </ProtectedRoutes>
        }
      />

          <Route
        path="/clients/:id"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />

      
      <Route
        path="/services"
        element={
          <ProtectedRoutes>
            <Services />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/hairdressers"
        element={
          <ProtectedRoutes>
            <Hairdressers />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/stats"
        element={
          <ProtectedRoutes>
            <Stats />
          </ProtectedRoutes>
        }
      />
      {/* Add more routes as needed */}
    </Routes>
  )
}
