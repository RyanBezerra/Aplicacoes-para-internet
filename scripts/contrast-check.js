function hexToRgb(hex) {
  const cleaned = hex.replace("#", "").trim();
  if (![3, 6].includes(cleaned.length)) {
    throw new Error(`Hex inválido: ${hex}`);
  }
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;
  const int = Number.parseInt(full, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function srgbToLinear(channel) {
  const v = channel / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance({ r, g, b }) {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hexA, hexB) {
  const L1 = relativeLuminance(hexToRgb(hexA));
  const L2 = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function fmt(n) {
  return `${n.toFixed(2)}:1`;
}

const combos = [
  { name: "Texto padrão em fundo (body)", fg: "#1c1c1e", bg: "#f4f1eb" },
  { name: "Texto em surface (cards/seções)", fg: "#1c1c1e", bg: "#ffffff" },
  { name: "Texto muted em fundo (body)", fg: "#5c5c63", bg: "#f4f1eb" },
  { name: "Texto ink em surface (destaques)", fg: "#0a1628", bg: "#ffffff" },
  { name: "CTA primário (texto) em accent", fg: "#ffffff", bg: "#c73e2b" },
  { name: "CTA primário hover (texto) em accent-hover", fg: "#ffffff", bg: "#a83222" },
  { name: "Nav CTA (texto) em primary", fg: "#ffffff", bg: "#0d4f6c" },
  { name: "Nav CTA hover (texto) em primary-hover", fg: "#ffffff", bg: "#0a3d54" },
  { name: "Texto branco em ink (section-accent)", fg: "#ffffff", bg: "#0a1628" },
  { name: "Texto branco 88% em ink (section-head-light)", fg: "#e0e0e0", bg: "#0a1628" },
];

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

const rows = combos.map((c) => {
  const ratio = contrastRatio(c.fg, c.bg);
  const okNormal = ratio >= AA_NORMAL;
  const okLarge = ratio >= AA_LARGE;
  return { ...c, ratio, okNormal, okLarge };
});

console.log("WCAG 2.1 contraste (AA):");
for (const r of rows) {
  const status = r.okNormal ? "AA (normal)" : r.okLarge ? "AA (texto grande)" : "Falha";
  console.log(`- ${r.name}: ${r.fg} / ${r.bg} -> ${fmt(r.ratio)} (${status})`);
}
