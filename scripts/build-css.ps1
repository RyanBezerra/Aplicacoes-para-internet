# Gera css/site.bundle.css com @layer (Aula 11) — ordem ITCSS em uma requisição.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

$layerGroups = @(
  @{
    Name  = "tokens"
    Files = @(
      "css/tokens/primitives.css",
      "css/tokens/spacing.css",
      "css/tokens/typography.css",
      "css/tokens/semantic.css"
    )
  },
  @{ Name = "reset"; Files = @("css/reset.css") },
  @{ Name = "base"; Files = @("css/base.css") },
  @{ Name = "layout"; Files = @("css/layout.css") },
  @{
    Name  = "components"
    Files = @(
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
  },
  @{ Name = "overrides"; Files = @("css/overrides.css") }
)

$outPath = Join-Path $root "css/site.bundle.css"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$sw = New-Object System.IO.StreamWriter($outPath, $false, $utf8NoBom)
try {
  $sw.WriteLine("/* Paraiba Turismo - bundle (Aula 11: @layer + ITCSS) */")
  $sw.WriteLine("@layer tokens, reset, base, layout, components, overrides;")
  $sw.WriteLine()

  foreach ($group in $layerGroups) {
    $sw.WriteLine("@layer $($group.Name) {")
    foreach ($rel in $group.Files) {
      $path = Join-Path $root $rel
      $sw.WriteLine("  /* $rel */")
      $raw = Get-Content -LiteralPath $path -Raw -Encoding UTF8
      if ($raw.Trim().Length -gt 0) {
        $sw.Write($raw)
        if ($raw -notmatch '\r?\n\z') { $sw.WriteLine() }
        $sw.WriteLine()
      }
    }
    $sw.WriteLine("}")
    $sw.WriteLine()
  }
}
finally {
  $sw.Close()
}
Write-Host "Gerado: $outPath"
