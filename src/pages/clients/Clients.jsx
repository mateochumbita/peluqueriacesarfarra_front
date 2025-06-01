import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMoreHorizontal,
  FiEdit2,
} from "react-icons/fi";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";
import ClientForm from "../../components/clients/ClientForm";
import { Link } from "react-router-dom";
import ProfileModal from "../../components/common/ProfileModal";
export default function Clients() {
  const { clients } = useAppData();
  const loading = clients === null;
  const clientList = clients || [];

  // Estado para el modal y el cliente a editar
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const handleViewProfile = (id) => {
    setSelectedProfileId(id);
  };

  const handleCloseProfileModal = () => {
    setSelectedProfileId(null);
  };

  const handleNewClient = () => {
    setEditingClient(null);
    setShowModal(true);
  };

  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredClients = clientList.filter((h) =>
    normalizeText(`${h.Nombre} ${h.Dni}`).includes(normalizeText(searchTerm))
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Menu />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
          <div>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-gray-600 text-base">
              Gestiona la información de tus clientes.
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:opacity-90 text-sm"
            onClick={handleNewClient}
          >
            <FiUser /> <span className="hidden sm:inline">Nuevo Cliente</span>
          </button>
        </header>

        {/* Filtros y acciones */}
        <div className="flex flex-wrap items-center gap-4 px-8 py-4">
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            className="border rounded px-4 py-2 text-sm w-64"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Lista de clientes */}
        <main className="flex-1 px-8 pb-8">
          <div className="bg-white rounded-lg border p-4 space-y-4">
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                Cargando clientes...
              </div>
            ) : filteredClients.length > 0 ? (
              filteredClients.map((c) => (
                <div
                  key={c.Id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl">
                      <FiUser size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{c.Nombre}</div>
                      <div className="flex items-center gap-4 text-gray-500 text-sm mt-1">
                        <span className="flex items-center gap-1">
                          <FiMail /> {c.Email}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiPhone /> {c.Telefono}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        DNI: {c.Dni} | Puntos: {c.PuntosFidelidad}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-700 min-w-[120px]">
                    Registrado: {new Date(c.FechaRegistro).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className="border px-3 py-1 rounded hover:bg-gray-100 text-sm flex items-center gap-1"
                      onClick={() => handleEditClient(c)}
                    >
                      <FiEdit2 /> Editar
                    </button>
                    <button
                      className="border px-3 py-1 rounded hover:bg-gray-100 text-sm inline-flex items-center"
                      onClick={() => handleViewProfile(c.Id)}
                    >
                      Ver Perfil
                    </button>
                    <button className="border px-3 py-1 rounded hover:bg-gray-100 text-sm">
                      Historial
                    </button>
                    <button className="bg-black text-white px-3 py-1 rounded hover:opacity-90 text-sm">
                      Nueva Cita
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <FiMoreHorizontal />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No hay clientes para mostrar.
              </div>
            )}
          </div>
        </main>

        {/* Modal para crear/editar cliente */}
        <ClientForm
          open={showModal}
          onClose={handleCloseModal}
          client={editingClient}
        />
      </div>
      <ProfileModal
        open={selectedProfileId !== null}
        onClose={handleCloseProfileModal}
        profileId={selectedProfileId}
      />
    </div>
  );
}
