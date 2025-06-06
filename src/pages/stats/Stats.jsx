import { useEffect, useState } from "react";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import { FiCalendar } from "react-icons/fi";
import { useAppData } from "../../context/AppDataContext";
import BarChart from "../../components/stats/BarChart";
import LineChart from "../../components/stats/LineChart";
const TABS = ["Ingresos", "Turnos", "Clientes"];

export default function Stats() {
  const [tab, setTab] = useState("Ingresos");

  const {
    earningsStats,
    fetchEarningsStats,
    clientsStats,
    fetchClientsStats,
    appointmentsStats,
    fetchAppointmentsStats,
  } = useAppData();
  const loading = !earningsStats || !clientsStats || !appointmentsStats;

  useEffect(() => {
    if (!earningsStats) {
      fetchEarningsStats();
    }
    if (!clientsStats) {
      fetchClientsStats();
    }
    if (!appointmentsStats) {
      fetchAppointmentsStats();
    }
  }, [
    clientsStats,
    fetchClientsStats,
    appointmentsStats,
    fetchAppointmentsStats,
    earningsStats,
    fetchEarningsStats,
  ]);

  console.log("appointmentsStats", appointmentsStats);

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
              className={`px-4 py-1 rounded ${
                tab === t ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <main className="flex-1 px-8 pb-8">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
              Cargando estadísticas...
            </div>
          ) : (
            <>
              {tab === "Ingresos" &&
                earningsStats &&
                earningsStats.ingresos && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <Card
                        title="Ingresos Hoy"
                        value={`$${earningsStats.ingresos.hoy.toLocaleString()}`}
                        desc="Actualizado al día de hoy"
                      />
                      <Card
                        title="Ingresos Semana"
                        value={`$${earningsStats.ingresos.semana.toLocaleString()}`}
                        desc={`${
                          earningsStats.ingresos.variacionSemana > 0 ? "+" : ""
                        }${
                          earningsStats.ingresos.variacionSemana
                        }% respecto a la semana anterior`}
                      />
                      <Card
                        title="Promedio Diario"
                        value={`$${earningsStats.ingresos.promedioDiario.toLocaleString()}`}
                        desc={`${
                          earningsStats.ingresos.variacionPromedioDiario > 0
                            ? "+"
                            : ""
                        }${
                          earningsStats.ingresos.variacionPromedioDiario
                        }% respecto al promedio anterior`}
                      />
                      <Card
                        title="Proyección Mensual"
                        value={`$${earningsStats.ingresos.proyeccionMes.toLocaleString()}`}
                        desc={`${
                          earningsStats.ingresos.variacionProyeccion > 0
                            ? "+"
                            : ""
                        }${
                          earningsStats.ingresos.variacionProyeccion
                        }% respecto al mes anterior`}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg border p-6">
                        <h2 className="font-bold text-2xl mb-1">
                          Ingresos por Día
                        </h2>
                        <p className="text-gray-500 mb-4">
                          Distribución de ingresos diarios este mes
                        </p>
                        <BarChart
                          title={"Ingresos por Día"}
                          formatAsCurrency
                          label="Ingresos"
                          data={earningsStats.ingresosPorDia.map((item) => ({
                            label: item.dia,
                            value: Number(item.total),
                          }))}
                        />
                      </div>

                      <div className="bg-white rounded-lg border p-6">
                        <h2 className="font-bold text-2xl mb-1">
                          Tendencia de Ingresos
                        </h2>
                        <p className="text-gray-500 mb-4">
                          Evolución de ingresos en los últimos 6 meses
                        </p>
                        <LineChart data={earningsStats.tendencia6Meses} />
                      </div>
                    </div>
                  </>
                )}

              {tab === "Turnos" && appointmentsStats && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card
                      title="Total de Turnos"
                      value={appointmentsStats.turnos.mes}
                      desc={`${
                        appointmentsStats.turnos.variacionMes > 0 ? "+" : ""
                      }${
                        appointmentsStats.turnos.variacionMes
                      }% respecto al mes anterior`}
                    />
                    <Card
                      title="Tasa de Ocupación"
                      value={`${appointmentsStats.tasaOcupacion.mes}%`}
                      desc={`${
                        appointmentsStats.tasaOcupacion.variacionMes > 0
                          ? "+"
                          : ""
                      }${
                        appointmentsStats.tasaOcupacion.variacionMes
                      }% respecto al mes anterior`}
                    />
                    <Card
                      title="Cancelaciones"
                      value={appointmentsStats.cancelaciones.mes}
                      desc={`${
                        appointmentsStats.cancelaciones.variacionMes > 0
                          ? "+"
                          : ""
                      }${
                        appointmentsStats.cancelaciones.variacionMes
                      }% respecto al mes anterior`}
                    />
                  </div>
                  <div className="bg-white rounded-lg border p-6">
                    <h2 className="font-bold text-2xl mb-1">
                      Distribución de Turnos
                    </h2>
                    <p className="text-gray-500 mb-4">
                      Distribución de Turnos por día de la semana
                    </p>
                    <BarChart
                      label={"Turnos"}
                      title={"Turnos por Día"}
                      data={appointmentsStats.turnosPorDia.map((item) => ({
                        label: item.dia,
                        value: Number(item.cantidad),
                      }))}
                    />
                  </div>
                </>
              )}

              {tab === "Clientes" && clientsStats && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card
                      title="Total de Clientes (Mes)"
                      value={clientsStats.clientes.mes}
                      desc={`${
                        clientsStats.clientes.variacionMes > 0 ? "+" : ""
                      }${
                        clientsStats.clientes.variacionMes
                      }% respecto al mes anterior`}
                    />
                    <Card
                      title="Clientes Recurrentes"
                      value={clientsStats.recurrentes}
                      desc="Clientes con más de una visita"
                    />
                    <Card
                      title="Clientes esta Semana"
                      value={clientsStats.clientes.semana}
                      desc={`${
                        clientsStats.clientes.variacionSemana > 0 ? "+" : ""
                      }${
                        clientsStats.clientes.variacionSemana
                      }% vs semana anterior`}
                    />
                    <Card
                      title="Clientes Hoy"
                      value={clientsStats.clientes.hoy}
                      desc="Visitas registradas hoy"
                    />
                  </div>

                  <div className="bg-white rounded-lg border p-6">
                    <h2 className="font-bold text-2xl mb-1">
                      Ranking de Clientes
                    </h2>
                    <p className="text-gray-500 mb-4">
                      Top por puntos de fidelidad
                    </p>
                    <ul className="divide-y">
                      {clientsStats.ranking?.map((cliente) => (
                        <li
                          key={cliente.Id}
                          className="py-2 flex justify-between"
                        >
                          <div>
                            <div className="font-medium">{cliente.Nombre}</div>
                            <div className="text-sm text-gray-500">
                              {cliente.Email}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Puntos</div>
                            <div className="font-bold">
                              {cliente.PuntosFidelidad}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function Card({ title, value, desc }) {
  return (
    <div className="bg-white rounded-lg border p-6 flex flex-col justify-between min-h-[110px]">
      <div className="text-gray-600 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-gray-500 text-xs">{desc}</div>
    </div>
  );
}
