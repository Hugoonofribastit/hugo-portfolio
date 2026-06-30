import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.SITE_URL || "http://localhost:3000/";
mkdirSync("design-explorations/shots", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2400); // hero entrance

// Hero
await page.screenshot({ path: "design-explorations/shots/site-1-hero.png" });

// Scroll through sections, pausing so reveals trigger, capturing key frames.
const targets = [
  { sel: "#about", out: "site-2-about.png" },
  { sel: "#stack", out: "site-3-stack.png" },
  { sel: "#experience", out: "site-4-experience.png" },
  { sel: "#work", out: "site-5-work.png" },
  { sel: "#contact", out: "site-6-contact.png" },
];
for (const t of targets) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  }, t.sel);
  await page.waitForTimeout(1100); // let reveals + parallax settle
  await page.screenshot({ path: `design-explorations/shots/${t.out}` });
  console.log("captured", t.out);
}

// Footer viewport shot
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(700);
await page.screenshot({ path: "design-explorations/shots/site-7-footer.png" });
console.log("captured site-7-footer.png");

// Full page after everything is revealed
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(600);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: "design-explorations/shots/site-full.png", fullPage: true });

await browser.close();
console.log("done");
