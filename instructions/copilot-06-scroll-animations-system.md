# COPILOT CONTEXT — 06: Scroll Animations System
# Ad Astra — Presentation Hub (onboarding.ad-astra.me)
# Patrón: Stripe-style scroll storytelling con Framer Motion

---

## INSTRUCCIÓN PARA COPILOT

Este archivo reemplaza completamente el sistema de animaciones anterior (IntersectionObserver + clases CSS).
Eliminar todas las clases `scroll-reveal`, `scroll-reveal-bottom`, `stagger-*` y `is-visible` del HTML.
El nuevo sistema usa exclusivamente Framer Motion con `useScroll`, `useTransform` y `motion` components.

TODAS las animaciones de scroll viven en React islands (`.tsx`).
Los archivos `.astro` solo proveen el wrapper HTML estático y llaman al island con `client:load`.

---

## INSTALACIÓN

```bash
npm install framer-motion
# framer-motion ya debería estar instalado — verificar que sea v11+
```

---

## ARQUITECTURA DEL NUEVO SISTEMA

```
Antes (eliminar):
  .astro con clases scroll-reveal → IntersectionObserver en <script> global

Después (implementar):
  .astro shell estático → React island con client:load → Framer Motion useScroll/useTransform
```

Cada bloque que tiene animación avanzada pasa a tener su propio island:

```
src/components/react/
  ├── HeroSection.tsx          ← word-by-word + parallax fondo
  ├── ProcessSection.tsx       ← SVG line draw + step activation (EL MÁS IMPORTANTE)
  ├── DeliverablesSection.tsx  ← spring stagger cards
  ├── PortalSection.tsx        ← auto-tab loop al entrar al viewport
  └── CTASection.tsx           ← glow pulsante en CTA button
```

Los bloques `Communication.astro` y `FAQ.astro` mantienen sus islands originales
(`FAQAccordion.tsx`) pero agregan spring stagger simple (ver sección al final).

---

## HOOK COMPARTIDO — `src/lib/useScrollProgress.ts`

```typescript
import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

/**
 * Devuelve el progreso de scroll de un elemento relativo al viewport.
 * offset: ["start end", "end start"] = el rango completo de visibilidad
 */
export function useElementScroll(offset: [string, string] = ['start end', 'end start']) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  return { ref, scrollYProgress };
}
```

---

## ISLAND 01 — `src/components/react/HeroSection.tsx`

**Efecto:** Headline aparece palabra por palabra al load. Fondo tiene parallax sutil al scroll.

```tsx
'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  animate,
  stagger,
} from 'framer-motion';
import { SITE } from '@config/site';
import type { HubParams } from '@lib/params';
import type { ServiceConfig } from '@config/services';

interface Props {
  params: HubParams;
  service: ServiceConfig;
}

const TRUST_BADGES = [
  'Entrega garantizada',
  '30 días de soporte',
  'Portal de proyecto incluido',
];

export default function HeroSection({ params, service }: Props) {
  const containerRef = useRef(null);

  // Parallax del fondo al hacer scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Palabras del headline para animación word-by-word
  const words = service.headline.split(' ');

  return (
    
      {/* Fondo decorativo con parallax */}
      
        {/* Gradiente radial violeta esquina superior derecha */}
        
        {/* Dot grid decorativo */}
        
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 12 }).map((_, col) => (
              
            ))
          )}
        
      

      {/* Contenido principal — fade out al hacer scroll */}
      
        

          {/* Eyebrow */}
          
            Ad Astra — Digital Studio
          

          {/* Headline — word by word */}
          
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  display: 'inline-block',
                  // Última palabra en gradiente si el cliente está definido
                  ...(params.client && i === words.length - 1
                    ? {
                        background: 'var(--gradient-brand)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }
                    : {}),
                }}
              >
                {word}
              
            ))}
            {/* Nombre del cliente si existe */}
            {params.client && (
              
                para {params.client}.
              
            )}
          

          {/* Subheadline */}
          
            {service.subheadline}
          

          {/* Trust badges */}
          
            {TRUST_BADGES.map((badge, i) => (
              
                · {badge}
              
            ))}
          

          {/* CTAs */}
          
            <a
              href={SITE.workanaCta}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 28px',
                background: 'var(--accent)',
                color: '#080808',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {service.ctaLabel}
            
            <a
              href={SITE.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 24px',
                border: '1px solid var(--bg-border)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--bg-border)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              Ver portfolio →
            
          

        
      
    
  );
}
```

