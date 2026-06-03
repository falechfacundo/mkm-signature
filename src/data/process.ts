export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  duration: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Contacto',
    desc: 'Me escribís por WhatsApp o Instagram y me contás qué necesitas.',
    duration: '5 min',
  },
  {
    number: '02',
    title: 'Coordinamos',
    desc: 'Definimos día, horario, dirección y el servicio exacto que querés.',
    duration: '24hs antes',
  },
  {
    number: '03',
    title: 'Llego a tu casa',
    desc: 'Voy a tu domicilio con todo el equipo: tijeras, máquinas, capa y productos.',
    duration: 'el mismo día',
  },
  {
    number: '04',
    title: 'Corte + Barba',
    desc: 'Servicio completo con asesoría de estilo según tu rostro y tipo de cabello.',
    duration: '45-60 min',
  },
  {
    number: '05',
    title: 'Seguimiento',
    desc: 'Tips de cuidado y recordatorio para tu próximo corte. Sin compromiso.',
    duration: 'post-servicio',
  },
] as const;
