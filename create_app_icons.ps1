Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\lenovo\.gemini\antigravity\brain\ddc8b3ed-dc7f-4608-be8d-98a48d26f4ae\makinebul_3d_app_icon_1788032931872.png"
$resDir = "C:\Users\lenovo\.gemini\antigravity\scratch\KepceburadaApp\app\src\main\res"

$densities = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

$srcImage = [System.Drawing.Image]::FromFile($srcPath)

foreach ($folder in $densities.Keys) {
    $size = $densities[$folder]
    $targetFolder = Join-Path $resDir $folder
    if (-not (Test-Path $targetFolder)) {
        New-Item -ItemType Directory -Path $targetFolder | Out-Null
    }

    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $g.DrawImage($srcImage, 0, 0, $size, $size)
    $g.Dispose()

    $iconPath = Join-Path $targetFolder "ic_launcher.png"
    $roundIconPath = Join-Path $targetFolder "ic_launcher_round.png"

    $bmp.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Save($roundIconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    Write-Host "Created app icon ($size x $size) in $folder"
}

$srcImage.Dispose()
Write-Host "All Android 3D Launcher Icons successfully created!"
