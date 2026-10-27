import React from 'react';
import { Composition, Still } from 'remotion';
import { REEL_FRAMES, Reel796 } from './carousel01/Reel';
import { CAROUSEL_SLIDES } from './carousel01/Slides';
import { FEED } from './ds/feed';
import { BANCAS_TRIBUTARIO_FRAMES, BancasTributario } from './ds/reels/BancasTributario';
import { ESTUDANTE_BANCAS_FRAMES, EstudanteBancas } from './ds/motion/EstudanteBancas';
import { RECEITA_2026_FRAMES, RECEITA_SCENE, RECEITA_TOTAL, Receita2026, Receita2026Capa } from './ds/motion/Receita2026';
import { SV31_BOARD, Sv31Board } from './ds/posts/Sv31Mockups';
import { STORY_LIST } from './ds/stories';
import { loadFonts } from './fonts';
import { Story } from './Story';
import { STYLES } from './styles';
import { LAYOUT } from './theme';
import { FPS, TOTAL_FRAMES } from './timeline';

loadFonts();

const base = { durationInFrames: TOTAL_FRAMES, fps: FPS, width: LAYOUT.width, height: LAYOUT.height };

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="StoryMockup" component={Story} {...base} defaultProps={{ showInstagramUI: true }} />
    <Composition id="StoryClean" component={Story} {...base} defaultProps={{ showInstagramUI: false }} />
    {STYLES.map(({ id, component }) => (
      <React.Fragment key={id}>
        <Composition id={`${id}-Mockup`} component={component} {...base} defaultProps={{ showInstagramUI: true }} />
        <Composition id={`${id}-Clean`} component={component} {...base} defaultProps={{ showInstagramUI: false }} />
      </React.Fragment>
    ))}
    <Composition id="Reel796-Mockup" component={Reel796} {...base} durationInFrames={REEL_FRAMES} defaultProps={{ showInstagramUI: true }} />
    <Composition id="Reel796-Clean" component={Reel796} {...base} durationInFrames={REEL_FRAMES} defaultProps={{ showInstagramUI: false }} />
    {CAROUSEL_SLIDES.map(({ id, component }) => (
      <Still key={id} id={id} component={component} width={1080} height={1350} />
    ))}
    {FEED.map(({ id, component }) => (
      <Still key={id} id={id} component={component} width={1080} height={1350} />
    ))}
    {(['A', 'B', 'C'] as const).map((d) => (
      <Still key={d} id={`DS-SV31-MOCKUP-${d}`} component={() => <Sv31Board dir={d} />} width={SV31_BOARD.width} height={SV31_BOARD.height} />
    ))}
    <Composition id="DS-STORY-bancas-estudante" component={EstudanteBancas} {...base} durationInFrames={ESTUDANTE_BANCAS_FRAMES} defaultProps={{ guide: false, showInstagramUI: false }} />
    <Composition id="DS-STORY-bancas-estudante-guia" component={EstudanteBancas} {...base} durationInFrames={ESTUDANTE_BANCAS_FRAMES} defaultProps={{ guide: true, showInstagramUI: false }} />
    <Composition id="DS-STORY-bancas-estudante-mockup" component={EstudanteBancas} {...base} durationInFrames={ESTUDANTE_BANCAS_FRAMES} defaultProps={{ guide: false, showInstagramUI: true }} />
    <Composition id="DS-STORY-receita-2026" component={Receita2026} {...base} durationInFrames={RECEITA_2026_FRAMES} defaultProps={{ scene: 0 }} />
    <Composition id="DS-STORY-receita-2026-mockup" component={Receita2026} {...base} durationInFrames={RECEITA_2026_FRAMES} defaultProps={{ scene: 0, showInstagramUI: true }} />
    {Array.from({ length: RECEITA_TOTAL }, (_, i) => String(i + 1).padStart(2, '0')).map((n) => (
      <Composition key={n} id={`DS-STORY-receita-2026-${n}`} component={Receita2026} {...base} durationInFrames={RECEITA_SCENE} defaultProps={{ scene: Number(n) }} />
    ))}
    <Still id="DS-STORY-receita-2026-capa" component={Receita2026Capa} width={1080} height={1920} />
    <Composition id="DS-STORY-receita-2026-11-guia" component={Receita2026} {...base} durationInFrames={RECEITA_SCENE} defaultProps={{ scene: 11, guide: true }} />
    <Composition id="DS-REEL-bancas-tributario" component={BancasTributario} {...base} durationInFrames={BANCAS_TRIBUTARIO_FRAMES} defaultProps={{ showInstagramUI: false }} />
    <Composition id="DS-REEL-bancas-tributario-mockup" component={BancasTributario} {...base} durationInFrames={BANCAS_TRIBUTARIO_FRAMES} defaultProps={{ showInstagramUI: true }} />
    {STORY_LIST.map(({ id, component, frames }) => (
      <React.Fragment key={id}>
        <Composition id={id} component={component} {...base} durationInFrames={frames} defaultProps={{ guide: false }} />
        <Composition id={`${id}-guia`} component={component} {...base} durationInFrames={frames} defaultProps={{ guide: true }} />
      </React.Fragment>
    ))}
  </>
);
