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

## Publicacion en GitHub

Si es la primera vez que subis este proyecto al remoto:

1. git branch -M main
2. git remote add origin https://github.com/falechfacundo/presentation-hub.git
3. git push -u origin main

Si el remoto ya existe y solo queres subir cambios nuevos:

1. git add -A
2. git commit -m "chore: actualiza proyecto"
3. git push
