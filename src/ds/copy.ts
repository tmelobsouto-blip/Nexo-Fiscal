// Every published sentence lives here so a post can be edited without touching layout code.
// Legal text is quoted literally; anything that still needs checking is marked VALIDAR.

export const TEMA796 = {
  total: 7,
  coverA: {
    label: 'Dia da Jurisprudência · STF',
    kicker: 'Tema 796 · art. 156, § 2º, I, CF',
    lead: 'Integralizou R$ 1 milhão em imóvel.',
    hero: 'R$ 400 mil',
    tail: 'pagam ITBI.',
    sub: 'A imunidade na realização de capital tem teto. O STF definiu qual.',
    action: 'Arraste →',
  },
  coverB: {
    label: 'Dia da Jurisprudência · STF',
    line1: 'A Constituição não fala em limite.',
    line2: 'O STF falou.',
    sub: 'Imunidade do ITBI na integralização de capital: até onde ela vai.',
    action: 'Arraste →',
  },
  context: {
    label: 'A regra',
    title: 'O que a Constituição garante',
    source: 'CF/88 · art. 156, § 2º, I',
    lawBefore: 'não incide sobre a transmissão de bens ou direitos incorporados ao patrimônio de pessoa jurídica',
    lawMark: 'em realização de capital',
    lawAfter: '(...)',
    question: { a: 'E quando o imóvel', hl: 'vale mais', b: 'do que o capital subscrito?' },
    action: 'A resposta do STF →',
  },
  tese: {
    label: 'Tese literal',
    source: 'STF · Tema 796 · RE 796.376',
    before: '“A imunidade em relação ao ITBI, prevista no inciso I do § 2º do art. 156 da Constituição Federal,',
    mark: 'não alcança o valor dos bens que exceder o limite do capital social',
    after: 'a ser integralizado.”',
    plainLabel: 'Sem juridiquês · tradução direta',
    plainA: 'Só é imune a parte do imóvel que vira quotas sociais.',
    plainB: 'O valor que sobra (reserva de capital/ágio) paga ITBI.',
    action: 'Veja nos números →',
  },
  example: {
    label: 'Na prática',
    title: 'Imóvel de R$ 1 milhão. Capital subscrito de R$ 600 mil.',
    immune: { value: 'R$ 600 mil', label: 'Quotas · imune' },
    taxed: { value: 'R$ 400 mil', label: 'Reserva de capital (ágio) · incide ITBI' },
    scale: ['R$ 0', 'R$ 600 mil', 'R$ 1 milhão'],
    rule: 'Regra de leitura: compare o valor do bem com o capital subscrito. A diferença é o excedente.',
    action: 'O erro clássico →',
  },
  locks: {
    label: 'Erro clássico de prova',
    title: 'Não confunda as duas travas do inciso I.',
    value: {
      label: 'Trava de valor',
      q: 'Até quanto é imune?',
      a: 'Só até o capital integralizado. O excedente paga ITBI.',
      src: 'Tema 796 · STF',
    },
    activity: {
      label: 'Trava de atividade',
      q: 'Quem perde a imunidade?',
      a: 'O adquirente cuja atividade preponderante é compra e venda ou locação de imóveis, ou arrendamento mercantil.',
      src: 'CF, art. 156, § 2º, I, parte final · CTN, art. 37',
    },
    // VALIDAR: status do Tema 1.348 (STF) na data da publicação.
    note: 'Na integralização, o alcance da trava de atividade está em discussão no STF (Tema 1.348).',
    action: 'Checklist de prova →',
  },
  checklist: {
    label: 'O que isso muda na sua prova',
    title: '3 leituras antes de marcar.',
    items: [
      'Compare o valor do bem com o capital subscrito.',
      'Excedente foi para reserva de capital? Incide ITBI.',
      'Valor e atividade preponderante são travas diferentes.',
    ],
    action: 'Salve para a revisão →',
  },
  save: {
    label: 'Revisão de véspera',
    title: 'Salve para revisar antes da prova.',
    index: ['A regra da CF', 'A tese literal', 'O exemplo numérico', 'As duas travas', 'Checklist de prova'],
    action: 'Salvar',
  },
  product: {
    label: 'Por dentro do material',
    title: 'Mapas como este, para o edital inteiro.',
    kpis: [
      { value: '30', label: 'Mapas visuais de revisão' },
      { value: '112', label: 'Remissões traduzidas na linha' },
    ],
    offer: 'Amostra grátis de 20 páginas.',
    action: 'Link no perfil',
  },
};

