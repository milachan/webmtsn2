# run-dev.ps1
# Auto-restart Next.js dev server, dan otomatis bersihkan cache .next kalau server crash.
#
# Cara pakai:
#   powershell -ExecutionPolicy Bypass -File run-dev.ps1
#
# Hentikan kapan saja dengan Ctrl+C.

$projectPath = "D:\vscode\mtsn2"
Set-Location $projectPath

while ($true) {
    Write-Host "`n=== Menjalankan 'npm run dev' ===" -ForegroundColor Cyan

    # Jalankan npm run dev dan tunggu sampai proses selesai/crash
    npm run dev
    $exitCode = $LASTEXITCODE

    Write-Host "`nServer berhenti (exit code: $exitCode)." -ForegroundColor Yellow

    if ($exitCode -ne 0) {
        # Kemungkinan crash / error fatal -> bersihkan cache .next biar next start bersih
        Write-Host "Terindikasi crash. Membersihkan cache .next ..." -ForegroundColor Yellow

        $nextFolder = Join-Path $projectPath ".next"
        if (Test-Path $nextFolder) {
            Remove-Item -Recurse -Force $nextFolder
            Write-Host "Folder .next berhasil dihapus." -ForegroundColor Green
        } else {
            Write-Host "Folder .next tidak ditemukan, lanjut restart." -ForegroundColor DarkGray
        }
    }

    Write-Host "Restart dalam 2 detik... (Ctrl+C untuk berhenti total)" -ForegroundColor Cyan
    Start-Sleep -Seconds 2
}
