# Presentation Hub

Landing hub para propuestas de Ad Astra, construido con Astro, React islands y Tailwind CSS v4.

## Stack

- Astro 6
- React 19 (islands)
- Tailwind CSS v4
- TypeScript estricto

## Estructura Principal

- src/pages/index.astro: entrypoint del hub
- src/layouts/BaseLayout.astro: shell HTML y metadatos
- src/blocks: secciones principales de la landing
- src/components/react: islands interactivos
- src/components/ui: componentes atomicos Astro
- src/config: configuracion de sitio y servicios
- src/data: source of truth de contenido
- src/lib: utilidades y parseo de params
- src/styles/global.css: design system y utilidades globales

## Comandos

Ejecutar desde la raiz del proyecto.

- pnpm install: instala dependencias
- pnpm dev: inicia desarrollo en localhost:4321
- pnpm build: genera build de produccion en dist
- pnpm preview: sirve localmente el build generado

## Build de Produccion

1. pnpm install
2. pnpm build
3. verificar salida en dist

## Deploy con Vercel CLI

Prerequisitos:

- Node 22.12+ (segun engines)
- Vercel CLI instalada de forma global

Instalacion de CLI (si no existe):

- pnpm add -g vercel

Primer setup:

1. vercel login
2. vercel link

Deploy:

1. pnpm build
2. vercel --prod

Notas:

- El proyecto usa output static en Astro.
- Si tenes variables de entorno, configurarlas en Vercel antes del deploy.
