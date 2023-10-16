'use strict'

const splitLines = require('split')
const skipChunks = require('skip-stream')
const shortenWhiteSpace = require('condense-whitespace')
const map = require('through2-map').obj
const filter = require('through2-filter').obj
const csv = require('csv-string')
const toArray = require('get-stream').array

const parseSolution = async (stream) => {
    const reader = stream
        .pipe(splitLines())
        .pipe(skipChunks(1))
        .pipe(map(e => shortenWhiteSpace(e.toString())))
        .pipe(filter(e => !!e))
        .pipe(map(e => csv.parse(e, ' ')[0]))

    const rows = await toArray(reader)
    const solution = {}
    for (let row of rows) {
        solution[row[1]] = +row[2]
    }

    return solution
}

module.exports = parseSolution
