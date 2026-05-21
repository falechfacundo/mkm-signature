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
