import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMoreHorizontal,
  FiEdit2,
} from "react-icons/fi";

import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import ClientForm from "../../components/clients/ClientForm";
import ProfileModal from "../../components/common/ProfileModal";

import { useAppData } from "../../context/AppDataContext";
import { deleteClients } from "../../services/clients/clientService";
import { deleteUsers } from "../../services/users/usersService";
import { normalizeText } from "../../utils/stringUtils";

export default function Clients() {
  const { clients, fetchClients } = useAppData();
  const loading = clients === null;
  const clientList = clients || [];

  /* ==================== estados ==================== */
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingClient, setDeletingClient] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [menuClientId, setMenuClientId] = useState(null); // menú de los 3 puntos
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const [toast, setToast] = useState(null);

  /* ==================== efectos ==================== */
  useEffect(() => {
    if (!clients) fetchClients();
  }, [clients, fetchClients]);

  /* ==================== funciones helper ==================== */
  const toggleMenu = (id) =>
    setMenuClientId((prev) => (prev === id ? null : id));

  const handleOpenDeleteModal = (client) => {
    setDeletingClient(client);
    setShowDeleteModal(true);
    setMenuClientId(null); // cerrar menú
  };

  const handleCloseDeleteModal = () => {
    setDeletingClient(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    if (!deletingClient) return;
    setDeleting(true);
    try {
      await deleteClients(deletingClient.Id);
      await deleteUsers(deletingClient.IdUser);
      await fetchClients();
      setToast({ type: "success", message: "Cliente eliminado exitosamente" });
    } catch (error) {
      setToast({ type: "error", message: "Error al eliminar el cliente" });
      console.error(error);
    } finally {
      setTimeout(() => setToast(null), 2000);
      setDeleting(false);
      handleCloseDeleteModal();
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);


  const filteredClients = clientList.filter((c) =>
    normalizeText(`${c.Nombre} ${c.Dni}`).includes(normalizeText(searchTerm))
  );

  /* ==================== render ==================== */
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Menu />

      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Toast */}
        {toast && (
          <div
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded shadow-lg transition-all ${
              toast.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {toast.message}
          </div>
        )}

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
            onClick={() => {
              setEditingClient(null);
              setShowModal(true);
            }}
          >
            <FiUser /> <span className="hidden sm:inline">Nuevo Cliente</span>
          </button>
        </header>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 px-8 py-4">
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            className="border rounded px-4 py-2 text-sm w-64"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Lista */}
        <main className="flex-1 px-8 pb-8">
          <div className="bg-white rounded-lg border p-4 space-y-4">
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                Cargando clientes...
              </div>
            ) : filteredClients.length ? (
              filteredClients.map((c) => (
                <div
                  key={c.Id}
                  className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
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
                    Registrado:{" "}
                    {new Date(c.FechaRegistro).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      className="border px-3 py-1 rounded hover:bg-gray-100 text-sm flex items-center gap-1"
                      onClick={() => {
                        setEditingClient(c);
                        setShowModal(true);
                      }}
                    >
                      <FiEdit2 /> Editar
                    </button>

                    <button
                      className="border px-3 py-1 rounded hover:bg-gray-100 text-sm"
                      onClick={() => setSelectedProfileId(c.Id)}
                    >
                      Ver Perfil
                    </button>

                    {/* dropdown de los 3 puntos */}
                    <div className="relative">
                      <button
                        className="p-2 hover:bg-gray-100 rounded"
                        onClick={() => toggleMenu(c.Id)}
                      >
                        <FiMoreHorizontal />
                      </button>

                      {menuClientId === c.Id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                            onClick={() => handleOpenDeleteModal(c)}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
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

        {/* Formulario create / edit */}
        <ClientForm
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingClient(null);
          }}
          client={editingClient}
        />

        {/* Modal de perfil */}
        <ProfileModal
          open={selectedProfileId !== null}
          onClose={() => setSelectedProfileId(null)}
          profileId={selectedProfileId}
        />
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm text-center animate-[modalIn_0.2s_ease]">
            <h3 className="text-lg font-bold mb-2">¿Eliminar cliente?</h3>
            <p className="mb-6 text-gray-600">
              ¿Estás seguro que deseas eliminar{" "}
              <b>{deletingClient?.Nombre}</b>? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                onClick={handleCloseDeleteModal}
                disabled={deleting}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
          <style>
            {`
              @keyframes modalIn {
                0% { opacity: 0; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
}
