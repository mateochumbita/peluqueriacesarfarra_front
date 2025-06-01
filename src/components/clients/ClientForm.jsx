import React, { useState, useEffect } from "react";
import { register } from "../../services/auth/authService";
import { updateClients} from "../../services/clients/clientService";
import { updateUsers, getUsersById } from "../../services/users/usersService";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAppData } from "../../context/AppDataContext";

export default function ClientForm({ open, onClose, client }) {
  const { fetchClients, fetchUsers } = useAppData();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    dni: "",
    nombre: "",
    telefono: "",
    email: "",
    habilitado: true,
    IdProfile: 2,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (client) {
        setForm((prev) => ({
          ...prev,
          dni: client.Dni || "",
          nombre: client.Nombre || "",
          telefono: client.Telefono || "",
          email: client.Email || "",
        }));
        if (client.IdUser) {
          const user = await getUsersById(client.IdUser);
          setForm((prev) => ({
            ...prev,
            username: user?.Username || "",
            password: "",
            confirmPassword: "",
            habilitado: user?.Habilitado ?? true,
            IdProfile: user?.IdProfile ?? 2,
          }));
        }
      } else {
        setForm({
          username: "",
          password: "",
          confirmPassword: "",
          dni: "",
          nombre: "",
          telefono: "",
          email: "",
          habilitado: true,
          IdProfile: 2,
        });
      }
      setToast(null);
    };
    if (open) fetchData();
    // eslint-disable-next-line
  }, [client, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (!client) {
      if (form.password !== form.confirmPassword) {
        setToast({ type: "error", message: "Las contraseñas no coinciden" });
        return;
      }
      if (form.password.length < 6) {
        setToast({ type: "error", message: "La contraseña debe tener al menos 6 caracteres" });
        return;
      }
    }

    setLoading(true);
    try {
      if (!client) {
        // CREAR CLIENTE (register)
        await register({
          username: form.username,
          password: form.password,
          habilitado: true,
          IdProfile: 2,
          dni: form.dni,
          nombre: form.nombre,
          telefono: form.telefono,
          email: form.email,
        });
        setToast({ type: "success", message: "Cliente creado exitosamente" });
      } else {
        // EDITAR CLIENTE
        await updateClients({
          Id: client.Id,
          Dni: form.dni,
          Nombre: form.nombre,
          Telefono: form.telefono,
          Email: form.email,
        });
        await updateUsers({
          Id: client.IdUser,
          Username: form.username,
          Habilitado: form.habilitado,
          IdProfile: form.IdProfile,
        });
        setToast({ type: "success", message: "Cliente actualizado exitosamente" });
      }
      setTimeout(async () => {
        setToast(null);
        setForm({
          username: "",
          password: "",
          confirmPassword: "",
          dni: "",
          nombre: "",
          telefono: "",
          email: "",
          habilitado: true,
          IdProfile: 2,
        });
        onClose();
        await fetchClients();
        await fetchUsers();
      }, 1000);
    } catch (error) {
      setToast({ type: "error", message: "Error al guardar el cliente", error });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[2px] transition-all">
      <div className="bg-white rounded-lg shadow-2xl px-6 py-4 w-full max-w-md relative animate-[modalIn_0.25s_ease]">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2 text-center">
          {client ? "Editar Cliente" : "Nuevo Cliente"}
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
          <div>
            <label className="text-sm font-medium">Usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
              disabled={!!client}
            />
          </div>
          <div className="relative">
            <label className="text-sm font-medium">
              Contraseña
              {client && <span className="text-xs text-gray-500 ml-2">(No editable en edición)</span>}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 pr-10"
              autoComplete="new-password"
              required={!client}
              disabled={!!client}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
              disabled={!!client}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="relative">
            <label className="text-sm font-medium">
              Confirmar contraseña
              {client && <span className="text-xs text-gray-500 ml-2">(No editable en edición)</span>}
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 pr-10"
              autoComplete="new-password"
              required={!client}
              disabled={!!client}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowConfirm((v) => !v)}
              disabled={!!client}
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
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            disabled={loading}
          >
            {loading
              ? client
                ? "Actualizando..."
                : "Guardando..."
              : client
              ? "Actualizar Cliente"
              : "Crear Cliente"}
          </button>
        </form>
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
  );
}