# COPILOT CONTEXT — 05: React Islands
# Ad Astra — Presentation Hub (onboarding.ad-astra.me)

---

## INSTRUCCIÓN PARA COPILOT

Este archivo especifica los React islands del proyecto — componentes interactivos que
se hidratan en el cliente. Son los únicos archivos `.tsx`. Todos usan `client:visible`
o `client:load` según se indica. Usar Framer Motion para animaciones.

---

## REGLAS DE ISLANDS

- Siempre usar CSS variables del design system, no colores hardcodeados
- `client:visible` → se hidrata cuando entra al viewport (preferido para performance)
- `client:load` → se hidrata inmediatamente (solo si necesita ser interactivo al cargar)
- No usar `localStorage` ni `sessionStorage`
- No usar `useEffect` para animaciones que Framer Motion puede manejar

---

## ISLAND 01 — `src/components/react/FAQAccordion.tsx`

**Propósito:** Acordeón animado para las preguntas frecuentes.

**Usado en:** `FAQ.astro` con `client:visible`
```astro
<FAQAccordion client:visible items={faqs} />
```

**Implementación completa:**

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            style={{
              backgroundColor: isOpen ? 'var(--bg-surface)' : 'transparent',
              border: `1px solid ${isOpen ? 'rgba(174,53,255,0.3)' : 'var(--bg-border)'}`,
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
          >
            {/* Question row */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: isOpen ? 'var(--accent)' : 'var(--text-primary)',
                  transition: 'color 0.2s ease',
                  lineHeight: 1.4,
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  color: isOpen ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                }}
              >
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>

            {/* Answer — animated */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      padding: '0 24px 20px',
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
```

---

## ISLAND 02 — `src/components/react/PortalPreviewMock.tsx`

**Propósito:** Mock visual del portal de proyectos. Es el diferenciador más fuerte del hub.
Muestra que Ad Astra tiene infraestructura real, no es un freelancer más.

**Usado en:** `PortalPreview.astro` con `client:visible`
```astro
<PortalPreviewMock client:visible />
```

**Implementación completa:**

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  MessageSquare,
  CheckCircle2,
  Clock,
  Circle,
  ChevronRight,
} from 'lucide-react';

type TabId = 'roadmap' | 'archivos' | 'pagos' | 'mensajes';

interface Milestone {
  label: string;
  status: 'done' | 'active' | 'pending';
  date: string;
}

interface Payment {
  label: string;
  amount: string;
  status: 'paid' | 'pending';
}

interface Message {
  from: string;
  text: string;
  time: string;
  isUs: boolean;
}

const MILESTONES: Milestone[] = [
  { label: 'Brief y scope aprobado',      status: 'done',    date: 'Día 1'   },
  { label: 'Diseño aprobado',             status: 'done',    date: 'Día 4'   },
  { label: 'Desarrollo completado',       status: 'active',  date: 'Día 9'   },
  { label: 'Revisión y ajustes',          status: 'pending', date: 'Día 12'  },
  { label: 'Entrega final + deploy',      status: 'pending', date: 'Día 14'  },
];

const PAYMENTS: Payment[] = [
  { label: 'Adelanto 50% — Inicio',       amount: '$250',   status: 'paid'    },
  { label: 'Saldo 50% — Entrega',         amount: '$250',   status: 'pending' },
];

const MESSAGES: Message[] = [
  { from: 'Ad Astra',  text: 'El diseño está listo para revisión. Podés verlo en el link compartido.',       time: 'Hace 2hs',  isUs: true  },
  { from: 'Vos',       text: 'Perfecto, lo reviso hoy. ¿Se puede cambiar el color del header?',             time: 'Hace 1hs',  isUs: false },
  { from: 'Ad Astra',  text: 'Sí, sin problema. Hacemos el ajuste y subimos una nueva versión.',            time: 'Hace 45m',  isUs: true  },
];

const FILES = [
  { name: 'Brief_Proyecto.pdf',         size: '84 KB',  type: 'pdf'  },
  { name: 'Diseño_v2_aprobado.fig',     size: '2.1 MB', type: 'fig'  },
  { name: 'Contrato_firmado.pdf',       size: '120 KB', type: 'pdf'  },
  { name: 'Assets_logos.zip',           size: '4.3 MB', type: 'zip'  },
];

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'roadmap',   label: 'Roadmap',   icon: LayoutDashboard },
  { id: 'archivos',  label: 'Archivos',  icon: FileText        },
  { id: 'pagos',     label: 'Pagos',     icon: CreditCard      },
  { id: 'mensajes',  label: 'Mensajes',  icon: MessageSquare   },
];

export default function PortalPreviewMock() {
  const [activeTab, setActiveTab] = useState<TabId>('roadmap');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--bg-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        maxWidth: '860px',
        margin: '48px auto 0',
        boxShadow: '0 32px 64px -16px rgba(0,0,0,0.5), 0 0 0 1px rgba(174,53,255,0.1)',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--bg-border)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57','#ffbd2e','#28c840'].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: 'var(--bg-primary)',
            borderRadius: '6px',
            padding: '4px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginLeft: '8px',
          }}
        >
          portal.ad-astra.me / proyectos / landing-ecommer…
        </div>
      </div>

      {/* App shell */}
      <div style={{ display: 'flex', minHeight: '360px' }}>

        {/* Sidebar */}
        <div
          style={{
            width: '200px',
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--bg-border)',
            padding: '20px 12px',
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
              paddingLeft: '8px',
            }}
          >
            Mi proyecto
          </p>

          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? 'rgba(174,53,255,0.12)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  marginBottom: '2px',
                }}
              >
                <Icon size={15} />
                {tab.label}
                {isActive && (
                  <ChevronRight size={12} style={{ marginLeft: 'auto' }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>

          {/* ROADMAP */}
          {activeTab === 'roadmap' && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                Progreso del proyecto
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {MILESTONES.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {m.status === 'done'    && <CheckCircle2 size={18} color="var(--turquesa-500)" />}
                    {m.status === 'active'  && <Clock        size={18} color="var(--accent)" />}
                    {m.status === 'pending' && <Circle       size={18} color="var(--text-muted)" />}
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: m.status === 'pending' ? 'var(--text-muted)' : m.status === 'active' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}>
                      {m.label}
                    </span>
                    <span style={{
                      marginLeft: 'auto',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                    }}>
                      {m.date}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ARCHIVOS */}
          {activeTab === 'archivos' && (
            <motion.div key="archivos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                Archivos del proyecto
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {FILES.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', background: 'var(--bg-primary)',
                    border: '1px solid var(--bg-border)', borderRadius: '8px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      {f.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {f.size}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PAGOS */}
          {activeTab === 'pagos' && (
            <motion.div key="pagos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                Estado de pagos
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PAYMENTS.map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px', background: 'var(--bg-primary)',
                    border: `1px solid ${p.status === 'paid' ? 'rgba(0,209,191,0.2)' : 'var(--bg-border)'}`,
                    borderRadius: '10px',
                  }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-primary)', margin: 0 }}>{p.label}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-primary)' }}>{p.amount}</span>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '20px',
                        background: p.status === 'paid' ? 'rgba(0,209,191,0.12)' : 'rgba(255,255,255,0.05)',
                        color: p.status === 'paid' ? 'var(--turquesa-500)' : 'var(--text-muted)',
                        border: p.status === 'paid' ? '1px solid rgba(0,209,191,0.2)' : '1px solid var(--bg-border)',
                      }}>
                        {p.status === 'paid' ? 'Pagado' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MENSAJES */}
          {activeTab === 'mensajes' && (
            <motion.div key="mensajes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                Conversación del proyecto
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {MESSAGES.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: m.isUs ? 'flex-start' : 'flex-end',
                  }}>
                    <div style={{
                      maxWidth: '80%', padding: '10px 14px', borderRadius: '10px',
                      background: m.isUs ? 'rgba(174,53,255,0.1)' : 'var(--bg-primary)',
                      border: `1px solid ${m.isUs ? 'rgba(174,53,255,0.2)' : 'var(--bg-border)'}`,
                    }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: m.isUs ? 'var(--accent)' : 'var(--text-muted)', margin: '0 0 4px' }}>
                        {m.from}
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        {m.text}
                      </p>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', padding: '0 4px' }}>
                      {m.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
```

---

## ISLAND 03 — `src/components/react/AnimatedCounter.tsx` (opcional)

Para mostrar stats si se agregan (ej: "50+ proyectos entregados").

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ target, suffix = '', duration = 1500 }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-display)' }}>
      {count}{suffix}
    </span>
  );
}
```

---

## NOTAS DE PERFORMANCE

- `PortalPreviewMock` y `FAQAccordion` usan `client:visible` → solo se hidratan cuando el usuario llega a esa sección
- El mock del portal usa datos estáticos hardcodeados — no hace fetch a ninguna API
- Framer Motion se importa solo en islands, nunca en archivos `.astro`
- Los `style={{ }}` inline en los islands evitan conflictos con Tailwind v4 y CSS variables
