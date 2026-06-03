'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SITE } from '@config/site';
import { MapPin, Phone, Camera, Mail, Loader2, ChevronRight } from 'lucide-react';
import { useTurnstile } from '@lib/useTurnstile';
import MapaCobertura from './MapaCobertura';

const ZONES = [
  'Nuñez', 'Belgrano', 'Vicente López',
  'Palermo', 'Recoleta', 'Caballito',
  'Almagro', 'Balvanera', 'Villa Crespo',
  'Chacarita', 'Colegiales', 'Retiro',
  'San Nicolás', 'Monserrat', 'Puerto Madero',
];

export default function CommunicationBentoSection() {
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const { execute } = useTurnstile();

  const handleRevealWhatsApp = async () => {
    if (phone) return;
    setLoading(true);
    try {
      const token = await execute();
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) throw new Error('Error');
      const data = await res.json();
      setPhone(data.phone);
    } catch {
      alert('Error al verificar. Intentalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cobertura" style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.17, 0.67, 0.29, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
            Cobertura
          </span>
          <h2 style={{ marginTop: '0.65rem', marginBottom: '0.75rem', fontSize: 'clamp(2rem,4vw,2.8rem)' }}>
            ¿Dónde me encontrás?
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Recorro estas zonas con todo el equipo a cuestas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ marginBottom: '1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.17, 0.67, 0.29, 1] }}
            style={{
              border: '1px solid var(--bg-border)',
              borderRadius: '20px',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(20,30,54,0.6), rgba(14,22,40,0.6))',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <MapPin size={16} color="var(--accent)" />
              <span className="mono" style={{ color: 'var(--accent)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Zonas de cobertura
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
              {ZONES.map((zone, i) => {
                const isHovered = hoveredZone === zone;
                return (
                  <motion.button
                    key={zone}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: [0.17, 0.67, 0.29, 1] }}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}
                    onClick={() => setHoveredZone(zone === hoveredZone ? null : zone)}
                    style={{
                      padding: '0.5rem 0.7rem',
                      borderRadius: '10px',
                      border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--bg-border)'}`,
                      background: isHovered ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'var(--bg-surface)',
                      fontSize: '0.82rem',
                      color: isHovered ? 'var(--accent)' : 'var(--text-secondary)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {zone}
                  </motion.button>
                );
              })}
            </div>
            <p className="mono" style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
              ¿Otra zona? Consultame sin compromiso
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.17, 0.67, 0.29, 1] }}
            className="lg:col-span-2"
            style={{
              border: '1px solid var(--bg-border)',
              borderRadius: '20px',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(20,30,54,0.6), rgba(14,22,40,0.6))',
              minHeight: '360px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <MapPin size={16} color="var(--accent)" />
              <span className="mono" style={{ color: 'var(--accent)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Mapa de cobertura
              </span>
            </div>
            <MapaCobertura hoveredZone={hoveredZone} onHoverZone={setHoveredZone} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.17, 0.67, 0.29, 1] }}
          style={{
            border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
            borderRadius: '20px',
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(165deg, rgba(20,30,54,0.9), rgba(14,22,40,0.8))',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <span className="mono" style={{ color: 'var(--accent)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Contacto directo
          </span>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            {phone ? (
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '10px',
                  background: 'var(--accent)',
                  color: '#080c14',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                }}
              >
                <Phone size={14} />
                {phone}
              </a>
            ) : (
              <motion.button
                onClick={handleRevealWhatsApp}
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'var(--accent)',
                  color: '#080c14',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Phone size={14} />}
                {loading ? 'Verificando...' : 'Mostrar WhatsApp'}
              </motion.button>
            )}

            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--bg-border)',
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <Camera size={14} />
              @mkm_signature
            </a>

            <a
              href={`mailto:${SITE.contactEmail}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--bg-border)',
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <Mail size={14} />
              {SITE.contactEmail}
            </a>
          </div>

          <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            Respuesta &lt; 1h
          </span>
        </motion.div>
      </div>
    </section>
  );
}
