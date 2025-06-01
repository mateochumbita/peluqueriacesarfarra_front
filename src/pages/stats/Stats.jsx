import { useState } from "react";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import { FiCalendar } from "react-icons/fi";

const TABS = ["Ingresos", "Turnos", "Clientes", "Servicios"];

export default function Stats() {
  const [tab, setTab] = useState("Ingresos");

  // Puedes reemplazar estos datos por tus datos reales
  const ingresos = {
    total: 4320,
    promedio: 144,
    rentable: "Coloración",
    rentableMonto: 1280,
    proyeccion: 5100,
    tendencia: [200, 180, 220, 260, 170, 300],
    porDia: [220, 140, 170, 250, 280, 320, 110],
  };
  const turnos = {
    total: 124,
    ocupacion: 86,
    cancelaciones: 8,
    masOcupado: "Sábado",
    masOcupadoTurnos: 32,
    distribucion: [24, 15, 19, 28, 32, 36, 10],
  };
  const clientes = {
    total: 245,
    recurrentes: 178,
    nuevos: 12,
    valorPromedio: 35,
    tendencia: [5, 4, 6, 3, 7, 8],
  };
  const servicios = {
    popular: "Corte de Pelo",
    popularCantidad: 42,
    rentable: "Coloración",
    rentableMonto: 1280,
    duracion: 45,
    total: 124,
    distribucion: [24, 15, 19, 28, 32, 36, 10],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Menu />
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 px-8 pt-8 pb-4">
          <select className="border rounded px-3 py-2 text-sm">
            <option>Este mes</option>
            <option>Este año</option>
          </select>
          <button className="flex items-center gap-2 border px-4 py-2 rounded text-sm hover:bg-gray-100">
            <FiCalendar /> Rango de fechas
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-8 mb-4">
          {TABS.map((t) => (
            <button
              key={t}
              className={`px-4 py-1 rounded ${tab === t ? "bg-gray-100 font-medium" : "hover:bg-gray-100"}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <main className="flex-1 px-8 pb-8">
          {tab === "Ingresos" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card title="Ingresos Totales" value={`$${ingresos.total.toLocaleString()}`} desc="+12.5% respecto al mes anterior" />
                <Card title="Promedio Diario" value={`$${ingresos.promedio}`} desc="+5.2% respecto al mes anterior" />
                <Card title="Servicio Más Rentable" value={ingresos.rentable} desc={`$${ingresos.rentableMonto.toLocaleString()} este mes`} />
                <Card title="Proyección Mensual" value={`$${ingresos.proyeccion.toLocaleString()}`} desc="+18.1% respecto al mes anterior" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="font-bold text-2xl mb-1">Ingresos por Día</h2>
                  <p className="text-gray-500 mb-4">Distribución de ingresos diarios este mes</p>
                  <BarChart data={ingresos.porDia} labels={["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"]} />
                </div>
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="font-bold text-2xl mb-1">Tendencia de Ingresos</h2>
                  <p className="text-gray-500 mb-4">Evolución de ingresos en los últimos 6 meses</p>
                  <LineChart data={ingresos.tendencia} />
                </div>
              </div>
            </>
          )}

          {tab === "Turnos" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card title="Total de Turnos" value={turnos.total} desc="+8.3% respecto al mes anterior" />
                <Card title="Tasa de Ocupación" value={`${turnos.ocupacion}%`} desc="+2.1% respecto al mes anterior" />
                <Card title="Cancelaciones" value={turnos.cancelaciones} desc="-3.5% respecto al mes anterior" />
                <Card title="Día Más Ocupado" value={turnos.masOcupado} desc={`${turnos.masOcupadoTurnos} Turnos este mes`} />
              </div>
              <div className="bg-white rounded-lg border p-6">
                <h2 className="font-bold text-2xl mb-1">Distribución de Turnos</h2>
                <p className="text-gray-500 mb-4">Distribución de Turnos por día de la semana</p>
                <BarChart data={turnos.distribucion} labels={["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"]} />
              </div>
            </>
          )}

          {tab === "Clientes" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card title="Total de Clientes" value={clientes.total} desc="+4 nuevos este mes" />
                <Card title="Clientes Recurrentes" value={clientes.recurrentes} desc="72.6% del total" />
                <Card title="Nuevos Clientes" value={clientes.nuevos} desc="+33.3% respecto al mes anterior" />
                <Card title="Valor Promedio" value={`$${clientes.valorPromedio}`} desc="Por cliente" />
              </div>
              <div className="bg-white rounded-lg border p-6">
                <h2 className="font-bold text-2xl mb-1">Nuevos Clientes</h2>
                <p className="text-gray-500 mb-4">Tendencia de adquisición de nuevos clientes</p>
                <LineChart data={clientes.tendencia} />
              </div>
            </>
          )}

          {tab === "Servicios" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card title="Servicio Más Popular" value={servicios.popular} desc={`${servicios.popularCantidad} este mes`} />
                <Card title="Servicio Más Rentable" value={servicios.rentable} desc={`$${servicios.rentableMonto.toLocaleString()} este mes`} />
                <Card title="Duración Promedio" value={`${servicios.duracion} min`} desc="Por servicio" />
                <Card title="Total de Servicios" value={servicios.total} desc="Este mes" />
              </div>
              <div className="bg-white rounded-lg border p-6">
                <h2 className="font-bold text-2xl mb-1">Distribución de Servicios</h2>
                <p className="text-gray-500 mb-4">Distribución de servicios por popularidad</p>
                <BarChart data={servicios.distribucion} labels={["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"]} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// Card para los KPIs
function Card({ title, value, desc }) {
  return (
    <div className="bg-white rounded-lg border p-6 flex flex-col justify-between min-h-[110px]">
      <div className="text-gray-600 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-gray-500 text-xs">{desc}</div>
    </div>
  );
}

// Gráfico de barras simple SVG
function BarChart({ data, labels }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-2 h-48 w-full">
      {data.map((v, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div
            className="bg-gray-800 rounded-t w-7"
            style={{ height: `${(v / max) * 140 + 30}px` }}
          />
          <div className="text-xs text-gray-600 mt-2">{labels ? labels[i] : i + 1}</div>
        </div>
      ))}
    </div>
  );
}

// Gráfico de líneas simple SVG
function LineChart({ data }) {
  const max = Math.max(...data, 1);
  const points = data
    .map((v, i) => `${(i * 100) / (data.length - 1)},${150 - (v / max) * 120}`)
    .join(" ");
  return (
    <svg width="100%" height="170" viewBox="0 0 600 170">
      <polyline
        fill="none"
        stroke="#222"
        strokeWidth="3"
        points={data
          .map(
            (v, i) =>
              `${(i * 600) / (data.length - 1)},${150 - (v / max) * 120}`
          )
          .join(" ")}
      />
      {data.map((v, i) => (
        <circle
          key={i}
          cx={(i * 600) / (data.length - 1)}
          cy={150 - (v / max) * 120}
          r="5"
          fill="#222"
        />
      ))}
    </svg>
  );
}