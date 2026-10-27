# Story · Receita Federal 2026: banca e edital se aproximam

| | |
|---|---|
| Formato | 12 stories em vídeo 1080 × 1920, 7 s cada (84 s no total), 30 fps |
| Estilo | Plantão de notícias no sistema NEXO: fundo escuro, verde-destaque nos números, faixa de notícias rolando embaixo |
| Objetivo | Alcance e retenção na sequência; enquete no card 11; seguir no card 12 |
| Composições | `DS-STORY-receita-2026-01` … `-12` (publicar) · `-capa` (capa clara do post) · `-11-guia` (posição da enquete) · `DS-STORY-receita-2026` (prévia de 84 s) · `-mockup` (com a interface do Instagram) |
| Código | `src/ds/motion/Receita2026.tsx` · texto e narração em `RECEITA_2026` (`src/ds/copy.ts`) · trilha em `scripts/receita-2026-trilha.py` |
| Arquivos | `exports/stories/receita-2026/` (12 MP4, guia da enquete e folha de contato `-folha.png`) · vídeo completo de 84 s para o feed em `DS-STORY-receita-2026-completo.mp4` |

O Instagram corta vídeos de story com mais de 60 s, e a figurinha de enquete vale para um card só. Por isso a sequência sai em 12 arquivos de 7 s, na ordem.

## Roteiro

| # | Tempo | Texto na tela | Narração | Visual | Fonte na tela |
|---|---|---|---|---|---|
| 01 | 00:00–00:07 | RECEITA FEDERAL · O EDITAL ESTÁ **MAIS PERTO.** | Atenção, concurseiro! O novo concurso da Receita Federal está avançando. | 0–1 s **capa** (fundo claro, ver abaixo) com som grave · corte seco na batida · 1–2 s “RECEITA” gigante na batida · 2–4 s corte para o prédio com leve aproximação · 4–7 s “MAIS PERTO.” em verde e linha que percorre a tela | — |
| 02 | 00:07–00:14 | **17** · PROPOSTAS EM ANÁLISE | Dezessete propostas foram registradas no processo de escolha da banca organizadora. | Linhas de documentos correndo ao fundo · contador 01 → 17 · legenda “Propostas registradas no processo” · “Nomes das instituições não divulgados” · zoom no 17 | Processo de contratação da banca · SEI |
| 03 | 00:14–00:21 | NOVOS DOCUMENTOS · CONTRATAÇÃO EM ANDAMENTO | E uma minuta de dispensa de licitação já foi registrada no processo. | Documento em perspectiva · carimbo “MINUTA” · o documento sai e entram as etapas: Propostas (até 30/09) ✓ · Minuta de dispensa (20/10) ✓ · Definição da banca, com contorno verde pulsando | Processo de contratação da banca · SEI |
| 04 | 00:21–00:28 | **146** · VAGAS AUTORIZADAS | O governo federal já autorizou 146 vagas para a Receita Federal. | Contador 0 → 146 · partículas geométricas · selo verde “Autorização oficial” · o número se parte em dois blocos | Portaria MGI nº 5.505/2026 |
| 05 | 00:28–00:35 | **116** ANALISTA-TRIBUTÁRIO · **30** AUDITOR-FISCAL | São 116 vagas para analista-tributário e 30 para auditor-fiscal. | Dois cartões entram em sentidos opostos e contam · linha verde divide · saem na vertical | Portaria MGI nº 5.505/2026 |
| 06 | 00:35–00:42 | AUDITOR **R$ 24.113,71** · ANALISTA **R$ 13.927,99** | As remunerações iniciais, incluindo auxílio-alimentação, chegam a mais de 24 mil reais. | Grade financeira discreta · algarismos girando um a um · verde só nas cifras · “Valores iniciais brutos, incluindo auxílio-alimentação” | Imprensa especializada · out/2026 |
| 07 | 00:42–00:49 | NÍVEL SUPERIOR · **QUALQUER ÁREA** | E atenção: os dois cargos exigem graduação, mas aceitam formação em qualquer área. | Ícone de diploma · Direito, Engenharia, Administração, Contabilidade em sequência rápida · fica “QUALQUER ÁREA” · “Diploma de graduação reconhecida pelo MEC” · “QUALQUER” vira uma linha | Lei nº 10.593/2002, art. 3º |
| 08 | 00:49–00:56 | **DEZEMBRO** 2026 · PREVISÃO DE EDITAL | A expectativa divulgada pela Receita Federal é publicar o edital ainda em dezembro. | Meses passam e param em dezembro · selo tracejado “PREVISÃO — NÃO CONFIRMADO” · edital desfocado ao fundo · tudo desliza para a esquerda | Previsão divulgada pela Receita Federal |
| 09 | 00:56–01:03 | PRAZO DA AUTORIZAÇÃO · INÍCIO DE JANEIRO **2027** | Pela autorização, o prazo para publicação se estende até o início de janeiro de 2027. | Linha do tempo jul/2026 → jan/2027 com faixa verde · marcador cheio = autorização e prazo · marcador tracejado = previsão de dezembro | Portaria MGI nº 5.505/2026 · prazo de 6 meses |
| 10 | 01:03–01:10 | OBJETIVA · DISCURSIVA · VIDA PREGRESSA · CURSO DE FORMAÇÃO | O planejamento prevê provas objetivas, discursivas, pesquisa de vida pregressa e curso de formação. | Quatro cartões em sequência com ícones de linha · “Conforme planejamento; detalhes definitivos no edital” · cartões convergem | Planejamento do concurso |
| 11 | 01:10–01:17 | O edital ainda não saiu. · SUA PREPARAÇÃO **JÁ COMEÇOU?** | Esperar a publicação do edital pode custar um tempo precioso de preparação. | Mesa com livros, tablet e relógio digital avançando · área livre para a enquete · escurece no fim | — |
| 12 | 01:17–01:24 | RECEITA FEDERAL 2026 · NÃO PERCA AS PRÓXIMAS ATUALIZAÇÕES. · SIGA PARA MAIS ATUALIZAÇÕES · NEXO FISCAL | Quer acompanhar cada novidade do concurso? Siga a NEXO Fiscal. | “RECEITA” volta · cortina verde · chamada grande, marca com borda verde, @ no rodapé · fade para preto | — |

