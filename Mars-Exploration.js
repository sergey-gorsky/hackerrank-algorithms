'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/mars-exploration/problem  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the marsExploration function below.
function marsExploration(s) {
    let counter = 0;
    for (const letter in s) {
        if (letter % 3 === 0) {
            if (s[letter] != 'S') {
                counter++
            }
        }
        if (letter % 3 === 1) {
            if (s[letter] != 'O') {
                counter++
            }
        }
        if (letter % 3 === 2) {
            if (s[letter] != 'S') {
                counter++
            }
        }
    }
    return counter;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = marsExploration(s);

    ws.write(result + "\n");

    ws.end();
}
