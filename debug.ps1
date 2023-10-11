Set-Item -Path Env:PATH -Value ($Env:PATH + ";" + (Get-Item .).FullName)
cat examples\bvg.input.json | node.exe cli.js -y > examples\_output.svg