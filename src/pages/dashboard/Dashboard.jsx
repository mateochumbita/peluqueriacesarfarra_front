import Menu from '../../components/nav/Menu';
import Navbar from '../../components/nav/Navbar';

export default function Dashboard() {
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
            <h1 className="text-2xl font-bold">Panel Principal</h1>
            <p className="text-gray-600 text-sm">Bienvenido de nuevo, Carlos. Aquí está el resumen de tu negocio.</p>
          </div>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:opacity-90 text-sm">
            <span className="hidden sm:inline">Nueva Cita</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </button>
        </header>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Turnos Hoy</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-green-600">+2.5% respecto a ayer</div>
          </div>
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Ingresos Hoy</span>
              <span className="text-gray-400">$</span>
            </div>
            <div className="text-2xl font-bold">$320</div>
            <div className="text-xs text-green-600">+18.2% respecto a ayer</div>
          </div>
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Clientes Totales</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="text-2xl font-bold">245</div>
            <div className="text-xs text-green-600">+4 nuevos esta semana</div>
          </div>
          <div className="bg-white rounded-lg p-4 border flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Tasa de Ocupación</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 17l6-6 4 4 8-8" />
              </svg>
            </div>
            <div className="text-2xl font-bold">86%</div>
            <div className="text-xs text-green-600">+2.1% respecto a la semana pasada</div>
          </div>
        </section>

        {/* Tabs & Content */}
        <section className="flex flex-col lg:flex-row gap-4 px-8 pb-8">
          {/* Tabs & Chart */}
          <div className="flex-1 bg-white rounded-lg border p-4">
            <div className="flex gap-2 mb-4">
              <button className="px-4 py-1 rounded bg-gray-100 font-medium">Resumen</button>
              <button className="px-4 py-1 rounded hover:bg-gray-100">Turnos</button>
              <button className="px-4 py-1 rounded hover:bg-gray-100">Análisis</button>
            </div>
            <h2 className="font-bold text-xl mb-2">Resumen</h2>
            {/* Aquí podrías poner un gráfico real, esto es solo un placeholder */}
            <div className="h-40 flex items-center justify-center text-gray-400">
              <svg width="90%" height="100" viewBox="0 0 400 100">
                <polyline
                  fill="none"
                  stroke="#222"
                  strokeWidth="3"
                  points="0,80 50,60 100,70 150,50 200,60 250,40 300,80 350,60 400,30"
                />
                <polyline
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="3"
                  points="0,90 50,80 100,90 150,70 200,80 250,60 300,90 350,80 400,60"
                />
              </svg>
            </div>
          </div>
          {/* Próximos Turnos */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg border p-4">
            <h2 className="font-bold text-xl mb-2">Próximos Turnos</h2>
            <p className="text-gray-600 text-sm mb-4">Tienes 8 Turnos programadas para hoy.</p>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Juan Pérez</span>
                  <div className="text-xs text-gray-500">Corte de Pelo</div>
                </div>
                <span className="bg-gray-100 px-3 py-1 rounded text-xs font-semibold">10:00 AM</span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <span className="font-medium">María González</span>
                  <div className="text-xs text-gray-500">Coloración</div>
                </div>
                <span className="bg-gray-100 px-3 py-1 rounded text-xs font-semibold">11:30 AM</span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Carlos Rodríguez</span>
                  <div className="text-xs text-gray-500">Recorte de Barba</div>
                </div>
                <span className="bg-gray-100 px-3 py-1 rounded text-xs font-semibold">1:00 PM</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}