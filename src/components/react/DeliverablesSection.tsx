'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { DELIVERABLES } from '@data/deliverables';
import type { ServiceConfig } from '@config/services';
import type { ElementType } from 'react';

interface Props {
  service: ServiceConfig;
}

const GUARANTEES = [
  { text: 'Testeado antes de entrega', sub: 'Revisamos todo antes de cerrar el proyecto' },
  { text: 'Revisiones incluidas', sub: 'Minimo 2 rondas de feedback sin cargo' },
  { text: 'Soporte 30 dias', sub: 'Cualquier problema post-entrega lo resolvemos' },
];

export default function DeliverablesSection({ service }: Props) {
  const items = DELIVERABLES[service.id];

  return (
    <section id="entregables" style={{ background: 'var(--bg-primary)', padding: '6rem 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
            Entregables
          </span>
          <h2 style={{ margin: '0.7rem 0 0.75rem', fontSize: '2.2rem' }}>Que recibis exactamente</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Sin letra chica. Todo lo que forma parte del proyecto.</p>
        </motion.header>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: '2.8rem' }}>
          {items.map((item, i) => {
            const Icon = ((Icons[item.icon as keyof typeof Icons] as ElementType) ?? Icons.Box) as ElementType;
            const iconColor = i === items.length - 1 ? 'var(--turquesa-500)' : 'var(--accent)';

            return (
              <motion.article
                key={`${item.title}-${i}`}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1], type: 'spring', stiffness: 120, damping: 16 }}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--bg-border)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                }}
              >
                <Icon size={20} color={iconColor} />
                <h3 style={{ margin: '0.8rem 0 0.35rem', fontSize: '1.05rem' }}>{item.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </motion.article>
            );
          })}
        </div>

        <div style={{ marginTop: '3.5rem', borderTop: '1px solid var(--bg-border)', paddingTop: '2.2rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.6rem' }}>Garantias incluidas</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: '1.2rem' }}>
            {GUARANTEES.map((g, i) => (
              <motion.article
                key={g.text}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', gap: '0.55rem' }}
              >
                <Icons.CheckCircle2 size={18} color="var(--turquesa-500)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{g.text}</p>
                  <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{g.sub}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
