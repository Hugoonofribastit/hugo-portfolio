# Portfolio Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una landing/portfolio de una página, bilingüe (EN/ES), con scroll animado y estética Japandi Editorial, que posicione a Hugo como Full Stack Developer & AI Orchestrator y muestre sus trabajos con previews reales.

**Architecture:** Next.js App Router (SPA de una sola ruta `/`). Idioma vía React Context + diccionarios tipados (sin librería i18n pesada). Contenido estructural centralizado en `lib/content.ts`. Animaciones con Framer Motion + smooth scroll con Lenis. Previews capturadas con Playwright a `public/projects/*.png`. Deploy en Vercel.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, Vitest + React Testing Library (tests de lógica), Playwright (screenshots), next/font (Fraunces, Inter, JetBrains Mono).

## Global Constraints

- **Idioma de UI:** bilingüe EN/ES, toggle persistente en `localStorage`, default por `navigator.language`. Todo texto visible sale de los diccionarios i18n.
- **Estética (tokens exactos):** `washi #F4F1EA`, `sumi #1A1A17`, `ai #2E4374`, `bengara #9E4A3B`, `kin #B8975A`. Modo claro base. Toque japonés sutil (sin kitsch).
- **Tipografía:** titulares *Fraunces*, cuerpo *Inter*, mono *JetBrains Mono* (vía `next/font`, `display: swap`).
- **Accesibilidad:** contraste AA, `alt` en imágenes, foco visible, **respetar `prefers-reduced-motion`** (degradar a fades/sin movimiento).
- **Encuadre de proyectos:** *enippon* = `Client`, *Rebozadores Chimbela* = `Client`, *Instacheck* = `Product`. enippon NO es producto propio.
- **Sin backend:** contacto = links + descarga de CV. Nada de formularios con envío de email en v1.
- **Performance:** objetivo Lighthouse ≥ 90; `next/image` para previews y foto.
- **Plataforma:** Windows + PowerShell. Comandos compatibles. Deploy objetivo: Vercel.
- **Convención del plan:** tareas marcadas `[LÓGICA]` llevan TDD con código completo. Tareas `[VISUAL]` definen contrato (props/contenido/animación/criterios) y se implementan invocando la skill **frontend-design** para el código de diseño; se verifican por build + dev server + revisión visual + a11y.

---

## Mapa de archivos

| Archivo | Responsabilidad |
|---------|-----------------|
| `app/layout.tsx` | Root layout, fuentes, `LanguageProvider`, metadata base |
| `app/page.tsx` | Ensambla las secciones en orden |
| `app/globals.css` | Tailwind v4 `@theme` con tokens, base styles |
| `lib/i18n/en.ts`, `es.ts` | Diccionarios tipados (misma forma) |
| `lib/i18n/types.ts` | Tipo `Dictionary` (forma compartida) |
| `lib/i18n/LanguageProvider.tsx` | Context, estado de idioma, persistencia |
| `lib/i18n/useT.ts` | Hook `useT()` → diccionario activo + `useLang()` |
| `lib/content.ts` | Datos estructurales: proyectos, stack, timeline, social |
| `components/ui/Reveal.tsx` | Wrapper de animación scroll-reveal (reduced-motion aware) |
| `components/ui/SectionLabel.tsx` | Etiqueta de sección (kanji + romaji + índice) |
| `components/ui/Hairline.tsx` | Separador de línea fina |
| `components/SmoothScroll.tsx` | Provider de Lenis |
| `components/Nav.tsx` + `LangToggle.tsx` | Nav sticky + toggle EN/ES |
| `components/Hero.tsx` | Sección hero |
| `components/About.tsx` | Bio + foto Kyoto |
| `components/Stack.tsx` | Grid de tecnologías |
| `components/AIOrchestration.tsx` | Sección diferenciador IA |
| `components/Work.tsx` + `ProjectCard.tsx` | Grid de proyectos con previews |
| `components/Timeline.tsx` | Experiencia/educación |
| `components/Contact.tsx` + `Footer.tsx` | Contacto, CV, sello |
| `scripts/capture-screenshots.mjs` | Playwright: captura las 3 webs |
| `public/hugo.jpg`, `cv.pdf`, `hanko.svg`, `projects/*.png` | Assets |

