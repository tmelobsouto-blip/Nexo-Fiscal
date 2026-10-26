---
name: nexo-post
description: >-
  Cria uma peça nova (carrossel de feed 1080x1350 ou sequência de stories 1080x1920) no sistema visual
  NEXO Fiscal, a partir de um tema de concurso fiscal: define objetivo, escolhe modelos, escreve a copy em
  src/ds/copy.ts, monta os componentes, renderiza e revisa. Use quando o usuário pedir um post, carrossel,
  story, "faça um post sobre X", "transforme esta questão/súmula/tese em post" ou quiser um novo modelo.
---

# nexo-post

Uma peça nova reaproveita o sistema de `src/ds/`. Não crie estilos fora dele.

## 1. Defina antes de escrever

Pergunte de uma vez só o que faltar:

1. **Tema e fonte**: dispositivo, súmula, tese, questão. Peça o texto literal se não estiver no projeto.
2. **Objetivo principal** (um): alcance, autoridade, engajamento, salvamento ou conversão.
3. **Formato**: carrossel (5–8 slides), questão comentada (2), erro clássico (1) ou sequência de stories (5).
4. **Dados**: qualquer número, ranking ou incidência precisa de fonte (n questões, provas, período). Sem fonte, use o modelo com `TemplateBadge` e diga que falta o dado.

## 2. Monte a narrativa com os modelos existentes

| Papel | Componente de referência em `src/ds/feed.tsx` |
|---|---|
| Gancho (2 versões: impacto e curiosidade) | `CoverImpact`, `CoverCuriosity` |
| Contexto / regra literal | `Context` |
| Texto literal + tradução | `Tese`, `Sv31` |
| Mapa / números | `Example` (`SplitBar`, `Stat`) |
| Erro clássico / distinção | `Locks` |
| Insight acionável | `Checklist` |
| Conversão | `SaveCta` (salvar) ou `ProductCta` (material) |
| Questão comentada | `QuestionSlide`, `AnswerSlide` |
| Dados de bancas | `BanksTemplate`, `RankingTemplate` |

Stories seguem `src/ds/stories.tsx`: interrupção → quiz → autoridade → desejo → link, um objetivo por story, figurinha em área reservada com versão `-guia`.

Alterne claro e escuro por função (escuro: abrir, erro, fechar; claro: ensinar, dados). Um elemento dominante por slide. Uma única chamada por peça; os rodapés intermediários anunciam o próximo slide.

## 3. Escreva a copy

- Toda a copy vai em `src/ds/copy.ts`, num objeto novo com o nome do tema.
- Títulos curtos e específicos; número concreto no gancho quando existir.
- Texto legal literal, com `(...)` para omissões e `[ ]` para explicações.
- Pontos incertos: comentário `// VALIDAR:` logo acima da chave.
- Se a copy for falada ou longa, rode `/ig-human` e use as notas como referência (o detector só entende inglês).

## 4. Implemente e registre

- Componha com `Canvas`, `TopBar`, `Fill`, `Text`, `Hl`, `Warn`, `Law`, `Mark`, `Br`, `SplitBar`, `Stat`, `Footer`.
- Novos IDs seguem `DS-<TEMA>-<NN><variante>-<papel>` e entram em `FEED` ou `STORY_LIST`.
- Nada de cores, fontes ou raios fora de `src/ds/tokens.ts`.

## 5. Renderize e revise

```bash
npm run validate
./dsstills.sh out/preview <IDs...>
```

Abra `out/preview/sheet.png` e cada PNG. Corrija antes de entregar:

- texto passando da margem ou cortado;
- palavra sozinha na última linha de um título (use ` ` entre as duas últimas palavras);
- rótulos abaixo de 21 px ou corpo abaixo de 27 px;
- nos stories, qualquer texto acima de y 250 ou abaixo de y 1580, ou sobre a área da figurinha.

## 6. Entregue

1. Copie os aprovados para `exports/feed/` ou `exports/stories/` (stories: MP4 + PNG + `-guia`).
2. Atualize `docs/design-system.md` se a peça introduziu um padrão novo.
3. Informe: objetivo, título escolhido e a alternativa para teste A/B, a chamada final e a lista de `VALIDAR`.
4. Nada é publicado no Instagram por este projeto.
