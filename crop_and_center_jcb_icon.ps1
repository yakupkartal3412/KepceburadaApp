Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\lenovo\.gemini\antigravity\brain\ddc8b3ed-dc7f-4608-be8d-98a48d26f4ae\media__1788034159465.jpg"
$resDir = "C:\Users\lenovo\.gemini\antigravity\scratch\KepceburadaApp\app\src\main\res"

$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $srcImg.Width
$h = $srcImg.Height

# Bounding box of non-dark pixels
$minX = $w
$maxX = 0
$minY = $h
$maxY = 0

for ($y = 0; $y -lt $h; $y += 4) {
    for ($x = 0; $x -lt $w; $x += 4) {
        $pixel = $srcImg.GetPixel($x, $y)
        if (($pixel.R + $pixel.G + $pixel.B) -gt 50) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Detected JCB Bounding Box: MinX=$minX MaxX=$maxX MinY=$minY MaxY=$maxY"

# Add padding around bounding box
$cropX = [Math]::Max(0, $minX - 10)
$cropY = [Math]::Max(0, $minY - 10)
$cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + 20)
$cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + 20)

# Make crop rectangle square
$cropSide = [Math]::Max($cropW, $cropH)
$cropX = [Math]::Max(0, $cropX - [int](($cropSide - $cropW) / 2))
$cropY = [Math]::Max(0, $cropY - [int](($cropSide - $cropH) / 2))
if (($cropX + $cropSide) -gt $w) { $cropSide = $w - $cropX }
if (($cropY + $cropSide) -gt $h) { $cropSide = $h - $cropY }

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropSide, $cropSide)
$croppedBmp = $srcImg.Clone($cropRect, $srcImg.PixelFormat)

$densities = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

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

    # Dark background fill (#0A0F1D dark studio navy)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 10, 15, 29))
    $g.FillRectangle($brush, $rect)
    $brush.Dispose()

    # Draw cropped JCB centered & filling 94% of the icon frame
    $padding = [int]($size * 0.03)
    $drawSize = $size - ($padding * 2)
    $g.DrawImage($croppedBmp, $padding, $padding, $drawSize, $drawSize)
    $g.Dispose()

    $iconPath = Join-Path $targetFolder "ic_launcher.png"
    $roundIconPath = Join-Path $targetFolder "ic_launcher_round.png"

    $bmp.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Save($roundIconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    Write-Host "Updated perfectly cropped & centered JCB icon in $folder ($size x $size)"
}

$croppedBmp.Dispose()
$srcImg.Dispose()
Write-Host "SUCCESS: Perfectly cropped & zoomed JCB icon applied to all mipmap densities!"
