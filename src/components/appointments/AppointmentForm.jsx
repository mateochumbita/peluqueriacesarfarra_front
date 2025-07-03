import React, { useEffect, useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import {
  createAppointments,
  updateAppointments,
} from "../../services/appointments/appointmentService";

const AppointmentForm = ({
  isOpen,
  onClose,
  editingAppointment,
  onSaved,
  initialDate,
  initialTime,
}) => {
  const {
    appointments,
    fetchAppointments,
    clients,
    fetchClients,
    fetchHairdressersServices,
    hairdressersServices,
    fetchAppointmentsStats,
  } = useAppData();

  const hairdressersWithServices = hairdressersServices
    ? Array.from(
        new Map(
          hairdressersServices.map((hs) => [hs.Hairdresser.Id, hs.Hairdresser])
        ).values()
      )
    : [];

  const [clienteDesdeLocalStorage, setClienteDesdeLocalStorage] = useState(null);

  const [form, setForm] = useState({
    cliente: "",
    peluquero: "",
    servicio: "",
    fecha: "",
    hora: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const availableServicesByHairdresser = hairdressersServices?.filter(
    (hs) => hs.IdHairdresser === Number(form.peluquero)
  );

  useEffect(() => {
    if (!appointments) fetchAppointments();
    if (!clients) fetchClients();
    if (!hairdressersServices) fetchHairdressersServices();
  }, [
    appointments,
    fetchAppointments,
    clients,
    fetchClients,
    fetchHairdressersServices,
    hairdressersServices,
  ]);

  useEffect(() => {
    const idCliente = localStorage.getItem("IdCliente");
    if (idCliente) {
      setClienteDesdeLocalStorage(idCliente);
      setForm((prev) => ({
        ...prev,
        cliente: idCliente,
      }));
    }
  }, []);

  const resetForm = () => {
    setForm({
      cliente: clienteDesdeLocalStorage || "",
      peluquero: "",
      servicio: "",
      fecha: "",
      hora: "",
    });
    setToast(null);
  };

  const showToast = (toast) => {
    setToast(toast);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (editingAppointment) {
      setForm({
        cliente:
          editingAppointment.IdCliente?.toString() || clienteDesdeLocalStorage || "",
        peluquero:
          editingAppointment.HairdresserService?.IdHairdresser?.toString() || "",
        servicio:
          editingAppointment.HairdresserService?.IdService?.toString() || "",
        fecha: editingAppointment.Fecha,
        hora: editingAppointment.Hora,
      });
    } else if (initialDate || initialTime) {
      setForm((prev) => ({
        ...prev,
        fecha: initialDate ? initialDate.format("YYYY-MM-DD") : prev.fecha,
        hora: initialTime || prev.hora,
      }));
    } else {
      resetForm();
    }
  }, [editingAppointment, initialDate, initialTime, clienteDesdeLocalStorage]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "peluquero") {
      setForm((prev) => ({
        ...prev,
        peluquero: value,
        servicio: "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const hairdresserService = hairdressersServices?.find(
      (hs) =>
        hs.IdHairdresser === Number(form.peluquero) &&
        hs.IdService === Number(form.servicio)
    );

    if (!hairdresserService) {
      setToast({
        type: "error",
        message:
          "No se encontró una relación válida entre el peluquero y el servicio seleccionado.",
      });
      setLoading(false);
      return;
    }

    const appointmentData = {
      IdCliente: Number(form.cliente),
      Fecha: form.fecha,
      Hora: form.hora,
      Estado: "Reservado",
      IdHairdresser_Service: hairdresserService.Id,
    };

    try {
      if (editingAppointment) {
        await updateAppointments(editingAppointment.Id, appointmentData);
        showToast({ type: "success", message: "Turno actualizado exitosamente" });
      } else {
        await createAppointments(appointmentData);
        await fetchAppointmentsStats();
        showToast({ type: "success", message: "Turno creado exitosamente" });
      }

      fetchAppointments();
      resetForm();
      onClose();
      if (onSaved) onSaved();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Error al guardar el turno.";
      setToast({ type: "error", message: errorMessage });
      console.error("Detalle del error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-xl px-6 py-4 w-full max-w-md relative animate-[modalIn_0.25s_ease]">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2 text-center">
          Crear / Reprogramar Turno
        </h2>

        {toast && (
          <div
            className={`mb-2 text-center py-2 rounded ${
              toast.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {toast.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Cliente */}
          <div>
            <label className="text-sm font-medium">Cliente</label>
            <select
              name="cliente"
              value={form.cliente}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
              disabled={!!clienteDesdeLocalStorage}
            >
              <option value="">Seleccione un cliente</option>
              {clients &&
                clients.map((cliente) => (
                  <option key={cliente.Id} value={cliente.Id}>
                    {cliente.Nombre}
                  </option>
                ))}
            </select>
          </div>

          {/* Peluquero */}
          <div>
            <label className="text-sm font-medium">Peluquero</label>
            <select
              name="peluquero"
              value={form.peluquero}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            >
              <option value="">Seleccione un peluquero</option>
              {hairdressersWithServices.map((peluquero) => (
                <option key={peluquero.Id} value={peluquero.Id}>
                  {peluquero.Nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Servicio */}
          <div>
            <label className="text-sm font-medium">Servicio</label>
            <select
              name="servicio"
              value={form.servicio}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
              disabled={!form.peluquero}
            >
              <option value="">Seleccione un servicio</option>
              {availableServicesByHairdresser?.map((hs) => (
                <option key={hs.Service.Id} value={hs.Service.Id}>
                  {hs.Service.Nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label className="text-sm font-medium">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Hora */}
          <div>
            <label className="text-sm font-medium">Hora</label>
            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className={`w-full py-2 rounded ${
                loading
                  ? "bg-gray-400"
                  : "bg-black hover:bg-gray-800 text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Confirmar Turno"}
            </button>
          </div>
        </form>
      </div>
      <style>
        {`
          @keyframes modalIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default AppointmentForm;
