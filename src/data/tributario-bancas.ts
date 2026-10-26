// Transcrito do painel "Incidência por banca" (print enviado em 26/10/2026). Valores em % das questões
// de Direito Tributário de cada banca. Não edite números sem nova fonte.

export type BankId = 'CESGRANRIO' | 'FCC' | 'FGV' | 'FAFIPA' | 'CEBRASPE' | 'FUNDATEC' | 'FEPESE';

export const SOURCE = {
  panel: 'Incidência por banca',
  discipline: 'Direito Tributário',
  window: 'últimos 5 anos',
  updated: '03/10/2026',
  subjects: 92,
  // VALIDAR: nome público da base/levantamento para citar no vídeo.
  credit: 'Questões de Direito Tributário · 7 bancas · últimos 5 anos · atualizado em 03/10/2026',
};

export const BANKS: Array<{ id: BankId; name: string; questions: number; first: string; smallSample?: boolean; target?: boolean }> = [
  { id: 'CESGRANRIO', name: 'Cesgranrio', questions: 13, first: 'Princípios Tributários', smallSample: true },
  { id: 'FCC', name: 'FCC', questions: 265, first: 'Extinção do Crédito Tributário' },
  { id: 'FGV', name: 'FGV', questions: 912, first: 'Princípios Tributários' },
  { id: 'FAFIPA', name: 'FAFIPA', questions: 196, first: 'Lei nº 6.830/1980 · Execução Fiscal', target: true },
  { id: 'CEBRASPE', name: 'Cebraspe', questions: 1004, first: 'Princípios Tributários' },
  { id: 'FUNDATEC', name: 'Fundatec', questions: 341, first: 'Princípios Tributários' },
  { id: 'FEPESE', name: 'FEPESE', questions: 133, first: 'Contribuições de Melhoria' },
];

type Row = { block: string; subject: string; short: string; pct: Record<BankId, number> };
const row = (block: string, subject: string, short: string, v: number[]): Row => ({
  block,
  subject,
  short,
  pct: { CESGRANRIO: v[0], FCC: v[1], FGV: v[2], FAFIPA: v[3], CEBRASPE: v[4], FUNDATEC: v[5], FEPESE: v[6] },
});

// Ordem do painel ("Assunto · por média"). A linha "Contribuições de Melhoria" está cortada no print e ficou de fora.
export const SUBJECTS: Row[] = [
  row('B1', 'Princípios Tributários', 'Princípios', [15.4, 7.2, 5.9, 9.7, 7.3, 6.5, 3.0]),
  row('–', 'Lei nº 6.830/1980 - Lei de Execução Fiscal', 'Execução Fiscal', [15.4, 0.8, 2.6, 12.2, 2.1, 5.9, 3.8]),
  row('B1', 'Extinção do Crédito Tributário', 'Extinção do Crédito', [0.0, 9.1, 5.6, 3.1, 3.5, 4.7, 6.0]),
  row('B1', 'Lançamento e Constituição do Crédito Tributário', 'Lançamento', [7.7, 4.9, 2.9, 5.6, 2.0, 4.4, 3.8]),
  row('B1', 'Responsabilidade Tributária', 'Responsabilidade', [0.0, 5.7, 4.6, 7.7, 4.8, 3.5, 4.5]),
  row('B1', 'Repartição da Competência Tributária', 'Competência', [7.7, 1.5, 1.2, 7.1, 1.7, 4.4, 3.8]),
  row('B2', 'Taxas', 'Taxas', [7.7, 3.0, 0.8, 2.6, 1.5, 2.9, 3.8]),
  row('B2', 'Imunidades Tributárias', 'Imunidades', [7.7, 0.8, 2.7, 1.5, 3.2, 2.1, 2.3]),
  row('–', 'Jurisprudência dos Tribunais Superiores sobre a Lei nº 6.830/1980', 'Jurisprudência LEF', [7.7, 1.5, 2.3, 0.5, 2.6, 3.5, 0.8]),
  row('B2', 'Repartição Constitucional de Receitas Tributárias', 'Repartição de Receitas', [0.0, 1.1, 4.2, 2.6, 2.2, 2.6, 6.0]),
  row('B3', 'Conceito de Tributo', 'Conceito de Tributo', [7.7, 2.3, 0.9, 1.5, 1.8, 1.5, 0.8]),
  row('B1', 'Suspensão da Exigibilidade do Crédito Tributário', 'Suspensão da Exigibilidade', [0.0, 1.9, 1.5, 5.6, 1.7, 2.3, 2.3]),
  row('B1', 'Tópicos Mesclados de Extinção, Exclusão e Suspensão do Crédito Tributário', 'Tópicos mesclados', [0.0, 3.4, 1.0, 4.1, 1.6, 1.8, 3.0]),
  row('–', 'Jurisprudência dos Tribunais Superiores sobre Tópicos Mesclados e/ou Outros Assuntos', 'Jurisprudência (outros)', [7.7, 0.8, 1.1, 0.0, 1.6, 1.2, 2.3]),
  row('B3', 'A Natureza Jurídica Específica dos Tributos', 'Natureza Jurídica', [7.7, 1.5, 0.0, 1.5, 1.2, 0.0, 2.3]),
  row('B2', 'Disposições Gerais sobre Obrigação Tributária', 'Obrigação Tributária', [0.0, 2.3, 1.3, 3.6, 1.2, 4.1, 1.5]),
  row('B1', 'Sujeito: Ativo e Passivo', 'Sujeito Ativo e Passivo', [0.0, 0.4, 0.8, 5.1, 0.9, 1.2, 4.5]),
];

// Painel lateral do assunto "Princípios Tributários".
export const PRINCIPIOS_DETAIL = {
  top10In: '6/7',
  estimateFafipa: 8.0,
  observedFafipa: 9.7,
  observedCount: '19 de 196',
  ci95: [6.3, 14.6] as const,
  others: 6.4,
  othersNote: '6 bancas, pela amostra',
  questions: { CESGRANRIO: 2, FCC: 19, FGV: 54, FAFIPA: 19, CEBRASPE: 73, FUNDATEC: 22, FEPESE: 4 } as Record<BankId, number>,
};

export const subject = (short: string) => {
  const found = SUBJECTS.find((s) => s.short === short);
  if (!found) throw new Error(`Assunto não transcrito: ${short}`);
  return found;
};

export const bank = (id: BankId) => BANKS.find((b) => b.id === id)!;

/** Bancas usadas nas comparações: a Cesgranrio (13 questões, 1 questão = 7,7%) fica de fora. */
export const COMPARABLE: BankId[] = ['FCC', 'FGV', 'FAFIPA', 'CEBRASPE', 'FUNDATEC', 'FEPESE'];
