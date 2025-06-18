import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiUser, FiScissors } from "react-icons/fi";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-4 border-b text-sm">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl"><FiScissors></FiScissors></span> Peluquería César Farra
        </h1>
        <div className="flex flex-wrap gap-2 justify-end items-center">
          <Link
            to="/login"
            className="text-sm hover:underline whitespace-nowrap"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="text-sm bg-black text-white px-4 py-2 rounded hover:opacity-90 whitespace-nowrap"
          >
            Registrarse
          </Link>
        </div>
      </header>

      
      <main className="flex flex-col lg:flex-row flex-1 p-4 sm:p-8 lg:p-16 bg-gradient-to-br from-white to-gray-100 gap-8">
     
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900 text-center lg:text-left">
            Reserva tu Próximo corte con facilidad
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            Agenda tus turnos fácilmente por WhatsApp y recibí confirmaciones
            automáticas. Así evitás olvidos, reducís cancelaciones y mejorás tu
            experiencia con cada visita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="https://wa.me/5493518029293?text=Hola%2C%20quiero%20reservar%20un%20turno"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-3 rounded text-sm font-medium hover:opacity-90 text-center"
            >
              Reservar Ahora
            </a>

            <Link
              to="/about"
              className="border border-gray-300 px-6 py-3 rounded text-sm font-medium hover:bg-gray-100 text-center"
            >
              Saber Más
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:ml-12">
          <Feature
            icon={<FiCalendar size={28} />}
            title="Reserva Fácil"
            desc="Reserva Turnos en cualquier momento"
          />
          <Feature
            icon={<FiClock size={28} />}
            title="Recordatorios"
            desc="Recibe confirmaciones automáticas por Correo electrónico"
          />
          <Feature
            icon={<FiUser size={28} />}
            title="Perfil Personal"
            desc="Gestiona tus Turnos e información personal"
          />
          <Feature
            icon={<FiScissors size={28} />}
            title="Programa de Fidelidad"
            desc="Gana descuentos después de múltiples visitas"
          />
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
    <div className="w-full sm:w-[250px] bg-white p-4 rounded-lg shadow-sm text-center border transition-all duration-200 hover:shadow-lg hover:border-black hover:scale-[1.02] mx-auto">
      <div className="flex justify-center mb-2 text-gray-700">{icon}</div>
      <h3 className="font-semibold text-base">{title}</h3>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  );
}
