import React, { useEffect } from "react";
import { useAppData } from "../../context/AppDataContext";
import Menu from "../../components/client/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import { FiCalendar, FiClock, FiUser, FiScissors, FiTag } from "react-icons/fi";

const History = () => {
  const { appointmentsByClientId, fetchAppointmentsByClientId } = useAppData();

  useEffect(() => {
    if (!appointmentsByClientId) {
      const clientId = 18; // Reemplazar con ID dinámico si se desea
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
            <h1 className="text-3xl font-bold">Historial de Turnos</h1>
            <p className="text-gray-600 text-base">
              Revisa los turnos que has reservado.
            </p>
          </div>
        </header>

        {/* Lista de Turnos */}
        <main className="flex-1 px-8 pb-8">
          {appointmentsByClientId?.length > 0 ? (
            <div className="space-y-6 mt-6">
              {appointmentsByClientId
                .sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha))
                .map((appointment) => (
                  <div
                    key={appointment.Id}
                    className="bg-white rounded-lg border p-6 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-2">
                        {appointment.desc?.Servicio || "Servicio"}
                      </h2>
                      <p className="text-gray-600 mb-1 flex items-center gap-2">
                        <FiUser className="text-gray-500" />{" "}
                        {appointment.desc?.Peluquero || "Peluquero"}
                      </p>
                      <p className="text-gray-600 mb-1 flex items-center gap-2">
                        <FiCalendar className="text-gray-500" /> {appointment.Fecha}
                      </p>
                      <p className="text-gray-600 mb-1 flex items-center gap-2">
                        <FiClock className="text-gray-500" /> {appointment.Hora}
                      </p>
                      <p className="text-gray-600 mb-1 flex items-center gap-2">
                        <FiTag className="text-gray-500" /> Estado:{" "}
                        <span className="font-medium">{appointment.Estado}</span>
                      </p>
                      {appointment.desc?.DescripcionServicio && (
                        <p className="text-sm text-gray-500 mt-2">
                          {appointment.desc.DescripcionServicio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              No hay turnos para mostrar.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default History;
