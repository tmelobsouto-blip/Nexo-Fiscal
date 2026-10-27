# Story · O estudante que não sabia por onde começar

| | |
|---|---|
| Formato | Story em vídeo 1080 × 1920 · 16,5 s · sem narração (o diálogo vai em balões) |
| Objetivo | Engajamento: a pessoa responde com a banca dela e a conversa começa no direct |
| Chamada única | Figurinha de pergunta “Qual é a sua banca?” |
| Composições | `DS-STORY-bancas-estudante` (publicar) · `-guia` (posição da figurinha) · `-mockup` (com a interface do Instagram) |
| Código | `src/ds/motion/EstudanteBancas.tsx` · personagens em `src/ds/characters.tsx` · texto em `STORY_BANCAS` (`src/ds/copy.ts`) · números em `src/data/tributario-bancas.ts` |

## Personagens

- **Estudante:** corpo cinza-verde, alça de mochila, sobrancelhas de dúvida e pontos de interrogação flutuando. Fica surpreso com o dado da FAFIPA e sorri no fim.
- **Auditor:** corpo verde institucional, gola verde-destaque e óculos. É quem explica.
- Desenho plano, sem sombra nem degradê. Os dois piscam e mexem a boca quando falam.

## Roteiro

| Tempo | Cena | Tela | Fala (balão) |
|---|---|---|---|
| 0,0–3,2 s | **O caos** · fundo escuro | “**92** assuntos de Direito Tributário.” 14 etiquetas com assuntos reais flutuam e balançam; o estudante, grande, olha confuso | Estudante: “Por onde eu começo?” |
| 3,2–5,2 s | **Entra o auditor** | O auditor desliza pela direita; as etiquetas param e esmaecem; o estudante vira o olhar para ele | Auditor: “Depende da sua banca.” |
| 5,2–9,5 s | **Cada banca, um 1º lugar** | Os personagens encolhem para os cantos. Quatro etiquetas voam para uma tabela e as outras somem: FCC → Extinção do Crédito · FGV, Cebraspe e Fundatec → Princípios Tributários · FAFIPA → Execução Fiscal (destacada) · FEPESE → Contribuições de Melhoria. Rodapé: “Cesgranrio fora da comparação: só 13 questões.” | Auditor: “Cada banca tem seu 1º lugar.” |
| 9,5–11,7 s | **O dado** | A tabela some; entra “**12,2%** na FAFIPA” e as barras FAFIPA 12,2% × Cebraspe 2,1% (Execução Fiscal) | Auditor: “Na FAFIPA, Execução Fiscal é 12,2%. No Cebraspe, 2,1%.” · estudante surpreso |
| 11,7–13,0 s | **A virada** | Mesma cena | Estudante (sorrindo): “Então eu começo por aí!” |
| 13,0–16,5 s | **Chamada** · tela clara (transição de baixo para cima) | “Qual é a **sua banca?**” · “Responda na caixa abaixo. Eu te mando o top 3 dela.” · espaço livre para a figurinha · linha de fonte · auditor sorrindo | — |

Tudo fica entre y 250 e y 1580, fora do perfil e do campo de resposta do Instagram.

## Como publicar

1. Suba `exports/stories/DS-STORY-bancas-estudante.mp4` como story.
2. Adicione a **figurinha de pergunta** com o texto “Qual é a sua banca?” e posicione como em `exports/stories/DS-STORY-bancas-estudante-guia.png` (centro, entre y 860 e y 1190).
3. Responda cada resposta no direct com o top 3 da banca citada (tabela abaixo). Prometer e não responder é pior que não prometer.

## Respostas prontas (top 3 por banca)

Calculado sobre as **17 linhas visíveis no print** (de 92 assuntos, ordenados pela média). Um assunto de média baixa pode ter peso alto numa banca específica e estar fora do print. **Confirme no painel, ordenando pela coluna da banca, antes de responder.**

| Banca | 1º | 2º | 3º |
|---|---|---|---|
| FAFIPA | Execução Fiscal 12,2% | Princípios Tributários 9,7% | Responsabilidade Tributária 7,7% |
| FCC | Extinção do Crédito 9,1% | Princípios Tributários 7,2% | Responsabilidade Tributária 5,7% |
| FGV | Princípios Tributários 5,9% | Extinção do Crédito 5,6% | Responsabilidade Tributária 4,6% |
| Cebraspe | Princípios Tributários 7,3% | Responsabilidade Tributária 4,8% | Extinção do Crédito 3,5% |
| Fundatec | Princípios Tributários 6,5% | Execução Fiscal 5,9% | Extinção do Crédito 4,7% |
| FEPESE | Contribuições de Melhoria (1º no painel; valor cortado no print) | Extinção do Crédito 6,0% | Repartição de Receitas 6,0% (empate) |
| Cesgranrio | Amostra de 13 questões: responda que ainda não há base para ranking | | |

## Testes A/B

- **Chamada:** caixa de pergunta “Qual é a sua banca?” × figurinha de enquete com FAFIPA / Cebraspe / FGV / Outra (mais respostas e menos conversa).
- **Abertura:** “92 assuntos” × “Por onde começar Tributário?” como primeira frase na tela.
- Medir: respostas ÷ alcance, saídas no primeiro story, respostas no direct.

## Validar antes de postar

1. **Top 3 por banca:** confirme no painel, como dito acima.
2. **Compromisso de resposta:** a chamada promete o top 3 no direct; só publique se você puder responder no mesmo dia.
3. **Nome da fonte** (`SOURCE.credit` em `src/data/tributario-bancas.ts`).
4. **FAFIPA como banca do concurso-alvo** (o painel a marca “do concurso”).
