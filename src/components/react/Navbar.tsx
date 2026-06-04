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
      style={{ opacity: visible, position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 1.5rem' }}
      className="no-print"
    >
      <motion.div
        style={{ opacity: bgOpacity, position: 'absolute', inset: 0, background: 'var(--bg-primary)', borderBottom: '1px solid var(--bg-border)' }}
      />
      <div
        style={{
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
          }}
        >
          <img
            src="/logo-cara-blanco.svg"
            alt="MKM Signature"
            style={{ width: 48, height: 'auto', display: 'block' }}
          />
          <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
            MKM Signature
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservar"
            style={{
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
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(212,167,44,0.3)';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Reservar
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
