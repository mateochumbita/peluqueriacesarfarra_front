import Menu from '../../components/nav/Menu';
import Navbar from '../../components/nav/Navbar';

export default function Calendar() {
  // Ejemplo de datos de turnos
  const appointments = {
    '5': [{ time: '10:00', desc: 'Corte de Pelo' }],
    '8': [{ time: '10:00', desc: 'Corte de Pelo' }],
    '12': [
      { time: '10:00', desc: 'Corte de Pelo' },
      { time: '11:30', desc: 'Coloración' },
    ],
    '15': [
      { time: '10:00', desc: 'Corte de Pelo' },
      { time: '11:30', desc: 'Coloración' },
    ],
    '19': [{ time: '10:00', desc: 'Corte de Pelo' }],
  };

  // Generar días del mes (ejemplo: abril 2025)
  const daysInMonth = 30;
  const firstDayOfWeek = 2; // 1=Lunes, 7=Domingo (ejemplo: martes)
  const weeks = [];
  let day = 1 - firstDayOfWeek + 1;
  for (let w = 0; w < 5; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      week.push(day > 0 && day <= daysInMonth ? day : null);
      day++;
    }
    weeks.push(week);
  }

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
            <h1 className="text-3xl font-bold">Calendario</h1>
            <p className="text-gray-600 text-base">Gestiona tu agenda y disponibilidad.</p>
          </div>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:opacity-90 text-sm">
            <span className="hidden sm:inline">+ Nueva Cita</span>
          </button>
        </header>

        {/* Calendario */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-lg border p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Abril 2025</h2>
                <p className="text-gray-500 text-sm">Gestiona tus Turnos y disponibilidad</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded border hover:bg-gray-100">&lt;</button>
                <button className="p-2 rounded border hover:bg-gray-100">&gt;</button>
                <select className="ml-4 border rounded px-2 py-1 text-sm">
                  <option>Semana</option>
                  <option>Mes</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4 text-center font-medium text-gray-700 mb-2">
              <div>Lun</div>
              <div>Mar</div>
              <div>Mié</div>
              <div>Jue</div>
              <div>Vie</div>
              <div>Sáb</div>
              <div>Dom</div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {weeks.map((week, wi) =>
                week.map((date, di) => (
                  <div
                    key={wi + '-' + di}
                    className={`min-h-[80px] rounded-lg border flex flex-col items-start p-2 relative ${
                      date === 5 ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    {date && (
                      <>
                        <span className="absolute top-2 right-2 text-xs text-gray-400">{date}</span>
                        <div className="flex flex-col gap-1 mt-4 w-full">
                          {appointments[date]?.map((a, i) => (
                            <div
                              key={i}
                              className="bg-gray-200 text-xs rounded px-2 py-1 mb-1 text-left"
                            >
                              {a.time} - {a.desc}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}