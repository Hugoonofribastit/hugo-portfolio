# Next.js 16 — Cheatsheet para este proyecto (LEER antes de codear)

> Extraído de los docs embebidos en `node_modules/next/dist/docs` (Next 16.2.9).
> Aplica a TODOS los componentes y a cualquier subagente que escriba código aquí.

## Reglas duras (rompen el build / el comportamiento si se ignoran)

1. **Smooth scroll:** el root `<html>` DEBE llevar `data-scroll-behavior="smooth"`. Next 16 ya no hace override del scroll en navegación.
2. **next/image:** usar **`preload`** (NO `priority`, está deprecado). `quality` debe estar permitido en `next.config.ts → images.qualities`. Static imports (`import img from "@/public/x.png"`) auto-proveen width/height/blurDataURL — no setearlos a mano.
3. **Tailwind v4:** ya configurado por el scaffold → `@import "tailwindcss"` (sin las 3 directivas `@tailwind`), plugin `@tailwindcss/postcss`, **sin `tailwind.config.js`**. Toda la config de tema va en `@theme {}` dentro de `app/globals.css`.
4. **Server vs Client:** `layout.tsx` y `page.tsx` son **Server Components**. Poné `"use client"` SOLO en componentes con Framer Motion, hooks (useState/useEffect), o que consumen Context. Mantené el boundary lo más "hoja" posible.
5. **React Context (i18n):** el Provider va en un archivo `"use client"` y se monta desde el layout (Server) envolviendo `{children}`. No usar `createContext`/`useContext` en Server Components.
6. **metadata:** `export const metadata` y `export const viewport` van SOLO en Server Components (layout/page). No mezclar viewport dentro de metadata (usar el export `viewport` aparte).
7. **Fonts (next/font):** constructores a nivel de módulo (nunca dentro de un componente). Fraunces/Inter/JetBrains Mono son **variables** → NO pasar `weight`. Usar `variable: "--font-..."` y referenciarlas en `@theme`.
8. **Turbopack** es el bundler por defecto en dev y build. No agregar config de webpack.
9. **No** usar `output: "export"` (deploy en Vercel nativo, queremos optimización de imágenes).
10. **Animaciones / SPA:** los Client Components se **prerenderean** igual (el HTML estático sale en el build; las animaciones corren post-hidratación). Si una lib toca `window`/`document` al importarse, cargarla con `dynamic(() => import("./x"), { ssr: false })`. Framer Motion (`motion`) normal NO necesita esto.

## Snippets correctos

### `app/layout.tsx` (Server Component)
```tsx
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = { title: "...", description: "...", openGraph: {...} };
export const viewport: Viewport = { themeColor: "#F4F1EA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
```

### `@theme` en `app/globals.css` (Tailwind v4)
```css
@import "tailwindcss";
@theme {
  --color-washi: #F4F1EA; --color-sumi: #1A1A17;
  --color-ai: #2E4374; --color-bengara: #9E4A3B; --color-kin: #B8975A;
  --font-serif: var(--font-serif); --font-sans: var(--font-sans); --font-mono: var(--font-mono);
}
```
Uso en JSX: `className="bg-washi text-sumi font-serif"`, acentos `text-ai` / `text-bengara`.

### Componente cliente con Framer Motion
```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";   // ← import desde "motion/react"
```
> El paquete es `motion` (Motion v12). Import correcto: `motion/react`.

### next/image en cards
```tsx
import Image from "next/image";
<Image src="/projects/enippon.png" alt="..." width={1440} height={900}
  sizes="(max-width:768px) 100vw, 50vw" className="..." /* preload solo en LCP */ />
```

### Vitest (Next 16 + Vitest 4)
- Config: `vitest.config.mts` con `vite-tsconfig-paths` + `@vitejs/plugin-react`.
- Requiere `@testing-library/dom` instalado explícitamente.
- Solo se testean Client Components / lógica pura (no async Server Components).
