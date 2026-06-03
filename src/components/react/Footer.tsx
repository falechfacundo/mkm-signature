'use client';

import { SITE } from '@config/site';

export default function Footer() {
  return (
    <footer
      css={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--bg-border)',
        padding: '3rem 1.5rem 2rem',
      }}
    >
      <div
        css={{
          maxWidth: '72rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div css={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                css={{ width: 32, height: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }}
              />
              <span css={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.04em' }}>
                {SITE.name}
              </span>
            </a>
            <span css={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {SITE.tagline}
            </span>
          </div>

          <div css={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'right' }}>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              css={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.2s',
                '&:hover': { color: 'var(--accent)' },
              }}
            >
              @mkm_signature
            </a>
            <a
              href={`mailto:${SITE.contactEmail}`}
              css={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.2s',
                '&:hover': { color: 'var(--accent)' },
              }}
            >
              {SITE.contactEmail}
            </a>
            <span css={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              {SITE.coverZone}
            </span>
          </div>
        </div>

        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--bg-border)',
          }}
        >
          <span css={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
            &copy; {new Date().getFullYear()} {SITE.name}
          </span>
          <span css={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            Hecho con dedicación
          </span>
        </div>
      </div>
    </footer>
  );
}
