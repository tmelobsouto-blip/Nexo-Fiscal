import React, { createContext, useContext } from 'react';
import { AbsoluteFill, Audio, Img, interpolate, random, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { InstagramChrome } from '../../components/InstagramChrome';
import { RECEITA_2026 as T } from '../copy';
import { Guide, Sticker } from '../stories';
import { C, FONT, GRID } from '../tokens';
import { Canvas, Footer, Label, MotionOn, TopBar } from '../ui';

// 12 cenas de 7 s a 30 fps. Cada cena é um card de story; o vídeo completo é só a pré-visualização.
export const RECEITA_SCENE = 210;
export const RECEITA_TOTAL = 12;
export const RECEITA_2026_FRAMES = RECEITA_SCENE * RECEITA_TOTAL;

const M = GRID.margin;
const W = 1080 - M * 2;
const SRC_Y = 1272;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const prog = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], clamp);
const out = (f: number, a: number, b: number) => 1 - Math.pow(1 - prog(f, a, b), 3);
const inOut = (f: number, a: number, b: number) => {
  const t = prog(f, a, b);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const count = (f: number, a: number, b: number, to: number) => Math.round(out(f, a, b) * to);
const pulse = (f: number, period = 30) => 0.5 + 0.5 * Math.sin((f / period) * Math.PI * 2);

// Global frame of the full sequence, so the ticker keeps scrolling across split clips.
const Offset = createContext(0);

const Big: React.FC<{ size: number; color?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ size, color = C.white, style, children }) => (
  <div
    style={{
      fontFamily: FONT.sans,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 0.88,
      letterSpacing: -size * 0.045,
      textTransform: 'uppercase',
      color,
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

const At: React.FC<{ top: number; left?: number; width?: number; center?: boolean; style?: React.CSSProperties; children: React.ReactNode }> = ({
  top,
  left = M,
  width = W,
  center,
  style,
  children,
}) => <div style={{ position: 'absolute', top, left, width, textAlign: center ? 'center' : undefined, ...style }}>{children}</div>;

const rise = (p: number, y = 40): React.CSSProperties => ({ opacity: p, transform: `translateY(${(1 - p) * y}px)` });

// ---------------------------------------------------------------- chrome

const Caption: React.FC<{ text: string; start: number }> = ({ text, start }) => {
  const f = useCurrentFrame();
  const words = text.split(' ');
  const total = words.reduce((n, w) => n + w.length + 1, 0);
  const dur = Math.min(total * 1.8, RECEITA_SCENE - 12 - start);
  const spoken = prog(f, start, start + dur) * total;
  let acc = 0;
  return (
    <At top={1322} style={{ opacity: prog(f, start - 6, start), fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, lineHeight: 1.26, letterSpacing: -0.4 }}>
      {words.map((w, i) => {
        const s = acc;
        acc += w.length + 1;
        return (
          <React.Fragment key={i}>
            <span style={{ color: C.white, opacity: spoken > s ? 1 : 0.32, whiteSpace: 'nowrap' }}>{w}</span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </At>
  );
};

const TICK_CHAR = 21 * 0.6 + 2;
const Ticker: React.FC = () => {
  const offset = useContext(Offset);
  const f = useCurrentFrame() + offset;
  const seg = T.ticker.map((x) => x.toUpperCase()).join('   ·   ') + '   ·   ';
  const x = -((f * 3) % (seg.length * TICK_CHAR));
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 1496, height: 60, background: C.inkSoft, borderTop: `2px solid ${C.lineDark}`, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: x, whiteSpace: 'pre', fontFamily: FONT.mono, fontSize: 21, fontWeight: 500, letterSpacing: 2, color: C.white }}>
        {seg.repeat(4)}
      </div>
      <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: `0 22px 0 ${M}px`, background: C.mint, color: C.ink, fontFamily: FONT.mono, fontSize: 21, fontWeight: 500, letterSpacing: 2.4, textTransform: 'uppercase' }}>
        <span style={{ width: 12, height: 12, background: C.ink, opacity: 0.35 + 0.65 * pulse(f, 24) }} />
        {T.kicker}
      </div>
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', padding: `0 ${M}px 0 22px`, background: C.inkSoft, borderLeft: `2px solid ${C.lineDark}` }}>
        <Footer />
      </div>
    </div>
  );
};

const Source: React.FC<{ text: string; at?: number }> = ({ text, at = 40 }) => {
  const f = useCurrentFrame();
  return (
    <At top={SRC_Y} style={{ opacity: prog(f, at, at + 12) }}>
      <Label color={C.mutedDark}>Fonte · {text}</Label>
    </At>
  );
};

const Shot: React.FC<{ n: number; children: React.ReactNode; chrome?: number; ticker?: boolean; src?: string; srcAt?: number; captions: boolean; captionAt?: number; fadeOut?: number }> = ({
  n,
  children,
  chrome = 1,
  ticker = true,
  src,
  srcAt,
  captions,
  captionAt = 6,
  fadeOut = 0,
}) => (
  <Canvas mode="dark" padTop={GRID.storySafeTop} padBottom={1920 - GRID.storySafeBottom}>
    {children}
    <div style={{ opacity: chrome }}>
      <TopBar label={`${T.label} · ${T.kicker}`} index={n} total={RECEITA_TOTAL} />
    </div>
    {src ? <Source text={src} at={srcAt} /> : null}
    {captions ? <Caption text={T.narration[n - 1]} start={captionAt} /> : null}
    {ticker ? (
      <Ticker />
    ) : (
      <At top={1512}>
        <Footer />
      </At>
    )}
    {fadeOut > 0 ? <AbsoluteFill style={{ background: C.ink, opacity: fadeOut }} /> : null}
  </Canvas>
);

type SceneProps = { captions: boolean; buildingSrc?: string };

// ---------------------------------------------------------------- illustrations

const Building: React.FC<{ width: number }> = ({ width }) => {
  const floors = 11;
  const cols = 16;
  const lit = [3, 17, 29, 40, 52, 66, 81, 95, 108, 121, 137, 150, 166];
  return (
    <svg width={width} height={(width * 640) / 900} viewBox="0 0 900 640" style={{ display: 'block' }}>
      <rect x={0} y={612} width={900} height={4} fill={C.lineDark} />
      <polygon points="640,40 760,92 760,612 640,560" fill={C.lineDark} />
      {Array.from({ length: floors }).map((_, i) => (
        <path key={`s${i}`} d={`M640 ${84 + i * 44} L760 ${136 + i * 44}`} stroke={C.inkSoft} strokeWidth={6} />
      ))}
      <rect x={140} y={40} width={500} height={520} fill={C.inkSoft} stroke={C.lineDark} strokeWidth={3} />
      {Array.from({ length: floors * cols }).map((_, k) => {
        const r = Math.floor(k / cols);
        const c = k % cols;
        return (
          <rect
            key={k}
            x={152 + c * 30.4}
            y={56 + r * 44}
            width={24}
            height={26}
            fill={lit.includes(k) ? C.mint : C.lineDark}
            opacity={lit.includes(k) ? 0.75 : 1}
          />
        );
      })}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={`p${i}`} x={160 + i * 58} y={560} width={14} height={52} fill={C.lineDark} />
      ))}
      <rect x={120} y={36} width={540} height={8} fill={C.lineDark} />
    </svg>
  );
};

