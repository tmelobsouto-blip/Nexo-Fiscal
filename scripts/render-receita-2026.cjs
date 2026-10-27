// Renderiza os 12 cards (7 s cada), o guia da enquete e a prévia completa com um único bundle.
// Uso: node scripts/render-receita-2026.cjs [--preview]
const path = require('path');
const { bundle } = require('@remotion/bundler');
const { renderMedia, renderStill, selectComposition } = require('@remotion/renderer');

const OUT = 'exports/stories/receita-2026';
const browserExecutable = process.env.REMOTION_BROWSER;

(async () => {
  const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
  const pick = (id) => selectComposition({ serveUrl, id, browserExecutable });
  for (let i = 1; i <= 12; i++) {
    const id = `DS-STORY-receita-2026-${String(i).padStart(2, '0')}`;
    await renderMedia({ serveUrl, composition: await pick(id), codec: 'h264', outputLocation: `${OUT}/${id}.mp4`, browserExecutable });
    console.log('ok', id);
  }
  const guide = await pick('DS-STORY-receita-2026-11-guia');
  await renderStill({ serveUrl, composition: guide, frame: 120, output: `${OUT}/DS-STORY-receita-2026-11-guia.png`, browserExecutable });
  if (process.argv.includes('--preview')) {
    await renderMedia({ serveUrl, composition: await pick('DS-STORY-receita-2026'), codec: 'h264', outputLocation: `${OUT}/DS-STORY-receita-2026-completo.mp4`, browserExecutable });
    console.log('ok preview');
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
