'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/caesar-cipher-1/problem *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

// Complete the caesarCipher function below.
function caesarCipher(string, offset, length) {
    let result = ''
    for (const character of string) {
        const code = character.codePointAt(0)
        if (code > 64 && code < 91 || code > 96 && code < 123) {
            let newCode = code + offset
            while (newCode < 65 && code < 91 || newCode < 97 && code > 96) {
                newCode += 26
            }
            while (newCode > 90 && code < 91 || newCode > 122 && code > 96) {
                newCode -= 26
            }
            result += String.fromCharCode(newCode)
        } else {
            result += character
        }
    }
    return result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const length = parseInt(readLine(), 10);

    const string = readLine();

    const offset = parseInt(readLine(), 10);

    let result = caesarCipher(string, offset, length);

    ws.write(result + "\n");
    
    ws.end();
}
