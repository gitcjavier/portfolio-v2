# Prompt para reconstruir el portfolio de Javier Castro (Javoru)

Copia y pega este prompt completo en cualquier IA (Claude, ChatGPT, Cursor, etc.) o en una nueva sesión. Está diseñado para que el resultado sea **idéntico** al portfolio actual.

---

## CONTEXTO

Construye un portfolio personal de una sola página (single-page landing) para **Javier Castro Retamal**, desarrollador frontend chileno con background de diseño gráfico (alias "Javoru"). El sitio debe transmitir minimalismo refinado tipo "creative studio", con tipografía pixel-serif de acento y mucho espacio en blanco. El idioma del contenido es **español de Chile**.

---

## STACK TÉCNICO (obligatorio)

- **Framework**: Astro 5.13+ (estático, output `"static"`)
- **CSS**: Tailwind CSS 3.4 (integración `@astrojs/tailwind`)
- **Animaciones**: GSAP 3.14 (vanilla, sin librerías React/Vue)
- **Optimización de imágenes**: `sharp` como devDependency (para `astro:assets`)
- **TypeScript**: estricto
- **Gestor de paquetes**: pnpm

NO usar React, Vue, Svelte, Next.js, Vite standalone ni ningún framework de UI. Todas las interacciones son JS vanilla con IntersectionObserver / event listeners. La página `/` y `/experiences` son archivos `.astro`.

### `package.json` (dependencias clave)

```json
{
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/tailwind": "^6.0.2",
    "astro": "^5.13.5",
    "gsap": "^3.14.2",
    "tailwindcss": "^3.4.3"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.8",
    "@tailwindcss/typography": "^0.5.16",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "sharp": "^0.34.0",
    "typescript": "^6.0.2"
  }
}
```

---

## PALETA DE COLORES

Configurar en `tailwind.config.mjs` extendiendo `theme.colors`:

```js
ink:      '#051A24',  // primary dark (cuerpo, headings sobre blanco)
ink2:     '#0D212C',  // secondary dark (headings grandes)
mist:     '#F6FCFF',  // texto claro sobre fondos oscuros
fog:      '#E0EBF0',  // texto claro secundario
mutedink: '#273C46',  // texto muted (citas, autores)
```

Fondo del sitio: **blanco puro `#ffffff`** en todas partes.

---

## TIPOGRAFÍA

Dos fuentes:

1. **PP Neue Montreal** (cuerpo) — carga desde Webflow CDN:
   ```css
   @font-face {
     font-family: 'PP Neue Montreal';
     src: url('https://assets.website-files.com/6009ec8cda7f305645c9d91b/60176f9bb43e36419997ecfe_PPNeueMontreal-Book.otf') format('opentype');
     font-weight: 400;
     font-display: swap;
   }
   @font-face {
     font-family: 'PP Neue Montreal';
     src: url('https://assets.website-files.com/6009ec8cda7f305645c9d91b/60176f9b39c5673e51a86f5a_PPNeueMontreal-Medium.otf') format('opentype');
     font-weight: 500;
     font-display: swap;
   }
   ```

