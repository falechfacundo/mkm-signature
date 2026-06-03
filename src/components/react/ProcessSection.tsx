'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PROCESS_STEPS } from '@data/process';

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end end'],
  });

  const lineGrow = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  const sectionVariants = {
    hiddenLeft: { opacity: 0, x: -80, rotateZ: -3, scale: 0.95 },
    hiddenRight: { opacity: 0, x: 80, rotateZ: 3, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotateZ: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.12,
        ease: [0.17, 0.67, 0.29, 1],
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    }),
  };

  return (
    <section id="proceso" ref={containerRef} style={{ background: 'var(--bg-secondary)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.17, 0.67, 0.29, 1] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
            Cómo funciona
          </span>
          <h2 style={{ marginTop: '0.65rem', marginBottom: '0.75rem', fontSize: 'clamp(2rem,4vw,2.8rem)' }}>
            De tu mensaje al resultado
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Así de simple es agendar con MKM.
          </p>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <motion.svg
            style={{
              position: 'absolute',
              left: '24px',
              top: '40px',
              width: '2px',
              height: 'calc(100% - 80px)',
            }}
            viewBox="0 0 2 500"
            preserveAspectRatio="none"
          >
            <line x1="1" y1="0" x2="1" y2="500" stroke="var(--bg-border)" strokeWidth="2" strokeDasharray="4 4" />
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="500"
              stroke="var(--accent)"
              strokeWidth="2"
              style={{ pathLength: lineGrow }}
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </motion.svg>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingLeft: '3.5rem' }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                initial={i % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={sectionVariants}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.12 + 0.15, type: 'spring', stiffness: 200, damping: 12 }}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--accent), var(--gold-300))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 0 20px rgba(212,167,44,0.2)',
                  }}
                >
                  <span className="mono" style={{ color: '#080c14', fontWeight: 700, fontSize: '0.85rem' }}>
                    {step.number}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.12 + 0.25, duration: 0.45, ease: [0.17, 0.67, 0.29, 1] }}
                  style={{
                    flex: 1,
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    border: '1px solid var(--bg-border)',
                    background: 'linear-gradient(135deg, rgba(20,30,54,0.6), rgba(14,22,40,0.6))',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between" style={{ marginBottom: '0.4rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{step.title}</h3>
                    <span
                      className="mono"
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--accent)',
                        background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                        border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                        borderRadius: '999px',
                        padding: '0.2rem 0.6rem',
                        alignSelf: 'flex-start',
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
