import React, { useState, useEffect } from "react";
import { register } from "../../services/auth/authService";
import { updateHairdressers } from "../../services/hairdressers/hairdressersService";
import { getUsersById } from "../../services/users/usersService";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAppData } from "../../context/AppDataContext";
import {
  createHairdressersServices,
  deleteHairdressersServices,
} from "../../services/hairdressers_services/hairdressers_servicesService";

export default function HairdresserForm({ open, onClose, hairdresser }) {
  const {
    fetchHairdressers,
    hairdressersServices,
    fetchHairdressersServices,
    services,
    fetchServices,
  } = useAppData();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    dni: "",
    nombre: "",
    telefono: "",
    email: "",
    habilitado: true,
    IdProfile: 1,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (!hairdressersServices) {
      fetchHairdressersServices();
    }
    if (!services) {
      fetchServices();
    }
  }, [
    hairdressersServices,
    fetchHairdressersServices,
    services,
    fetchServices,
  ]);

  useEffect(() => {
    const loadForm = async () => {
      if (!hairdresser) {
        setForm({
          username: "",
          password: "",
          confirmPassword: "",
          dni: "",
          nombre: "",
          telefono: "",
          email: "",
          habilitado: true,
          IdProfile: 1,
        });
        return;
      }

      if (hairdresser) {
        const currentServices = hairdressersServices
          ?.filter((hs) => hs.IdHairdresser === hairdresser.Id)
          .map((hs) => hs.IdService);

        setSelectedServices(currentServices || []);
      }

      // Cargar datos personales del peluquero
      const { Dni, Nombre, Telefono, Email, IdUser } = hairdresser;
      let userData = {};
      if (IdUser) {
        try {
          const user = await getUsersById(IdUser);
          userData = {
            username: user?.Username || "",
            habilitado: user?.Habilitado ?? true,
            IdProfile: user?.IdProfile ?? 1,
          };
        } catch (err) {
          console.error("Error al obtener usuario:", err);
        }
      }

      setForm((prev) => ({
        ...prev,
        username: userData.username || "",
        password: "",
        confirmPassword: "",
        dni: Dni || "",
        nombre: Nombre || "",
        telefono: Telefono || "",
        email: Email || "",
        habilitado: userData.habilitado,
        IdProfile: userData.IdProfile,
      }));
    };

    if (open) {
      loadForm();
      setToast(null);
    }
  }, [open, hairdresser, hairdressersServices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (!form.dni || !form.nombre || !form.telefono || !form.email) {
      setToast({
        type: "error",
        message: "Completa todos los campos obligatorios.",
      });
      return;
    }

    if (!hairdresser) {
      if (!form.username || !form.password || !form.confirmPassword) {
        setToast({
          type: "error",
          message: "Completa los campos de usuario y contraseña.",
        });
        return;
      }

      if (form.password !== form.confirmPassword) {
        setToast({
          type: "error",
          message: "Las contraseñas no coinciden.",
        });
        return;
      }
    }

    setLoading(true);

    try {
      let newHairdresserId = hairdresser?.Id;

      // CREAR
      if (!hairdresser) {
        const created = await register({
          username: form.username,
          password: form.password,
          habilitado: true,
          IdProfile: 1,
          dni: form.dni,
          nombre: form.nombre,
          telefono: form.telefono,
          email: form.email,
        });

        // Obtené el ID del nuevo peluquero creado
        newHairdresserId = created?.Id; // ajustá según lo que devuelva tu backend

        // Asociar servicios seleccionados
        for (const serviceId of selectedServices) {
          await createHairdressersServices({
            IdHairdresser: newHairdresserId,
            IdService: serviceId,
          });
        }

        setToast({
          type: "success",
          message: "Peluquero creado exitosamente.",
        });
      } else {
        // EDITAR peluquero

        await updateHairdressers({
          Id: hairdresser.Id,
          Dni: form.dni,
          Nombre: form.nombre,
          Telefono: form.telefono,
          Email: form.email,
          IdUser: hairdresser.IdUser,
        });

        // Ver relaciones actuales
        const currentRelations = hairdressersServices?.filter(
          (hs) => hs.IdHairdresser === hairdresser.Id
        );

        const currentServiceIds = currentRelations.map((hs) => hs.IdService);

        // Agregar servicios nuevos
        const newServicesToAdd = selectedServices.filter(
          (id) => !currentServiceIds.includes(id)
        );

        for (const serviceId of newServicesToAdd) {
          await createHairdressersServices({
            IdHairdresser: hairdresser.Id,
            IdService: serviceId,
          });
        }

        // (Opcional) Eliminar servicios que fueron deseleccionados
        const servicesToRemove = currentRelations.filter(
          (rel) => !selectedServices.includes(rel.IdService)
        );

        for (const rel of servicesToRemove) {
          console.log("Eliminando relación:", rel);
          await deleteHairdressersServices(rel.Id);
        }

        setToast({
          type: "success",
          message: "Datos actualizados correctamente.",
        });
      }

      setTimeout(async () => {
        setToast(null);
        onClose();
        await fetchHairdressers();
        await fetchHairdressersServices(); // actualizar relaciones
      }, 1000);
    } catch (error) {
      console.error(error);
      setToast({
        type: "error",
        message: "Error al guardar el peluquero.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg shadow-2xl px-6 py-4 w-full max-w-md relative animate-[modalIn_0.25s_ease]">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2 text-center">
          {hairdresser ? "Editar Peluquero" : "Nuevo Peluquero"}
        </h2>

        {toast && (
          <div
            className={`md:col-span-2 mb-2 py-2 text-center rounded ${
              toast.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {toast.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="text-sm font-medium">Usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              disabled={!!hairdresser}
              className="mt-1 w-full border rounded px-3 py-2"
              required={!hairdresser}
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={!!hairdresser}
              className="mt-1 w-full border rounded px-3 py-2 pr-10"
              autoComplete="new-password"
              required={!hairdresser}
            />
            {hairdresser && (
              <span className="text-xs text-gray-500 mt-1">
                No editable en edición
              </span>
            )}
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={!!hairdresser}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Confirmar Contraseña</label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={!!hairdresser}
              className="mt-1 w-full border rounded px-3 py-2 pr-10"
              autoComplete="new-password"
              required={!hairdresser}
            />
            {hairdresser && (
              <span className="text-xs text-gray-500 mt-1">
                No editable en edición
              </span>
            )}
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-500"
              onClick={() => setShowConfirm((prev) => !prev)}
              disabled={!!hairdresser}
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div>
            <label className="text-sm font-medium">DNI</label>
            <input
              type="text"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Servicios</label>
            <div className="mt-2 space-y-1 max-h-40 overflow-y-auto border rounded px-3 py-2">
              {services?.map((service) => (
                <div key={service.Id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-${service.Id}`}
                    checked={selectedServices.includes(service.Id)}
                    onChange={() => handleServiceToggle(service.Id)}
                    className="mr-2"
                  />
                  <label htmlFor={`service-${service.Id}`}>
                    {service.Nombre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {loading
              ? hairdresser
                ? "Actualizando..."
                : "Guardando..."
              : hairdresser
              ? "Actualizar Peluquero"
              : "Crear Peluquero"}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes modalIn {
          0% { opacity: 0; transform: scale(0.95);}
          100% { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
}
