import type { ServiceId } from '@config/services';

export interface FAQItem {
  q: string;
  a: string;
}

/** Universal FAQs shown for all services */
export const FAQ_UNIVERSAL: FAQItem[] = [
  {
    q: 'Cuanto tarda el proyecto?',
    a: 'Depende del alcance. Una landing: 5-10 dias. Un ecommerce completo: 2-4 semanas. Un bot: 1-3 semanas. Siempre recibis una estimacion precisa antes de arrancar.',
  },
  {
    q: 'Que pasa si no me gusta el resultado?',
    a: 'Trabajamos con revisiones incluidas en el scope. Antes de cerrar el proyecto pasamos por al menos dos rondas de feedback. No entregamos hasta que estes conforme.',
  },
  {
    q: 'Como se que entregas lo que prometes?',
    a: 'Todo vive en el portal del proyecto: roadmap, milestones, pagos y archivos. Podes ver el estado real en cualquier momento. No hay actualizaciones por WhatsApp que se pierden.',
  },
  {
    q: 'Por que elegirte a vos y no a otro?',
    a: 'No vendemos horas. Vendemos sistemas funcionando con documentacion, soporte y estructura. La diferencia es visible cuando lo comparas con cualquier otra propuesta.',
  },
];

/** Service-specific FAQs appended after universal ones */
export const FAQ_BY_SERVICE: Record<ServiceId, FAQItem[]> = {
  landing: [
    {
      q: 'Incluye hosting y dominio?',
      a: 'El hosting puede ser el tuyo o lo configuramos nosotros. El dominio tambien. Lo definimos en el brief inicial sin costo adicional.',
    },
    {
      q: 'Puedo actualizar el contenido despues?',
      a: 'Si. Si lo necesitas, el sitio puede incluir un CMS simple para que lo gestiones vos. Se define en el scope inicial.',
    },
  ],
  ecommerce: [
    {
      q: 'Puedo cargar mis propios productos?',
      a: 'Si. Al final del proyecto tenes acceso total al backend y una guia de uso. Tu tienda, tu control.',
    },
    {
      q: 'Que plataforma usan?',
      a: 'WooCommerce, PrestaShop o Shopify segun tu volumen, presupuesto y necesidades. Lo definimos en el brief inicial.',
    },
  ],
  bot: [
    {
      q: 'Funciona con mis sistemas actuales?',
      a: 'Si. Integramos con WhatsApp, web, CRM o cualquier API estandar. Evaluamos tu stack en el brief inicial.',
    },
    {
      q: 'Necesito saber programar para administrarlo?',
      a: 'No. El panel de administracion esta disenado para que cualquier persona del equipo edite respuestas y flujos sin tocar codigo.',
    },
  ],
};

export function getFAQs(serviceId: ServiceId): FAQItem[] {
  return [...FAQ_UNIVERSAL, ...FAQ_BY_SERVICE[serviceId]];
}
