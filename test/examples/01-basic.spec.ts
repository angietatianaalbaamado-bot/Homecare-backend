/**
 * ============================================
 * NIVEL 1: TESTS BÁSICOS - PRIMEROS PASOS
 * ============================================
 *
 * Aquí aprenderás los conceptos más básicos de testing:
 * - Qué es un test
 * - Cómo se estructura un test
 * - Cómo ejecutar tests
 */

import { describe, it } from "node:test";

export {}; // ✅ evita errores con Jest/Vitest (define describe, it, expect)

/**
 * describe() agrupa tests relacionados
 * Es como una carpeta que organiza tus tests
 */
describe('Mis Primeros Tests', () => {
  it('mi primer test - siempre pasa', () => {
    // Este test no hace nada, solo pasa
  });

  it('prueba una suma simple', () => {
    const resultado = 2 + 2;
    expect(resultado).toBe(4);
  });

  it('prueba una resta', () => {
    const resultado = 10 - 3;
    expect(resultado).toBe(7);
  });

  it('compara textos', () => {
    const nombre = 'Juan';
    expect(nombre).toBe('Juan');
  });

  it('compara booleanos', () => {
    const esMayorDeEdad = true;
    expect(esMayorDeEdad).toBe(true);
  });

  it('verifica que algo NO sea igual', () => {
    const numero = 5;
    expect(numero).not.toBe(10);
  });
});

/**
 * ============================================
 * TESTS CON DIFERENTES MATCHERS (COMPARADORES)
 * ============================================
 */
describe('Aprendiendo Matchers', () => {
  it('toBe - compara valores exactos', () => {
    expect(2 + 2).toBe(4);
    expect('hola').toBe('hola');
    expect(true).toBe(true);
  });

  it('toEqual - compara objetos', () => {
    const persona = { nombre: 'Ana', edad: 25 };
    expect(persona).toEqual({ nombre: 'Ana', edad: 25 });
  });

  it('toEqual - compara arrays', () => {
    const numeros = [1, 2, 3];
    expect(numeros).toEqual([1, 2, 3]);
  });

  it('toBeTruthy - verifica valores verdaderos', () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect('texto').toBeTruthy();
    expect([]).toBeTruthy();
  });

  it('toBeFalsy - verifica valores falsos', () => {
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
  });

  it('verifica null', () => {
    const valor = null;
    expect(valor).toBeNull();
  });

  it('verifica undefined', () => {
    let valor;
    expect(valor).toBeUndefined();
  });

  it('verifica si está definido', () => {
    const valor = 'algo';
    expect(valor).toBeDefined();
  });

  it('compara números - mayor que', () => {
    expect(10).toBeGreaterThan(5);
  });

  it('compara números - mayor o igual que', () => {
    expect(10).toBeGreaterThanOrEqual(10);
  });

  it('compara números - menor que', () => {
    expect(5).toBeLessThan(10);
  });

  it('compara números - menor o igual que', () => {
    expect(5).toBeLessThanOrEqual(5);
  });

  it('verifica si un string contiene otro', () => {
    const texto = 'Hola Mundo';
    expect(texto).toContain('Mundo');
  });

  it('verifica si un string coincide con una expresión regular', () => {
    const email = 'test@example.com';
    expect(email).toMatch(/@/);
    expect(email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
  });

  it('verifica si un array contiene un elemento', () => {
    const frutas = ['manzana', 'banana', 'naranja'];
    expect(frutas).toContain('banana');
  });

  it('verifica la longitud de un array', () => {
    const numeros = [1, 2, 3, 4, 5];
    expect(numeros).toHaveLength(5);
  });

  it('verifica si un objeto tiene una propiedad', () => {
    const usuario = { nombre: 'Pedro', edad: 30 };
    expect(usuario).toHaveProperty('nombre');
    expect(usuario).toHaveProperty('nombre', 'Pedro');
  });
});


function expect(resultado: number) {
  throw new Error("Function not implemented.");
}
/**
 * ============================================
 * TESTS CON FUNCIONES
 * =========*
/*
 Algún comentario
*/
