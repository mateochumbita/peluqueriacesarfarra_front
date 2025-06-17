import React, { useState, useEffect } from "react";
import { createServices, updateServices} from "../../services/services/servicesService";


export default function ServiceForm({ open, onClose, service, onSaved }) {

  const [form, setForm] = useState({
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Duracion: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  //  servicio para editar, inicializa el formulario
  useEffect(() => {
    if (service) {
      setForm({
        Nombre: service.Nombre || "",
        Descripcion: service.Descripcion || "",
        Precio: service.Precio || "",
        Duracion: service.Duracion || "",
        Id: service.Id,
      });
    } else {
      setForm({
        Nombre: "",
        Descripcion: "",
        Precio: "",
        Duracion: "",
      });
    }
  }, [service, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);
    try {
      if (form.Id) {
        // Editar servicio existente
        await updateServices({
          ...form,
          Precio: parseFloat(form.Precio).toFixed(2),
          Duracion: parseInt(form.Duracion, 10),
        });
      
      } else {
        // Crear nuevo servicio
        await createServices({
          ...form,
          Precio: parseFloat(form.Precio).toFixed(2),
          Duracion: parseInt(form.Duracion, 10),
        });
        setToast({ type: "success", message: "Servicio creado exitosamente" });
      }
      setForm({ Nombre: "", Descripcion: "", Precio: "", Duracion: "" });
      setTimeout(() => {
        setToast(null);
        onClose();
        if (onSaved) onSaved(); // Notifica a la página que debe recargar
      }, 500);
    } catch (error) {
      setToast({ type: "error", message: "Error al guardar el servicio", error });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[2px] transition-all">
      <div
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative
          animate-[modalIn_0.25s_ease]"
        style={{
          animationName: open ? "modalIn" : "",
        }}
      >
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {form.Id ? "Editar Servicio" : "Nuevo Servicio"}
        </h2>
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
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
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
          <div>
            <label className="text-sm font-medium">Precio</label>
            <input
              type="number"
              name="Precio"
              value={form.Precio}
              onChange={handleChange}
              min={0}
              step={0.01}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Duración (minutos)</label>
            <input
              type="number"
              name="Duracion"
              value={form.Duracion}
              onChange={handleChange}
              min={1}
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
              ? form.Id
                ? "Actualizando..."
                : "Guardando..."
              : form.Id
              ? "Actualizar Servicio"
              : "Crear Servicio"}
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