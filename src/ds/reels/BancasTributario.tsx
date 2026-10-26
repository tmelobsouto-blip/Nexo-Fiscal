import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { ReelsChrome } from '../../components/ReelsChrome';
import { BANKS, bank, COMPARABLE, PRINCIPIOS_DETAIL, SOURCE, subject } from '../../data/tributario-bancas';
import { BarList, formatPct, Heatmap } from '../charts';
import { C, FONT, Mode, tone } from '../tokens';
import { Canvas, Hl, Icon, Label, MotionOn, Reveal, Tag, Text, useProgress, useReveal } from '../ui';
import sheet from './bancas-tributario.beats.json';

const FPS = 30;
// Reels: interface sits above y=230, below y=1440 and on the right 230 px.
const SAFE = { left: 64, right: 850, top: 240, bottom: 1440 };
const W = SAFE.right - SAFE.left;

type Beat = { n: number; start: number; dur: number; text: string };
const BEATS = (sheet.beats as Beat[]).map((b, i, all) => {
  const from = Math.round(b.start * FPS);
  const end = i === all.length - 1 ? Math.round((sheet.total_seconds + 0.6) * FPS) : Math.round(all[i + 1].start * FPS);
  return { ...b, from, frames: end - from };
});
export const BANCAS_TRIBUTARIO_FRAMES = BEATS[BEATS.length - 1].from + BEATS[BEATS.length - 1].frames;

const LEF = subject('Execução Fiscal');
const PRINC = subject('Princípios');
const SUSP = subject('Suspensão da Exigibilidade');
const name = (id: (typeof COMPARABLE)[number]) => bank(id).name;

const Zone: React.FC<{ children: React.ReactNode; justify?: React.CSSProperties['justifyContent'] }> = ({ children, justify = 'center' }) => (
  <div style={{ position: 'absolute', left: SAFE.left, width: W, top: SAFE.top + 80, height: 1230 - SAFE.top - 80, display: 'flex', flexDirection: 'column', justifyContent: justify }}>
    {children}
  </div>
);

const Big: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({ children, size = 104, color, style }) => (
  <Text kind="display" color={color} style={{ fontSize: size, letterSpacing: -size * 0.045, ...style }}>
    {children}
  </Text>
);

const Hook: React.FC = () => {
  const bar = useProgress(0, 20);
  return (
    <Zone>
      <Label color={C.mint}>Execução Fiscal · Lei nº 6.830/1980</Label>
      <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 246, lineHeight: 0.85, letterSpacing: -12, color: C.mint, marginTop: 30, fontVariantNumeric: 'tabular-nums' }}>
        {formatPct(LEF.pct.FAFIPA)}
      </div>
      <div style={{ height: 10, width: `${bar * 100}%`, background: C.mint, marginTop: 26 }} />
      <Big size={110} style={{ marginTop: 34 }}>
        na FAFIPA.
      </Big>
    </Zone>
  );
};

const Contrast: React.FC = () => {
  const p = useProgress(2, 26);
  return (
    <Zone>
      <Big size={96}>
        No Cebraspe, <Hl>só {formatPct(LEF.pct.CEBRASPE)}</Hl>.
      </Big>
      <div style={{ marginTop: 80 }}>
        <BarList
          max={13}
          p={p}
          fontSize={44}
          barHeight={64}
          gap={34}
          labelWidth={220}
          rows={[
            { label: 'FAFIPA', value: LEF.pct.FAFIPA, highlight: true },
            { label: 'Cebraspe', value: LEF.pct.CEBRASPE },
          ]}
        />
      </div>
      <Label style={{ marginTop: 50 }}>% das questões de Direito Tributário de cada banca</Label>
    </Zone>
  );
};

