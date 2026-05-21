'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { DELIVERABLES } from '@data/deliverables';
import type { ServiceConfig } from '@config/services';
import type { ElementType } from 'react';
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  service: ServiceConfig;
}

const GUARANTEES = [
  { text: 'Testeado antes de entrega', sub: 'Revisamos todo antes de cerrar el proyecto' },
  { text: 'Revisiones incluidas', sub: 'Minimo 2 rondas de feedback sin cargo' },
  { text: 'Soporte 30 dias', sub: 'Cualquier problema post-entrega lo resolvemos' },
];

interface DeliverableCardProps {
  title: string;
  desc: string;
  icon: string;
  index: number;
  total: number;
}

function DeliverableCard({ title, desc, icon, index, total }: DeliverableCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateXSpring = useSpring(rotateX, { stiffness: 160, damping: 16, mass: 0.3 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 160, damping: 16, mass: 0.3 });

  const isFeatured = index === total - 1;
  const Icon = ((Icons[icon as keyof typeof Icons] as ElementType) ?? Icons.Box) as ElementType;
  const iconColor = isFeatured ? 'var(--turquesa-500)' : 'var(--accent)';
  const accentSoft = isFeatured ? 'rgba(0, 209, 191, 0.25)' : 'rgba(174, 53, 255, 0.24)';

  const handleMove: React.MouseEventHandler<HTMLElement> = (event) => {
    if (prefersReducedMotion) {
      return;
    }

    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - relativeY) * 12);
    rotateY.set((relativeX - 0.5) * 12);

    event.currentTarget.style.setProperty('--mx', `${relativeX * 100}%`);
    event.currentTarget.style.setProperty('--my', `${relativeY * 100}%`);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 44, scale: 0.94, rotateX: prefersReducedMotion ? 0 : -12 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      whileHover={prefersReducedMotion ? undefined : { y: -10, scale: 1.02 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1], type: 'spring', stiffness: 120, damping: 16 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group"
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--bg-border)',
        borderRadius: '16px',
        padding: '1.35rem',
        boxShadow: isFeatured ? '0 22px 36px -24px rgba(0, 209, 191, 0.32)' : '0 14px 26px -22px rgba(0,0,0,0.9)',
        transformStyle: 'preserve-3d',
        rotateX: prefersReducedMotion ? 0 : rotateXSpring,
        rotateY: prefersReducedMotion ? 0 : rotateYSpring,
        background: isFeatured
          ? 'linear-gradient(180deg, rgba(15,36,33,0.96) 0%, rgba(14,18,18,0.96) 100%)'
          : 'linear-gradient(180deg, rgba(26,26,26,0.96) 0%, rgba(17,17,17,0.96) 100%)',
        ['--mx' as string]: '50%',
        ['--my' as string]: '50%',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: isFeatured
            ? 'linear-gradient(90deg, transparent 0%, var(--turquesa-500) 35%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, var(--accent) 35%, transparent 100%)',
          opacity: 0.65,
        }}
        animate={prefersReducedMotion ? undefined : { x: ['-8%', '8%', '-8%'] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(circle at var(--mx) var(--my), ${accentSoft} 0%, rgba(0,0,0,0) 42%)`,
        }}
      />

      {isFeatured && !prefersReducedMotion && (
        <motion.div
          style={{
            position: 'absolute',
            inset: '-30%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle at center, rgba(0,209,191,0.18) 0%, rgba(0,209,191,0.0) 58%)',
            opacity: 0.32,
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.22, 0.42, 0.22] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(22px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div
            className="mono"
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Entregable {(index + 1).toString().padStart(2, '0')}
          </div>
          <div
            style={{
              width: '2.35rem',
              height: '2.35rem',
              borderRadius: '0.75rem',
              display: 'grid',
              placeItems: 'center',
              border: `1px solid ${accentSoft}`,
              background: isFeatured
                ? 'linear-gradient(135deg, rgba(0,209,191,0.16) 0%, rgba(0,209,191,0.03) 100%)'
                : 'linear-gradient(135deg, rgba(174,53,255,0.12) 0%, rgba(174,53,255,0.03) 100%)',
            }}
          >
            <Icon size={18} color={iconColor} />
          </div>
        </div>

        <h3
          style={{
            margin: '0 0 0.45rem',
            fontSize: '1.08rem',
            lineHeight: 1.3,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {title}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{desc}</p>
      </div>
    </motion.article>
  );
}

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
          {items.map((item, i) => (
            <DeliverableCard key={`${item.title}-${i}`} title={item.title} desc={item.desc} icon={item.icon} index={i} total={items.length} />
          ))}
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
