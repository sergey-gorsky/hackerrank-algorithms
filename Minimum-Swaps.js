'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/minimum-swaps-2/problem *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


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

function minimumSwaps(q) {
    const visited = q.slice(0).fill(false)
    let swaps = 0
    for (let i = 0; i < q.length; i++) {
        const start = i
        let cycleFound = false
        let current = i
        let cycleLength = 0
        if (visited[current] === false) {
            visited[i] = true
            while (!cycleFound) {
                visited[current] = true
                current = q[current] - 1
                if (current === start) {
                    cycleFound = true
                }
                cycleLength++
            }
            swaps += (cycleLength - 1)
            cycleLength = 0
        }
    }
    return swaps
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