Em todos os cards: barra de progresso com o número do card (01/12…12/12), narração em legenda palavra por palavra (o story funciona sem som) e faixa “Atualização” com os fatos rolando (cards 02 a 10). Tudo fica entre y 250 e y 1580.

## Som

A trilha (`public/audio/receita-2026-trilha.mp3`) é sintetizada pelo `scripts/receita-2026-trilha.py`, sem amostras de terceiros: pulso grave a 120 BPM (14 batidas por card, cada corte cai na batida), som grave na tela preta, batida no “RECEITA”, batida em cada corte, relógio no card 11 e a trilha some no card 12. Ela fica baixa de propósito, para ficar por baixo da narração.

- **Narração:** grave as 12 falas (a coluna “Narração”) num único arquivo de 84 s, com cada fala começando no início do card dela (a do card 01 em 1 s, a do card 12 em 1:19). Coloque o arquivo em `public/` e renderize com `--props='{"narrationSrc":"audio/narracao.mp3"}'`.
- **Sem trilha:** `--props='{"soundtrack":false}'` (para usar uma música da biblioteca do Instagram).
- **Sem legenda:** `--props='{"captions":false}'`.
- **Foto real do prédio:** coloque uma foto licenciada em `public/` e use `--props='{"buildingSrc":"img/predio.jpg"}'`. Sem ela, o card 01 usa a ilustração do sistema.

Renderizar tudo de novo (12 cards, guia e prévia): `npm run receita2026:render`.

## Como publicar

1. Suba os 12 arquivos de `exports/stories/receita-2026/` como stories, na ordem 01 → 12, de uma vez.
2. No **card 11**, adicione a **figurinha de enquete** sem pergunta (a pergunta já está na tela), com as opções “JÁ ESTOU ESTUDANDO” e “VOU COMEÇAR”, na área marcada em `DS-STORY-receita-2026-11-guia.png` (centro, entre y 790 e y 1010).
3. No card 12, se quiser, adicione a figurinha de menção ao @nexofiscalbr logo abaixo da marca.
4. Fixe a sequência num destaque “Receita 2026” e atualize quando a banca sair.

**Capa.** O vídeo abre com a capa no 1º segundo (fundo claro, “RECEITA FEDERAL 2026”, 146 vagas, 17 propostas, previsão de dezembro), então o feed e a grade já mostram conteúdo antes do play, sem tela preta. Todo o texto fica dentro do recorte 4:5 do feed e do 3:4 da grade. Se o Instagram escolher outro quadro, use **Editar capa** e deixe o seletor no início, ou **Adicionar da galeria** com `exports/stories/receita-2026/DS-STORY-receita-2026-capa.jpg`. Texto em `RECEITA_2026.cover` (`src/ds/copy.ts`).

## Checagem dos fatos (27/10/2026)

