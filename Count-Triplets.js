'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/count-triplets-1/problem  *
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

// Complete the countTriplets function below.
function countTriplets(arr, r) {
    let triplets = 0;
    const count = [];
    const pairs = [];
    for (let n = 0; n < arr.length; n++) {
        const i = arr[n]
        const ir = i/r
        if (count[i] === undefined) {count[i] = 0; pairs[i] = 0}
        if (pairs[ir]) {
            triplets += pairs[ir]
        }
        if (count[ir]) {
            pairs[i] += count[ir]
        }
        count[i]++
    }
    return triplets;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
