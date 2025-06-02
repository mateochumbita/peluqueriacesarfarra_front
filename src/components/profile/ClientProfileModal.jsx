import React, { useState, useEffect } from "react";
import {
  getClientByUserId,
  updateClients,
} from "../../services/clients/clientService";
import { getUsersById, updateUsers } from "../../services/users/usersService";

export default function ClientProfileModal({
  isOpen,
  onClose,
  onProfileUpdate,
}) {
  const [form, setForm] = useState({
    username: "",
    dni: "",
    nombre: "",
    telefono: "",
    email: "",
    habilitado: true,
    IdProfile: 2,
  });
  const [userId, setUserId] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Carga datos del usuario y cliente al abrir el modal
  useEffect(() => {
    if (!isOpen) return;

    const fetchProfileData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setToast({ type: "error", message: "Usuario no autenticado." });
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const id = parsedUser?.Id;
      if (!id) {
        setToast({ type: "error", message: "ID de usuario no encontrado." });
        return;
      }

      setUserId(id);
      console.log("id del usuario: ", userId);

      // const client = await getClientByUserId(id);
      // console.log("Cliente obtenido:", client);

      try {
        const [user, clientData] = await Promise.all([
          getUsersById(id),
          getClientByUserId(id),
        ]);

        setClient(clientData);

        setForm({
          username: user?.Username || "",
          dni: clientData?.Dni || "",
          nombre: clientData?.Nombre || "",
          telefono: clientData?.Telefono || "",
          email: clientData?.Email || "",
          habilitado: user?.Habilitado ?? true,
          IdProfile: user?.IdProfile ?? 2,
        });
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        setToast({ type: "error", message: "No se pudo cargar el perfil." });
      }
    };

    fetchProfileData();
  }, [isOpen]);

  const handleClose = () => {
    setForm({
      username: "",
      dni: "",
      nombre: "",
      telefono: "",
      email: "",
      habilitado: true,
      IdProfile: 2,
    });
    setToast(null);
    setClient(null);
    setUserId(null);
    onClose(); // llamado original
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      // Actualiza cliente
      await updateClients({
        Id: client.Id,
        Dni: form.dni,
        Nombre: form.nombre,
        Telefono: form.telefono,
        Email: form.email,
        IdUser: userId,
      });

      // Actualiza usuario
      await updateUsers({
        Id: userId,
        Username: form.username,
        Habilitado: form.habilitado,
        IdProfile: form.IdProfile,
      });

      setToast({
        type: "success",
        message: "Perfil actualizado correctamente.",
      });

      setTimeout(() => {
        if (onProfileUpdate) onProfileUpdate();
        handleClose(); // limpiar y cerrar
        onClose(); // Cierra modal tras breve delay
      }, 1200);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setToast({ type: "error", message: "Error al actualizar el perfil." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[2px] transition-all">
      <div className="bg-white rounded-lg shadow-2xl px-6 py-4 w-full max-w-md relative animate-[modalIn_0.25s_ease]">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Editar Perfil</h2>

        {toast && (
          <div
            className={`mb-4 text-center py-2 rounded ${
              toast.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {toast.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Usuario", name: "username", type: "text" },
            { label: "DNI", name: "dni", type: "text" },
            { label: "Nombre", name: "nombre", type: "text" },
            { label: "Teléfono", name: "telefono", type: "tel" },
            { label: "Email", name: "email", type: "email" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full mt-1 border px-3 py-2 rounded"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Guardando cambios..." : "Actualizar Perfil"}
          </button>
        </form>
      </div>
    </div>
  );
}
