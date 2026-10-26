# Reel · Direito Tributário: o que cada banca cobra

| | |
|---|---|
| Formato | Reel 1080 × 1920 · 32,0 s de fala + 0,6 s de respiro · 12 falas |
| Objetivo | Salvamento e autoridade (conteúdo de planejamento de estudo) |
| Público | Quem vai fazer prova da FAFIPA (marcada como “do concurso” no painel) e concurseiros fiscais em geral |
| Chamada única | Salvar |
| Composição | `DS-REEL-bancas-tributario` (limpa) e `DS-REEL-bancas-tributario-mockup` (com a interface do Reels) |
| Arquivos | Roteiro falado `reels/bancas-tributario/script.txt` · legenda `reels/bancas-tributario/caption.txt` · dados `src/data/tributario-bancas.ts` |

## Fonte dos dados

Painel “Incidência por banca”, Direito Tributário, últimos 5 anos, atualizado em 03/10/2026, 92 assuntos. Métrica: % das questões de Direito Tributário de cada banca. Transcrição completa e conferida em `src/data/tributario-bancas.ts`.

| Banca | Questões | 1º assunto |
|---|---|---|
| Cebraspe | 1.004 | Princípios Tributários |
| FGV | 912 | Princípios Tributários |
| Fundatec | 341 | Princípios Tributários |
| FCC | 265 | Extinção do Crédito Tributário |
| FAFIPA | 196 | Lei nº 6.830/1980 (Execução Fiscal) |
| FEPESE | 133 | Contribuições de Melhoria |
| Cesgranrio | 13 | Princípios Tributários (amostra pequena) |

**Fora da comparação:** a Cesgranrio, porque com 13 questões cada uma vale 7,7% e qualquer questão muda o ranking. A linha “Contribuições de Melhoria” está cortada no print, então o vídeo só usa o fato de ela ser o 1º assunto da FEPESE (informação do cartão da banca).

## Mensagens-chave

1. **Há um consenso:** Princípios Tributários está no top 10 de 6 das 7 bancas.
2. **A banca muda o peso:** Execução Fiscal é 12,2% na FAFIPA, 2,1% no Cebraspe e 0,8% na FCC.
3. **A FAFIPA tem perfil próprio:** Suspensão da Exigibilidade com 5,6%, contra no máximo 2,3% nas outras.

## Gancho (testado com o `/ig-reel`)

| Fórmula | Fala | Nota PT | Nota EN (tradução literal) |
|---|---|---|---|
| **#23 The Statistic · escolhido** | Execução Fiscal: 12,2% na FAFIPA. | 50,6 OK | — |
| Híbrido (número + contraste) | Execução Fiscal: 12,2% na FAFIPA, só 2,1% no Cebraspe. | 62,6 OK | 62,6 OK |
| #3 Nobody Tells You | Ninguém te conta: FAFIPA cobra Execução Fiscal 6 vezes mais. | 43,4 WEAK | 81,4 STRONG |
| #10 If This, Then Watch | Vai fazer FAFIPA? Seu Tributário não é o da FGV. | 39,2 WEAK | 77,8 STRONG |

O híbrido tem a melhor nota estável, mas leva 3,3 s para ser dito; o gancho precisa caber em 3 s. Por isso ele virou as falas 1 e 2 (número no 1º beat, contraste no 2º), e a tela mostra os dois números desde o primeiro quadro. O avaliador só reconhece tratamento direto e tensão em inglês, então as notas em PT servem de referência, não de corte.

## Roteiro

Tempos gerados por `beats.py` a 165 palavras por minuto, via `python3 -I scripts/beats_json.py reels/bancas-tributario/script.txt src/ds/reels/bancas-tributario.beats.json --target 32` (o vídeo lê esse JSON). Todas as falas ficam abaixo de 4 s e a última repete “Execução Fiscal”, o que emenda a repetição do vídeo.

