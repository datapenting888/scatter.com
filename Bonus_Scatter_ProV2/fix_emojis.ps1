$utf8 = New-Object System.Text.UTF8Encoding($false) # UTF-8 without BOM

$files = @(
  'c:\Users\hp\Downloads\Bonus_Scatter_ProV2\index.events.js',
  'c:\Users\hp\Documents\live-chat\Bonus_Scatter_ProV2\index.events.js',
  'c:\Users\hp\Documents\live-chat\Bonus_Scatter_ProV2_Extracted\index.events.js',
  'c:\Users\hp\Downloads\Bonus_Scatter_ProV2\index.html',
  'c:\Users\hp\Documents\live-chat\Bonus_Scatter_ProV2\index.html',
  'c:\Users\hp\Documents\live-chat\Bonus_Scatter_ProV2_Extracted\index.html'
)

foreach ($file in $files) {
  if (Test-Path $file) {
    # Read as Windows-1252 to ensure we get the exact mojibake characters correctly if they are saved that way
    $text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::GetEncoding(1252))
    
    # Replace the mojibake with the actual emojis
    $text = $text.Replace('ðŸ¤–', '🤖')
    $text = $text.Replace('Ã°Å¸Â¤â€“', '🤖')
    $text = $text.Replace('ðŸ›‘', '🛑')
    $text = $text.Replace('Ã°Å¸â€ºâ€˜', '🛑')
    
    # Save back as pure UTF-8 without BOM
    [System.IO.File]::WriteAllText($file, $text, $utf8)
    Write-Host "Fixed emojis in $file"
  }
}
