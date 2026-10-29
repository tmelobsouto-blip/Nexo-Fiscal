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

export type StoreTone = { body: string; dark: string; glass: string; sign: string; signText: string; awning: [string, string] };

/** Loja/estabelecimento com placa (MATRIZ, FILIAL...). */
export const Store: React.FC<{ width: number; label: string; t: StoreTone }> = ({ width, label, t }) => (
  <svg width={width} height={(width * 230) / 240} viewBox="0 0 240 230" style={{ display: 'block', overflow: 'visible' }}>
    <rect x={12} y={60} width={216} height={170} fill={t.body} />
    <rect x={0} y={48} width={240} height={16} fill={t.dark} />
    <rect x={34} y={6} width={172} height={44} fill={t.sign} />
    <text x={120} y={36} textAnchor="middle" fontFamily={FONT.mono} fontWeight={600} fontSize={21} letterSpacing={3} fill={t.signText}>
      {label.toUpperCase()}
    </text>
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x={12 + i * 27} y={64} width={27} height={22} fill={t.awning[i % 2]} />
    ))}
    <rect x={30} y={106} width={60} height={52} fill={t.glass} />
    <rect x={150} y={106} width={60} height={52} fill={t.glass} />
    <rect x={58} y={106} width={4} height={52} fill={t.dark} fillOpacity={0.4} />
    <rect x={178} y={106} width={4} height={52} fill={t.dark} fillOpacity={0.4} />
    <rect x={96} y={140} width={48} height={90} fill={t.dark} />
    <rect x={132} y={182} width={6} height={12} fill={t.glass} />
  </svg>
);

/** Caixa de mercadoria com fita. */
export const Crate: React.FC<{ width: number; dark?: string; tape?: string }> = ({ width, dark = C.ink, tape = C.green }) => (
  <svg width={width} height={(width * 90) / 100} viewBox="0 0 100 90" style={{ display: 'block', overflow: 'visible' }}>
    <rect x={3} y={3} width={94} height={84} fill={C.paper} stroke={dark} strokeWidth={5} />
    <rect x={42} y={3} width={16} height={84} fill={tape} />
    <rect x={12} y={60} width={22} height={14} fill={dark} fillOpacity={0.25} />
  </svg>
);

/** Caminhão-baú. `label` escreve na lateral do baú; sem label, mostra uma caixa. */
export const Truck: React.FC<{ width: number; cargo?: string; cab?: string; dark?: string; glass?: string; label?: string; moving?: boolean }> = ({
  width,
  cargo = C.white,
  cab = C.mint,
  dark = C.ink,
  glass = C.lineDark,
  label,
  moving,
}) => (
  <svg width={width} height={(width * 190) / 360} viewBox="0 0 360 190" style={{ display: 'block', overflow: 'visible' }}>
    {moving
      ? [40, 70, 100].map((y, i) => <rect key={y} x={-70 + i * 14} y={y} width={52 - i * 10} height={6} fill={dark} fillOpacity={0.5} />)
      : null}
    <rect x={0} y={18} width={232} height={122} fill={cargo} />
    <rect x={0} y={18} width={232} height={8} fill={dark} fillOpacity={0.15} />
    {label ? (
      <>
        <rect x={20} y={56} width={192} height={46} fill={dark} />
        <text x={116} y={86} textAnchor="middle" fontFamily={FONT.mono} fontWeight={600} fontSize={19} letterSpacing={2.4} fill={C.mint}>
          {label.toUpperCase()}
        </text>
      </>
    ) : (
      <g transform="translate(84 40)">
        <rect x={0} y={0} width={64} height={58} fill={C.paper} stroke={dark} strokeWidth={4} />
        <rect x={26} y={0} width={12} height={58} fill={C.green} />
      </g>
    )}
    <polygon points="238,56 300,56 338,98 344,140 238,140" fill={cab} />
    <polygon points="252,68 296,68 322,98 252,98" fill={glass} />
    <rect x={336} y={124} width={16} height={16} fill={dark} />
    <rect x={0} y={138} width={350} height={12} fill={dark} />
    {[58, 172, 290].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy={156} r={27} fill={dark} />
        <circle cx={cx} cy={156} r={10} fill={glass} />
      </g>
    ))}
  </svg>
);

