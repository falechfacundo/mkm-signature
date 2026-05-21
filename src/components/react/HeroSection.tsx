'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SITE } from '@config/site';
import type { HubParams } from '@lib/params';
import type { ServiceConfig } from '@config/services';

interface Props {
  params: HubParams;
  service: ServiceConfig;
}

const TRUST_BADGES = ['Entrega garantizada', '30 dias de soporte', 'Portal de proyecto incluido'];

export default function HeroSection({ params, service }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const words = service.headline.split(' ');

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: bgY,
          pointerEvents: 'none',
        }}
      >
        <div
          className="noise"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-60px',
            width: '28rem',
            height: '28rem',
            borderRadius: '999px',
            background: 'radial-gradient(circle, rgba(174,53,255,0.14) 0%, rgba(174,53,255,0.03) 42%, transparent 72%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '24rem',
            height: '24rem',
            opacity: 0.2,
            backgroundImage: 'radial-gradient(var(--bg-border) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
      </motion.div>

      <motion.div
        style={{
          position: 'relative',
          minHeight: '100vh',
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '8rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          opacity: contentOpacity,
        }}
      >
        <div style={{ maxWidth: '48rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mono"
            style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.85rem' }}
          >
            Ad Astra - Digital Studio
          </motion.span>

          <h1 style={{ fontSize: 'clamp(3rem,7vw,6rem)', lineHeight: 1.05, margin: 0 }}>
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', marginRight: '0.4ch' }}
              >
                {word}
              </motion.span>
            ))}
            {params.client && (
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'var(--gradient-brand)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                para {params.client}.
              </motion.span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: 1.7, maxWidth: '42rem', margin: 0 }}
          >
            {service.subheadline}
          </motion.p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
            {TRUST_BADGES.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.58 + i * 0.08, type: 'spring', stiffness: 180, damping: 18 }}
                className="mono"
                style={{
                  border: '1px solid var(--bg-border)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-secondary)',
                  borderRadius: '999px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.72rem',
                }}
              >
                {badge}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}
          >
            <a
              href={SITE.workanaCta}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 28px',
                background: 'var(--accent)',
                color: '#080808',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.95rem',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              {service.ctaLabel}
            </a>
            <a
              href={SITE.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 24px',
                border: '1px solid var(--bg-border)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              Ver portfolio -&gt;
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
