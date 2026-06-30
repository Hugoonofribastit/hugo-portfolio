# Portfolio Landing — Hugo Onofri Bastit — Design Spec

- **Fecha:** 2026-06-30
- **Autor:** Hugo Onofri Bastit (con asistencia de Claude Code)
- **Tipo:** Landing / portfolio de una sola página (SPA), scroll dinámico animado.

---

## 1. Objetivo

Construir una landing tipo portfolio **moderna, profesional y "seria"**, con scroll dinámico y bien animado, que posicione a Hugo como **Full Stack Developer & AI Orchestrator**. Debe mostrar sus trabajos (con previews reales de las webs), su stack y su diferenciador en orquestación con IA (Claude Code / MCP / multi-agente).

## 2. Decisiones cerradas (brainstorming)

| Tema | Decisión |
|------|----------|
| Stack | **Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion + Lenis** |
| Idioma | **Bilingüe EN/ES** con toggle (sin librería i18n pesada) |
| Posicionamiento | **Full Stack Developer & AI Orchestrator** |
| Previews de webs | **Screenshots reales** capturados con Playwright |
| Estética | **Japandi Editorial** (claro, off-white, serif, mucho aire, acentos índigo/terracota, toque japonés sutil) |
| Contacto | **Links + descarga de CV** (sin backend) |
| Foto personal | Uso **discreto** (avatar en About), `public/hugo.jpg` |
| Deploy | **Vercel** |
| Carpeta | `C:\Users\Hugo\Desktop\hugo-portfolio\` |

## 3. Estética — *Japandi Editorial*

### Paleta (tokens)
- `washi` — off-white papel: `#F4F1EA` (fondo base)
- `sumi` — negro tinta: `#1A1A17` (texto principal)
- `ai` (藍) — índigo japonés: `#2E4374` (acento primario / links)
- `bengara` — terracota: `#9E4A3B` (acento secundario / destacados)
- `kin` — dorado tenue: `#B8975A` (detalles finos, hairlines especiales)
- Grises de apoyo derivados de `sumi` a baja opacidad.

> Modo claro como base. (Dark mode opcional, fuera de alcance v1.)

### Tipografía
- **Titulares:** *Fraunces* (serif editorial, con `opsz`).
- **Cuerpo / UI:** *Inter* (o *Geist*), sans limpia.
- **Detalles código/AI/labels:** *JetBrains Mono*.

