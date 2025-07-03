// src/routes/Router.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import { lazy, Suspense } from "react";
import Calendar from "../pages/calendar/Calendar";
import Appointments from "../pages/appointments/Appointments";
import Clients from "../pages/clients/Clients";
import Services from "../pages/services/Services";
import Stats from "../pages/stats/Stats";
import Hairdressers from "../pages/hairdressers/Hairdressers";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import Profile from "../pages/client/profile/Profile";
import AdminRoute from "../components/auth/AdminRoute";

import About from "../pages/about/About";
import Profiles from "../pages/profiles/Profiles";
import ClientHome from "../pages/client/ClientHome";
import History from "../pages/client/HIstory";
import ClientCalendar from "../pages/client/ClientCalendar";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

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
      <Route path="/about" element={<About />} />
      <Route
        path="/calendar"
        element={
         <AdminRoute>
            <Calendar />
           </AdminRoute>
        }
      />



        <Route
        path="/clientcalendar"
        element={
         
            <ClientCalendar />
       
        }
      />



       <Route
        path="/history"
        element={
         
            <History />
        
        }
      />


      <Route
        path="/home"
        element={
         
            <ClientHome />
        
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
        path="/profiles"
        element={
          <AdminRoute>
            <Profiles />
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
      
    </Routes>
  );
}
