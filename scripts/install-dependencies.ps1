Write-Host "Installing dependencies..."
npm install
if ( -ne 0) {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "Building the application..."
npm run build
if ( -ne 0) {
    Write-Host "Failed to build the application" -ForegroundColor Red
    exit 1
}

Write-Host "Application is ready to run! Use 'npm start' to launch it." -ForegroundColor Green
