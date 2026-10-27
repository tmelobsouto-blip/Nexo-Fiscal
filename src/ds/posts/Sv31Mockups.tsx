import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SV31, SV31_POST as P } from '../copy';
import { C, FONT, Mode, tone } from '../tokens';
import { Canvas, Footer, Label, Law, Mark, TopBar } from '../ui';

// Carrossel SV 31 em três direções visuais. Mesmo texto, mesmos tokens; muda a composição.
type Dir = 'A' | 'B' | 'C';
const M = 88;
const W = 1080 - M * 2;

const Big: React.FC<{ size: number; color?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ size, color, style, children }) => (
  <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: size, lineHeight: 0.94, letterSpacing: -size * 0.045, color, ...style }}>{children}</div>
);

const Box: React.FC<{ x: number; y: number; w?: number; h?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ x, y, w, h, style, children }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, boxSizing: 'border-box', ...style }}>{children}</div>
);

const Chip: React.FC<{ bg: string; fg: string; size: number; children: React.ReactNode }> = ({ bg, fg, size, children }) => (
  <span style={{ background: bg, color: fg, padding: '0 0.14em', borderRadius: 4, whiteSpace: 'nowrap', fontSize: size }}>{children}</span>
);

const Mono: React.FC<{ color: string; size?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ color, size = 21, style, children }) => (
  <div style={{ fontFamily: FONT.mono, fontWeight: 500, fontSize: size, letterSpacing: size * 0.12, textTransform: 'uppercase', lineHeight: 1.35, color, ...style }}>{children}</div>
);

/** Frame: TopBar e Footer sempre por cima do fundo; o conteúdo vem posicionado. */
const Frame: React.FC<{ mode: Mode; label: string; n: number; action: string; bg?: React.ReactNode; children: React.ReactNode }> = ({ mode, label, n, action, bg, children }) => (
  <Canvas mode={mode}>
    {bg}
    <div style={{ position: 'relative' }}>
      <TopBar label={label} index={n} total={P.total} />
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ position: 'relative' }}>
      <Footer action={action} />
    </div>
    {children}
  </Canvas>
);

const LawText: React.FC = () => (
  <>
    {SV31.law.map((x, i) => (x.mark ? <Mark key={i}>{x.t}</Mark> : <React.Fragment key={i}>{x.t}</React.Fragment>))}
  </>
);

const Plain: React.FC<{ hl: React.ReactNode }> = ({ hl }) => (
  <>
    {SV31.plain.a}
    {hl}
    {SV31.plain.b}
  </>
);

const Rings: React.FC<{ cx: number; cy: number; radii: number[]; hot?: number; color?: string; opacity?: number }> = ({ cx, cy, radii, hot, color = C.lineDark, opacity = 1 }) => {
  const R = Math.max(...radii) + 4;
  return (
    <svg width={R * 2} height={R * 2} style={{ position: 'absolute', left: cx - R, top: cy - R, opacity }}>
      {radii.map((r, i) => (
        <circle key={r} cx={R} cy={R} r={r} fill="none" stroke={i === hot ? C.mint : color} strokeWidth={i === hot ? 3 : 2} />
      ))}
    </svg>
  );
};

