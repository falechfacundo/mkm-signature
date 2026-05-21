'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type PanelId = 'sla' | 'channels' | 'rituals' | null;

const CHANNELS = [
  // 'Portal del proyecto',
  'Email',
  'Chat interno',
  'Videocall',
];

const RITUALS = [
  'Kickoff inicial con alcance y riesgos',
  'Update async cada 48-72hs',
  'Revision de hitos con feedback',
  'Cierre con handoff y soporte',
];

const KPIS = [
  { label: 'SLA respuesta', value: '<2hs' },
  { label: 'Frecuencia update', value: '48-72hs' },
  { label: 'Trazabilidad', value: '100%' },
  { label: 'Canales activos', value: '3' },
];

const PANEL_CONTENT: Record<Exclude<PanelId, null>, { title: string; bullets: string[]; meta: string[] }> = {
  sla: {
    title: 'Regla operativa SLA',
    bullets: [
      'Respuesta inicial en menos de 2hs en horario operativo.',
      'Bloqueos criticos se escalan el mismo dia.',
      'Si hay dependencia externa, se informa ETA y plan alterno.',
    ],
    meta: ['Tiempos de respuesta inciertos', 'Bloqueos criticos sin priorizacion'],
  },
  channels: {
    title: 'Uso recomendado por canal',
    bullets: [
      // 'Portal: decisiones y entregables versionados.',
      'Email: resumenes ejecutivos y aprobaciones.',
      'Chat interno: bloqueos cortos y coordinacion rapida.',
    ],
    meta: ['Mensajes dispersos entre canales', 'Decisiones sin trazabilidad'],
  },
  rituals: {
    title: 'Cadencia de trabajo',
    bullets: [
      'Cada ritual deja un output concreto y verificable.',
      'El avance se mide por hitos, no por mensajes enviados.',
      'El cierre incluye handoff y plan de soporte.',
    ],
    meta: ['Reuniones sin entregable claro', 'Avance medido por percepcion'],
  },
};

interface InteractiveCardProps {
  panelId: Exclude<PanelId, null>;
  kicker: string;
  title: string;
  description: string;
  tone?: 'accent' | 'teal';
  activePanel: PanelId;
  setActivePanel: (panel: PanelId) => void;
}

