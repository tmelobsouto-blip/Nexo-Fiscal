# NEXO Fiscal

Sistema visual e templates de Instagram da **NEXO Fiscal**, marca de preparação para concursos da área fiscal.

Tudo aqui é editável: as artes são componentes [Remotion](https://www.remotion.dev/) (React + TypeScript). Os PNGs e MP4s prontos ficam em `exports/`.

- **Documentação do sistema visual:** [`docs/design-system.md`](docs/design-system.md)
- **Relatório visual** (galerias e vídeos): [`docs/report/index.html`](docs/report/index.html)
- **Arquivos prontos para publicar:** [`exports/`](exports/)

![Carrossel Tema 796](exports/carrossel-tema796-sequencia.png)

## Estrutura

```
docs/
  design-system.md      diagnóstico, direção de arte, componentes, copy, A/B, validações
  report/               a mesma documentação como página HTML
exports/
  feed/                 PNGs 1080×1350 (carrossel Tema 796, questão comentada, SV 31, modelos)
  stories/              MP4s 1080×1920 + PNGs finais e versões guia (posição das figurinhas)
src/
  ds/                   sistema visual atual
    tokens.ts           cores, fontes, grid, escala tipográfica
    ui.tsx              componentes (TopBar, Footer, Law, Mark, Br, SplitBar, Stat...)
    copy.ts             toda a copy publicada (pontos VALIDAR marcados)
    feed.tsx            peças do feed
    stories.tsx         stories animados
  carousel01/           Carrossel #01 recriado + Reel Tema 796
  styles/               5 explorações de estilo (editorial, brutalista, terminal, glass, chat)
  acts/, Story.tsx      primeiro mockup de story (Desafio ITBI · V01)
reels/tema796/          roteiro e ganchos do Reel (gerados com a skill /ig-reel)
scripts/beats_json.py   ficha de tempo do roteiro → JSON para o Reel
public/fonts/           fontes locais (licença OFL, ver public/fonts/LICENSE.md)
```

## Como usar

Requer Node 20+.

```bash
npm install
npm run studio                 # editor visual com todas as composições
```

Gerar uma arte do feed (PNG):

```bash
npx remotion still src/index.ts DS-T796-04-exemplo exports/feed/DS-T796-04-exemplo.png
```

Gerar um story (MP4) ou a versão guia:

```bash
npx remotion render src/index.ts DS-STORY-2-quiz exports/stories/DS-STORY-2-quiz.mp4
npx remotion still  src/index.ts DS-STORY-2-quiz-guia exports/stories/DS-STORY-2-quiz-guia.png --frame=179
```

Folha de contato de várias peças:

```bash
./dsstills.sh out/preview DS-T796-01A-capa-impacto DS-T796-02-contexto DS-T796-03-tese
```

Se o Chrome do Remotion não baixar no seu ambiente, aponte para um Chromium local com `--browser-executable=/caminho/do/chrome` (ou `REMOTION_BROWSER=... ./dsstills.sh`).

## Composições principais

| ID | Peça |
|---|---|
| `DS-T796-01A-capa-impacto` … `DS-T796-07B-cta-produto` | Carrossel Tema 796 (7 slides + capa B + CTA B) |
| `DS-QC-01-enunciado`, `DS-QC-02-gabarito` | Questão comentada |
| `DS-SV31-erro-classico` | Erro clássico · SV 31 |
| `DS-MODELO-comparativo-bancas`, `DS-MODELO-ranking-incidencia` | Modelos com dados a preencher |
| `DS-STORY-1-interrupcao` … `DS-STORY-5-conversao` (+ `-guia`) | Sequência de stories |
| `Reel796-Clean`, `Reel796-Mockup` | Reel Tema 796 (~28 s) |
| `C01-Slide1` … `C01-Slide4`, `SV31-Slide2` | Carrossel #01 original recriado |

## Claude Code

O projeto vem configurado para o Claude Code:

- `CLAUDE.md`: regras de marca, de precisão técnica e de verificação.
- `.claude/hooks/session-start.sh`: em sessões na nuvem, instala as dependências e aponta o Remotion para o Chromium do container.
- `.claude/skills/`: `nexo-post` (fluxo de peça nova), pacote `ig-*`, `grill-me`/`grilling`, `karpathy-guidelines` e `caveman`. Origem e licenças em `.claude/skills/THIRD_PARTY.md`.
- Testes: `npm run validate` (typecheck + render de uma peça).

## Antes de publicar

Confira a seção **9. Validar antes de postar** em [`docs/design-system.md`](docs/design-system.md): status do Tema 1.348 no STF, a fonte do dado “70% dos candidatos” e a contagem 272 × 273 questões inéditas.

Nada neste repositório publica no Instagram. As artes são geradas aqui; a publicação é manual.