const Base: React.FC = () => {
  const p = useProgress(4, 40);
  const rows = [...BANKS].sort((a, b) => b.questions - a.questions);
  return (
    <Zone>
      <Big size={92}>
        7 bancas. <Hl>5 anos.</Hl>
      </Big>
      <Label style={{ marginTop: 22 }}>
        {SOURCE.discipline} · {SOURCE.subjects} assuntos · questões por banca
      </Label>
      <div style={{ marginTop: 50 }}>
        <BarList
          max={1004}
          p={p}
          fontSize={32}
          barHeight={28}
          gap={20}
          labelWidth={200}
          rows={rows.map((b) => ({
            label: b.name,
            value: b.questions,
            display: b.questions.toLocaleString('pt-BR'),
            highlight: b.target,
            muted: b.smallSample,
          }))}
        />
      </div>
    </Zone>
  );
};

const principiosRows = () =>
  [...COMPARABLE]
    .sort((a, b) => PRINC.pct[b] - PRINC.pct[a])
    .map((id) => ({ label: name(id), value: PRINC.pct[id], highlight: id === 'FAFIPA' }));

const Consensus: React.FC<{ withReference?: boolean }> = ({ withReference }) => {
  const p = useProgress(2, 34);
  return (
    <Zone>
      <Tag>Top 10 em {PRINCIPIOS_DETAIL.top10In.replace('/', ' de ')} bancas</Tag>
      <Big size={96} style={{ marginTop: 30 }}>
        Princípios <Hl>Tributários</Hl>
      </Big>
      <div style={{ marginTop: 80 }}>
        <BarList
          max={10.5}
          p={withReference ? 1 : p}
          fontSize={36}
          barHeight={40}
          gap={26}
          labelWidth={200}
          rows={principiosRows()}
          reference={withReference ? { value: PRINCIPIOS_DETAIL.others, label: `Outras bancas ${formatPct(PRINCIPIOS_DETAIL.others)}` } : undefined}
        />
      </div>
    </Zone>
  );
};

const Firsts: React.FC<{ focus: Array<(typeof BANKS)[number]['id']> }> = ({ focus }) => {
  return (
    <Zone>
      <Big size={88}>
        Cada banca, <Hl>um 1º lugar.</Hl>
      </Big>
      <div style={{ marginTop: 56, borderTop: `3px solid ${C.ink}` }}>
        {BANKS.map((b, i) => {
          const on = focus.includes(b.id);
          return (
            <Reveal key={b.id} at={focus.length ? 0 : 2 + i * 3} y={10}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 20,
                  padding: '18px 0',
                  borderBottom: `1.5px solid ${C.line}`,
                  opacity: focus.length && !on ? 0.35 : 1,
                }}
              >
                <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, letterSpacing: 1, color: on ? C.green : C.ink, width: 190 }}>
                  {b.name.toUpperCase()}
                  {b.smallSample ? <span style={{ color: C.muted, fontWeight: 500, fontSize: 16 }}> · 13q</span> : null}
                </span>
                <span
                  style={{
                    flex: 1,
                    minWidth: 0,
                    textAlign: 'right',
                    fontFamily: FONT.sans,
                    fontWeight: on ? 800 : 600,
                    fontSize: 28,
                    letterSpacing: -0.6,
                    color: on ? C.green : C.ink,
                    background: on ? C.surface : undefined,
                    padding: on ? '2px 10px' : undefined,
                  }}
                >
                  {b.first}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Zone>
  );
};

const MATRIX_ROWS = ['Execução Fiscal', 'Princípios', 'Responsabilidade', 'Competência', 'Suspensão da Exigibilidade', 'Extinção do Crédito'];

const Matrix: React.FC = () => {
  const p = useProgress(0, 30);
  return (
    <Zone>
      <Big size={78}>
        A FAFIPA puxa <Hl>Suspensão da Exigibilidade.</Hl>
      </Big>
      <div style={{ marginTop: 54 }}>
        <Heatmap
          max={12.2}
          p={p}
          cellH={84}
          cols={COMPARABLE.map((id) => name(id).toUpperCase().slice(0, 8))}
          highlightCol={COMPARABLE.indexOf('FAFIPA')}
          highlightRow={MATRIX_ROWS.indexOf('Suspensão da Exigibilidade')}
          rows={MATRIX_ROWS.map((short) => {
            const s = subject(short);
            return { label: short === 'Suspensão da Exigibilidade' ? 'Suspensão' : short, values: COMPARABLE.map((id) => s.pct[id]) };
          })}
        />
      </div>
    </Zone>
  );
};

