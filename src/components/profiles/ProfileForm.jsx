import { useState, useEffect } from "react";
import { updateProfiles } from "../../services/profiles/profilesService";

const ProfileForm = ({ open, onClose, profile, onSaved }) => {
  const [form, setForm] = useState({
    Nombre: "",
    Descripcion: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (profile) {
      setForm({
        Nombre: profile.Nombre || "",
        Descripcion: profile.Descripcion || "",
        Id: profile.Id,
      });
    }
  }, [profile, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      await updateProfiles(form);
      setToast({ type: "success", message: "Perfil actualizado exitosamente" });

      setTimeout(() => {
        setToast(null);
        onClose();
        if (onSaved) onSaved();
      }, 500);
    } catch (error) {
      setToast({ type: "error", message: "Error al actualizar el perfil", error });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[2px] transition-all">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative animate-[modalIn_0.25s_ease]">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Editar Perfil</h2>

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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="Nombre"
              value={form.Nombre}
              readOnly
              className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              El nombre del perfil no se puede modificar.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Descripción</label>
            <input
              type="text"
              name="Descripcion"
              value={form.Descripcion}
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
            {loading ? "Actualizando..." : "Actualizar Perfil"}
          </button>
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

export default ProfileForm;
