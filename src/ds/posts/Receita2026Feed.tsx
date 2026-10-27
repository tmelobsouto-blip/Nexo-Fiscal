import React from 'react';
import { RECEITA_2026_FEED as P } from '../copy';
import { C, FONT, Mode, tone } from '../tokens';
import { Canvas, Fill, Footer, Hl, Label, Rule, SplitBar, Tag, Text, TopBar } from '../ui';

// Seis layouts de post único; cada um sai em claro (L) e escuro (D).
type Props = { mode: Mode };

const Big: React.FC<{ size: number; color?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ size, color, style, children }) => (
  <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: size, lineHeight: 0.88, letterSpacing: -size * 0.045, textTransform: 'uppercase', color, whiteSpace: 'nowrap', ...style }}>
    {children}
  </div>
);

// Quebra só entre palavras inteiras (nunca em “Auditor-/Fiscal”).
const Words: React.FC<{ text: string; sep?: string }> = ({ text, sep = ' ' }) => (
  <>
    {text.split(sep).map((w, i) => (
      <React.Fragment key={i}>
        {i ? sep : null}
        <span style={{ whiteSpace: 'nowrap' }}>{w}</span>
      </React.Fragment>
    ))}
  </>
);

const Meta: React.FC<{ mode: Mode; src: readonly string[] }> = ({ mode, src }) => (
  <Label color={tone(mode).sub} style={{ marginTop: 40, marginBottom: 28, lineHeight: 1.5 }}>
    {[P.updated, ...src.map((x, i) => (i ? x : `Fonte: ${x}`))].map((line) => (
      <div key={line}>
        <Words text={line} sep=" · " />
      </div>
    ))}
  </Label>
);

const Check: React.FC<{ color: string; size?: number }> = ({ color, size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="square" style={{ flexShrink: 0 }}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/** 01 · Manchete: o nome do concurso domina, o fato vem embaixo. */
const Headline: React.FC<Props> = ({ mode }) => {
  const t = tone(mode);
  const x = P.headline;
  return (
    <Canvas mode={mode}>
      <TopBar label={P.label} />
      <Fill justify="flex-end">
        <div>
          <Tag>{x.kicker}</Tag>
        </div>
        <div style={{ marginTop: 44 }}>
          {x.title.map((w) => (
            <Big key={w} size={196} color={t.fg} style={{ marginBottom: 6 }}>
              {w}
            </Big>
          ))}
          <Big size={196} color={t.accent}>
            {x.year}
          </Big>
        </div>
        <Rule strong style={{ marginTop: 48 }} />
        <Text kind="h2" style={{ marginTop: 34, fontSize: 60, letterSpacing: -2.2 }}>
          {x.lead}
        </Text>
        <Text kind="lead" color={t.sub} style={{ marginTop: 20, fontWeight: 500 }}>
          {x.sub}
        </Text>
      </Fill>
      <Meta mode={mode} src={x.src} />
      <Footer action={x.action} />
    </Canvas>
  );
};

/** 02 · Número: 146 e a divisão por cargo na mesma escala. */
const Split: React.FC<Props> = ({ mode }) => {
  const t = tone(mode);
  const x = P.split;
  const [a, b] = x.parts;
  return (
    <Canvas mode={mode}>
      <TopBar label={P.label} />
      <Fill>
        <Label color={t.accent} size={26}>
          {x.kicker}
        </Label>
        <Big size={400} color={t.fg} style={{ marginTop: 20, marginLeft: -12 }}>
          {x.n}
        </Big>
        <div style={{ marginTop: 56 }}>
          <SplitBar
            height={60}
            parts={[
              { value: a.n, label: String(a.n), caption: a.role, tone: 'green' },
              { value: b.n, label: String(b.n), caption: b.role, tone: 'neutral' },
            ]}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          {[a, b].map((p, i) => (
            <div key={p.role} style={{ textAlign: i ? 'right' : 'left' }}>
              <Big size={110} color={i ? t.fg : t.accent}>
                {p.n}
              </Big>
              <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 36, letterSpacing: -1, color: t.fg, marginTop: 12 }}>{p.role}</div>
            </div>
          ))}
        </div>
        <Rule style={{ marginTop: 56 }} />
        <Text kind="lead" color={t.sub} style={{ marginTop: 30, fontWeight: 500 }}>
          {x.note}
        </Text>
      </Fill>
      <Meta mode={mode} src={x.src} />
      <Footer action={x.action} />
    </Canvas>
  );
};

/** 03 · Linha do tempo: o que já aconteceu, a previsão e o prazo, com marcadores diferentes. */
const Timeline: React.FC<Props> = ({ mode }) => {
  const t = tone(mode);
  const x = P.timeline;
  return (
    <Canvas mode={mode}>
      <TopBar label={P.label} />
      <Text kind="display" style={{ marginTop: 64 }}>
        {x.title}
      </Text>
      <Fill>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 232, top: 24, bottom: 60, width: 4, background: t.rule }} />
          {x.steps.map((s) => {
            const forecast = s.kind === 'forecast';
            const deadline = s.kind === 'deadline';
            return (
              <div key={s.d} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 34 }}>
                <div style={{ width: 200, paddingTop: 10 }}>
                  <Label color={forecast ? t.sub : t.accent} size={24}>
                    {s.d}
                  </Label>
                </div>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    marginLeft: 14,
                    boxSizing: 'border-box',
                    position: 'relative',
                    background: forecast ? t.bg : deadline ? t.fg : t.accent,
                    border: forecast ? `4px dashed ${t.fg}` : 'none',
                  }}
                />
                <div style={{ marginLeft: 34 }}>
                  <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, lineHeight: 1.1, letterSpacing: -1.2, color: forecast ? t.sub : t.fg }}>{s.l}</div>
                  <Text kind="small" color={t.sub} style={{ marginTop: 6 }}>
                    {s.s}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </Fill>
      <Meta mode={mode} src={x.src} />
      <Footer action={x.action} />
    </Canvas>
  );
};