**Actualizar `Hero.astro`:**
```astro
---
import HeroSection from '@components/react/HeroSection';
import type { HubParams } from '@lib/params';
import type { ServiceConfig } from '@config/services';
interface Props { params: HubParams; service: ServiceConfig; }
const { params, service } = Astro.props;
---
<HeroSection client:load params={params} service={service} />
```

---

## ISLAND 02 — `src/components/react/ProcessSection.tsx`

**EL MÁS IMPORTANTE. Efecto Stripe:** Sección sticky. Mientras scrollás, una línea SVG se dibuja de izquierda a derecha conectando los pasos. Cada paso se "activa" (ilumina) cuando la línea llega a él.

```tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROCESS_STEPS } from '@data/process';

export default function ProcessSection() {
  const containerRef = useRef(null);

  // scrollYProgress va de 0 a 1 mientras la sección sticky está en pantalla
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring suaviza el progreso para que la línea no sea robótica
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // La línea SVG se dibuja: pathLength va de 0 a 1
  const lineProgress = useTransform(smoothProgress, [0.05, 0.95], [0, 1]);

  // Cada paso se activa cuando la línea llega a él
  // 5 pasos = activaciones en 0, 0.25, 0.5, 0.75, 1.0 del progreso
  const stepThresholds = PROCESS_STEPS.map((_, i) => i / (PROCESS_STEPS.length - 1));

  return (
    // El contenedor tiene height: 300vh para que el sticky tenga espacio de scroll
    
      {/* Panel sticky — permanece en pantalla mientras scrollás */}
      
        
          {/* Header de sección */}
          
            
              Proceso
            
            
              Cómo trabajamos
            
          

          {/* Timeline container */}
          

            {/* SVG línea animada — se dibuja de izquierda a derecha */}
            <svg
              style={{
                position: 'absolute',
                top: '20px', // alineada al centro de los números
                left: '28px',
                right: '28px',
                width: 'calc(100% - 56px)',
                height: '2px',
                overflow: 'visible',
              }}
              viewBox="0 0 1000 2"
              preserveAspectRatio="none"
            >
              {/* Línea base (siempre visible, muy tenue) */}
              
              {/* Línea animada */}
              
              
                
                  
                  
                
              
            

            {/* Steps */}
            
              {PROCESS_STEPS.map((step, i) => {
                const threshold = stepThresholds[i];
                // El step se activa cuando lineProgress supera su threshold
                // Usamos useTransform para crear un valor de opacidad por step
                const stepOpacity = useTransform(
                  smoothProgress,
                  [
                    Math.max(0, threshold - 0.05),
                    threshold,
                    threshold + 0.05,
                  ],
                  [0.3, 1, 1]
                );
                const stepColor = useTransform(
                  smoothProgress,
                  [Math.max(0, threshold - 0.08), threshold],
                  ['var(--text-muted)', 'var(--accent)']
                );
                const stepNumberScale = useTransform(
                  smoothProgress,
                  [Math.max(0, threshold - 0.05), threshold],
                  [1, 1.15]
                );

                return (
                  
                    {/* Número con dot indicator en la línea */}
                    
                      {/* Dot en la línea */}
                      
                      
                        {step.number}
                      
                    

                    
                      {step.title}
                    

                    
                      {step.desc}
                    

                    
                      {step.duration}
                    
                  
                );
              })}
            
          

          {/* Scroll hint — desaparece cuando empezás a scrollear */}
          
            
              Scroll para ver el proceso
            
            
          

        
      
    
  );
}
```

**Actualizar `Process.astro`:**
```astro
---
import ProcessSection from '@components/react/ProcessSection';
---
<ProcessSection client:load />
```

**NOTA CRÍTICA:** `height: 300vh` en el contenedor es intencional — le da al usuario suficiente recorrido de scroll para ver los 5 pasos activarse. Se puede ajustar a `250vh` si se quiere más rápido.

---

## ISLAND 03 — `src/components/react/DeliverablesSection.tsx`

**Efecto:** Cards entran con spring stagger desde abajo. El último card (garantías) tiene un efecto de reveal distinto — entra desde la izquierda.

