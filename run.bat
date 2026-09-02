@echo off
echo ========================================================
echo   Starting TalentPulse AI (Backend + Frontend)
echo ========================================================

:: Start Backend in a new window
start "TalentPulse Backend (FastAPI)" cmd /k "python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload"

:: Wait 2 seconds
timeout /t 2 /nobreak >nul

:: Start Frontend in a new window
start "TalentPulse Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting up!
echo - Web Dashboard: http://localhost:5173
echo - Backend API Docs: http://127.0.0.1:8000/docs
echo.
pause
