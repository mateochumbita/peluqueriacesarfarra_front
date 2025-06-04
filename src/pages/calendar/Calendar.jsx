import React, { useEffect, useState } from "react";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const navigate = useNavigate();

  const { appointments, fetchAppointments } = useAppData();

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const mapAppointmentsByDate = (appointments) => {
    if (!Array.isArray(appointments)) return {};

    return appointments.reduce((acc, appt) => {
      const dateKey = appt.Fecha;
      const entry = {
        time: appt.Hora?.slice(0, 5),
        cliente: appt.Cliente?.Nombre,
        servicio: appt.desc?.Servicio,
        estado: appt.Estado,
      };

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(entry);

      return acc;
    }, {});
  };

  const turnos = mapAppointmentsByDate(appointments);
  const citasDelDia = turnos[selectedDate.format("YYYY-MM-DD")] || [];

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startWeek = startOfMonth.startOf("week");
  const endWeek = endOfMonth.endOf("week");

  const getEstadoClass = (estado) => {
    switch (estado) {
      case "Reservado":
        return "bg-gray-200 text-gray-800 border-gray-400";
      case "Pagado":
        return "bg-green-100 text-green-900 border-green-400";
      case "Cancelado":
        return "bg-red-100 text-red-900 border-red-400";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    let current = startWeek;

    while (current.isBefore(endWeek)) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(current);
        current = current.add(1, "day");
      }
      days.push(week);
    }

    return days;
  };

  const getWeekDays = () => {
    const start = currentDate.startOf("week");
    return Array.from({ length: 7 }, (_, i) => start.add(i, "day"));
  };

  const calendarWeeks =
    view === "month" ? generateCalendarDays() : [getWeekDays()];

  const handlePrev = () => setCurrentDate((prev) => prev.subtract(1, view));
  const handleNext = () => setCurrentDate((prev) => prev.add(1, view));
  const handleViewChange = (e) => setView(e.target.value);

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col lg:flex-row">
      <Menu />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b bg-white">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Calendario</h1>
            <p className="text-gray-600 text-sm">
              Gestiona tu agenda y disponibilidad.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded hover:opacity-90 text-sm">
            <span className="hidden sm:inline">+ Nueva Cita</span>
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-auto">
          <div className="bg-white rounded-lg border p-4 sm:p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {currentDate.format("MMMM YYYY")}
                </h2>
                <p className="text-gray-500 text-sm">
                  Vista: {view === "month" ? "Mes" : "Semana"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded border hover:bg-gray-100"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded border hover:bg-gray-100"
                >
                  &gt;
                </button>
                <select
                  value={view}
                  onChange={handleViewChange}
                  className="ml-2 border rounded px-2 py-1 text-sm"
                >
                  <option value="week">Semana</option>
                  <option value="month">Mes</option>
                </select>
              </div>
            </div>

            {/* Títulos de días */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700 mb-2">
              <div>Lun</div>
              <div>Mar</div>
              <div>Mié</div>
              <div>Jue</div>
              <div>Vie</div>
              <div>Sáb</div>
              <div>Dom</div>
            </div>

            {/* Calendario */}
            <div className="grid grid-cols-7 gap-2 text-sm">
              {calendarWeeks.map((week, wi) =>
                week.map((day, di) => {
                  const dateKey = day.format("YYYY-MM-DD");
                  const citas = turnos[dateKey] || [];
                  const isToday = day.isSame(dayjs(), "day");
                  const isSelected = day.isSame(selectedDate, "day");

                  return (
                    <div
                      key={`${wi}-${di}`}
                      onClick={() => setSelectedDate(day)}
                      className={`min-h-[100px] sm:min-h-[120px] border rounded-lg p-2 relative cursor-pointer transition-all
                      ${
                        day.isSame(currentDate, "month")
                          ? "bg-white"
                          : "bg-gray-100"
                      }
                      ${isSelected ? "ring-2 ring-blue-500" : ""}
                      hover:shadow-md`}
                    >
                      <span
                        className={`absolute top-1 right-2 text-xs font-semibold ${
                          isToday ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        {day.date()}
                      </span>

                      {citas.length > 0 && (
                        <div className="absolute top-1 left-2 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                          {citas.length}
                        </div>
                      )}

                      <div className="mt-5 flex flex-col gap-1 max-h-[65px] overflow-y-auto scrollbar-thin">
                        {citas.map((cita, i) => (
                          <div
                            key={i}
                            className="bg-blue-100 text-blue-900 font-medium rounded px-1.5 py-0.5 text-xs leading-tight border border-blue-400 truncate"
                            title={`${cita.time} - ${cita.desc}`}
                          >
                            ⏰ {cita.time} - {cita.desc}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {/* Detalle del día seleccionado */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">
                Citas del {selectedDate.format("DD/MM/YYYY")}
              </h3>

              <div className="space-y-2">
                {(() => {
                  const citasDelDia =
                    turnos[selectedDate.format("YYYY-MM-DD")] || [];

                  if (citasDelDia.length === 0) {
                    return (
                      <p className="text-gray-500 text-sm">
                        No hay citas para este día.
                      </p>
                    );
                  }

                  return citasDelDia.map((cita, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded border ${getEstadoClass(
                        cita.estado
                      )}`}
                    >
                      <p className="text-sm font-medium">⏰ {cita.time}</p>
                      <p className="text-sm">
                        🧑 {cita.cliente || "Sin nombre"} — 💇{" "}
                        {cita.servicio || "Servicio no especificado"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Estado: {cita.estado}
                      </p>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
