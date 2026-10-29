# NEXO Fiscal — instruções do projeto

Sistema visual e templates de Instagram da NEXO Fiscal (concursos da área fiscal). As artes são componentes Remotion (React + TypeScript). Público: candidatos a Auditor Fiscal; o dono do projeto é auditor fiscal, então precisão técnica vem antes de estética.

## Onde mexer

- Copy publicada: `src/ds/copy.ts` (única fonte de texto das peças do sistema atual)
- Tokens (cores, fontes, grid, escala): `src/ds/tokens.ts`
- Componentes: `src/ds/ui.tsx`
- Peças: `src/ds/feed.tsx` (1080×1350) e `src/ds/stories.tsx` (1080×1920); registre novas peças em `FEED` / `STORY_LIST`
- Documentação da marca: `docs/design-system.md` (atualize quando mudar uma regra)
- Arquivos finais versionados: `exports/`
- Legado (não é o sistema atual): `src/styles/`, `src/acts/`, `src/carousel01/`

## Comandos

```bash
npm run typecheck        # tsc --noEmit
npm run test             # renderiza 1 peça (smoke test) em out/test/
npm run validate         # typecheck + test; rode antes de cada commit
npm run studio           # editor visual
npx remotion still src/index.ts <ID> exports/feed/<ID>.png
npx remotion render src/index.ts <ID-STORY> exports/stories/<ID-STORY>.mp4
./dsstills.sh out/preview <ID> <ID> ...   # PNGs + folha de contato para revisão visual
```

Renders usam `REMOTION_BROWSER` (definido pelo hook de sessão na nuvem; veja `remotion.config.ts`).

## Regras de conteúdo (inegociáveis)

- Nunca invente estatísticas, incidências, rankings, depoimentos, resultados ou informação jurídica.
- Texto de lei, súmula e tese é citado literalmente; omissões viram `(...)`; inserções explicativas vão entre colchetes `[ ]`.
- Dado sem fonte ou ponto jurídico incerto: marque `// VALIDAR:` em `copy.ts` e liste no relatório da tarefa.
- Modelos com dados fictícios levam `TemplateBadge` até receberem dados reais com linha de fonte.
- Pendências atuais: status do Tema 1.348 (STF); fonte do “70% dos candidatos” (V01). (273 questões inéditas confirmado pela página de vendas em 29/10/2026.)

## Regras de marca

- Cores só dos tokens: `#0B110E`, `#176B49`, `#36CD89`, `#F8F9F6`, `#EDF3EE`, `#D8E1DA`; terracota `#B4441A` apenas para incidência, erro ou pegadinha.
- Inter (títulos 800–900, tracking negativo) e Noto Sans Mono (rótulos, números, fontes). Source Serif 4 só para texto literal de lei.
- Sem gradientes, sombras, cantos acima de 4 px, ícones decorativos ou emoji.
- Posts de feed saem limpos: só o conteúdo e o @nexofiscalbr discreto no rodapé; sem `TopBar`, barra de progresso, seta, paginação, logo ou rótulos auxiliares (pedido do dono em 29/10/2026). Stories mantêm `TopBar` e `Footer` (@ + uma única próxima ação).
- Tamanhos mínimos na arte de 1080 px: rótulo 21 px, corpo 27 px.
- Stories: conteúdo entre y 250 e y 1580; figurinhas em áreas reservadas, com versão `-guia`.

## Verificação antes de dizer que terminou

1. `npm run validate` passa.
2. Renderize as peças alteradas com `./dsstills.sh` e olhe as imagens: nada estourando a margem, nenhuma palavra sozinha na última linha, nenhum texto sob a interface do Instagram.
3. Se a copy mudou, revise as regras de conteúdo acima.

## Entrega

Entregue só o que vai para o Instagram: os PNGs finais 1080 × 1350 em `exports/feed/<post>/`, na ordem, e a legenda pronta para colar. Sem prévia HTML, moldura do Instagram, prancha de mockup ou pedido de aprovação, a menos que o dono peça.

## Skills do projeto (`.claude/skills/`)

- `/nexo-post`: fluxo para criar uma peça nova no sistema.
- `/ig-reel`, `/ig-caption`, `/ig-carousel`, `/ig-story`, `/ig-human` e demais `ig-*`: pacote Instagram (MIT). Os scripts Python leem só inglês; em português use as notas como referência, não como corte.
- `/grill-me` (chama `grilling`): entrevista para afinar uma ideia antes de produzir.
- `karpathy-guidelines`: disciplina de código (mudanças cirúrgicas, critérios verificáveis).
- `/caveman`: modo de resposta comprimida; só quando pedido.
- `/instagram-carousel`: carrossel em HTML com prévia em moldura do Instagram e export 1080 × 1350 (Playwright, viewport 420 px × fator de escala). Neste projeto, as regras de marca vencem as da skill: cores dos tokens (o “brand gradient” vira verde sólido `#176B49`), Inter + Noto Sans Mono, cantos até 4 px, sem sombra; sem a etapa de aprovação, a barra de progresso, a seta, o logo e os rótulos da skill (ver Entrega). Gerador em `scripts/ig_carousel/` (`build_*.py` → `export.cjs`).
- Superpowers: plugin oficial (`superpowers@claude-plugins-official`), ativado em `.claude/settings.json`.

Fontes e licenças das skills de terceiros: `.claude/skills/THIRD_PARTY.md`.

## Git

- Mensagens: `feat|fix|refactor|docs(escopo): descrição`.
- Não versione `node_modules/` nem `out/`; versione em `exports/` só arquivos finais aprovados.
