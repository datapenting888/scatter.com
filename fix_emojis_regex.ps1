$utf8 = New-Object System.Text.UTF8Encoding($false) # UTF-8 without BOM

$files = @(
  'c:\Users\hp\Downloads\Bonus_Scatter_ProV2\index.events.js',
  'c:\Users\hp\Documents\live-chat\Bonus_Scatter_ProV2\index.events.js',
  'c:\Users\hp\Documents\live-chat\Bonus_Scatter_ProV2_Extracted\index.events.js'
)

foreach ($file in $files) {
  if (Test-Path $file) {
    # Read the file bytes and decode as Windows-1252 to ensure we match correctly
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $text = [System.Text.Encoding]::GetEncoding(1252).GetString($bytes)
    
    # Target lines directly using specific regexes
    $text = [regex]::Replace($text, "el\.assistantBtn\.textContent = '[^']+'", "el.assistantBtn.textContent = '🤖 Asisten Cek'")
    # We also need to fix line 585 which should say '🛑 Hentikan Asisten'
    # Wait, the previous replace replaces all `el.assistantBtn.textContent = '...'`.
    # Let's be safer by reading lines instead of a single string.
  }
}
