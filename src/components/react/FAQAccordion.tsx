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
    <div className="flex flex-col gap-3 md:gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const id = `faq-item-${index}`;

        return (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-0.5"
            style={{
              background: isOpen
                ? 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, #1a1a1a) 0%, #141414 100%)'
                : 'linear-gradient(180deg, #1a1a1a 0%, #141414 100%)',
              border: `1px solid ${isOpen ? 'color-mix(in srgb, var(--accent) 45%, transparent)' : 'var(--bg-border)'}`,
              boxShadow: isOpen
                ? '0 22px 34px -24px color-mix(in srgb, var(--accent) 45%, transparent)'
                : '0 12px 24px -20px rgba(0,0,0,0.9)',
              transition: 'background 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease',
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`${id}-panel`}
              id={`${id}-trigger`}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 22px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '16px',
              }}
            >
              <div className="flex items-start gap-4 md:gap-5">
                <span
                  className="mono mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-[10px] tracking-wider"
                  style={{
                    color: isOpen ? 'var(--accent)' : 'var(--text-muted)',
                    background: isOpen
                      ? 'color-mix(in srgb, var(--accent) 16%, transparent)'
                      : 'color-mix(in srgb, var(--text-muted) 14%, transparent)',
                    border: `1px solid ${isOpen ? 'color-mix(in srgb, var(--accent) 36%, transparent)' : 'var(--bg-border)'}`,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: isOpen ? 'var(--text-primary)' : 'var(--text-primary)',
                    lineHeight: 1.45,
                    letterSpacing: '0.01em',
                  }}
                >
                  {item.q}
                </span>
              </div>
              <motion.span
                style={{
                  flexShrink: 0,
                  color: isOpen ? 'var(--accent)' : 'var(--text-muted)',
                  width: '30px',
                  height: '30px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${isOpen ? 'color-mix(in srgb, var(--accent) 40%, transparent)' : 'var(--bg-border)'}`,
                  background: isOpen
                    ? 'color-mix(in srgb, var(--accent) 12%, transparent)'
                    : 'color-mix(in srgb, var(--text-muted) 8%, transparent)',
                }}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={`${id}-trigger`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    style={{
                      height: '1px',
                      margin: '0 22px 14px',
                      background: 'linear-gradient(90deg, color-mix(in srgb, var(--accent) 45%, transparent), transparent)',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      padding: '0 22px 22px',
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
