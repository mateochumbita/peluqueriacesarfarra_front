import React, { useState } from "react";
import { register } from "../../services/auth/authService";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    dni: "",
    nombre: "",
    telefono: "",
    email: "",
    habilitado: true,
    IdProfile: 2, // Fijo para clientes
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (form.password !== confirmPassword) {
      setToast({ type: "error", message: "Las contraseñas no coinciden" });
      return;
    }

    setLoading(true);
    try {
      await register(form);
      setToast({ type: "success", message: "Registro de cliente exitoso" });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setToast({ type: "error", message: "Error al registrar cliente", error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">Crear una cuenta</h2>
          <p className="text-sm text-center text-gray-600 mb-6">Ingresa tus datos para crear una cuenta</p>
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
              <label className="text-sm font-medium">Usuario</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="ej: juanperez"
                className="mt-1 w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">DNI</label>
              <input
                type="text"
                name="dni"
                value={form.dni}
                onChange={handleChange}
                placeholder="12345678"
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
                placeholder="Juan Pérez"
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
                placeholder="+541234567890"
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
                placeholder="juanperez@gmail.com"
                className="mt-1 w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="relative">
              <label className="text-sm font-medium">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2 pr-10"
                required
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="relative">
              <label className="text-sm font-medium">Confirmar contraseña</label>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2 pr-10"
                required
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-black font-medium">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
