// src/utils/dateRangeFilter.js
import parseFechaLocal from "./parseFechaLocal";

export default function isInRange(fechaStr, rangoFecha) {
  const fechaTurno = parseFechaLocal(fechaStr);
  const hoy = new Date();

  const inicioSemana = new Date(hoy);
  inicioSemana.setDate(hoy.getDate() - hoy.getDay());
  const finSemana = new Date(inicioSemana);
  finSemana.setDate(inicioSemana.getDate() + 6);

  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

  switch (rangoFecha) {
    case "Hoy":
      return (
        fechaTurno.getDate() === hoy.getDate() &&
        fechaTurno.getMonth() === hoy.getMonth() &&
        fechaTurno.getFullYear() === hoy.getFullYear()
      );
    case "Esta semana":
      return fechaTurno >= inicioSemana && fechaTurno <= finSemana;
    case "Este mes":
      return fechaTurno >= inicioMes && fechaTurno <= finMes;
    default:
      return true;
  }
}