export const QUESTAO = {
  label: 'Questão inédita NEXO',
  bank: 'Padrão FGV / Cebraspe / FCC',
  source: 'CF/88, art. 156, § 2º, I + CTN, arts. 36 e 37 + Tema 796 STF',
  stem:
    'Sócio integraliza imóvel de R$ 2 milhões em holding operacional não imobiliária: R$ 500 mil realizam o capital subscrito e R$ 1,5 milhão vai à reserva de capital [ágio na subscrição]. Segundo o art. 156, § 2º, I, da CF/88 [imunidade do ITBI na realização de capital] e o Tema 796 do STF, o ITBI:',
  options: [
    { letter: 'A', text: 'Não incide sobre nenhum valor, pois a empresa não tem atividade imobiliária preponderante [art. 37 do CTN].' },
    { letter: 'B', text: 'Incide sobre R$ 1,5 milhão [reserva de capital], pois a imunidade limita-se ao valor do capital social subscrito.' },
    { letter: 'C', text: 'Incide sobre o total de R$ 2 milhões, pois a reserva de capital contamina integralmente a operação societária.' },
    { letter: 'D', text: 'Depende de apuração trienal da receita operacional [art. 37, § 1º, do CTN] para tributar o excedente.' },
  ],
  correct: 'B',
  answerLabel: 'Gabarito B · Tema 796 do STF (RE 796.376)',
  answer:
    'Pelo art. 156, § 2º, I, da CF/88 [imunidade do ITBI até o limite do capital realizado], a imunidade alcança apenas os R$ 500 mil do capital subscrito. O excedente de R$ 1,5 milhão destinado à reserva de capital sofre incidência imediata de ITBI, independentemente da atividade preponderante.',
  trap: 'a alternativa A usa a trava de atividade para esconder a trava de valor.',
  actionQ: 'Responda antes de arrastar →',
  actionA: 'Salve para revisar',
};

export const SV31 = {
  label: 'Erro clássico · SV 31 do STF',
  title: { a: 'Locação de bem móvel', hl: 'não é serviço.' },
  source: 'Súmula Vinculante 31 · texto literal',
  law: [
    { t: '“É ' },
    { t: 'inconstitucional a incidência do imposto sobre serviços', mark: true },
    { t: ' de qualquer natureza – ISS sobre operações de ' },
    { t: 'locação de bens móveis', mark: true },
    { t: '.”' },
  ],
  plainLabel: 'Sem juridiquês · tradução direta',
  plain: { a: 'Alugar um bem (', hl: 'obrigação de dar', b: ') não é prestar serviço (obrigação de fazer). Sem operador, não existe\u00a0ISS.' },
  action: 'Veja o Mapa Visual →',
};

export const MATERIAL = {
  name: 'Reta Final ISS Curitiba',
  url: 'nexofiscalbr.com.br/amostra',
  sample: '20 páginas reais do material',
  // VALIDAR: V01 mostra 273 questões inéditas; V03 mostra 272 no 1º quadro e 273 no seguinte.
  kpis: [
    { value: '279', unit: 'pág.', label: 'Manuais temáticos' },
    { value: '112', unit: '', label: 'Remissões na linha' },
    { value: '273', unit: '', label: 'Questões inéditas' },
    { value: '30', unit: '', label: 'Mapas visuais' },
  ],
  bracketPromise: 'Cada artigo vem com a explicação entre colchetes [...] na mesma linha, sem abrir outro código.',
};

