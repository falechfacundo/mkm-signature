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
    subheadline: 'Diseno, velocidad y estructura pensados para transformar visitas en clientes desde el primer dia.',
    faqKey: 'landing',
    ctaLabel: 'Aceptar propuesta en Workana',
  },
  ecommerce: {
    id: 'ecommerce',
    label: 'eCommerce',
    headline: 'Tu tienda lista para vender desde el dia uno.',
    subheadline: 'Setup completo, integrado y testeado. Sin excusas para no empezar a vender.',
    faqKey: 'ecommerce',
    ctaLabel: 'Aceptar propuesta en Workana',
  },
  bot: {
    id: 'bot',
    label: 'Bot & Automatizacion',
    headline: 'Automatiza tu negocio con IA real.',
    subheadline: 'Un sistema que trabaja mientras vos no. Sin hype, con resultados medibles.',
    faqKey: 'bot',
    ctaLabel: 'Aceptar propuesta en Workana',
  },
} as const;

export const DEFAULT_SERVICE: ServiceId = 'landing';
