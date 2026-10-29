import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ICMS_TRANSF as P } from '../copy';
import { CreditTag, Crate, Store, StoreTone, Toggle, Truck } from '../illustrations';
import { C, FONT } from '../tokens';
import { Label, Law, Mark } from '../ui';
import { Big, Block, Box, Chip, Frame, IG, IgIcon, M, Mono, Scaled, W } from './kit';

// Carrossel “Matriz → filial paga ICMS?”: 8 slides na direção C (verde-destaque × preto, ilustrado).
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

/** “A banca diz” × “na lei”: o erro em terracota riscado, a regra em seguida. */
const Trap: React.FC<{ wrong: string; right: string; size?: number }> = ({ wrong, right, size = 38 }) => (
  <div>
    <Mono color={C.ink}>A banca diz</Mono>
    <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: size, lineHeight: 1.16, letterSpacing: -1, color: C.alert, textDecoration: `line-through ${C.alert} 4px`, marginTop: 10 }}>{wrong}</div>
    <Mono color={C.ink} style={{ marginTop: 28 }}>
      Na lei
    </Mono>
    <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: size, lineHeight: 1.16, letterSpacing: -1.2, color: C.ink, marginTop: 10 }}>{right}</div>
  </div>
);

const S1: React.FC = () => {
  const x = P.cover;
  return (
    <Frame mode="dark" label={P.label} n={1} total={N} action={x.action}>
      <Block x={M} y={190} w={W} h={996} bg={C.mint} style={{ overflow: 'visible' }}>
        <Box x={56} y={56}>
          <span style={{ display: 'inline-block', background: C.ink, borderRadius: 4, padding: '10px 16px' }}>
            <Mono color={C.mint}>{x.tag}</Mono>
          </span>
        </Box>
        <Box x={56} y={146} w={W - 112}>
          {x.lines.map((l) => (
            <Big key={l} size={112} color={C.ink} style={{ marginBottom: 6 }}>
              {l.endsWith('→') ? (
                <>
                  {l.slice(0, -1)}
                  <Arrow size={112} color={C.ink} />
                </>
              ) : (
                l
              )}
            </Big>
          ))}
          <Big size={112} color={C.alert}>
            {x.q}
          </Big>
          <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, letterSpacing: -1, color: C.ink, marginTop: 26 }}>{x.promise}</div>
        </Box>
        <Box x={56} y={640} w={W - 112} h={300} style={{ background: C.green, borderRadius: 4 }} />
        <Box x={84} y={725}>
          <Store width={210} label="Matriz" t={STORE_A} />
        </Box>
        <Box x={W - 84 - 210} y={725}>
          <Store width={210} label="Filial" t={STORE_A} />
        </Box>
        <Box x={318} y={786}>
          <Truck width={270} moving />
        </Box>
        <Ground x={56} y={925} w={W - 112} />
      </Block>
    </Frame>
  );
};

