Add-Type -AssemblyName System.Drawing

$logoPath = "C:\Users\lenovo\.gemini\antigravity\scratch\kiralik-kepce\assets\logo_3d.png"
$resDir = "C:\Users\lenovo\.gemini\antigravity\scratch\KepceburadaApp\app\src\main\res"

$densities = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

$logoImg = [System.Drawing.Image]::FromFile($logoPath)

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

    # Background gradient fill (Deep Obsidian Navy #0F172A to #1E293B)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255, 15, 23, 42), [System.Drawing.Color]::FromArgb(255, 30, 41, 59), 135)
    $g.FillRectangle($brush, $rect)
    $brush.Dispose()

    # Draw subtle gold border
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 245, 158, 11), 2)
    $g.DrawRectangle($pen, 0, 0, $size - 1, $size - 1)
    $pen.Dispose()

    # Draw logo centered with padding
    $padding = [int]($size * 0.12)
    $logoSize = $size - ($padding * 2)
    $g.DrawImage($logoImg, $padding, $padding, $logoSize, $logoSize)
    $g.Dispose()

    $iconPath = Join-Path $targetFolder "ic_launcher.png"
    $roundIconPath = Join-Path $targetFolder "ic_launcher_round.png"

    $bmp.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Save($roundIconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    Write-Host "Updated official Play Store style app icon in $folder ($size x $size)"
}

$logoImg.Dispose()
Write-Host "SUCCESS: Official Play Store Icon applied to all mipmap densities!"
