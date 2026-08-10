$projectPath = "C:\Users\lenovo\.gemini\antigravity\scratch\KepceburadaApp"

$studioPaths = @(
    "C:\Program Files\Android\Android Studio\bin\studio64.exe",
    "C:\Program Files\Android\Android Studio\bin\studio.exe",
    "$env:LOCALAPPDATA\Android\Android Studio\bin\studio64.exe",
    "$env:LOCALAPPDATA\Programs\Android Studio\bin\studio64.exe",
    "$env:PROGRAMFILES\Android\Android Studio\bin\studio64.exe"
)

$found = $null
foreach ($p in $studioPaths) {
    if (Test-Path $p) {
        Write-Host "Android Studio bulundu: $p"
        $found = $p
        break
    }
}

if ($found) {
    Write-Host "Proje aciliyor: $projectPath"
    Start-Process $found $projectPath
} else {
    Write-Host "Android Studio bulunamadi. Manuel olarak acin."
    Write-Host "File > Open > $projectPath"
}