2. **PP Mondwest** (acentos pixel-serif) — archivo local en `public/fonts/PPMondwest-Regular.woff2`:
   ```css
   @font-face {
     font-family: 'PP Mondwest';
     src: url('/fonts/PPMondwest-Regular.woff2') format('woff2');
     font-weight: 400;
     font-display: swap;
   }
   ```
   Fallback: **Pixelify Sans** (Google Fonts) cargado en `<head>`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600&display=swap" rel="stylesheet" />
   ```

En Tailwind:
```js
fontFamily: {
  sans:     ['PP Neue Montreal', 'system-ui', '-apple-system', 'sans-serif'],
  mondwest: ['PP Mondwest', 'Pixelify Sans', 'serif'],
}
```

PP Mondwest se aplica con `class="font-mondwest"` en palabras-acento (siempre **dentro** de un titular, nunca un titular completo).

---

## SISTEMA DE BOTONES

Tres variantes con sombras multicapa (críticas para el "feel" del diseño). Píldoras (`border-radius: 9999px`), padding `0.75rem 1.75rem`, font-weight 500, font-size 0.9rem, `white-space: nowrap`, `gap: 0.5rem`, transición de hover suave.

```css
/* Primario — pill oscura con brillo interior */
.btn-primary {
  background: #051A24;
  color: #F6FCFF;
  box-shadow:
    0 1px 2px 0 rgba(5,26,36,0.10),
    0 4px 4px 0 rgba(5,26,36,0.09),
    0 9px 6px 0 rgba(5,26,36,0.05),
    0 17px 7px 0 rgba(5,26,36,0.01),
    0 26px 7px 0 rgba(5,26,36,0),
    inset 0 2px 8px 0 rgba(255,255,255,0.5);
}
.btn-primary:hover { transform: translateY(-1px); opacity: 0.92; }

/* Secundario — pill blanca con sombra difusa */
.btn-secondary {
  background: #ffffff;
  color: #051A24;
  box-shadow: 0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08);
}

/* Terciario — blanca con brillo interior + sombra */
.btn-tertiary {
  background: #ffffff;
  color: #051A24;
  box-shadow:
    0 0 0 0.5px rgba(0,0,0,0.05),
    0 4px 30px rgba(0,0,0,0.08),
    inset 0 2px 8px 0 rgba(255,255,255,0.5);
}
```

Component reutilizable `Button.astro`:
```astro
---
interface Props {
  href: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  target?: string;
  class?: string;
}
const { href, variant = 'primary', target, class: className = '' } = Astro.props;
---
<a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}
   class={`btn-${variant} ${className}`}>
  <slot />
</a>
```

---

## SISTEMA DE ANIMACIÓN DE ENTRADA

Cada elemento que debe aparecer con scroll lleva el atributo `data-reveal` y un `style="animation-delay: 0.1s"` (escalonado 0.1s, 0.2s, 0.3s, …).

CSS:
```css
@keyframes fadeInUp {
  0%   { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
[data-reveal] { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  [data-reveal], .animate-fade-in-up {
    opacity: 1 !important; animation: none !important; transform: none !important;
  }
}
```

Script global en `Layout.astro` (corre en mount y en `astro:page-load`):
```js
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]:not(.animate-fade-in-up)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-fade-in-up');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach((el) => io.observe(el));
}
```

---

## LAYOUT GLOBAL (`src/layouts/Layout.astro`)

- `<html lang="es" transition:persist="true">` con `<ClientRouter />` de Astro
- Body: `font-family: 'PP Neue Montreal'`, `background: #ffffff`, `color: #051A24`, `overflow-x: hidden`
- Scrollbar custom: 6px, thumb `#0D212C`
- Selección: `background: #051A24; color: #F6FCFF`
- Focus outline `2px solid #051A24` con offset `2px`

---

## SECCIONES DE LA PÁGINA `/` (en orden exacto)

### 1. HERO (`src/components/Hero.astro`)

Columna estrecha centrada: `max-w-[440px] mx-auto px-6 pt-12 md:pt-16`.

- **Logo**: `<h2>Javier Castro</h2>` en `font-mondwest font-semibold text-[32px] md:text-[40px] lg:text-[44px] text-ink tracking-tight mb-4`. `animation-delay: 0.1s`.
- **Tagline**: `<p>` con `font-mono text-xs md:text-sm text-ink mb-2`. Texto: **"El estudio creativo de Javoru"**. `delay: 0.2s`.
- **Titular**: `<h1>` con `text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-ink2 tracking-tight`. Dos líneas (`<span class="block whitespace-nowrap">`):
  > Construyo la *nueva ola,*<br>
  > con *diseño audaz.*
  
  Las palabras en cursiva van envueltas en `<span class="font-mondwest">`. `delay: 0.3s`.