---

### Task 1: Scaffold del proyecto + dependencias + tokens + fuentes  `[LÓGICA/SETUP]`

**Files:**
- Create: proyecto completo vía `create-next-app` en `C:\Users\Hugo\Desktop\hugo-portfolio`
- Modify: `app/globals.css`, `app/layout.tsx`, `package.json`
- Create: `tsconfig` paths (`@/*`)

**Interfaces:**
- Produces: alias `@/` → raíz; tokens Tailwind (`bg-washi`, `text-sumi`, `text-ai`, `text-bengara`, `text-kin`); fuentes CSS vars `--font-serif`, `--font-sans`, `--font-mono`.

- [ ] **Step 1: Scaffold** (el proyecto se crea en una carpeta temporal y se fusiona, porque `docs/` ya existe)

Run (PowerShell, desde el Desktop):
```powershell
npx create-next-app@latest hugo-portfolio-tmp --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*" --no-turbopack --use-npm
```
Luego mover el contenido generado dentro de `hugo-portfolio/` (preservando `docs/`):
```powershell
Copy-Item -Path .\hugo-portfolio-tmp\* -Destination .\hugo-portfolio\ -Recurse -Force
Copy-Item -Path .\hugo-portfolio-tmp\.gitignore -Destination .\hugo-portfolio\ -Force
Remove-Item -Path .\hugo-portfolio-tmp -Recurse -Force
```

- [ ] **Step 2: Instalar dependencias**

Run (desde `hugo-portfolio/`):
```powershell
npm install motion lenis
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react playwright
npx playwright install chromium
```

- [ ] **Step 3: Configurar fuentes en `app/layout.tsx`**

```tsx
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
// aplicar `${serif.variable} ${sans.variable} ${mono.variable}` en <html>
```

- [ ] **Step 4: Definir tokens en `app/globals.css` (Tailwind v4 `@theme`)**

```css
@import "tailwindcss";
@theme {
  --color-washi: #F4F1EA;
  --color-sumi: #1A1A17;
  --color-ai: #2E4374;
  --color-bengara: #9E4A3B;
  --color-kin: #B8975A;
  --font-serif: var(--font-serif);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}
body { background: var(--color-washi); color: var(--color-sumi); font-family: var(--font-sans); }
```

- [ ] **Step 5: Verificar que arranca**

Run: `npm run dev` → abrir http://localhost:3000
Expected: arranca sin errores, fondo `washi`. (Reemplazaremos el contenido en tasks siguientes.)

- [ ] **Step 6: Configurar Vitest** — crear `vitest.config.ts` y `vitest.setup.ts`

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"], globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```
```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```
Añadir a `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 7: Commit** (si Hugo habilita git; ver nota final del plan)

---

### Task 2: Sistema i18n  `[LÓGICA]`

**Files:**
- Create: `lib/i18n/types.ts`, `lib/i18n/en.ts`, `lib/i18n/es.ts`, `lib/i18n/LanguageProvider.tsx`, `lib/i18n/useT.ts`
- Test: `lib/i18n/i18n.test.tsx`

**Interfaces:**
- Produces:
  - `type Lang = "en" | "es"`
  - `type Dictionary = { ... }` (forma compartida; campos por sección)
  - `<LanguageProvider>{children}</LanguageProvider>`
  - `useLang(): { lang: Lang; setLang: (l: Lang) => void; toggle: () => void }`
  - `useT(): Dictionary`

- [ ] **Step 1: Test que falla** — `lib/i18n/i18n.test.tsx`

```tsx
import { render, screen, act } from "@testing-library/react";
import { LanguageProvider } from "./LanguageProvider";
import { useT, useLang } from "./useT";

function Probe() {
  const t = useT();
  const { toggle } = useLang();
  return <button onClick={toggle}>{t.nav.work}</button>;
}

