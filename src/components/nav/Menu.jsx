import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiClock,
  FiUsers,
  FiScissors,
  FiBarChart2,
  FiMenu,
  FiX,
  FiLogOut,
  FiShield,
} from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";

const menuItems = [
  { icon: <FiHome />, label: "Panel Principal", path: "/dashboard" },
  { icon: <FiCalendar />, label: "Calendario", path: "/calendar" },
  { icon: <FiClock />, label: "Turnos", path: "/appointments" },
  { icon: <FiUsers />, label: "Clientes", path: "/clients" },
  { icon: <FiScissors />, label: "Servicios", path: "/services" },
  { icon: <FaUserTie />, label: "Adminsitrador", path: "/hairdressers" },
  { icon: <FiShield />, label: "Perfiles", path: "/profiles" }, 
  { icon: <FiBarChart2 />, label: "Estadísticas", path: "/stats" },
  { icon: <FiLogOut />, label: "Cerrar Sesión", action: "logout" }, 
];

export default function Menu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Botón hamburguesa para móviles */}
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
          {menuItems.map((item) =>
            item.action === "logout" ? (
              <button
                key={item.label}
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 mt-2 rounded-lg text-red-600 hover:bg-red-100 transition text-base"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ) : (
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
            )
          )}
        </nav>
      </aside>

      {/* Overlay para móviles */}
      {open && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