function InteractiveCard({ panelId, kicker, title, description, tone = 'accent', activePanel, setActivePanel }: InteractiveCardProps) {
  const isOpen = activePanel === panelId;
  const content = PANEL_CONTENT[panelId];
  const borderColor = tone === 'teal'
    ? '1px solid color-mix(in srgb, var(--turquesa-500) 35%, transparent)'
    : '1px solid var(--bg-border)';
  const accentColor = tone === 'teal' ? 'var(--turquesa-500)' : 'var(--accent)';

  return (
    <article
      style={{
        position: 'relative',
        border: borderColor,
        borderRadius: '16px',
        background: 'linear-gradient(180deg, rgba(23,23,23,0.96) 0%, rgba(16,16,16,0.96) 100%)',
        boxShadow: '0 14px 26px -22px rgba(0,0,0,0.9)',
        overflow: 'hidden',
        minHeight: '265px',
      }}
      onMouseEnter={() => setActivePanel(panelId)}
      onMouseLeave={() => setActivePanel(null)}
      onClick={() => setActivePanel(isOpen ? null : panelId)}
    >
      <div style={{ padding: '1.15rem', height: '100%' }}>
        <div style={{ position: 'relative', height: '215px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <p className="mono" style={{ margin: 0, fontSize: '0.62rem', color: accentColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {content.title}
              </p>
              <ul style={{ margin: '0.7rem 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: '0.52rem' }}>
                {content.bullets.map((bullet, index) => (
                  <motion.li
                    key={bullet}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.5 }}
                  >
                    <span style={{ width: '6px', height: '6px', marginTop: '0.4rem', borderRadius: '999px', background: accentColor, flexShrink: 0 }} />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mono" style={{ margin: '0.8rem 0 0', fontSize: '0.62rem', color: accentColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Problemas resueltos
              </p>
              <ul style={{ margin: '0.45rem 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: '0.42rem' }}>
                {content.meta.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.45 }}>
                    <span style={{ width: '6px', height: '6px', marginTop: '0.36rem', borderRadius: '999px', background: accentColor, flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem' }}>
                <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: accentColor }}>
                  {kicker}
                </span>
                <span
                  className="mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.28rem',
                    fontSize: '0.58rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: accentColor,
                    border: `1px solid color-mix(in srgb, ${accentColor} 45%, transparent)`,
                    borderRadius: '999px',
                    padding: '0.2rem 0.45rem',
                    background: 'color-mix(in srgb, var(--bg-surface) 88%, transparent)',
                  }}
                >
                  <span aria-hidden="true">*</span>
                  Interactivo
                </span>
              </div>
              <h3 style={{ margin: '0.45rem 0 0', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '1.6rem' }}>{title}</h3>
              <p style={{ margin: '0.62rem 0 0', color: 'var(--text-secondary)', lineHeight: 1.72, fontSize: '1rem' }}>{description}</p>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

export default function CommunicationBentoSection() {
  const [activePanel, setActivePanel] = useState<PanelId>(null);

  const channelsPreview = useMemo(() => CHANNELS.join(' - '), []);

  return (
    <section id="comunicacion" className="py-16 md:py-24" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>Comunicacion</span>
          <h2 className="text-4xl mt-2" style={{ fontFamily: 'var(--font-display)' }}>Todo documentado. Nada se pierde.</h2>
          <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>
            La comunicacion del proyecto tiene estructura. Sin depender de que alguien responda un WhatsApp.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-4 mt-12">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl p-6 md:col-span-4 xl:col-span-7"
            style={{
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)',
              background: 'linear-gradient(165deg, rgba(26,26,26,0.98) 0%, rgba(18,15,26,0.98) 65%, rgba(12,12,12,0.98) 100%)',
              boxShadow: '0 18px 34px -24px rgba(0,0,0,0.9)',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at 86% 12%, rgba(174,53,255,0.18) 0%, rgba(174,53,255,0.0) 42%)',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Hub de comunicacion
              </span>
              <h3 className="text-2xl md:text-3xl" style={{ margin: 0, fontFamily: 'var(--font-display)', lineHeight: 1.1, color: 'var(--text-primary)' }}>
                Un solo lugar para decidir, seguir y cerrar.
              </h3>
              <p className="text-sm md:text-base" style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '48ch' }}>
                Nada queda suelto: decisiones, bloqueos y avances se registran en el mismo flujo. Evitamos perdida de contexto y tiempos muertos.
              </p>
              <p className="mono" style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {channelsPreview}
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.03, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl p-5 md:col-span-2 xl:col-span-5"
            style={{
              border: '1px solid var(--bg-border)',
              background: 'linear-gradient(180deg, rgba(24,24,24,0.96) 0%, rgba(17,17,17,0.96) 100%)',
              boxShadow: '0 14px 26px -22px rgba(0,0,0,0.9)',
            }}
          >
            <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              KPIs operativos
            </span>
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              {KPIS.map((kpi) => (
                <div
                  key={kpi.label}
                  style={{
                    border: '1px solid var(--bg-border)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    background: 'var(--bg-surface)',
                  }}
                >
                  <p className="mono" style={{ margin: 0, fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {kpi.label}
                  </p>
                  <p style={{ margin: '0.28rem 0 0', color: 'var(--text-primary)', fontSize: '1.08rem', fontWeight: 700 }}>{kpi.value}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <div className="md:col-span-3 xl:col-span-4">
            <InteractiveCard
              panelId="sla"
              kicker="SLA"
              title="< 2hs"
              description="Tiempo objetivo de primera respuesta durante horario operativo."
              tone="teal"
              activePanel={activePanel}
              setActivePanel={setActivePanel}
            />
          </div>

          <div className="md:col-span-3 xl:col-span-4">
            <InteractiveCard
              panelId="channels"
              kicker="Canales"
              title="4 canales activos"
              description="Cada canal tiene un uso claro para evitar ruido y perdida de contexto."
              activePanel={activePanel}
              setActivePanel={setActivePanel}
            />
          </div>

          <div className="md:col-span-6 xl:col-span-4">
            <InteractiveCard
              panelId="rituals"
              kicker="Rituales"
              title={`${RITUALS.length} hitos de comunicacion`}
              description="Ritmo de trabajo con outputs concretos en cada fase."
              activePanel={activePanel}
              setActivePanel={setActivePanel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
