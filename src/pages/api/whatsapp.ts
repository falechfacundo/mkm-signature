import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  const phone = import.meta.env.WHATSAPP_NUMBER;

  if (!secret || !phone) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 });
  }

  let body: { token?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { token, message } = body;

  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing Turnstile token' }), { status: 400 });
  }

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  });

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return new Response(JSON.stringify({ error: 'Verificación fallida' }), { status: 403 });
  }

  if (message) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    return new Response(JSON.stringify({ url }), { status: 200 });
  }

  return new Response(JSON.stringify({ phone }), { status: 200 });
};
