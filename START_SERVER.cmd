@echo off
echo ==============================================
echo   Budget Allocation System Server Launcher
echo ==============================================
echo.

cd /d "%~dp0"
echo Current directory: %CD%
echo.

echo Checking for Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js is not installed or not in PATH.
  echo Please install Node.js from https://nodejs.org/
  goto end
)

echo Node.js found: 
node --version
echo.

echo Checking MongoDB connection...
node check-users.js
echo.

echo Starting server...
echo.
echo Server will be available at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
node server.js

:end
pause 