'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/the-birthday-bar/problem  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

function solve(chocolateArray, day, month, n) {
    const initialValue = 0;
    const reducer = (acc, val, i) => {
        const sum = sumAnArray(chocolateArray.slice(i, i+month), month)
        if (sum === day) {
            return acc+1
        } else {
            return acc
        }
    }
    return chocolateArray.reduce(reducer, 0)
}

function sumAnArray(array, month) {
    if (array.length === month) {
        const reducer = (acc, val) => acc+val
        return array.reduce(reducer);
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    
    const dm = readLine().split(' ');

    const d = parseInt(dm[0], 10);

    const m = parseInt(dm[1], 10);
    
    const result = solve(s, d, m, n);

    ws.write(result + '\n');

    ws.end();
}
