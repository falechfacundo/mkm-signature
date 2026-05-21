export interface FAQItem {
  q: string;
  a: string;
}

export const FAQ_UNIVERSAL: FAQItem[] = [];

export const FAQ_BY_SERVICE = {
  landing: [],
  ecommerce: [],
  bot: [],
} as const;
