@echo off
setlocal enabledelayedexpansion

REM Navigate to the Vue project directory
cd ..

REM Install dependencies and start the Vue development server
echo Starting Vue project...
npm install
start "Vue Project" cmd /c "npm run dev"

REM Get the PID of the Vue development server (mockup)
set "VUE_PID=!ERRORLEVEL!"

REM Navigate to the proxy server directory
cd proxy-server

REM Start the proxy server
echo Starting proxy server...
start "Proxy Server" cmd /c "node server.js"

REM Get the PID of the proxy server (mockup)
set "PROXY_PID=!ERRORLEVEL!"

REM Function to handle termination and cleanup
:cleanup
echo Stopping Vue project...
taskkill /PID !VUE_PID! /F
echo Stopping proxy server...
taskkill /PID !PROXY_PID! /F
exit /b

REM Trap signals to clean up when the script is interrupted or terminated
REM (Batch files do not support signal trapping in the same way as bash scripts)

REM Loop to wait for the "quit" command from the user
:inputloop
set "input="
set /p input=Type 'quit' to stop the servers:
if /i "!input!"=="quit" (
    call :cleanup
) else (
    goto inputloop
)

endlocal