```tsx
'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { DELIVERABLES } from '@data/deliverables';
import type { ServiceConfig } from '@config/services';

interface Props { service: ServiceConfig; }

const GUARANTEES = [
  { text: 'Testeado antes de entrega', sub: 'Revisamos todo antes de cerrar el proyecto' },
  { text: 'Revisiones incluidas', sub: 'Mínimo 2 rondas de feedback sin cargo' },
  { text: 'Soporte 30 días', sub: 'Cualquier problema post-entrega lo resolvemos' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function DeliverablesSection({ service }: Props) {
  const items = DELIVERABLES[service.id];

  return (
    
      

        {/* Header */}
        
          
            Entregables
          
          
            Qué recibís exactamente
          
          
            Sin letra chica. Todo lo que forma parte del proyecto.
          
        

        {/* Grid de cards */}
        
          {items.map((item, i) => {
            const Icon = (Icons[item.icon as keyof typeof Icons] as React.ElementType) ?? Icons.Box;
            const isLast = i === items.length - 1;

            return (
              
                
                
                  {item.title}
                
                
                  {item.desc}
                
              
            );
          })}
        

        {/* Garantías */}
        
          {GUARANTEES.map((g, i) => (
            
              
              
                
                  {g.text}
                
                
                  {g.sub}
                
              
            
          ))}
        

      
    
  );
}
```

**Actualizar `Deliverables.astro`:**
```astro
---
import DeliverablesSection from '@components/react/DeliverablesSection';
import type { ServiceConfig } from '@config/services';
interface Props { service: ServiceConfig; }
const { service } = Astro.props;
---
<DeliverablesSection client:visible service={service} />
```

---

## ISLAND 04 — Actualizar `PortalPreviewMock.tsx`

**Efecto nuevo:** Las tabs rotan automáticamente cada 3 segundos cuando el componente entra al viewport. El usuario puede clickear para controlar manualmente y el auto-loop se pausa.

Agregar este hook al `PortalPreviewMock.tsx` existente:

```tsx
// Agregar imports al inicio del archivo:
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

// Reemplazar el useState de activeTab con este bloque:
const [activeTab, setActiveTab] = useState('roadmap');
const [isManual, setIsManual] = useState(false);
const containerRef = useRef(null);
const isInView = useInView(containerRef, { once: false, margin: '-100px' });

const TAB_ORDER: TabId[] = ['roadmap', 'archivos', 'pagos', 'mensajes'];

useEffect(() => {
  if (!isInView || isManual) return;

  const interval = setInterval(() => {
    setActiveTab(prev => {
      const currentIndex = TAB_ORDER.indexOf(prev);
      return TAB_ORDER[(currentIndex + 1) % TAB_ORDER.length];
    });
  }, 3000);

  return () => clearInterval(interval);
}, [isInView, isManual]);

// En los botones de tab, actualizar el onClick:
onClick={() => {
  setActiveTab(tab.id);
  setIsManual(true); // el usuario tomó control
}}

// Agregar ref al contenedor externo del mock:
// 
```

---

## ISLAND 05 — `src/components/react/CTASection.tsx`

**Efecto:** El botón CTA tiene un glow pulsante que empieza cuando entra al viewport. El fondo tiene un gradiente radial que reacciona levemente al scroll.

```tsx
'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SITE } from '@config/site';
import type { HubParams } from '@lib/params';
import type { ServiceConfig } from '@config/services';

interface Props { params: HubParams; service: ServiceConfig; }

export default function CTASection({ params, service }: Props) {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);

  return (
    
      {/* Gradiente de fondo con parallax */}
      

      

        
          ¿Todo claro?
        

        
          Listo para arrancar.
        

        
          La propuesta está esperando tu respuesta en Workana.
          Respondé y empezamos en 24hs.
        

        {/* Botón CTA con glow pulsante */}
        
          
            {service.ctaLabel} →
          
        

        
          ¿Tenés alguna pregunta antes?{' '}
          
            Escribinos acá.
          
        

        
          Respuesta en menos de 2hs · Sin compromiso
        

      
    
  );
}
```

**Actualizar `CTAFinal.astro`:**
```astro
---
import CTASection from '@components/react/CTASection';
import type { HubParams } from '@lib/params';
import type { ServiceConfig } from '@config/services';
interface Props { params: HubParams; service: ServiceConfig; }
const { params, service } = Astro.props;
---
<CTASection client:visible params={params} service={service} />
```

---

## LIMPIEZA — eliminar del proyecto

```
1. En global.css: eliminar todo el bloque de .scroll-reveal*, .stagger-*, .is-visible
2. En BaseLayout.astro: eliminar el bloque <script> del IntersectionObserver
3. En todos los .astro de bloques: eliminar clases scroll-reveal-bottom, stagger-{n}, is-visible
```

---

## RESUMEN DE EFECTOS POR BLOQUE

| Bloque | Efecto | Intensidad |
|--------|--------|-----------|
| Hero | Word-by-word reveal + fade-out al scroll | ★★★★☆ |
| Process | Sticky scrolltelling + SVG line draw + step activation | ★★★★★ |
| Deliverables | Spring stagger cards + slide-in garantías | ★★★☆☆ |
| Portal Preview | Auto-tab loop cada 3s al entrar al viewport | ★★★★☆ |
| FAQ | Spring stagger (mantener FAQAccordion existente) | ★★☆☆☆ |
| CTA Final | Glow pulsante en botón + parallax fondo | ★★★★☆ |

