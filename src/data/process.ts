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
    title: 'Propuesta tecnica',
    desc: 'Recibis un documento de scope detallado con tecnologias, plazos y entregables.',
    duration: '24-48hs',
  },
  {
    number: '03',
    title: 'Desarrollo iterativo',
    // desc: 'Avance visible con updates regulares. Todo documentado en el portal del proyecto.',
    desc: 'Avance visible con updates regulares y entregables documentados en cada iteracion.',
    duration: 'segun proyecto',
  },
  {
    number: '04',
    title: 'Revisiones',
    desc: 'Dos rondas de feedback incluidas. El proyecto no cierra hasta que estes conforme.',
    duration: '48-72hs c/u',
  },
  {
    number: '05',
    title: 'Entrega + soporte',
    desc: 'Deploy completo, documentacion de uso y 30 dias de soporte post-entrega.',
    duration: '30 dias',
  },
] as const;
