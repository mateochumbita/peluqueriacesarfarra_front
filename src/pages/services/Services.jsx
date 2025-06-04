import { useEffect, useState } from "react";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMoreHorizontal,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import { useAppData } from "../../context/AppDataContext";
import ServiceForm from "../../components/services/ServiceForm";
import { deleteServices } from "../../services/services/servicesService";
import { normalizeText } from "../../utils/stringUtils";

export default function Services() {
  const { services, fetchServices } = useAppData();
  const loading = services === null;
  const serviceList = services || [];
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Toast global para la página
  const [toast, setToast] = useState(null);
    useEffect(() => {
    if (!services) {
      fetchServices();
    }
  }, [services, fetchServices]);

  // Nuevo estado para eliminar
  const [deletingService, setDeletingService] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);


  const filteredServices = serviceList.filter((h) =>
    normalizeText(`${h.Nombre} ${h.Descripcion}`).includes(
      normalizeText(searchTerm)
    )
  );

  const handleEdit = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleDelete = (service) => {
    setDeletingService(service);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingService) return;
    setDeleting(true);
    try {
      await deleteServices(deletingService.Id);
      await fetchServices();
      setToast({ type: "success", message: "Servicio eliminado exitosamente" });
      setTimeout(() => setToast(null), 2000);
    } catch (error) {
      setToast({
        type: "error",
        message: "Error al eliminar el servicio",
        error,
      });
      setTimeout(() => setToast(null), 2000);
    } finally {
      setShowDeleteModal(false);
      setDeletingService(null);
      setDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingService(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  // Toast para edición/creación desde el modal
  const handleSaved = async () => {
    await fetchServices();
    setToast({
      type: "success",
      message: editingService
        ? "Servicio editado exitosamente"
        : "Servicio creado exitosamente",
    });
    setTimeout(() => setToast(null), 2000);
    setEditingService(null);
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
            <h1 className="text-3xl font-bold">Servicios</h1>
            <p className="text-gray-600 text-base">
              Gestiona los servicios que ofreces.
            </p>
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingService(null);
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:opacity-90 text-sm"
          >
            <FiPlus /> <span className="hidden sm:inline">Nuevo Servicio</span>
          </button>
        </header>

        {/* Toast */}
        {toast && (
          <div
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded shadow-lg transition-all
              ${
                toast.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {toast.message}
          </div>
        )}

        {/* Buscador */}
        <div className="flex flex-wrap items-center gap-4 px-8 py-4">
          <input
            type="text"
            placeholder="Buscar servicios por nombre o descripción..."
            className="border rounded px-4 py-2 text-sm w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lista de servicios */}
        <main className="flex-1 px-8 pb-8">
          {loading ? (
            <div className="text-center text-gray-500 py-8">
              Cargando servicios...
            </div>
          ) : (
            <div className="space-y-6">
              {filteredServices.length > 0 ? (
                filteredServices.map((s) => (
                  <div
                    key={s.Id}
                    className="bg-white rounded-lg border flex flex-col md:flex-row md:items-center justify-between p-6 gap-4"
                  >
                    <div>
                      <div className="font-bold text-xl mb-1">{s.Nombre}</div>
                      <div className="text-gray-600 mb-3">{s.Descripcion}</div>
                      <div className="flex items-center gap-6 text-gray-700 font-medium text-base">
                        <span className="flex items-center gap-2">
                          <FiClock /> {s.Duracion} min
                        </span>
                        <span className="flex items-center gap-2">
                          <FiDollarSign /> $
                          {parseFloat(s.Precio).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <button
                        className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100 text-sm"
                        onClick={() => handleEdit(s)}
                      >
                        <FiEdit2 /> Editar
                      </button>
                      <button
                        className="flex items-center gap-2 border border-red-300 text-red-500 px-4 py-2 rounded hover:bg-red-50 text-sm"
                        onClick={() => handleDelete(s)}
                      >
                        <FiTrash2 /> Eliminar
                      </button>
                      
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No hay servicios para mostrar.
                </div>
              )}
            </div>
          )}
        </main>
        {/* Modal de confirmación de eliminación */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm text-center animate-[modalIn_0.2s_ease]">
              <h3 className="text-lg font-bold mb-2">¿Eliminar servicio?</h3>
              <p className="mb-6 text-gray-600">
                ¿Estás seguro que deseas eliminar{" "}
                <b>{deletingService?.Nombre}</b>? Esta acción no se puede
                deshacer.
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
                  0% { opacity: 0; transform: scale(0.95);}
                  100% { opacity: 1; transform: scale(1);}
                }
              `}
            </style>
          </div>
        )}
        {/* ...ServiceForm modal... */}
        <ServiceForm
          open={showModal}
          onClose={handleCloseModal}
          service={editingService}
          onSaved={handleSaved}
        />
      </div>
    </div>
  );
}
