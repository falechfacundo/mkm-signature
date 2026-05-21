'use client';

import { motion } from 'framer-motion';
import PortalPreviewMock from '@components/react/PortalPreviewMock';
import { SITE } from '@config/site';

export default function PortalSection() {
  return (
    <section id="portal" style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
            Sistema de gestion
          </span>
          <h2 style={{ margin: '0.7rem 0 0.75rem', fontSize: '2.2rem' }}>Tu proyecto, organizado desde el dia uno</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: '42rem' }}>
            No mas actualizaciones perdidas en WhatsApp. Todo en un portal dedicado: roadmap, archivos, pagos y comunicacion centralizada.
          </p>
        </motion.header>

        <PortalPreviewMock />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
        >
          <p className="mono" style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Acceso disponible en portal.ad-astra.me al confirmar el proyecto
          </p>
          <a href={SITE.portalUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            Ver el portal -&gt;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
