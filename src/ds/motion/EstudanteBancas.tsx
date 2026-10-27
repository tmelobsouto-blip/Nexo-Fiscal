import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { InstagramChrome } from '../../components/InstagramChrome';
import { bank, BankId, SOURCE, subject } from '../../data/tributario-bancas';
import { BarList, formatPct } from '../charts';
import { Bubble, Doubt, Person } from '../characters';
import { STORY_BANCAS as T } from '../copy';
import { Guide } from '../stories';
import { C, FONT, GRID } from '../tokens';
import { Canvas, Hl, Label, MotionOn, Text, TopBar } from '../ui';

// Timeline (30 fps). One continuous scene so the characters and chips travel between beats.
const F = { hookEnd: 96, mentorIn: 96, rows: 156, focus: 285, cta: 390, end: 495 };
export const ESTUDANTE_BANCAS_FRAMES = F.end;

const ease = (frame: number, a: number, b: number) => {
  const t = interpolate(frame, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const fade = (frame: number, a: number, b: number) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const ROWS: BankId[] = ['FCC', 'FGV', 'FAFIPA', 'CEBRASPE', 'FUNDATEC', 'FEPESE'];
const ROW_Y = (i: number) => 470 + i * 96;
const SLOT_X = 400;

type ChipDef = { label: string; x: number; y: number; r: number; row?: number };
const CHIPS: ChipDef[] = [
  { label: 'Princípios Tributários', x: 96, y: 558, r: -3, row: 1 },
  { label: 'Execução Fiscal', x: 610, y: 548, r: 4, row: 2 },
  { label: 'Extinção do Crédito', x: 150, y: 625, r: 2, row: 0 },
  { label: 'Taxas', x: 640, y: 622, r: -5 },
  { label: 'Responsabilidade', x: 470, y: 689, r: -2 },
  { label: 'Imunidades', x: 96, y: 696, r: 5 },
  { label: 'Contribuições de Melhoria', x: 300, y: 760, r: 3, row: 5 },
  { label: 'Lançamento', x: 790, y: 751, r: -4 },
  { label: 'Suspensão da Exigibilidade', x: 120, y: 825, r: -2 },
  { label: 'Conceito de Tributo', x: 640, y: 827, r: 4 },
  { label: 'Sujeito Ativo e Passivo', x: 370, y: 891, r: -3 },
  { label: 'Repartição de Receitas', x: 96, y: 953, r: 3 },
  { label: 'Competência', x: 700, y: 936, r: -2 },
  { label: 'Obrigação Tributária', x: 480, y: 1012, r: 2 },
];

const Chip: React.FC<{ label: string; on?: boolean; style?: React.CSSProperties }> = ({ label, on, style }) => (
  <div
    style={{
      position: 'absolute',
      whiteSpace: 'nowrap',
      padding: '14px 22px',
      borderRadius: 4,
      background: on ? 'rgba(54,205,137,0.14)' : C.inkSoft,
      border: `2px solid ${on ? C.mint : C.lineDark}`,
      color: on ? C.mint : C.white,
      fontFamily: FONT.sans,
      fontWeight: on ? 800 : 600,
      fontSize: 30,
      letterSpacing: -0.4,
      ...style,
    }}
  >
    {label}
  </div>
);

const Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const calm = 1 - fade(frame, F.mentorIn, F.mentorIn + 20);
  const morph = ease(frame, F.rows, F.rows + 36);
  return (
    <>
      {CHIPS.map((c, i) => {
        const dx = Math.sin(frame / 13 + i * 1.7) * 14 * calm;
        const dy = Math.cos(frame / 11 + i * 2.3) * 12 * calm;
        const appear = fade(frame, 2 + i * 2, 12 + i * 2);
        if (c.row === undefined) {
          const gone = morph;
          return (
            <Chip
              key={c.label}
              label={c.label}
              style={{
                left: c.x + dx,
                top: c.y + dy,
                opacity: appear * (1 - gone) * (frame >= F.mentorIn ? 0.4 : 1),
                transform: `rotate(${c.r * (1 - gone)}deg) scale(${1 - gone * 0.4})`,
              }}
            />
          );
        }
        const x = lerp(c.x + dx, SLOT_X, morph);
        const y = lerp(c.y + dy, ROW_Y(c.row) - 14, morph);
        const focusOut = 1 - fade(frame, F.focus, F.focus + 14);
        return (
          <Chip
            key={c.label}
            label={c.label}
            on={morph > 0.6 && c.row === 2}
            style={{ left: x, top: y, opacity: appear * focusOut, transform: `rotate(${c.r * (1 - morph)}deg)` }}
          />
        );
      })}
      {[3, 4].map((row, k) => {
        const p = ease(frame, F.rows + 30 + k * 6, F.rows + 52 + k * 6);
        return (
          <Chip
            key={row}
            label="Princípios Tributários"
            style={{
              left: SLOT_X,
              top: lerp(ROW_Y(1) - 14, ROW_Y(row) - 14, p),
              opacity: (p > 0 ? 1 : 0) * (1 - fade(frame, F.focus, F.focus + 14)),
            }}
          />
        );
      })}
    </>
  );
};

const Rows: React.FC = () => {
  const frame = useCurrentFrame();
  const inP = fade(frame, F.rows + 10, F.rows + 30);
  const out = 1 - fade(frame, F.focus, F.focus + 14);
  return (
    <div style={{ opacity: inP * out }}>
      <div style={{ position: 'absolute', left: GRID.margin, top: 400 }}>
        <Label color={C.mint}>{T.rowsLabel}</Label>
      </div>
      {ROWS.map((id, i) => {
        const b = bank(id);
        return (
          <div key={id} style={{ position: 'absolute', left: GRID.margin, right: GRID.margin, top: ROW_Y(i) - 30, height: 96, borderTop: `1.5px solid ${C.lineDark}` }}>
            <span
              style={{
                position: 'absolute',
                top: 30,
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: 1.2,
                color: b.target ? C.mint : C.white,
              }}
            >
              {b.name.toUpperCase()}
              <span style={{ fontWeight: 500, color: C.mutedDark, fontSize: 18 }}> · {b.questions.toLocaleString('pt-BR')}q</span>
            </span>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: GRID.margin, top: ROW_Y(6) - 6 }}>
        <Label size={19}>{T.excluded}</Label>
      </div>
    </div>
  );
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12 } });
  const out = 1 - fade(frame, F.rows - 4, F.rows + 10);
  return (
    <div style={{ position: 'absolute', left: GRID.margin, right: GRID.margin, top: 300, opacity: out }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 22 }}>
        <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 200, lineHeight: 0.85, letterSpacing: -10, color: C.mint, transform: `scale(${0.94 + pop * 0.06})`, display: 'inline-block', transformOrigin: 'left bottom' }}>
          {T.hook.count}
        </span>
        <Text kind="display" style={{ fontSize: 92 }}>
          {T.hook.unit}
        </Text>
      </div>
      <Text kind="h2" color={C.mutedDark} style={{ marginTop: 18, fontWeight: 700 }}>
        {T.hook.tail}
      </Text>
    </div>
  );
};

