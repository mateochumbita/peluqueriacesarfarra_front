import { FaCut, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const nombre = localStorage.getItem("nombreUsuario");

  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white shadow-sm">
      {/*Icono y texto */}
      <div className="flex items-center space-x-3">
        <FaCut className="text-black w-4 h-4" />
        <div className="leading-tight">
          <h1 className="font-semibold text-sm">Peluquería César Farra</h1>
          <p className="text-xs font-medium text-gray-700"></p>
        </div>
      </div>

      {/* Saludo e icono de logout */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-black">¡Hola! {nombre}</span>
      </div>
    </nav>
  );
};

export default Navbar;