test("default en, toggle switches to es", () => {
  render(<LanguageProvider><Probe /></LanguageProvider>);
  const btn = screen.getByRole("button");
  expect(btn.textContent).toBe("Work");        // en.ts
  act(() => btn.click());
  expect(btn.textContent).toBe("Trabajos");     // es.ts
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `npm test -- i18n`
Expected: FAIL (módulos no existen).

- [ ] **Step 3: Implementar tipos y diccionarios mínimos**

`lib/i18n/types.ts`:
```ts
export type Lang = "en" | "es";
export interface Dictionary {
  nav: { work: string; about: string; stack: string; contact: string; cv: string };
  hero: { name: string; role: string; subcopy: string; ctaWork: string; ctaContact: string };
  about: { label: string; title: string; body: string; location: string };
  stack: { label: string; title: string; categories: Record<string, string> };
  ai: { label: string; title: string; body: string; points: string[] };
  work: { label: string; title: string; client: string; product: string; visit: string };
  timeline: { label: string; title: string };
  contact: { label: string; title: string; body: string; email: string; download: string };
  footer: { rights: string };
}
```
`lib/i18n/en.ts` y `lib/i18n/es.ts`: exportan `const en: Dictionary` / `const es: Dictionary` con la misma forma. (Contenido de copy real se afina en Task 3 con input de Hugo; acá basta texto correcto y completo: `nav.work` = "Work"/"Trabajos", etc.)

- [ ] **Step 4: Implementar `LanguageProvider.tsx` y `useT.ts`**

```tsx
// LanguageProvider.tsx ("use client")
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "./types";
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang)=>void; toggle: ()=>void } | null>(null);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved) setLang(saved);
    else if (navigator.language.startsWith("es")) setLang("es");
  }, []);
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
  const toggle = () => setLang(l => (l === "en" ? "es" : "en"));
  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}
export function useLang() { const v = useContext(Ctx); if (!v) throw new Error("LanguageProvider missing"); return v; }
```
```ts
// useT.ts
"use client";
import { en } from "./en"; import { es } from "./es";
import { useLang } from "./LanguageProvider";
export { useLang };
export function useT() { const { lang } = useLang(); return lang === "es" ? es : en; }
```

- [ ] **Step 5: Correr y verificar que pasa**

Run: `npm test -- i18n`
Expected: PASS.

- [ ] **Step 6: Test de paridad de claves** (evita que un diccionario quede incompleto)

```tsx
import { en } from "./en"; import { es } from "./es";
test("en y es tienen las mismas claves top-level", () => {
  expect(Object.keys(es)).toEqual(Object.keys(en));
});
```
Run: `npm test -- i18n` → PASS.

- [ ] **Step 7: Montar `LanguageProvider` en `app/layout.tsx`** (envolver children). Commit.

---

### Task 3: Contenido centralizado + assets  `[LÓGICA]` + 🧑‍💻 *contribución de Hugo*

**Files:**
- Create: `lib/content.ts`
- Test: `lib/content.test.ts`
- Assets: `public/hugo.jpg`, `public/cv.pdf`, `public/hanko.svg`

**Interfaces:**
- Produces:
  - `type ProjectKind = "Client" | "Product"`
  - `interface Project { id: string; name: string; kind: ProjectKind; url?: string; image?: string; tags: string[] }`
  - `interface StackItem { category: string; items: string[] }`
  - `interface TimelineItem { id: string; period: string; org: string; role: string }`
  - `interface SocialLink { label: string; href: string }`
  - exports: `projects`, `stackGroups`, `timeline`, `socials`

- [ ] **Step 1: Test que falla** — `lib/content.test.ts`

```ts
import { projects, stackGroups, timeline, socials } from "./content";
test("proyectos correctamente encuadrados", () => {
  const byId = Object.fromEntries(projects.map(p => [p.id, p]));
  expect(byId.enippon.kind).toBe("Client");
  expect(byId.chimbela.kind).toBe("Client");
  expect(byId.instacheck.kind).toBe("Product");
});
test("las 3 webs con preview tienen url e image", () => {
  ["enippon","chimbela","instacheck"].forEach(id => {
    const p = projects.find(x => x.id === id)!;
    expect(p.url).toMatch(/^https:\/\//);
    expect(p.image).toMatch(/^\/projects\//);
  });
});
test("hay social links de email, linkedin y github", () => {
  const labels = socials.map(s => s.label.toLowerCase());
  expect(labels).toEqual(expect.arrayContaining(["email","linkedin","github"]));
});
```

- [ ] **Step 2: Correr y verificar que falla** — Run: `npm test -- content` → FAIL.

- [ ] **Step 3: Implementar `lib/content.ts`** (datos del CV, verificados)

```ts
export type ProjectKind = "Client" | "Product";
export interface Project { id: string; name: string; kind: ProjectKind; url?: string; image?: string; tags: string[] }
export interface StackItem { category: string; items: string[] }
export interface TimelineItem { id: string; period: string; org: string; role: string }
export interface SocialLink { label: string; href: string }

export const projects: Project[] = [
  { id: "enippon", name: "enippon", kind: "Client", url: "https://enippon-web.vercel.app/", image: "/projects/enippon.png", tags: ["Next.js","Landing","Agency"] },
  { id: "chimbela", name: "Rebozadores Chimbela", kind: "Client", url: "https://rebozadoreschimbela.com/", image: "/projects/chimbela.png", tags: ["Web","Branding"] },
  { id: "instacheck", name: "Instacheck", kind: "Product", url: "https://dev.instacheckapp.com/", image: "/projects/instacheck.png", tags: ["React Native","Next.js","Kotlin","MongoDB","PostgreSQL"] },
  { id: "pharmacy", name: "Pharmacy E-commerce", kind: "Client", tags: ["ReactJS","MercadoPago"] },
  { id: "institute", name: "Educational Institute", kind: "Client", tags: ["ReactJS","Bootstrap","NodeJS"] },
];

export const stackGroups: StackItem[] = [
  { category: "frontend", items: ["React","Next.js","React Native","TypeScript","Tailwind","MUI","Bootstrap"] },
  { category: "backend", items: ["Node.js","Python","FastAPI","Flask","Django REST","Kotlin","SQLAlchemy","Alembic"] },
  { category: "cloud", items: ["AWS S3","EC2","Lambda","API Gateway","AppSync","SQS","CloudWatch","Secrets Manager","Serverless"] },
  { category: "data", items: ["PostgreSQL","MongoDB","SQL","GraphQL"] },
  { category: "ai", items: ["Claude Code","MCP servers","Multi-agent","Custom skills"] },
];

export const timeline: TimelineItem[] = [
  { id: "making-sense", period: "2022 – 2025", org: "Making Sense", role: "Python Developer · Client: CCI (fintech)" },
  { id: "freelance", period: "2023 – Present", org: "Freelance", role: "Full Stack Developer" },
  { id: "mindhub", period: "Bootcamp", org: "MINDHUB", role: "Full Stack MERN (700+ hs)" },
  { id: "unmdp", period: "—", org: "UNMDP", role: "Business Administration · English Teaching (in progress)" },
];

export const socials: SocialLink[] = [
  { label: "Email", href: "mailto:hugo.onofribastit@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/hugoonofrib" },
  { label: "GitHub", href: "https://github.com/Hugoonofribastit" },
];
```

- [ ] **Step 4: Correr y verificar que pasa** — Run: `npm test -- content` → PASS.

- [ ] **Step 5: 🧑‍💻 Contribución de Hugo — copys con voz propia**

> **Por qué importa:** la bio, el subcopy del hero y los one-liners de proyectos son tu dominio (tu carrera, tu voz). Un buen portfolio se nota cuando el copy es del dueño, no genérico. Te pediré que completes 4 textos cortos (EN + ES) en `lib/i18n/en.ts`/`es.ts`:
> 1. `hero.subcopy` (1 línea, qué resolvés y para quién)
> 2. `about.body` (2–3 frases: quién sos, Japón/idiomas, cómo trabajás)
> 3. `ai.body` (2 frases sobre tu uso de Claude Code/MCP/multi-agente)
> 4. `contact.body` (1 frase de invitación a contactarte)
>
> Si preferís, propongo un borrador para cada uno y vos lo ajustás.

- [ ] **Step 6: Copiar assets**

```powershell
Copy-Item "C:\Users\Hugo\Desktop\Hugo Onofri Bastit CV.pdf" ".\public\cv.pdf"
```
Hugo coloca su foto en `public/hugo.jpg`. Crear `public/hanko.svg` (sello rojo `bengara` simple con iniciales/kanji). Commit.

---

### Task 4: Screenshots de las webs (Playwright)  `[LÓGICA]`

**Files:**
- Create: `scripts/capture-screenshots.mjs`
- Output: `public/projects/enippon.png`, `chimbela.png`, `instacheck.png`

**Interfaces:**
- Produces: 3 PNG en `public/projects/` referenciados por `lib/content.ts`.

- [ ] **Step 1: Escribir `scripts/capture-screenshots.mjs`**

```js
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const targets = [
  { url: "https://enippon-web.vercel.app/", out: "public/projects/enippon.png" },
  { url: "https://rebozadoreschimbela.com/", out: "public/projects/chimbela.png" },
  { url: "https://dev.instacheckapp.com/", out: "public/projects/instacheck.png" },
];
mkdirSync("public/projects", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
for (const t of targets) {
  try {
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2500); // dejar asentar animaciones de entrada
    await page.screenshot({ path: t.out }); // viewport (no fullPage) → preview tipo "above the fold"
    console.log("OK", t.out);
  } catch (e) { console.error("FALLÓ", t.url, e.message); }
}
await browser.close();
```

- [ ] **Step 2: Ejecutar** — Run: `node scripts/capture-screenshots.mjs`
Expected: imprime `OK public/projects/*.png` para las 3. Si alguna falla (red/iframe), reintentar; como fallback, capturar con `waitUntil: "load"`.

- [ ] **Step 3: Verificar** los 3 PNG existen y se ven bien (abrir las imágenes). Commit.

---

### Task 5: Primitivas UI + smooth scroll  `[VISUAL]` (con frontend-design)

**Files:**
- Create: `components/ui/Reveal.tsx`, `components/ui/SectionLabel.tsx`, `components/ui/Hairline.tsx`, `components/SmoothScroll.tsx`

**Interfaces:**
- Produces:
  - `<Reveal as?="div" delay?={number} y?={number}>` — anima opacity/translateY al entrar al viewport (Framer Motion `whileInView`), **desactiva movimiento si `prefers-reduced-motion`** (usar `useReducedMotion()` de motion → solo fade o nada).
  - `<SectionLabel kanji={string} romaji={string} index={string} />` — etiqueta editorial (mono) con kanji + romaji + nº.
  - `<Hairline />` — `<div>` línea fina `kin`/`sumi` a baja opacidad.
  - `<SmoothScroll>` — monta Lenis en cliente, RAF loop, cleanup en unmount.

- [ ] **Step 1:** Implementar `SmoothScroll.tsx` (Lenis):

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1 });
    let raf: number;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 2:** Implementar `Reveal`, `SectionLabel`, `Hairline` con **frontend-design** (estética Japandi, reduced-motion aware). Importar `lenis/dist/lenis.css` si hace falta.