export const STORIES = {
  s1: { label: 'Tema 796 · STF', lead: 'Um imóvel de R$ 2 milhões entra no capital social.', hero: 'Quanto paga ITBI?', hint: 'Responda no próximo story' },
  s2: {
    label: 'Quiz · 10 segundos',
    title: 'Holding operacional, não imobiliária.',
    parts: [
      { value: 500, label: 'R$ 500 mil', caption: 'Capital subscrito' },
      { value: 1500, label: 'R$ 1,5 milhão', caption: 'Reserva de capital (ágio)' },
    ],
    sticker: { q: 'Incide ITBI sobre:', options: ['Nada', 'R$ 500 mil', 'R$ 1,5 milhão', 'R$ 2 milhões'] },
  },
  s3: {
    label: 'Gabarito',
    hero: 'R$ 1,5 milhão',
    lead: 'paga ITBI. Só os R$ 500 mil do capital são imunes.',
    source: 'STF · Tema 796 · RE 796.376',
    quote: '“(...) não alcança o valor dos bens que exceder o limite do capital social a ser integralizado.”',
  },
  s4: {
    label: 'Como a lei seca aparece no material',
    lawRef: 'CF, art. 156, § 2º, I',
    lawA: 'não incide sobre a transmissão de bens ou direitos incorporados ao patrimônio de pessoa jurídica em realização de capital',
    br1: 'imune só até o capital subscrito · Tema 796',
    lawB: '(...) salvo se, nesses casos, a atividade preponderante do adquirente for a compra e venda desses bens ou direitos, locação de bens imóveis ou arrendamento mercantil',
    br2: 'preponderância: CTN, art. 37',
  },
  s5: { label: 'Amostra grátis', title: '20 páginas reais do material.', hint: 'Toque no link' },
};

// Story em vídeo: estudante perdido × auditor explica como cada banca cobra Direito Tributário.
// Números vêm de src/data/tributario-bancas.ts; aqui fica só o texto.
export const STORY_BANCAS = {
  label: 'Direito Tributário · por banca',
  hook: { count: '92', unit: 'assuntos', tail: 'de Direito Tributário.' },
  student1: 'Por onde eu começo?',
  mentor1: 'Depende da sua banca.',
  rowsLabel: '1º assunto em cada banca',
  mentor2: 'Cada banca tem seu 1º lugar.',
  excluded: 'Cesgranrio fora da comparação: só 13 questões.',
  focusLabel: 'Execução Fiscal · Lei nº 6.830/1980',
  mentor3: 'Na FAFIPA, Execução Fiscal é 12,2%. No Cebraspe, 2,1%.',
  student2: 'Então eu começo por aí!',
  cta: { a: 'Qual é a', hl: 'sua banca?' },
  // VALIDAR: o dono do perfil precisa responder cada caixa de pergunta com o top 3 da banca citada.
  ctaSub: 'Responda na caixa abaixo. Eu te mando o top\u00a03\u00a0dela.',
  sticker: 'Qual é a sua banca?',
};

