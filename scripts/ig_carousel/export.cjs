// Export da skill /instagram-carousel: viewport 420 × 525 e device_scale_factor 1080/420 → PNG 1080 × 1350.
// Uso: node scripts/ig_carousel/export.cjs <carousel.html> <pasta-de-saida> <total> [--preview arquivo.png]
// Usa o Playwright já instalado no ambiente (o export original da skill é em Python; a lógica é a mesma).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const VIEW_W = 420;
const VIEW_H = 525;
const SCALE = 1080 / 420;

(async () => {
  const [html, outDir, totalArg, flag, previewPath] = process.argv.slice(2);
  const total = Number(totalArg);
  const content = fs.readFileSync(html, 'utf8');
  const browser = await chromium.launch();

  if (flag === '--preview') {
    // Prévia da moldura inteira (para revisão), sem exportar os slides.
    const page = await browser.newPage({ viewport: { width: 520, height: 900 }, deviceScaleFactor: 2 });
    await page.setContent(content, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const frame = await page.$('.ig-frame');
    await frame.screenshot({ path: previewPath });
    console.log('preview', previewPath);
    await browser.close();
    return;
  }

  fs.mkdirSync(outDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: VIEW_W, height: VIEW_H }, deviceScaleFactor: SCALE });
  await page.setContent(content, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption').forEach((el) => (el.style.display = 'none'));
    const frame = document.querySelector('.ig-frame');
    frame.style.cssText = 'width:420px;height:525px;max-width:none;border-radius:0;box-shadow:none;overflow:hidden;margin:0;border:0;';
    const viewport = document.querySelector('.carousel-viewport');
    viewport.style.cssText = 'width:420px;height:525px;aspect-ratio:unset;overflow:hidden;cursor:default;';
    document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;';
  });
  await page.waitForTimeout(300);
  for (let i = 0; i < total; i++) {
    await page.evaluate((idx) => {
      const track = document.querySelector('.carousel-track');
      track.style.transition = 'none';
      track.style.transform = 'translateX(' + -idx * 420 + 'px)';
    }, i);
    await page.waitForTimeout(200);
    const file = path.join(outDir, `slide_${i + 1}.png`);
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: VIEW_W, height: VIEW_H } });
    console.log(`Exported slide ${i + 1}/${total}`);
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
