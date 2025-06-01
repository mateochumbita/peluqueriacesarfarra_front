import { FaCut, FaBell, FaSun } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white shadow-sm">
      {/* Izquierda: Icono y texto */}
      <div className="flex items-center space-x-3">
        <FaCut className="text-black w-4 h-4" />
        <div className="leading-tight">
          <h1 className="font-semibold text-sm">Peluquería César Farra</h1>
          <p className="text-xs font-medium text-gray-700">Admin</p>
        </div>
      </div>

      {/* Derecha: Iconos */}
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-md hover:bg-gray-100 transition">
          <FaBell className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 transition">
          <FaSun className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    </nav>
  );
};

export default Navbar;
