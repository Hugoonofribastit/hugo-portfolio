// Generates a clearly-visible, on-brand portrait placeholder at public/hugo.jpg
// until the real Kyoto bamboo-grove photo is dropped in.
// Run: node scripts/generate-placeholder.mjs
import { chromium } from "playwright";

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Space+Mono&display=swap');
  *{margin:0;box-sizing:border-box;}
  body{width:800px;height:1000px;background:#100f0c;display:flex;align-items:center;justify-content:center;font-family:'Bricolage Grotesque',sans-serif;overflow:hidden;}
  .frame{position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;}
  /* faint bamboo verticals */
  .bamboo{position:absolute;inset:0;background-image:repeating-linear-gradient(90deg, rgba(241,240,234,.05) 0 2px, transparent 2px 64px);}
  .glow{position:absolute;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(242,48,21,.35),transparent 62%);filter:blur(8px);}
  .mono{font-size:170px;font-weight:800;color:#f1f0ea;letter-spacing:4px;z-index:2;line-height:.9;}
  .bar{width:84px;height:12px;background:#f23015;z-index:2;}
  .cap{font-family:'Space Mono',monospace;font-size:20px;letter-spacing:8px;color:rgba(241,240,234,.7);text-transform:uppercase;z-index:2;}
</style></head><body>
  <div class="frame">
    <div class="bamboo"></div>
    <div class="glow"></div>
    <div class="mono">HO</div>
    <div class="bar"></div>
    <div class="cap">Kyoto &middot; 京都</div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 800, height: 1000 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.waitForTimeout(900);
await page.screenshot({ path: "public/hugo.jpg", type: "jpeg", quality: 90 });
await browser.close();
console.log("placeholder written to public/hugo.jpg");
