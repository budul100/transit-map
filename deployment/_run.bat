@ECHO off

SET INPUT=Network.json
SET OUTPUTSOURCE=Network_Source.svg
SET OUTPUTOPTI=Network_Opti.svg
SET TURNOUTPUT=true

SET PATH=%PATH%;%~dp0

if %TURNOUTPUT% == true ( TransitMap -i "%INPUT%" -o "%OUTPUTSOURCE%" -y -s ) else ( TransitMap -i "%INPUT%" -o "%OUTPUTSOURCE%" -s )
if %TURNOUTPUT% == true ( TransitMap -i "%INPUT%" -o "%OUTPUTOPTI%" -y -l ) else ( TransitMap -i "%INPUT%" -o "%OUTPUTOPTI%" -l )

START chrome "file://%cd:\=/%/%OUTPUTOPTI%"
START chrome "file://%cd:\=/%/%OUTPUTSOURCE%"

PAUSE