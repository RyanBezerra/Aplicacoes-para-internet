### Aplicações para Internet — Aula 09
### JavaScript na página — interatividade e comportamentos

Esta entrega evolui o projeto da **Aula 08** (layout responsivo com Flexbox, Grid e media queries), acrescentando **JavaScript em arquivo externo** (`js/main.js`), **padrões de acessibilidade** (teclado e ARIA) e **feedback visual** ao rolar a página.

- ### Brief do projeto (requisitos)
- **1) Contexto (2–3 frases)**: Projeto de **landing page** em **HTML/CSS** para praticar **layout responsivo**. O foco é reorganizar o conteúdo com **Flexbox/Grid** e **media queries** em três breakpoints.
- **2) Público-alvo**: Pessoas **16–35 anos**, acessando em contexto de uso rápido no dia a dia. **Dispositivo principal**: **smartphone**.
- **3) Dor principal**: O usuário não consegue **ler e navegar bem em diferentes telas** quando o layout não é responsivo (quebras/overflow/zoom).
- **4) Critério de sucesso**: **O usuário consegue** usar o site em **375px, 768px e 1024px** sem scroll horizontal, com texto/imagens legíveis e navegação clara.

- **Stack**: HTML5 / CSS3  
- **Carga horária**: 2 horas  
- **Professor**: Jeofton Costa  

### Conteúdo desta aula
- **JavaScript no front-end**: arquivo externo, escopo com IIFE e boas práticas (`strict`)
- **DOM e eventos**: `addEventListener`, manipulação de classes e atributos ARIA
- **Acessibilidade em componentes**: menu expansível, abas (`role="tablist"` / teclado), formulário com `aria-live`
- **Performance em scroll**: `requestAnimationFrame`, listener `passive` e estado visual no cabeçalho
- **Validação de formulário**: campos obrigatórios e formato de e-mail no cliente (demonstração, sem envio ao servidor)

### Alterações realizadas nesta versão (Aula 09)

- **`index.html`**: inclusão de `<script src="js/main.js" defer></script>`; **skip link** “Ir para o conteúdo”; **cabeçalho** com botão **menu hambúrguer** (`#navToggle`) e navegação associada (`aria-expanded`, `aria-controls`); **abas de roteiros** (`data-tabs`, `role="tab"` / `tabpanel`); **formulário de contato** com `novalidate`, hints e região de feedback (`#formFeedback`, `role="status"`); **rodapé** com ano dinâmico (`#anoAtual`) e botão **voltar ao topo** (`#btnTopo`).
- **`js/main.js`**: menu mobile (abrir/fechar, fechar ao seguir âncora em telas ≤860px, **Escape**); **abas** com suporte a **setas**, **Home** e **End**; **lista de sabores** da gastronomia injetada na grade de tags; **validação** do formulário e mensagens de sucesso/erro; **scroll suave** para o topo com devolução de foco ao `#topo`; **desafio extra da aula**: ao rolar mais de **80px**, aplica a classe **`header--scrolled`** no `.site-header` usando **`requestAnimationFrame`** para não sobrecarregar o scroll.
- **`css/components/navbar.css`** (e demais estilos já existentes): estilos para o **estado com rolagem** (`.site-header.header--scrolled`), com transição visual do cabeçalho compacto sobre o fundo da página.

> **Nota:** O roteiro passo a passo da seção **“Etapa prática — Roteiro”** abaixo corresponde ao trabalho de **responsividade da Aula 08** e permanece como referência do que já foi aplicado na base do layout.

### Etapa prática — Roteiro
### Tornando o projeto da dupla responsivo

#### 7.1 Objetivo da atividade
Ao final desta prática, o layout do projeto deve funcionar em **três pontos de quebra**:
- **Mobile**: \(< 480px\)
- **Tablet**: \(\ge 768px\)
- **Desktop**: \(\ge 1024px\)

Você deve aplicar **Flexbox e/ou Grid** para redistribuir os elementos, **Media Queries** para acionar mudanças de layout e **unidades relativas** para manter proporções que escalem naturalmente.

