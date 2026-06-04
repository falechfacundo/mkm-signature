'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Gift, Scissors, Sparkles, ChevronRight } from 'lucide-react';
import { useTurnstile } from '@lib/useTurnstile';
import { SITE } from '@config/site';

const STEPS = [
  { count: 3, label: 'regalo sorpresa', icon: Gift },
  { count: 7, label: 'corte de regalo', icon: Scissors },
  { count: 10, label: 'upgrade premium gratis', icon: Sparkles },
];

export default function LoyaltySection() {
  const [loading, setLoading] = useState(false);
  const { execute } = useTurnstile();

  const handleWhatsApp = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const token = await execute();
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, message: 'Hola! Quiero consultar mi progreso en Beneficios MKM' }),
      });
      if (!res.ok) throw new Error('Error');
      const data = await res.json();
      window.open(data.url, '_blank');
    } catch {
      alert('Error al procesar. Intentalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="beneficios" style={{ background: 'var(--bg-primary)', padding: '6rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.17, 0.67, 0.29, 1] }}
          style={{
            border: '1px solid var(--bg-border)',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            background: 'linear-gradient(135deg, rgba(20,30,54,0.6), rgba(14,22,40,0.6))',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 30% 50%, rgba(212,167,44,0.06) 0%, transparent 70%)',
          }} />

          <div style={{ position: 'relative', maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <img src="/logo-cara-blanco.svg" alt="" style={{ display: 'block', width: 32, height: 'auto' }} />
              <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
                Beneficios MKM
              </span>
            </div>

            <h2 style={{ margin: '0.5rem 0 0.5rem', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)' }}>
              Cada corte suma.<br />Volver tiene recompensa.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '2.5rem auto', maxWidth: '48rem' }}>
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.count} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--bg-border)',
                    borderRadius: '16px',
                    padding: '2rem 1rem',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: '14px',
                      background: 'rgba(212,167,44,0.1)',
                      border: '1px solid rgba(212,167,44,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={24} color="var(--accent)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.1rem', color: 'var(--accent)', fontWeight: 700 }}>
                        {step.count}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>
                        cortes
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <motion.button
              onClick={handleWhatsApp}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 1.75rem',
                background: 'var(--accent)',
                color: '#080c14',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <ChevronRight size={18} />}
              {loading ? 'Verificando...' : 'Consultar mi progreso por WhatsApp'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