- **Descripción**: `flex flex-col gap-6 text-sm md:text-base text-ink leading-relaxed mt-5 md:mt-6`, **tres párrafos**:
  1. "Soy desarrollador frontend con ojo de diseñador. He construido desde ecommerce completos hasta piezas gráficas, combinando código limpio con un diseño que no pasa desapercibido."
  2. "Trabajo de punta a punta: cada proyecto lo diseño y lo desarrollo yo mismo, de la idea al deploy, rápido y sin cortar esquinas."
  3. "Disponible para proyectos freelance y colaboraciones."

  `delay: 0.4s`.
- **CTAs**: `flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-5 md:mt-6`. **Tres botones**:
  - "Hablemos" → `mailto:icastroretamal@gmail.com` (primary)
  - "Ver proyectos" → `#projects` (secondary)
  - "Experiencia" → `/experiences` (secondary)

  `delay: 0.5s`.

### 2. MARQUEE INFINITO (`src/components/Marquee.astro`)

Strip horizontal infinito de imágenes. `w-full overflow-hidden mt-16 md:mt-20 mb-16`. Contenedor interno: `flex w-max animate-marquee`.

Imágenes duplicadas (array x2 para loop con `translateX(-50%)`). Cada `<img>`: `h-[280px] md:h-[500px] w-auto object-cover mx-3 rounded-2xl shadow-lg select-none`.

Animación CSS:
```css
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 30s linear infinite; }
@media (max-width: 767px) { .animate-marquee { animation-duration: 10s; } }
```

**Placeholder de imágenes** (a reemplazar por capturas reales): GIFs de `motionsites.ai/assets/hero-*.gif` (8 imágenes). Estas 8 URLs deben exportarse desde el componente porque también las usa el "Partner section".

### 3. CITA + FOTO (`src/components/QuoteSection.astro`)

`py-12 px-6 max-w-2xl mx-auto`. Estructura:

- Icono de comilla (SVG inline tipo lucide-react `Quote`, w-6 h-6, color slate-900). `delay: 0.1s`.
- Cita `<blockquote>`: `text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-ink2 tracking-tight mt-6`. Texto: **"Pasé del *diseño gráfico* al código para construir la web que siempre quise ver"** ("diseño gráfico" en `font-mondwest`). `delay: 0.2s`.
- Autor: `<p class="italic text-sm text-mutedink mt-6">Javier Castro</p>`. `delay: 0.3s`.
- **Foto** (`<img id="parallax-photo" src="/img/javoru2.webp">`, `w-full max-w-xs shadow-lg`, `border-radius: 16px` inline). `delay: 0.4s`. Envuelta en un `<div id="morph-photo-wrap" class="cursor-pointer">`.

**Interacciones de la foto (críticas):**

a) **Parallax con scroll**: IntersectionObserver + scroll listener + requestAnimationFrame. `MAX_OFFSET = 200`, offset = `(progress - 0.5) * -MAX_OFFSET * 0.5` aplicado como `transform: translateY(...)`.

b) **Morph orgánico de bordes al hover** (con GSAP, sin filtros de distorsión sobre la imagen):
- Cuando `mouseenter` en el wrapper, iniciar un `gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 1.1, ease: 'sine.inOut' } })`.
- Animar la propiedad `borderRadius` por estas 6 formas en secuencia (notación CSS de 8 valores para esquinas asimétricas):
  ```js
  const SHAPES = [
    '58% 42% 33% 67% / 63% 30% 70% 37%',
    '40% 60% 70% 30% / 47% 62% 38% 53%',
    '50% 50% 50% 50% / 50% 50% 50% 50%',
    '67% 33% 47% 53% / 37% 20% 80% 63%',
    '28% 72% 44% 56% / 49% 40% 60% 51%',
    '24% 24% 24% 24% / 24% 24% 24% 24%',
  ];
  ```
