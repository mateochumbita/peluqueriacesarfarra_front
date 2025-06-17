import { useEffect, useState } from "react";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import { useAppData } from "../../context/AppDataContext";
import AppointmentForm from "../../components/appointments/AppointmentForm";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    appointmentsStats,
    fetchAppointmentsStats,
    fetchEarningsStats,
    earningsStats,
    fetchClientsStats,
    clientsStats,
    fetchAppointmentsDays,
    appointmentsDays,
  } = useAppData();


  // traer appointmentStats y earningsStats
  useEffect(() => {
    if (!appointmentsStats) {
      fetchAppointmentsStats();
    }
    if (!earningsStats) {
      fetchEarningsStats();
    }
    if (!clientsStats) {
      fetchClientsStats();
    }
    if (!appointmentsDays) {
      fetchAppointmentsDays();
    }
  }, [
    fetchAppointmentsStats,
    appointmentsStats,
    fetchEarningsStats,
    earningsStats,
    fetchClientsStats,
    clientsStats,
    fetchAppointmentsDays,
    appointmentsDays,
  ]);

//obtener nombre del usuario del localstorage
  const nombre = localStorage.getItem("nombreUsuario");

  const isLoading = !appointmentsStats || !earningsStats || !clientsStats;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos del panel...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold">Panel Principal</h1>
            <p className="text-gray-600 text-sm">
              Bienvenido de nuevo, {nombre}. Aquí está el resumen de tu negocio.
            </p>
          </div>
         <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:opacity-90 text-sm whitespace-nowrap"
          >
            <span className="sm:hidden text-lg">＋</span>
            <span className="hidden sm:inline">+ Nueva Cita</span>
          </button>
        </header>


           <AppointmentForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            // setEditingAppointment(null); // limpiar al cerrar
          }}
          // editingAppointment={editingAppointment}
        />

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Turnos Hoy</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div className="text-2xl font-bold">
              {appointmentsStats?.turnos.hoy}
            </div>
            <div className="text-xs text-green-600">
              Tasa de Ocupación hoy {appointmentsStats?.tasaOcupacion.hoy}%
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Ingresos Hoy</span>
              <span className="text-gray-400">$</span>
            </div>
            <div className="text-2xl font-bold">
              {earningsStats?.ingresos.hoy}
            </div>
            <div className="text-xs text-green-600">
              Promedio diario: {earningsStats?.ingresos.promedioDiario}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">
                Clientes Totales Mes
              </span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="text-2xl font-bold">
              {clientsStats?.clientes.mes}
            </div>
            <div className="text-xs text-green-600">
              +{clientsStats?.clientes.semana} esta semana
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">
                Tasa de Ocupación este Mes
              </span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M3 17l6-6 4 4 8-8" />
              </svg>
            </div>
            <div className="text-2xl font-bold">
              {appointmentsStats?.tasaOcupacion.mes}
            </div>
            <div className="text-xs text-green-600">
              +{appointmentsStats?.tasaOcupacion.variacionMes} con respecto al
              mes anterior
            </div>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row gap-4 px-8 pb-8">
          {/* Próximos Turnos */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg border p-4">
            <h2 className="font-bold text-xl mb-2">Próximos Turnos</h2>
            <p className="text-gray-600 text-sm mb-4">
              Tienes {appointmentsDays?.length} turnos programados para
              hoy.
            </p>
            <ul className="space-y-3">
              {appointmentsDays && appointmentsDays.length > 0 ? (
                appointmentsDays.slice(0, 3).map((turno) => (
                  <li
                    key={turno.Id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium">
                        {turno.Cliente?.Nombre}
                      </span>
                      <div className="text-xs text-gray-500">
                        {turno.HairdresserService?.Service?.Nombre}
                      </div>
                    </div>
                    <span className="bg-gray-100 px-3 py-1 rounded text-xs font-semibold">
                      {turno.Hora?.slice(0, 5)} hs
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">
                  No hay turnos para hoy.
                </li>
              )}
            </ul>
          </div>

          <div className="w-full lg:w-1/3 bg-white rounded-lg border p-4 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-xl mb-2">Cancelaciones Hoy</h2>
              <p className="text-gray-600 text-sm mb-4">
                Se registraron {appointmentsStats?.cancelaciones?.hoy ?? 0}{" "}
                cancelaciones hoy.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-red-500">
                {appointmentsStats?.cancelaciones?.hoy ?? 0}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Mantente al tanto para reducir ausencias.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
