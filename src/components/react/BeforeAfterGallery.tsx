// ─── SECCIÓN ANTES Y DESPUÉS COMENTADA ──────────────────────────────
// Pendiente de reemplazar imágenes con:
// - Corte before: alguien con mucho pelo/desprolijo → after: pelo recién cortado
// - Barba before: barba crecida/desprolija → after: barba perfilada
// - Corte+Barba before: pelo + barba crecida → after: pelo cortado + barba perfilada

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';

// interface BeforeAfterItem {
//   id: string;
//   label: string;
//   before: string;
//   after: string;
//   beforeAlt: string;
//   afterAlt: string;
// }

// const ITEMS: BeforeAfterItem[] = [
//   {
//     id: 'corte',
//     label: 'Corte',
//     before: '/images/before-after/corte-before.webp',
//     after: '/images/before-after/corte-after.webp',
//     beforeAlt: 'Antes del corte de pelo',
//     afterAlt: 'Después del corte de pelo',
//   },
//   {
//     id: 'barba',
//     label: 'Barba',
//     before: '/images/before-after/barba-before.webp',
//     after: '/images/before-after/barba-after.webp',
//     beforeAlt: 'Antes del perfilado de barba',
//     afterAlt: 'Después del perfilado de barba',
//   },
//   {
//     id: 'combo',
//     label: 'Corte + Barba',
//     before: '/images/before-after/combo-before.webp',
//     after: '/images/before-after/combo-after.webp',
//     beforeAlt: 'Antes del combo corte y barba',
//     afterAlt: 'Después del combo corte y barba',
//   },
// ];

// function Slider({ item }: { item: BeforeAfterItem }) {
//   const [pos, setPos] = useState(50);
//   const [dragging, setDragging] = useState(false);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const updateFromEvent = (clientX: number) => {
//     const el = containerRef.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const x = clientX - rect.left;
//     const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
//     setPos(pct);
//   };

//   useEffect(() => {
//     if (!dragging) return;
//     const onMove = (e: MouseEvent | TouchEvent) => {
//       const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
//       updateFromEvent(clientX);
//     };
//     const onUp = () => setDragging(false);
//     window.addEventListener('mousemove', onMove);
//     window.addEventListener('mouseup', onUp);
//     window.addEventListener('touchmove', onMove);
//     window.addEventListener('touchend', onUp);
//     return () => {
//       window.removeEventListener('mousemove', onMove);
//       window.removeEventListener('mouseup', onUp);
//       window.removeEventListener('touchmove', onMove);
//       window.removeEventListener('touchend', onUp);
//     };
//   }, [dragging]);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         position: 'relative',
//         width: '100%',
//         aspectRatio: '1 / 1',
//         borderRadius: '14px',
//         overflow: 'hidden',
//         border: '1px solid var(--bg-border)',
//         background: 'var(--bg-surface)',
//         cursor: dragging ? 'grabbing' : 'grab',
//         userSelect: 'none',
//         touchAction: 'none',
//       }}
//       onMouseDown={(e) => {
//         setDragging(true);
//         updateFromEvent(e.clientX);
//       }}
//       onTouchStart={(e) => {
//         setDragging(true);
//         updateFromEvent(e.touches[0].clientX);
//       }}
//       role="slider"
//       aria-label={`Comparación antes y después de ${item.label}`}
//       aria-valuemin={0}
//       aria-valuemax={100}
//       aria-valuenow={Math.round(pos)}
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5));
//         if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
//       }}
//     >
//       <img
//         src={item.after}
//         alt={item.afterAlt}
//         loading="lazy"
//         decoding="async"
//         draggable={false}
//         style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//       />
//       <div
//         style={{
//           position: 'absolute',
//           inset: 0,
//           width: `${pos}%`,
//           overflow: 'hidden',
//           borderRight: '2px solid var(--accent)',
//         }}
//       >
//         <img
//           src={item.before}
//           alt={item.beforeAlt}
//           loading="lazy"
//           decoding="async"
//           draggable={false}
//           style={{
//             position: 'absolute',
//             inset: 0,
//             width: containerRef.current?.clientWidth ?? '100%',
//             height: '100%',
//             objectFit: 'cover',
//             display: 'block',
//             maxWidth: 'none',
//           }}
//         />
//       </div>

//       <span
//         aria-hidden
//         style={{
//           position: 'absolute',
//           top: '0.6rem',
//           left: '0.6rem',
//           fontSize: '0.6rem',
//           letterSpacing: '0.1em',
//           textTransform: 'uppercase',
//           color: 'var(--text-primary)',
//           background: 'rgba(8,12,20,0.75)',
//           padding: '0.25rem 0.55rem',
//           borderRadius: '999px',
//           fontWeight: 600,
//           backdropFilter: 'blur(6px)',
//         }}
//       >
//         Antes
//       </span>
//       <span
//         aria-hidden
//         style={{
//           position: 'absolute',
//           top: '0.6rem',
//           right: '0.6rem',
//           fontSize: '0.6rem',
//           letterSpacing: '0.1em',
//           textTransform: 'uppercase',
//           color: 'var(--text-primary)',
//           background: 'rgba(212,167,44,0.85)',
//           padding: '0.25rem 0.55rem',
//           borderRadius: '999px',
//           fontWeight: 600,
//           backdropFilter: 'blur(6px)',
//         }}
//       >
//         Después
//       </span>

//       <div
//         aria-hidden
//         style={{
//           position: 'absolute',
//           top: 0,
//           bottom: 0,
//           left: `${pos}%`,
//           transform: 'translateX(-50%)',
//           width: '36px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           pointerEvents: 'none',
//         }}
//       >
//         <div
//           style={{
//             width: '36px',
//             height: '36px',
//             borderRadius: '999px',
//             background: 'var(--accent)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 0 18px rgba(212,167,44,0.45), 0 2px 6px rgba(0,0,0,0.4)',
//           }}
//         >
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#080c14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <polyline points="15 18 9 12 15 6" />
//           </svg>
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#080c14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-4px' }}>
//             <polyline points="9 18 15 12 9 6" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function BeforeAfterGallery() {
//   return (
//     <div style={{ marginTop: '4rem' }}>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: '-80px' }}
//         transition={{ duration: 0.5, ease: [0.17, 0.67, 0.29, 1] }}
//         style={{ textAlign: 'center', marginBottom: '2.5rem' }}
//       >
//         <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
//           Resultados reales
//         </span>
//         <h3 style={{ marginTop: '0.65rem', marginBottom: '0.6rem', fontSize: 'clamp(1.5rem,3vw,2rem)' }}>
//           Antes y después
//         </h3>
//         <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
//           Deslizá para ver la transformación completa.
//         </p>
//       </motion.div>

//       <div
//         style={{
//           display: 'grid',
//           gap: '1.25rem',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//           maxWidth: '56rem',
//           margin: '0 auto',
//         }}
//       >
//         {ITEMS.map((item, i) => (
//           <motion.div
//             key={item.id}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: '-60px' }}
//             transition={{ delay: i * 0.1, duration: 0.5, ease: [0.17, 0.67, 0.29, 1] }}
//             style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
//           >
//             <Slider item={item} />
//             <div style={{ textAlign: 'center' }}>
//               <span
//                 className="mono"
//                 style={{
//                   fontSize: '0.7rem',
//                   color: 'var(--accent)',
//                   background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
//                   border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
//                   borderRadius: '999px',
//                   padding: '0.2rem 0.7rem',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.08em',
//                 }}
//               >
//                 {item.label}
//               </span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
