# Carrossel SV 31 · três direções visuais

Mesmo carrossel de 4 slides (capa, súmula literal, mapa visual, material), com o texto do post publicado e o literal da Súmula Vinculante 31, em três composições inspiradas nas referências enviadas. Tudo dentro do sistema: só cores dos tokens, cantos até 4 px, sem degradê nem sombra, Inter/Noto Sans Mono/Source Serif 4 (serifa só no texto da súmula).

| Direção | Ideia | Traço da referência que foi traduzido |
|---|---|---|
| A · Noir técnico | Fundo escuro, anéis concêntricos em linha fina, “31” como ponto focal | Anéis e foco central; o brilho virou linha sólida verde-destaque |
| B · Blocos de cor | Blocos verdes, “31” gigante recortado, fichas lado a lado com ✓ e × | Blocos de cor e palavra gigante atrás do conteúdo |
| C · Recorte | Verde-destaque contra preto, guindaste recortado, “×” entre os dois casos | Contraste verde × preto, objeto recortado sobre bloco, “×” do comparativo |

Arquivos em `exports/feed/`: slides `DS-SV31-0{1-4}{A|B|C}-*.png` (1080 × 1350) e pranchas `DS-SV31-MOCKUP-{A|B|C}.png` (post no feed + os 4 slides). Código em `src/ds/posts/Sv31Mockups.tsx`; texto em `SV31_POST` e `SV31` (`src/ds/copy.ts`).

## Decisões

- As fotos das referências viraram ilustração plana (guindaste com e sem operador na direção C), porque o tema é a locação do bem e não há foto licenciada no projeto.
- As páginas do material são esquemáticas (barras, sem texto), para não inventar conteúdo. Para usar páginas reais, exporte 2 páginas do PDF e troque o componente `Pages`.
- “Súmula Vinculante 31 STF” virou “SV 31 · STF” dentro dos cartões do mapa, para caber sem quebrar.

## Validar antes de postar

1. **Contratos mistos (slide 03):** “com operador / motorista: incide ISS” segue a leitura de que a SV 31 só alcança a locação dissociada de serviço. Há divergência sobre contratos mistos; vale citar o precedente ou a fonte numa linha do slide.
2. **Texto literal:** conferido com a redação divulgada (“É inconstitucional a incidência do imposto sobre serviços de qualquer natureza – ISS sobre operações de locação de bens móveis.”). Confira caixa-alta e o travessão no portal do STF.
3. **Números do material (slide 04):** 30 mapas e 112 remissões, como no post original.