const Focus: React.FC = () => {
  const frame = useCurrentFrame();
  const p = fade(frame, F.focus + 10, F.focus + 28);
  const out = 1 - fade(frame, F.cta, F.cta + 10);
  const bars = ease(frame, F.focus + 22, F.focus + 60);
  const lef = subject('Execução Fiscal');
  return (
    <div style={{ position: 'absolute', left: GRID.margin, right: GRID.margin, top: 400, opacity: p * out }}>
      <Label color={C.mint}>{T.focusLabel}</Label>
      <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 240, lineHeight: 0.85, letterSpacing: -12, color: C.mint, marginTop: 26, transform: `translateY(${(1 - p) * 30}px)` }}>
        {formatPct(lef.pct.FAFIPA)}
      </div>
      <Text kind="h1" style={{ marginTop: 16, fontSize: 70 }}>
        na FAFIPA.
      </Text>
      <div style={{ marginTop: 54 }}>
        <BarList
          max={13}
          p={bars}
          fontSize={40}
          barHeight={52}
          gap={26}
          labelWidth={210}
          rows={[
            { label: 'FAFIPA', value: lef.pct.FAFIPA, highlight: true },
            { label: 'Cebraspe', value: lef.pct.CEBRASPE },
          ]}
        />
      </div>
    </div>
  );
};

const Cast: React.FC = () => {
  const frame = useCurrentFrame();
  const shrink = ease(frame, F.rows, F.rows + 30);
  const mentorIn = ease(frame, F.mentorIn, F.mentorIn + 22);
  const studentW = lerp(360, 230, shrink);
  const mentorW = lerp(360, 230, shrink);
  const studentMood = frame < F.focus ? 'confused' : frame < F.focus + 66 ? 'surprised' : 'happy';
  const studentTalking = (frame > 18 && frame < 60) || (frame > F.focus + 70 && frame < F.focus + 96);
  const mentorTalking = (frame > F.mentorIn + 16 && frame < F.mentorIn + 50) || (frame > F.rows + 40 && frame < F.rows + 80) || (frame > F.focus + 8 && frame < F.focus + 62);
  const bottom = GRID.storySafeBottom - 10;
  return (
    <>
      <div style={{ position: 'absolute', left: GRID.margin, top: bottom - (studentW * 460) / 360 }}>
        <Person variant="student" mood={studentMood} talking={studentTalking} width={studentW} lookX={frame > F.mentorIn ? 1 : 0} />
        {frame < F.rows + 20 ? (
          <div style={{ position: 'absolute', left: studentW * 0.62, top: -150, opacity: 1 - fade(frame, F.rows, F.rows + 16) }}>
            <Doubt />
          </div>
        ) : null}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1080 - GRID.margin - mentorW + (1 - mentorIn) * 520,
          top: bottom - (mentorW * 460) / 360,
          opacity: mentorIn,
        }}
      >
        <Person variant="mentor" mood={frame > F.focus + 70 ? 'happy' : 'neutral'} talking={mentorTalking} width={mentorW} blinkOffset={40} lookX={-1} />
      </div>
    </>
  );
};

