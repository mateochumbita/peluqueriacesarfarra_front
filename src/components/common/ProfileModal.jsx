import { FiUser, FiMail, FiPhone, FiCalendar, FiTag, FiX } from "react-icons/fi";
import { useAppData } from "../../context/AppDataContext";

export default function ProfileModal({ open, onClose, profileId }) {
  const { clients, hairdressers, users } = useAppData();

  if (!open) return null;

  const client = clients?.find((c) => String(c.Id) === String(profileId));
  const hairdresser = hairdressers?.find((h) => String(h.Id) === String(profileId));
  const profile = client || hairdresser;
  const type = client ? "Cliente" : hairdresser ? "Peluquero" : null;
  const user = users?.find((u) => String(u.Id) === String(profile?.IdUser));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[2px] transition-all">
      <div className="bg-white rounded-lg shadow-2xl px-6 py-4 w-full max-w-md relative animate-[modalIn_0.25s_ease]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>

        {!profile ? (
          <p className="text-gray-500">Perfil no encontrado.</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-1">Perfil de {type}</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Información detallada del {type.toLowerCase()}.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-3xl">
                <FiUser />
              </div>
              <div>
                <div className="text-xl font-semibold">{profile.Nombre}</div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FiUser className="text-gray-500" />
                <span className="font-medium w-32">Username:</span>
                <span>{user?.Username || "No especificado"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-500" />
                <span className="font-medium w-32">Fecha de Registro:</span>
                <span>{profile.FechaRegistro ? new Date(profile.FechaRegistro).toLocaleDateString() : "No disponible"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-gray-500" />
                <span className="font-medium w-32">Teléfono:</span>
                <span>{profile.Telefono || "No disponible"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-gray-500" />
                <span className="font-medium w-32">Email:</span>
                <span>{profile.Email || "No disponible"}</span>
              </div>
              {client && (
                <div className="flex items-center gap-2">
                  <FiTag className="text-gray-500" />
                  <span className="font-medium w-32">Puntos Fidelidad:</span>
                  <span>{client.PuntosFidelidad}</span>
                </div>
              )}
            </div>
          </>
        )}
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
  );
}
