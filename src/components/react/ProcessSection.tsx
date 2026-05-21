'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { PROCESS_STEPS } from '@data/process';

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
          }}
        >
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
                  top: '23px',
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

              <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
                {PROCESS_STEPS.map((step, i) => {
                  const isActive = i <= activeIndex;
                  const isCurrent = i === activeIndex;

                  return (
                    <motion.article
                      key={step.number}
                      animate={{ opacity: isActive ? 1 : 0.35 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ paddingTop: '2rem' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <motion.div
                          animate={{
                            background: isActive ? 'var(--accent)' : 'var(--text-muted)',
                            scale: isCurrent ? 1.15 : 1,
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
                          background: 'var(--bg-surface)',
                          borderRadius: '999px',
                          padding: '0.25rem 0.55rem',
                        }}
                      >
                        {step.duration}
                      </span>
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
