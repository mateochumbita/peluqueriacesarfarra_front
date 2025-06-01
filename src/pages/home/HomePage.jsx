// src/pages/home/HomePage.jsx
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiUser, FiScissors } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
    
     
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b text-sm">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">✂️</span> Peluquería César Farra
        </h1>
        <div className="space-x-2">
          <Link to="/login" className="hover:underline">Iniciar Sesión</Link>
          <Link to="/register" className="bg-black text-white px-4 py-2 rounded hover:opacity-90">Registrarse</Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col md:flex-row flex-1 p-6 md:p-16 bg-gradient-to-br from-white to-gray-100">
        {/* Left */}
        <div className="flex-1 space-y-6 md:pr-12">
          <h2 className="text-5xl font-bold leading-tight text-gray-900">
            Reserva tu Próximo corte con facilidad
          </h2>
          <p className="text-lg text-gray-600 max-w-xl">
           Agenda tus turnos fácilmente por WhatsApp y recibí recordatorios automáticos.
Así evitás olvidos, reducís cancelaciones y mejorás tu experiencia con cada visita.
          </p>
          <div className="flex gap-4 mt-4">
            <Link to="/appointments" className="bg-black text-white px-6 py-3 rounded text-sm font-medium hover:opacity-90">Reservar Ahora</Link>
            <Link to="/about" className="border border-gray-300 px-6 py-3 rounded text-sm font-medium hover:bg-gray-100">Saber Más</Link>
          </div>
        </div>

        {/* Right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 md:mt-0 md:ml-12">
          <Feature icon={<FiCalendar size={28} />} title="Reserva Fácil" desc="Reserva Turnos en cualquier momento según disponibilidad en tiempo real" />
          <Feature icon={<FiClock size={28} />} title="Recordatorios" desc="Recibe recordatorios automáticos por WhatsApp o SMS" />
          <Feature icon={<FiUser size={28} />} title="Perfil Personal" desc="Gestiona tus Turnos y visualiza tu historial" />
          <Feature icon={<FiScissors size={28} />} title="Programa de Fidelidad" desc="Gana descuentos después de múltiples visitas" />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 p-4 border-t">
        © 2025 Peluquería César Farra. Todos los derechos reservados.
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm text-center border transition-all duration-200 hover:shadow-lg hover:border-black hover:scale-105 min-w-[160px] max-w-[220px] mx-auto">
      <div className="flex justify-center mb-1 text-gray-700">{icon}</div>
      <h3 className="font-semibold text-base">{title}</h3>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  );
}