/** Duas páginas do material, só em barras (sem texto inventado). */
const Pages: React.FC<{ x: number; y: number; scale?: number; line?: string }> = ({ x, y, scale = 1, line = C.line }) => {
  const bars = (n: number, seed: number) =>
    Array.from({ length: n }).map((_, i) => <div key={i} style={{ height: 9, marginBottom: 11, width: `${[96, 88, 100, 70, 92, 84, 98, 62][(i + seed) % 8]}%`, background: line }} />);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 760, height: 560, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
      <div style={{ position: 'absolute', left: 0, top: 30, width: 350, height: 480, background: C.paper, border: `2px solid ${C.line}`, borderRadius: 2, padding: 30, boxSizing: 'border-box', transform: 'rotate(-5deg)' }}>
        <div style={{ width: '58%', height: 14, background: C.ink }} />
        <div style={{ height: 3, background: C.green, margin: '14px 0 20px' }} />
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ width: 74, height: 40, background: C.ink, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>{bars(3, 0)}</div>
        </div>
        <div style={{ height: 2, background: C.line, margin: '12px 0 16px' }} />
        {[0, 1, 2, 3].map((r) => (
          <div key={r} style={{ display: 'flex', gap: 14, marginBottom: 8 }}>
            <div style={{ width: 60, flexShrink: 0 }}>{bars(1, r)}</div>
            <div style={{ flex: 1 }}>{bars(2, r + 2)}</div>
          </div>
        ))}
        <div style={{ width: 90, height: 22, background: C.green, marginTop: 10 }} />
      </div>
      <div style={{ position: 'absolute', left: 390, top: 0, width: 370, height: 500, background: C.white, border: `2px solid ${C.line}`, borderRadius: 2, padding: 30, boxSizing: 'border-box', transform: 'rotate(4deg)' }}>
        <div style={{ width: '44%', height: 12, background: C.ink }} />
        <div style={{ height: 3, background: C.green, margin: '14px 0 20px' }} />
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <div key={r} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>{bars(r % 2 ? 2 : 3, r)}</div>
            {r % 2 === 0 ? <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 20, color: C.green, lineHeight: '18px' }}>[ ]</span> : null}
          </div>
        ))}
        <div style={{ width: '70%', height: 9, background: C.surface, outline: `2px solid ${C.mint}`, marginTop: 6 }} />
      </div>
    </div>
  );
};

type CraneTone = { body: string; boom: string; dark: string; glass: string; operator?: boolean };

/** Guindaste sobre caminhão, em blocos planos. `operator` põe alguém na cabine. */
const Crane: React.FC<{ width: number; t: CraneTone; ground?: boolean }> = ({ width, t, ground }) => (
  <svg width={width} height={(width * 360) / 520} viewBox="0 0 520 360" style={{ display: 'block', overflow: 'visible' }}>
    {ground ? <rect x={-30} y={331} width={580} height={5} fill={t.dark} /> : null}
    {[70, 430].map((x) => (
      <g key={x}>
        <rect x={x} y={272} width={14} height={52} fill={t.dark} />
        <rect x={x - 14} y={320} width={42} height={11} fill={t.dark} />
      </g>
    ))}
    <rect x={40} y={232} width={440} height={44} fill={t.body} />
    <rect x={40} y={270} width={440} height={10} fill={t.dark} />
    <rect x={470} y={250} width={18} height={26} fill={t.dark} />
    <rect x={376} y={156} width={104} height={78} fill={t.body} />
    <rect x={372} y={150} width={112} height={10} fill={t.dark} />
    <rect x={418} y={138} width={22} height={12} fill={C.alertSoft} />
    <polygon points="392,170 462,170 470,212 392,212" fill={t.glass} />
    {t.operator ? (
      <g>
        <rect x={416} y={198} width={28} height={14} fill={C.green} />
        <circle cx={430} cy={188} r={11} fill={C.surface} />
        <path d="M417 186 a13 13 0 0 1 26 0 Z" fill={C.white} />
        <rect x={414} y={184} width={32} height={4} fill={C.white} />
      </g>
    ) : null}
    <rect x={392} y={216} width={3} height={18} fill={t.dark} />
    <rect x={484} y={178} width={7} height={26} fill={t.dark} />
    <rect x={96} y={188} width={30} height={44} fill={t.dark} />
    <rect x={118} y={196} width={116} height={36} fill={t.body} />
    <rect x={118} y={224} width={116} height={6} fill={t.dark} fillOpacity={0.3} />
    <g transform="translate(176 208) rotate(-32)">
      <rect x={0} y={-16} width={230} height={32} fill={t.boom} />
      <rect x={226} y={-12} width={158} height={24} fill={t.boom} />
      <rect x={226} y={-16} width={4} height={32} fill={t.dark} fillOpacity={0.5} />
      {[30, 80, 130, 180, 250, 300, 350].map((x) => (
        <path key={x} d={`M${x} -12 l22 24`} stroke={t.dark} strokeOpacity={0.35} strokeWidth={4} />
      ))}
    </g>
    <circle cx={176} cy={208} r={10} fill={t.dark} />
    <line x1={494} y1={8} x2={494} y2={118} stroke={t.dark} strokeWidth={4} />
    <rect x={483} y={116} width={22} height={22} fill={t.dark} />
    <path d="M494 138 v12 a9 9 0 1 1 -9 9" fill="none" stroke={t.dark} strokeWidth={5} />
    {[96, 168, 360, 432].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy={300} r={30} fill={t.dark} />
        <circle cx={cx} cy={300} r={13} fill={t.glass} />
        <circle cx={cx} cy={300} r={4} fill={t.dark} />
      </g>
    ))}
  </svg>
);

