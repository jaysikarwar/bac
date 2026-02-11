# Get script directory and project root
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Split-Path -Parent $scriptDir

Write-Host "Starting GREEN (v2)..."
$v2Path = "$backendDir\apps\app-v2\server.js"
Start-Process node -ArgumentList "`"$v2Path`"" -NoNewWindow

Start-Sleep -Seconds 5

Write-Host "Stopping BLUE (v1) gracefully..."

# Find process using port 3001
$netstatOutput = netstat -ano | Select-String ":3001" | Select-Object -First 1
if ($netstatOutput) {
    $processId = ($netstatOutput -split "\s+")[-1]
    if ($processId -match '^\d+$') {
        try {
            Stop-Process -Id $processId -Force -ErrorAction Stop
            Write-Host "v1 (PID: $processId) stopped successfully"
        } catch {
            Write-Host "Failed to stop process: $_"
        }
    } else {
        Write-Host "Could not parse PID from netstat output"
    }
} else {
    Write-Host "No v1 process found on port 3001"
}

Write-Host "Blue-Green deployment successful"
