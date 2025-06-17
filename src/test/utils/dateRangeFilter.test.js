// src/test/utils/dateRangeFilter.test.js
import { describe, it, expect, vi } from 'vitest';
import isInRange from '../../utils/dateRangerFilter';

// prueba de parseFechaLocal que evita problemas con la zona horaria
vi.mock('../../utils/parseFechaLocal.js', () => ({
  default: (fechaStr) => {
    const [a, m, d] = fechaStr.split('-').map(Number);
    return new Date(a, m - 1, d); // Crea una fecha local sin hora
  },
}));

describe('isInRange', () => {
  const hoy = new Date();
  const formatoFecha = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  it('debería retornar true para una fecha de hoy y rango "Hoy"', () => {
    const fechaHoy = formatoFecha(hoy);
    expect(isInRange(fechaHoy, 'Hoy')).toBe(true);
  });

  it('debería retornar false para una fecha de ayer y rango "Hoy"', () => {
    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);
    expect(isInRange(formatoFecha(ayer), 'Hoy')).toBe(false);
  });

  it('debería retornar true para una fecha dentro de esta semana y rango "Esta semana"', () => {
    const diaEnSemana = new Date(hoy);
    diaEnSemana.setDate(hoy.getDate() - hoy.getDay() + 3); // Miércoles
    expect(isInRange(formatoFecha(diaEnSemana), 'Esta semana')).toBe(true);
  });

  it('debería retornar false para una fecha del mes pasado y rango "Esta semana"', () => {
    const mesPasado = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 15);
    expect(isInRange(formatoFecha(mesPasado), 'Esta semana')).toBe(false);
  });

  it('debería retornar true para una fecha dentro de este mes y rango "Este mes"', () => {
    const fechaEnMes = new Date(hoy.getFullYear(), hoy.getMonth(), 10);
    expect(isInRange(formatoFecha(fechaEnMes), 'Este mes')).toBe(true);
  });

  it('debería retornar true para cualquier fecha si el rango es desconocido', () => {
    const cualquierFecha = new Date(2000, 0, 1);
    expect(isInRange(formatoFecha(cualquierFecha), 'Otro')).toBe(true);
  });
});
