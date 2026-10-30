# Padrão "Neon Editorial" (v2 · out/2026)

Evolução do sistema em `design-system.md`, derivada das 9 referências em [`referencias/neon-editorial-2026-10/`](referencias/neon-editorial-2026-10/). Piloto: [`exports/feed/neon-editorial-tema796/`](../exports/feed/neon-editorial-tema796/).

## Regras inegociáveis
1. **1 ideia por slide.** Um elemento lido em < 1 s (frase-título ou número gigante).
2. **Pouquíssimo texto.** Máx. ~25 palavras fora do literal; literal de súmula/tese pode ir até ~40 palavras em serifa 46 px.
3. **Legível no celular.** Mínimos em arte 1080 px: título 88 px, corpo 38 px; **todo texto ≥ 28 px** (inclui @, contador e rótulos). Teste: preview reduzido a 25% ainda legível.
4. **Sequência de 4–5 slides (máx. 5):** (1) **capa-gancho** (pergunta/número, sem literal) → (2) súmula/tese **literal** com fonte → (3) **sem juridiquês** → (4) **mapa visual** → (5) **NEXO por dentro** (páginas reais do material, de preferência do mesmo tema). Em 4 slides, literal e sem juridiquês podem dividir o slide 2 se não poluir.
5. **Sem nome pessoal.** Só `@nexofiscalbr` no rodapé e logo `NEXO.fiscal` pequeno no topo.
6. **Sem dados de contribuintes.** Exemplos sempre hipotéticos e redondos.
7. **Variar layouts** entre posts (ver catálogo) e alternar **dark / light** dentro do carrossel.

## Paleta
| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0A1410` | fundo dark, texto no light |
| `forest` | `#0F2A1E` | fundo dark alternativo (slide de produto) |
| `card` | `#1C3B2C` | cards no dark |
| `lime` | `#C6FF3D` | **token oficial de destaque.** Só sobre fundo escuro ou como faixa/marca-texto; **nunca como texto sobre fundo claro** |
| `offwhite` | `#F2F1EA` | fundo light |
| `green` | `#1F7A4D` | destaque no light |
| `lilac` | `#C9B8FF` | opcional, séries especiais (máx. 1 por post) |

Proporção: 80% fundo · 15% texto · ≤5% neon.

## Tipografia
- Títulos/números: Inter Tight 900, tracking −0,035 em, entrelinha 0,95.
- Corpo: Inter 500/700. Literal de lei/tese: Source Serif 4 (mantido do v1).
- Rótulos, paginação, @: Noto Sans Mono 600, caixa alta, tracking 0,1 em.

## Marca-texto e números
Faixa (`.mk`/`.hl`) começa 0,12 em abaixo do topo da linha, padding-bottom 0,18 em, raio 18 px, sem encostar nas descendentes da linha de cima.
Números comparados (ex.: 600 mil × 400 mil) usam a **mesma escala** (~88 px) e `white-space: nowrap`.

## Kit fixo
- Topo: logo `NEXO.fiscal` (esq.) + `01 / 04` (dir.).
- Rótulo em **pílula contornada** (ex.: `STF · TEMA 796 · TESE LITERAL`).
- Rodapé: `@nexofiscalbr` (esq.) + **pílula CTA com seta** (dir.), um CTA só.
- Cards com raio 28–36 px; marca-texto neon no trecho-chave do literal.

## Catálogo de layouts (rodar entre posts)
A. **Título gigante + literal** (abertura dark) · B. **Pergunta/resposta empilhada** (light) · C. **Número gigante** (89%, 400 mil) · D. **Cards lado a lado proporcionais** (mapa) · E. **Mockup de páginas reais inclinadas** (produto) · F. **Grid bento** 2×2 de cards · G. **Foto P&B recortada + shape verde** (só imagens licenciadas, sem pessoas identificáveis da equipe).

## Fluxo de produção
HTML/CSS em `src/neon-editorial/` → `python r.py` (Playwright + Chrome) → PNG 1080×1350. Aprovação do Designer (≥ 8,5) e do Tiago antes de agendar.
