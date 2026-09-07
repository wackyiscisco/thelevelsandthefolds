$ErrorActionPreference = 'Stop'

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$WatchScript = (Resolve-Path (Join-Path $PSScriptRoot 'wiki-watch.ps1')).Path
$TaskName = 'Cosmos Wiki Watcher'

$Action = New-ScheduledTaskAction `
    -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$WatchScript`""

$Trigger = New-ScheduledTaskTrigger -AtLogOn
$Settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Days 3650)

Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $Action `
    -Trigger $Trigger `
    -Settings $Settings `
    -Description 'Keeps The Levels and The Folds wiki mirrored from the local Obsidian THE COSMOS source.' `
    -Force | Out-Null

Write-Host "Installed scheduled task: $TaskName"
Write-Host "Watcher script: $WatchScript"
Write-Host "Repository: $RepoRoot"
Write-Host 'It will start automatically at Windows logon.'
Write-Host 'THE INNER COSMOS remains excluded.'
