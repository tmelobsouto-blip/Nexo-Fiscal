import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ICMS_TRANSF as P } from '../copy';
import { CreditTag, Crate, Store, StoreTone, Toggle, Truck } from '../illustrations';
import { C, FONT } from '../tokens';
import { Label, Law, Mark } from '../ui';
import { Big, Block, Box, Frame, IG, IgIcon, M, Mark2, Mono, Scaled, W } from './kit';

// Carrossel “Matriz → filial paga ICMS?”: 7 slides na direção C, versão limpa (sem TopBar nem rótulos).
const N = P.total;
type LawPart = { t: string; mark?: boolean };
const LawParts: React.FC<{ parts: readonly LawPart[] }> = ({ parts }) => (
  <>{parts.map((x, i) => (x.mark ? <Mark key={i}>{x.t}</Mark> : <React.Fragment key={i}>{x.t}</React.Fragment>))}</>
);

const STORE_A: StoreTone = { body: C.paper, dark: C.ink, glass: C.lineDark, sign: C.ink, signText: C.mint, awning: [C.mint, C.white] };
const STORE_B: StoreTone = { body: C.paper, dark: C.ink, glass: C.lineDark, sign: C.alertSoft, signText: C.ink, awning: [C.alertSoft, C.white] };

const Arrow: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size * 0.9} height={size * 0.6} viewBox="0 0 30 20" style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: size * 0.12 }}>
    <path d="M1 10 H26 M17 2 L27 10 L17 18" fill="none" stroke={color} strokeWidth={4.2} strokeLinecap="square" />
  </svg>
);

const Ground: React.FC<{ x: number; y: number; w: number; color?: string }> = ({ x, y, w, color = C.ink }) => <Box x={x} y={y} w={w} h={5} style={{ background: color }} />;

/** Erro de prova riscado (✕) e a regra (✓), sem rótulos. */
const Trap: React.FC<{ wrong: string; right: string; size?: number }> = ({ wrong, right, size = 40 }) => (
  <div>
    <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, marginTop: -size * 0.12 }}>
        <Mark2 kind="no" color={C.alert} size={size * 1.4} />
      </div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: size, lineHeight: 1.16, letterSpacing: -1, color: C.alert, textDecoration: `line-through ${C.alert} 4px` }}>{wrong}</div>
    </div>
    <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginTop: 30 }}>
      <div style={{ flexShrink: 0, marginTop: -size * 0.12 }}>
        <Mark2 kind="yes" color={C.ink} size={size * 1.4} />
      </div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: size, lineHeight: 1.16, letterSpacing: -1.2, color: C.ink }}>{right}</div>
    </div>
  </div>
);

const TOP = M + 16;

const S1: React.FC = () => {
  const x = P.cover;
  return (
    <Frame mode="dark" action={P.next}>
      <Block x={M} y={M} w={W} h={1112} bg={C.mint} style={{ overflow: 'visible' }}>
        <Box x={56} y={70} w={W - 112}>
          {x.lines.map((l) => (
            <Big key={l} size={120} color={C.ink} style={{ marginBottom: 6 }}>
              {l.endsWith('→') ? (
                <>
                  {l.slice(0, -1)}
                  <Arrow size={120} color={C.ink} />
                </>
              ) : (
                l
              )}
            </Big>
          ))}
          <Big size={120} color={C.alert}>
            {x.q}
          </Big>
          <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 44, letterSpacing: -1.2, color: C.ink, marginTop: 30 }}>{x.promise}</div>
        </Box>
        <Box x={56} y={650} w={W - 112} h={380} style={{ background: C.green, borderRadius: 4 }} />
        <Box x={76} y={770}>
          <Store width={220} label="Matriz" t={STORE_A} />
        </Box>
        <Box x={W - 76 - 220} y={770}>
          <Store width={220} label="Filial" t={STORE_A} />
        </Box>
        <Box x={310} y={846}>
          <Truck width={290} moving />
        </Box>
        <Ground x={56} y={1000} w={W - 112} />
      </Block>
    </Frame>
  );
};

