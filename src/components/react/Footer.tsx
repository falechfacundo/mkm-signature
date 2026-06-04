'use client';

import { SITE } from '@config/site';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--bg-border)',
        padding: '3rem 1.5rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="/"
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'var(--text-primary)',
              }}
            >
              <img
                src="/logo-cara-dorado.svg"
                alt="MKM Signature"
                style={{ width: 224, height: 'auto', display: 'block' }}
              />
              <span style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.04em', color: 'var(--accent)' }}>
                MKM Signature
              </span>
            </a>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Barbería a domicilio
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'right' }}>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              @mkm_signature
            </a>
            <a
              href={`mailto:${SITE.contactEmail}`}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {SITE.contactEmail}
            </a>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              {SITE.coverZone}
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--bg-border)',
          }}
        >
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
            &copy; {new Date().getFullYear()} MKM Signature
          </span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/privacy" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textDecoration: 'none' }}>Privacidad</a>
            <a href="/terms" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textDecoration: 'none' }}>Términos</a>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            Hecho con dedicación
          </span>
        </div>
      </div>
    </footer>
  );
}
