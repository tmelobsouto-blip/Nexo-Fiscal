import React from 'react';
import { useCurrentFrame } from 'remotion';
import { C, FONT } from './tokens';

export type Mood = 'confused' | 'neutral' | 'surprised' | 'happy';

const HEAD = C.surface;
const INK = C.ink;

/** Flat two-tone character: student (neutral body) or mentor (brand green, glasses). */
export const Person: React.FC<{
  variant: 'student' | 'mentor';
  mood?: Mood;
  talking?: boolean;
  width?: number;
  blinkOffset?: number;
  lookX?: number;
}> = ({ variant, mood = 'neutral', talking = false, width = 320, blinkOffset = 0, lookX = 0 }) => {
  const frame = useCurrentFrame();
  const cycle = (frame + blinkOffset) % 84;
  const blink = cycle < 4 ? 0.15 : 1;
  const mouthOpen = talking ? 6 + Math.abs(Math.sin(frame / 2.6)) * 16 : 0;
  const body = variant === 'mentor' ? C.green : C.mutedDark;
  const eyeY = mood === 'surprised' ? 168 : 175;
  const eyeR = mood === 'surprised' ? 13 : 11;
  const lx = Math.max(-1, Math.min(1, lookX)) * 8;

  const mouth = () => {
    if (talking) return <ellipse cx={180} cy={225} rx={22} ry={mouthOpen / 2 + 3} fill={INK} />;
    switch (mood) {
      case 'confused':
        return <path d="M152 228 q10 -10 20 0 t20 0" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />;
      case 'surprised':
        return <ellipse cx={180} cy={228} rx={14} ry={18} fill={INK} />;
      case 'happy':
        return <path d="M150 218 q30 30 60 0" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
      default:
        return <path d="M158 224 h44" stroke={INK} strokeWidth={7} strokeLinecap="round" />;
    }
  };

  const brows =
    mood === 'confused' ? (
      <>
        <path d="M126 140 l34 -10" stroke={INK} strokeWidth={8} strokeLinecap="round" />
        <path d="M200 130 l34 10" stroke={INK} strokeWidth={8} strokeLinecap="round" />
      </>
    ) : mood === 'surprised' ? (
      <>
        <path d="M128 128 q18 -14 36 0" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M196 128 q18 -14 36 0" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
      </>
    ) : null;

  return (
    <svg width={width} height={(width * 460) / 360} viewBox="0 0 360 460" style={{ display: 'block', overflow: 'visible' }}>
      <path d="M30 460 C30 330 105 288 180 288 C255 288 330 330 330 460 Z" fill={body} />
      {variant === 'mentor' ? (
        <path d="M140 292 L180 352 L220 292" stroke={C.mint} strokeWidth={10} fill="none" strokeLinejoin="round" />
      ) : (
        <path d="M110 300 L230 460" stroke={INK} strokeOpacity={0.35} strokeWidth={14} />
      )}
      <rect x={160} y={250} width={40} height={44} fill={HEAD} />
      <circle cx={180} cy={170} r={100} fill={HEAD} />
      {variant === 'student' ? (
        <path d="M80 170 C76 92 128 64 182 64 C242 64 286 100 280 168 C262 128 226 110 186 114 C146 116 106 134 80 170 Z" fill={INK} />
      ) : (
        <path d="M84 150 C90 86 136 66 184 66 C236 66 276 92 278 146 C240 118 200 108 150 118 C118 124 98 136 84 150 Z" fill={INK} />
      )}
      {brows}
      <g transform={`translate(${lx} 0)`}>
        <ellipse cx={145} cy={eyeY} rx={eyeR} ry={eyeR * blink} fill={INK} />
        <ellipse cx={215} cy={eyeY} rx={eyeR} ry={eyeR * blink} fill={INK} />
      </g>
      {variant === 'mentor' ? (
        <g stroke={INK} strokeWidth={6} fill="none">
          <rect x={116} y={150} width={58} height={46} rx={4} />
          <rect x={186} y={150} width={58} height={46} rx={4} />
          <path d="M174 170 h12" />
        </g>
      ) : null}
      {mouth()}
    </svg>
  );
};

/** Speech bubble with a tail toward the speaker. */
export const Bubble: React.FC<{
  children: React.ReactNode;
  side: 'left' | 'right';
  tone?: 'light' | 'accent';
  p?: number;
  width?: number;
  size?: number;
}> = ({ children, side, tone = 'light', p = 1, width = 560, size = 40 }) => {
  const bg = tone === 'accent' ? C.mint : C.white;
  return (
    <div
      style={{
        position: 'relative',
        width,
        background: bg,
        color: C.ink,
        padding: '24px 30px',
        borderRadius: 4,
        fontFamily: FONT.sans,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.16,
        letterSpacing: -0.8,
        opacity: Math.min(1, p * 2),
        transform: `scale(${0.85 + 0.15 * p})`,
        transformOrigin: side === 'left' ? 'bottom left' : 'bottom right',
      }}
    >
      {children}
      <svg
        width={44}
        height={30}
        viewBox="0 0 44 30"
        style={{ position: 'absolute', bottom: -28, [side === 'left' ? 'left' : 'right']: 48, transform: side === 'right' ? 'scaleX(-1)' : undefined }}
      >
        <path d="M0 0 H44 L6 30 Z" fill={bg} />
      </svg>
    </div>
  );
};

/** Floating question marks above a confused head. */
export const Doubt: React.FC<{ count?: number; color?: string }> = ({ count = 3, color = C.mint }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'relative', width: 240, height: 200 }}>
      {Array.from({ length: count }).map((_, i) => {
        const t = ((frame + i * 18) % 54) / 54;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: 40 + i * 70,
              bottom: t * 120,
              fontFamily: FONT.sans,
              fontWeight: 900,
              fontSize: 70 + i * 10,
              color,
              opacity: Math.sin(t * Math.PI),
              transform: `rotate(${(i - 1) * 12}deg)`,
            }}
          >
            ?
          </span>
        );
      })}
    </div>
  );
};
