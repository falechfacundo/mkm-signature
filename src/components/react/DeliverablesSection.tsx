'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { SERVICES } from '@config/services';
import { DELIVERABLES } from '@data/deliverables';
import { useTurnstile } from '@lib/useTurnstile';
import BeforeAfterGallery from '@components/react/BeforeAfterGallery';
import type { ServiceConfig } from '@config/services';

interface Props {
  service: ServiceConfig;
}

const serviceIds = ['corte', 'corte_barba', 'barba'] as const;

export default function DeliverablesSection({ service: _active }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { execute } = useTurnstile();

  const handleBook = async (id: string, label: string) => {
    if (loadingId) return;
    setLoadingId(id);
    try {
      const token = await execute();
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, message: `Hola! Quiero reservar ${label}` }),
      });
      if (!res.ok) throw new Error('Error');
      const data = await res.json();
      window.open(data.url, '_blank');
    } catch {
      alert('Error al procesar la solicitud. Intentalo de nuevo.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section id="servicios" style={{ background: 'var(--bg-primary)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '35rem',
          height: '35rem',
          borderRadius: '999px',
          background: 'radial-gradient(circle, rgba(212,167,44,0.04) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.17, 0.67, 0.29, 1] }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
            Servicios y precios
          </span>
          <h2 style={{ marginTop: '0.65rem', marginBottom: '0.75rem', fontSize: 'clamp(2rem,4vw,2.8rem)' }}>
            Elegí tu servicio
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Precios fijos, sin sorpresas. Todo incluye domicilio en zona de cobertura.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gap: '1.25rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            alignItems: 'start',
          }}
        >
          {serviceIds.map((id, i) => {
            const svc = SERVICES[id];
            const features = DELIVERABLES[id];
            const isPopular = id === 'corte_barba';

            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.17, 0.67, 0.29, 1],
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                style={{
                  position: 'relative',
                  border: `1px solid ${isPopular ? 'color-mix(in srgb, var(--accent) 50%, transparent)' : 'var(--bg-border)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  background: isPopular
                    ? 'linear-gradient(180deg, rgba(20,30,54,0.95), rgba(14,22,40,0.95))'
                    : 'linear-gradient(180deg, rgba(20,20,20,0.9), rgba(14,14,14,0.9))',
                  boxShadow: isPopular ? '0 0 40px rgba(212,167,44,0.08)' : 'none',
                  overflow: 'hidden',
                }}
              >
                {isPopular && (
                  <motion.div
                    initial={{ x: '100%' }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4, ease: [0.17, 0.67, 0.29, 1] }}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '-1.75rem',
                      background: 'var(--accent)',
                      color: '#080c14',
                      padding: '0.25rem 2rem',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      transform: 'rotate(45deg)',
                    }}
                  >
                    Más elegido
                  </motion.div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {isPopular ? 'Combo recomendado' : 'Servicio'}
                    </span>
                    <h3 style={{ margin: '0.3rem 0 0', fontSize: '1.35rem' }}>{svc.label}</h3>
                  </div>

                  <div>
                    <span style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                      {svc.price}
                    </span>
                    <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginLeft: '0.3rem' }}>
                      / sesión
                    </span>
                  </div>

                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {features.slice(0, 4).map((f) => (
                      <motion.li
                        key={f.title}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                        style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}
                      >
                        <Check size={14} color="var(--accent)" style={{ flexShrink: 0 }} />
                        <span>
                          <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{f.title}</strong> — {f.desc}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => handleBook(id, svc.label)}
                    disabled={loadingId === id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      padding: '0.85rem 1.5rem',
                      background: isPopular ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
                      color: isPopular ? '#080c14' : 'var(--text-secondary)',
                      border: isPopular ? 'none' : '1px solid var(--bg-border)',
                      borderRadius: '12px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: loadingId === id ? 'not-allowed' : 'pointer',
                      opacity: loadingId === id ? 0.7 : 1,
                    }}
                  >
                    {loadingId === id ? (
                      <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                    {loadingId === id ? 'Verificando...' : svc.ctaLabel}
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <BeforeAfterGallery />
      </div>
    </section>
  );
}
