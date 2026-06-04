import { describe, it, expect } from 'vitest';
import { PROCESS_STEPS } from '../process';

describe('PROCESS_STEPS', () => {
  it('has 5 steps', () => {
    expect(PROCESS_STEPS).toHaveLength(5);
  });

  it('each step has number, title, desc, and duration', () => {
    for (const step of PROCESS_STEPS) {
      expect(step).toHaveProperty('number');
      expect(step).toHaveProperty('title');
      expect(step).toHaveProperty('desc');
      expect(step).toHaveProperty('duration');
      expect(typeof step.number).toBe('string');
      expect(typeof step.title).toBe('string');
      expect(typeof step.desc).toBe('string');
      expect(typeof step.duration).toBe('string');
    }
  });

  it('steps are numbered sequentially', () => {
    expect(PROCESS_STEPS[0].number).toBe('01');
    expect(PROCESS_STEPS[1].number).toBe('02');
    expect(PROCESS_STEPS[2].number).toBe('03');
    expect(PROCESS_STEPS[3].number).toBe('04');
    expect(PROCESS_STEPS[4].number).toBe('05');
  });

  it('first step is Contacto', () => {
    expect(PROCESS_STEPS[0].title).toBe('Contacto');
  });

  it('last step is Seguimiento', () => {
    expect(PROCESS_STEPS[4].title).toBe('Seguimiento');
  });
});