/** Operador de pé, com capacete, colete e controle remoto. */
const Operator: React.FC<{ height: number }> = ({ height }) => (
  <svg width={(height * 120) / 260} height={height} viewBox="0 0 120 260" style={{ display: 'block', overflow: 'visible' }}>
    <rect x={36} y={172} width={20} height={74} fill={C.ink} />
    <rect x={64} y={172} width={20} height={74} fill={C.ink} />
    <rect x={30} y={240} width={28} height={12} fill={C.ink} />
    <rect x={62} y={240} width={28} height={12} fill={C.ink} />
    <rect x={30} y={92} width={60} height={88} fill={C.green} />
    <rect x={34} y={96} width={52} height={80} fill={C.mint} />
    <rect x={34} y={140} width={52} height={7} fill={C.white} />
    <rect x={56} y={96} width={8} height={80} fill={C.green} />
    <rect x={14} y={98} width={18} height={62} fill={C.green} />
    <rect x={88} y={98} width={18} height={44} fill={C.green} />
    <rect x={86} y={128} width={30} height={20} fill={C.ink} />
    <rect x={108} y={112} width={3} height={16} fill={C.ink} />
    <circle cx={60} cy={62} r={24} fill={C.surface} />
    <circle cx={52} cy={64} r={3} fill={C.ink} />
    <circle cx={68} cy={64} r={3} fill={C.ink} />
    <path d="M34 56 a26 26 0 0 1 52 0 Z" fill={C.white} />
    <rect x={30} y={53} width={60} height={6} fill={C.white} />
  </svg>
);

/** Chave com etiqueta: entregar o bem (obrigação de dar). */
const KeyArt: React.FC<{ width: number; color: string; tag: string }> = ({ width, color, tag }) => (
  <svg width={width} height={(width * 120) / 220} viewBox="0 0 220 120" style={{ display: 'block' }}>
    <circle cx={52} cy={60} r={30} fill="none" stroke={color} strokeWidth={14} />
    <rect x={80} y={53} width={112} height={14} fill={color} />
    <rect x={160} y={67} width={12} height={22} fill={color} />
    <rect x={180} y={67} width={12} height={30} fill={color} />
    <line x1={40} y1={36} x2={28} y2={8} stroke={color} strokeWidth={3} />
    <rect x={8} y={0} width={30} height={20} fill={tag} transform="rotate(-18 23 10)" />
  </svg>
);

const Mark2: React.FC<{ kind: 'yes' | 'no'; color: string; size?: number }> = ({ kind, color, size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="square">
    {kind === 'yes' ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M6 6l12 12M18 6L6 18" />}
  </svg>
);

// ---------------------------------------------------------------- A · Noir técnico

const A1: React.FC = () => {
  const x = P.cover;
  return (
    <Frame mode="dark" label={x.label} n={1} action={x.action} bg={<Rings cx={790} cy={500} radii={[120, 190, 260, 330, 400, 470, 540]} hot={2} />}>
      <Box x={M} y={196}>
        <span style={{ display: 'inline-block', border: `2px solid ${C.mint}`, borderRadius: 4, padding: '10px 16px' }}>
          <Mono color={C.mint}>{x.tag}</Mono>
        </span>
      </Box>
      <Box x={590} y={368} w={400} style={{ textAlign: 'center' }}>
        <Big size={300} color={C.white} style={{ lineHeight: 0.88 }}>
          31
        </Big>
        <Mono color={C.mint} style={{ marginTop: 22 }}>
          Súmula Vinculante
        </Mono>
      </Box>
      <Box x={M} y={808} w={W}>
        <Big size={112} color={C.white}>
          {x.a}
        </Big>
        <Big size={112} color={C.mint}>
          {x.hl}
        </Big>
        <Big size={112} color={C.white}>
          {x.b} <span style={{ color: C.alertSoft }}>{x.q}</span>
        </Big>
      </Box>
    </Frame>
  );
};

const A2: React.FC = () => (
  <Frame mode="dark" label={P.law.label} n={2} action={P.law.action} bg={<Rings cx={960} cy={1010} radii={[70, 130, 190]} hot={1} />}>
    <Box x={M} y={236} w={W}>
      <Law source={P.law.source} size={46}>
        <LawText />
      </Law>
    </Box>
    <Box x={M} y={660} w={W} style={{ background: C.inkSoft, border: `2px solid ${C.lineDark}`, borderRadius: 4, padding: '44px 48px' }}>
      <Mono color={C.mint}>{SV31.plainLabel}</Mono>
      <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 54, lineHeight: 1.14, letterSpacing: -1.6, color: C.white, marginTop: 24 }}>
        <Plain hl={<span style={{ color: C.mint }}>{SV31.plain.hl}</span>} />
      </div>
    </Box>
  </Frame>
);