### Lenguaje visual
- Mucho aire (*ma* 間), composición editorial asimétrica.
- Líneas finas (*hairlines*) como separadores.
- Toque japonés **sutil**: sello/*hanko* SVG discreto en footer, kanji pequeños como etiquetas de sección (例: 仕事 *work*, 技術 *stack*, 経歴 *experience*), microcopys en romaji. **Sin kitsch.**

## 4. Movimiento / animaciones

- **Framer Motion** para: reveals ligados a scroll, parallax sutil, texto en *stagger*, *blur-in* de bloques, hover en cards.
- **Lenis** para smooth scroll premium.
- **Accesibilidad:** respetar `prefers-reduced-motion` → degradar a fades simples / sin movimiento.
- Animaciones "serias": curvas suaves (ease-out), duraciones 0.4–0.8s, sin rebotes excesivos.

## 5. Estructura del scroll (secciones)

1. **Nav (sticky/minimal)** — logo/inicial, anclas a secciones, **toggle EN | ES**, link a CV.
2. **Hero** — nombre, headline *"Full Stack Developer & AI Orchestrator"*, subcopy 1 línea, CTAs (*View work* / *Contact*), animación de entrada.
3. **About** — bio breve + **foto discreta** (Kyoto, bosque de bambú) + hilo Japón/idiomas + ubicación (Mar del Plata, Argentina).
4. **Stack** — grid animado por categoría: **Frontend · Backend · Cloud/AWS · Data · AI**.
5. **AI Orchestration** ⭐ (destacada) — Claude Code + MCP servers + multi-agente + custom skills, con micro-estética "terminal" sutil dentro del lenguaje Japandi.
6. **Selected Work** — cards con screenshots reales + badge de tipo:
   - *enippon* — `Client` — https://enippon-web.vercel.app/
   - *Rebozadores Chimbela* — `Client` — https://rebozadoreschimbela.com/
   - *Instacheck* — `Product` — https://dev.instacheckapp.com/
   - *E-commerce Farmacia* — `Client` (mención, sin link / MercadoPago)
   - *Instituto Educativo* — `Client` (mención, sin link)
7. **Experience / Timeline** — Making Sense (CCI · fintech, 2022–2025), Freelance (2023–presente), MINDHUB bootcamp, UNMDP.
8. **Contact + CV** — email · LinkedIn · GitHub · botón **Download CV**.
9. **Footer** — sello *hanko*, copyright, créditos.

## 6. Arquitectura técnica

### Stack
- Next.js 15+ (App Router), React 19, TypeScript.
- Tailwind CSS v4 (tokens vía `@theme`).
- Framer Motion (`motion`).
- Lenis (smooth scroll).
- `next/font` para Fraunces / Inter / JetBrains Mono.

### i18n (ligero, YAGNI)
- Dos diccionarios: `lib/i18n/en.ts` y `lib/i18n/es.ts` (objetos tipados con la misma forma).
- `LanguageProvider` (React Context) guarda el idioma actual (`en` | `es`), persiste en `localStorage`, default por `navigator.language`.
- Hook `useT()` devuelve el diccionario activo. Sin rutas localizadas ni middleware.

### Contenido centralizado
- `lib/content.ts` — fuente única de verdad de los datos NO traducibles o estructurales (lista de proyectos con url/badge/imagen/tags, items de stack, items de timeline, links sociales).
- Los textos traducibles (headlines, copys, labels) viven en los diccionarios i18n.

### Screenshots (Playwright)
- Script que navega a las 3 URLs y captura viewport desktop (y opcional mobile) → `public/projects/{enippon,chimbela,instacheck}.png`.
- Optimización con `next/image`.

### Estructura de carpetas
```
hugo-portfolio/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ globals.css
├─ components/
│  ├─ Nav.tsx
│  ├─ LangToggle.tsx
│  ├─ Hero.tsx
│  ├─ About.tsx
│  ├─ Stack.tsx
│  ├─ AIOrchestration.tsx
│  ├─ Work.tsx        (+ ProjectCard.tsx)
│  ├─ Timeline.tsx
│  ├─ Contact.tsx
│  ├─ Footer.tsx
│  └─ ui/             (Reveal, SectionLabel, Hairline, etc.)
├─ lib/
│  ├─ content.ts
│  └─ i18n/ (index.ts, en.ts, es.ts, LanguageProvider.tsx, useT.ts)
├─ public/
│  ├─ hugo.jpg
│  ├─ cv.pdf
│  ├─ hanko.svg
│  └─ projects/*.png
├─ docs/superpowers/specs/2026-06-30-portfolio-design.md
└─ (configs: package.json, tsconfig, tailwind, next.config, etc.)
```

## 7. Calidad / no-funcionales

- **Responsive** mobile-first (breakpoints sm/md/lg).
- **Accesibilidad:** contraste AA, `alt` en imágenes, navegación por teclado, foco visible, `prefers-reduced-motion`.
- **Performance:** objetivo Lighthouse ≥ 90; `next/image`, fuentes con `display: swap`, lazy de screenshots.
- **SEO básico:** metadata, Open Graph, título/descr bilingüe del idioma por defecto.

## 8. Fuera de alcance (v1 — YAGNI)

- Dark mode.
- Formulario de contacto con backend / envío de emails.
- CMS / blog.
- i18n por rutas (`/en`, `/es`) y SSR traducido.
- Analytics avanzado (se puede sumar Vercel Analytics luego, trivial).

## 9. Riesgos / consideraciones

- **Screenshots:** alguna web puede tardar/animar al cargar → esperar `networkidle` y un pequeño delay antes de capturar.
- **Foto:** se necesita el archivo real en `public/hugo.jpg` (lo provee Hugo).
- **CV:** copiar `Hugo Onofri Bastit CV.pdf` a `public/cv.pdf`.
- **Equilibrio japonés:** mantenerlo sutil; demasiados kanji/sellos rompen el tono "serio".

## 10. Criterios de éxito

- [ ] Scroll dinámico y animado, fluido en desktop y mobile.
- [ ] Toggle EN/ES funcional y persistente.
- [ ] Las 3 webs se ven con preview real y enlazan correctamente.
- [ ] enippon y Chimbela marcadas como `Client`; Instacheck como `Product`.
- [ ] Sección AI Orchestration presente y destacada.
- [ ] Descarga de CV funcional.
- [ ] Estética Japandi Editorial coherente, sutil y profesional.
- [ ] Lighthouse ≥ 90 y respeta `prefers-reduced-motion`.
- [ ] Build de producción sin errores y desplegable en Vercel.
