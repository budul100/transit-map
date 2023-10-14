#!/usr/bin/env node
'use strict'

const l = require('lodash')
const mri = require('mri')
const getStdin = require('get-stdin')
const writeFile = require('write')
const readFile = require('read-file');
const graphToSVG = require('./write-svg/index')
const svgToString = require('virtual-dom-stringify')

const transitMap = require('.')
const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: ['help', 'h', 'version', 'v', 'silent', 's', 'graph', 'g', 'invert-y', 'y']
})

if (argv.help === true || argv.h === true) {
	process.stdout.write(`
transit-map [options]

Usage:
	cat graph.json | transit-map > network.json

Options:
	--input-file   -i  File to read graph (instead of stdout).
	--output-file  -o  File to store result (instead of stdout).
	--graph        -g  Return JSON graph instead of SVG map.
	--invert-y     -y  Invert the Y axis in SVG result.
	--silent       -s  Disable solver logging to stderr.
	--tmp-dir      -t  Directory to store intermediate files. Default: unique tmp dir.

	--help         -h  Show this help message.
	--version      -v  Show the version number.

`)
	process.exit(0)
}

if (argv.version === true || argv.v === true) {
	process.stdout.write(`${pkg.version}\n`)
	process.exit(0)
}

// main program

const config = {
	workDir: argv['tmp-dir'] || argv.t || null,
	verbose: !(argv.silent || argv.s || null),
	inputFile: argv['input-file'] || argv.i || null,
	outputFile: argv['output-file'] || argv.o || null,
	returnGraph: argv['graph'] || argv.g || false,
	invertY: argv['invert-y'] || argv.y || false
}

const main = async () => {
	let input
	if (config.inputFile) input = readFile.sync(config.inputFile)
	else input = await getStdin()

	if (!input) throw new Error('No input network found.')
    const graph = JSON.parse(input)

	const solution = await transitMap(graph, l.pick(config, ['workDir', 'verbose']))

	let output
	if (config.returnGraph) output = JSON.stringify(solution)
	else {
		const svg = graphToSVG(solution, config.invertY)
		output = svgToString(svg)
	}

	if (config.outputFile) await writeFile(config.outputFile, output)
	else process.stdout.write(output)
}

main()
.catch((err) => {
	console.error(err)
	process.exitCode = 1
})
