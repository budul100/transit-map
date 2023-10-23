@ECHO off

SET TURNOUTPUT=true

ECHO.
SET /p "INPUTFILE=Enter path of network json file: "

FOR /F "delims=" %%i IN ("%INPUTFILE%") DO SET OUTPUTSOURCE=%%~di%%~pi%%~ni_Source.svg
FOR /F "delims=" %%i IN ("%INPUTFILE%") DO SET OUTPUTOPTI=%%~di%%~pi%%~ni_Opti.svg

SET PATH=%PATH%;%~dp0

ECHO The original network graphics will now be created.
ECHO.

if %TURNOUTPUT% == true ( TransitMapCreator -i "%INPUTFILE%" -o "%OUTPUTSOURCE%" -y -s ) else ( TransitMapCreator -i "%INPUTFILE%" -o "%OUTPUTSOURCE%" -s )

ECHO The network graphics will now be optimized. Please note that this can take a couple of minutes ...
ECHO.

if %TURNOUTPUT% == true ( TransitMapCreator -i "%INPUTFILE%" -o "%OUTPUTOPTI%" -y -l ) else ( TransitMapCreator -i "%INPUTFILE%" -o "%OUTPUTOPTI%" -l )

START chrome "file://%OUTPUTSOURCE%"
START chrome "file://%OUTPUTOPTI%"

PAUSE