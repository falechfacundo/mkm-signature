'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { SITE } from '@config/site';
import { useTurnstile } from '@lib/useTurnstile';
import type { HubParams } from '@lib/params';
import type { ServiceConfig } from '@config/services';
import { gsap } from 'gsap';

interface Props {
  params: HubParams;
  service: ServiceConfig;
}

const TRUST_BADGES = [
  'Sin filas ni esperas',
  'Productos profesionales',
  'Higiene garantizada',
];

const floatingShapes = [
  { size: 180, x: '85%', y: '20%', delay: 0 },
  { size: 100, x: '10%', y: '60%', delay: 1.5 },
  { size: 140, x: '75%', y: '70%', delay: 3 },
  { size: 80, x: '25%', y: '15%', delay: 2 },
];

export default function HeroSection({ params, service }: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [bookingLoading, setBookingLoading] = useState(false);
  const { execute } = useTurnstile();
  const bookingAttempted = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const words = service.headline.split(' ');

  const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -40, scale: 0.6 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.15 + i * 0.06,
        ease: [0.17, 0.67, 0.29, 1],
      },
    }),
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('#hero', {
      opacity: 0, filter: 'blur(6px)',
    }, {
      opacity: 1, filter: 'blur(0px)',
      duration: 0.2, ease: 'none',
    }, 0)
    .fromTo('#mkm-logo', {
      opacity: 0, scale: 0.98, y: 10, filter: 'blur(8px)',
    }, {
      opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
      duration: 0.5,
    }, 0.2)
    .fromTo('#mkm-glow', {
      opacity: 0,
    }, {
      opacity: 1, duration: 0.5,
    }, 0.5)
    .to('#mkm-glow', {
      opacity: 0.7, duration: 0.2,
    }, 1.0);
  }, []);

  return (
    <>
    <style>{`
      @keyframes hero-float-glow {
        0%, 100% {
          transform: translateY(0);
          filter: drop-shadow(0 0 12px rgba(212,167,44,0.25)) drop-shadow(0 0 40px rgba(212,167,44,0.08));
        }
        50% {
          transform: translateY(-20px);
          filter: drop-shadow(0 0 30px rgba(212,167,44,0.55)) drop-shadow(0 0 70px rgba(212,167,44,0.2)) drop-shadow(0 0 100px rgba(212,167,44,0.1));
        }
      }
      .hero-isotype-float {
        animation: hero-float-glow 4.5s ease-in-out infinite;
        will-change: transform, filter;
      }
      #mkm-logo {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
        filter: blur(8px);
      }
    `}</style>
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,167,44,0.06) 0%, transparent 60%), var(--bg-primary)',
      }}
    >
      <motion.div style={{ position: 'absolute', inset: 0, y: bgY, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            left: '-5%',
            top: '-8%',
            width: '40rem',
            height: '40rem',
            borderRadius: '999px',
            background: 'radial-gradient(circle, rgba(51,102,255,0.08) 0%, transparent 55%)',
          }}
        />

        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            aria-hidden
            style={{
              position: 'absolute',
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              borderRadius: i % 2 === 0 ? '42% 58% 63% 37% / 44% 38% 62% 56%' : '55% 45% 38% 62% / 50% 55% 45% 50%',
              border: '1px solid rgba(212,167,44,0.10)',
              background: `radial-gradient(circle at 30% 30%, rgba(212,167,44,0.04), transparent 70%)`,
              transform: `translate(${mousePos.x * (i + 1) * -8}px, ${mousePos.y * (i + 1) * -8}px)`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, i % 2 === 0 ? 6 : -6, 0],
            }}
            transition={{
              duration: 7 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-290px',
          top: '32px',
          y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']),
          x: useTransform(scrollYProgress, [0, 1], ['0%', '8%']),
          scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.75]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.4, 0]),
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div className="hero-isotype-float">
          <img
            id="mkm-logo"
            src="/logo-cara-dorado.svg"
            
            alt=""
            style={{ width: 1124, height: 'auto', display: 'block', maxWidth: 'none' }}
          />
          <div
            id="mkm-glow"
            aria-hidden
            style={{
              position: 'absolute', right: '-60px', top: '50%', translate: '0 -50%',
              width: 240, height: '80%',
              background: 'radial-gradient(ellipse at left, rgba(212,167,44,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </motion.div>

      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '7rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '54rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.17, 0.67, 0.29, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.82rem' }}>
              {SITE.name}
            </span>
          </motion.div>

          <h1 style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', lineHeight: 1.02, margin: 0, perspective: '800px' }}>
            {words.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                style={{ display: 'inline-block', marginRight: '0.35ch', transformStyle: 'preserve-3d' }}
              >
                {word}
              </motion.span>
            ))}
            {params.client && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.17, 0.67, 0.29, 1] }}
                style={{
                  display: 'inline-block',
                  background: 'var(--gradient-brand)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {' '}para {params.client}.
              </motion.span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.5, ease: [0.17, 0.67, 0.29, 1] }}
            style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, maxWidth: '40rem', margin: 0 }}
          >
            {service.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.65, ease: [0.17, 0.67, 0.29, 1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}
          >
            {TRUST_BADGES.map((badge) => (
              <motion.span
                key={badge}
                whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
                className="mono"
                style={{
                  border: '1px solid var(--bg-border)',
                  background: 'color-mix(in srgb, var(--accent) 6%, var(--bg-surface))',
                  color: 'var(--text-secondary)',
                  borderRadius: '999px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.7rem',
                  cursor: 'default',
                }}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85, ease: [0.17, 0.67, 0.29, 1] }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}
          >
            <motion.button
              onClick={async () => {
                if (bookingLoading || bookingAttempted.current) return;
                bookingAttempted.current = true;
                setBookingLoading(true);
                try {
                  const token = await execute();
                  const res = await fetch('/api/whatsapp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, message: `Hola! Quiero info sobre ${service.label}` }),
                  });
                  if (!res.ok) throw new Error('Error');
                  const data = await res.json();
                  window.open(data.url, '_blank');
                } catch {
                  alert('Error al procesar la solicitud. Intentalo de nuevo.');
                  bookingAttempted.current = false;
                } finally {
                  setBookingLoading(false);
                }
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(212,167,44,0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '15px 32px',
                background: 'var(--accent)',
                color: '#080c14',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.95rem',
                borderRadius: '12px',
                border: 'none',
                cursor: bookingLoading ? 'not-allowed' : 'pointer',
                opacity: bookingLoading ? 0.7 : 1,
              }}
            >
              {bookingLoading ? (
                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              )}
              {bookingLoading ? 'Verificando...' : service.ctaLabel}
            </motion.button>

            <motion.a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, borderColor: 'var(--accent)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '15px 26px',
                border: '1px solid var(--bg-border)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                borderRadius: '12px',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Ver trabajos
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mono"
            style={{ margin: '0.3rem 0 0', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.05em' }}
          >
            <span style={{ color: 'var(--accent)' }}>◉</span> {SITE.coverZone} · Turnos flexibles · Respuesta &lt; 1h
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.svg
          width="24"
          height="32"
          viewBox="0 0 24 32"
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="1.5"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="2" y="2" width="20" height="28" rx="10" />
          <line x1="12" y1="20" x2="12" y2="24" />
          <line x1="8" y1="26" x2="16" y2="26" />
        </motion.svg>
      </motion.div>
    </section>
    </>
  );
}
