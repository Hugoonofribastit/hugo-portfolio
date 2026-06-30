// Captura previews reales de las webs del portfolio con Playwright (Chromium).
// Uso: node scripts/capture-screenshots.mjs   (desde la raíz del proyecto)
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const targets = [
  { url: "https://www.enippontours.com/", out: "public/projects/enippon.png" },
  { url: "https://rebozadoreschimbela.com/", out: "public/projects/chimbela.png" },
  { url: "https://dev.instacheckapp.com/", out: "public/projects/instacheck.png" },
];

mkdirSync("public/projects", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "light",
});
const page = await ctx.newPage();

for (const t of targets) {
  let ok = false;
  for (const wait of ["networkidle", "load"]) {
    try {
      await page.goto(t.url, { waitUntil: wait, timeout: 45000 });
      await page.waitForTimeout(3500); // dejar asentar fuentes + animaciones de entrada
      await page.screenshot({ path: t.out, fullPage: false });
      console.log("OK   ", t.out, `(${wait})`);
      ok = true;
      break;
    } catch (e) {
      console.warn("retry", t.url, `(${wait})`, e.message.split("\n")[0]);
    }
  }
  if (!ok) console.error("FALLO", t.url);
}

await browser.close();
console.log("done");
