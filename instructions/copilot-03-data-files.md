# COPILOT CONTEXT — 03: Data Files
# Ad Astra — Presentation Hub (onboarding.ad-astra.me)

---

## INSTRUCCIÓN PARA COPILOT

Este archivo contiene todos los datos del proyecto. Crear estos archivos en `src/data/`
tal como están definidos. Son el source of truth para todos los bloques de la página.

---

## `src/data/deliverables.ts`

```typescript
import type { ServiceId } from '@config/services';

export interface Deliverable {
  icon: string;   // nombre del ícono de lucide-react
  title: string;
  desc: string;
}

export const DELIVERABLES: Record<ServiceId, Deliverable[]> = {
  landing: [
    { icon: 'Monitor',       title: 'Diseño responsive',        desc: 'Adaptado a todos los dispositivos y pantallas' },
    { icon: 'Zap',           title: 'Performance optimizada',   desc: 'Core Web Vitals en verde desde el inicio' },
    { icon: 'Search',        title: 'SEO on-page',              desc: 'Estructura y metadatos configurados correctamente' },
    { icon: 'FormInput',     title: 'Captación de leads',       desc: 'Formularios conectados directo a tu flujo de trabajo' },
    { icon: 'Code2',         title: 'Código limpio',            desc: 'Fácil de mantener, escalar e integrar' },
    { icon: 'ShieldCheck',   title: '30 días de soporte',       desc: 'Post-entrega sin costo adicional' },
  ],
  ecommerce: [
    { icon: 'ShoppingCart',  title: 'Tienda completa',          desc: 'Catálogo, carrito y checkout integrados' },
    { icon: 'CreditCard',    title: 'Pasarelas de pago',        desc: 'Locales e internacionales configuradas' },
    { icon: 'Truck',         title: 'Gestión de envíos',        desc: 'Zonas y reglas de despacho configuradas' },
    { icon: 'Users',         title: 'Cuentas de cliente',       desc: 'Historial de pedidos y perfil incluidos' },
    { icon: 'BarChart2',     title: 'Analytics integrado',      desc: 'Métricas de ventas desde el día uno' },
    { icon: 'ShieldCheck',   title: '30 días de soporte',       desc: 'Post-entrega sin costo adicional' },
  ],
  bot: [
    { icon: 'MessageSquare', title: 'NLP avanzado',             desc: 'GPT-4o o modelo equivalente integrado' },
    { icon: 'GitBranch',     title: 'Flujos configurables',     desc: 'Editables sin tocar una línea de código' },
    { icon: 'UserCheck',     title: 'Escalado a humano',        desc: 'Automático cuando el bot detecta complejidad' },
    { icon: 'Settings2',     title: 'Panel de administración',  desc: 'Control total sin conocimiento técnico' },
    { icon: 'Plug',          title: 'Integración con tu stack', desc: 'CRM, tickets, WhatsApp, APIs existentes' },
    { icon: 'ShieldCheck',   title: '30 días de soporte',       desc: 'Post-entrega sin costo adicional' },
  ],
} as const;
```

---

## `src/data/process.ts`

```typescript
export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  duration: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Brief inicial',
    desc: 'Definimos el alcance exacto, objetivos y entregables. Nada queda en el aire.',
    duration: '24hs',
  },
  {
    number: '02',
    title: 'Propuesta técnica',
    desc: 'Recibís un documento de scope detallado con tecnologías, plazos y entregables.',
    duration: '24–48hs',
  },
  {
    number: '03',
    title: 'Desarrollo iterativo',
    desc: 'Avance visible con updates regulares. Todo documentado en el portal del proyecto.',
    duration: 'según proyecto',
  },
  {
    number: '04',
    title: 'Revisiones',
    desc: 'Dos rondas de feedback incluidas. El proyecto no cierra hasta que estés conforme.',
    duration: '48–72hs c/u',
  },
  {
    number: '05',
    title: 'Entrega + soporte',
    desc: 'Deploy completo, documentación de uso y 30 días de soporte post-entrega.',
    duration: '30 días',
  },
] as const;
```

---

## `src/data/faq.ts`

