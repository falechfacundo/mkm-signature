import type { ServiceId } from '@config/services';

export interface Deliverable {
  // lucide-react icon name
  icon: string;
  title: string;
  desc: string;
}

export const DELIVERABLES: Record<ServiceId, Deliverable[]> = {
  landing: [
    { icon: 'Monitor', title: 'Diseno responsive', desc: 'Adaptado a todos los dispositivos y pantallas' },
    { icon: 'Zap', title: 'Performance optimizada', desc: 'Core Web Vitals en verde desde el inicio' },
    { icon: 'Search', title: 'SEO on-page', desc: 'Estructura y metadatos configurados correctamente' },
    { icon: 'FormInput', title: 'Captacion de leads', desc: 'Formularios conectados directo a tu flujo de trabajo' },
    { icon: 'Code2', title: 'Codigo limpio', desc: 'Facil de mantener, escalar e integrar' },
    { icon: 'ShieldCheck', title: '30 dias de soporte', desc: 'Post-entrega sin costo adicional' },
  ],
  ecommerce: [
    { icon: 'ShoppingCart', title: 'Tienda completa', desc: 'Catalogo, carrito y checkout integrados' },
    { icon: 'CreditCard', title: 'Pasarelas de pago', desc: 'Locales e internacionales configuradas' },
    { icon: 'Truck', title: 'Gestion de envios', desc: 'Zonas y reglas de despacho configuradas' },
    { icon: 'Users', title: 'Cuentas de cliente', desc: 'Historial de pedidos y perfil incluidos' },
    { icon: 'BarChart2', title: 'Analytics integrado', desc: 'Metricas de ventas desde el dia uno' },
    { icon: 'ShieldCheck', title: '30 dias de soporte', desc: 'Post-entrega sin costo adicional' },
  ],
  bot: [
    { icon: 'MessageSquare', title: 'NLP avanzado', desc: 'GPT-4o o modelo equivalente integrado' },
    { icon: 'GitBranch', title: 'Flujos configurables', desc: 'Editables sin tocar una linea de codigo' },
    { icon: 'UserCheck', title: 'Escalado a humano', desc: 'Automatico cuando el bot detecta complejidad' },
    { icon: 'Settings2', title: 'Panel de administracion', desc: 'Control total sin conocimiento tecnico' },
    { icon: 'Plug', title: 'Integracion con tu stack', desc: 'CRM, tickets, WhatsApp, APIs existentes' },
    { icon: 'ShieldCheck', title: '30 dias de soporte', desc: 'Post-entrega sin costo adicional' },
  ],
} as const;
