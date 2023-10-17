@ECHO off
ECHO.

SET INPUT=Network.json
SET OUTPUTSOURCE=Network_Source.svg
SET OUTPUTOPTI=Network_Opti.svg
SET TURNOUTPUT=true

SET PATH=%PATH%;%~dp0

ECHO The original network graphics will now be created.
ECHO.

if %TURNOUTPUT% == true ( TransitMapCreator -i "%INPUT%" -o "%OUTPUTSOURCE%" -y -s ) else ( TransitMapCreator -i "%INPUT%" -o "%OUTPUTSOURCE%" -s )

ECHO The network graphics will now be optimized. Please note that this can take a couple of minutes ...
ECHO.

if %TURNOUTPUT% == true ( TransitMapCreator -i "%INPUT%" -o "%OUTPUTOPTI%" -y -l ) else ( TransitMapCreator -i "%INPUT%" -o "%OUTPUTOPTI%" -l )

START chrome "file://%cd:\=/%/%OUTPUTSOURCE%"
START chrome "file://%cd:\=/%/%OUTPUTOPTI%"

PAUSE