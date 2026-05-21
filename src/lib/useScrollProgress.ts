import { useScroll } from 'framer-motion';
import { useRef } from 'react';

export function useElementScroll(offset: [string, string] = ['start end', 'end start']) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  return { ref, scrollYProgress };
}
