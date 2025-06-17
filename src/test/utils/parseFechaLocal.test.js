import { describe, it, expect } from 'vitest';
import parseFechaLocal from '../../utils/parseFechaLocal'; // Ajustá la ruta si está en otro archivo


//prueba de parseFechaLocal
describe('parseFechaLocal', () => {
  it('debería convertir una fecha en formato YYYY-MM-DD a un objeto Date local', () => {
    const input = '2023-06-17';
    const result = parseFechaLocal(input);
    const expected = new Date(2023, 5, 17); // mes 5 = junio

    expect(result.getFullYear()).toBe(expected.getFullYear());
    expect(result.getMonth()).toBe(expected.getMonth());
    expect(result.getDate()).toBe(expected.getDate());
  });

  it('debería manejar fechas con ceros a la izquierda', () => {
    const input = '2025-01-05';
    const result = parseFechaLocal(input);
    

    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(5);
  });

  it('debería devolver una fecha inválida si el string no tiene el formato correcto', () => {
    const input = '17-06-2023'; // Formato incorrecto
    const result = parseFechaLocal(input);
    
    // Resultado será un objeto Date pero inválido
    expect(isNaN(result.getTime())).toBe(true);
  });
});
