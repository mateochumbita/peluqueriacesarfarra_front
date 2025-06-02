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
import AdminRoute from '../components/auth/AdminRoute'

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
          <AdminRoute>
            <Suspense fallback={<div>Cargando dashboard...</div>}>
              <Dashboard />
            </Suspense>
          </AdminRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <AdminRoute>
            <Calendar />
          </AdminRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <AdminRoute>
            <Appointments />
          </AdminRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <AdminRoute>
            <Clients />
          </AdminRoute>
        }
      />

          <Route
        path="/profile/:id"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />

      
       
      
      <Route
        path="/services"
        element={
          <AdminRoute>
            <Services />
          </AdminRoute>
        }
      />
      <Route
        path="/hairdressers"
        element={
          <AdminRoute>
            <Hairdressers />
          </AdminRoute>
        }
      />

      <Route
        path="/stats"
        element={
          <AdminRoute>
            <Stats />
          </AdminRoute>
        }
      />
      {/* Add more routes as needed */}
    </Routes>
  )
}
