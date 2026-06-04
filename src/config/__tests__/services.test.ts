import { describe, it, expect } from 'vitest';
import { SERVICES, DEFAULT_SERVICE } from '../services';
import type { ServiceId } from '../services';

describe('SERVICES', () => {
  it('has exactly 3 services', () => {
    expect(Object.keys(SERVICES)).toHaveLength(3);
  });

  it('has all required fields for each service', () => {
    const requiredFields = ['id', 'label', 'headline', 'subheadline', 'faqKey', 'ctaLabel', 'price'];
    for (const svc of Object.values(SERVICES)) {
      for (const field of requiredFields) {
        expect(svc).toHaveProperty(field);
        expect(typeof svc[field as keyof typeof svc]).toBe('string');
      }
    }
  });

  it('each id matches its key', () => {
    for (const [key, svc] of Object.entries(SERVICES)) {
      expect(svc.id).toBe(key);
    }
  });

  it('faqKey matches service id', () => {
    for (const svc of Object.values(SERVICES)) {
      expect(svc.faqKey).toBe(svc.id);
    }
  });

  it('each service has a non-empty price', () => {
    for (const svc of Object.values(SERVICES)) {
      expect(svc.price.length).toBeGreaterThan(0);
    }
  });

  it('services have specific labels', () => {
    expect(SERVICES.corte.label).toBe('Corte Premium');
    expect(SERVICES.corte_barba.label).toBe('Corte + Barba');
    expect(SERVICES.barba.label).toBe('Barba Profesional');
  });
});

describe('DEFAULT_SERVICE', () => {
  it('is corte', () => {
    expect(DEFAULT_SERVICE).toBe('corte');
  });

  it('is a valid ServiceId', () => {
    const validIds: ServiceId[] = ['corte', 'corte_barba', 'barba'];
    expect(validIds).toContain(DEFAULT_SERVICE);
  });
});
