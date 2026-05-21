# COPILOT CONTEXT — 02: Project Structure, Config & Types
# Ad Astra — Presentation Hub (onboarding.ad-astra.me)

---

## INSTRUCCIÓN PARA COPILOT

Este archivo define la estructura de carpetas, los archivos de configuración de Astro/TypeScript,
y todos los tipos y constantes del proyecto. Crear estos archivos primero antes de cualquier componente.

---

## ESTRUCTURA DE CARPETAS

```
src/
├── pages/
│   └── index.astro              ← entry point, lee query params
├── layouts/
│   └── BaseLayout.astro         ← HTML shell
├── blocks/                      ← secciones de la página (orden = orden en pantalla)
│   ├── Hero.astro
│   ├── Process.astro
│   ├── Deliverables.astro
│   ├── PortalPreview.astro
│   ├── Communication.astro
│   ├── FAQ.astro
│   └── CTAFinal.astro
├── components/
│   ├── ui/                      ← átomos reutilizables (Astro)
│   │   ├── Button.astro
│   │   ├── Badge.astro
│   │   └── Tag.astro
│   └── react/                   ← islands interactivos (React + client:load)
│       ├── FAQAccordion.tsx
│       └── PortalPreviewMock.tsx
├── config/
│   ├── site.ts
│   └── services.ts
├── data/
│   ├── deliverables.ts
│   ├── faq.ts
│   └── process.ts
├── lib/
│   ├── params.ts
│   └── utils.ts
└── styles/
    └── global.css
```

---

## `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://onboarding.ad-astra.me',
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
```

---

## `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@config/*": ["src/config/*"],
      "@data/*": ["src/data/*"],
      "@lib/*": ["src/lib/*"],
      "@blocks/*": ["src/blocks/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

---

## `src/config/site.ts`

```typescript
export const SITE = {
  name: 'Ad Astra',
  tagline: 'Digital Infrastructure & Systems Studio',
  url: 'https://onboarding.ad-astra.me',
  portfolioUrl: 'https://ad-astra.me',
  showcaseUrl: 'https://showcase.ad-astra.me',
  portalUrl: 'https://portal.ad-astra.me',
  // Reemplazar con la URL real del perfil de Workana:
  workanaCta: 'https://www.workana.com/freelancer/ad-astra',
  contactEmail: 'hola@ad-astra.me',
} as const;
```

---

## `src/config/services.ts`

```typescript
export type ServiceId = 'landing' | 'ecommerce' | 'bot';

export interface ServiceConfig {
  id: ServiceId;
  label: string;
  headline: string;
  subheadline: string;
  faqKey: ServiceId;
  ctaLabel: string;
}

export const SERVICES: Record<ServiceId, ServiceConfig> = {
  landing: {
    id: 'landing',
    label: 'Landing Page',
    headline: 'Tu presencia online que convierte.',
    subheadline: 'Diseño, velocidad y estructura pensados para transformar visitas en clientes desde el primer día.',
    faqKey: 'landing',
    ctaLabel: 'Aceptar propuesta en Workana',
  },
  ecommerce: {
    id: 'ecommerce',
    label: 'eCommerce',
    headline: 'Tu tienda lista para vender desde el día uno.',
    subheadline: 'Setup completo, integrado y testeado. Sin excusas para no empezar a vender.',
    faqKey: 'ecommerce',
    ctaLabel: 'Aceptar propuesta en Workana',
  },
  bot: {
    id: 'bot',
    label: 'Bot & Automatización',
    headline: 'Automatizá tu negocio con IA real.',
    subheadline: 'Un sistema que trabaja mientras vos no. Sin hype, con resultados medibles.',
    faqKey: 'bot',
    ctaLabel: 'Aceptar propuesta en Workana',
  },
} as const;

export const DEFAULT_SERVICE: ServiceId = 'landing';
```

---

## `src/lib/params.ts`

```typescript
import type { ServiceId } from '@config/services';
import { SERVICES, DEFAULT_SERVICE } from '@config/services';

export type Industry = 'retail' | 'startup' | 'local' | 'saas' | 'default';
export type Lang = 'es' | 'en';

export interface HubParams {
  service: ServiceId;
  industry: Industry;
  client: string | null;
  lang: Lang;
}

const VALID_SERVICES = Object.keys(SERVICES) as ServiceId[];
const VALID_INDUSTRIES: Industry[] = ['retail', 'startup', 'local', 'saas', 'default'];

export function parseParams(url: URL): HubParams {
  const rawService = url.searchParams.get('service') as ServiceId;
  const rawIndustry = url.searchParams.get('industry') as Industry;
  const rawLang = url.searchParams.get('lang') as Lang;

  const service  = VALID_SERVICES.includes(rawService) ? rawService : DEFAULT_SERVICE;
  const industry = VALID_INDUSTRIES.includes(rawIndustry) ? rawIndustry : 'default';
  const client   = url.searchParams.get('client') ?? null;
  const lang     = rawLang === 'en' ? 'en' : 'es';

  return { service, industry, client, lang };
}
```

---

## `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

---

## `src/pages/index.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Hero from '@blocks/Hero.astro';
import Process from '@blocks/Process.astro';
import Deliverables from '@blocks/Deliverables.astro';
import PortalPreview from '@blocks/PortalPreview.astro';
import Communication from '@blocks/Communication.astro';
import FAQ from '@blocks/FAQ.astro';
import CTAFinal from '@blocks/CTAFinal.astro';

import { parseParams } from '@lib/params';
import { SERVICES } from '@config/services';

const params = parseParams(Astro.url);
const service = SERVICES[params.service];
---

<BaseLayout params={params} service={service}>
  <Hero params={params} service={service} />
  <Process />
  <Deliverables service={service} />
  <PortalPreview />
  <Communication />
  <FAQ service={service} />
  <CTAFinal params={params} service={service} />
</BaseLayout>
```

---

## `src/layouts/BaseLayout.astro`

```astro
---
import '../styles/global.css';
import type { HubParams } from '@lib/params';
import type { ServiceConfig } from '@config/services';
import { SITE } from '@config/site';

interface Props {
  params: HubParams;
  service: ServiceConfig;
}

const { params, service } = Astro.props;

const title = `Ad Astra — ${service.label}`;
const description = service.subheadline;
const ogImage = `${SITE.url}/og-image.png`;
---

<!doctype html>
<html lang={params.lang} style="background-color:#080808">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />

  <!-- OG -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={SITE.url} />
  <meta property="og:type" content="website" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />

  <title>{title}</title>
</head>
<body>
  <slot />

  <!-- Scroll reveal script — vanilla JS, no dependencies -->
  <script>
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-bottom, .scroll-reveal-left, .scroll-reveal-right'
    ).forEach((el) => observer.observe(el));
  </script>
</body>
</html>
```

---

## DEPENDENCIAS EXTRA A INSTALAR

```bash
npm install clsx tailwind-merge lucide-react framer-motion
```

Estas no vienen en el scaffold base y son necesarias para:
- `clsx` + `tailwind-merge` → función `cn()` para shadcn/ui y componentes React
- `lucide-react` → íconos en deliverables, FAQ, process
- `framer-motion` → animaciones en React islands (FAQAccordion, PortalPreview)

---

## NOTAS CRÍTICAS

- El path alias `@/` apunta a `src/`. Usar siempre en imports.
- Los React islands deben tener directiva `client:load` o `client:visible` en el `.astro` que los usa.
- `output: 'static'` significa que todo se pre-renderiza en build. No hay server-side en runtime.
- `parseParams` nunca lanza error — siempre devuelve defaults seguros.
