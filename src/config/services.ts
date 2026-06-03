export type ServiceId = 'corte' | 'corte_barba' | 'barba';

export interface ServiceConfig {
  id: ServiceId;
  label: string;
  headline: string;
  subheadline: string;
  faqKey: ServiceId;
  ctaLabel: string;
  price: string;
}

export const SERVICES: Record<ServiceId, ServiceConfig> = {
  corte: {
    id: 'corte',
    label: 'Corte Premium',
    headline: 'Estilo que habla por vos.',
    subheadline: 'Corte personalizado según tu tipo de cabello, rostro y rutina. Sin salir de casa.',
    faqKey: 'corte',
    ctaLabel: 'Reservar corte',
    price: '$15000',
  },
  corte_barba: {
    id: 'corte_barba',
    label: 'Corte + Barba',
    headline: 'Look completo, un solo paso.',
    subheadline: 'Corte + barba perfilada en la comodidad de tu domicilio. Resultado de barbería, sin la fila.',
    faqKey: 'corte_barba',
    ctaLabel: 'Reservar combo',
    price: '$18000',
  },
  barba: {
    id: 'barba',
    label: 'Barba Profesional',
    headline: 'Barba con carácter.',
    subheadline: 'Perfilado de barba con línea definida, simetría y productos premium.',
    faqKey: 'barba',
    ctaLabel: 'Reservar barba',
    price: '$10000',
  },
} as const;

export const DEFAULT_SERVICE: ServiceId = 'corte';