const Branch: React.FC<{ from: [number, number]; to: [number, number]; color: string }> = ({ from, to, color }) => {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const my = (y1 + y2) / 2;
  return (
    <svg width={1080} height={1350} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <path d={`M${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2 - 18}`} fill="none" stroke={color} strokeWidth={4} />
      <path d={`M${x2 - 22} ${y2 - 34} L${x2} ${y2 - 10} L${x2 + 22} ${y2 - 34}`} fill="none" stroke={color} strokeWidth={5} strokeLinecap="square" />
    </svg>
  );
};

const A3: React.FC = () => {
  const x = P.map;
  const card = (side: 'left' | 'right') => {
    const s = x[side];
    const c = side === 'left' ? C.mint : C.alertSoft;
    return (
      <Box x={side === 'left' ? M : 560} y={790} w={432} h={360} style={{ background: C.inkSoft, border: `2px solid ${c}`, borderRadius: 4, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Mono color={c}>{s.kicker}</Mono>
        <div>
          {s.verdict.map((w) => (
            <Big key={w} size={58} color={c} style={{ textTransform: 'uppercase' }}>
              {w}
            </Big>
          ))}
          <Mono color={C.white} style={{ marginTop: 22, borderTop: `2px solid ${C.lineDark}`, paddingTop: 14 }}>
            {s.tag}
          </Mono>
        </div>
      </Box>
    );
  };
  return (
    <Frame mode="dark" label={x.label} n={3} action={x.action} bg={<Rings cx={540} cy={370} radii={[170, 250, 330, 410]} opacity={0.8} />}>
      <Branch from={[400, 500]} to={[304, 790]} color={C.mint} />
      <Branch from={[680, 500]} to={[776, 790]} color={C.alertSoft} />
      <Box x={M} y={250} w={W} style={{ background: C.ink, border: `2px solid ${C.lineDark}`, borderRadius: 4, padding: '34px 40px', textAlign: 'center' }}>
        <Mono color={C.mint}>{x.kicker}</Mono>
        <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 46, letterSpacing: -1.6, color: C.white, marginTop: 14 }}>{x.title}</div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 28, color: C.mutedDark, marginTop: 12 }}>{x.sub}</div>
      </Box>
      {card('left')}
      {card('right')}
    </Frame>
  );
};

const Badge: React.FC<{ x: number; y: number; bg: string; fg: string; children: React.ReactNode }> = ({ x, y, bg, fg, children }) => (
  <Box x={x} y={y} style={{ background: bg, borderRadius: 4, padding: '12px 18px' }}>
    <Mono color={fg} size={22}>
      {children}
    </Mono>
  </Box>
);

const A4: React.FC = () => {
  const x = P.material;
  return (
    <Frame mode="dark" label={x.label} n={4} action={x.action} bg={<Rings cx={540} cy={840} radii={[210, 290, 370, 450]} hot={1} />}>
      <Box x={M} y={204} w={W}>
        <Big size={86} color={C.white}>
          {x.a}
        </Big>
        <Big size={86} color={C.mint}>
          {x.hl}
        </Big>
        <Big size={86} color={C.white}>
          {x.b}
        </Big>
      </Box>
      <Pages x={150} y={560} scale={1} />
      <Badge x={M + 10} y={548} bg={C.mint} fg={C.ink}>
        {x.badges[0]}
      </Badge>
      <Badge x={400} y={1086} bg={C.mint} fg={C.ink}>
        {x.badges[1]}
      </Badge>
    </Frame>
  );
};

