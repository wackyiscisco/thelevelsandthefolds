$ErrorActionPreference = 'Stop'

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$CosmosRoot = 'E:\The Cosmos of Wacky\Obsidian\thelevelsandthefolds\THE COSMOS'

if (-not (Test-Path -LiteralPath $CosmosRoot)) {
    Write-Error "Authoritative THE COSMOS source was not found at: $CosmosRoot"
    exit 1
}

Set-Location -LiteralPath $RepoRoot
$env:COSMOS_OBSIDIAN_ROOT = $CosmosRoot
$env:COSMOS_AUTO_PUSH = '1'

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error 'Node.js was not found in PATH.'
    exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error 'Git was not found in PATH.'
    exit 1
}

Write-Host 'Cosmos Wiki watcher starting...'
Write-Host "Source: $CosmosRoot"
Write-Host 'THE INNER COSMOS: HARD EXCLUDED'
Write-Host 'Automatic Git commit/push: ON'

npm run wiki:watch
