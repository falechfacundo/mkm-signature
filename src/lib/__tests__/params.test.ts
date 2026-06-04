import { describe, it, expect } from 'vitest';
import { parseParams } from '../params';

describe('parseParams', () => {
  it('returns defaults when no params are provided', () => {
    const url = new URL('https://example.com');
    const result = parseParams(url);
    expect(result).toEqual({ service: 'corte', client: null, lang: 'es' });
  });

  it('extracts service from query param', () => {
    const url = new URL('https://example.com?service=corte_barba');
    const result = parseParams(url);
    expect(result.service).toBe('corte_barba');
  });

  it('falls back to default service for invalid service', () => {
    const url = new URL('https://example.com?service=invalid');
    const result = parseParams(url);
    expect(result.service).toBe('corte');
  });

  it('extracts client param', () => {
    const url = new URL('https://example.com?client=juan');
    const result = parseParams(url);
    expect(result.client).toBe('juan');
  });

  it('returns null client when not provided', () => {
    const url = new URL('https://example.com');
    const result = parseParams(url);
    expect(result.client).toBeNull();
  });

  it('parses lang as en', () => {
    const url = new URL('https://example.com?lang=en');
    const result = parseParams(url);
    expect(result.lang).toBe('en');
  });

  it('defaults lang to es for non-en values', () => {
    const url = new URL('https://example.com?lang=fr');
    const result = parseParams(url);
    expect(result.lang).toBe('es');
  });

  it('defaults lang to es when not provided', () => {
    const url = new URL('https://example.com');
    const result = parseParams(url);
    expect(result.lang).toBe('es');
  });

  it('handles all valid services', () => {
    const services = ['corte', 'corte_barba', 'barba'];
    for (const service of services) {
      const url = new URL(`https://example.com?service=${service}`);
      expect(parseParams(url).service).toBe(service);
    }
  });
});