#### 7.2 Pré-requisitos e setup
- **Estrutura semântica** no HTML (ex.: `header`, `main`, `footer`, etc.)
- **CSS em arquivo externo** (ex.: `style.css`)
- **Meta tag viewport** configurada no HTML
- **VS Code + Live Server**
- **Chrome DevTools** com **Device Toolbar** (`Ctrl+Shift+M`) para testar breakpoints

Garanta que esta linha exista dentro do `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### 7.3 Roteiro passo a passo

##### Passo 1 — Audit do layout atual (10 min)
1. Abra o projeto no VS Code e no browser com Live Server.
2. No DevTools, ative o Device Toolbar e teste nas larguras: **375px**, **768px**, **1280px**.
3. Anote problemas encontrados: **overflow horizontal**, texto ilegível, imagens muito grandes, colunas colapsando, etc.
4. Liste quais elementos precisam mudar de layout entre os breakpoints.

##### Passo 2 — Definir variáveis CSS e breakpoints (10 min)
No início do `style.css`, adicione tokens e tipografia fluida (mobile-first):

```css
:root {
  /* Breakpoints como variáveis comentadas (não funcionam em @media, mas servem de referência) */
  /* --bp-sm: 480px; --bp-md: 768px; --bp-lg: 1024px; --bp-xl: 1280px; */

  /* Tokens de espaçamento */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;

  /* Tipografia fluida */
  --fs-base: clamp(0.875rem, 2vw, 1rem);
  --fs-h1: clamp(1.75rem, 4vw, 2.5rem);
  --fs-h2: clamp(1.25rem, 3vw, 1.875rem);
}

body {
  font-size: var(--fs-base);
  line-height: 1.6;
}

h1 { font-size: var(--fs-h1); }
h2 { font-size: var(--fs-h2); }
```

- **Checkpoint 1**: ao redimensionar a janela, a tipografia deve crescer suavemente com `clamp()`.

##### Passo 3 — Converter o layout base para mobile-first (15 min)
1. Remova/comente larguras fixas (ex.: `width: 960px`, `width: 1200px`) do CSS existente.
2. Transforme o layout principal para **coluna única** com Flexbox ou Grid:

```css
/* LAYOUT BASE — Mobile (<480px): coluna única */
header {
  display: flex;
  flex-direction: column; /* logo e nav empilhados verticalmente */
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-xs);
  list-style: none;
  padding: 0;
}

main {
  display: grid;
  grid-template-columns: 1fr; /* coluna única no mobile */
  gap: var(--space-md);
  padding: var(--space-sm);
  max-width: 1200px;
  margin-inline: auto;
}

/* Seção de cards — auto-fit: naturalmente responsivo! */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-md);
}
```

- **Checkpoint 2**: em **375px** o layout deve ficar em coluna única **sem overflow horizontal**.

##### Passo 4 — Adicionar breakpoints para tablet e desktop (15 min)

```css
/* ── TABLET: >= 768px ─────────────────────────────── */
@media (min-width: 768px) {
  header {
    flex-direction: row; /* logo e nav lado a lado */
    justify-content: space-between;
    padding: var(--space-sm) var(--space-lg);
  }

  main {
    /* Layout com sidebar: sidebar 240px + conteúdo principal */
    grid-template-columns: 240px 1fr;
    grid-template-areas:
      "sidebar main"
      "sidebar main";
    padding: var(--space-md) var(--space-lg);
  }

  .sidebar { grid-area: sidebar; }
  .content { grid-area: main; }
}

