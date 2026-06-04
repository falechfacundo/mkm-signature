import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockFetch = vi.fn();
global.fetch = mockFetch;

function createRequest(body: unknown): Request {
  return new Request('http://localhost:4321/api/whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function handlePost(request: Request) {
  vi.stubEnv('TURNSTILE_SECRET_KEY', 'test-secret');
  vi.stubEnv('WHATSAPP_NUMBER', '5491112345678');
  const { POST } = await import('../whatsapp');
  return POST({ request } as any);
}

describe('POST /api/whatsapp', () => {
  beforeEach(() => {
    vi.resetModules();
    mockFetch.mockReset();
    vi.unstubAllEnvs();
  });

  it('returns 500 when env vars are missing', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    vi.stubEnv('WHATSAPP_NUMBER', '');
    const { POST } = await import('../whatsapp');
    const response = await POST({ request: createRequest({}) } as any);
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Server misconfigured');
  });

  it('returns 400 for missing token', async () => {
    const response = await handlePost(createRequest({ message: 'Hola' }));
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Missing Turnstile token');
  });

  it('returns 403 when Turnstile verification fails', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ success: false }),
    });
    const response = await handlePost(createRequest({ token: 'invalid' }));
    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data.error).toBe('Verificación fallida');
  });

  it('returns 200 with WhatsApp URL when message is provided', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });
    const response = await handlePost(createRequest({ token: 'valid-token', message: 'Hola!' }));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('url');
    expect(data.url).toContain('wa.me/5491112345678');
    expect(data.url).toContain(encodeURIComponent('Hola!'));
  });

  it('returns 200 with phone when no message is provided', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });
    const response = await handlePost(createRequest({ token: 'valid-token' }));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('phone');
    expect(data.phone).toBe('5491112345678');
  });

  it('returns 400 for invalid JSON', async () => {
    const request = new Request('http://localhost:4321/api/whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json',
    });
    const response = await handlePost(request);
    expect(response.status).toBe(400);
  });
});
