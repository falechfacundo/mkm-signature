'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SITE } from '@config/site';

const LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cobertura', href: '#comunicacion' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();
  const visible = useTransform(scrollY, [150, 300], [0, 1]);
  const bgOpacity = useTransform(scrollY, [150, 400], [0, 0.92]);

  return (
    <motion.nav
      ref={navRef}
      style={{ opacity: visible }}
      className="no-print"
      onPointerDown={(e) => { const t = e.target as HTMLElement; if (t.tagName === 'A' || t.closest('a')) return; }}
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 1.5rem',
        pointerEvents: visible.get() === 1 ? 'auto' as const : 'none' as const,
      }}
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        css={{
          position: 'absolute',
          inset: 0,
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--bg-border)',
        }}
      />
      <div
        css={{
          position: 'relative',
          maxWidth: '72rem',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        <a
          href="/"
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
          }}
        >
          <img
            src="/logo-cara.svg"
            alt="MKM Signature"
            css={{ width: 28, height: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }}
          />
          <span css={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
            {SITE.name}
          </span>
        </a>

        <div css={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              css={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
                '&:hover': { color: 'var(--accent)' },
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservar"
            css={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '7px 18px',
              background: 'var(--accent)',
              color: '#080c14',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              textDecoration: 'none',
              transition: 'box-shadow 0.2s, transform 0.2s',
              '&:hover': {
                boxShadow: '0 0 20px rgba(212,167,44,0.3)',
                transform: 'scale(1.03)',
              },
            }}
          >
            Reservar
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
