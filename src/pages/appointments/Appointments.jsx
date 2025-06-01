import { useEffect, useState } from "react";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import { FiCalendar, FiClock, FiMoreHorizontal, FiUser } from "react-icons/fi";
import { useAppData } from "../../context/AppDataContext";

export default function Appointments() {
  const { appointments, clients, services, hairdressersServices, fetchAppointments, fetchClients, fetchServices, fetchHairdressersServices } = useAppData();
  const [view, setView] = useState("tabla");


   useEffect(() => {
        if (!clients) {
          fetchClients();
        }
        if (!services) {
          fetchServices();
        }
        if (!appointments) {
          fetchAppointments();
         
        }
        if (!hairdressersServices) {
          fetchHairdressersServices();}
      }, [clients, services, appointments, hairdressersServices, fetchClients, fetchServices, fetchAppointments, fetchHairdressersServices]);

  // Loading solo si los datos aún no están cargados (null)
  const loading =
    appointments === null ||
    clients === null ||
    services === null ||
    hairdressersServices === null;

  // Función para obtener el nombre del cliente por ID
  const getClientName = (id) => {
    const cliente = clients.find((c) => c.Id === id);
    return cliente ? cliente.Nombre : "Sin datos";
  };

  // Función para obtener el nombre del servicio usando la tabla intermedia
  const getServiceName = (idHairdresserService) => {
    const rel = hairdressersServices.find(hs => hs.Id === idHairdresserService);
    if (!rel) return "Sin datos";
    const servicio = services.find(s => s.Id === rel.IdService);
    return servicio ? servicio.Nombre : "Sin datos";
  };

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
            <h1 className="text-3xl font-bold">Turnos</h1>
            <p className="text-gray-600 text-base">Gestiona todas las Turnos de tu negocio.</p>
          </div>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:opacity-90 text-sm">
            <span className="hidden sm:inline">+ Nueva Cita</span>
          </button>
        </header>

        {/* Filtros y acciones */}
        <div className="flex flex-wrap items-center gap-4 px-8 py-4">
          <input
            type="text"
            placeholder="Buscar Turnos..."
            className="border rounded px-4 py-2 text-sm w-64"
          />
          <select className="border rounded px-2 py-2 text-sm">
            <option>Todos</option>
            <option>Confirmados</option>
            <option>Pendientes</option>
            <option>Cancelados</option>
          </select>
          <div className="flex-1" />
          <button className="flex items-center gap-2 border px-4 py-2 rounded text-sm hover:bg-gray-100">
            <FiCalendar /> Hoy
          </button>
          <select className="border rounded px-2 py-2 text-sm">
            <option>Esta semana</option>
            <option>Este mes</option>
          </select>
        </div>

        {/* Tabs de vista */}
        <div className="flex gap-2 px-8 mb-4">
          <button
            className={`px-4 py-1 rounded ${view === "lista" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"}`}
            onClick={() => setView("lista")}
          >
            Lista
          </button>
          <button
            className={`px-4 py-1 rounded ${view === "tabla" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"}`}
            onClick={() => setView("tabla")}
          >
            Tabla
          </button>
        </div>

        {/* Contenido */}
        <main className="flex-1 px-8 pb-8">
          {loading ? (
            <div className="text-center text-gray-500 py-8">Cargando turnos...</div>
          ) : !appointments.length ? (
            <div className="text-center text-gray-500 py-8">No hay turnos para mostrar.</div>
          ) : view === "tabla" ? (
            <div className="bg-white rounded-lg border p-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 px-4">Cliente</th>
                    <th className="py-2 px-4">Servicio</th>
                    <th className="py-2 px-4">Fecha</th>
                    <th className="py-2 px-4">Hora</th>
                    <th className="py-2 px-4">Estado</th>
                    <th className="py-2 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.Id || a.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{getClientName(a.IdCliente)}</td>
                      <td className="py-2 px-4">{getServiceName(a.IdHairdresser_Service)}</td>
                      <td className="py-2 px-4">{a.Fecha}</td>
                      <td className="py-2 px-4">{a.Hora}</td>
                      <td className="py-2 px-4">
                        <span className="px-3 py-1 rounded-full border border-green-400 text-green-600 bg-green-50 text-xs">
                          {a.Estado}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <FiMoreHorizontal />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-4 space-y-4">
              {appointments.map((a) => (
                <div
                  key={a.Id || a.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl">
                      <FiUser size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        {getClientName(a.IdCliente)}{" "}
                        <span className="ml-2 px-2 py-1 rounded-full border border-green-400 text-green-600 bg-green-50 text-xs font-normal">
                          {a.Estado}
                        </span>
                      </div>
                      <div className="text-gray-500">{getServiceName(a.IdHairdresser_Service)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiCalendar /> {a.Fecha}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiClock /> {a.Hora}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="border px-3 py-1 rounded hover:bg-gray-100 text-sm">Reprogramar</button>
                    <button className="bg-black text-white px-3 py-1 rounded hover:opacity-90 text-sm">Completar</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Cancelar</button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <FiMoreHorizontal />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

