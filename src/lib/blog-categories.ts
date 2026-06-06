export const CATEGORIES = [
  { id: 'tendencias', label: 'Tendencias' },
  { id: 'cuidado', label: 'Cuidado' },
  { id: 'estilo', label: 'Estilo' },
  { id: 'domicilio', label: 'A domicilio' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export const CATEGORY_LABELS: Record<CategoryId, string> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c.label }),
  {} as Record<CategoryId, string>,
);