const S2: React.FC = () => {
  const x = P.answer;
  return (
    <Frame mode="dark" action={P.next}>
      <Box x={M} y={TOP} w={W}>
        <Big size={156} color={C.white}>
          {x.a}
        </Big>
        <Big size={156} color={C.mint} style={{ marginTop: 6 }}>
          {x.hl}
        </Big>
      </Box>
      <Box x={290} y={500} w={500} h={6} style={{ background: C.mint }} />
      <Box x={290} y={500} w={6} h={46} style={{ background: C.mint }} />
      <Box x={784} y={500} w={6} h={46} style={{ background: C.mint }} />
      <Box x={540 - 130} y={480} w={260} style={{ background: C.mint, borderRadius: 4, padding: '8px 0', textAlign: 'center' }}>
        <Mono color={C.ink}>{x.badge}</Mono>
      </Box>
      <Box x={190} y={566}>
        <Store width={200} label={x.stores[0]} t={STORE_A} />
      </Box>
      <Box x={690} y={566}>
        <Store width={200} label={x.stores[1]} t={STORE_A} />
      </Box>
      <Box x={490} y={674}>
        <Crate width={100} tape={C.mint} dark={C.ink} />
      </Box>
      <Ground x={M} y={758} w={W} color={C.lineDark} />
      <Block x={M} y={810} w={W} h={390} bg={C.mint} style={{ padding: '48px 52px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 56, lineHeight: 1.12, letterSpacing: -2, color: C.ink }}>{x.body}</div>
      </Block>
    </Frame>
  );
};

const S3: React.FC = () => {
  const x = P.why;
  const tile = (side: 'left' | 'right') => {
    const s = x[side];
    const yes = side === 'left';
    return (
      <Block x={yes ? M : 560} y={430} w={432} h={300} bg={C.inkSoft} style={{ border: `2px solid ${C.lineDark}`, padding: yes ? '30px 60px 30px 30px' : '30px 30px 30px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
          {yes ? (
            <Truck width={220} />
          ) : (
            <>
              <Store width={112} label="A" t={STORE_A} />
              <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 44, color: C.white, paddingBottom: 30 }}>→</div>
              <Store width={112} label="B" t={STORE_B} />
            </>
          )}
        </div>
        <div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 38, lineHeight: 1.04, letterSpacing: -1.2, color: C.white }}>{s.k}</div>
          <div style={{ display: 'inline-block', marginTop: 14, background: yes ? C.mint : C.alertSoft, borderRadius: 4, padding: '6px 12px' }}>
            <Mono color={C.ink}>{s.verdict}</Mono>
          </div>
        </div>
      </Block>
    );
  };
  return (
    <Frame mode="dark" action={P.next}>
      <Box x={M} y={TOP} w={W}>
        <Law source={x.source} size={44}>
          <LawParts parts={x.law} />
        </Law>
      </Box>
      {tile('left')}
      {tile('right')}
      <Box x={496} y={536} w={88} h={88} style={{ background: C.white, borderRadius: 4, border: `4px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 900, fontSize: 60, color: C.ink }}>
        ≠
      </Box>
      <Block x={M} y={770} w={W} h={430} bg={C.mint} style={{ padding: '48px 52px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 62, lineHeight: 1.1, letterSpacing: -2.2, color: C.ink }}>{x.plain}</div>
      </Block>
    </Frame>
  );
};

const S4: React.FC = () => {
  const x = P.trap1;
  return (
    <Frame mode="dark" action={P.next}>
      <Box x={M} y={TOP} w={W}>
        <Big size={100} color={C.white}>
          {x.title}
        </Big>
      </Box>
      <Box x={M} y={336} w={W}>
        <Law source={x.source} size={36}>
          <LawParts parts={x.law} />
        </Law>
      </Box>
      <Block x={M} y={690} w={W} h={510} bg={C.mint} style={{ padding: '48px 44px' }}>
        <Box x={W - 44 - 220} y={48}>
          <CreditTag width={220} label={x.tag} bg={C.mint} />
        </Box>
        <div style={{ width: 560 }}>
          <Trap wrong={x.wrong} right={x.right} size={44} />
        </div>
      </Block>
    </Frame>
  );
};

const S5: React.FC = () => {
  const x = P.trap2;
  return (
    <Frame mode="dark" action={P.next}>
      <Box x={M} y={TOP} w={W}>
        <Big size={80} color={C.white}>
          {x.title[0]}
        </Big>
        <Big size={80} color={C.mint} style={{ marginTop: 6 }}>
          {x.title[1]}
        </Big>
      </Box>
      <Box x={M} y={300} w={W}>
        <Law source={x.source} size={34}>
          <LawParts parts={x.law} />
        </Law>
      </Box>
      <Block x={M} y={660} w={W} h={540} bg={C.mint} style={{ padding: '52px 44px', display: 'flex', alignItems: 'center' }}>
        <Box x={W - 52 - 250} y={60} w={250} style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 30, lineHeight: 1.1, letterSpacing: -0.6, color: C.ink, marginBottom: 16 }}>{x.toggle}</div>
          <div style={{ display: 'inline-block' }}>
            <Toggle width={230} on />
          </div>
        </Box>
        <div style={{ width: 540 }}>
          <Trap wrong={x.wrong} right={x.right} size={42} />
        </div>
      </Block>
    </Frame>
  );
};

const S6: React.FC = () => {
  const x = P.recap;
  return (
    <Frame mode="dark" action={P.next}>
      <Block x={M} y={M} w={W} h={1112} bg={C.mint} style={{ padding: '56px 52px' }}>
        <Big size={108} color={C.ink}>
          {x.title}
        </Big>
        <div style={{ marginTop: 44 }}>
          {x.rows.map((r) => (
            <div key={r.k} style={{ display: 'flex', alignItems: 'center', gap: 26, borderTop: `3px solid ${C.ink}`, padding: '26px 0' }}>
              <div style={{ width: 290, flexShrink: 0 }}>
                <span style={{ display: 'inline-block', background: C.ink, borderRadius: 4, padding: '8px 12px' }}>
                  <Mono color={C.mint}>{r.k}</Mono>
                </span>
              </div>
              <div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 40, lineHeight: 1.08, letterSpacing: -1.2, color: C.ink }}>{r.v}</div>
                <Mono color={C.green} style={{ marginTop: 6 }}>
                  {r.s}
                </Mono>
              </div>
            </div>
          ))}
        </div>
      </Block>
    </Frame>
  );
};

const S7: React.FC = () => {
  const x = P.cta;
  return (
    <Frame mode="dark">
      <Box x={M} y={TOP} w={W}>
        <Big size={104} color={C.white}>
          {x.a}
        </Big>
        <Big size={104} color={C.mint} style={{ marginTop: 6 }}>
          {x.hl}
        </Big>
      </Box>
      <Block x={M} y={480} w={W} h={430} bg={C.mint} style={{ overflow: 'visible' }}>
        <Box x={60} y={64} w={W - 120} h={310} style={{ background: C.green, borderRadius: 4 }} />
        <Box x={220} y={126}>
          <Truck width={560} label={x.cargo} cab={C.white} moving />
        </Box>
        <Ground x={60} y={430 - 56} w={W - 120} />
      </Block>
      <Box x={M} y={962} w={W}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 50, lineHeight: 1.14, letterSpacing: -1.4, color: C.white }}>{x.sub}</div>
      </Box>
    </Frame>
  );
};

const SLIDES: React.FC[] = [S1, S2, S3, S4, S5, S6, S7];
const ROLES = ['capa', 'resposta', 'sumula', 'pegadinha-credito', 'pegadinha-opcao', 'cola', 'cta'];

export const ICMS_TRANSF_SLIDES = SLIDES.map((component, i) => ({ id: `DS-ICMS166-0${i + 1}-${ROLES[i]}`, component }));

/** Prancha: o post no feed + os 8 slides. */
export const IcmsBoard: React.FC = () => (
  <AbsoluteFill style={{ background: C.inkSoft, padding: 80, fontFamily: FONT.sans, color: C.white }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 900, fontSize: 56, letterSpacing: -2 }}>Matriz → filial paga ICMS?</div>
      <Label color={C.mutedDark}>Carrossel · 7 slides 1080 × 1350</Label>
    </div>
    <div style={{ display: 'flex', gap: 60, marginTop: 50, alignItems: 'flex-start' }}>
      <div style={{ width: 720, background: C.ink, border: `2px solid ${C.lineDark}`, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 22px' }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: C.ink, border: `2px solid ${C.lineDark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 24 }}>
            N<span style={{ color: C.mint }}>.</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 26 }}>nexofiscalbr</div>
        </div>
        <Scaled S={S1} w={720} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px 22px 6px' }}>
          <IgIcon d={IG.heart} color={C.white} />
          <IgIcon d={IG.comment} color={C.white} />
          <IgIcon d={IG.send} color={C.white} />
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 8, marginRight: 62 }}>
            {SLIDES.map((_, i) => (
              <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: i === 0 ? '#3897F0' : C.mutedDark, opacity: i === 0 ? 1 : 0.5 }} />
            ))}
          </div>
          <IgIcon d={IG.save} color={C.white} />
        </div>
        <div style={{ padding: '10px 22px 26px', fontSize: 24, lineHeight: 1.35 }}>
          <b>nexofiscalbr</b> {P.caption}
          <span style={{ color: C.mutedDark }}> … mais</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 300px)', gap: 20 }}>
        {SLIDES.map((S, i) => (
          <Scaled key={i} S={S} w={300} />
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

export const ICMS_BOARD = { width: 2200, height: 1440 };