// ---------------------------------------------------------------- B · Blocos de cor

const Block: React.FC<{ x: number; y: number; w: number; h: number; bg?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ x, y, w, h, bg = C.green, style, children }) => (
  <Box x={x} y={y} w={w} h={h} style={{ background: bg, borderRadius: 4, overflow: 'hidden', ...style }}>
    {children}
  </Box>
);

const B1: React.FC = () => {
  const x = P.cover;
  return (
    <Frame mode="light" label={x.label} n={1} action={x.action}>
      <Box x={M} y={196}>
        <span style={{ display: 'inline-block', border: `2px solid ${C.green}`, borderRadius: 4, padding: '10px 16px' }}>
          <Mono color={C.green}>{x.tag}</Mono>
        </span>
      </Box>
      <Block x={M} y={286} w={W} h={900}>
        <div style={{ position: 'absolute', right: -36, bottom: -150, fontFamily: FONT.sans, fontWeight: 900, fontSize: 700, lineHeight: 1, letterSpacing: -40, color: C.mint }}>31</div>
        <Box x={60} y={64} w={W - 120}>
          <Big size={108} color={C.white}>
            {x.a}
          </Big>
          <Big size={108} color={C.ink} style={{ marginTop: 20 }}>
            <Chip bg={C.mint} fg={C.ink} size={108}>
              {x.hl}
            </Chip>
          </Big>
          <Big size={108} color={C.white} style={{ marginTop: 20 }}>
            {x.b}{' '}
            <Chip bg={C.alertSurface} fg={C.alert} size={108}>
              {x.q}
            </Chip>
          </Big>
        </Box>
      </Block>
    </Frame>
  );
};

const B2: React.FC = () => (
  <Frame mode="light" label={P.law.label} n={2} action={P.law.action}>
    <Block x={M} y={196} w={W} h={430} bg={C.white} style={{ border: `2px solid ${C.line}`, padding: '46px 48px' }}>
      <Law source={P.law.source} size={44}>
        <LawText />
      </Law>
    </Block>
    <Block x={M} y={652} w={W} h={534} style={{ padding: '48px 52px' }}>
      <div style={{ position: 'absolute', right: 0, top: 0, background: C.mint, padding: '14px 20px' }}>
        <Mono color={C.ink}>SV 31</Mono>
      </div>
      <Mono color={C.surface}>{SV31.plainLabel}</Mono>
      <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 54, lineHeight: 1.16, letterSpacing: -1.8, color: C.white, marginTop: 28 }}>
        <Plain
          hl={
            <Chip bg={C.mint} fg={C.ink} size={54}>
              {SV31.plain.hl}
            </Chip>
          }
        />
      </div>
    </Block>
  </Frame>
);

const B3: React.FC = () => {
  const x = P.map;
  const tile = (side: 'left' | 'right') => {
    const s = x[side];
    const yes = side === 'left';
    const c = yes ? C.green : C.alert;
    return (
      <Block x={yes ? M : 560} y={624} w={432} h={562} bg={yes ? C.surface : C.alertSurface} style={{ border: `3px solid ${c}`, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <Mono color={c}>{s.kicker}</Mono>
          <Mark2 kind={yes ? 'yes' : 'no'} color={c} size={120} />
        </div>
        <div>
          {s.verdict.map((w) => (
            <Big key={w} size={64} color={c} style={{ textTransform: 'uppercase' }}>
              {w}
            </Big>
          ))}
          <div style={{ display: 'inline-block', marginTop: 24, background: c, borderRadius: 4, padding: '8px 14px' }}>
            <Mono color={C.white}>{s.tag}</Mono>
          </div>
        </div>
      </Block>
    );
  };
  return (
    <Frame mode="light" label={x.label} n={3} action={x.action}>
      <Block x={M} y={196} w={W} h={300} style={{ padding: '40px 48px' }}>
        <Mono color={C.mint}>{x.kicker}</Mono>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 56, letterSpacing: -2.2, color: C.white, marginTop: 16, lineHeight: 1 }}>{x.title}</div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 30, color: C.surface, marginTop: 18 }}>{x.sub}</div>
      </Block>
      <Box x={537} y={496} w={6} h={64} style={{ background: C.ink }} />
      <Box x={301} y={554} w={239} h={6} style={{ background: C.green }} />
      <Box x={540} y={554} w={239} h={6} style={{ background: C.alert }} />
      <Box x={301} y={554} w={6} h={70} style={{ background: C.green }} />
      <Box x={773} y={554} w={6} h={70} style={{ background: C.alert }} />
      {tile('left')}
      {tile('right')}
    </Frame>
  );
};

