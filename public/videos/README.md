# Media Assets

Placeholder media used across the landing. Replace with real content once
`@facu` starts recording haircuts and barbershop content.

## Sources

- **Stock images:** Unsplash (free license, no attribution required)
- **Stock video:** Generated locally with ffmpeg from an Unsplash still
  (no royalty-free video CDN was reachable from the build environment)
- All assets are placeholders — replace with the barber's own footage ASAP

## Folders

### `videos/`
- `hero-poster.jpg` (251 KB) — poster image shown while the hero video loads
- `hero.mp4` (191 KB) — 1920×1080, 8s, H.264, ~1.5 Mbps
- `hero.webm` (241 KB) — 1920×1080, 8s, VP9 fallback for modern browsers

**Replace with:** a real 5-10s loop of the barber cutting or finishing a cut.
Keep the same `<video>` element contract in `src/components/react/HeroSection.tsx`.

### `images/process/`
Square thumbnails (1:1, 600×600) for each process step.

- `step-1.webp` — Contacto (cliente escribiendo / teléfono)
- `step-2.webp` — Coordinamos (agenda / calendario)
- `step-3.webp` — Llego a tu casa (barbero con equipo / kit)
- `step-4.webp` — Corte + Barba (corte en acción)
- `step-5.webp` — Seguimiento (cliente satisfecho / resultado final)

**Replace with:** real photos of the same scenes once available.

### `images/before-after/`
Square (1:1, 500×500) before/after pairs for the gallery.

- `corte-before.webp` / `corte-after.webp`
- `barba-before.webp` / `barba-after.webp`
- `combo-before.webp` / `combo-after.webp`

**Replace with:** real before/after of actual clients (always with consent).

## Optimization notes

- All images: WebP, q=80, max 600×600 → < 100 KB each
- Hero video: H.264 baseline, `+faststart` flag for streaming
- Hero poster: JPG q=80, 1920×1080
- Lazy load everywhere except hero (which is above the fold)
