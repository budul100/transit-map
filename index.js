'use strict'

const l = require('lodash')
const pify = require('pify')
const tmp = require('tmp')
const path = require('path')
const spawn = require('child-process-promise').spawn
const fs = require('fs')

const prepareGraph = require('./prepare-graph')
const createGenerateLP = require('./generate-lp')
const createReviseSolution = require('./revise-solution')

tmp.setGracefulCleanup() // clean up even on errors
const pTmpDir = pify(tmp.dir)

// solver settings
const settings = {
    offset: 10000,
    maxWidth: 300,
    maxHeight: 300,
    minEdgeLength: 1,
    maxEdgeLength: 8
}

// script default options
const defaults = {
    workDir: null,
    verbose: false
}

const Solver = (networkGraph) => {
    const graph = prepareGraph(networkGraph)
    const generateLP = createGenerateLP(graph, settings)
    const reviseSolution = createReviseSolution(graph, settings)

    return ({generateLP, reviseSolution})
}

const runSolver = (cwd, verbose=false) => {
    // todo: escape paths?
    const problemPath = path.resolve(cwd, 'problem.lp')
    const solutionPath = path.resolve(cwd, 'solution.sol')

    const solverPromise = spawn('cbc.exe',  [problemPath, 'solve', 'solu', solutionPath], {cwd})

    if (verbose) solverPromise.childProcess.stdout.pipe(process.stderr) // sic.
    solverPromise.childProcess.stderr.on('data', e => {throw new Error(e)})
    return solverPromise
}

const transitMap = async (networkGraph, opt) => {
    // prepare
    const options = l.merge({}, defaults, opt)
    if (!options.workDir) options.workDir = await pTmpDir({prefix: 'transit-map-'})

    const solver = Solver(networkGraph)

    // write problem file
    const lpStream = fs.createWriteStream(path.resolve(options.workDir, 'problem.lp'))
    await solver.generateLP(lpStream)

    // run solver
    await (runSolver(options.workDir, options.verbose).catch(e => {
        console.error('Make sure `cbc.exe` is in your $PATH')
        throw new Error(e)
    }))

    // read solution file
    const solStream = fs.createReadStream(path.resolve(options.workDir, 'solution.sol'))
    const solution = await solver.reviseSolution(solStream)

    return solution
}

module.exports = transitMap
module.exports.Solver = Solver
