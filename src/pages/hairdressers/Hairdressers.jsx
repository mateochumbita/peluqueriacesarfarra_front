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
import { useEffect, useState } from "react";
import HairdresserForm from "../../components/hairdressers/HairdresserForm";
import ProfileModal from "../../components/common/ProfileModal";
import { normalizeText } from "../../utils/stringUtils";
export default function Hairdressers() {
  const { hairdressers, fetchHairdressers} = useAppData();
  const loading = hairdressers === null;
  const hairdresserList = hairdressers || [];

  // Estado para el modal y el peluquero a editar
  const [showModal, setShowModal] = useState(false);
  const [editingHairdresser, setEditingHairdresser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  //delete modal

  useEffect(() => {
    if (!hairdressers) {
      fetchHairdressers();
    }
    
  }, [hairdressers, fetchHairdressers]);


 
  // Función para normalizar y eliminar tildes/acentos

  const filteredHairdressers = hairdresserList.filter((h) =>
    normalizeText(`${h.Nombre} ${h.Dni}`).includes(normalizeText(searchTerm))
  );

  const handleNewHairdresser = () => {
    setEditingHairdresser(null);
    setShowModal(true);
  };

  const handleEditHairdresser = (hairdresser) => {
    setEditingHairdresser(hairdresser);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingHairdresser(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewProfile = (id) => {
    setSelectedProfileId(id);
  };

  const handleCloseProfileModal = () => {
    setSelectedProfileId(null);
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
            <h1 className="text-3xl font-bold">Peluqueros</h1>
            <p className="text-gray-600 text-base">
              Gestiona la información de tus peluqueros.
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:opacity-90 text-sm"
            onClick={handleNewHairdresser}
          >
            <FiUser /> <span className="hidden sm:inline">Nuevo Peluquero</span>
          </button>
        </header>

        {/* Filtros y acciones */}
        <div className="flex flex-wrap items-center gap-4 px-8 py-4">
          <input
            type="text"
            placeholder="Buscar peluqueros..."
            className="border rounded px-4 py-2 text-sm w-full sm:w-64"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Lista de peluqueros */}
        <main className="flex-1 px-8 pb-8">
          <div className="bg-white rounded-lg border p-4 space-y-4">
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                Cargando peluqueros...
              </div>
            ) : filteredHairdressers.length > 0 ? (
              filteredHairdressers.map((h) => (
                <div
                  key={h.Id}
                  className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  {/* Datos del peluquero */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl self-start sm:self-center">
                      <FiUser size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{h.Nombre}</div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-500 text-sm mt-1">
                        <span className="flex items-center gap-1">
                          <FiMail /> {h.Email}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiPhone /> {h.Telefono}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        DNI: {h.Dni}
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-row flex-wrap items-center gap-2 self-end sm:self-center">

                    <button
                      className="border px-3 py-1 rounded hover:bg-gray-100 text-sm flex items-center gap-1 justify-center"
                      onClick={() => handleEditHairdresser(h)}
                    >
                      <FiEdit2 /> Editar
                    </button>
                    <button
                      className="border px-3 py-1 rounded hover:bg-gray-100 text-sm flex items-center justify-center"
                      onClick={() => handleViewProfile(h.Id)}
                    >
                      Ver Perfil
                    </button>
                  
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No hay peluqueros para mostrar.
              </div>
            )}
          </div>
        </main>

        {/* Modal para crear/editar peluquero */}
        <HairdresserForm
          open={showModal}
          onClose={handleCloseModal}
          hairdresser={editingHairdresser}
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
