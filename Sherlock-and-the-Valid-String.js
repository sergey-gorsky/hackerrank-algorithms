'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/sherlock-and-valid-string/problem *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

function isValid(s) {
    const frequencyList = buildFrequencyList(s)
    if (checkIfListIsValid(frequencyList)) {
        return 'YES'
    } else {
        return 'NO'
    }
}

function checkIfAllValuesAreEqual(frequencyList) {
    let aChar = ''
    for (let char in frequencyList) {
        if (aChar === '') {
            aChar = char;
        }
        if (frequencyList[char] !== frequencyList[aChar]) {
            return false
        }
    }
    return true
}

function checkIfListIsValid(frequencyList) {
    let firstValue = frequencyList[Object.keys(frequencyList)[0]];
    let timesFirstValueWasFound = 1;
    let secondValue = 0;
    let timesSecondValueWasFound = 0;
    for (let character in frequencyList) {
        const valueInQuestion = frequencyList[character]
        if (valueInQuestion !== firstValue) {
            if (secondValue === 0) {
                if (valueInQuestion < firstValue) {
                    secondValue = firstValue;
                    firstValue = valueInQuestion;
                    if (firstValue === 1) {
                        const cleanedFrequencyList = cleanFrequencyList(frequencyList)
                        if (checkIfAllValuesAreEqual(cleanedFrequencyList)) {
                            return true
                        }
                    }
                } else {
                    secondValue = valueInQuestion;
                }
                if (firstValue > 1 && secondValue - firstValue === 1) {
                    // maybe ok
                } else {
                    return false;
                }                
            } else {
                return false;
            }
        }
    }
    return true
}

function cleanFrequencyList(frequencyList) {
    let cleanedFrequencyList = Object.assign({}, frequencyList)
    let valueToDelete = ''
    for (let key in frequencyList) {
        if (frequencyList[key] === 1) {
            valueToDelete = key
        }
    }
    if (valueToDelete) {delete cleanedFrequencyList[valueToDelete]}
    
    return cleanedFrequencyList;
}

function buildFrequencyList(s) {
    if (s !== null && Symbol.iterator in Object(s)) {
        const builtList = {};
        for (let letter of s ) {
            isNaN(builtList[letter]) ? builtList[letter] = 1 : builtList[letter]++
        }    
        return builtList;
    } else {
        return 'error';
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function tests() {
    unitTest1();
    unitTest2();
    unitTest3();
}

function unitTest1() {
    /// cleanFrequencyList(frequencyList) ///
    const frequencyList = { 'a': 2, 'b': 2, 'c': 1, 'd': 1}
    const expected = { 'a': 2, 'b': 2, 'c': 1}
    const computed = cleanFrequencyList(frequencyList);
    if (Object.keys(computed).length === Object.keys(expected).length) {
        for (let item in computed) {
            if (computed[item] == expected[item]) {
                // ok
            } else {
                console.log('unitTest2 failed, computed and expected have different values')
                console.log(`computed['${item}'] was ${computed[item]}, expected: ${expected[item]}`)
            }
        }    
    } else {
        console.log('unitTest1 failed, computed and expected are not the same length')
        console.log(`computed length: ${Object.keys(computed).length} expected: ${Object.keys(expected).length}`)
    }
}

function unitTest2() {
    /// checkIfAllValuesAreEqual(frequencyList) ///
    const frequencyList = { 'a': 2, 'b': 2, 'c': 2, 'd': 2 }
    const expected = true
    const computed = checkIfAllValuesAreEqual(frequencyList)
    if (expected === computed) {
        // passed
    } else {
        console.log('unitTest2 failed, checkIfAllValuesAreEqual() returned an incorrect bool')
    }
    
}

function unitTest3() {
    /// checkIfListIsValid(frequencyList) ///
    const frequencyList = { 'a': 2, 'b': 2, 'c': 2, 'd': 3 }
    const expected = true;
    const computed = checkIfListIsValid(frequencyList)
    if (computed === expected) {
        // passed the test
    } else {
        console.log(`unitTest3 failed, expected ${expected} but got ${computed}`)
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    // let testResults = tests();
    
    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
