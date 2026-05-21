import type { ServiceId } from '@config/services';
import { SERVICES, DEFAULT_SERVICE } from '@config/services';

export type Industry = 'retail' | 'startup' | 'local' | 'saas' | 'default';
export type Lang = 'es' | 'en';
export type Platform = 'default' | 'workana';

export interface HubParams {
  service: ServiceId;
  industry: Industry;
  client: string | null;
  lang: Lang;
  platform: Platform;
}

const VALID_SERVICES = Object.keys(SERVICES) as ServiceId[];
const VALID_INDUSTRIES: Industry[] = ['retail', 'startup', 'local', 'saas', 'default'];
const VALID_PLATFORMS: Platform[] = ['default', 'workana'];

export function parseParams(url: URL): HubParams {
  const rawService = url.searchParams.get('service') as ServiceId;
  const rawIndustry = url.searchParams.get('industry') as Industry;
  const rawLang = url.searchParams.get('lang') as Lang;
  const rawPlatform = (url.searchParams.get('platform') ?? url.searchParams.get('plataforma')) as Platform;

  const service = VALID_SERVICES.includes(rawService) ? rawService : DEFAULT_SERVICE;
  const industry = VALID_INDUSTRIES.includes(rawIndustry) ? rawIndustry : 'default';
  const client = url.searchParams.get('client') ?? null;
  const lang = rawLang === 'en' ? 'en' : 'es';
  const platform = VALID_PLATFORMS.includes(rawPlatform) ? rawPlatform : 'default';

  return { service, industry, client, lang, platform };
}