// Story “Receita Federal 2026 · banca e edital se aproximam” (12 cenas × 7 s).
// Fatos conferidos em 27/10/2026 na imprensa especializada; o edital ainda não saiu. Links em docs/roteiros/story-receita-2026.md.
export const RECEITA_2026 = {
  label: 'Receita Federal 2026',
  kicker: 'Atualização',
  narration: [
    'Atenção, concurseiro! O novo concurso da Receita Federal está avançando.',
    'Dezessete propostas foram registradas no processo de escolha da banca organizadora.',
    'E uma minuta de dispensa de licitação já foi registrada no processo.',
    'O governo federal já autorizou 146 vagas para a Receita Federal.',
    'São 116 vagas para analista-tributário e 30 para auditor-fiscal.',
    'As remunerações iniciais, incluindo auxílio-alimentação, chegam a mais de 24 mil reais.',
    'E atenção: os dois cargos exigem graduação, mas aceitam formação em qualquer área.',
    'A expectativa divulgada pela Receita Federal é publicar o edital ainda em dezembro.',
    'Pela autorização, o prazo para publicação se estende até o início de janeiro de 2027.',
    'O planejamento prevê provas objetivas, discursivas, pesquisa de vida pregressa e curso de formação.',
    'Esperar a publicação do edital pode custar um tempo precioso de preparação.',
    'Quer acompanhar cada novidade do concurso? Siga a NEXO Fiscal.',
  ],
  ticker: [
    '146 vagas autorizadas',
    '116 Analista-Tributário',
    '30 Auditor-Fiscal',
    'Banca em definição',
    'Edital previsto para dezembro · não confirmado',
    'Prazo da autorização: início de janeiro de 2027',
  ],
  s01: { a: 'Receita', b: 'Federal', c: 'O edital está', hl: 'mais perto.' },
  // 17 itens classificados como “Proposta” no processo; não provam 17 instituições diferentes (nomes não divulgados).
  s02: { n: 17, a: 'Propostas', b: 'em análise', caption: 'Propostas registradas no processo', note: 'Nomes das instituições não divulgados', src: 'Processo de contratação da banca · SEI' },
  // VALIDAR: datas lidas pela imprensa no SEI (envio de propostas até 30/09; minuta registrada em 20/10/2026).
  s03: {
    a: 'Novos documentos',
    b: 'Contratação em andamento',
    doc: 'Minuta de termo de dispensa de licitação',
    stamp: 'Minuta',
    steps: [
      { d: 'até 30/09', l: 'Propostas' },
      { d: '20/10', l: 'Minuta de dispensa' },
      { d: 'próxima etapa', l: 'Definição da banca' },
    ],
    src: 'Processo de contratação da banca · SEI',
  },
  s04: { n: 146, a: 'Vagas autorizadas', seal: 'Autorização oficial', src: 'Portaria MGI nº 5.505/2026' },
  s05: {
    cards: [
      { n: 116, role: 'Analista-Tributário' },
      { n: 30, role: 'Auditor-Fiscal' },
    ],
    src: 'Portaria MGI nº 5.505/2026',
  },
  // VALIDAR: os valores batem com vencimento básico inicial da tabela de 2023 + auxílio-alimentação de R$ 1.192,00
  // (22.921,71 + 1.192,00 e 12.735,99 + 1.192,00), sem o bônus de eficiência. Outra fonte cita R$ 23.847,76 para auditor.
  // Confira a tabela vigente (reajustes de 2025/2026) e o valor do auxílio antes de publicar.
  s06: {
    rows: [
      { role: 'Auditor', value: '24.113,71' },
      { role: 'Analista', value: '13.927,99' },
    ],
    note: 'Valores iniciais brutos, incluindo auxílio-alimentação',
    src: 'Imprensa especializada · out/2026',
  },
  s07: {
    a: 'Nível superior',
    b: 'Qualquer área',
    courses: ['Direito', 'Engenharia', 'Administração', 'Contabilidade'],
    note: 'Diploma de graduação reconhecida pelo MEC',
    src: 'Lei nº 10.593/2002, art. 3º',
  },
  s08: { month: 'Dezembro', year: '2026', label: 'Previsão de edital', seal: 'Previsão — não confirmado', src: 'Previsão divulgada pela Receita Federal' },
  // Portaria publicada em 03/07/2026; seis meses para o edital. A imprensa cita 3 ou 4/01/2027, por isso “início de janeiro”.
  s09: {
    title: 'Prazo da autorização',
    a: 'Início de janeiro',
    b: '2027',
    marks: [
      { d: 'Jul/2026', l: 'Autorização' },
      { d: 'Dez/2026', l: 'Previsão do edital' },
      { d: 'Jan/2027', l: 'Prazo' },
    ],
    src: 'Portaria MGI nº 5.505/2026 · prazo de 6 meses',
  },
  // VALIDAR: objetiva, discursiva e curso de formação constam do planejamento noticiado (e da Lei nº 10.593/2002, art. 3º, § 4º);
  // a pesquisa de vida pregressa existiu no concurso anterior, mas não foi confirmada para 2026.
  s10: {
    cards: ['Objetiva', 'Discursiva', 'Vida pregressa', 'Curso de formação'],
    note: 'Conforme planejamento; detalhes definitivos no edital',
    src: 'Planejamento do concurso',
  },
  s11: { a: 'O edital ainda não saiu.', b: 'Sua preparação', hl: 'já começou?', poll: ['Já estou estudando', 'Vou começar'] },
  s12: { a: 'Receita Federal 2026', b: 'Não perca as próximas atualizações.', cta: 'Siga para mais atualizações', brand: { a: 'NEXO', b: 'Fiscal' } },
  // Capa: 1º segundo do card 01 (quadro que o feed mostra antes do play) e imagem avulsa.
  cover: {
    kicker: 'Banca e edital se aproximam',
    title: ['Receita', 'Federal'],
    year: '2026',
    lead: 'O edital está mais perto.',
    stats: [
      { n: '146', l: 'vagas autorizadas' },
      { n: '17', l: 'propostas registradas no processo da banca' },
      { n: 'Dez', l: 'previsão do edital, não confirmada' },
    ],
    action: 'O que já se sabe →',
  },
};

