'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SITE } from '@config/site';
import { useTurnstile } from '@lib/useTurnstile';
import type { HubParams } from '@lib/params';
import type { ServiceConfig } from '@config/services';

interface Props {
  params: HubParams;
  service: ServiceConfig;
}

export default function CTASection({ params, service }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const [loading, setLoading] = useState(false);
  const { execute } = useTurnstile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1.2]);

  return (
    <section id="reservar" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)', padding: '6rem 0' }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          scale: bgScale,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, rgba(212,167,44,0.08) 0%, transparent 62%)',
        }}
      />

      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <img src="/logo-cara.svg" alt="" style={{ display: 'block', width: 24, height: 'auto', filter: 'brightness(0) invert(1)' }} />
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.72rem' }}>
            {SITE.name}
          </span>
        </div>
        <h2 style={{ margin: '1rem 0 0.8rem', fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1.05 }}>
          Reservá tu turno hoy.
        </h2>
        <p style={{ margin: '0 auto', maxWidth: '40rem', color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7 }}>
          {service.label} en tu domicilio. Sin filas, sin esperas, con resultados profesionales.
        </p>

        <motion.button
          onClick={async () => {
            if (loading) return;
            setLoading(true);
            try {
              const token = await execute();
              const res = await fetch('/api/whatsapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, message: `Hola! Quiero info sobre ${service.label}` }),
              });
              if (!res.ok) throw new Error('Error');
              const data = await res.json();
              window.open(data.url, '_blank');
            } catch {
              alert('Error al procesar la solicitud. Intentalo de nuevo.');
            } finally {
              setLoading(false);
            }
          }}
          animate={
            isInView
              ? {
                  boxShadow: [
                    '0 0 0 rgba(212,167,44,0.0)',
                    '0 0 26px rgba(212,167,44,0.35)',
                    '0 0 0 rgba(212,167,44,0.0)',
                  ],
                }
              : { boxShadow: '0 0 0 rgba(212,167,44,0.0)' }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
            padding: '1rem 2.2rem',
            borderRadius: '10px',
            border: 'none',
            background: 'var(--accent)',
            color: '#080c14',
            fontWeight: 700,
            fontSize: '1.05rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          )}
          {loading ? 'Verificando...' : service.ctaLabel}
        </motion.button>

        <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Consultame antes{' '}
          <a href={`mailto:${SITE.contactEmail}`} style={{ color: 'var(--accent)' }}>
            por email
          </a>
        </p>

        <p className="mono" style={{ marginTop: '1.2rem', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
          Respuesta en menos de 1h · Sin compromiso
        </p>
      </div>
    </section>
  );
}