const Suspensao: React.FC = () => {
  const others = BANKS.filter((b) => b.id !== 'FAFIPA').map((b) => SUSP.pct[b.id]);
  const p = useProgress(2, 28);
  return (
    <Zone>
      <Label color={C.mint}>Suspensão da Exigibilidade do Crédito Tributário</Label>
      <div style={{ marginTop: 34 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 220, lineHeight: 0.85, letterSpacing: -10, color: C.mint }}>{formatPct(SUSP.pct.FAFIPA)}</span>
          <Label>FAFIPA</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginTop: 26 }}>
          <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 96, lineHeight: 0.9, letterSpacing: -4, color: C.mutedDark }}>≤ {formatPct(Math.max(...others))}</span>
          <Label>nas outras 6 bancas</Label>
        </div>
      </div>
      <div style={{ marginTop: 70 }}>
        <BarList
          max={6}
          p={p}
          fontSize={30}
          barHeight={26}
          gap={16}
          labelWidth={190}
          rows={[...COMPARABLE].sort((a, b) => SUSP.pct[b] - SUSP.pct[a]).map((id) => ({ label: name(id), value: SUSP.pct[id], highlight: id === 'FAFIPA' }))}
        />
      </div>
    </Zone>
  );
};

const Sample: React.FC = () => {
  const cesg = bank('CESGRANRIO');
  return (
    <Zone>
      <Label>Por que a Cesgranrio ficou de fora</Label>
      <Big size={150} style={{ marginTop: 24 }}>
        {cesg.questions} <span style={{ fontSize: 80, letterSpacing: -3 }}>questões</span>
      </Big>
      <div style={{ marginTop: 60, background: C.surface, borderLeft: `6px solid ${C.alert}`, padding: '34px 36px' }}>
        <Text kind="h2" style={{ fontSize: 58 }}>
          1 questão = <span style={{ color: C.alert }}>{formatPct(100 / cesg.questions)}</span> da banca.
        </Text>
        <Text kind="body" color={C.muted} style={{ marginTop: 16, fontSize: 31 }}>
          Amostra pequena demais para comparar com bancas de 133 a 1.004 questões.
        </Text>
      </div>
    </Zone>
  );
};

const Priorities: React.FC = () => {
  const top = (['Execução Fiscal', 'Princípios', 'Responsabilidade'] as const).map(subject);
  return (
    <Zone>
      <Big size={92}>
        Prova FAFIPA? <Hl>Comece por:</Hl>
      </Big>
      <div style={{ marginTop: 60, borderTop: `3px solid ${C.mint}` }}>
        {top.map((s, i) => (
          <Reveal key={s.short} at={4 + i * 6} y={18}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, padding: '30px 0', borderBottom: `1.5px solid ${C.lineDark}` }}>
              <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: C.mint, width: 50 }}>0{i + 1}</span>
              <span style={{ flex: 1, fontFamily: FONT.sans, fontWeight: 800, fontSize: 44, letterSpacing: -1.4, color: C.white, lineHeight: 1.1 }}>
                {s.short === 'Princípios' ? 'Princípios Tributários' : s.short === 'Responsabilidade' ? 'Responsabilidade Tributária' : s.short}
              </span>
              <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 52, letterSpacing: -2, color: C.mint, fontVariantNumeric: 'tabular-nums' }}>{formatPct(s.pct.FAFIPA)}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Zone>
  );
};

const Save: React.FC = () => {
  const s = useReveal(0, 12);
  return (
    <Zone>
      <div style={{ transform: `scale(${0.9 + s * 0.1})`, transformOrigin: 'left' }}>{Icon.bookmark(C.mint, 130)}</div>
      <Big size={100} style={{ marginTop: 40 }}>
        Salve e comece pela <Hl>Execução Fiscal.</Hl>
      </Big>
      <Label style={{ marginTop: 50, lineHeight: 1.5 }} size={17}>
        {SOURCE.credit}
      </Label>
    </Zone>
  );
};

