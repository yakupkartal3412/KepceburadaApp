# Web dosyalarini Android assets klasorune kopyala
$source = "C:\Users\lenovo\.gemini\antigravity\scratch\kiralik-kepce"
$dest   = "C:\Users\lenovo\.gemini\antigravity\scratch\KepceburadaApp\app\src\main\assets"

# Hedef dizini olustur
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# Ana dosyalari kopyala
Copy-Item "$source\index.html"  "$dest\index.html"  -Force
Copy-Item "$source\styles.css"  "$dest\styles.css"  -Force
Copy-Item "$source\app.js"      "$dest\app.js"      -Force

Write-Host "Ana dosyalar kopyalandi: index.html, styles.css, app.js"

# assets/ klasorunu kopyala (resimler)
if (Test-Path "$source\assets") {
    $destAssets = "$dest\assets"
    New-Item -ItemType Directory -Force -Path $destAssets | Out-Null
    Copy-Item "$source\assets\*" $destAssets -Recurse -Force
    $count = (Get-ChildItem $destAssets).Count
    Write-Host "assets/ klasoru kopyalandi: $count dosya"
} else {
    Write-Host "UYARI: assets/ klasoru bulunamadi"
}

Write-Host ""
Write-Host "TAMAMLANDI! Web dosyalari Android projesine kopyalandi."
Write-Host "Simdi Android Studio'da projeyi aciniz:"
Write-Host "C:\Users\lenovo\.gemini\antigravity\scratch\KepceburadaApp"