const Bubbles: React.FC = () => {
  const frame = useCurrentFrame();
  const show = (a: number, b: number) => fade(frame, a, a + 8) * (1 - fade(frame, b - 8, b));
  const big = frame < F.rows;
  return (
    <>
      {show(14, F.mentorIn + 10) > 0 ? (
        <div style={{ position: 'absolute', left: 470, top: 1150 }}>
          <Bubble side="left" p={show(14, F.mentorIn + 10)} width={500}>
            {T.student1}
          </Bubble>
        </div>
      ) : null}
      {show(F.mentorIn + 14, F.rows + 4) > 0 ? (
        <div style={{ position: 'absolute', right: GRID.margin, top: 980 }}>
          <Bubble side="right" tone="accent" p={show(F.mentorIn + 14, F.rows + 4)} width={big ? 560 : 520}>
            {T.mentor1}
          </Bubble>
        </div>
      ) : null}
      {show(F.rows + 36, F.focus) > 0 ? (
        <div style={{ position: 'absolute', right: GRID.margin, top: 1110 }}>
          <Bubble side="right" tone="accent" p={show(F.rows + 36, F.focus)} width={560} size={36}>
            {T.mentor2}
          </Bubble>
        </div>
      ) : null}
      {show(F.focus + 6, F.focus + 68) > 0 ? (
        <div style={{ position: 'absolute', right: GRID.margin, top: 1080 }}>
          <Bubble side="right" tone="accent" p={show(F.focus + 6, F.focus + 68)} width={640} size={34}>
            {T.mentor3}
          </Bubble>
        </div>
      ) : null}
      {show(F.focus + 66, F.cta) > 0 ? (
        <div style={{ position: 'absolute', left: GRID.margin, top: 1110 }}>
          <Bubble side="left" p={show(F.focus + 66, F.cta)} width={540} size={38}>
            {T.student2}
          </Bubble>
        </div>
      ) : null}
    </>
  );
};

const STICKER = { kind: 'question' as const, top: 860, height: 330, text: T.sticker };

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const wipe = ease(frame, F.cta, F.cta + 16);
  const p = fade(frame, F.cta + 10, F.cta + 26);
  return (
    <AbsoluteFill style={{ clipPath: `inset(${(1 - wipe) * 100}% 0 0 0)` }}>
      <Canvas mode="light" padTop={GRID.storySafeTop} padBottom={1920 - GRID.storySafeBottom}>
        <TopBar label={T.label} />
        <div style={{ marginTop: 90, opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
          <Text kind="display" style={{ fontSize: 132, letterSpacing: -6 }}>
            {T.cta.a} <Hl>{T.cta.hl}</Hl>
          </Text>
          <Text kind="lead" color={C.muted} style={{ marginTop: 30, fontWeight: 600 }}>
            {T.ctaSub}
          </Text>
        </div>
        <div style={{ position: 'absolute', left: GRID.margin, right: 360, top: 1230 }}>
          <Label size={17} style={{ lineHeight: 1.5 }}>
            {SOURCE.credit}
          </Label>
        </div>
        <div style={{ position: 'absolute', right: GRID.margin, top: GRID.storySafeBottom - 10 - (230 * 460) / 360 }}>
          <Person variant="mentor" mood="happy" width={230} blinkOffset={40} lookX={-1} />
        </div>
      </Canvas>
    </AbsoluteFill>
  );
};

const GuideLayer: React.FC = () => {
  const frame = useCurrentFrame();
  return <Guide sticker={frame >= F.cta ? STICKER : undefined} />;
};

export const EstudanteBancas: React.FC<{ guide?: boolean; showInstagramUI?: boolean }> = ({ guide, showInstagramUI }) => (
  <MotionOn>
    <Canvas mode="dark" padTop={GRID.storySafeTop} padBottom={1920 - GRID.storySafeBottom}>
      <TopBar label={T.label} />
      <Hook />
      <Rows />
      <Chaos />
      <Focus />
      <Cast />
      <Bubbles />
    </Canvas>
    <Cta />
    {guide ? <GuideLayer /> : null}
    {showInstagramUI ? <InstagramChrome /> : null}
  </MotionOn>
);
