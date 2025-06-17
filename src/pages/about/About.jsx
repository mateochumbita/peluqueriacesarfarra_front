import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">✂️</span>
            <h1 className="font-bold text-lg sm:text-xl">
              Peluquería César <br className="sm:hidden" /> Farra
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/login" className="text-sm sm:text-base hover:underline">
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-black text-white px-4 py-2 rounded text-sm hover:opacity-90"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow bg-gradient-to-b from-white to-gray-100 p-6 md:p-16 flex flex-col items-center">
        <div className="max-w-3xl text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">Nuestra Historia</h2>
          <p className="text-lg text-gray-700">
            Hace ya 12 años, en el corazón del barrio Matienzo, en Córdoba, Argentina, un joven peluquero decidió dar sus primeros pasos como profesional independiente. Con una pasión innata por el estilo, el detalle y la atención personalizada, comenzó a atender a sus primeros clientes desde su propia casa, con una simple silla, un espejo y muchas ganas.
          </p>
          <p className="text-lg text-gray-700">
            Lo que empezó como un pequeño emprendimiento, con el boca en boca como única promoción, fue creciendo gracias a la confianza de sus clientes y la calidad en cada corte. Hoy, sigue atendiendo con la misma calidez de siempre, pero con nuevas herramientas para hacer más simple la experiencia de cada visita.
          </p>
          <p className="text-lg text-gray-700">
            Actualmente, los turnos se reservan fácilmente por <span className="font-semibold">WhatsApp</span>, lo que permite una comunicación directa, rápida y personalizada. Además, se envían recordatorios automáticos para que no te pierdas tu turno.
          </p>
          <p className="text-lg text-gray-700">
            En Peluquería César Farra, cada corte es una oportunidad para conectar, renovar y disfrutar de un momento para vos.
          </p>
          <a
            href="https://wa.me/5493518029293?text=Hola%2C%20quiero%20sacar%20un%20turno"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded text-sm font-medium hover:opacity-90"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Peluquería César Farra. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link to="/about" className="hover:underline">Sobre Nosotros</Link>
            <Link to="/contact" className="hover:underline">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
