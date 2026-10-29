import React from 'react';
import { C, FONT } from './tokens';

// Ilustrações planas da marca: blocos de cor dos tokens, sem sombra nem degradê.
export type CraneTone = { body: string; boom: string; dark: string; glass: string; operator?: boolean };

/** Guindaste sobre caminhão, em blocos planos. `operator` põe alguém na cabine. */
export const Crane: React.FC<{ width: number; t: CraneTone; ground?: boolean }> = ({ width, t, ground }) => (
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
export const Operator: React.FC<{ height: number }> = ({ height }) => (
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
export const KeyArt: React.FC<{ width: number; color: string; tag: string }> = ({ width, color, tag }) => (
  <svg width={width} height={(width * 120) / 220} viewBox="0 0 220 120" style={{ display: 'block' }}>
    <circle cx={52} cy={60} r={30} fill="none" stroke={color} strokeWidth={14} />
    <rect x={80} y={53} width={112} height={14} fill={color} />
    <rect x={160} y={67} width={12} height={22} fill={color} />
    <rect x={180} y={67} width={12} height={30} fill={color} />
    <line x1={40} y1={36} x2={28} y2={8} stroke={color} strokeWidth={3} />
    <rect x={8} y={0} width={30} height={20} fill={tag} transform="rotate(-18 23 10)" />
  </svg>
);