- [ ] **Step 3: Verificar** — Run: `npm run dev`. Crear un uso temporal de `<Reveal>` en `page.tsx` y confirmar animación al hacer scroll; con SO en "reduce motion" no hay desplazamiento. Build: `npm run build` → sin errores. Commit.

**Criterios:** animaciones suaves (ease-out, 0.4–0.8s); `prefers-reduced-motion` respetado; tipografía mono en labels.

---

### Task 6: Nav + LangToggle  `[VISUAL]` (con frontend-design)

**Files:** Create `components/Nav.tsx`, `components/LangToggle.tsx`

**Interfaces:**
- Consumes: `useT()`, `useLang()`.
- Produces: `<Nav />` (sticky, minimal, anclas `#work #about #stack #contact`, link CV `/cv.pdf`), `<LangToggle />` (botón `EN | ES` que llama `toggle()`).

- [ ] **Step 1:** Implementar con frontend-design: nav minimal, hairline inferior, blur/translucidez sutil al hacer scroll, foco visible, labels desde `useT().nav`.
- [ ] **Step 2:** `LangToggle` muestra el idioma activo resaltado en `ai`; accesible (`aria-pressed`/`aria-label`).
- [ ] **Step 3: Verificar** dev server: el toggle cambia TODA la copy visible; anclas hacen scroll suave (Lenis). Build OK. Commit.

