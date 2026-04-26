### Aplicações para Internet — Aula 7
### Layout Moderno e Responsividade

- **Stack**: HTML5 / CSS3  
- **Carga horária**: 2 horas  
- **Professor**: Jeofton Costa  

### Conteúdo desta aula
- **Flexbox**: distribuição e alinhamento unidimensional
- **CSS Grid**: layout bidimensional e `grid-template-areas`
- **Media Queries**: breakpoints e estratégia mobile-first
- **Unidades de medida CSS**: absolutas e relativas
- **Prática**: tornar o layout do projeto responsivo

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

### Evidências (screenshots)
#### Mobile (< 480px)
![Layout mobile](imgs/mobile.png)

#### Tablet (>= 768px)
![Layout tablet](imgs/tablet.png)

#### Desktop (>= 1024px)
![Layout desktop](imgs/laptop.png)