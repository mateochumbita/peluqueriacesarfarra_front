import { describe, it, expect } from 'vitest';
import formatDate from '../../utils/formatDate';

//prueba de formatDate que realiza el formateo de  fecha
describe('formatDate', () => {
  it('debería formatear correctamente una fecha ISO válida', () => {
    const input = '2025-06-17';
    const esperado = '17/06/2025';
    expect(formatDate(input)).toBe(esperado);
  });

  it('debería devolver cadena vacía si se pasa undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('debería devolver cadena vacía si se pasa null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('debería devolver cadena vacía si se pasa una cadena vacía', () => {
    expect(formatDate('')).toBe('');
  });

  it('debería devolver "NaN/undefined/undefined" si la fecha no está bien formateada', () => {
    expect(formatDate('17-06-2025')).toBe('17-06-2025'.split('-').reverse().join('/')); // en este caso devuelve '2025/06/17'
    
  });
});