---

### Task 7: Hero  `[VISUAL]` (con frontend-design)

**Files:** Create `components/Hero.tsx`

**Interfaces:** Consumes `useT().hero`. Produces `<Hero />`.

- [ ] **Step 1:** Implementar con frontend-design: nombre, headline serif grande *"Full Stack Developer & AI Orchestrator"* (desde `hero.role`), `hero.subcopy`, CTAs (`hero.ctaWork` → `#work`, `hero.ctaContact` → `#contact`). Animación de entrada en stagger (título → subcopy → CTAs), parallax/blur sutil. `prefers-reduced-motion` → fade simple.
- [ ] **Step 2: Verificar** dev server: entra animado, responsive (mobile/desktop), copy cambia con idioma. Build OK. Commit.

**Criterios:** "moderno pero serio": jerarquía tipográfica fuerte, mucho aire, acento `bengara`/`ai` puntual, kanji/romaji sutil opcional.

---

### Task 8: About (bio + foto Kyoto)  `[VISUAL]` (con frontend-design)

**Files:** Create `components/About.tsx`

**Interfaces:** Consumes `useT().about`, `next/image` con `public/hugo.jpg`. Produces `<About id="about" />`.

- [ ] **Step 1:** Implementar con frontend-design: layout editorial asimétrico; **foto discreta** (contenida, p.ej. retrato chico con marco/hairline, NO full-bleed), `about.body`, `about.location`. Hilo Japón/idiomas presente y sutil.
- [ ] **Step 2: Verificar** la foto se ve pequeña/contenida en todos los breakpoints; `alt` correcto; reveal al scroll. Build OK. Commit.