const B4: React.FC = () => {
  const x = P.material;
  return (
    <Frame mode="dark" label={x.label} n={4} action={x.action}>
      <Box x={M} y={196} w={W}>
        <Big size={84} color={C.white}>
          {x.a}
        </Big>
        <Big size={84} color={C.mint}>
          {x.hl}
        </Big>
        <Big size={84} color={C.white}>
          {x.b}
        </Big>
      </Box>
      <Block x={M} y={468} w={W} h={718}>
        <div style={{ position: 'absolute', left: -20, bottom: -96, fontFamily: FONT.sans, fontWeight: 900, fontSize: 330, lineHeight: 1, letterSpacing: -16, color: C.mint, whiteSpace: 'nowrap' }}>MAPAS</div>
        <Pages x={70} y={70} scale={1} />
        <Badge x={40} y={40} bg={C.paper} fg={C.green}>
          {x.badges[0]}
        </Badge>
        <Badge x={300} y={610} bg={C.paper} fg={C.green}>
          {x.badges[1]}
        </Badge>
      </Block>
    </Frame>
  );
};

// ---------------------------------------------------------------- C · Recorte

const CRANE_LIGHT: CraneTone = { body: C.paper, boom: C.white, dark: C.ink, glass: C.lineDark };

const C1: React.FC = () => {
  const x = P.cover;
  return (
    <Frame mode="dark" label={x.label} n={1} action={x.action}>
      <Block x={M} y={190} w={W} h={996} bg={C.mint} style={{ overflow: 'visible' }}>
        <Box x={56} y={56}>
          <span style={{ display: 'inline-block', background: C.ink, borderRadius: 4, padding: '10px 16px' }}>
            <Mono color={C.mint}>{x.tag}</Mono>
          </span>
        </Box>
        <Box x={56} y={150} w={W - 112}>
          <Big size={104} color={C.ink}>
            {x.a}
          </Big>
          <Big size={104} color={C.ink} style={{ marginTop: 20 }}>
            <Chip bg={C.ink} fg={C.mint} size={104}>
              {x.hl}
            </Chip>
          </Big>
          <Big size={104} color={C.ink} style={{ marginTop: 20 }}>
            {x.b} <span style={{ color: C.alert }}>{x.q}</span>
          </Big>
        </Box>
        <Box x={330} y={640} w={520} h={300} style={{ background: C.green, borderRadius: 4 }} />
        <Box x={250} y={470}>
          <Crane width={600} ground t={CRANE_LIGHT} />
        </Box>
      </Block>
    </Frame>
  );
};