- En `mouseleave`: matar el timeline y tween `borderRadius` de vuelta a `'16px'` con `duration: 0.7, ease: 'power2.out'`.
- Respetar `prefers-reduced-motion`: si está activo, no inicializar el morph.
- **NO** aplicar filtros SVG de distorsión sobre la imagen (probé con `feTurbulence + feDisplacementMap` y se ve raro: solo los bordes cambian, la imagen permanece nítida).

### 4. PROYECTOS (`src/components/Projects.astro`)

`max-w-[1200px] mx-auto px-6 py-12`. Stack vertical: `flex flex-col gap-16 md:gap-20`.

Cada proyecto es un `<a target="_blank">` con `data-reveal` y delay escalonado (`0.1 + (i % 2) * 0.1`s):
- Texto **offset a la izquierda**: `<div class="ml-20 md:ml-28 mb-5">` con `<h3 class="font-mondwest font-semibold text-2xl md:text-3xl text-ink group-hover:opacity-70 transition-opacity">` + `<p class="text-sm md:text-base text-ink/70 mt-1">`.
- Imagen ancho completo debajo: `w-full rounded-2xl shadow-lg object-cover`.

Lista de proyectos:
1. **Chetomi** — "Ecommerce completo de comida argentina — diseño y desarrollo en Jumpseller" → `https://www.chetomi.cl`, imagen `/img/projects/chetomiweb.webp`
2. **Mob Psycho 100** — "Diseño gráfico de poster con tipografía dinámica y paleta intensa" → `https://www.behance.net/gallery/227800757/Poster-Chigeo-Kageyama`, imagen `/img/projects/mob.png`

### 5. CARRUSEL DE INSTAGRAM (`src/components/InstagramSection.astro`)

Lectura automática de fotos desde `src/assets/instagram/*.{jpg,jpeg,png,webp}` con `import.meta.glob` (eager), ordenadas por nombre de archivo. Si la carpeta está vacía, la sección **no se renderiza** (`{photos.length > 0 && ...}`).

```ts
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/instagram/*.{jpg,jpeg,png,webp}",
  { eager: true }
);
const photos = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, m]) => m.default);
const slides = [...photos, ...photos]; // duplicado para loop
const INSTAGRAM_URL = "https://instagram.com/ijavoru";
```

Estructura: `w-full py-12 overflow-hidden`.

- **Header** (`max-w-[1200px] mx-auto px-6 flex items-end justify-between mb-10`): título `<h2 class="text-[32px] md:text-[40px] leading-[1.1] text-ink2 tracking-tight">Desde mi <span class="font-mondwest">Instagram</span></h2>` + link `@ijavoru` a la derecha con flecha ↗ (lucide arrow-up-right inline). `delay: 0.1s`.
- **Track**: `w-full overflow-x-clip py-4` con interior `flex w-max animate-marquee-ig`. `delay: 0.2s`.

Cada slide es un `<a target="_blank">` con `block mx-3 group relative hover:z-10`. La imagen usa el componente `<Image>` de `astro:assets`:
```astro
<Image src={photo} alt="..." height={420}
  class="h-[260px] md:h-[380px] w-auto object-cover rounded-2xl shadow-lg
         group-hover:scale-110 group-hover:shadow-2xl
         transition-all duration-300 ease-out select-none"
  loading="lazy" draggable="false" />
```

Animación:
```css
.animate-marquee-ig { animation: marquee 45s linear infinite; }
.animate-marquee-ig:hover { animation-play-state: paused; }
@media (max-width: 767px) { .animate-marquee-ig { animation-duration: 20s; } }
```

Comportamiento: **se mueve automáticamente, se pausa al pasar el mouse encima, y la foto bajo el cursor se agranda 10% con sombra reforzada y `z-10` para que no la tapen las vecinas**.

Crear también `src/assets/instagram/LEEME.txt` explicando que cada foto se nombra `01.jpg`, `02.jpg`, etc. y se renderiza automáticamente.

### 6. PARTNER / CTA FINAL (`src/components/PartnerSection.astro`)

