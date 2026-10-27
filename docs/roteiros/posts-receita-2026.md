# Posts · Receita Federal 2026 (claro e escuro)

Seis layouts de post único 1080 × 1350, cada um em claro (`L`) e escuro (`D`), com os mesmos fatos checados do [story](story-receita-2026.md). Código em `src/ds/posts/Receita2026Feed.tsx`; texto em `RECEITA_2026_FEED` (`src/ds/copy.ts`); PNGs em `exports/feed/DS-RF26-*.png` e folha de contato em `exports/feed/DS-RF26-folha.png`.

| # | Layout | Elemento dominante | Objetivo | Chamada |
|---|---|---|---|---|
| 01 | Manchete | “RECEITA FEDERAL 2026” | Alcance | Siga para as próximas atualizações |
| 02 | Vagas | 146 e a barra 116 × 30 na mesma escala | Alcance | Salve para acompanhar |
| 03 | Linha do tempo | 5 marcos: cheio = aconteceu · tracejado = previsão · sólido = prazo | Salvamento | Salve para acompanhar |
| 04 | Já se sabe × ainda falta | Lista com marcação cheia e tracejada | Autoridade | Siga para saber primeiro |
| 05 | Ficha do concurso | Tabela de consulta | Salvamento | Salve a ficha |
| 06 | Pergunta | “Sua preparação já começou?” + 3 números | Engajamento | Salve para acompanhar |

Todo post traz “Atualizado em 27/10/2026” e a fonte. Ao atualizar (banca, edital), troque `updated` e os fatos em `RECEITA_2026_FEED` e renderize de novo.

## Testes A/B

- **Capa do dia:** 01 (manchete) × 02 (número). Medir alcance e toques no perfil.
- **Claro × escuro:** publique a mesma peça nos dois modos em semanas diferentes, ou alterne na grade (escuro para abrir e fechar, claro para dados, como no resto do sistema).
- **Salvamento:** 03 × 05. Medir salvamentos ÷ alcance.

## Validar antes de postar

1. Datas 30/09 e 20/10 (post 03): lidas pela imprensa no processo SEI.
2. “Etapas previstas” (post 05): planejamento noticiado. Vida pregressa ficou de fora porque não está confirmada para 2026.
3. Remuneração não entrou em nenhum post: ainda está pendente de validação (ver o roteiro do story).
