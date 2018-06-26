'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/find-the-median/problem *
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

function divideAndConquerHalf(arr, watch) {
    let sortedList = [];
    if (arr.length === 1) {
        return arr
    }
    const pivotIndex = watch
    const left = []
    const mid = []
    const right = []
    for (let i = 0; i < arr.length; i++) { //O(n)
        if (arr[i] < arr[pivotIndex]) {
            left.push(arr[i]) 
        } else if (arr[i] > arr[pivotIndex]) {
            right.push(arr[i])
        } else if (arr[i] === arr[pivotIndex]) {
            mid.push(arr[i])
        }
        // In general each successive recursion will
        // be less than n by a factor of 
        // O(n) = O(n) + O(n*3/4) + O(n*(3/4)^2) + O(n*(3/4)^3) + ... = O(4n)
        // which for arrays with 10000 is significantly better than O(nlog(n))
    }
    if (left.length > watch) {
        sortedList = divideAndConquerHalf(left, watch)
    } else if (left.length + mid.length <= watch) {
        const newWatch = watch - left.length - mid.length
        sortedList = divideAndConquerHalf(right, newWatch)
    } else if (left.length <= watch && left.length + mid.length > watch) {
        sortedList.push(arr[watch]);
    }
    return sortedList;
    
    // This algorithm takes advantage of the fact that before we start
    // sorting the array we know where the median value will be located.
    // We can call the index of this location the 'watch' index. If we 
    // partition the values into three categories: higher, lower, and 
    // equal to some pivot value then we know that if the pivot ends up
    // to the left of the watch index 1) the median's value is greater
    // than the pivot value 2) the median is somewhere to the right of
    // the pivot so we can safely eliminate all values equal-to and less-
    // than the pivot.
    // In the diagrams below, the watch *index* is indicated by a 'W'
    // In this implementation the watch index is used as the pivot.
    
    // before first partition:
    // [31, 84, 17, 73, 67, 40, 79, 19, W:74, 22, 75, 69, 90, 84, 23, 38, 64]
    // after first partition:  
    // [31, 17, 73, 67, 40, 19, 22, 69,   23, 38, 64, 74, 84, 79, 75, 90, 84]
    // |---------------------------------------------|--|-------------------|
    //               left                             mid         right
    // recurse into left
    
    // [31, 17, 73, 67, 40, 19, 22, 69, W:23, 38, 64]
    //
    // [17, 19, 22, 23, 31, 73, 67, 40,   69, 38, 64]
    // |-----------|--|-----------------------------|
    //      left    mid           right
    // recurse into right
    
    //                 [31, 73, 67, 40, W:69, 38, 64]
    //
    //                 [31, 67, 40, 38,   64, 69, 73]
    //                 |---------------------|--|---|
    //                        left            mid right
    // recurse into left
    
    //                 [31, 67, 40, 38, W:64]
    //
    //                 [31, 40, 38, 64,   67]
    //                 |-----------|--|-----|
    //                    left      mid  right
    // solution found: 67
    
    // we can verify this by looking at the sorted array:
    // [17, 19, 22, 23, 31, 38, 40, 64, W:67, 69, 73, 74, 75, 79, 84, 84, 90]
    
}

function findMedian(arr) {
    return divideAndConquerHalf(arr, (arr.length-1)/2)
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = findMedian(arr);

    ws.write(result + "\n");

    ws.end();
}
