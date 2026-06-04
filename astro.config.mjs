// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://onboarding.ad-astra.me',

  integrations: [
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },

  output: 'server',
  adapter: vercel(),
});