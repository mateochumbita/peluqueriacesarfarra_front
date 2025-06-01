import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiClock,
  FiUsers,
  FiScissors,
  FiMessageSquare,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";
// Si quieres un icono diferente, descomenta la siguiente línea:
import { FaUserTie } from "react-icons/fa"; // <-- Importa el icono
const menuItems = [
  { icon: <FiHome />, label: "Panel Principal", path: "/dashboard" },
  { icon: <FiCalendar />, label: "Calendario", path: "/calendar" },
  { icon: <FiClock />, label: "Turnos", path: "/appointments" },
  { icon: <FiUsers />, label: "Clientes", path: "/clients" },
  { icon: <FiScissors />, label: "Servicios", path: "/services" },
  { icon: <FaUserTie />, label: "Peluqueros", path: "/hairdressers" }, // <-- Nuevo ítem
  // Si prefieres otro icono, usa: { icon: <FaUserTie />, label: "Peluqueros", path: "/hairdressers" },
  { icon: <FiBarChart2 />, label: "Estadísticas", path: "/stats" },
  // { icon: <FiSettings />, label: "Configuración", path: "/configuracion" },
];

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white shadow"
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r shadow-lg z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none md:border-none
        `}
      >
        <nav className="flex flex-col gap-1 mt-16 md:mt-8 p-4">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.label}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition text-base ${
                  isActive ? "bg-gray-100 text-black font-semibold" : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
