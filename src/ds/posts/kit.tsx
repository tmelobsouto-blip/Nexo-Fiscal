import React from 'react';
import { C, FONT, Mode } from '../tokens';
import { Canvas, Footer, TopBar } from '../ui';

// Peças de composição dos posts 1080 × 1350 (direções A/B/C e carrosséis derivados).
export const M = 88;
export const W = 1080 - M * 2;

export const Big: React.FC<{ size: number; color?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ size, color, style, children }) => (
  <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: size, lineHeight: 0.94, letterSpacing: -size * 0.045, color, ...style }}>{children}</div>
);

export const Box: React.FC<{ x: number; y: number; w?: number; h?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ x, y, w, h, style, children }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, boxSizing: 'border-box', ...style }}>{children}</div>
);

export const Chip: React.FC<{ bg: string; fg: string; size: number; children: React.ReactNode }> = ({ bg, fg, size, children }) => (
  <span style={{ background: bg, color: fg, padding: '0 0.14em', borderRadius: 4, whiteSpace: 'nowrap', fontSize: size }}>{children}</span>
);

export const Mono: React.FC<{ color: string; size?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ color, size = 21, style, children }) => (
  <div style={{ fontFamily: FONT.mono, fontWeight: 500, fontSize: size, letterSpacing: size * 0.12, textTransform: 'uppercase', lineHeight: 1.35, color, ...style }}>{children}</div>
);

/** Frame: TopBar e Footer sempre por cima do fundo; o conteúdo vem posicionado. */
/** Sem `label`, o slide sai limpo: sem TopBar, só o rodapé. */
export const Frame: React.FC<{ mode: Mode; label?: string; n?: number; total?: number; action?: string; bg?: React.ReactNode; children: React.ReactNode }> = ({
  mode,
  label,
  n,
  total,
  action,
  bg,
  children,
}) => (
  <Canvas mode={mode}>
    {bg}
    {label ? (
      <div style={{ position: 'relative' }}>
        <TopBar label={label} index={n} total={total} />
      </div>
    ) : null}
    <div style={{ flex: 1 }} />
    <div style={{ position: 'relative' }}>
      <Footer action={action} />
    </div>
    {children}
  </Canvas>
);

export const Mark2: React.FC<{ kind: 'yes' | 'no'; color: string; size?: number }> = ({ kind, color, size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="square">
    {kind === 'yes' ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M6 6l12 12M18 6L6 18" />}
  </svg>
);

export const Badge: React.FC<{ x: number; y: number; bg: string; fg: string; children: React.ReactNode }> = ({ x, y, bg, fg, children }) => (
  <Box x={x} y={y} style={{ background: bg, borderRadius: 4, padding: '12px 18px' }}>
    <Mono color={fg} size={22}>
      {children}
    </Mono>
  </Box>
);

export const Block: React.FC<{ x: number; y: number; w: number; h: number; bg?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ x, y, w, h, bg = C.green, style, children }) => (
  <Box x={x} y={y} w={w} h={h} style={{ background: bg, borderRadius: 4, overflow: 'hidden', ...style }}>
    {children}
  </Box>
);

// Mockup do feed (fora da arte): miniaturas e ícones do Instagram.
export const Scaled: React.FC<{ S: React.FC; w: number }> = ({ S, w }) => {
  const s = w / 1080;
  return (
    <div style={{ position: 'relative', width: w, height: 1350 * s, overflow: 'hidden', borderRadius: 4, flexShrink: 0 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1350, transform: `scale(${s})`, transformOrigin: '0 0' }}>
        <S />
      </div>
    </div>
  );
};

export const IgIcon: React.FC<{ d: string; color: string }> = ({ d, color }) => (
  <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinejoin="round" strokeLinecap="round">
    <path d={d} />
  </svg>
);

export const IG = {
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  comment: 'M20 11.5a8 8 0 1 1-3.2-6.4A8 8 0 0 1 20 11.5zM20 20l-3-2.6',
  send: 'M21 4L3 11l7 3 3 7 8-17zM10 14l11-10',
  save: 'M6 3h12v18l-6-4.5L6 21z',
};