// Posts de feed da Receita Federal 2026: 6 layouts, cada um em claro e escuro. Mesmos fatos do story (checados em 27/10/2026).
export const RECEITA_2026_FEED = {
  label: 'Receita Federal 2026 · Atualização',
  updated: 'Atualizado em 27/10/2026',
  headline: {
    kicker: 'Banca e edital se aproximam',
    title: ['Receita', 'Federal'],
    year: '2026',
    lead: 'O edital está mais perto.',
    sub: '146 vagas autorizadas. Edital previsto para dezembro, ainda sem data oficial.',
    src: ['Portaria MGI nº 5.505/2026 · processo SEI da banca'],
    action: 'Siga para as próximas atualizações',
  },
  split: {
    kicker: 'Vagas autorizadas',
    n: '146',
    parts: [
      { n: 116, role: 'Analista-Tributário' },
      { n: 30, role: 'Auditor-Fiscal' },
    ],
    note: 'Os dois cargos pedem nível superior em qualquer área.',
    src: ['Portaria MGI nº 5.505/2026 · Lei nº 10.593/2002'],
    action: 'Salve para acompanhar',
  },
  // VALIDAR: datas de 30/09 e 20/10 lidas pela imprensa no processo SEI.
  timeline: {
    title: 'Onde está o concurso',
    steps: [
      { d: 'Jul/2026', l: 'Concurso autorizado', s: 'Portaria MGI nº 5.505/2026', kind: 'done' },
      { d: '30/09', l: 'Fim do envio de propostas', s: '17 propostas registradas no processo', kind: 'done' },
      { d: '20/10', l: 'Minuta de dispensa de licitação', s: 'Registrada no SEI; banca ainda não anunciada', kind: 'done' },
      { d: 'Dez/2026', l: 'Previsão do edital', s: 'Sem data oficial', kind: 'forecast' },
      { d: 'Jan/2027', l: 'Prazo da autorização', s: 'Até o início de janeiro', kind: 'deadline' },
    ],
    src: ['Portaria MGI nº 5.505/2026 · SEI, via imprensa'],
    action: 'Salve para acompanhar',
  },
  facts: {
    yes: 'O que já se sabe',
    yesItems: ['146 vagas: 116 Analista-Tributário e 30 Auditor-Fiscal', 'Nível superior em qualquer área', 'Edital até o início de janeiro de 2027', 'Minuta de dispensa de licitação registrada'],
    no: 'O que ainda falta',
    noItems: ['Qual será a banca', 'A data de publicação do edital', 'As regras definitivas da prova'],
    src: ['Portaria MGI nº 5.505/2026 · SEI, via imprensa'],
    action: 'Siga para saber primeiro',
  },
  // VALIDAR: “Etapas previstas” vem do planejamento noticiado; vida pregressa ficou de fora por não estar confirmada para 2026.
  sheet: {
    title: 'Ficha do concurso',
    rows: [
      ['Cargos', 'Analista-Tributário e Auditor-Fiscal'],
      ['Vagas', '146 (116 + 30)'],
      ['Escolaridade', 'Nível superior, qualquer área'],
      ['Autorização', 'Portaria MGI nº 5.505/2026'],
      ['Prazo do edital', 'Início de janeiro de 2027'],
      ['Previsão', 'Dezembro de 2026, não confirmada'],
      ['Banca', 'Em definição · 17 propostas'],
      ['Etapas previstas', 'Objetiva, discursiva e curso\u00a0de\u00a0formação'],
    ],
    src: ['Portaria MGI nº 5.505/2026 · Lei nº 10.593/2002', 'Processo SEI e imprensa especializada'],
    action: 'Salve a ficha',
  },
  question: {
    a: 'O edital ainda não saiu.',
    b: 'Sua preparação',
    hl: 'já começou?',
    stats: [
      { n: '146', l: 'vagas autorizadas' },
      { n: 'Dez/26', l: 'previsão do edital' },
      { n: 'Jan/27', l: 'prazo da autorização' },
    ],
    src: ['Portaria MGI nº 5.505/2026 · imprensa especializada'],
    action: 'Salve para acompanhar',
  },
};