---

### Task 9: Stack tecnológico  `[VISUAL]` (con frontend-design)

**Files:** Create `components/Stack.tsx`

**Interfaces:** Consumes `useT().stack`, `stackGroups` de `content.ts`. Produces `<Stack id="stack" />`.

- [ ] **Step 1:** Implementar con frontend-design: grid por categoría (labels traducidos vía `stack.categories[category]`), items en chips mono o lista editorial, reveal en stagger. Categoría `ai` con tratamiento levemente destacado.
- [ ] **Step 2: Verificar** todas las categorías/items se listan; responsive; idioma cambia labels. Build OK. Commit.

---

### Task 10: AI Orchestration (sección destacada)  `[VISUAL]` (con frontend-design)

**Files:** Create `components/AIOrchestration.tsx`

**Interfaces:** Consumes `useT().ai`. Produces `<AIOrchestration />`.

- [ ] **Step 1:** Implementar con frontend-design: bloque destacado (contraste sutil, micro-estética "terminal" en mono dentro del lenguaje Japandi), `ai.title`, `ai.body`, `ai.points[]` (Claude Code, MCP servers, multi-agente, custom skills). Animación de typing/reveal sutil opcional (reduced-motion aware).
- [ ] **Step 2: Verificar** se lee como el diferenciador; no rompe el tono serio. Build OK. Commit.

---

### Task 11: Work + ProjectCard (previews)  `[VISUAL]` (con frontend-design)

**Files:** Create `components/Work.tsx`, `components/ProjectCard.tsx`

**Interfaces:** Consumes `useT().work`, `projects` de `content.ts`. Produces `<Work id="work" />`.

- [ ] **Step 1:** `ProjectCard` con `next/image` (preview), nombre, **badge** `Client`/`Product` (texto desde `work.client`/`work.product`), tags, botón `work.visit` → `url` (target `_blank`, `rel="noopener noreferrer"`). Proyectos sin `url`/`image` (pharmacy, institute) se muestran como cards de "mención" sin preview ni botón.
- [ ] **Step 2:** `Work` arma el grid (las 3 con preview destacadas arriba; menciones abajo), reveal en stagger, hover sutil (lift/scale pequeño, reduced-motion aware).
- [ ] **Step 3: Verificar** las 3 previews cargan desde `public/projects/*.png`, badges correctos (enippon/chimbela=Client, instacheck=Product), links abren las webs. Build OK. Commit.

---

### Task 12: Timeline  `[VISUAL]` (con frontend-design)

**Files:** Create `components/Timeline.tsx`

