Set-Item -Path Env:PATH -Value ($Env:PATH + ";" + (Get-Item .).FullName)
node.exe cli.js -i examples\lisboa.input.json -o examples\_output.svg -l