---

## NOTA SOBRE PERFORMANCE

- `client:load` solo en Hero y Process (necesitan hidratarse inmediatamente)
- `client:visible` en el resto (se hidratan cuando entran al viewport)
- El efecto sticky de Process usa `height: 300vh` — esto es intencional y correcto en Astro SSG
- `useSpring` en Process suaviza el scroll para que la línea no salte en trackpads

---

## BLOQUES CON ANIMACION SIMPLE (NO SCROLLTELLING)

`Communication.astro` y `FAQ.astro` no deben competir visualmente con Hero/Process.
Aplicar solo entrada con spring suave al entrar al viewport.

### Opcion recomendada: wrapper reutilizable

Crear `src/components/react/SectionSpringIn.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
}

export default function SectionSpringIn({ children, delay = 0 }: Props) {
  return (
    <motion.div
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
```

Uso en `Communication.astro`:

```astro
---
import SectionSpringIn from '@components/react/SectionSpringIn';
---

<SectionSpringIn client:visible>
  <!-- contenido actual del bloque -->
</SectionSpringIn>
```

Uso en `FAQ.astro`:

```astro
---
import SectionSpringIn from '@components/react/SectionSpringIn';
---

<SectionSpringIn client:visible>
  <!-- header + FAQAccordion actual -->
</SectionSpringIn>
```

---

## ORDEN DE IMPLEMENTACION (OBLIGATORIO)

1. HeroSection.tsx
2. ProcessSection.tsx
3. DeliverablesSection.tsx
4. Actualizacion de PortalPreviewMock.tsx (auto-loop + manual override)
5. CTASection.tsx
6. Wrapper spring simple para Communication/FAQ
7. Limpieza total de IntersectionObserver y clases legacy

Este orden existe para validar primero los dos ejes de conversion:
impacto inicial (Hero) y claridad de proceso (Process).

---

## CRITERIOS DE ACEPTACION (DEFINITION OF DONE)

Se considera implementado correctamente solo si se cumple todo:

1. No queda ningun `scroll-reveal`, `stagger-` ni `is-visible` en el codebase.
2. No queda `IntersectionObserver` en `BaseLayout.astro`.
3. `Hero.astro` usa `HeroSection` con `client:load`.
4. `Process.astro` usa `ProcessSection` con `client:load` y scroll sticky funcional.
5. La linea SVG de Process se dibuja progresivamente segun scroll.
6. Cada step de Process cambia de estado muted a active cuando corresponde.
7. `Deliverables.astro` usa `DeliverablesSection` con `client:visible`.
8. `PortalPreviewMock.tsx` rota tabs cada 3s cuando esta en viewport.
9. Al clickear una tab del portal, el auto-loop se pausa (manual override).
10. `CTAFinal.astro` usa `CTASection` con glow pulsante al entrar al viewport.
11. Build de produccion sin errores (`pnpm build`).
12. Lighthouse mobile no muestra regressions severas en CLS por animaciones.

---

## CHECKLIST DE QA VISUAL (MANUAL)

Probar desktop + mobile:

1. Hero: headline entra palabra por palabra, sin lag ni salto de layout.
2. Hero: fondo responde al scroll con parallax sutil, sin distraer del CTA.
3. Process: el sticky mantiene foco y la linea se percibe continua.
4. Process: el usuario entiende claramente en que paso esta.
5. Portal: el auto-loop se ve intencional, no "buggy" ni acelerado.
6. Portal: al interactuar, el usuario mantiene control manual.
7. CTA: glow visible pero sobrio; no parece banner de oferta agresivo.

Si alguna animacion compite con la lectura, reducir amplitud o duracion.
Regla de oro: conversion primero, efecto despues.

---

## COMMIT SUGERIDO PARA LA IMPLEMENTACION (CUANDO ARRANQUE)

Separar en commits explicativos:

1. `feat(animation): migrate hero to framer-motion word-by-word reveal`
2. `feat(animation): implement sticky process scrolltelling timeline`
3. `feat(animation): migrate deliverables and cta to motion islands`
4. `feat(animation): add portal auto-tab loop with manual override`
5. `refactor(animation): remove legacy intersectionobserver reveal system`

No combinar la limpieza legacy con la introduccion inicial de Process.
Si hay bug de scroll, poder hacer rollback aislado.