type SceneDef = { mode: Mode; label: string; render: () => React.ReactNode };

const SCENES: SceneDef[] = [
  { mode: 'dark', label: 'Direito Tributário · por banca', render: () => <Hook /> },
  { mode: 'dark', label: 'Execução Fiscal', render: () => <Contrast /> },
  { mode: 'light', label: 'A base', render: () => <Base /> },
  { mode: 'light', label: 'O consenso', render: () => <Consensus /> },
  { mode: 'light', label: 'O consenso', render: () => <Consensus withReference /> },
  { mode: 'light', label: 'A diferença', render: () => <Firsts focus={[]} /> },
  { mode: 'light', label: 'A diferença', render: () => <Firsts focus={['FCC', 'FEPESE']} /> },
  { mode: 'dark', label: 'Matriz · % da banca', render: () => <Matrix /> },
  { mode: 'dark', label: 'FAFIPA fora da curva', render: () => <Suspensao /> },
  { mode: 'light', label: 'Método', render: () => <Sample /> },
  { mode: 'dark', label: 'O que fazer com isso', render: () => <Priorities /> },
  { mode: 'dark', label: 'Revisão', render: () => <Save /> },
];

const Caption: React.FC<{ text: string; frames: number; mode: Mode }> = ({ text, frames, mode }) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  const total = words.reduce((n, w) => n + w.length + 1, 0);
  const spoken = (frame / Math.max(1, frames - 6)) * total;
  const dark = mode === 'dark';
  let acc = 0;
  return (
    <div style={{ position: 'absolute', left: SAFE.left, width: W, bottom: 1920 - SAFE.bottom, display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          background: dark ? C.white : C.ink,
          padding: '18px 26px',
          textAlign: 'center',
          fontFamily: FONT.sans,
          fontWeight: 800,
          fontSize: 40,
          lineHeight: 1.22,
          letterSpacing: -0.6,
        }}
      >
        {words.map((w, i) => {
          const start = acc;
          acc += w.length + 1;
          const on = spoken >= start;
          const current = on && spoken < acc;
          return (
            <span key={i} style={{ color: current ? (dark ? C.green : C.mint) : dark ? C.ink : C.white, opacity: on ? 1 : 0.4 }}>
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Kicker: React.FC<{ label: string; index: number; mode: Mode }> = ({ label, index, mode }) => {
  const t = tone(mode);
  return (
    <div style={{ position: 'absolute', left: SAFE.left, width: W, top: SAFE.top }}>
      <div style={{ position: 'relative', height: 3, background: t.rule }}>
        <div style={{ position: 'absolute', inset: 0, width: `${((index + 1) / SCENES.length) * 100}%`, background: t.accent }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, fontFamily: FONT.mono, fontSize: 19, fontWeight: 600, letterSpacing: 2.2, textTransform: 'uppercase' }}>
        <span style={{ color: t.accent }}>{label}</span>
        <span style={{ color: t.sub }}>@nexofiscalbr</span>
      </div>
    </div>
  );
};

export const BancasTributario: React.FC<{ showInstagramUI: boolean }> = ({ showInstagramUI }) => (
  <AbsoluteFill style={{ background: C.ink }}>
    {BEATS.map((b, i) => {
      const scene = SCENES[i];
      return (
        <Sequence key={b.n} from={b.from} durationInFrames={b.frames} name={`${b.n} · ${scene.label}`}>
          <MotionOn>
            <Canvas mode={scene.mode}>
              <Kicker label={scene.label} index={i} mode={scene.mode} />
              {scene.render()}
              <Caption text={b.text} frames={b.frames} mode={scene.mode} />
            </Canvas>
          </MotionOn>
        </Sequence>
      );
    })}
    {showInstagramUI && <ReelsChrome caption="Direito Tributário: o que cada banca cobra" />}
  </AbsoluteFill>
);