| Fato | Situação | Onde |
|---|---|---|
| 146 vagas: 116 Analista-Tributário e 30 Auditor-Fiscal | Confirmado | Portaria MGI nº 5.505/2026, publicada em 03/07/2026 |
| Prazo para o edital: início de janeiro de 2027 | Confirmado (6 meses da portaria). A imprensa cita 3 ou 4/01/2027, por isso o vídeo diz só “início de janeiro” | Portaria MGI nº 5.505/2026 |
| Edital em dezembro de 2026 | Previsão divulgada, sem data oficial. O vídeo marca “PREVISÃO — NÃO CONFIRMADO” | Imprensa especializada |
| 17 propostas | 17 registros do tipo “Proposta” no SEI. Não provam 17 instituições diferentes, e os nomes não foram divulgados. O vídeo diz “registradas no processo” | Processo SEI, via imprensa |
| Minuta de dispensa de licitação | Registrada no SEI em 20/10/2026; o conteúdo não é público | Processo SEI, via imprensa |
| Nível superior, qualquer área | Lei nº 10.593/2002, art. 3º (graduação concluída, sem área específica) | Lei |
| Etapas | Objetiva, discursiva e curso de formação constam do planejamento noticiado (o curso de formação também está no art. 3º, § 4º, da Lei nº 10.593/2002). Vida pregressa houve no concurso anterior e **não foi confirmada para 2026** | Imprensa especializada |
| Remuneração | **Validar** (abaixo) | — |

## Validar antes de postar

1. **Remuneração (card 06).** Os valores do briefing batem com o vencimento básico inicial da tabela de 2023 somado a R$ 1.192,00 de auxílio-alimentação (R$ 22.921,71 + R$ 1.192,00 = R$ 24.113,71 · R$ 12.735,99 + R$ 1.192,00 = R$ 13.927,99), **sem o bônus de eficiência**. Outra matéria cita R$ 23.847,76 para auditor, e há tabelas de reajuste para 2025 e 2026 (PL 1466/2025) que não confirmei em vigor. Antes de publicar: confira a tabela vigente e o valor do auxílio. Sugestão para quem é da área: trocar a legenda por “Vencimento básico inicial + auxílio-alimentação; sem bônus de eficiência”.
2. **Vida pregressa (card 10).** Não confirmada para 2026. Se quiser manter só o que está confirmado, troque por “Objetiva · Discursiva · Curso de formação” (3 cartões).
3. **Datas do card 03** (30/09 e 20/10): lidas pela imprensa no SEI. Confira no processo, se tiver acesso.
4. **Marca:** a assinatura do card 12 é tipográfica (NEXO em Inter 900 + FISCAL em mono). Se houver um arquivo de logotipo oficial, ele entra no lugar.
5. **Prédio:** a ilustração é genérica, não é foto. Para foto, use uma imagem com licença (Agência Gov, banco de imagens) via `buildingSrc`.

## Fontes consultadas

- Focus Concursos: [146 vagas confirmadas e edital nos próximos meses](https://noticias.focusconcursos.com.br/noticias/concurso-rf-confirmadas-146-vagas-e-edital-nos-proximos-meses) · [edital autorizado, salários de R$ 24 mil](https://noticias.focusconcursos.com.br/noticias/concurso-rf-edital-e-autorizado-com-146-vagas-salarios-de-r-24-mil)
- Estratégia Concursos: [concurso Receita Federal](https://www.estrategiaconcursos.com.br/blog/concurso-receita-federal/) · [Receita Federal em 2026](https://www.estrategiaconcursos.com.br/blog/concurso-receita-federal-em-2026/)
- Portal de Prefeitura: [governo autoriza 146 vagas](https://portaldeprefeitura.com.br/oportunidades/concurso-receita-federal-governo-autoriza-novo-edital-com-146-vagas/626036/) · [edital em dezembro](https://portaldeprefeitura.com.br/oportunidades/concurso-receita-federal-edital-com-146-vagas-sera-publicado-dezembro/631808/) · [novos avanços](https://portaldeprefeitura.com.br/oportunidades/concurso-receita-federa-tem-novos-avancos-preve-edital-dezembro/634066/) · [banca avança](https://portaldeprefeitura.com.br/oportunidades/concurso-receita-federal-banca-avanca-anuncio-a-qualquer-momento/634564/)
- Qconcursos: [minuta de dispensa para a banca](https://folha.qconcursos.com/n/concurso-receita-federal-2026-minuta-de-dispensa-banca) · [17 propostas em análise](https://folha.qconcursos.com/n/concurso-receita-federal-bancas-em-analise-2026)
- Gran Cursos: [17 propostas enviadas](https://blog.grancursosonline.com.br/concurso-receita-federal-17-propostas-bancas/amp/) · [curso de formação em SP](https://blog.grancursosonline.com.br/?p=79969754) · [cargos e salários 2026](https://blog.grancursosonline.com.br/concurso-receita-federal-cargos-e-salarios-2026/amp/)
- Diário do Pará: [banca pode ser anunciada a qualquer momento](https://diariodopara.com.br/noticias/concurso-receita-federal-banca-pode-ser-anunciada-a-qualquer-momento-veja-o-que-ja-se-sabe/)
- Direção Concursos: [salários após reajuste](https://www.direcaoconcursos.com.br/noticias/concurso-receita-federal-salarios-apos-reajuste)
- Lei nº 10.593/2002 (texto atualizado na [Câmara](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10593-6-dezembro-2002-489911-normaatualizada-pl.html))
