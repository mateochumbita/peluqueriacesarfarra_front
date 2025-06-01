import { useParams } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import { FiUser, FiMail, FiPhone, FiCalendar, FiTag } from "react-icons/fi";

export default function Profile() {
  const { id } = useParams();
  const { clients } = useAppData();
  const { users } = useAppData();

  const client = clients?.find((c) => String(c.Id) === String(id));
  const user = users?.find((u) => String(u.Id) === String(client.IdUser));
  console.log(user);

  if (!client) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Menu />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-8">
            <p className="text-gray-500">Cliente no encontrado.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Menu />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
          <div>
            <h1 className="text-3xl font-bold">Perfil de Cliente</h1>
            <p className="text-gray-600 text-base">
              Información detallada del cliente.
            </p>
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 px-8 py-6">
          <div className="bg-white border rounded-lg p-6 max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-3xl">
                <FiUser />
              </div>
              <div>
                <div className="text-xl font-semibold">{client.Nombre}</div>
                {/* <div className="text-sm text-gray-500">ID Cliente: {client.Id}</div> */}
              </div>
            </div>

            <div className="space-y-4 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <FiUser className="text-gray-500" />
                <span className="font-medium w-32">Username:</span>
                <span>{user.Username || "No especificado"}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-500" />
                <span className="font-medium w-32">Fecha de Registro:</span>
                <span>
                  {new Date(client.FechaRegistro).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiPhone className="text-gray-500" />
                <span className="font-medium w-32">Teléfono:</span>
                <span>{client.Telefono}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiMail className="text-gray-500" />
                <span className="font-medium w-32">Email:</span>
                <span>{client.Email}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiTag className="text-gray-500" />
                <span className="font-medium w-32">Puntos Fidelidad:</span>
                <span>{client.PuntosFidelidad}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
