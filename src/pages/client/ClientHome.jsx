import { useState, useEffect } from "react";
import Menu from "../../components/client/nav/Menu"; // Usa el menú exclusivo del cliente
import Navbar from "../../components/nav/Navbar";
import { useAppData } from "../../context/AppDataContext";
import formatDate from "../../utils/formatDate";
export default function ClientHome() {
  const [nombre, setNombre] = useState("");

  const puntos = localStorage.getItem("puntosFidelidad") || 0;

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    if (nombreGuardado) {
      setNombre(nombreGuardado);
    }
  }, []);

  const { appointmentsByClientId, fetchAppointmentsByClientId } = useAppData();

  useEffect(() => {
    if (!appointmentsByClientId) {
      const clientId = localStorage.getItem("IdCliente"); // Reemplazar con ID dinámico si se desea
      fetchAppointmentsByClientId(clientId);
    }
  }, [appointmentsByClientId, fetchAppointmentsByClientId]);

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
            {appointmentsByClientId &&
            appointmentsByClientId.some((a) => a.Estado === "Reservado") ? (
              (() => {
                const proximoTurno = appointmentsByClientId
                  .filter((a) => a.Estado === "Reservado")
                  .sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha))[0];

                return (
                  <div className="mt-2 text-sm text-gray-600">
                    <p className="font-medium">
                      {proximoTurno.desc?.Servicio || "Servicio"}
                    </p>
                    <p>
                      {formatDate(proximoTurno.Fecha)} -{" "}
                      {proximoTurno.Hora.slice(0, 5)} hs
                    </p>
                  </div>
                );
              })()
            ) : (
              <p className="text-gray-500 text-sm">
                No hay turnos reservados próximos.
              </p>
            )}
          </div>
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-800">Historial</h2>
            {appointmentsByClientId && appointmentsByClientId.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {appointmentsByClientId
                  .sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha))
                  .slice(0, 3)
                  .map((turno) => (
                    <li key={turno.Id} className="text-gray-600 text-sm">
                      <p className="font-medium">
                        {turno.desc?.Servicio || "Servicio"}
                      </p>
                      <p>
                        {formatDate(turno.Fecha)} - {turno.Hora}
                      </p>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No hay turnos recientes.</p>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Puntos de fidelidad
            </h2>
            <p className="text-gray-500 text-sm">Puntos Obtenidos: {puntos}</p>
          </div>
        </section>

        {/* Sección inferior futura */}
        {/* <section className="p-8 pt-0">
          <div className="bg-white rounded-lg p-6 border">
            <h3 className="text-xl font-semibold mb-2">Novedades</h3>
            <p className="text-gray-500 text-sm">
              Aquí podrías mostrar promociones, cambios de horarios o mensajes del salón.
            </p>
          </div>
        </section> */}
      </div>
    </div>
  );
}