`w-full py-12 px-6`. Contenedor grande blanco: `relative max-w-7xl mx-auto bg-white py-48 rounded-[40px] shadow-card overflow-hidden flex flex-col items-center justify-center`.

Atributo `data-images={JSON.stringify(MARQUEE_IMAGES)}` (las 8 GIFs del marquee).

- Título centrado: `<h2 class="font-mondwest text-[48px] md:text-[64px] lg:text-[80px] text-ink2 mb-12 text-center leading-none">Trabajemos juntos</h2>`. `delay: 0.1s`.
- CTA pill primario con avatar circular embedido: pad asimétrico (`!pl-2 !py-2 !pr-6 gap-3 text-base`) + `<img src="/img/javoru2.webp" class="w-10 h-10 rounded-full object-cover">` + texto "Escríbele a Javier". `delay: 0.2s`. Enlaza a `mailto:`.

**Interacción "trail" al mover el mouse**:
- Listener `mousemove` en el contenedor. Throttle: `lastSpawn` mínimo 80ms entre spawns.
- Cada spawn crea un `<img>` con random `rotate(-10 to +10 deg)`, posicionado en la coordenada del mouse relativa al contenedor (`translate(-50%, -50%)`).
- Tamaño `160x110px`, `object-cover`, `border-radius: 12px`, `box-shadow: 0 8px 24px rgba(5,26,36,0.18)`, `z-index: 1`.
- En el siguiente frame: transición de `opacity 1→0` y `scale 1→0.7` durante 1s.
- `setTimeout(() => img.remove(), 1100)` para limpiar el DOM.
- Las imágenes ciclan por el array (índice `imgIndex++ % images.length`).

### 7. FOOTER (`src/components/Footer.astro`)

`w-full py-12 px-6 max-w-[1200px] mx-auto`. `flex flex-col md:flex-row md:items-start md:justify-between gap-10`:

- **Izquierda**: botón primario "Hablemos" → `mailto:`.
- **Derecha**: icono lucide arrow-up-right + **dos columnas de links** (`flex flex-col gap-3 text-base text-ink hover:opacity-70`):
  - Columna 1: Proyectos (`#projects`), Instagram (`#instagram`), Experiencia (`/experiences`)
  - Columna 2: GitHub, LinkedIn, Behance, @ijavoru (todos `target="_blank"`)

URLs externas:
- GitHub: `https://github.com/gitcjavier`
- LinkedIn: `https://linkedin.com/in/javiercastroretamal`
- Behance: `https://www.behance.net/javiercastro82`
- Instagram: `https://instagram.com/ijavoru`

**Barra de copyright** (fuera del `<footer>`, mismo ancho): `max-w-[1200px] mx-auto px-6 py-4 pb-28 flex justify-between text-sm text-ink`. Izquierda: "Javoru — Javier Castro". Derecha: "Chile". El `pb-28` es para dejar aire para el BottomNav flotante.

### 8. BOTTOM NAV FLOTANTE (`src/components/BottomNav.astro`)

`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full pl-8 pr-2 py-2 flex items-center gap-6` con sombra densa:
```
shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.12),0_12px_48px_rgba(0,0,0,0.08)]
```

Contenido: `<a href="/#hero" class="font-mondwest font-semibold text-2xl text-ink leading-none">J</a>` + botón primario "Hablemos" (con `!py-2.5 !px-6 text-sm` para ajuste de tamaño).

---

## PÁGINA `/experiences` (`src/pages/experiences.astro`)

Diseño minimalista que **conversa con el home** pero con personalidad propia (estilo "Personal Photographer" / archivo de revista): barras negras horizontales con texto mono, hairlines (`border-ink2/10`) en bordes laterales tipo grilla, tipografía gigante con acentos pixel-serif.

### Estructura

