import Menu from "../../../components/client/nav/Menu";
import Navbar from "../../../components/nav/Navbar";
import { FiUser, FiMail, FiPhone, FiCalendar, FiTag } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getClientByUserId } from "../../../services/clients/clientService";
import { getUsersById } from "../../../services/users/usersService";
import { User } from "lucide-react";
import ClientProfileModal from "../../../components/profile/ClientProfileModal";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchUser = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("Usuario no autenticado.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser?.Id;

    if (!userId) {
      setError("ID de usuario no encontrado.");
      return;
    }

    try {
      const user = await getUsersById(userId);
      const client = await getClientByUserId(userId);
      setUser(user);
      setClient(client);
    } catch (err) {
      setError("Error al obtener el perfil.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // ← solo una vez al montar el componente

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Cargando perfil...</p>;



  return (
    <div className="flex min-h-screen bg-gray-50">
      <Menu />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
          <div>
            <h1 className="text-3xl font-bold">Perfil de {client.Nombre}</h1>
            <p className="text-gray-600 text-base">
              Información detallada del cliente.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:opacity-90 text-sm"
          >
            Editar Perfil
          </button>
        </header>
        <main className="flex-1 px-8 py-6">
          <div className="bg-white border rounded-lg p-6 max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-3xl">
                <FiUser />
              </div>
              <div>
                <div className="text-xl font-semibold">{client.Nombre}</div>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <FiUser className="text-gray-500" />
                <span className="font-medium w-32">Username:</span>
                <span>{user.Username}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-500" />
                <span className="font-medium w-32">Fecha de Registro:</span>
                <span>
                  {client.FechaRegistro
                    ? new Date(client.FechaRegistro).toLocaleDateString()
                    : "No disponible"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiPhone className="text-gray-500" />
                <span className="font-medium w-32">Teléfono:</span>
                <span>{client.Telefono || "No disponible"}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiMail className="text-gray-500" />
                <span className="font-medium w-32">Email:</span>
                <span>{client.Email || "No disponible"}</span>
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
      <ClientProfileModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onProfileUpdate={fetchUser}
      />
    </div>
  );
}