/** 04 · Já se sabe × ainda falta: separa fato confirmado do que depende do edital. */
const Facts: React.FC<Props> = ({ mode }) => {
  const t = tone(mode);
  const x = P.facts;
  const item = (txt: string, done: boolean) => (
    <div key={txt} style={{ display: 'flex', gap: 22, alignItems: 'flex-start', marginTop: 24 }}>
      {done ? (
        <div style={{ width: 44, height: 44, flexShrink: 0, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check color={t.bg} />
        </div>
      ) : (
        <div style={{ width: 44, height: 44, flexShrink: 0, boxSizing: 'border-box', border: `3px dashed ${t.sub}` }} />
      )}
      <div style={{ fontFamily: FONT.sans, fontWeight: done ? 700 : 600, fontSize: 36, lineHeight: 1.2, letterSpacing: -0.8, color: done ? t.fg : t.sub, paddingTop: 2 }}>
        <Words text={txt} />
      </div>
    </div>
  );
  return (
    <Canvas mode={mode}>
      <TopBar label={P.label} />
      <Fill justify="space-evenly">
        <div>
          <Text kind="h1">
            <Hl marker>{x.yes}</Hl>
          </Text>
          {x.yesItems.map((s) => item(s, true))}
        </div>
        <div>
          <Rule strong />
          <Text kind="h1" color={t.sub} style={{ marginTop: 40 }}>
            {x.no}
          </Text>
          {x.noItems.map((s) => item(s, false))}
        </div>
      </Fill>
      <Meta mode={mode} src={x.src} />
      <Footer action={x.action} />
    </Canvas>
  );
};

/** 05 · Ficha técnica: tabela de consulta, para salvar. */
const Sheet: React.FC<Props> = ({ mode }) => {
  const t = tone(mode);
  const x = P.sheet;
  return (
    <Canvas mode={mode}>
      <TopBar label={P.label} />
      <Text kind="display" style={{ marginTop: 64 }}>
        {x.title}
      </Text>
      <Fill>
        {x.rows.map(([k, v], i) => (
          <React.Fragment key={k}>
            {i ? <Rule /> : <Rule strong />}
            <div style={{ display: 'flex', alignItems: 'baseline', padding: '20px 0' }}>
              <div style={{ width: 300, flexShrink: 0 }}>
                <Label color={t.accent}>{k}</Label>
              </div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 33, lineHeight: 1.22, letterSpacing: -0.6, color: t.fg }}>
                <Words text={v} />
              </div>
            </div>
          </React.Fragment>
        ))}
        <Rule strong />
      </Fill>
      <Meta mode={mode} src={x.src} />
      <Footer action={x.action} />
    </Canvas>
  );
};

/** 06 · Pergunta: chamada à preparação, com três números de apoio. */
const Question: React.FC<Props> = ({ mode }) => {
  const t = tone(mode);
  const x = P.question;
  return (
    <Canvas mode={mode}>
      <TopBar label={P.label} />
      <Fill>
        <Text kind="lead" color={t.sub} style={{ fontWeight: 600, fontSize: 44 }}>
          {x.a}
        </Text>
        <Text kind="display" style={{ fontSize: 150, letterSpacing: -7, marginTop: 30, lineHeight: 0.9 }}>
          {x.b}
          <br />
          <Hl>{x.hl}</Hl>
        </Text>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 90 }}>
          {x.stats.map((s) => (
            <div key={s.n} style={{ borderTop: `3px solid ${t.fg}`, paddingTop: 22 }}>
              <Big size={70} color={t.accent}>
                {s.n}
              </Big>
              <Text kind="small" color={t.sub} style={{ marginTop: 12 }}>
                {s.l}
              </Text>
            </div>
          ))}
        </div>
      </Fill>
      <Meta mode={mode} src={x.src} />
      <Footer action={x.action} />
    </Canvas>
  );
};

const LAYOUTS: { n: string; role: string; C: React.FC<Props> }[] = [
  { n: '01', role: 'manchete', C: Headline },
  { n: '02', role: 'vagas', C: Split },
  { n: '03', role: 'linha-do-tempo', C: Timeline },
  { n: '04', role: 'ja-se-sabe', C: Facts },
  { n: '05', role: 'ficha', C: Sheet },
  { n: '06', role: 'pergunta', C: Question },
];

export const RECEITA_2026_POSTS = LAYOUTS.flatMap(({ n, role, C: Layout }) =>
  (['light', 'dark'] as const).map((mode) => ({
    id: `DS-RF26-${n}${mode === 'light' ? 'L' : 'D'}-${role}`,
    component: () => <Layout mode={mode} />,
  })),
);
