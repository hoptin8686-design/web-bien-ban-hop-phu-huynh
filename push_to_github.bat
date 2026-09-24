@echo off
set "PATH=C:\Users\DMX HOA THUAN\AppData\Local\Programs\Git\cmd;C:\Users\DMX HOA THUAN\AppData\Local\Programs\gh\bin;%PATH%"
cd /d "d:\Du-an-web\web-bien-ban-hop-phu-huynh"

echo ========================================================
echo   DANG DONG BO THAY DOI LEN GITHUB...
echo ========================================================

git add .
git commit -m "Cap nhat ung dung Bien ban hop phu huynh dau nam THPT Phuc Hoa"
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   DA DAY LEN GITHUB THANH CONG!
    echo   Vercel se tu dong cap nhat trang web sau vai giay.
    echo ========================================================
) else (
    echo.
    echo [THONG BAO] Khong co thay doi moi hoac co loi ket noi.
)

pause
