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
        // be less than half the size of n
        // O(n) = O(n) + O(n/2) + O(n/4) + O(n/8) + ... = O(2n)
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
    // equal to some pivot value then we can safely eliminate any ranges 
    // that do not contain the watch index.
    // In the diagrams below, the watch index is indicated by a 'W'
    
    // [#, #, #, #, #, #, #, #, #, W, #, #, #, #, #, #, #, #, #, #]
    // |-------------------------------|--|-----------------------|
    //      left                        mid         right
    
    // [#, #, #, #, #, #, #, #, #, W, #]
    // |-------|-----|-----------------|
    //     left   mid    right
    
    //                [#, #, #, #, W, #]
    //                |----|-----------|
    //                  mid     right    
    
    //                      [#, #, W, #]
    //                      |-|--|-----|
    //                    left mid right    
    
    //                            [W, #]
    //                            |-|--|
    //                            mid right
    
    // Decision Logic:
    // [#, #, #, #, #, #, #, P, #, W, #, #, #, #, #, #, #, #, #, #]
    // |-------------------|---------------|-----------------------|
    //      left                mid               right
    // left.length <= watch && left.length + mid.length > watch 
    // 7 <= 9 && 7 + 5 > 9
    // all values in mid are the same and mid contains the median
    // return an array with a single value: [arr[watch]]
    // the value arr[watch] propogates back through the recursion chain.
    
    // [#, #, #, #, #, #, #, #, #, W, #, #, #, #, #, #, #, #, #, #]
    // |--------------------------|-|-----------------------------|
    //      left                  mid               right
    // left.length <= watch && left.length + mid.length > watch 
    // 9 <= 9 && 9 + 1 > 9
    // return arr[watch]
    
    // [#, #, #, #, #, #, #, #, #, W, P, #, #, #, #, #, #, #, #, #]
    // |-----------------------------|-|--------------------------|
    //      left                     mid         right
    // left.length > watch
    // 10 > 9
    // recurse with left

    // [#, #, #, #, #, #, #, #, P, W, #, #, #, #, #, #, #, #, #, #]
    // |-----------------------|-|--------------------------------|
    //      left               mid         right
    // left.length + mid.length <= watch
    // 8 + 1 <= 9
    // recurse with right, update the watch index to account for 
    // the change after throwing out left and mid sections of the array
    // old watch index = 9, subtract left.length and mid.length
    // new watch index = 0
    
    // [#, #, #, #, #, #, #, #, #, W, #, #, #, #, #, #, #, #, #, P]
    // |--------------------------------------------------------|-|
    //      left                                                mid
    // left.length > watch
    // 19 < 9
    // recurse with left
    
    // [P, #, #, #, #, #, #, #, #, W, #, #, #, #, #, #, #, #, #, #]
    // |-|--------------------------------------------------------|
    // mid                    right                  
    // left.length + mid.length <= watch
    // 0 + 1 <= 9
    // recurse with right
    // old watch index = 9
    // new watch index = 8
    
    // [P, #, #, #, #, #, #, #, #, W]
    // |--------------------------|-|
    // mid                        right                  
    // left.length + mid.length <= watch
    // 0 + 5 <= 5
    // recurse with right
    // old watch index = 5
    // new watch index = 0
    // when recursing with an array of length 1, the single value is returned
    // as the result and propogates back through the recursion chain.
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
