'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function breakingRecords(scores) {
    return([findNewMaxScores(scores), findNewMinScores(scores)])
}

function findNewMaxScores(scores) {
    var max = scores[0]
    const reducer = (accumulator = 0, currentValue) => {
        if (currentValue > max) {
            max = currentValue
            return accumulator + 1;
        }
        return accumulator
    }
    return scores.reduce(reducer, 0)
}

function findNewMinScores(scores) {
    var min = scores[0]
    const reducer = (accumulator, currentValue) => {
        if (currentValue < min) {
            min = currentValue
            return accumulator + 1;
        }
        return accumulator
    }
    return scores.reduce(reducer, 0) 
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const result = breakingRecords(scores);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