- **Barra superior** (`w-full bg-ink text-mist font-mono text-xs flex items-center justify-between px-6 py-2`): `"From: Chile"` (izquierda) + `"← Volver al inicio"` (link a `/`, derecha).
- **Hero** (`border-b border-ink2/10`):
  - Contenedor `max-w-[1200px] mx-auto border-x border-ink2/10 px-6 py-20 md:py-28`.
  - Pretítulo mono: `"Javier Castro — Trayectoria"`. `delay: 0.1s`.
  - Titular `<h1 class="text-[40px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-tight text-ink2">`:
    > De soporte a *datos,*<br>
    > de datos a *frontend.*

    Acentos en `font-mondwest`. `delay: 0.2s`.
  - Subtítulo `<p class="text-sm md:text-base text-mutedink leading-relaxed mt-6 max-w-lg">`: "Mi camino en tecnología — de soporte técnico a ingeniería de datos y desarrollo frontend." `delay: 0.3s`.
- **Barra de sección**: `bg-ink text-mist font-mono text-xs`, izquierda "Experiencia", derecha "2015 — Hoy".
- **Timeline** (`border-b border-ink2/10` → interior `max-w-[1200px] mx-auto border-x border-ink2/10 divide-y divide-ink2/10`):
  Cada entrada es `<article class="grid md:grid-cols-[220px_1fr] gap-3 md:gap-8 px-6 py-10 md:py-14">` con:
  - Columna izquierda: fecha en `font-mono text-xs text-mutedink pt-1.5`
  - Columna derecha: `<h2 class="text-xl md:text-2xl font-medium text-ink2 tracking-tight">` + descripción `text-sm md:text-base text-mutedink leading-relaxed mt-3 max-w-2xl` + stack en `font-mono text-xs text-ink/60 mt-4`.

  Entradas:
  1. **Actualmente** — Jefe de Soporte IT — "Encargado del soporte técnico e implementación de una solución integral de call center (CRM web + Telefonía IP)..." — Stack: `JavaScript · Transact-SQL · MS SQL Server · Asterisk`
  2. **Enero 2020 — Noviembre 2023** — Data Engineer para LATAM — "Diseñé y mantuve pipelines de datos para poblar el Data Lake de Google Cloud..." — Stack: `GCP · BigQuery · Airflow · Dataflow · Git`
  3. **Marzo 2015 — Agosto 2019** — Soporte Técnico IT — "Atención de incidentes y solicitudes de soporte técnico..." — Stack: `Hardware · Software · Redes`

- **Barra de sección**: "Stack técnico" / "Herramientas de uso diario".
- **Stack** (`text-center` centrado, `py-16 md:py-20`):
  - Título: `<h2 class="text-2xl md:text-3xl text-ink2 tracking-tight">Mi <span class="font-mondwest">stack</span></h2>`
  - Subtítulo: "Tecnologías con las que trabajo y diseño."
  - Pills: `flex flex-wrap justify-center gap-2 max-w-2xl mx-auto`. Cada una: `inline-flex items-center gap-2 rounded-full border border-ink2/15 bg-white px-4 py-1.5 text-sm text-ink hover:border-ink2/40 transition-colors`.
  - Lista: Astro, React, TypeScript, JavaScript, Tailwind, HTML5, CSS3, Node, Supabase, Git, Photoshop, Illustrator (cada uno con su icono SVG en `/public/icons/`).
- **Pie de copyright** idéntico al del home.
- **BottomNav** reutilizado.

---

## ESTRUCTURA DE ARCHIVOS

