@echo off

REM Display starting message
echo Starting the frontend and backend servers...

REM Get the directory of the currently running script
set SCRIPT_DIR=%~dp0

REM Change to frontend directory relative to the script's location
cd /d "%SCRIPT_DIR%\src"
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to change directory to frontend. Please check the path.
    pause
    exit /b 1
)

REM Start the frontend server in a new command prompt window
echo Starting the frontend server...
start cmd /k "npm run dev"
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to start frontend server. Please check your npm scripts.
    pause
    exit /b 1
)

REM Change to backend directory relative to the script's location
cd /d "%SCRIPT_DIR%\server"
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to change directory to backend. Please check the path.
    pause
    exit /b 1
)

REM Start the backend server in a new command prompt window
echo Starting the backend server...
start cmd /k "npm run start"
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to start backend server. Please check your npm scripts.
    pause
    exit /b 1
)

REM Display completion message
echo Both servers are starting. Please check the output above for any issues.
