import { describe, it, expect } from 'vitest';
import { SITE } from '../site';

describe('SITE', () => {
  it('has a name', () => {
    expect(SITE.name).toBe('MKM Signature');
  });

  it('has a tagline', () => {
    expect(SITE.tagline).toBe('Barbería a domicilio');
  });

  it('has a valid URL', () => {
    expect(() => new URL(SITE.url)).not.toThrow();
    expect(SITE.url).toContain('https://');
  });

  it('has an instagram URL', () => {
    expect(SITE.instagramUrl).toContain('instagram.com');
  });

  it('has a contact email', () => {
    expect(SITE.contactEmail).toContain('@');
  });

  it('has a cover zone', () => {
    expect(typeof SITE.coverZone).toBe('string');
    expect(SITE.coverZone.length).toBeGreaterThan(0);
  });
});
