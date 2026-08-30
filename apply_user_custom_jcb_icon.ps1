Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\lenovo\.gemini\antigravity\brain\ddc8b3ed-dc7f-4608-be8d-98a48d26f4ae\media__1788034159465.jpg"
$resDir = "C:\Users\lenovo\.gemini\antigravity\scratch\KepceburadaApp\app\src\main\res"

$densities = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

$srcImg = [System.Drawing.Image]::FromFile($srcPath)

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

    # Dark background fill (#0F172A to #020617 obsidian studio dark gradient)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255, 15, 23, 42), [System.Drawing.Color]::FromArgb(255, 2, 6, 23), 90)
    $g.FillRectangle($brush, $rect)
    $brush.Dispose()

    # Calculate aspect-ratio fit to fill icon beautifully
    $scale = [Math]::Max($size / $srcImg.Width, $size / $srcImg.Height)
    $drawW = [int]($srcImg.Width * $scale)
    $drawH = [int]($srcImg.Height * $scale)
    $posX = [int](($size - $drawW) / 2)
    $posY = [int](($size - $drawH) / 2)

    $g.DrawImage($srcImg, $posX, $posY, $drawW, $drawH)

    # Subtle gold glowing border around icon edge
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 245, 158, 11), 2)
    $g.DrawRectangle($pen, 0, 0, $size - 1, $size - 1)
    $pen.Dispose()

    $g.Dispose()

    $iconPath = Join-Path $targetFolder "ic_launcher.png"
    $roundIconPath = Join-Path $targetFolder "ic_launcher_round.png"

    $bmp.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Save($roundIconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    Write-Host "Created user's exact JCB 3CX studio app icon in $folder ($size x $size)"
}

$srcImg.Dispose()
Write-Host "SUCCESS: User's exact JCB 3CX photo applied to all mipmap densities!"
