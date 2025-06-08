import { useEffect, useState } from "react";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import { FiCalendar, FiClock, FiMoreHorizontal, FiUser } from "react-icons/fi";
import { useAppData } from "../../context/AppDataContext";
import AppointmentForm from "../../components/appointments/AppointmentForm"; // Asegúrate de importar el formulario modal
import formatDate from "../../utils/formatDate"; // Asegúrate de tener una función para formatear fechas
import { updateAppointments } from "../../services/appointments/appointmentService";
import isInRange from "../../utils/dateRangerFilter";

export default function Appointments() {
  const {
    appointments,
    fetchAppointments,
    fetchAppointmentsStats,
    fetchEarningsStats,
  } = useAppData();

  const [estadoSeleccionado, setEstadoSeleccionado] = useState("Todos");
  const [rangoFecha, setRangoFecha] = useState("Esta semana");
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [appointmentToComplete, setAppointmentToComplete] = useState(null);
  const [completing, setCompleting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!appointments) {
      fetchAppointments();
    }
  }, [appointments, fetchAppointments]);

  const loading = appointments === null;

  const handleOpenCompleteModal = (appointment) => {
    setAppointmentToComplete(appointment);
    setShowCompleteModal(true);
  };

  const showToast = (toast) => {
    setToast(toast);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleCloseCompleteModal = () => {
    setAppointmentToComplete(null);
    setShowCompleteModal(false);
  };

  const handleConfirmComplete = async () => {
    if (!appointmentToComplete) return;
    try {
      setCompleting(true);
      await updateAppointments(appointmentToComplete.Id, { Estado: "Pagado" });
      await fetchEarningsStats();
      showToast({ type: "success", message: "Turno pagado exitosamente" });
      setCompleting(false);
      setShowCompleteModal(false);
      setAppointmentToComplete(null);
      fetchAppointments();
    } catch (error) {
      console.error("Error al completar el turno:", error);
      setCompleting(false);
    }
  };

  const handleOpenCancelModal = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setAppointmentToCancel(null);
    setShowCancelModal(false);
  };

  const handleConfirmCancel = async () => {
    if (!appointmentToCancel) return;
    try {
      setCancelling(true);
      await updateAppointments(appointmentToCancel.Id, { Estado: "Cancelado" });
      await fetchAppointmentsStats();
      showToast({ type: "success", message: "Turno cancelado exitosamente" });
      setCancelling(false);
      setShowCancelModal(false);
      setAppointmentToCancel(null);
      fetchAppointments();
    } catch (error) {
      console.error("Error al cancelar el turno:", error);
      setCancelling(false);
    }
  };

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case "Cancelado":
        return "bg-red-100 text-red-600 border-red-400";
      case "Pagado":
        return "bg-green-50 text-green-600 border-green-400";
      case "Reservado":
        return "bg-gray-100 text-gray-600 border-gray-400";
      default:
        return "bg-blue-50 text-blue-600 border-blue-400";
    }
  };
  const filteredAppointments = appointments
    ?.filter((a) =>
      estadoSeleccionado === "Todos" ? true : a.Estado === estadoSeleccionado
    )
    ?.filter((a) => isInRange(a.Fecha, rangoFecha))
    ?.filter((a) =>
      a.Cliente?.Nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSaved = async () => {
    await fetchAppointments(); // o el método que uses
    setToast({
      type: "success",
      message: editingAppointment
        ? "Turno editado exitosamente"
        : "Turno creado exitosamente",
    });
    setTimeout(() => setToast(null), 2000);
    setEditingAppointment(null); // si aplicable
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Menu />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
          <div>
            <h1 className="text-3xl font-bold">Turnos</h1>
            <p className="text-gray-600 text-base">
              Gestiona todas las Turnos de tu negocio.
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
            setEditingAppointment(null); // limpiar al cerrar
          }}
          editingAppointment={editingAppointment}
          onSaved={handleSaved}
        />

        {toast && (
          <div
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded shadow-lg transition-all
      ${
        toast.type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
          >
            {toast.message}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 px-8 py-4">
          <input
            type="text"
            placeholder="Buscar Turnos..."
            className="border rounded px-4 py-2 text-sm w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border rounded px-2 py-2 text-sm"
            value={estadoSeleccionado}
            onChange={(e) => setEstadoSeleccionado(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Pagado">Pagado</option>
            <option value="Reservado">Reservado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <div className="flex-1" />
          <button
            onClick={() => setRangoFecha("Hoy")}
            className="flex items-center gap-2 border px-4 py-2 rounded text-sm hover:bg-gray-100"
          >
            <FiCalendar /> Hoy
          </button>

          <select
            className="border rounded px-2 py-2 text-sm"
            value={rangoFecha}
            onChange={(e) => setRangoFecha(e.target.value)}
          >
            <option value="Hoy">Hoy</option>
            <option value="Esta semana">Esta semana</option>
            <option value="Este mes">Este mes</option>
          </select>
        </div>

        <main className="flex-1 px-8 pb-8">
          {loading ? (
            <div className="text-center text-gray-500 py-8">
              Cargando turnos...
            </div>
          ) : !filteredAppointments.length ? (
            <div className="text-center text-gray-500 py-8">
              No hay turnos para mostrar.
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-4 space-y-4">
              {filteredAppointments.map((a) => (
                <div
                  key={a.Id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl">
                      <FiUser size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        {a.Cliente?.Nombre || "Sin datos"}{" "}
                        <span
                          className={`ml-2 px-3 py-1 rounded-full border text-xs text-center inline-block min-w-[90px] ${getEstadoStyle(
                            a.Estado
                          )}`}
                        >
                          {a.Estado}
                        </span>
                      </div>
                      <div className="text-gray-500">
                        {a.HairdresserService?.Service?.Nombre || "Sin datos"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiCalendar /> {formatDate(a.Fecha)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiClock /> {a.Hora}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`border px-3 py-1 rounded text-sm ${
                        a.Estado !== "Reservado"
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setEditingAppointment(a);
                        setIsModalOpen(true);
                      }}
                      disabled={a.Estado !== "Reservado"}
                    >
                      Reprogramar
                    </button>

                    <button
                      className={`px-3 py-1 rounded text-sm ${
                        a.Estado !== "Reservado"
                          ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                          : "bg-black text-white hover:opacity-90"
                      }`}
                      onClick={() => handleOpenCompleteModal(a)}
                      disabled={a.Estado !== "Reservado"}
                    >
                      Completar
                    </button>

                    <button
                      className={`px-3 py-1 rounded text-sm ${
                        a.Estado !== "Reservado"
                          ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                      onClick={() => handleOpenCancelModal(a)}
                      disabled={a.Estado !== "Reservado"}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm text-center animate-[modalIn_0.2s_ease]">
              <h3 className="text-lg font-bold mb-2">¿Cancelar turno?</h3>
              <p className="mb-6 text-gray-600">
                ¿Estás seguro que deseas cancelar el turno de{" "}
                <b>{appointmentToCancel?.Cliente?.Nombre}</b>? Esta acción no se
                puede deshacer.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                  onClick={handleCloseCancelModal}
                  disabled={cancelling}
                >
                  Volver
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                  onClick={handleConfirmCancel}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelando..." : "Confirmar cancelación"}
                </button>
              </div>
            </div>
            <style>
              {`
        @keyframes modalIn {
          0% { opacity: 0; transform: scale(0.95);}
          100% { opacity: 1; transform: scale(1);}
        }
      `}
            </style>
          </div>
        )}

        {showCompleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm text-center animate-[modalIn_0.2s_ease]">
              <h3 className="text-lg font-bold mb-2">¿Completar turno?</h3>
              <p className="mb-6 text-gray-600">
                ¿Estás seguro que deseas marcar como <b>Pagado</b> el turno de{" "}
                <b>{appointmentToComplete?.Cliente?.Nombre}</b>? Esta acción no
                se puede deshacer.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                  onClick={handleCloseCompleteModal}
                  disabled={completing}
                >
                  Volver
                </button>
                <button
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  onClick={handleConfirmComplete}
                  disabled={completing}
                >
                  {completing ? "Confirmando..." : "Confirmar completado"}
                </button>
              </div>
            </div>
            <style>
              {`
        @keyframes modalIn {
          0% { opacity: 0; transform: scale(0.95);}
          100% { opacity: 1; transform: scale(1);}
        }
      `}
            </style>
          </div>
        )}
      </div>
    </div>
  );
}