```
src/
├── layouts/
│   └── Layout.astro           # html base + reveal script + meta + fonts
├── pages/
│   ├── index.astro            # composición del home
│   └── experiences.astro      # página de trayectoria
├── components/
│   ├── Button.astro           # 3 variantes
│   ├── Hero.astro
│   ├── Marquee.astro          # exporta MARQUEE_IMAGES
│   ├── QuoteSection.astro     # cita + foto + parallax + morph GSAP
│   ├── Projects.astro
│   ├── InstagramSection.astro # marquee auto + zoom + pausa hover
│   ├── PartnerSection.astro   # mouse trail
│   ├── Footer.astro
│   └── BottomNav.astro
├── assets/
│   └── instagram/
│       ├── 01.jpg, 02.jpg...  # fotos optimizadas por astro:assets
│       └── LEEME.txt
├── styles/
│   └── global.css             # @font-face + componentes + animaciones
└── env.d.ts

public/
├── fonts/
│   ├── PPMondwest-Regular.woff2    # descargar de pangrampangram.com
│   └── LEEME.txt
├── img/
│   ├── javoru2.webp                # foto del autor
│   └── projects/
│       ├── chetomiweb.webp
│       └── mob.png
└── icons/
    ├── Astro_dark.svg, react.svg, typescript.svg, javascript.svg,
    │   tailwindcss.svg, html5.svg, css3.svg, node.svg, supabase.svg,
    │   git.svg, photoshop.svg, illustrator.svg
```

---

## DETALLES DE COMPORTAMIENTO Y EDGE CASES

1. **Astro view transitions**: usar `<ClientRouter />` en el `<head>` y reinicializar todos los scripts en `document.addEventListener('astro:page-load', init)`. Guardar un flag (ej. `el.dataset.initialized = 'true'`) para no doblar listeners.

2. **Imágenes con `astro:assets`**: requiere `sharp` instalado. Las del InstagramSection se importan vía `import.meta.glob` con `{ eager: true }`. Build genera `.webp` optimizados automáticamente.

3. **Reducción de movimiento**: respetar `@media (prefers-reduced-motion: reduce)` desactivando marquees, fadeInUp y el morph de la foto.

4. **Mobile**: el hero tiene `max-w-[440px]`; en móvil la copia se ve cómoda. Los CTAs cambian a `flex-col` en pantallas < `sm`. Las cards/imágenes nunca se desbordan.

5. **Accesibilidad**:
   - Focus visible con outline `2px solid #051A24` offset `2px`.
   - Selección de texto invertida (fondo ink, texto mist).
   - `aria-hidden="true"` en SVG decorativos.
   - Todos los `target="_blank"` con `rel="noopener noreferrer"`.

6. **SEO**: meta description, keywords, author en `<head>` por página. Title: `"Javier Castro — Frontend Developer"` para `/`, `"Experiencia — Javier Castro"` para `/experiences`.

7. **Contacto**: email `icastroretamal@gmail.com` siempre con `mailto:` directo en los CTAs principales.

8. **No usar**: Header con menú desktop/mobile (eliminado), TestimonialCarousel, PricingSection con valores. El BottomNav flotante reemplaza la navegación.

---

## DATOS PERSONALES (copy del autor)

- **Nombre**: Javier Castro Retamal
- **Alias**: Javoru / @ijavoru
- **Email**: icastroretamal@gmail.com
- **Ubicación**: Chile
- **Rol**: Frontend Developer con background de diseño gráfico
- **Posicionamiento**: "Diseñador y desarrollador que trabaja punta a punta, de la idea al deploy"
- **Estado**: Disponible para freelance y colaboraciones

---

## COMANDOS DE DESARROLLO

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # genera dist/
pnpm preview
pnpm astro check   # type-check estricto
```

---

## VISIÓN AESTHETIC FINAL

Pensar el sitio como un **portfolio de estudio creativo boutique** — minimalismo de papel blanco, columnas estrechas y mucho aire vertical, tipografía limpia interrumpida puntualmente por la pixel-serif que da personalidad. Las animaciones son sutiles y siempre con propósito (fade-in-up al scroll, marquees lentos, micro-interacciones GSAP en la foto). Sin gradientes coloridos, sin emojis decorativos, sin "AI slop". Cada sombra de botón es deliberada — la sombra es el detalle de marca.

El resultado debe sentirse cercano a estos referentes: halaskastudio.com, framer.com, websites de Vercel para showcase de productos premium.