const S2: React.FC = () => {
  const x = P.answer;
  return (
    <Frame mode="dark" label={P.label} n={2} total={N} action={x.action}>
      <Box x={M} y={196}>
        <Mono color={C.mint}>{x.kicker}</Mono>
      </Box>
      <Box x={M} y={240} w={W}>
        <Big size={150} color={C.white}>
          {x.a}
        </Big>
        <Big size={150} color={C.mint} style={{ marginTop: 6 }}>
          {x.hl}
        </Big>
      </Box>
      <Box x={290} y={586} w={500} h={6} style={{ background: C.mint }} />
      <Box x={290} y={586} w={6} h={46} style={{ background: C.mint }} />
      <Box x={784} y={586} w={6} h={46} style={{ background: C.mint }} />
      <Box x={540 - 130} y={566} w={260} style={{ background: C.mint, borderRadius: 4, padding: '8px 0', textAlign: 'center' }}>
        <Mono color={C.ink}>{x.badge}</Mono>
      </Box>
      <Box x={190} y={652}>
        <Store width={200} label={x.stores[0]} t={STORE_A} />
      </Box>
      <Box x={690} y={652}>
        <Store width={200} label={x.stores[1]} t={STORE_A} />
      </Box>
      <Box x={490} y={760}>
        <Crate width={100} tape={C.mint} dark={C.ink} />
      </Box>
      <Ground x={M} y={844} w={W} color={C.lineDark} />
      <Block x={M} y={890} w={W} h={296} bg={C.mint} style={{ padding: '44px 48px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 50, lineHeight: 1.14, letterSpacing: -1.8, color: C.ink }}>{x.body}</div>
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
      <Block x={yes ? M : 560} y={500} w={432} h={290} bg={C.inkSoft} style={{ border: `2px solid ${C.lineDark}`, padding: yes ? '28px 60px 28px 28px' : '28px 28px 28px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
          <Mono color={yes ? C.mint : C.alertSoft}>{s.k}</Mono>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, gap: 12 }}>
            <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 38, letterSpacing: -1.2, color: C.white, whiteSpace: 'nowrap' }}>{s.v}</div>
          </div>
          <div style={{ display: 'inline-block', marginTop: 12, background: yes ? C.mint : C.alertSoft, borderRadius: 4, padding: '6px 12px' }}>
            <Mono color={C.ink}>{s.verdict}</Mono>
          </div>
        </div>
      </Block>
    );
  };
  return (
    <Frame mode="dark" label={x.label} n={3} total={N} action={x.action}>
      <Box x={M} y={210} w={W}>
        <Law source={x.source} size={42}>
          <LawParts parts={x.law} />
        </Law>
      </Box>
      {tile('left')}
      {tile('right')}
      <Box x={496} y={601} w={88} h={88} style={{ background: C.white, borderRadius: 4, border: `4px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 900, fontSize: 60, color: C.ink }}>
        ≠
      </Box>
      <Block x={M} y={820} w={W} h={366} bg={C.mint} style={{ padding: '42px 48px' }}>
        <Mono color={C.ink}>{x.plainLabel}</Mono>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 56, lineHeight: 1.12, letterSpacing: -2, color: C.ink, marginTop: 22 }}>{x.plain}</div>
      </Block>
    </Frame>
  );
};

const S4: React.FC = () => {
  const x = P.timeline;
  const top = 384;
  const step = 164;
  return (
    <Frame mode="dark" label={x.label} n={4} total={N} action={x.action}>
      <Box x={M} y={200} w={W}>
        <Big size={104} color={C.white}>
          {x.title}
        </Big>
      </Box>
      <Box x={M + 218} y={top + 20} w={4} h={step * 4} style={{ background: C.lineDark }} />
      {x.steps.map((s, i) => {
        const y = top + i * step;
        const hot = 'hot' in s && s.hot;
        return (
          <React.Fragment key={s.l}>
            {hot ? <Block x={M + 180} y={y - 18} w={W - 180} h={step - 16} bg={C.mint} /> : null}
            <Box x={M} y={y}>
              <Big size={64} color={hot ? C.mint : C.white} style={{ fontVariantNumeric: 'tabular-nums' }}>
                {s.y}
              </Big>
            </Box>
            <Box x={M + 206} y={y + 12} w={28} h={28} style={{ background: hot ? C.ink : C.mint, border: hot ? `4px solid ${C.ink}` : undefined }} />
            <Box x={M + 268} y={y - 4} w={W - 290}>
              <Mono color={hot ? C.ink : C.mutedDark}>{s.who}</Mono>
              <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 40, letterSpacing: -1.2, lineHeight: 1.05, color: hot ? C.ink : C.white, marginTop: 4 }}>{s.l}</div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 28, lineHeight: 1.2, color: hot ? C.ink : C.mutedDark, marginTop: 6 }}>{s.s}</div>
            </Box>
          </React.Fragment>
        );
      })}
    </Frame>
  );
};

const S5: React.FC = () => {
  const x = P.trap1;
  return (
    <Frame mode="dark" label={P.label} n={5} total={N} action={x.action}>
      <Box x={M} y={196}>
        <Mono color={C.alertSoft}>{x.kicker}</Mono>
      </Box>
      <Box x={M} y={236} w={W}>
        <Big size={92} color={C.white}>
          {x.title}
        </Big>
      </Box>
      <Box x={M} y={466} w={W}>
        <Law source={x.source} size={34}>
          <LawParts parts={x.law} />
        </Law>
      </Box>
      <Block x={M} y={800} w={W} h={386} bg={C.mint} style={{ padding: '40px 48px' }}>
        <Box x={W - 48 - 230} y={44}>
          <CreditTag width={230} label={x.tag} bg={C.mint} />
        </Box>
        <div style={{ width: 520 }}>
          <Trap wrong={x.wrong} right={x.right} size={36} />
        </div>
      </Block>
    </Frame>
  );
};

const S6: React.FC = () => {
  const x = P.trap2;
  return (
    <Frame mode="dark" label={P.label} n={6} total={N} action={x.action}>
      <Box x={M} y={196}>
        <Mono color={C.alertSoft}>{x.kicker}</Mono>
      </Box>
      <Box x={M} y={236} w={W}>
        <Big size={76} color={C.white}>
          {x.title[0]}
        </Big>
        <Big size={76} color={C.mint} style={{ marginTop: 6 }}>
          {x.title[1]}
        </Big>
      </Box>
      <Box x={M} y={430} w={W}>
        <Law source={x.source} size={33}>
          <LawParts parts={x.law} />
        </Law>
      </Box>
      <Block x={M} y={786} w={W} h={400} bg={C.mint} style={{ padding: '40px 48px' }}>
        <Box x={W - 48 - 250} y={56} w={250} style={{ textAlign: 'center' }}>
          <Mono color={C.ink} style={{ marginBottom: 14 }}>
            {x.toggle}
          </Mono>
          <div style={{ display: 'inline-block' }}>
            <Toggle width={220} on />
          </div>
          <Mono color={C.green} style={{ marginTop: 14 }}>
            {x.toggleOn}
          </Mono>
        </Box>
        <div style={{ width: 520 }}>
          <Trap wrong={x.wrong} right={x.right} size={34} />
        </div>
      </Block>
    </Frame>
  );
};

const S7: React.FC = () => {
  const x = P.recap;
  return (
    <Frame mode="dark" label={P.label} n={7} total={N} action={x.action}>
      <Block x={M} y={190} w={W} h={996} bg={C.mint} style={{ padding: '48px 52px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <Mono color={C.ink}>{x.sub}</Mono>
            <Big size={96} color={C.ink} style={{ marginTop: 10 }}>
              {x.title}
            </Big>
          </div>
        </div>
        <div style={{ marginTop: 34 }}>
          {x.rows.map((r) => (
            <div key={r.k} style={{ display: 'flex', alignItems: 'center', gap: 26, borderTop: `3px solid ${C.ink}`, padding: '22px 0' }}>
              <div style={{ width: 290, flexShrink: 0 }}>
                <span style={{ display: 'inline-block', background: C.ink, borderRadius: 4, padding: '8px 12px' }}>
                  <Mono color={C.mint}>{r.k}</Mono>
                </span>
              </div>
              <div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 38, lineHeight: 1.08, letterSpacing: -1.2, color: C.ink }}>{r.v}</div>
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

const S8: React.FC = () => {
  const x = P.cta;
  return (
    <Frame mode="dark" label={P.label} n={8} total={N} action={x.action}>
      <Box x={M} y={200} w={W}>
        <Big size={96} color={C.white}>
          {x.a}
        </Big>
        <Big size={96} color={C.mint} style={{ marginTop: 6 }}>
          {x.hl}
        </Big>
      </Box>
      <Block x={M} y={560} w={W} h={420} bg={C.mint} style={{ overflow: 'visible' }}>
        <Box x={60} y={70} w={W - 120} h={300} style={{ background: C.green, borderRadius: 4 }} />
        <Box x={220} y={128}>
          <Truck width={560} label={x.cargo} cab={C.white} moving />
        </Box>
        <Ground x={60} y={420 - 50} w={W - 120} />
      </Block>
      <Box x={M} y={1024} w={W}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 44, lineHeight: 1.16, letterSpacing: -1.2, color: C.white }}>{x.sub}</div>
      </Box>
    </Frame>
  );
};

const SLIDES: React.FC[] = [S1, S2, S3, S4, S5, S6, S7, S8];
const ROLES = ['capa', 'resposta', 'sumula', 'linha-do-tempo', 'pegadinha-credito', 'pegadinha-opcao', 'cola', 'cta'];

export const ICMS_TRANSF_SLIDES = SLIDES.map((component, i) => ({ id: `DS-ICMS166-0${i + 1}-${ROLES[i]}`, component }));

/** Prancha: o post no feed + os 8 slides. */
export const IcmsBoard: React.FC = () => (
  <AbsoluteFill style={{ background: C.inkSoft, padding: 80, fontFamily: FONT.sans, color: C.white }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 900, fontSize: 56, letterSpacing: -2 }}>Matriz → filial paga ICMS?</div>
      <Label color={C.mutedDark}>Carrossel · 8 slides 1080 × 1350</Label>
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