// Carrossel SV 31 (4 slides) em 3 direções visuais (A, B, C). Copy do post publicado; texto literal e tradução em SV31.
export const SV31_POST = {
  total: 4,
  cover: {
    label: 'Dia da Jurisprudência · STF',
    tag: 'Súmula Vinculante 31 · ISSQN',
    a: 'Locação de',
    hl: 'bens móveis',
    b: 'paga',
    q: 'ISS?',
    action: 'Veja a Súmula e o Mapa →',
  },
  law: {
    label: 'Súmula literal · SV 31 do STF',
    source: 'Texto literal da Súmula Vinculante 31',
    give: { k: 'Obrigação de dar', v: 'Alugar o bem' },
    make: { k: 'Obrigação de\u00a0fazer', v: 'Prestar serviço' },
    action: 'Veja o Mapa Visual →',
  },
  map: {
    label: 'Mapa visual · Súmula Vinculante 31',
    kicker: 'Contrato de locação móvel',
    title: 'Veículo, Máquina ou Guindaste',
    sub: 'Distinção entre obrigação de dar vs. obrigação de fazer',
    left: { kicker: 'Locação pura (sem\u00a0operador)', verdict: ['Não incide', 'ISS'], tag: 'SV 31 · STF' },
    // VALIDAR: “com operador incide ISS” segue a leitura de que a SV 31 só alcança a locação dissociada de serviço;
    // há divergência sobre contratos mistos. Considere citar o precedente no slide.
    right: { kicker: 'Com operador / motorista', verdict: ['Incide', 'ISS'], tag: 'Há prestação de\u00a0serviço' },
    action: 'Salve este Mapa →',
  },
  material: {
    label: 'Por dentro do material · NEXO Fiscal',
    a: 'Mapas Visuais +',
    hl: 'Lei Seca traduzida',
    b: 'na linha.',
    badges: ['30 Mapas Visuais de Revisão', '112 Remissões Traduzidas na Linha'],
    action: 'Baixe 20 págs grátis no link da bio →',
  },
  caption: 'DIA DA JURISPRUDÊNCIA (Súmula Vinculante 31 do STF): Locação de bens móveis paga ISS?',
  directions: {
    A: { name: 'Direção A · Noir técnico', note: 'Painel escuro, anéis concêntricos em linha fina e o número da súmula como ponto focal.' },
    B: { name: 'Direção B · Blocos de cor', note: 'Blocos verdes, número gigante recortado e fichas em grade.' },
    C: { name: 'Direção C · Recorte', note: 'Verde-destaque contra preto, objeto recortado e o “×” que separa os dois casos.' },
  },
};

