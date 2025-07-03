import React, { useEffect, useState } from "react";
import Menu from "../../components/client/nav/Menu";
import Navbar from "../../components/nav/Navbar";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useAppData } from "../../context/AppDataContext";
import AppointmentForm from "../../components/appointments/AppointmentForm";
dayjs.extend(isoWeek);

export default function ClientCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState("week");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedTime, setPreselectedTime] = useState(null);

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

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startWeek = startOfMonth.startOf("isoWeek");
  const endWeek = endOfMonth.endOf("isoWeek");

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

  const getWorkingHours = (day) => {
    const dayOfWeek = day.day();
    if (dayOfWeek === 0) return [];
    if (dayOfWeek === 1) return [{ start: "17:00", end: "21:00" }];
    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      return [
        { start: "10:00", end: "13:00" },
        { start: "16:00", end: "21:00" },
      ];
    }
    return [];
  };

  const generateTimeSlots = (date) => {
    const workingPeriods = getWorkingHours(date);
    const slots = [];

    workingPeriods.forEach(({ start, end }) => {
      let current = dayjs(`${date.format("YYYY-MM-DD")}T${start}`);
      const endTime = dayjs(`${date.format("YYYY-MM-DD")}T${end}`);

      while (current.isBefore(endTime)) {
        slots.push(current.format("HH:mm"));
        current = current.add(20, "minute");
      }
    });

    return slots;
  };

  const getWeekDays = () => {
    const start = currentDate.startOf("isoWeek");
    return Array.from({ length: 7 }, (_, i) => start.add(i, "day"));
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

  const calendarWeeks =
    view === "month" ? generateCalendarDays() : [getWeekDays()];

  const handlePrev = () => setCurrentDate((prev) => prev.subtract(1, view));
  const handleNext = () => setCurrentDate((prev) => prev.add(1, view));
  const handleViewChange = (e) => setView(e.target.value);

  const handleSelectTime = (date, time) => {
    setSelectedDate(date);
    setPreselectedTime(time);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col lg:flex-row">
      <Menu />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b bg-white">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Reservar turno</h1>
            <p className="text-gray-600 text-sm">
              Elegí una fecha y horario disponible.
            </p>
          </div>
        </header>

        <AppointmentForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setPreselectedTime(null);
          }}
          initialDate={selectedDate}
          initialTime={preselectedTime}
        />

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

            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700 mb-2">
              <div>Lun</div>
              <div>Mar</div>
              <div>Mié</div>
              <div>Jue</div>
              <div>Vie</div>
              <div>Sáb</div>
              <div>Dom</div>
            </div>

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

                      <div className="mt-5 flex flex-col gap-1 max-h-[65px] overflow-y-auto scrollbar-thin">
                        {citas.map((cita, i) => (
                          <div
                            key={i}
                            className="bg-blue-100 text-blue-900 font-medium rounded px-1.5 py-0.5 text-xs border border-blue-400 truncate"
                            title={`${cita.time} - ${cita.servicio}`}
                          >
                            ⏰ {cita.time} - {cita.servicio}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">
                Horarios del {selectedDate.format("DD/MM/YYYY")}
              </h3>

              {(() => {
                const dateKey = selectedDate.format("YYYY-MM-DD");
                const citasDelDia = turnos[dateKey] || [];
                const horariosOcupados = citasDelDia.map((c) => c.time);
                const horariosDisponibles = generateTimeSlots(selectedDate).filter(
                  (hora) => !horariosOcupados.includes(hora)
                );

                return (
                  <>
                    {horariosDisponibles.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {horariosDisponibles.map((hora, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded border border-green-400 bg-green-100 text-green-900 text-sm text-center cursor-pointer hover:bg-green-200"
                            onClick={() => handleSelectTime(selectedDate, hora)}
                          >
                            ⏱️ {hora}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No hay horarios disponibles para este día.
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
