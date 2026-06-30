import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = "file:///C:/Users/Hugo/Desktop/hugo-portfolio/design-explorations/";
const variants = ["onyx", "kinetic", "aurora"];
mkdirSync("design-explorations/shots", { recursive: true });

const browser = await chromium.launch();
for (const v of variants) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  try {
    await page.goto(base + `variant-${v}.html`, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(2200); // let hero entrance settle
    await page.screenshot({ path: `design-explorations/shots/${v}-hero.png` });

    // scroll through to trigger IntersectionObserver reveals, then full capture
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) {
      await page.evaluate((_y) => window.scrollTo(0, _y), y);
      await page.waitForTimeout(110);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `design-explorations/shots/${v}-full.png`, fullPage: true });
    console.log("captured", v);
  } catch (e) {
    console.error("FAILED", v, e.message.split("\n")[0]);
  }
  await page.close();
}
await browser.close();
console.log("done");
