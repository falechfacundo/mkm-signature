import type { ServiceId } from '@config/services';

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQ_UNIVERSAL: FAQItem[] = [
  {
    q: '¿Cuánto sale el servicio a domicilio?',
    a: 'Corte desde $6000. Corte + barba $9000. Solo barba $4000. El precio incluye el desplazamiento dentro de la zona de cobertura.',
  },
  {
    q: '¿Qué zonas cubrís?',
    a: 'CABA y Zona Norte (Nuñez, Belgrano, Olivos, Vicente López, San Isidro, Martínez). Consultame si vivís en otra zona y vemos si puedo llegarme.',
  },
  {
    q: '¿Cuánto dura el servicio?',
    a: 'El corte de cabello unos 30-40 min. Corte + barba 45-60 min. Solo barba 20-30 min. Es tiempo de servicio, sin esperas.',
  },
  {
    q: '¿Necesito tener algo preparado?',
    a: 'Nada. Yo llevo todo: tijeras, máquinas, capa, shampoo, toalla y productos de styling. Solo necesito una silla y un enchufe cerca.',
  },
];

export const FAQ_BY_SERVICE: Record<ServiceId, FAQItem[]> = {
  corte: [
    {
      q: '¿Cómo sé qué corte me queda bien?',
      a: 'No te preocupes. Antes del corte charlamos sobre tu rutina, tipo de cabello y referencias. Te guío sin vueltas.',
    },
    {
      q: '¿Puedo pagar con tarjeta o transferencia?',
      a: 'Acepto efectivo, transferencia bancaria, Mercado Pago y tarjetas (débito/crédito).',
    },
  ],
  corte_barba: [
    {
      q: '¿Primero el corte o la barba?',
      a: 'Primero el corte, después la barba. Así ajustamos el largo de la barba al largo del cabello para un look balanceado.',
    },
    {
      q: '¿Qué productos usás para la barba?',
      a: 'Uso aceites y bálsamos profesionales, hipoalergénicos. Después del perfilado te dejo tips de cuidado.',
    },
  ],
  barba: [
    {
      q: '¿Me podés arreglar la barba si la tengo muy larga?',
      a: 'Si, ideal. Primero la emparejamos y después definimos líneas. Siempre pregunto antes cuánto querés sacar.',
    },
    {
      q: '¿Incluye algo después del perfilado?',
      a: 'Si, incluye hidratación con aceite y bálsamo. Tu barba queda suave y alineada.',
    },
  ],
};

export function getFAQs(serviceId: ServiceId): FAQItem[] {
  return [...FAQ_UNIVERSAL, ...FAQ_BY_SERVICE[serviceId]];
}
