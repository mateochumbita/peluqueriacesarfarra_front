import { describe, it, expect } from 'vitest';
import parseFechaLocal from '../../utils/parseFechaLocal';


//prueba de parseFechaLocal
describe('parseFechaLocal', () => {
  it('debería convertir correctamente una fecha en formato YYYY-MM-DD a un objeto Date válido', () => {
    const fechaStr = '2025-06-17';
    const resultado = parseFechaLocal(fechaStr);
    expect(resultado.getFullYear()).toBe(2025);
    expect(resultado.getMonth()).toBe(5); // Junio (mes 6 - 1)
    expect(resultado.getDate()).toBe(17);
  });

  it('debería manejar ceros a la izquierda en el mes y día', () => {
    const fechaStr = '2025-01-05';
    const resultado = parseFechaLocal(fechaStr);
    expect(resultado.getFullYear()).toBe(2025);
    expect(resultado.getMonth()).toBe(0); // Enero
    expect(resultado.getDate()).toBe(5);
  });

  it('debería devolver una fecha inválida si el formato es incorrecto (sin guiones)', () => {
    const resultado = parseFechaLocal('17062025');
    expect(resultado.toString()).toBe('Invalid Date');
  });

  it('debería devolver una fecha inválida si el formato está invertido (DD-MM-YYYY)', () => {
    const resultado = parseFechaLocal('17-06-2025');
    expect(resultado.toString()).toBe('Invalid Date');
  });

  it('debería devolver Invalid Date si la fecha está vacía', () => {
    const resultado = parseFechaLocal('');
    expect(resultado.toString()).toBe('Invalid Date');
  });

  it('debería devolver Invalid Date si la fecha es null', () => {
    const resultado = parseFechaLocal(null);
    expect(resultado.toString()).toBe('Invalid Date');
  });

  it('debería devolver Invalid Date si la fecha es undefined', () => {
    const resultado = parseFechaLocal(undefined);
    expect(resultado.toString()).toBe('Invalid Date');
  });

  it('debería devolver Invalid Date si la fecha tiene más o menos de 3 partes', () => {
    const resultado1 = parseFechaLocal('2025-06');
    const resultado2 = parseFechaLocal('2025-06-17-01');
    expect(resultado1.toString()).toBe('Invalid Date');
    expect(resultado2.toString()).toBe('Invalid Date');
  });

  it('debería devolver una fecha inválida si alguna parte no es numérica', () => {
    const resultado = parseFechaLocal('2025-AB-17');
    expect(resultado.toString()).toBe('Invalid Date');
  });
});
