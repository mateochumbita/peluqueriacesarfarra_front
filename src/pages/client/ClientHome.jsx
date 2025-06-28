import { useState, useEffect } from "react";
import Menu from "../../components/client/nav/Menu"; // Usa el menú exclusivo del cliente
import Navbar from "../../components/nav/Navbar";

export default function ClientHome() {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    if (nombreGuardado) {
      setNombre(nombreGuardado);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Menu />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
          <div>
            <h1 className="text-2xl font-bold">Inicio</h1>
            <p className="text-gray-600 text-sm">
              Bienvenido de vuelta, {nombre}. Aquí puedes ver tu actividad.
            </p>
          </div>
        </header>

        {/* Cards de resumen */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Próximo turno
            </h2>
            <p className="text-gray-500 text-sm">Pendiente de implementación...</p>
          </div>

          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-800">Historial</h2>
            <p className="text-gray-500 text-sm">Pendiente de implementación...</p>
          </div>

          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-800">Puntos de fidelidad</h2>
            <p className="text-gray-500 text-sm">Pendiente de implementación...</p>
          </div>
        </section>

        {/* Sección inferior futura */}
        <section className="p-8 pt-0">
          <div className="bg-white rounded-lg p-6 border">
            <h3 className="text-xl font-semibold mb-2">Novedades</h3>
            <p className="text-gray-500 text-sm">
              Aquí podrías mostrar promociones, cambios de horarios o mensajes del salón.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
