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
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: index * 0.06,
              duration: 0.45,
              ease: [0.17, 0.67, 0.29, 1],
              type: 'spring',
              stiffness: 100,
              damping: 18,
            }}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              background: isOpen
                ? 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, rgba(20,30,54,1)) 0%, rgba(14,22,40,1) 100%)'
                : 'linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(14,14,14,1) 100%)',
              border: `1px solid ${isOpen ? 'color-mix(in srgb, var(--accent) 40%, transparent)' : 'var(--bg-border)'}`,
              boxShadow: isOpen
                ? '0 20px 40px -24px rgba(212,167,44,0.25)'
                : '0 12px 24px -20px rgba(0,0,0,0.9)',
              transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
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
                padding: '18px 22px',
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
                    color: 'var(--text-primary)',
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
                animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
                transition={{ duration: 0.3, ease: [0.17, 0.67, 0.29, 1] }}
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
                  initial={{ height: 0, opacity: 0, scaleY: 0.95 }}
                  animate={{ height: 'auto', opacity: 1, scaleY: 1 }}
                  exit={{ height: 0, opacity: 0, scaleY: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.17, 0.67, 0.29, 1] }}
                  style={{ overflow: 'hidden', transformOrigin: 'top' }}
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
