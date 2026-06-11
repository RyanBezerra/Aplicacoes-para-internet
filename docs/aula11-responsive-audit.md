# Aula 11 — Auditoria de responsividade (Paraíba Turismo)

Checklist técnico preenchido após revisão no DevTools (Device Toolbar). Status após correções desta entrega.

| # | Item | Breakpoint | Status |
|---|------|------------|--------|
| 01 | Nenhum scroll horizontal em 360px | 360px | OK — `overflow-x: clip` em `html`; `.split` mobile-first (1 coluna) |
| 02 | Texto legível sem zoom (≥14px computado) | 360px | OK — `html { font-size: clamp(16px, …) }`; `--fs-base` mínimo 1rem |
| 03 | Botões/links com toque ≥44×44px | 360px | OK — regras em `css/overrides.css` |
| 04 | Imagens não transbordam | todos | OK — `reset.css` (`max-width: 100%`) |
| 05 | Layout adapta (não só encolhe) em 768px | 768px | OK — grid 2 colunas; navegação horizontal |
| 06 | Navegação utilizável em 1024×768 landscape | 1024px | OK — menu expandido acima de 860px |
| 07 | Linhas ≤75 caracteres em desktop | 1200px | OK — `max-width: 75ch` em parágrafos longos |
| 08 | `max-width` acima de 1400px | 1440px | OK — `.container` limitado em `@media (min-width: 1400px)` |
| 09 | `:hover` com fallback para touch | todos | OK — efeitos de hover em `@media (hover: hover)` |
| 10 | Sem width/height fixo que quebra layout | todos | OK — revisado; ícones decorativos mantêm px |
| 11 | `font-size` base proporcional ao viewport | todos | OK — `clamp(16px, 1.1vw, 20px)` em `html` |
| 12 | Formulários sem zoom de input no iOS | 360px | OK — `font-size: max(1rem, 16px)` em inputs |

## Backlog (problemas encontrados na auditoria inicial)

### Item 01 — Falha → corrigido

1. **Problema:** `.split` usava `grid-template-columns: 1fr 1fr` abaixo de 768px, forçando duas colunas estreitas e risco de overflow em 360px.
2. **Causa:** abordagem desktop-first com `@media (max-width: 768px)`.
3. **Correção:** mobile-first — 1 coluna padrão; 2 colunas a partir de `769px`.

### Item 03 — Falha → corrigido

1. **Problema:** links da navegação e `.card-link` com `padding` vertical baixo (&lt;44px de área de toque).
2. **Causa:** estilo visual compacto sem `min-height`/`inline-flex`.
3. **Correção:** `min-height: 44px` e `inline-flex` em `overrides.css`.

### Item 09 — Falha → corrigido

1. **Problema:** cards e gastro mantinham sombra/elevação em `:hover` em dispositivos touch (hover “preso”).
2. **Causa:** `:hover` sem `@media (hover: hover)`.
3. **Correção:** hovers condicionados a dispositivos com ponteiro fino.

### Item 12 — Falha → corrigido

1. **Problema:** `--fs-hint` (0.8rem) e possível zoom no iOS se algum campo herdasse tamanho &lt;16px.
2. **Causa:** tokens relativos abaixo de 16px em hints/labels.
3. **Correção:** `input, select, textarea { font-size: max(1rem, 16px); }` global.

## Evidência visual — antes × depois

Screenshot comparativo do componente **`.card--media`** (seção Destinos), com container de 560px:

| Artefato | Caminho |
|----------|---------|
| Imagem | [`imgs/aula11-card-comparativo.png`](../imgs/aula11-card-comparativo.png) |
| Página de captura | [`docs/comparativo-card-aula11.html`](comparativo-card-aula11.html) (Live Server, viewport 1280×760px) |

- **Antes (Aula 10):** imagem sempre acima do texto (`flex-direction: column`).
- **Depois (Aula 11):** `@container destinos (min-width: 500px)` — imagem ao lado do corpo (`flex-direction: row`).

## Evoluções arquiteturais (Fase 2)

- **Caminho A:** `@layer tokens, reset, base, layout, components, overrides` em `css/main.css` e no bundle; remoção de `!important` em `.nav-cta` e `.tab-panel[hidden]` (mantido apenas em `prefers-reduced-motion` do reset).
- **Caminho B:** Container Queries em `.cards-grid` (`destinos`) e `.gastro-grid` (`gastro`); cards adaptam `flex-direction` pelo espaço do container.

## Carta do cliente (Fase 3)

- **Demanda 1 (projetor):** `@media (min-width: 1600px)` aumenta tokens de tipografia em `overrides.css`; escala fluida em `html`.
- **Demanda 2 (Tab):** `:focus-visible` global + classe `.using-keyboard` via `js/main.js`.

## @media vs @container

| | **@media** | **@container** |
|---|------------|----------------|
| Referência | Largura da **viewport** | Largura do **container pai** |
| Uso no projeto | Grid de colunas (768/1200px), menu mobile (860px), projetor (1600px) | Card e gastro-card dentro de grids com colunas variáveis |
| Quando preferir | Layout da página, navegação, tipografia global | Componente reutilizado em contextos de largura diferentes |
