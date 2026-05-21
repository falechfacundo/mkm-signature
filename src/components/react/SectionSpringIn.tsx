'use client';

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export default function SectionSpringIn({ children, delay = 0, className, style }: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 110,
        damping: 18,
      }}
    >
      {children}
    </motion.div>
  );
}
