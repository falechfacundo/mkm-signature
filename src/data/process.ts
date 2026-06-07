export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  duration: string;
  image: string;
  imageAlt: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Contacto',
    desc: 'Me escribís por WhatsApp o Instagram y me contás qué necesitas.',
    duration: '5 min',
    image: '/images/process/step-1.webp',
    imageAlt: 'Cliente contactando por WhatsApp para reservar un turno',
  },
  {
    number: '02',
    title: 'Coordinamos',
    desc: 'Definimos día, horario, dirección y el servicio exacto que querés.',
    duration: '24hs antes',
    image: '/images/process/step-2.webp',
    imageAlt: 'Coordinación del día y horario del turno',
  },
  {
    number: '03',
    title: 'Llego a tu casa',
    desc: 'Voy a tu domicilio con todo el equipo: tijeras, máquinas, capa y productos.',
    duration: 'el mismo día',
    image: '/images/process/step-3.webp',
    imageAlt: 'Barbero llegando al domicilio con su equipo completo',
  },
  {
    number: '04',
    title: 'Corte + Barba',
    desc: 'Servicio completo con asesoría de estilo según tu rostro y tipo de cabello.',
    duration: '45-60 min',
    image: '/images/process/step-4.webp',
    imageAlt: 'Corte de pelo y barba en proceso en el domicilio',
  },
  {
    number: '05',
    title: 'Seguimiento',
    desc: 'Tips de cuidado y recordatorio para tu próximo corte. Sin compromiso.',
    duration: 'post-servicio',
    image: '/images/process/step-5.webp',
    imageAlt: 'Cliente satisfecho con el look terminado',
  },
] as const;
