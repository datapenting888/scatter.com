$csharp = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.IO;
using System.Runtime.InteropServices;

public class ImageProcessor {
    public static string Process(string imgPath) {
        using (Bitmap img = new Bitmap(imgPath)) {
            int width = img.Width;
            int height = img.Height;
            
            Rectangle rect = new Rectangle(0, 0, width, height);
            BitmapData bmpData = img.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            
            int bytes = Math.Abs(bmpData.Stride) * height;
            byte[] rgbValues = new byte[bytes];
            Marshal.Copy(bmpData.Scan0, rgbValues, 0, bytes);
            img.UnlockBits(bmpData);
            
            using (Bitmap filtered = new Bitmap(width, height, PixelFormat.Format32bppArgb)) {
                BitmapData filtData = filtered.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                byte[] filtValues = new byte[bytes];
                
                int minX = width, minY = height, maxX = 0, maxY = 0;
                
                // Ignore margins to avoid screenshot artifacts (like the black bar on the left)
                int leftMargin = (int)(width * 0.15);
                int rightMargin = (int)(width * 0.10);
                int topMargin = (int)(height * 0.05);
                int bottomMargin = (int)(height * 0.05);
                
                for (int y = 0; y < height; y++) {
                    for (int x = 0; x < width; x++) {
                        int offset = (y * bmpData.Stride) + (x * 4);
                        byte b = rgbValues[offset];
                        byte g = rgbValues[offset + 1];
                        byte r = rgbValues[offset + 2];
                        
                        int brightness = (r + g + b) / 3;
                        int alpha = 0;
                        
                        // Ignore the margins
                        if (x < leftMargin || x > width - rightMargin || y < topMargin || y > height - bottomMargin) {
                            brightness = 255; 
                        }
                        
                        if (brightness <= 250) {
                            // Boost alpha significantly to make the lines thicker and bolder
                            alpha = (int)((255 - brightness) * 1.8);
                            if (alpha > 255) alpha = 255;
                        }
                        
                        int filtOffset = (y * filtData.Stride) + (x * 4);
                        
                        // Set ALL pixels (transparent or not) to the tint color to prevent dark halo on resize
                        // Tint color: Bolder reddish-purple (RGB 180, 20, 100)
                        filtValues[filtOffset] = 100;    // B
                        filtValues[filtOffset + 1] = 20; // G
                        filtValues[filtOffset + 2] = 180; // R
                        
                        if (alpha > 20) {
                            filtValues[filtOffset + 3] = (byte)alpha; // A
                            
                            if (x < minX) minX = x;
                            if (y < minY) minY = y;
                            if (x > maxX) maxX = x;
                            if (y > maxY) maxY = y;
                        } else {
                            filtValues[filtOffset + 3] = 0; // A = 0 (Transparent)
                        }
                    }
                }
                
                Marshal.Copy(filtValues, 0, filtData.Scan0, bytes);
                filtered.UnlockBits(filtData);
                
                if (maxX < minX || maxY < minY) {
                    minX = 0; minY = 0; maxX = width - 1; maxY = height - 1;
                }
                
                // Add 1 pixel padding to avoid edge cutoff during anti-aliasing
                minX = Math.Max(0, minX - 1);
                minY = Math.Max(0, minY - 1);
                maxX = Math.Min(width - 1, maxX + 1);
                maxY = Math.Min(height - 1, maxY + 1);
                
                int cropWidth = maxX - minX + 1;
                int cropHeight = maxY - minY + 1;
                
                Rectangle cropRect = new Rectangle(minX, minY, cropWidth, cropHeight);
                using (Bitmap cropped = filtered.Clone(cropRect, filtered.PixelFormat)) {
                    using (Bitmap resized = new Bitmap(48, 48)) {
                        using (Graphics g = Graphics.FromImage(resized)) {
                            // Use high quality interpolation without edge wrapping artifacts
                            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                            
                            // ImageAttributes with WrapMode.TileFlipXY prevents edge bleeding from outside the image bounds
                            using (ImageAttributes wrapMode = new ImageAttributes()) {
                                wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                                g.DrawImage(cropped, new Rectangle(0, 0, 48, 48), 0, 0, cropped.Width, cropped.Height, GraphicsUnit.Pixel, wrapMode);
                            }
                        }
                        
                        using (MemoryStream ms = new MemoryStream()) {
                            resized.Save(ms, ImageFormat.Png);
                            byte[] byteImage = ms.ToArray();
                            return Convert.ToBase64String(byteImage);
                        }
                    }
                }
            }
        }
    }
}
"@

Add-Type -TypeDefinition $csharp -ReferencedAssemblies System.Drawing

$imgPath = "C:\Users\hp\.gemini\antigravity\brain\64ab083e-a059-4704-acad-3693f6d2a6d8\media__1783305507204.png"
$base64 = [ImageProcessor]::Process($imgPath)
[System.IO.File]::WriteAllText("c:\Users\hp\Downloads\Bonus_Scatter_ProV2\base64_cursor_thicker.txt", $base64)
Write-Host "Base64 saved to base64_cursor_thicker.txt"
