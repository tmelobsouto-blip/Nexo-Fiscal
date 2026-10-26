import React from 'react';
import { C, FONT } from './tokens';
import { useMode, useTone } from './ui';

const pct = (v: number) => `${v.toFixed(1).replace('.', ',')}%`;
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export type BarRow = { label: string; value: number; highlight?: boolean; muted?: boolean; note?: string; display?: string };

/** Horizontal bars on one shared scale; optional reference line (e.g. média das outras bancas). */
export const BarList: React.FC<{
  rows: BarRow[];
  max: number;
  p?: number;
  reference?: { value: number; label: string };
  labelWidth?: number;
  barHeight?: number;
  gap?: number;
  fontSize?: number;
}> = ({ rows, max, p = 1, reference, labelWidth = 230, barHeight = 34, gap = 22, fontSize = 34 }) => {
  const t = useTone();
  const mode = useMode();
  const hi = mode === 'dark' ? C.mint : C.green;
  const base = mode === 'dark' ? '#3C4A43' : '#AEBBB3';
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap }}>
      {rows.map((r, i) => {
        const grow = clamp(p * rows.length * 0.6 - i * 0.35);
        return (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span
              style={{
                width: labelWidth,
                flexShrink: 0,
                fontFamily: FONT.sans,
                fontWeight: r.highlight ? 800 : 600,
                fontSize: fontSize * 0.82,
                letterSpacing: -0.4,
                color: r.muted ? t.sub : r.highlight ? hi : t.fg,
              }}
            >
              {r.label}
            </span>
            <div style={{ flex: 1, position: 'relative', height: barHeight }}>
              <div style={{ position: 'absolute', inset: 0, background: t.rule, opacity: 0.55 }} />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${(r.value / max) * 100 * grow}%`,
                  background: r.muted
                    ? `repeating-linear-gradient(45deg, ${base} 0 6px, transparent 6px 12px)`
                    : r.highlight
                      ? hi
                      : base,
                }}
              />
            </div>
            <span
              style={{
                width: 150,
                flexShrink: 0,
                textAlign: 'right',
                fontFamily: FONT.sans,
                fontWeight: 900,
                fontSize,
                letterSpacing: -1.2,
                fontVariantNumeric: 'tabular-nums',
                color: r.muted ? t.sub : r.highlight ? hi : t.fg,
                opacity: clamp(grow * 1.5),
              }}
            >
              {r.display ?? pct(r.value)}
            </span>
          </div>
        );
      })}
      {reference ? (
        <div
          style={{
            position: 'absolute',
            top: -18,
            bottom: -18,
            left: `calc(${labelWidth + 18}px + (100% - ${labelWidth + 186}px) * ${reference.value / max})`,
            borderLeft: `3px dashed ${t.fg}`,
            opacity: clamp(p * 2 - 1),
          }}
        >
          <span style={{ position: 'absolute', top: -34, left: 8, whiteSpace: 'nowrap', fontFamily: FONT.mono, fontSize: 20, fontWeight: 600, letterSpacing: 1.6, color: t.fg, textTransform: 'uppercase' }}>
            {reference.label}
          </span>
        </div>
      ) : null}
    </div>
  );
};

/** Subject × bank matrix; cell color scales with the value, like the incidence panel. */
export const Heatmap: React.FC<{
  cols: string[];
  rows: Array<{ label: string; values: number[] }>;
  max: number;
  highlightCol?: number;
  highlightRow?: number;
  p?: number;
  cellH?: number;
}> = ({ cols, rows, max, highlightCol, highlightRow, p = 1, cellH = 76 }) => {
  const t = useTone();
  const mode = useMode();
  const hi = mode === 'dark' ? C.mint : C.green;
  const fill = (v: number) => {
    const k = Math.pow(clamp(v / max), 0.8);
    return mode === 'dark' ? `rgba(54,205,137,${0.06 + k * 0.62})` : `rgba(23,107,73,${0.05 + k * 0.7})`;
  };
  const grid = `190px repeat(${cols.length}, 1fr)`;
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: grid, gap: 6, marginBottom: 10 }}>
        <span />
        {cols.map((c, j) => (
          <span key={c} style={{ textAlign: 'center', fontFamily: FONT.mono, fontSize: 16, fontWeight: 700, letterSpacing: 0.6, color: j === highlightCol ? hi : t.sub }}>
            {c}
          </span>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'grid', gridTemplateColumns: grid, gap: 6, marginBottom: 6, opacity: clamp(p * rows.length - i * 0.6) }}>
          <span
            style={{
              alignSelf: 'center',
              fontFamily: FONT.sans,
              fontWeight: i === highlightRow ? 800 : 600,
              fontSize: 22,
              lineHeight: 1.1,
              letterSpacing: -0.3,
              color: i === highlightRow ? hi : t.fg,
            }}
          >
            {r.label}
          </span>
          {r.values.map((v, j) => {
            const on = j === highlightCol;
            return (
              <div
                key={j}
                style={{
                  height: cellH,
                  background: fill(v),
                  outline: on ? `3px solid ${hi}` : i === highlightRow ? `2px solid ${t.fg}` : 'none',
                  outlineOffset: -3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.sans,
                  fontWeight: 800,
                  fontSize: 24,
                  fontVariantNumeric: 'tabular-nums',
                  color: v / max > 0.55 ? (mode === 'dark' ? C.ink : C.white) : t.fg,
                }}
              >
                {v.toFixed(1).replace('.', ',')}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const formatPct = pct;
