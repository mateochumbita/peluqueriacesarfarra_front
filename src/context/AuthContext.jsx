import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService, register as registerService } from "../services/auth/authService";
import { getClientByUserId } from "../services/clients/clientService";
import { getHaidresserByUserId } from "../services/hairdressers/hairdressersService";
const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login
const login = async (data) => {
  const res = await loginService(data);

  if (res?.ok && res.token) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    setUser(res.user);

    // Intentar obtener nombre desde client o hairdresser
    try {
      const [cliente, peluquero] = await Promise.allSettled([
        getClientByUserId(res.user.Id),
        getHaidresserByUserId(res.user.Id),
      ]);

      if (cliente.status === "fulfilled" && cliente.value?.Nombre) {
        localStorage.setItem("nombreUsuario", cliente.value.Nombre);
        localStorage.setItem("rol", "cliente");
      } else if (peluquero.status === "fulfilled" && peluquero.value?.Nombre) {
        localStorage.setItem("nombreUsuario", peluquero.value.Nombre);
        localStorage.setItem("rol", "peluquero");
      } else {
        localStorage.setItem("nombreUsuario", "Usuario");
        localStorage.setItem("rol", "desconocido");
      }
    } catch (e) {
      // Manejo de errores opcional si querés mostrar algo
      console.error("Error al obtener el nombre:", e);
    }

    navigate("/dashboard");
    return { ok: true };
  } else {
    throw new Error(res?.msg || "Credenciales incorrectas");
  }
};

  // Register
  const register = async (data) => {
    const res = await registerService(data);
    if (res?.ok && res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
      navigate("/dashboard");
      return { ok: true };
    } else {
      throw new Error(res?.msg || "No se pudo registrar");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (!isMounted) return null;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);