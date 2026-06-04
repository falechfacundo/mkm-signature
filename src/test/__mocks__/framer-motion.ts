import React from 'react';

function createMotionComponent(tag: string) {
  const Comp = React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
    const { animate, exit, initial, whileInView, whileHover, whileTap, viewport, transition, variants, onAnimationComplete, layout, layoutId, ...rest } = props as Record<string, unknown>;
    return React.createElement(tag, { ...rest, ref });
  });
  Comp.displayName = `motion.${tag}`;
  return Comp;
}

const TAGS = ['div', 'span', 'nav', 'button', 'article', 'section', 'img', 'p', 'h2', 'h3', 'footer', 'header'];

const motion: Record<string, ReturnType<typeof createMotionComponent>> = {};
for (const tag of TAGS) {
  motion[tag] = createMotionComponent(tag);
}

const AnimatePresence = ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children);

const useScroll = () => ({ scrollY: { get: () => 0 }, scrollYProgress: { get: () => 0 } });
const useTransform = () => ({ get: () => 0 });
const useInView = () => false;
const useMotionValue = (initial: number) => ({ get: () => initial, set: () => {} });
const useSpring = (value: { get: () => number }) => ({ get: () => value.get() });
const useAnimation = () => ({ start: async () => {}, stop: () => {} });
const MotionConfig = ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children);

export {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  useAnimation,
  MotionConfig,
};