const C2: React.FC = () => (
  <Frame mode="dark" label={P.law.label} n={2} action={P.law.action}>
    <Box x={M} y={210} w={W}>
      <Law source={P.law.source} size={40}>
        <LawText />
      </Law>
    </Box>
    <Block x={M} y={516} w={432} h={250} bg={C.inkSoft} style={{ border: `2px solid ${C.lineDark}`, padding: '30px 64px 30px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <Mono color={C.mint}>{P.law.give.k}</Mono>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 44, lineHeight: 1.02, letterSpacing: -1.6, color: C.white, marginTop: 8 }}>{P.law.give.v}</div>
      </div>
      <div style={{ position: 'absolute', right: 70, top: 34 }}>
        <KeyArt width={150} color={C.mint} tag={C.white} />
      </div>
    </Block>
    <Block x={560} y={516} w={432} h={250} bg={C.inkSoft} style={{ border: `2px solid ${C.lineDark}`, padding: '30px 30px 30px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <Mono color={C.alertSoft}>{P.law.make.k}</Mono>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 44, lineHeight: 1.02, letterSpacing: -1.6, color: C.white, marginTop: 8 }}>{P.law.make.v}</div>
      </div>
      <Operator height={190} />
    </Block>
    <Box x={496} y={597} w={88} h={88} style={{ background: C.white, borderRadius: 4, border: `4px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 900, fontSize: 60, color: C.ink }}>
      ≠
    </Box>
    <Block x={M} y={796} w={W} h={390} bg={C.mint} style={{ padding: '42px 48px' }}>
      <Mono color={C.ink}>{SV31.plainLabel}</Mono>
      <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 50, lineHeight: 1.14, letterSpacing: -1.8, color: C.ink, marginTop: 24 }}>
        <Plain
          hl={
            <Chip bg={C.ink} fg={C.mint} size={50}>
              {SV31.plain.hl}
            </Chip>
          }
        />
      </div>
    </Block>
  </Frame>
);

const C3: React.FC = () => {
  const x = P.map;
  const panel = (side: 'left' | 'right') => {
    const s = x[side];
    const yes = side === 'left';
    const fg = yes ? C.ink : C.white;
    const hot = yes ? C.ink : C.alertSoft;
    return (
      <Block
        x={yes ? M : 556}
        y={420}
        w={436}
        h={766}
        bg={yes ? C.mint : C.inkSoft}
        style={{ border: yes ? undefined : `2px solid ${C.lineDark}`, padding: 34, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'absolute', left: -6, top: 30 }}>
            <Crane width={330} ground t={yes ? { body: C.paper, boom: C.white, dark: C.ink, glass: C.lineDark } : { body: C.mutedDark, boom: C.white, dark: C.ink, glass: C.lineDark, operator: true }} />
          </div>
          {yes ? null : (
            <div style={{ position: 'absolute', right: -4, top: 128 }}>
              <Operator height={200} />
            </div>
          )}
        </div>
        <div>
          <Mono color={fg}>{s.kicker}</Mono>
          <div style={{ marginTop: 16 }}>
            {s.verdict.map((w) => (
              <Big key={w} size={62} color={hot} style={{ textTransform: 'uppercase' }}>
                {w}
              </Big>
            ))}
          </div>
          <div style={{ display: 'inline-block', marginTop: 22, background: yes ? C.ink : C.alertSoft, borderRadius: 4, padding: '8px 14px' }}>
            <Mono color={yes ? C.mint : C.ink}>{s.tag}</Mono>
          </div>
        </div>
      </Block>
    );
  };
  return (
    <Frame mode="dark" label={x.label} n={3} action={x.action}>
      <Box x={M} y={196} w={W}>
        <Mono color={C.mint}>{x.kicker}</Mono>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 56, letterSpacing: -2.2, color: C.white, marginTop: 14, lineHeight: 1 }}>{x.title}</div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 29, color: C.mutedDark, marginTop: 16 }}>{x.sub}</div>
      </Box>
      {panel('left')}
      {panel('right')}
      <Box x={496} y={760} w={88} h={88} style={{ background: C.white, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${C.ink}` }}>
        <Mark2 kind="no" color={C.ink} size={56} />
      </Box>
    </Frame>
  );
};

const C4: React.FC = () => {
  const x = P.material;
  return (
    <Frame mode="dark" label={x.label} n={4} action={x.action}>
      <Block x={M} y={190} w={W} h={996} bg={C.mint} style={{ overflow: 'visible' }}>
        <Box x={56} y={56} w={W - 112}>
          <Big size={84} color={C.ink}>
            {x.a}
          </Big>
          <Big size={84} color={C.ink} style={{ marginTop: 16 }}>
            <Chip bg={C.ink} fg={C.mint} size={84}>
              {x.hl}
            </Chip>
          </Big>
          <Big size={84} color={C.ink} style={{ marginTop: 16 }}>
            {x.b}
          </Big>
        </Box>
        <Box x={56} y={560} w={W - 112} h={380} style={{ background: C.ink, borderRadius: 4 }} />
        <Pages x={70} y={380} scale={1} />
        <Badge x={56} y={360} bg={C.ink} fg={C.mint}>
          {x.badges[0]}
        </Badge>
        <Badge x={320} y={900} bg={C.ink} fg={C.mint}>
          {x.badges[1]}
        </Badge>
      </Block>
    </Frame>
  );
};

// ---------------------------------------------------------------- registro e pranchas

const SLIDES: Record<Dir, React.FC[]> = { A: [A1, A2, A3, A4], B: [B1, B2, B3, B4], C: [C1, C2, C3, C4] };
const ROLES = ['capa', 'sumula', 'mapa', 'material'];

export const SV31_MOCKUP_SLIDES = (['A', 'B', 'C'] as const).flatMap((d) =>
  SLIDES[d].map((component, i) => ({ id: `DS-SV31-0${i + 1}${d}-${ROLES[i]}`, component })),
);

const Scaled: React.FC<{ S: React.FC; w: number }> = ({ S, w }) => {
  const s = w / 1080;
  return (
    <div style={{ position: 'relative', width: w, height: 1350 * s, overflow: 'hidden', borderRadius: 4, flexShrink: 0 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1350, transform: `scale(${s})`, transformOrigin: '0 0' }}>
        <S />
      </div>
    </div>
  );
};

const IgIcon: React.FC<{ d: string; color: string }> = ({ d, color }) => (
  <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinejoin="round" strokeLinecap="round">
    <path d={d} />
  </svg>
);

const IG = {
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  comment: 'M20 11.5a8 8 0 1 1-3.2-6.4A8 8 0 0 1 20 11.5zM20 20l-3-2.6',
  send: 'M21 4L3 11l7 3 3 7 8-17zM10 14l11-10',
  save: 'M6 3h12v18l-6-4.5L6 21z',
};

/** Prancha: o post como aparece no feed + os 4 slides. */
export const Sv31Board: React.FC<{ dir: Dir }> = ({ dir }) => {
  const info = P.directions[dir];
  const dark = dir !== 'B';
  const t = tone(dark ? 'dark' : 'light');
  const ui = dark ? { bg: C.ink, fg: C.white, sub: C.mutedDark, line: C.lineDark } : { bg: C.white, fg: C.ink, sub: C.muted, line: C.line };
  const slides = SLIDES[dir];
  return (
    <AbsoluteFill style={{ background: dark ? C.inkSoft : C.surface, padding: 80, fontFamily: FONT.sans, color: t.fg }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 56, letterSpacing: -2 }}>{info.name}</div>
        <Label color={t.sub}>Carrossel SV 31 · 4 slides 1080 × 1350</Label>
      </div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 30, color: t.sub, marginTop: 10 }}>{info.note}</div>
      <div style={{ display: 'flex', gap: 80, marginTop: 50, alignItems: 'flex-start' }}>
        <div style={{ width: 720, background: ui.bg, border: `2px solid ${ui.line}`, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 22px' }}>
            <div style={{ width: 54, height: 54, borderRadius: 27, background: C.ink, border: `2px solid ${ui.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 24, color: C.white }}>
              N<span style={{ color: C.mint }}>.</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 26, color: ui.fg }}>nexofiscalbr</div>
          </div>
          <Scaled S={slides[0]} w={720} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px 22px 6px' }}>
            <IgIcon d={IG.heart} color={ui.fg} />
            <IgIcon d={IG.comment} color={ui.fg} />
            <IgIcon d={IG.send} color={ui.fg} />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 8, marginRight: 62 }}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: i === 0 ? '#3897F0' : ui.sub, opacity: i === 0 ? 1 : 0.5 }} />
              ))}
            </div>
            <IgIcon d={IG.save} color={ui.fg} />
          </div>
          <div style={{ padding: '10px 22px 26px', fontSize: 24, lineHeight: 1.35, color: ui.fg }}>
            <b>nexofiscalbr</b> {P.caption}
            <span style={{ color: ui.sub }}> … mais</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 520px)', gap: 24 }}>
          {slides.map((S, i) => (
            <Scaled key={i} S={S} w={520} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SV31_BOARD = { width: 2024, height: 1604 };