const Paper: React.FC<{ title: string; width: number; lines?: number; children?: React.ReactNode }> = ({ title, width, lines = 11, children }) => (
  <div style={{ position: 'relative', width, background: C.paper, borderRadius: 2, padding: 40, boxSizing: 'border-box' }}>
    <div style={{ fontFamily: FONT.mono, fontSize: 21, fontWeight: 500, letterSpacing: 1.6, textTransform: 'uppercase', color: C.ink, lineHeight: 1.4 }}>{title}</div>
    <div style={{ height: 3, background: C.ink, margin: '22px 0 28px' }} />
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} style={{ height: 14, marginBottom: 20, background: C.line, width: `${[100, 94, 98, 72, 100, 88, 96, 64, 100, 90, 58][i % 11]}%` }} />
    ))}
    {children}
  </div>
);

const Check: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = C.ink }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="square">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const STROKE = { fill: 'none', stroke: C.mint, strokeWidth: 3.2, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const };
const ICONS: Record<string, React.ReactNode> = {
  objetiva: (
    <g {...STROKE}>
      <rect x={6} y={8} width={10} height={10} />
      <path d="M8.5 13l2 2 3.5-4.5" />
      <rect x={6} y={26} width={10} height={10} />
      <path d="M22 13h20M22 31h20" />
    </g>
  ),
  discursiva: (
    <g {...STROKE}>
      <path d="M8 4h22l8 8v32H8z" />
      <path d="M14 18h18M14 25h18M14 32h11" />
    </g>
  ),
  pregressa: (
    <g {...STROKE}>
      <circle cx={20} cy={20} r={12} />
      <path d="M29 29l12 12" />
      <path d="M14 20l4 4 7-8" />
    </g>
  ),
  formacao: (
    <g {...STROKE}>
      <rect x={4} y={6} width={40} height={26} />
      <path d="M11 14h18M11 21h12" />
      <circle cx={34} cy={30} r={6} />
      <path d="M30 35l-2 9 6-3 6 3-2-9" />
    </g>
  ),
};

const Diploma: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 100 62" style={{ display: 'block' }}>
    <g {...STROKE} strokeWidth={3}>
      <rect x={10} y={6} width={74} height={40} />
      <path d="M10 6c-6 0-8 4-8 7s2 7 8 7M84 6c6 0 8 4 8 7s-2 7-8 7" />
      <path d="M22 18h50M22 26h34" />
      <circle cx={66} cy={40} r={8} />
      <path d="M61 46l-3 12 8-4 8 4-3-12" />
    </g>
  </svg>
);

