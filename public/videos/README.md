# Media Assets

Placeholder media used across the landing. Replace with real content once
`@facu` starts recording haircuts and barbershop content.

## Sources

- **Stock images:** Unsplash (free license, no attribution required)
- **Stock video:** Mixkit (free for commercial use, no attribution required)
  - Hero: https://mixkit.co/free-stock-video/ — search "barber"
  - Current selection: **clip #40121** (back-of-head fade in progress, 6.8s)
- All assets are placeholders — replace with the barber's own footage ASAP

## Folders

### `videos/`
- `hero-poster.jpg` (46 KB) — extracted frame at t=2s, used as the poster
  while the video loads and as the LCP image
- `hero.mp4` (997 KB) — 1280×720, 6.8s, H.264 (libopenh264), ~1.2 Mbps
- `hero.webm` (362 KB) — 1280×720, 6.8s, VP9 fallback for modern browsers

**Replace with:** a real 5-10s loop of the barber cutting or finishing a cut.
Keep the same `<video>` element contract in `src/components/react/HeroSection.tsx`.

#### Alternative hero videos (Mixkit IDs)

| ID | Duración | Tamaño | Escena |
|----|----------|--------|--------|
| **40121** (active) | 6.8s | 2.4MB original | Back of head, fade in progress — clean, dark, modern |
| 40114 | 7.2s | 2.5MB original | Tijeras sobre barba, close-up dramático |
| 40117 | 6.6s | 2.3MB original | Hombre barbudo de frente + trimmer |
| 40122 | 8.3s | 3.0MB original | Trimmer close-up en barba |
| 40123 | 7.3s | 2.7MB original | Barba perfilándose |

To swap: `curl -L -o public/videos/hero.mp4 https://assets.mixkit.co/videos/{ID}/{ID}-720.mp4`
and re-extract the poster with ffmpeg from the new video.

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
- Hero poster: JPG q=3, 1280×720 (extracted from the video itself)
- Lazy load everywhere except hero (which is above the fold)
