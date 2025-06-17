import { useEffect, useState } from "react";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import { useAppData } from "../../context/AppDataContext";
import { FiEdit2 } from "react-icons/fi";
import { normalizeText } from "../../utils/stringUtils";
import ProfileForm from "../../components/profiles/ProfileForm";

export default function Profiles() {
  const { profiles, fetchProfiles } = useAppData();
  const loading = profiles === null;
  const profileList = profiles || [];
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para edición (a futuro, para usar con modal)
  const [editingProfile, setEditingProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!profiles) {
      fetchProfiles();
    }
  }, [profiles, fetchProfiles]);

  const filteredProfiles = profileList.filter((p) =>
    normalizeText(`${p.Nombre} ${p.Descripcion}`).includes(
      normalizeText(searchTerm)
    )
  );

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProfile(null);
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
            <h1 className="text-3xl font-bold">Perfiles</h1>
            <p className="text-gray-600 text-base">
              Visualiza y edita los perfiles del sistema.
            </p>
          </div>
        </header>

        {/* Buscador */}
        <div className="flex flex-wrap items-center gap-4 px-8 py-4">
          <input
            type="text"
            placeholder="Buscar perfiles por nombre o descripción..."
            className="border rounded px-4 py-2 text-sm w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lista de perfiles */}
        <main className="flex-1 px-8 pb-8">
          {loading ? (
            <div className="text-center text-gray-500 py-8">
              Cargando perfiles...
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((p) => (
                  <div
                    key={p.Id}
                    className="bg-white rounded-lg border flex flex-col md:flex-row md:items-center justify-between p-6 gap-4"
                  >
                    <div>
                      <div className="font-bold text-xl mb-1">{p.Nombre}</div>
                      <div className="text-gray-600">{p.Descripcion}</div>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                      <button
                        className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100 text-sm"
                        onClick={() => handleEdit(p)}
                      >
                        <FiEdit2 /> Editar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No hay perfiles para mostrar.
                </div>
              )}
            </div>
          )}
        </main>

        <ProfileForm
          open={showModal}
          onClose={handleCloseModal}
          profile={editingProfile}
          onSaved={fetchProfiles}
        />
      </div>
    </div>
  );
}
