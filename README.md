# Hugo Onofri Bastit — Portfolio

Personal portfolio of **Hugo Onofri Bastit**, Full Stack Developer (Mar del Plata, Argentina).

Single‑page, bilingual (EN/ES), animated portfolio with a bold editorial / modern‑brutalist design.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + a custom design system (CSS variables)
- **Framer Motion (motion)** for entrance/scroll animations
- Custom scroll‑reveal, parallax, marquee and magnetic‑button interactions
- **Vitest** + Testing Library for the i18n and content logic
- Fonts via `next/font`: Bricolage Grotesque · Space Grotesk · Space Mono

## Features

- Bilingual EN/ES with a persistent toggle (React Context, no heavy i18n lib)
- Sections: Hero · Tech marquee · About · Stack · Work (with live site previews) · Contact
- Accessible: respects `prefers-reduced-motion`, keyboard‑friendly, content visible without JS
- Deploys to Vercel with zero config

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # serve the production build
npm test             # run the test suite
npm run screenshots  # regenerate project preview images (Playwright)
```

## Deploy

Deploys to **Vercel** out of the box: import the repo at vercel.com and deploy (no extra configuration needed).

---

© Hugo Onofri Bastit
