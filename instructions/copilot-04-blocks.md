# COPILOT CONTEXT — 04: Blocks (Astro Sections)
# Ad Astra — Presentation Hub (onboarding.ad-astra.me)

---

## INSTRUCCIÓN PARA COPILOT

Este archivo especifica cada bloque de la página en `src/blocks/`.
Implementar en el orden indicado. Cada bloque es un `.astro` file.
Usar ÚNICAMENTE las CSS variables del design system (copilot-01).

---

## REGLAS GENERALES DE BLOQUES

- Cada bloque tiene un `id` para anclas de navegación
- Padding vertical mínimo: `py-24` (96px) en desktop, `py-16` en mobile
- Max-width del contenido: `max-w-6xl mx-auto px-6`
- Fondo alterna: `--bg-primary` (#080808) y `--bg-secondary` (#111111)
- Añadir clase `scroll-reveal-bottom` a elementos que deben animarse al hacer scroll

---

## BLOQUE 01 — `src/blocks/Hero.astro`

**Objetivo:** Generar confianza y claridad en los primeros 10 segundos.

**Props:**
```typescript
import type { HubParams } from '@lib/params';
import type { ServiceConfig } from '@config/services';
interface Props {
  params: HubParams;
  service: ServiceConfig;
}
```

**Estructura HTML:**
```
<section id="hero"> [fondo: --bg-primary, min-h-screen, relative, overflow-hidden]
  [fondo decorativo: noise overlay + gradiente radial sutil violeta en esquina superior derecha]

  <div> [max-w-6xl mx-auto px-6, flex items-center, min-h-screen, py-32]
    <div> [max-w-3xl, flex flex-col gap-6]

      [EYEBROW] <span> [font-mono, text-sm, --accent (violeta), tracking-widest, uppercase]
        "Ad Astra — Digital Studio"

      [HEADLINE] <h1> [font-display (Syne), clamp(3rem,7vw,6rem), --text-primary, leading-tight]
        {service.headline}
        → Si params.client existe: "para {client}." al final en color --accent

      [SUBHEADLINE] <p> [font-body, text-xl, --text-secondary, max-w-2xl, leading-relaxed]
        {service.subheadline}

      [TRUST BADGES] <div> [flex gap-3, flex-wrap]
        3 badges pequeños con íconos:
        • "Entrega garantizada"
        • "30 días de soporte"
        • "Portal de proyecto incluido"
        Estilo: border --bg-border, bg --bg-surface, font-mono text-xs, --text-secondary

      [CTAs] <div> [flex gap-4, flex-wrap, mt-2]
        Botón primario: bg --accent, text #080808, font-semibold, px-8 py-4, rounded-lg
          Texto: {service.ctaLabel}
          href: SITE.workanaCta (target="_blank")
        Botón ghost: border --bg-border, --text-secondary, px-6 py-4, rounded-lg
          Texto: "Ver portfolio →"
          href: SITE.portfolioUrl (target="_blank")

    </div>
  </div>

  [DECORATIVO] Elemento abstracto en esquina derecha:
    Grid de puntos (dot grid) o líneas geométricas en --bg-border, opacity 20%
    Tamaño: ~400x400px, position absolute right-0 top-1/2 -translate-y-1/2
</section>
```

**Motion:** Los hijos del `<div>` principal aparecen con stagger:
- eyebrow: `stagger-1 scroll-reveal-bottom`
- h1: `stagger-2 scroll-reveal-bottom`
- p: `stagger-3 scroll-reveal-bottom`
- badges: `stagger-4 scroll-reveal-bottom`
- CTAs: `stagger-5 scroll-reveal-bottom`

---

## BLOQUE 02 — `src/blocks/Process.astro`

**Objetivo:** Eliminar fricción operativa — "¿cómo funciona esto?"

**Fondo:** `--bg-secondary` (#111111)

**Estructura:**
```
<section id="proceso"> [py-24, bg --bg-secondary]
  <div> [max-w-6xl mx-auto px-6]

    [HEADER] scroll-reveal-bottom
      <span> [mono, text-xs, --accent, uppercase, tracking-widest] "Proceso"
      <h2> [display, text-4xl, --text-primary] "Cómo trabajamos"
      <p> [body, --text-secondary] "Estructura clara de inicio a fin. Sin sorpresas."

    [STEPS] <div> [relative, mt-16]
      → Desktop: flex horizontal con línea conectora
      → Mobile: flex flex-col

      Cada step (de PROCESS_STEPS):
        <div> [flex flex-col gap-3, scroll-reveal-bottom, stagger-{n}]
          <span> [mono, text-xs, --accent] "{step.number}"
          <h3> [display, text-xl, --text-primary] "{step.title}"
          <p>  [body, text-sm, --text-secondary] "{step.desc}"
          <span> [mono, text-xs, --text-muted, bg --bg-surface, px-2 py-1, rounded]
            "{step.duration}"

      Línea conectora entre steps (desktop):
        <div> [absolute, top-0, left-0, right-0, h-px, bg-gradient: --bg-border → --accent → --bg-border]
```

---

## BLOQUE 03 — `src/blocks/Deliverables.astro`

**Objetivo:** Responder "¿Qué recibo exactamente?"

**Props:** `service: ServiceConfig`
**Fondo:** `--bg-primary` (#080808)

**Estructura:**
```
<section id="entregables"> [py-24]
  <div> [max-w-6xl mx-auto px-6]

    [HEADER] scroll-reveal-bottom
      <span> [mono, --accent, uppercase, tracking-widest, text-xs] "Entregables"
      <h2> [display, text-4xl] "Qué recibís exactamente"
      <p> [--text-secondary] "Sin letra chica. Todo lo que forma parte del proyecto."

    [GRID] <div> [grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-4, mt-12]
      Cada item (de DELIVERABLES[service.id]):
        <div> [bg --bg-surface, border --bg-border, rounded-xl, p-6,
               card-hover, scroll-reveal-bottom, stagger-{n}]
          [ícono] → usar lucide-react via React island o SVG inline
                    color: si es el último item (ShieldCheck) usar --turquesa-500, resto --accent
          <h3> [display, text-lg, --text-primary, mt-3] "{item.title}"
          <p>  [body, text-sm, --text-secondary, mt-1] "{item.desc}"

    [GARANTÍAS] <div> [mt-16, border-t --bg-border, pt-12]
      <h3> [display, text-2xl] "Garantías incluidas"
      <div> [grid grid-cols-1 md:grid-cols-3, gap-6, mt-8]
        3 items con ícono checkmark --turquesa-500:
        • "Testeado antes de entrega — Revisamos todo antes de cerrar el proyecto"
        • "Revisiones incluidas — Mínimo 2 rondas de feedback sin cargo"
        • "Soporte 30 días — Cualquier problema post-entrega lo resolvemos"
```

---

## BLOQUE 04 — `src/blocks/PortalPreview.astro`

**Objetivo:** Mostrar el sistema interno como diferenciador clave — "no sos un freelancer más"

**Fondo:** `--bg-secondary` (#111111)

**Estructura:**
```
<section id="portal"> [py-24, bg --bg-secondary]
  <div> [max-w-6xl mx-auto px-6]

    [HEADER] scroll-reveal-bottom
      <span> [mono, --accent, uppercase, tracking-widest, text-xs] "Sistema de gestión"
      <h2> [display, text-4xl] "Tu proyecto, organizado desde el día uno"
      <p> [--text-secondary, max-w-2xl]
        "No más actualizaciones perdidas en WhatsApp. Todo en un portal dedicado:
         roadmap, archivos, pagos y comunicación centralizada."

    [PORTAL MOCK] → React island
      <PortalPreviewMock client:visible />

    [CAPTION] <div> [mt-8, flex flex-col md:flex-row gap-4, items-start md:items-center]
      <p> [mono, text-sm, --text-muted]
        "Acceso disponible en portal.ad-astra.me al confirmar el proyecto"
      <a> [mono, text-sm, --accent, underline-offset-4, hover:underline]
        href="https://portal.ad-astra.me" target="_blank"
        "Ver el portal →"
```

**Nota para Copilot:** El mock del portal es el componente React `PortalPreviewMock.tsx`.
Ver especificación completa en copilot-05-react-islands.md.

---

## BLOQUE 05 — `src/blocks/Communication.astro`

**Objetivo:** Eliminar la objeción "¿cómo me comunico con ellos?"

**Fondo:** `--bg-primary` (#080808)

**Estructura:**
```
<section id="comunicacion"> [py-24]
  <div> [max-w-6xl mx-auto px-6]

    [HEADER] scroll-reveal-bottom
      <span> [mono, --accent, uppercase, tracking-widest, text-xs] "Comunicación"
      <h2> [display, text-4xl] "Todo documentado. Nada se pierde."
      <p> [--text-secondary]
        "La comunicación del proyecto tiene estructura. Sin depender de que alguien responda un WhatsApp."

    [GRID] <div> [grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4, gap-4, mt-12]

      Card 1: [ícono: Clock --accent]
        "Updates cada 48–72hs"
        "Progreso visible en el portal sin que tengas que preguntar."

      Card 2: [ícono: MessageSquare --accent]
        "Canal directo en el proyecto"
        "Mensajes organizados por proyecto. Sin mezclar conversaciones."

      Card 3: [ícono: FileText --accent]
        "Todo documentado"
        "Decisiones, cambios y acuerdos quedan registrados. Sin malentendidos."

      Card 4: [ícono: Video --turquesa-500]
        "Videocalls si aplica"
        "Para revisiones o definiciones que son más claras en vivo."

    Cada card:
      <div> [bg --bg-surface, border --bg-border, rounded-xl, p-6,
             scroll-reveal-bottom, stagger-{n}]
        [ícono] [h3 display text-lg] [p body text-sm --text-secondary mt-2]
```

---

## BLOQUE 06 — `src/blocks/FAQ.astro`

**Objetivo:** Desactivar objeciones antes de que surjan.

**Props:** `service: ServiceConfig`
**Fondo:** `--bg-secondary` (#111111)

**Estructura:**
```astro
---
import { getFAQs } from '@data/faq';
import FAQAccordion from '@components/react/FAQAccordion';

interface Props { service: import('@config/services').ServiceConfig; }
const { service } = Astro.props;

const faqs = getFAQs(service.id);
---

<section id="faq" class="py-24" style="background:var(--bg-secondary)">
  <div class="max-w-6xl mx-auto px-6">

    <div class="scroll-reveal-bottom mb-12">
      <span class="mono text-xs tracking-widest uppercase" style="color:var(--accent)">FAQ</span>
      <h2 class="text-4xl mt-2" style="font-family:var(--font-display)">Preguntas frecuentes</h2>
      <p style="color:var(--text-secondary)" class="mt-3">
        Las dudas más comunes, respondidas antes de que las hagas.
      </p>
    </div>

    <FAQAccordion client:visible items={faqs} />

  </div>
</section>
```

---

## BLOQUE 07 — `src/blocks/CTAFinal.astro`

**Objetivo:** Fricción cero para aceptar la propuesta. El único CTA real del sitio.

**Props:** `params: HubParams`, `service: ServiceConfig`
**Fondo:** `--bg-primary` (#080808) con gradiente radial violeta sutil al centro

**Estructura:**
```
<section id="cta"> [py-32, relative, overflow-hidden]
  [Fondo decorativo: gradiente radial center, rgba(174,53,255,0.06)]

  <div> [max-w-3xl mx-auto px-6 text-center, scroll-reveal-bottom]

    <span> [mono, text-xs, --accent, tracking-widest, uppercase]
      "¿Todo claro?"

    <h2> [display, clamp(2.5rem,5vw,4rem), --text-primary, mt-4, leading-tight]
      "Listo para arrancar."

    <p> [body, text-xl, --text-secondary, mt-4, max-w-xl mx-auto]
      "La propuesta está esperando tu respuesta en Workana.
       Respondé y empezamos en 24hs."

    [CTA PRINCIPAL]
    <a> [mt-8, inline-block, bg --accent, text #080808, font-semibold,
         text-lg, px-10 py-5, rounded-lg, hover:bg --accent-hover,
         transition-colors, no-underline]
      href=SITE.workanaCta target="_blank"
      "{service.ctaLabel} →"

    [CTA SECUNDARIO]
    <p> [mt-6, body, text-sm, --text-muted]
      "¿Tenés alguna pregunta antes? "
      <a> [--accent, underline-offset-4, hover:underline]
        href="mailto:{SITE.contactEmail}"
        "Escribinos acá."

    [TRUST]
    <p> [mono, text-xs, --text-muted, mt-8]
      "Respuesta en menos de 2hs · Sin compromiso"
```

---

## COMPONENTES UI ATÓMICOS

### `src/components/ui/Button.astro`

```astro
---
interface Props {
  variant?: 'primary' | 'ghost' | 'outline';
  href?: string;
  target?: string;
  class?: string;
}
const { variant = 'primary', href, target, class: className } = Astro.props;

const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 px-6 py-3 text-sm no-underline cursor-pointer';
const variants = {
  primary: 'bg-[--accent] text-[#080808] hover:bg-[--accent-hover]',
  ghost:   'border border-[--bg-border] text-[--text-secondary] hover:border-[--accent] hover:text-[--text-primary]',
  outline: 'border border-[--accent] text-[--accent] hover:bg-[--accent-muted]',
};
const Tag = href ? 'a' : 'button';
---
<Tag href={href} target={target} class={`${base} ${variants[variant]} ${className ?? ''}`}>
  <slot />
</Tag>
```

### `src/components/ui/Badge.astro`

```astro
---
interface Props { variant?: 'default' | 'accent' | 'success'; }
const { variant = 'default' } = Astro.props;
const styles = {
  default: 'border border-[--bg-border] bg-[--bg-surface] text-[--text-secondary]',
  accent:  'border border-[--accent]/30 bg-[--accent-muted] text-[--accent]',
  success: 'border border-[--turquesa-500]/30 bg-[--accent-2-muted] text-[--turquesa-500]',
};
---
<span class={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono ${styles[variant]}`}>
  <slot />
</span>
```