| # | Tempo | Fala | Texto na tela | Visual | Dado |
|---|---|---|---|---|---|
| 1 | 0,0–1,8 | Execução Fiscal: 12,2% na FAFIPA. | **12,2% na FAFIPA.** | Escuro. Número gigante em verde-destaque já no 1º quadro; barra cresce sob ele. | LEF · FAFIPA 12,2% |
| 2 | 1,8–3,3 | No Cebraspe, só 2,1%. | **No Cebraspe, só 2,1%.** | Duas barras na mesma escala: FAFIPA × Cebraspe. | LEF · Cebraspe 2,1% |
| 3 | 3,3–6,2 | São 7 bancas. 5 anos de Direito Tributário. | **7 bancas. 5 anos.** | Claro. Barras de questões por banca; FAFIPA em verde; Cesgranrio hachurada. | Questões por banca |
| 4 | 6,2–10,2 | Princípios Tributários está no top 10 de 6 das 7 bancas. | **Princípios Tributários** · selo “top 10 em 6 de 7 bancas” | Barras de Princípios nas 6 bancas comparáveis. | Princípios por banca |
| 5 | 10,2–12,7 | Na FAFIPA, pesa 9,7%. Nas outras, 6,4%. | Mesma cena + linha “Outras bancas 6,4%” | Linha de referência tracejada entra sobre as barras. | Painel lateral: observado 9,7% · outras 6,4% |
| 6 | 12,7–15,6 | Fora isso, cada banca tem seu primeiro lugar. | **Cada banca, um 1º lugar.** | Tabela banca → 1º assunto, linha a linha. | Cartões das bancas |
| 7 | 15,6–18,6 | FCC: Extinção do Crédito. FEPESE: Contribuições de Melhoria. | (mesma tabela) | FCC e FEPESE destacadas; o resto esmaece. | Cartões das bancas |
| 8 | 18,6–21,1 | A FAFIPA ainda puxa Suspensão da Exigibilidade. | **A FAFIPA puxa Suspensão da Exigibilidade.** | Escuro. Matriz 6 assuntos × 6 bancas; coluna FAFIPA contornada; linha Suspensão destacada. | Matriz |
| 9 | 21,1–23,6 | 5,6%, contra no máximo 2,3% nas outras. | **5,6%** · ≤ 2,3% nas outras 6 bancas | Número grande + barras de Suspensão. | Suspensão: FAFIPA 5,6%; máx. das outras 2,3% |
| 10 | 23,6–26,6 | A Cesgranrio ficou de fora. Só 13 questões. | **13 questões** · “1 questão = 7,7% da banca” | Claro. Explica o método (amostra pequena). | Cesgranrio n = 13 |
| 11 | 26,6–29,8 | Prova FAFIPA? Comece por Execução Fiscal, Princípios e Responsabilidade. | **Prova FAFIPA? Comece por:** | Escuro. Ranking 01 Execução Fiscal 12,2% · 02 Princípios 9,7% · 03 Responsabilidade 7,7%. | Top 3 da coluna FAFIPA |
| 12 | 29,8–32,6 | Salva e começa pela Execução Fiscal. | **Salve e comece pela Execução Fiscal.** | Ícone de salvar + linha de fonte. | — |

Em todas as cenas: barra de progresso e rótulo no topo, legenda da fala palavra por palavra na base da área segura (assiste-se sem som), conteúdo entre y 240 e y 1440 e fora dos 230 px da direita.

## Legenda do post

Arquivo: `reels/bancas-tributario/caption.txt` (passou no `caption.py`: 555 caracteres, primeira linha de 89 caracteres inteira antes do “… mais”, 3 hashtags, os dois termos de busca presentes; o aviso de “sem chamada” é viés de idioma, porque o script procura “save” e não “salve”).

> Na FAFIPA, Execução Fiscal é 12,2% das questões de Direito Tributário. No Cebraspe, 2,1%.

## Testes A/B

- **Gancho:** “Execução Fiscal: 12,2% na FAFIPA.” × “Ninguém te conta: FAFIPA cobra Execução Fiscal quase 6 vezes mais que o Cebraspe.” (12,2 ÷ 2,1 = 5,8).
- **Chamada:** “Salve para montar seu plano” × “Comente FAFIPA e receba a matriz completa” (só se houver resposta automática configurada).
- Medir: retenção aos 3 s, salvamentos ÷ alcance, compartilhamentos ÷ alcance.

## Validar antes de postar

1. **Nome da fonte:** o vídeo cita “Questões de Direito Tributário · 7 bancas · últimos 5 anos · atualizado em 03/10/2026”. Se a base tem nome público (próprio ou de terceiros), troque `SOURCE.credit` em `src/data/tributario-bancas.ts`.
2. **FAFIPA como banca do concurso-alvo:** o painel marca “do concurso”; confirme o concurso antes de dizer “prova FAFIPA” para o seu público.
3. **Não usado de propósito:** a “estimativa 8,0% no plano FAFIPA” do painel (é modelo, não observação) e o intervalo de confiança 6,3–14,6% (bom para um carrossel de método, longo demais para o Reel).

## Gravação

- Grave a voz fala a fala seguindo o roteiro; se sua velocidade for outra, ajuste com `--wpm` no `beats_json.py` e renderize de novo para as legendas acompanharem.
- Sem voz, o vídeo funciona só com as legendas e uma trilha baixa.
- Renderizar: `npx remotion render src/index.ts DS-REEL-bancas-tributario exports/reels/DS-REEL-bancas-tributario.mp4`.