```typescript
import type { ServiceId } from '@config/services';

export interface FAQItem {
  q: string;
  a: string;
}

/** FAQs universales — siempre se muestran */
export const FAQ_UNIVERSAL: FAQItem[] = [
  {
    q: '¿Cuánto tarda el proyecto?',
    a: 'Depende del alcance. Una landing: 5–10 días. Un ecommerce completo: 2–4 semanas. Un bot: 1–3 semanas. Siempre recibís una estimación precisa antes de arrancar.',
  },
  {
    q: '¿Qué pasa si no me gusta el resultado?',
    a: 'Trabajamos con revisiones incluidas en el scope. Antes de cerrar el proyecto pasamos por al menos dos rondas de feedback. No entregamos hasta que estés conforme.',
  },
  {
    q: '¿Cómo sé que entregás lo que prometés?',
    a: 'Todo vive en el portal del proyecto: roadmap, milestones, pagos y archivos. Podés ver el estado real en cualquier momento. No hay actualizaciones por WhatsApp que se pierden.',
  },
  {
    q: '¿Por qué elegirte a vos y no a otro?',
    a: 'No vendemos horas. Vendemos sistemas funcionando con documentación, soporte y estructura. La diferencia es visible cuando lo comparás con cualquier otra propuesta.',
  },
];

/** FAQs específicas por servicio — se agregan después de las universales */
export const FAQ_BY_SERVICE: Record<ServiceId, FAQItem[]> = {
  landing: [
    {
      q: '¿Incluye hosting y dominio?',
      a: 'El hosting puede ser el tuyo o lo configuramos nosotros. El dominio también. Lo definimos en el brief inicial sin costo adicional.',
    },
    {
      q: '¿Puedo actualizar el contenido después?',
      a: 'Sí. Si lo necesitás, el sitio puede incluir un CMS simple para que lo gestiones vos. Se define en el scope inicial.',
    },
  ],
  ecommerce: [
    {
      q: '¿Puedo cargar mis propios productos?',
      a: 'Sí. Al final del proyecto tenés acceso total al backend y una guía de uso. Tu tienda, tu control.',
    },
    {
      q: '¿Qué plataforma usan?',
      a: 'WooCommerce, PrestaShop o Shopify según tu volumen, presupuesto y necesidades. Lo definimos en el brief inicial.',
    },
  ],
  bot: [
    {
      q: '¿Funciona con mis sistemas actuales?',
      a: 'Sí. Integramos con WhatsApp, web, CRM o cualquier API estándar. Evaluamos tu stack en el brief inicial.',
    },
    {
      q: '¿Necesito saber programar para administrarlo?',
      a: 'No. El panel de administración está diseñado para que cualquier persona del equipo edite respuestas y flujos sin tocar código.',
    },
  ],
};

/** Helper: devuelve las FAQs completas para un servicio dado */
export function getFAQs(serviceId: ServiceId): FAQItem[] {
  return [...FAQ_UNIVERSAL, ...FAQ_BY_SERVICE[serviceId]];
}
```

---

## NOTAS DE USO

### Cómo usar DELIVERABLES en un bloque Astro:

```astro
---
import { DELIVERABLES } from '@data/deliverables';
import type { ServiceConfig } from '@config/services';

interface Props { service: ServiceConfig; }
const { service } = Astro.props;

const items = DELIVERABLES[service.id];
---

{items.map((item) => (
  <div>
    <span>{item.icon}</span>
    <h3>{item.title}</h3>
    <p>{item.desc}</p>
  </div>
))}
```

### Cómo usar íconos de lucide-react en un island React:

```tsx
import { Monitor, Zap, ShieldCheck } from 'lucide-react';
// Los nombres en DELIVERABLES.icon coinciden con los exports de lucide-react
// Para usarlos dinámicamente:
import * as Icons from 'lucide-react';

const Icon = Icons[item.icon as keyof typeof Icons] as React.ElementType;
// <Icon size={20} />
```

### Cómo usar getFAQs en FAQAccordion:

```tsx
// En el .astro que lo llama:
import { getFAQs } from '@data/faq';
const faqs = getFAQs(service.id); // pasar como prop al island React
```
