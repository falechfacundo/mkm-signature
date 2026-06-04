import { describe, it, expect } from 'vitest';
import { FAQ_UNIVERSAL, FAQ_BY_SERVICE, getFAQs } from '../faq';

describe('FAQ data', () => {
  it('has 4 universal FAQ items', () => {
    expect(FAQ_UNIVERSAL).toHaveLength(4);
  });

  it('each universal item has q and a fields', () => {
    for (const item of FAQ_UNIVERSAL) {
      expect(item).toHaveProperty('q');
      expect(item).toHaveProperty('a');
      expect(typeof item.q).toBe('string');
      expect(typeof item.a).toBe('string');
    }
  });

  it('has FAQ_BY_SERVICE for all services', () => {
    const services = ['corte', 'corte_barba', 'barba'];
    for (const svc of services) {
      expect(FAQ_BY_SERVICE).toHaveProperty(svc);
      expect(Array.isArray(FAQ_BY_SERVICE[svc])).toBe(true);
    }
  });

  it('each service has 2 specific FAQ items', () => {
    expect(FAQ_BY_SERVICE.corte).toHaveLength(2);
    expect(FAQ_BY_SERVICE.corte_barba).toHaveLength(2);
    expect(FAQ_BY_SERVICE.barba).toHaveLength(2);
  });
});

describe('getFAQs', () => {
  it('returns universal + service-specific FAQs', () => {
    const result = getFAQs('corte');
    expect(result).toHaveLength(FAQ_UNIVERSAL.length + FAQ_BY_SERVICE.corte.length);
  });

  it('includes universal items first', () => {
    const result = getFAQs('barba');
    expect(result[0].q).toBe(FAQ_UNIVERSAL[0].q);
    expect(result[1].q).toBe(FAQ_UNIVERSAL[1].q);
  });

  it('returns correct service-specific items', () => {
    const result = getFAQs('corte_barba');
    const specificStart = FAQ_UNIVERSAL.length;
    expect(result[specificStart].q).toBe(FAQ_BY_SERVICE.corte_barba[0].q);
  });
});