const Desk: React.FC<{ f: number }> = ({ f }) => {
  const minutes = 6 * 60 + 12 + Math.floor(f / 3);
  const hh = String(Math.floor(minutes / 60) % 24).padStart(2, '0');
  const mm = String(minutes % 60).padStart(2, '0');
  const colon = Math.floor(f / 15) % 2 === 0 ? 1 : 0.25;
  return (
    <div style={{ position: 'absolute', left: M, top: 1050, width: W, height: 250 }}>
      <svg width={W} height={250} viewBox={`0 0 ${W} 250`} style={{ position: 'absolute', inset: 0 }}>
        <rect x={0} y={214} width={W} height={10} fill={C.lineDark} />
        <rect x={40} y={224} width={12} height={26} fill={C.lineDark} />
        <rect x={W - 52} y={224} width={12} height={26} fill={C.lineDark} />
        <rect x={30} y={168} width={250} height={46} fill={C.green} />
        <rect x={50} y={124} width={220} height={44} fill={C.mutedDark} />
        <rect x={20} y={84} width={240} height={40} fill={C.lineDark} />
        <path d="M60 191h170M78 146h150M44 104h170" stroke={C.ink} strokeOpacity={0.35} strokeWidth={4} />
        <polygon points="330,214 560,214 540,120 350,120" fill={C.inkSoft} stroke={C.lineDark} strokeWidth={3} />
        <rect x={372} y={138} width={146} height={60} fill={C.ink} />
        <path d="M388 156h80M388 172h110M388 188h60" stroke={C.mint} strokeOpacity={0.7} strokeWidth={5} />
      </svg>
      <div
        style={{
          position: 'absolute',
          right: 30,
          top: 110,
          width: 260,
          height: 104,
          background: C.inkSoft,
          border: `3px solid ${C.lineDark}`,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT.mono,
          fontWeight: 500,
          fontSize: 64,
          color: C.mint,
          letterSpacing: 2,
        }}
      >
        {hh}
        <span style={{ opacity: colon }}>:</span>
        {mm}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- scenes

const S01: React.FC<SceneProps> = ({ captions, buildingSrc }) => {
  const f = useCurrentFrame();
  const slam = out(f, 30, 38);
  const zoom = interpolate(f, [60, 210], [1, 1.1], clamp);
  const head = out(f, 60, 72);
  const dim = interpolate(f, [116, 128], [1, 0.24], clamp);
  const l1 = out(f, 120, 132);
  const l2 = out(f, 126, 140);
  const sweep = inOut(f, 136, 178);
  return (
    <Shot n={1} chrome={prog(f, 60, 70)} ticker={false} captions={captions} captionAt={32}>
      {f >= 30 && f < 60 ? (
        <At top={760} center>
          <Big size={214} style={{ transform: `scale(${1.25 - 0.25 * slam})` }}>
            {T.s01.a}
          </Big>
        </At>
      ) : null}
      {f >= 60 ? (
        <>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 690, height: 590, overflow: 'hidden', opacity: dim }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', transform: `scale(${zoom})`, transformOrigin: '50% 70%' }}>
              {buildingSrc ? (
                <Img src={staticFile(buildingSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Building width={980} />
              )}
            </div>
            {buildingSrc ? <AbsoluteFill style={{ background: C.ink, opacity: 0.35 }} /> : null}
          </div>
          <At top={372} style={rise(head, 30)}>
            <Big size={186}>{T.s01.a}</Big>
            <Big size={186} style={{ marginTop: 6 }}>
              {T.s01.b}
            </Big>
          </At>
          <At top={840}>
            <div style={rise(l1)}>
              <Big size={92}>{T.s01.c}</Big>
            </div>
            <div style={{ ...rise(l2), marginTop: 14 }}>
              <Big size={150} color={C.mint}>
                {T.s01.hl}
              </Big>
            </div>
            <div style={{ position: 'relative', height: 8, marginTop: 34, opacity: l2 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${sweep * 100}%`, background: C.mint }} />
              <div style={{ position: 'absolute', top: -4, height: 16, width: 90, left: `calc(${sweep * 100}% - 90px)`, background: C.white, opacity: sweep > 0 && sweep < 1 ? 1 : 0 }} />
            </div>
          </At>
        </>
      ) : null}
    </Shot>
  );
};

const DocLines: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: 'absolute', left: 0, right: 0, top: 360, height: 880, overflow: 'hidden', opacity: 0.55 }}>
    {Array.from({ length: 16 }).map((_, i) => {
      const dir = i % 2 ? 1 : -1;
      const w = 260 + random(`w${i}`) * 420;
      const x = ((random(`x${i}`) * 1400 + dir * f * (1.2 + random(`v${i}`))) % 1400) - 200;
      return (
        <div key={i} style={{ position: 'absolute', top: i * 55, left: x, display: 'flex', gap: 18, alignItems: 'center' }}>
          <div style={{ width: 22, height: 22, border: `2px solid ${C.lineDark}` }} />
          <div style={{ width: w, height: 10, background: C.lineDark }} />
          <div style={{ width: w * 0.4, height: 10, background: C.lineDark }} />
        </div>
      );
    })}
  </div>
);

const S02: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  const n = Math.max(1, count(f, 8, 72, T.s02.n));
  const zoom = interpolate(f, [192, 210], [1, 9], { ...clamp, easing: (t) => t * t * t });
  const rest = 1 - prog(f, 186, 196);
  return (
    <Shot n={2} captions={captions} src={T.s02.src} srcAt={60}>
      <div style={{ opacity: rest }}>
        <DocLines f={f} />
      </div>
      <At top={372} center style={{ opacity: rest }}>
        <Label color={C.mint}>Processo de contratação da banca</Label>
      </At>
      <At top={428} center style={{ transform: `scale(${zoom})`, transformOrigin: '50% 45%' }}>
        <Big size={430} style={{ display: 'inline-block', background: C.ink, padding: '0 24px' }}>
          {String(n).padStart(2, '0')}
        </Big>
      </At>
      <div style={{ opacity: rest }}>
        <At top={828} center style={{ opacity: prog(f, 70, 80) }}>
          <Label color={C.mutedDark} size={24}>
            {T.s02.caption}
          </Label>
        </At>
        <At top={900} center style={rise(out(f, 76, 90))}>
          <Big size={124}>{T.s02.a}</Big>
          <Big size={124} color={C.mint} style={{ marginTop: 8 }}>
            {T.s02.b}
          </Big>
        </At>
        <At top={1168} center style={{ opacity: prog(f, 100, 112) }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 28, color: C.mutedDark }}>{T.s02.note}</div>
        </At>
      </div>
    </Shot>
  );
};

const S03: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  const docIn = out(f, 14, 34);
  const stamp = out(f, 48, 56);
  const slide = inOut(f, 104, 128);
  const exit = inOut(f, 196, 210);
  return (
    <Shot n={3} captions={captions} src={T.s03.src} srcAt={130}>
      <AbsoluteFill style={{ transform: `translateY(${-exit * 1300}px)` }}>
        <At top={366} style={rise(out(f, 0, 12))}>
          <Big size={118}>{T.s03.a.split(' ')[0]}</Big>
          <Big size={118} style={{ marginTop: 6 }}>
            {T.s03.a.split(' ').slice(1).join(' ')}
          </Big>
          <Label color={C.mint} size={26} style={{ marginTop: 26 }}>
            {T.s03.b}
          </Label>
        </At>
        <div
          style={{
            position: 'absolute',
            left: 230,
            top: 650,
            perspective: 1600,
            opacity: docIn * (1 - prog(f, 116, 130)),
            transform: `translate(${-slide * 420}px, ${(1 - docIn) * 120}px) scale(${1 - slide * 0.55})`,
            transformOrigin: '0 0',
          }}
        >
          <div style={{ transform: 'rotateX(16deg) rotateZ(-5deg)', transformOrigin: '50% 100%' }}>
            <Paper title={T.s03.doc} width={620} lines={10}>
              <div
                style={{
                  position: 'absolute',
                  right: 46,
                  top: 260,
                  border: `7px solid ${C.green}`,
                  color: C.green,
                  padding: '10px 26px',
                  fontFamily: FONT.sans,
                  fontWeight: 900,
                  fontSize: 84,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  transform: `rotate(-12deg) scale(${1.8 - 0.8 * stamp})`,
                  opacity: stamp > 0 ? 1 : 0,
                }}
              >
                {T.s03.stamp}
              </div>
            </Paper>
          </div>
        </div>
        <div style={{ position: 'absolute', left: M, top: 660, width: W, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {T.s03.steps.map((s, i) => {
            const p = out(f, 112 + i * 14, 128 + i * 14);
            const last = i === T.s03.steps.length - 1;
            return (
              <div
                key={s.l}
                style={{
                  ...rise(p, 50),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 30,
                  padding: '30px 34px',
                  background: C.inkSoft,
                  border: `${last ? 4 : 2}px solid ${last ? C.mint : C.lineDark}`,
                  borderColor: last ? `rgba(54,205,137,${0.35 + 0.65 * pulse(f, 26)})` : C.lineDark,
                  borderRadius: 4,
                }}
              >
                <div style={{ width: 56, height: 56, flexShrink: 0, background: last ? 'transparent' : C.mint, border: last ? `3px dashed ${C.mint}` : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {last ? null : <Check size={40} />}
                </div>
                <div>
                  <Label color={last ? C.mint : C.mutedDark}>{s.d}</Label>
                  <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 52, letterSpacing: -1.8, color: last ? C.mint : C.white, marginTop: 6, textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Shot>
  );
};

const Particles: React.FC<{ f: number }> = ({ f }) => (
  <AbsoluteFill>
    {Array.from({ length: 34 }).map((_, i) => {
      const a = random(`a${i}`) * Math.PI * 2;
      const r0 = 300 + random(`r${i}`) * 260;
      const r = r0 + f * (0.6 + random(`s${i}`) * 1.4);
      const size = 8 + Math.round(random(`z${i}`) * 3) * 6;
      const bar = i % 3 === 0;
      const color = i % 4 === 0 ? C.mint : i % 4 === 1 ? C.mutedDark : C.lineDark;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 540 + Math.cos(a) * r,
            top: 640 + Math.sin(a) * r * 0.9,
            width: bar ? size * 3 : size,
            height: bar ? 4 : size,
            background: color,
            opacity: 0.7 * prog(f, 10 + (i % 8) * 3, 24 + (i % 8) * 3),
            transform: `rotate(${(a * 180) / Math.PI}deg)`,
          }}
        />
      );
    })}
  </AbsoluteFill>
);

const S04: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  const n = count(f, 6, 78, T.s04.n);
  const seal = out(f, 96, 104);
  const split = inOut(f, 188, 206);
  const half = (side: 'l' | 'r'): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    clipPath: side === 'l' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)',
    transform: `translate(${(side === 'l' ? -1 : 1) * split * 110}px, ${(side === 'l' ? -1 : 1) * split * 90}px)`,
  });
  const num = (
    <At top={470} center>
      <Big size={400}>{n}</Big>
    </At>
  );
  return (
    <Shot n={4} captions={captions} src={T.s04.src} srcAt={104}>
      <div style={{ opacity: 1 - split }}>
        <Particles f={f} />
      </div>
      <div style={half('l')}>{num}</div>
      <div style={half('r')}>{num}</div>
      <div style={{ opacity: 1 - prog(f, 184, 192) }}>
        <At top={856} center style={rise(out(f, 70, 84))}>
          <Big size={112}>{T.s04.a.split(' ')[0]}</Big>
          <Big size={112} style={{ marginTop: 8 }}>
            {T.s04.a.split(' ')[1]}
          </Big>
        </At>
        <At top={1110} center>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 18,
              background: C.mint,
              color: C.ink,
              padding: '18px 30px',
              borderRadius: 4,
              transform: `scale(${1.5 - 0.5 * seal}) rotate(${(1 - seal) * -6}deg)`,
              opacity: seal > 0 ? 1 : 0,
            }}
          >
            <Check size={38} />
            <span style={{ fontFamily: FONT.mono, fontWeight: 500, fontSize: 28, letterSpacing: 3, textTransform: 'uppercase' }}>{T.s04.seal}</span>
          </div>
        </At>
      </div>
    </Shot>
  );
};

const S05: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  const exit = inOut(f, 194, 210);
  const line = out(f, 40, 70);
  return (
    <Shot n={5} captions={captions} src={T.s05.src} srcAt={60}>
      <At top={372} style={{ opacity: prog(f, 0, 10) }}>
        <Label color={C.mint}>146 vagas · por cargo</Label>
      </At>
      {T.s05.cards.map((c, i) => {
        const p = out(f, 4 + i * 12, 30 + i * 12);
        const dir = i === 0 ? -1 : 1;
        const n = count(f, 14 + i * 12, 80 + i * 12, c.n);
        return (
          <div
            key={c.role}
            style={{
              position: 'absolute',
              left: M,
              top: i === 0 ? 430 : 868,
              width: W,
              height: 360,
              boxSizing: 'border-box',
              padding: '40px 48px',
              background: C.inkSoft,
              border: `2px solid ${C.lineDark}`,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transform: `translate(${dir * (1 - p) * 1100}px, ${dir * exit * 1300}px)`,
            }}
          >
            <Big size={240}>{n}</Big>
            <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 54, letterSpacing: -1.9, color: C.mutedDark, textTransform: 'uppercase' }}>{c.role}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: M, top: 826, width: W * line, height: 6, background: C.mint, opacity: 1 - exit }} />
    </Shot>
  );
};

const DIGIT_H = 1.0;
const Roll: React.FC<{ value: string; size: number; f: number; start: number }> = ({ value, size, f, start }) => {
  let d = 0;
  return (
    <div style={{ display: 'flex', fontFamily: FONT.sans, fontWeight: 900, fontSize: size, lineHeight: DIGIT_H, letterSpacing: -size * 0.04, color: C.mint, fontVariantNumeric: 'tabular-nums' }}>
      {value.split('').map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i}>{ch}</span>;
        const k = d++;
        const target = 10 + Number(ch);
        const p = out(f, start + k * 4, start + k * 4 + 22);
        return (
          <span key={i} style={{ display: 'inline-block', height: size * DIGIT_H, overflow: 'hidden' }}>
            <span style={{ display: 'block', transform: `translateY(${-p * target * size * DIGIT_H}px)` }}>
              {Array.from({ length: 20 }).map((_, j) => (
                <span key={j} style={{ display: 'block', height: size * DIGIT_H }}>
                  {j % 10}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
};

const S06: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  return (
    <Shot n={6} captions={captions} src={T.s06.src} srcAt={130}>
      <AbsoluteFill style={{ opacity: 0.6 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: 400 + i * 120, height: 1.5, background: C.lineDark }} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`r${i}`}
            style={{ position: 'absolute', top: 420 + i * 150 + ((f * 0.8) % 150), right: M, fontFamily: FONT.mono, fontSize: 24, color: C.lineDark, letterSpacing: 2 }}
          >
            {['R$', '0,00', 'R$', '00,00', 'R$', '0,00'][i]}
          </div>
        ))}
      </AbsoluteFill>
      <At top={372} style={{ opacity: prog(f, 0, 10) }}>
        <Label color={C.mint}>Remuneração inicial</Label>
      </At>
      {T.s06.rows.map((r, i) => {
        const at = i === 0 ? 8 : 64;
        const top = i === 0 ? 440 : 800;
        return (
          <At key={r.role} top={top} style={rise(out(f, at, at + 14))}>
            <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 56, letterSpacing: -1.8, color: C.white, textTransform: 'uppercase' }}>{r.role}</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginTop: 18 }}>
              <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 64, color: C.mint, marginTop: 14 }}>R$</span>
              <Roll value={r.value} size={150} f={f} start={at + 6} />
            </div>
          </At>
        );
      })}
      <div style={{ position: 'absolute', left: M, top: 752, width: W * out(f, 56, 80), height: 2, background: C.lineDark }} />
      <At top={1108} style={rise(out(f, 120, 134), 20)}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 36, lineHeight: 1.26, letterSpacing: -0.6, color: C.mutedDark }}>
          {T.s06.note.split(' ').map((w, i) => (
            <React.Fragment key={i}>
              <span style={{ whiteSpace: 'nowrap' }}>{w}</span>{' '}
            </React.Fragment>
          ))}
        </div>
      </At>
    </Shot>
  );
};

const S07: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  const courses = T.s07.courses;
  const slot = Math.floor((f - 18) / 20);
  const settled = f >= 18 + courses.length * 20;
  const morph = inOut(f, 190, 204);
  return (
    <Shot n={7} captions={captions} src={T.s07.src} srcAt={150}>
      <At top={372} center style={rise(out(f, 0, 14))}>
        <div style={{ display: 'inline-block' }}>
          <Diploma size={200} />
        </div>
      </At>
      {!settled && slot >= 0 ? (
        <At top={700} center>
          <Big size={90} style={{ opacity: prog(f, 18 + slot * 20, 22 + slot * 20), transform: `translateY(${(1 - out(f, 18 + slot * 20, 26 + slot * 20)) * 30}px)` }}>
            {courses[slot]}
          </Big>
        </At>
      ) : null}
      {settled ? (
        <>
          <At top={620} center style={rise(out(f, 98, 110), 20)}>
            <Label color={C.white} size={30}>
              {T.s07.a}
            </Label>
          </At>
          <At top={690} center style={rise(out(f, 100, 114))}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Big size={150} color={C.mint} style={{ opacity: 1 - morph }}>
                {T.s07.b.split(' ')[0]}
              </Big>
              <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 10, marginTop: -5, background: C.mint, transform: `scaleX(${morph})` }} />
            </div>
            <Big size={150} color={C.mint} style={{ marginTop: 10, opacity: 1 - morph }}>
              {T.s07.b.split(' ')[1]}
            </Big>
          </At>
          <At top={1060} center style={rise(out(f, 134, 148), 20)}>
            <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 36, letterSpacing: -0.6, color: C.mutedDark }}>{T.s07.note}</div>
          </At>
        </>
      ) : null}
    </Shot>
  );
};

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const S08: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  const m = Math.min(11, Math.floor(out(f, 6, 78) * 11.999));
  const landed = f >= 80;
  const exit = inOut(f, 192, 210);
  return (
    <Shot n={8} captions={captions} src={T.s08.src} srcAt={120}>
      <div style={{ position: 'absolute', left: 300, top: 470, opacity: 0.2 * prog(f, 20, 60), filter: 'blur(9px)', transform: 'rotate(7deg)' }}>
        <Paper title="Edital de abertura" width={640} lines={14}>
          <div style={{ position: 'absolute', left: 40, top: 120, fontFamily: FONT.sans, fontWeight: 900, fontSize: 120, color: C.ink, letterSpacing: -4 }}>EDITAL</div>
        </Paper>
      </div>
      <AbsoluteFill style={{ transform: `translateX(${-exit * 1080}px)` }}>
        <At top={372}>
          <Label color={C.mint}>Calendário {T.s08.year}</Label>
        </At>
        <At top={430}>
          <Big size={150} color={landed ? C.mint : C.white}>
            {MONTHS[m]}
          </Big>
          <Big size={150} style={{ marginTop: 6 }}>
            {T.s08.year}
          </Big>
        </At>
        <div style={{ position: 'absolute', left: M, top: 770, width: W, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          {MONTHS.map((name, i) => (
            <div
              key={name}
              style={{
                height: 76,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${i === m ? C.mint : C.lineDark}`,
                background: i === m ? C.mint : i < m ? C.inkSoft : 'transparent',
                color: i === m ? C.ink : i < m ? C.mutedDark : C.white,
                fontFamily: FONT.mono,
                fontWeight: 500,
                fontSize: 24,
                letterSpacing: 2,
                textTransform: 'uppercase',
                borderRadius: 2,
              }}
            >
              {name.slice(0, 3)}
            </div>
          ))}
        </div>
        <At top={980} style={rise(out(f, 86, 100), 24)}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 60, letterSpacing: -2, color: C.white, textTransform: 'uppercase' }}>{T.s08.label}</div>
        </At>
        <At top={1080}>
          <div
            style={{
              display: 'inline-block',
              border: `3px dashed ${C.white}`,
              padding: '16px 26px',
              borderRadius: 4,
              fontFamily: FONT.mono,
              fontWeight: 500,
              fontSize: 26,
              letterSpacing: 3,
              color: C.white,
              textTransform: 'uppercase',
              opacity: out(f, 104, 112),
              transform: `scale(${1.3 - 0.3 * out(f, 104, 112)})`,
              transformOrigin: 'left center',
            }}
          >
            {T.s08.seal}
          </div>
        </At>
      </AbsoluteFill>
    </Shot>
  );
};

