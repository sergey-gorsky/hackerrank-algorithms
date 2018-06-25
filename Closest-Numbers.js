'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/closest-numbers/problem *
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

function selectionSort(arr) {
    const n = arr.length
    if (n === 1) {
        return arr;
    }
    let unsortedArray = arr.slice(0)
    const sortedArray = [];
    for (let i = 0; i < n; i++) {
        let minValue = unsortedArray[0]
        let minIndex = 0
        for (let j = 1; j < unsortedArray.length; j++) {
            if (unsortedArray[j] < minValue) {
                minValue = unsortedArray[j]
                minIndex = j
            }
        }
        sortedArray.push(unsortedArray[minIndex])
        if (minIndex === 0) {
          unsortedArray = unsortedArray.slice(1,unsortedArray.length)
        } else {
        unsortedArray = unsortedArray.slice(0,minIndex).concat(
                        unsortedArray.slice(minIndex+1,unsortedArray.length))
        }
    }
    return sortedArray
}
function quicksortList(arr) {
    let sortedList = [];
    if (arr.length < 11) {
        return selectionSort(arr)
    }
    const left = []
    const mid = []
    const right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[0]) {
            left.push(arr[i])
        } else if (arr[i] > arr[0]) {
            right.push(arr[i])
        } else if (arr[i] === arr[0]) {
            mid.push(arr[i])
        }
    }
    sortedList = sortedList.concat(quicksortList(left), mid, quicksortList(right))
    return sortedList
}

function assembleOutputString(sortedList) {
    let smallestDifference = sortedList[1] - sortedList[0]
    let outputString = `${sortedList[0]} ${sortedList[1]}`
    for (let i = 1; i < sortedList.length-1; i++) {
        const difference = sortedList[i+1] - sortedList[i]
        if (difference < smallestDifference) {
            smallestDifference = difference
            outputString = `${sortedList[i]} ${sortedList[i+1]}`
        } else if (difference === smallestDifference) {
            outputString += ` ${sortedList[i]} ${sortedList[i+1]}`
        }
    }
    return outputString;
}

function readLine() {
    return inputString[currentLine++];
}

function closestNumbers(arr) {
    const sortedList = quicksortList(arr)
    return assembleOutputString(sortedList);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = closestNumbers(arr);

    ws.write(result + "\n");

    ws.end();
}