**Interfaces:** Consumes `useT().timeline`, `timeline` de `content.ts`. Produces `<Timeline />`.

- [ ] **Step 1:** Implementar con frontend-design: línea vertical con hairline, items (period/org/role) revelados al scroll en secuencia.
- [ ] **Step 2: Verificar** los 4 items aparecen ordenados; responsive. Build OK. Commit.

---

### Task 13: Contact + Footer  `[VISUAL]` (con frontend-design)

**Files:** Create `components/Contact.tsx`, `components/Footer.tsx`

**Interfaces:** Consumes `useT().contact`, `useT().footer`, `socials` de `content.ts`. Produces `<Contact id="contact" />`, `<Footer />`.

- [ ] **Step 1:** `Contact`: `contact.title`, `contact.body`, botones a `socials` (email/LinkedIn/GitHub) + **Download CV** (`/cv.pdf`, atributo `download`). `Footer`: sello `hanko.svg`, `footer.rights`, año.
- [ ] **Step 2: Verificar** links correctos; CV descarga; sello sutil. Build OK. Commit.

---

### Task 14: Ensamblado + SEO + pase final de calidad  `[VISUAL/LÓGICA]`

**Files:** Modify `app/page.tsx`, `app/layout.tsx`

**Interfaces:** Consumes todos los componentes anteriores.

- [ ] **Step 1:** `app/page.tsx` ensambla en orden: `<Nav/> <Hero/> <About/> <Stack/> <AIOrchestration/> <Work/> <Timeline/> <Contact/> <Footer/>`, todo dentro de `<SmoothScroll>`.
- [ ] **Step 2:** `app/layout.tsx`: `metadata` (title "Hugo Onofri Bastit — Full Stack Developer & AI Orchestrator", description, Open Graph con una preview, `lang` por defecto, favicon).
- [ ] **Step 3:** Pase de responsive (mobile/tablet/desktop) y a11y (foco, contraste AA, `alt`, `prefers-reduced-motion`).
- [ ] **Step 4: Verificar build de producción** — Run: `npm run build` → sin errores ni warnings de tipo. `npm start` y revisar Lighthouse (objetivo ≥ 90 en Performance/Best Practices/SEO/Accessibility).
- [ ] **Step 5: (Opcional) Deploy** — preparar para Vercel (`git init` + push, o `vercel` CLI). Solo si Hugo lo pide. Commit final.

---

## Self-Review (hecho por el autor del plan)

**1. Cobertura del spec:**
- Estética Japandi + tokens → Task 1, y aplicada en todas las `[VISUAL]`. ✓
- Tipografía → Task 1. ✓
- Bilingüe EN/ES → Task 2 (+ usado en cada sección). ✓
- Contenido/encuadre proyectos → Task 3 (test fija Client/Product). ✓
- Screenshots reales → Task 4. ✓
- Animaciones/Lenis/reduced-motion → Task 5 + cada `[VISUAL]`. ✓
- Secciones 1–9 del spec → Tasks 6–13. ✓
- Contacto links + CV → Task 13. ✓
- Foto discreta → Task 8. ✓
- SEO/responsive/Lighthouse/build → Task 14. ✓
- Fuera de alcance (dark mode, form backend, i18n por rutas) → respetado, no hay tareas. ✓

**2. Placeholder scan:** sin "TBD/TODO" de implementación. Los `[VISUAL]` delegan código de diseño a frontend-design **a propósito** (decisión de dominio declarada en Global Constraints), con contrato + criterios de verificación concretos. La contribución de Hugo (copys) está acotada y es input de dominio, no relleno.

**3. Consistencia de tipos:** `Dictionary` (Task 2) usado consistentemente por todas las secciones; `Project/ProjectKind/StackItem/TimelineItem/SocialLink` (Task 3) usados en Tasks 9/11/12/13. Nombres de claves i18n (`nav/hero/about/stack/ai/work/timeline/contact/footer`) coinciden entre tipo, diccionarios y consumidores.

## Nota sobre git
El sistema no auto-commitea. Los pasos "Commit" se ejecutan solo si Hugo habilita git (`git init`). Momento natural: antes del deploy a Vercel (Task 14, Step 5).
