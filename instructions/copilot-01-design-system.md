# COPILOT CONTEXT — 01: Design System & Tokens
# Ad Astra — Presentation Hub (onboarding.ad-astra.me)

---

## INSTRUCCIÓN PARA COPILOT

Este archivo define el design system completo. Cada vez que crees un componente o bloque,
usá ÚNICAMENTE estas variables y fuentes. No uses colores hardcodeados ni fuentes externas.

---

## STACK

- Astro 6.x + React 19.x (islands) + Tailwind CSS v4 + TypeScript
- NO hay light mode. Solo dark mode permanente. No implementar `prefers-color-scheme`.
- NO usar `class="dark"` ni sistema de temas. El body siempre es oscuro.

---

## FUENTES (importar en BaseLayout.astro)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

| Rol | Familia | Uso |
|-----|---------|-----|
| Display | `Syne` 700/800 | Headlines H1, H2 grandes |
| Body | `DM Sans` 300/400/500 | Texto corrido, UI |
| Mono | `IBM Plex Mono` 400/500 | Eyebrows, labels, datos técnicos |

---

## CSS VARIABLES — `src/styles/global.css`

Reemplazar el archivo CSS existente con exactamente esto:

```css
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ── Backgrounds ── */
    --bg-primary:   #080808;
    --bg-secondary: #111111;
    --bg-surface:   #1a1a1a;
    --bg-border:    #252525;

    /* ── Text ── */
    --text-primary:   #f0f0f0;
    --text-secondary: #888888;
    --text-muted:     #444444;

    /* ── Brand: Violeta Ad Astra ── */
    --violet-50:  #FAF3FF;
    --violet-100: #F4E3FF;
    --violet-200: #EACDFF;
    --violet-300: #DAA5FF;
    --violet-400: #C46CFF;
    --violet-500: #AE35FF;   /* ← primary brand */
    --violet-600: #9B0FFF;
    --violet-700: #8F00FF;
    --violet-800: #7306C3;
    --violet-900: #5F079C;
    --violet-950: #400076;

    /* ── Brand: Turquesa Ad Astra ── */
    --turquesa-50:  #EEFFFB;
    --turquesa-100: #C5FFF7;
    --turquesa-200: #8BFFF0;
    --turquesa-300: #47FFE7;
    --turquesa-400: #14EDD8;
    --turquesa-500: #00D1BF;  /* ← secondary brand */
    --turquesa-600: #00A89D;
    --turquesa-700: #00857F;
    --turquesa-800: #056A66;
    --turquesa-900: #0A5754;
    --turquesa-950: #003535;

    /* ── Semantic tokens ── */
    --accent:         var(--violet-500);      /* #AE35FF — CTA, highlights */
    --accent-hover:   var(--violet-600);      /* #9B0FFF */
    --accent-muted:   rgba(174, 53, 255, 0.08);
    --accent-2:       var(--turquesa-500);    /* #00D1BF — secondary accent */
    --accent-2-muted: rgba(0, 209, 191, 0.08);

    --success: var(--turquesa-400);           /* #14EDD8 */
    --border:  1px solid var(--bg-border);

    /* ── Gradients ── */
    --gradient-brand: linear-gradient(135deg, var(--violet-500) 0%, var(--turquesa-500) 100%);
    --gradient-hero:  linear-gradient(135deg, #080808 0%, #111111 50%, rgba(174,53,255,0.06) 100%);
    --gradient-card:  linear-gradient(180deg, #1a1a1a 0%, #111111 100%);

    /* ── Glows ── */
    --glow-violet:   0 0 40px rgba(174, 53, 255, 0.25);
    --glow-turquesa: 0 0 40px rgba(0, 209, 191, 0.25);

    /* ── Typography scale ── */
    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
    --font-mono:    'IBM Plex Mono', monospace;
  }
}

@layer base {
  * {
    @apply border-[--bg-border];
    box-sizing: border-box;
  }

  html {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-body);
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    color: var(--text-primary);
  }

  code, pre, .mono {
    font-family: var(--font-mono);
  }
}

@layer utilities {
  /* Gradients */
  .text-gradient {
    background: var(--gradient-brand);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 8s ease infinite;
  }

  .bg-gradient-brand { background: var(--gradient-brand); }
  .bg-gradient-hero  { background: var(--gradient-hero);  }
  .bg-gradient-card  { background: var(--gradient-card);  }

  /* Glows */
  .glow-violet   { box-shadow: var(--glow-violet);   }
  .glow-turquesa { box-shadow: var(--glow-turquesa); }

  /* Glass surface */
  .glass {
    backdrop-filter: blur(16px);
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid var(--bg-border);
  }

  /* Card hover */
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px -12px rgba(0, 209, 191, 0.15);
  }

  /* Noise texture overlay */
  .noise::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* Scroll reveal animations */
  .scroll-reveal {
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scroll-reveal.is-visible { opacity: 1; }

  .scroll-reveal-bottom {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scroll-reveal-bottom.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .scroll-reveal-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scroll-reveal-left.is-visible {
    opacity: 1;
    transform: translateX(0);
  }

  .scroll-reveal-right {
    opacity: 0;
    transform: translateX(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scroll-reveal-right.is-visible {
    opacity: 1;
    transform: translateX(0);
  }

  /* Stagger delays */
  .stagger-1 { transition-delay: 0.08s; }
  .stagger-2 { transition-delay: 0.16s; }
  .stagger-3 { transition-delay: 0.24s; }
  .stagger-4 { transition-delay: 0.32s; }
  .stagger-5 { transition-delay: 0.40s; }
  .stagger-6 { transition-delay: 0.48s; }

  /* Keyframes */
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-10px); }
  }

  @keyframes pulseGlow {
    0%, 100% { filter: drop-shadow(0 0 8px rgba(174, 53, 255, 0.4)); }
    50%       { filter: drop-shadow(0 0 16px rgba(0, 209, 191, 0.6)); }
  }

  .animate-float      { animation: float 6s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
}
```

---

## COLORES EN TAILWIND v4

En Tailwind v4, para usar las CSS variables en clases, usar la sintaxis `[--var-name]`:

```html
<!-- Correcto en Tailwind v4 -->
<div class="bg-[--bg-surface] text-[--text-secondary] border-[--bg-border]">
<span class="text-[--accent]">
<button class="bg-[--accent] hover:bg-[--accent-hover]">
```

---

## REGLAS DE DISEÑO

1. **NUNCA** usar Inter, Roboto, Arial, system-ui como fuente visible
2. **NUNCA** implementar light mode ni toggle de tema
3. **NUNCA** usar colores hardcodeados fuera de este sistema
4. El fondo base siempre es `var(--bg-primary)` = `#080808`
5. Acento principal = violeta `#AE35FF` (CTAs, highlights, bordes activos)
6. Acento secundario = turquesa `#00D1BF` (éxito, secundario, hover states)
7. El gradiente de marca va de violeta → turquesa en 135deg
