# Gera css/site.bundle.css a partir da ordem ITCSS (uma requisição CSS no navegador).
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$files = @(
  "css/tokens/primitives.css",
  "css/tokens/spacing.css",
  "css/tokens/typography.css",
  "css/tokens/semantic.css",
  "css/reset.css",
  "css/base.css",
  "css/layout.css",
  "css/components/nav.css",
  "css/components/navbar.css",
  "css/components/hero.css",
  "css/components/card.css",
  "css/components/gastro.css",
  "css/components/tabs.css",
  "css/components/form.css",
  "css/components/btn.css",
  "css/components/footer.css",
  "css/utilities.css"
)
$outPath = Join-Path $root "css/site.bundle.css"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$sw = New-Object System.IO.StreamWriter($outPath, $false, $utf8NoBom)
try {
  foreach ($rel in $files) {
    $path = Join-Path $root $rel
    $sw.WriteLine("/* $rel */")
    $raw = Get-Content -LiteralPath $path -Raw -Encoding UTF8
    $sw.Write($raw)
    if ($raw -notmatch '\r?\n\z') { $sw.WriteLine() }
    $sw.WriteLine()
  }
}
finally {
  $sw.Close()
}
Write-Host "Gerado: $outPath"
