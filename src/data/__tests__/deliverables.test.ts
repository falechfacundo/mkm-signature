import { describe, it, expect } from 'vitest';
import { DELIVERABLES } from '../deliverables';

describe('DELIVERABLES', () => {
  it('has entries for all services', () => {
    const services = ['corte', 'corte_barba', 'barba'];
    for (const svc of services) {
      expect(DELIVERABLES).toHaveProperty(svc);
    }
  });

  it('each service has 5 deliverables', () => {
    expect(DELIVERABLES.corte).toHaveLength(5);
    expect(DELIVERABLES.corte_barba).toHaveLength(5);
    expect(DELIVERABLES.barba).toHaveLength(5);
  });

  it('each deliverable has icon, title, and desc', () => {
    for (const svc of Object.values(DELIVERABLES)) {
      for (const item of svc) {
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('desc');
        expect(typeof item.icon).toBe('string');
        expect(typeof item.title).toBe('string');
        expect(typeof item.desc).toBe('string');
      }
    }
  });

  it('all services have Higiene total as last item', () => {
    const last = DELIVERABLES.corte[4];
    expect(last.title).toBe('Higiene total');
  });
});
