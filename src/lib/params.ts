import type { ServiceId } from '@config/services';
import { SERVICES, DEFAULT_SERVICE } from '@config/services';

export type Lang = 'es' | 'en';

export interface HubParams {
  service: ServiceId;
  client: string | null;
  lang: Lang;
}

const VALID_SERVICES = Object.keys(SERVICES) as ServiceId[];

export function parseParams(url: URL): HubParams {
  const rawService = url.searchParams.get('service') as ServiceId;
  const rawLang = url.searchParams.get('lang') as Lang;

  const service = VALID_SERVICES.includes(rawService) ? rawService : DEFAULT_SERVICE;
  const client = url.searchParams.get('client') ?? null;
  const lang = rawLang === 'en' ? 'en' : 'es';

  return { service, client, lang };
}
