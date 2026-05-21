'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { PROCESS_STEPS } from '@data/process';

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const lineProgress = useTransform(smoothProgress, [0.05, 0.95], [0, 1]);
  const auraX = useTransform(lineProgress, [0, 1], ['0%', '100%']);
  const ambientOpacity = useTransform(smoothProgress, [0, 1], [0.25, 0.8]);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    const nextIndex = Math.round(clamped * (PROCESS_STEPS.length - 1));
    setActiveIndex(nextIndex);
  });

  return (
    <section id="proceso" style={{ background: 'var(--bg-secondary)' }}>
      <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 0',
            overflow: 'hidden',
          }}
        >
          {!prefersReducedMotion && (
            <>
              <motion.div
                style={{
                  position: 'absolute',
                  top: '16%',
                  left: '-8rem',
                  width: '22rem',
                  height: '22rem',
                  borderRadius: '999px',
                  background: 'radial-gradient(circle, rgba(174,53,255,0.22) 0%, rgba(174,53,255,0.04) 48%, transparent 72%)',
                  opacity: ambientOpacity,
                  filter: 'blur(3px)',
                  pointerEvents: 'none',
                }}
                animate={{ scale: [1, 1.06, 1], y: [0, -16, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  right: '-9rem',
                  bottom: '8%',
                  width: '24rem',
                  height: '24rem',
                  borderRadius: '999px',
                  background: 'radial-gradient(circle, rgba(0,209,191,0.18) 0%, rgba(0,209,191,0.03) 46%, transparent 72%)',
                  opacity: ambientOpacity,
                  pointerEvents: 'none',
                }}
                animate={{ scale: [1, 1.04, 1], y: [0, 12, 0] }}
                transition={{ duration: 10.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}

          <div style={{ maxWidth: '72rem', margin: '0 auto', width: '100%', padding: '0 1.5rem' }}>
            <div style={{ marginBottom: '3rem' }}>
              <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
                Proceso
              </span>
              <h2 style={{ marginTop: '0.65rem', marginBottom: '0.75rem', fontSize: '2.2rem' }}>Como trabajamos</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Estructura clara de inicio a fin. Sin sorpresas.</p>
            </div>

            <div style={{ position: 'relative' }}>
              <svg
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  width: 'calc(100% - 40px)',
                  height: '2px',
                  overflow: 'visible',
                }}
                viewBox="0 0 1000 2"
                preserveAspectRatio="none"
              >
                <line x1="0" y1="1" x2="1000" y2="1" stroke="var(--bg-border)" strokeWidth="2" />
                <motion.line
                  x1="0"
                  y1="1"
                  x2="1000"
                  y2="1"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  style={{ pathLength: lineProgress }}
                  strokeLinecap="round"
                />
              </svg>

              {!prefersReducedMotion && (
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: auraX,
                    width: '1.1rem',
                    height: '1.1rem',
                    borderRadius: '999px',
                    background: 'var(--accent)',
                    boxShadow: '0 0 0 8px rgba(174,53,255,0.16), 0 0 34px rgba(174,53,255,0.65)',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />
              )}

              <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginTop: '2rem' }}>
                {PROCESS_STEPS.map((step, i) => {
                  const isActive = i <= activeIndex;
                  const isCurrent = i === activeIndex;
                  const distance = Math.abs(i - activeIndex);

                  return (
                    <motion.article
                      key={step.number}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        y: isCurrent ? -8 : isActive ? 0 : 16,
                        scale: isCurrent ? 1.03 : isActive ? 1 : 0.95,
                        rotateX: prefersReducedMotion ? 0 : isCurrent ? 0 : isActive ? (i % 2 === 0 ? 2 : -2) : (i % 2 === 0 ? -8 : 8),
                        filter: isCurrent ? 'drop-shadow(0 18px 26px rgba(174,53,255,0.24))' : 'none',
                      }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        paddingTop: '3.6rem',
                        transformPerspective: '1000px',
                        paddingInline: '0.65rem',
                        boxShadow: distance === 0 ? '0 14px 28px -22px rgba(0,0,0,0.92)' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <motion.div
                          animate={{
                            background: isActive ? 'var(--accent)' : 'var(--text-muted)',
                            scale: isCurrent ? 1.15 : 1,
                            boxShadow: isCurrent ? '0 0 0 8px rgba(174,53,255,0.2)' : '0 0 0 0 rgba(174,53,255,0)',
                          }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '999px',
                            marginRight: '0.55rem',
                            marginLeft: '2px',
                          }}
                        />
                        <motion.span
                          className="mono"
                          animate={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)', scale: isCurrent ? 1.15 : 1 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          style={{ fontSize: '0.72rem' }}
                        >
                          {step.number}
                        </motion.span>
                      </div>
                      <motion.div
                        animate={{
                          borderColor: isCurrent ? 'color-mix(in srgb, var(--accent) 65%, transparent)' : 'transparent',
                          background: isCurrent ? 'linear-gradient(180deg, rgba(174,53,255,0.08) 0%, rgba(174,53,255,0.02) 100%)' : 'transparent',
                        }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          marginTop: '0.95rem',
                          borderRadius: '14px',
                          border: '1px solid transparent',
                          padding: '1rem 0.95rem 0.9rem',
                        }}
                      >
                        <motion.h3
                          animate={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          style={{ margin: 0, fontSize: '1.1rem' }}
                        >
                          {step.title}
                        </motion.h3>
                        <p style={{ margin: '0.55rem 0 0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                          {step.desc}
                        </p>
                        <span
                          className="mono"
                          style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-muted)',
                            background: isCurrent ? 'color-mix(in srgb, var(--accent) 20%, var(--bg-surface))' : 'var(--bg-surface)',
                            borderRadius: '999px',
                            padding: '0.25rem 0.55rem',
                            border: isCurrent ? '1px solid color-mix(in srgb, var(--accent) 60%, transparent)' : '1px solid transparent',
                          }}
                        >
                          {step.duration}
                        </span>
                      </motion.div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