/* ── DESKTOP: >= 1024px ───────────────────────────── */
@media (min-width: 1024px) {
  main {
    grid-template-columns: 280px 1fr 220px; /* sidebar + main + aside */
    grid-template-areas: "sidebar main aside";
  }

  .aside { grid-area: aside; }
}
```

- **Checkpoint 3**: valide nos três breakpoints:
  - **375px**: coluna única
  - **768px**: sidebar visível
  - **1024px**: 3 colunas (se aplicável)

##### Passo 5 — Verificação final e polimento (10 min)
5. Teste em dispositivos reais (se possível) ou no emulador do Chrome.
6. Ajuste imagens para responsividade.
7. Ajuste formulários/inputs para mobile.
8. Teste orientação landscape no mobile.
9. Valide HTML e CSS:
   - `validator.w3.org`
   - `jigsaw.w3.org/css-validator`

Trechos recomendados:

```css
/* Reset de imagens responsivas — aplicar globalmente */
img, video, iframe {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Inputs responsivos */
input, select, textarea {
  width: 100%;
  box-sizing: border-box;
}
```

#### 7.4 Desafio extra (para duplas avançadas)
- Implementar **menu hambúrguer** funcional em mobile usando apenas CSS (checkbox hack ou `:focus-within`).
- Adicionar `prefers-color-scheme` para modo escuro automático.
- Usar `clamp()` para um sistema de espaçamento fluido completo (padding/margin).
- Adicionar `@media (prefers-reduced-motion: reduce)` para reduzir animações.

#### 7.5 Entregável
Entregar o **link do repositório GitHub** com o commit contendo as mudanças e **3 screenshots** do layout nos breakpoints **mobile**, **tablet** e **desktop** (capturados no Chrome DevTools).

<img width="675" height="1600" alt="image" src="https://github.com/user-attachments/assets/32dc6066-e439-4752-a170-1305de1c6898" />

### Evidências (screenshots)
#### Mobile (< 480px)
![Layout mobile](imgs/mobile.png)

#### Tablet (>= 768px)
![Layout tablet](imgs/tablet.png)

#### Desktop (>= 1024px)
![Layout desktop](imgs/laptop.png)

### Checklist de entrega (auditoria)

- **README.md (Aula 09)**: OK — identifica a **aula atual**, resume **alterações** (JS, ARIA, formulário, scroll no header) e mantém o **brief** e o roteiro da Aula 08 como referência.
- **README.md (problema completo)**: OK — contém **contexto**, **público-alvo**, **dor** e **critério de sucesso**.
- **Estrutura de pastas (ITCSS)**: OK — camadas criadas em `css/settings/`, `css/generic/`, `css/elements/`, `css/objects/`, `css/components/`, `css/utilities/`.
- **`variables.css` (cores + tipografia)**: OK — `css/settings/variables.css` com **paleta (>= 5 cores)** e **escala tipográfica completa** (tokens `--fs-200`…`--fs-900`).
- **`reset.css` (Modern CSS Reset)**: OK — aplicado em `css/generic/reset.css`.
- **`index.html` (imports na ordem + HTML semântico)**: OK — imports na ordem ITCSS e uso de `header`, `nav`, `main`, `section`, `article`, `footer`.
- **`js/main.js` (interatividade Aula 09)**: OK — menu, abas, formulário, tags dinâmicas, topo e estado `.header--scrolled` no scroll.
- **Contraste WCAG AA (texto/fundo)**: OK — verificação feita com script local (`scripts/contrast-check.js`).

#### Contraste (WCAG 2.1 — AA)

Combinações principais (texto/fundo) e resultado:

- **Texto padrão** `#1c1c1e` em **fundo** `#f4f1eb`: **15.09:1** (AA normal)
- **Texto** `#1c1c1e` em **surface** `#ffffff`: **17.01:1** (AA normal)
- **Muted** `#5c5c63` em **fundo** `#f4f1eb`: **5.88:1** (AA normal)
- **Ink** `#0a1628` em **surface** `#ffffff`: **18.13:1** (AA normal)
- **CTA (texto)** `#ffffff` em **accent** `#c73e2b`: **5.06:1** (AA normal)
- **CTA hover (texto)** `#ffffff` em **accent-hover** `#a83222`: **6.68:1** (AA normal)
- **Nav CTA (texto)** `#ffffff` em **primary** `#0d4f6c`: **8.93:1** (AA normal)
- **Nav CTA hover (texto)** `#ffffff` em **primary-hover** `#0a3d54`: **11.61:1** (AA normal)
- **Texto branco** `#ffffff` em **ink** `#0a1628`: **18.13:1** (AA normal)

Para reproduzir:

```bash
node scripts/contrast-check.js
```