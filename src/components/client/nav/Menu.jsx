import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiClock,
  FiUsers,
  FiBarChart2,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

const clientMenuItems = [
  { icon: <FiHome />, label: "Panel Principal", path: "/dashboard" },
  { icon: <FiCalendar />, label: "Calendario", path: "/clientcalendar" },
  { icon: <FiClock />, label: "Historial de Turnos", path: "/history" },
  { icon: <FiUsers />, label: "Perfil", action: "profile" }, // cambio importante
  // { icon: <FiBarChart2 />, label: "Puntos de Fidelidad", path: "/fidelity" },
  { icon: <FiLogOut />, label: "Cerrar Sesión", action: "logout" },
];

export default function ClienteMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Botón para abrir/cerrar menú en móviles */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white shadow"
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Menú lateral */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r shadow-lg z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none md:border-none
        `}
      >
        <nav className="flex flex-col gap-1 mt-16 md:mt-8 p-4">
          {clientMenuItems.map((item) => {
            if (item.action === "logout") {
              return (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 mt-2 rounded-lg text-red-600 hover:bg-red-100 transition text-base"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            }

            if (item.action === "profile") {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                      const user = JSON.parse(storedUser);
                      navigate(`/profile/${user.Id}`);
                    }
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 mt-2 rounded-lg text-base text-gray-700 hover:bg-gray-100"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <NavLink
                to={item.path}
                key={item.label}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition text-base ${
                    isActive
                      ? "bg-gray-100 text-black font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Fondo blur al abrir menú en mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