// Carrossel “Matriz → filial paga ICMS?” (7 slides, direção C, versão limpa: sem TopBar nem rótulos). Conferido em 29/10/2026.
// Fontes: Súmula 166 do STJ; ADC 49 (STF, mérito em 2021, embargos em 2023 com efeitos a partir de 2024);
// LC 87/1996, art. 12, §§ 4º e 5º, incluídos pela LC 204/2023 (§ 5º promulgado após a derrubada do veto, DOU 13/06/2024).
export const ICMS_TRANSF = {
  total: 7,
  cover: { lines: ['Matriz →', 'filial paga'], q: 'ICMS?', promise: 'A resposta mudou em\u00a02024.' },
  answer: {
    a: 'Regra:',
    hl: 'não\u00a0paga.',
    body: 'Matriz e filial têm o mesmo dono. A mercadoria muda de endereço, não de\u00a0titular.',
    badge: 'Mesmo titular',
    stores: ['Matriz', 'Filial'],
  },
  why: {
    source: 'Súmula 166 do STJ',
    law: [
      { t: '“' },
      { t: 'Não constitui fato gerador do ICMS', mark: true },
      { t: ' o simples deslocamento de mercadoria de um para outro estabelecimento do ' },
      { t: 'mesmo contribuinte', mark: true },
      { t: '.”' },
    ],
    left: { k: 'Circulação física', verdict: 'Não incide' },
    right: { k: 'Circulação jurídica', verdict: 'Incide' },
    plain: 'ICMS exige que a mercadoria mude de dono. Trocar de endereço não\u00a0basta.',
  },
  trap1: {
    title: 'O crédito não se\u00a0perde.',
    source: 'LC 87/1996, art. 12, § 4º',
    law: [
      { t: '“' },
      { t: 'Não se considera ocorrido o fato gerador', mark: true },
      { t: ' do imposto na saída de mercadoria de estabelecimento para outro de mesma titularidade, ' },
      { t: 'mantendo-se o crédito', mark: true },
      { t: ' relativo às operações e prestações anteriores em favor do contribuinte (...)”' },
    ],
    wrong: 'A transferência obriga a estornar o\u00a0crédito.',
    right: 'O crédito das operações anteriores fica com o\u00a0contribuinte.',
    tag: 'Crédito',
  },
  trap2: {
    title: ['Pode ser tributada.', 'Se o contribuinte\u00a0quiser.'],
    source: 'LC 87/1996, art. 12, § 5º',
    law: [
      { t: '“Alternativamente ao disposto no § 4º deste artigo, ' },
      { t: 'por opção do contribuinte', mark: true },
      { t: ', a transferência de mercadoria para estabelecimento pertencente ao mesmo titular ' },
      { t: 'poderá ser equiparada a operação sujeita à ocorrência do fato gerador', mark: true },
      { t: ' de imposto (...)”' },
    ],
    toggle: 'Tributar a transferência?',
    wrong: 'A transferência nunca pode ser\u00a0tributada.',
    right: 'Desde 2024 pode, por opção do contribuinte. Não é escolha do\u00a0Fisco.',
  },
  recap: {
    title: 'Cola de\u00a0prova',
    rows: [
      { k: 'Mesmo titular', v: 'Não é fato gerador', s: 'Súmula 166 · art. 12, § 4º' },
      { k: 'Crédito anterior', v: 'Mantido com o\u00a0contribuinte', s: 'art. 12, § 4º' },
      { k: 'Opção', v: 'Pode equiparar a operação\u00a0tributada', s: 'art. 12, § 5º' },
      { k: 'Outro titular', v: 'Venda: incide ICMS', s: 'circulação jurídica' },
      { k: 'ADC 49', v: 'Efeitos a partir de 2024', s: 'embargos, 2023' },
    ],
  },
  cta: {
    a: 'Pode transferir.',
    hl: 'Aqui não incide\u00a0ICMS.',
    sub: 'Mande este post para quem estuda Lei\u00a0Kandir.',
    cargo: 'Cola de prova',
  },
  next: '→',
  caption: 'Matriz manda mercadoria para a filial. Paga ICMS?',
};