const S09: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  const x0 = M + 20;
  const x1 = M + W - 20;
  const xs = [x0, x0 + ((x1 - x0) * 5) / 6, x1];
  const band = inOut(f, 40, 96);
  const Y = 1080;
  return (
    <Shot n={9} captions={captions} src={T.s09.src} srcAt={110}>
      <At top={372} style={{ opacity: prog(f, 0, 10) }}>
        <Label color={C.mint}>{T.s09.title}</Label>
      </At>
      <At top={428} style={rise(out(f, 4, 18))}>
        <Big size={128}>{T.s09.a.split(' ').slice(0, 2).join(' ')}</Big>
        <Big size={128} style={{ marginTop: 6 }}>
          {T.s09.a.split(' ').slice(2).join(' ')}
        </Big>
        <Big size={196} color={C.mint} style={{ marginTop: 12 }}>
          {T.s09.b}
        </Big>
      </At>
      <div style={{ position: 'absolute', left: x0, top: Y - 2, width: x1 - x0, height: 4, background: C.lineDark }} />
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: x0 + ((x1 - x0) * i) / 6 - 1, top: Y - 12, width: 2, height: 24, background: C.lineDark }} />
      ))}
      <div style={{ position: 'absolute', left: x0, top: Y - 7, width: (x1 - x0) * band, height: 14, background: C.mint }} />
      {T.s09.marks.map((mk, i) => {
        const p = out(f, [30, 120, 92][i], [42, 132, 104][i]);
        const forecast = i === 1;
        const below = !forecast;
        const align = i === 0 ? 'left' : 'right';
        return (
          <React.Fragment key={mk.d}>
            <div
              style={{
                position: 'absolute',
                left: xs[i] - 20,
                top: Y - 20,
                width: 40,
                height: 40,
                boxSizing: 'border-box',
                background: forecast ? C.ink : C.mint,
                border: forecast ? `4px dashed ${C.white}` : `4px solid ${C.ink}`,
                transform: `scale(${p})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: below ? Y + 44 : Y - 132,
                ...(align === 'left' ? { left: xs[i] - 20 } : { right: 1080 - xs[i] - 20 }),
                textAlign: align,
                opacity: p,
              }}
            >
              <Label color={forecast ? C.white : C.mint} size={24}>
                {mk.d}
              </Label>
              <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, letterSpacing: -1.2, color: forecast ? C.mutedDark : C.white, marginTop: 6 }}>{mk.l}</div>
            </div>
          </React.Fragment>
        );
      })}
    </Shot>
  );
};

const STAGE_ICON = ['objetiva', 'discursiva', 'pregressa', 'formacao'];

const S10: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  const conv = inOut(f, 188, 206);
  return (
    <Shot n={10} captions={captions} src={T.s10.src} srcAt={140}>
      <At top={372} style={{ opacity: prog(f, 0, 10) * (1 - conv) }}>
        <Label color={C.mint}>Etapas previstas</Label>
      </At>
      {T.s10.cards.map((c, i) => {
        const p = out(f, 8 + i * 24, 24 + i * 24);
        const col = i % 2;
        const row = Math.floor(i / 2);
        const w = (W - 28) / 2;
        const left = M + col * (w + 28);
        const top = 430 + row * 388;
        const dx = (540 - (left + w / 2)) * conv;
        const dy = (1180 - (top + 180)) * conv;
        return (
          <div
            key={c}
            style={{
              position: 'absolute',
              left,
              top,
              width: w,
              height: 360,
              boxSizing: 'border-box',
              padding: 36,
              background: C.inkSoft,
              border: `2px solid ${C.lineDark}`,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: p * (1 - conv * 0.8),
              transform: `translate(${dx}px, ${dy + (1 - p) * 60}px) scale(${1 - conv * 0.7})`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <svg width={92} height={92} viewBox="0 0 48 48">
                {ICONS[STAGE_ICON[i]]}
              </svg>
              <Label color={C.mutedDark}>{String(i + 1).padStart(2, '0')}</Label>
            </div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 50, lineHeight: 1.02, letterSpacing: -1.8, color: C.white, textTransform: 'uppercase' }}>{c}</div>
          </div>
        );
      })}
      <At top={1214} style={{ opacity: prog(f, 110, 122) * (1 - conv) }}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 30, letterSpacing: -0.4, color: C.mutedDark }}>{T.s10.note}</div>
      </At>
    </Shot>
  );
};

export const RECEITA_POLL: Sticker = { kind: 'poll', top: 790, height: 220, options: T.s11.poll };

const S11: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  return (
    <Shot n={11} captions={captions} ticker={false} fadeOut={prog(f, 198, 210)}>
      <div style={{ opacity: out(f, 0, 16) }}>
        <Desk f={f} />
      </div>
      <At top={384} center style={rise(out(f, 6, 18), 20)}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 40, letterSpacing: -0.8, color: C.mutedDark }}>{T.s11.a}</div>
      </At>
      <At top={460} center style={rise(out(f, 16, 32))}>
        <Big size={112}>{T.s11.b.split(' ')[0]}</Big>
        <Big size={112} style={{ marginTop: 6 }}>
          {T.s11.b.split(' ')[1]}
        </Big>
        <Big size={112} color={C.mint} style={{ marginTop: 6 }}>
          {T.s11.hl}
        </Big>
      </At>
    </Shot>
  );
};

const S12: React.FC<SceneProps> = ({ captions }) => {
  const f = useCurrentFrame();
  const slam = out(f, 0, 8);
  const wipe = inOut(f, 40, 66);
  const brand = f >= 53;
  const p = (a: number) => out(f, a, a + 14);
  return (
    <Shot n={12} captions={captions} ticker={false} captionAt={70} fadeOut={prog(f, 186, 208)}>
      {!brand ? (
        <>
          <At top={600} center>
            <Label color={C.mint} size={30}>
              {T.s12.a}
            </Label>
          </At>
          <At top={680} center>
            <Big size={214} style={{ transform: `scale(${1.2 - 0.2 * slam})` }}>
              {T.s12.a.split(' ')[0]}
            </Big>
          </At>
        </>
      ) : (
        <>
          <At top={376} style={{ opacity: p(56) }}>
            <Label color={C.mint}>{T.s12.a}</Label>
          </At>
          <At top={432} style={rise(p(58))}>
            <Big size={98} style={{ whiteSpace: 'normal', lineHeight: 0.94, width: 880 }}>
              {T.s12.b}
            </Big>
          </At>
          <At top={790} style={rise(p(74), 24)}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18, background: C.mint, color: C.ink, padding: '22px 30px', borderRadius: 4, fontFamily: FONT.sans, fontWeight: 900, fontSize: 42, letterSpacing: -1, textTransform: 'uppercase' }}>
              {T.s12.cta}
              <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="square">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </div>
          </At>
          <At top={980} style={{ opacity: p(92) }}>
            <div style={{ border: `3px solid ${C.green}`, borderRadius: 4, padding: '40px 44px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <Big size={150}>{T.s12.brand.a}</Big>
                <div style={{ fontFamily: FONT.mono, fontWeight: 500, fontSize: 40, letterSpacing: 14, color: C.mint, textTransform: 'uppercase', marginTop: 12 }}>{T.s12.brand.b}</div>
              </div>
              <div style={{ width: 120, height: 10, background: C.mint, marginBottom: 14, transform: `scaleX(${p(100)})`, transformOrigin: 'left' }} />
            </div>
          </At>
        </>
      )}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1920, background: C.green, transform: `translateY(${(1 - 2 * wipe) * 1920}px)` }} />
    </Shot>
  );
};

const SCENES = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12];

// ---------------------------------------------------------------- composition

export type Receita2026Props = {
  scene?: number;
  guide?: boolean;
  showInstagramUI?: boolean;
  captions?: boolean;
  soundtrack?: boolean;
  narrationSrc?: string;
  buildingSrc?: string;
};

export const RECEITA_TRACK = 'audio/receita-2026-trilha.mp3';

const GuideLayer: React.FC<{ from: number }> = ({ from }) => {
  const f = useCurrentFrame() + from;
  const s11 = f >= RECEITA_SCENE * 10 && f < RECEITA_SCENE * 11;
  return <Guide sticker={s11 ? RECEITA_POLL : undefined} />;
};

export const Receita2026: React.FC<Receita2026Props> = ({ scene = 0, guide, showInstagramUI, captions = true, soundtrack = true, narrationSrc, buildingSrc }) => {
  const from = scene > 0 ? (scene - 1) * RECEITA_SCENE : 0;
  const props = { captions, buildingSrc };
  return (
    <MotionOn>
      <Offset.Provider value={from}>
        {scene > 0 ? (
          React.createElement(SCENES[scene - 1], props)
        ) : (
          SCENES.map((S, i) => (
            <Sequence key={i} from={i * RECEITA_SCENE} durationInFrames={RECEITA_SCENE} name={`Cena ${String(i + 1).padStart(2, '0')}`}>
              <Offset.Provider value={i * RECEITA_SCENE}>
                <S {...props} />
              </Offset.Provider>
            </Sequence>
          ))
        )}
      </Offset.Provider>
      {soundtrack ? <Audio src={staticFile(RECEITA_TRACK)} trimBefore={from} /> : null}
      {narrationSrc ? <Audio src={staticFile(narrationSrc)} trimBefore={from} /> : null}
      {guide ? <GuideLayer from={from} /> : null}
      {showInstagramUI ? <InstagramChrome /> : null}
    </MotionOn>
  );
};