/** Chave liga/desliga (opção do contribuinte). */
export const Toggle: React.FC<{ width: number; on: boolean; dark?: string }> = ({ width, on, dark = C.ink }) => (
  <svg width={width} height={(width * 100) / 220} viewBox="0 0 220 100" style={{ display: 'block' }}>
    <rect x={2} y={10} width={216} height={80} fill={on ? C.green : C.lineDark} stroke={dark} strokeWidth={4} />
    <rect x={on ? 128 : 12} y={20} width={80} height={60} fill={C.white} stroke={dark} strokeWidth={4} />
    <text x={on ? 64 : 160} y={62} textAnchor="middle" fontFamily={FONT.sans} fontWeight={900} fontSize={30} fill={C.white}>
      {on ? 'SIM' : 'NÃO'}
    </text>
  </svg>
);

/** Tíquete de crédito com marca de mantido. */
export const CreditTag: React.FC<{ width: number; label: string; bg: string; dark?: string }> = ({ width, label, bg, dark = C.ink }) => (
  <svg width={width} height={(width * 110) / 220} viewBox="0 0 220 110" style={{ display: 'block' }}>
    <rect x={0} y={0} width={220} height={110} fill={C.paper} stroke={dark} strokeWidth={4} />
    <circle cx={0} cy={55} r={14} fill={bg} />
    <circle cx={220} cy={55} r={14} fill={bg} />
    <line x1={160} y1={8} x2={160} y2={102} stroke={dark} strokeWidth={3} strokeDasharray="8 7" />
    <text x={26} y={66} fontFamily={FONT.mono} fontWeight={600} fontSize={22} letterSpacing={2.6} fill={dark}>
      {label.toUpperCase()}
    </text>
    <path d="M174 56 l12 12 l20 -24" fill="none" stroke={C.green} strokeWidth={8} strokeLinecap="square" />
  </svg>
);

/** Capa do material em pé, com o bloco de páginas à direita. */
export const Book: React.FC<{ width: number; brand: string; a: string; b: string; author: string }> = ({ width, brand, a, b, author }) => (
  <svg width={width} height={(width * 400) / 300} viewBox="0 0 300 400" style={{ display: 'block', overflow: 'visible' }}>
    <polygon points="272,8 292,18 292,398 272,392" fill={C.paper} stroke={C.ink} strokeWidth={3} />
    {[60, 120, 180, 240, 300, 360].map((y) => (
      <line key={y} x1={276} y1={y} x2={290} y2={y + 4} stroke={C.line} strokeWidth={2} />
    ))}
    <rect x={0} y={0} width={272} height={392} fill={C.ink} stroke={C.lineDark} strokeWidth={3} />
    <rect x={14} y={16} width={6} height={360} fill={C.mint} />
    <text x={36} y={42} fontFamily={FONT.sans} fontWeight={800} fontSize={15} fill={C.white}>
      {brand}
    </text>
    <rect x={36} y={54} width={212} height={2} fill={C.lineDark} />
    <text x={36} y={184} fontFamily={FONT.sans} fontWeight={900} fontSize={33} letterSpacing={-1.2} fill={C.white}>
      {a}
    </text>
    <text x={36} y={222} fontFamily={FONT.sans} fontWeight={900} fontSize={33} letterSpacing={-1.2} fill={C.mint}>
      {b}
    </text>
    {[246, 260, 274].map((y, i) => (
      <rect key={y} x={36} y={y} width={[196, 180, 120][i]} height={6} fill={C.lineDark} />
    ))}
    <rect x={36} y={338} width={212} height={2} fill={C.lineDark} />
    <text x={36} y={362} fontFamily={FONT.sans} fontWeight={700} fontSize={14} fill={C.white}>
      {author}
    </text>
  </svg>
);
