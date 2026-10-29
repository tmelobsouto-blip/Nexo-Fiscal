import React from 'react';
import { RETA_FINAL_ISS as P } from '../copy';
import { Book } from '../illustrations';
import { C, FONT } from '../tokens';
import { Big, Block, Box, Frame, M, Mark2, Mono, W } from './kit';

// Post de divulgação do Reta Final ISS Curitiba: 2 slides na direção C, versão limpa.
const TOP = M + 16;

const S1: React.FC = () => {
  const x = P.cover;
  return (
    <Frame mode="dark" action="→">
      <Box x={M} y={TOP} w={W}>
        {x.lines.map((l) => (
          <Big key={l} size={112} color={C.white} style={{ marginBottom: 6 }}>
            {l}
          </Big>
        ))}
        <Big size={112} color={C.mint}>
          {x.hl}
        </Big>
        <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, letterSpacing: -1, color: C.mutedDark, marginTop: 28 }}>{x.sub}</div>
      </Box>
      <Block x={M} y={620} w={W} h={580} bg={C.mint} style={{ overflow: 'visible' }}>
        <Box x={36} y={70} w={380} h={420} style={{ background: C.green, borderRadius: 4 }} />
        <Box x={44} y={-64}>
          <Book width={380} {...x.book} />
        </Box>
        <Box x={452} y={44} w={W - 452 - 44}>
          {x.stats.map((s, i) => (
            <div key={s.n} style={{ borderTop: i ? `3px solid ${C.ink}` : undefined, padding: '18px 0' }}>
              <Big size={92} color={C.ink}>
                {s.n}
              </Big>
              <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, lineHeight: 1.1, letterSpacing: -0.8, color: C.ink, marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </Box>
      </Block>
    </Frame>
  );
};

const S2: React.FC = () => {
  const x = P.offer;
  return (
    <Frame mode="dark">
      <Box x={M} y={TOP} w={W}>
        <Big size={76} color={C.white}>
          {x.a}
        </Big>
        <Big size={76} color={C.mint} style={{ marginTop: 6 }}>
          {x.b}
        </Big>
      </Box>
      <Block x={M} y={370} w={W} h={372} bg={C.paper} style={{ padding: '34px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 32, color: C.ink }}>{x.q.id}</span>
          <Mono color={C.green}>{x.q.tag}</Mono>
        </div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 32, lineHeight: 1.3, letterSpacing: -0.3, color: C.ink, marginTop: 10 }}>{x.q.text}</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 24, color: C.muted, marginTop: 12 }}>{x.q.opts}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22, paddingTop: 20, borderTop: `2px solid ${C.line}` }}>
          <span style={{ flexShrink: 0, background: C.green, color: C.white, borderRadius: 4, padding: '8px 14px', fontFamily: FONT.sans, fontWeight: 900, fontSize: 28 }}>Gabarito: {x.q.key}</span>
          <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, lineHeight: 1.2, color: C.ink }}>{x.q.why}</span>
        </div>
      </Block>
      <Box x={M} y={786} w={W}>
        {x.items.map((t) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
            <div style={{ flexShrink: 0 }}>
              <Mark2 kind="yes" color={C.mint} size={48} />
            </div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 36, letterSpacing: -0.8, color: C.white }}>{t}</div>
          </div>
        ))}
      </Box>
      <Block x={M} y={1000} w={W} h={200} bg={C.mint} style={{ padding: '0 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Big size={96} color={C.ink}>
            {x.price}
          </Big>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: C.ink, marginTop: 8 }}>{x.pay}</div>
        </div>
        <div style={{ background: C.ink, color: C.mint, borderRadius: 4, padding: '22px 28px', fontFamily: FONT.sans, fontWeight: 900, fontSize: 40, letterSpacing: -1 }}>{x.cta} →</div>
      </Block>
    </Frame>
  );
};

export const RETA_FINAL_ISS_SLIDES = [
  { id: 'DS-RFISS-01-capa', component: S1 },
  { id: 'DS-RFISS-02-oferta', component: S2 },
];
