import type { ServiceId } from '@config/services';

export interface Deliverable {
  icon: string;
  title: string;
  desc: string;
}

export const DELIVERABLES: Record<ServiceId, Deliverable[]> = {
  corte: [
    { icon: 'Scissors', title: 'Corte personalizado', desc: 'Según tu tipo de cabello, rostro y estilo de vida' },
    { icon: 'User', title: 'Asesoría de estilo', desc: 'Te recomiendo el look que mejor te queda' },
    { icon: 'Home', title: 'En tu domicilio', desc: 'Sin filas ni esperas. Yo llevo todo' },
    { icon: 'Clock', title: 'Flexibilidad horaria', desc: 'Turnos adaptados a tu rutina' },
    { icon: 'ShieldCheck', title: 'Higiene total', desc: 'Material esterilizado y descartable' },
  ],
  corte_barba: [
    { icon: 'Scissors', title: 'Corte + Barba completo', desc: 'Look integral en una sola sesión' },
    { icon: 'User', title: 'Diseño de barba', desc: 'Líneas definidas y simetría perfecta' },
    { icon: 'Home', title: 'En tu domicilio', desc: 'Todo el servicio en la puerta de tu casa' },
    { icon: 'Award', title: 'Productos premium', desc: 'Cera, pomada o spray según tu estilo' },
    { icon: 'ShieldCheck', title: 'Higiene total', desc: 'Material esterilizado y descartable' },
  ],
  barba: [
    { icon: 'User', title: 'Perfilado profesional', desc: 'Líneas rectas y simetría milimétrica' },
    { icon: 'Droplets', title: 'Hidratación', desc: 'Aceites y bálsamos post-perfilado' },
    { icon: 'Home', title: 'En tu domicilio', desc: 'Sin moverte de tu casa' },
    { icon: 'Clock', title: 'Rápido y efectivo', desc: 'Servicio express de 20-30 min' },
    { icon: 'ShieldCheck', title: 'Higiene total', desc: 'Navajas y material descartable' },
  ],
} as const;
