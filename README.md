# fiscvision-site

Projeto Next.js (App Router) com TypeScript e Tailwind CSS v4.

## Versões

| Pacote            | Declarado         | Instalado                     |
| ----------------- | ----------------- | ----------------------------- |
| next              | `^16.2.11`        | 16.2.11                       |
| react / react-dom | `19.2.4` (fixo)   | 19.2.4                        |
| tailwindcss       | `^4`              | 4.3.3 (via @tailwindcss/postcss) |

O `package-lock.json` trava o Next em 16.2.11. Use `npm ci` para reproduzir
exatamente essas versões em outra máquina.

## Scripts

```bash
npm run dev     # servidor de desenvolvimento (Turbopack)
npm run build   # build de produção
npm run start   # servidor de produção
npm run lint    # ESLint
```

## Estrutura

```
src/app/
  layout.tsx              # fontes Plus Jakarta Sans + IBM Plex Mono, metadata
  page.tsx                # composição da landing page
  globals.css             # @import "tailwindcss" + @theme com os tokens da marca
src/app/api/relatorio/
  route.ts                # proxy server-side para o webhook do agente (n8n)
src/components/
  site-header.tsx         # header sticky com logo e navegação
  hero.tsx                # hero + card "Resumo dos últimos 6 meses"
  sobre.tsx               # as 4 etapas do agente
  demo-fiscal.tsx         # client component: CNPJ, período e chamada ao agente
  diagnostico.tsx         # formulário: CNPJ + período do relatório
  relatorio.tsx           # documento do agente (vazio / carregando / erro / pronto)
  documento-markdown.tsx  # markdown -> documento com a tipografia da marca
  site-footer.tsx
  futuro/
    relatorio-semaforo.tsx  # feature parada: painel de semáforo + plano de ação
src/lib/
  relatorio-api.ts        # cliente do /api/relatorio
  competencia.ts          # data da consulta em dd/MM/yyyy (America/Sao_Paulo)
  cnpj.ts                 # máscara, dígitos e validação de tamanho
  fiscvision-data.ts      # etapas, períodos e os dados da feature parada
public/logo-fiscvision.svg
```

## Integração com o agente

O botão **Gerar Diagnóstico** chama `POST /api/relatorio`, que monta o payload e
repassa ao webhook do n8n:

```json
[{ "cnpj": "42213647000141", "competencia": "22/09/2026", "amostragem(meses)": 1 }]
```

- `cnpj` vai sem máscara;
- `competencia` é a data do envio, gerada pelo servidor — não vem do formulário;
- `amostragem(meses)` é o período escolhido no formulário.

A resposta esperada é `{ "conteudo_doc": "<markdown>", "nome_doc": "<título>" }`,
solta ou dentro de um array. O proxy também aceita markdown puro no corpo.

A URL sai de `FISCVISION_WEBHOOK_URL` (veja `.env.example`); sem a variável, usa a
de produção.

## Design tokens

As cores da marca vivem no bloco `@theme` de `src/app/globals.css` (Tailwind v4,
sem `tailwind.config`). Ex.: `--color-navy`, `--color-cyan`, e o semáforo fiscal
`--color-regular` / `--color-atencao` / `--color-critico` / `--color-na`, cada um
com variantes `-soft`, `-tint`, `-dot` e `-label`.

Como o Tailwind lê classes por varredura de texto, os nomes de classe do semáforo
ficam escritos por extenso em `src/lib/fiscvision-data.ts` — nunca monte classes
concatenando strings em runtime.

## Mockup original

A pasta `FiscVision fiscal intelligence site/` guarda o protótipo exportado do
editor visual (formato `x-dc` + `support.js`). Serviu de referência para esta
versão e não faz parte do build — está no ignore do ESLint e pode ser removida.
