import { FaCut, FaSignOutAlt, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login'); // Redireccionar al login
  };

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
        <button
          className="p-2 rounded-md hover:bg-gray-100 transition"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <FaSignOutAlt className="w-4 h-4 text-red-500" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 transition" title="Modo claro/oscuro">
          <FaSun className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    </nav>
  );
};

export default Navbar;
