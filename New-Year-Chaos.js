'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/new-year-chaos/problem  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

// The idea behind this algorithm is to move the the first person
// in the array who is behind their starting place forward to 
// where they started, swap places iteratively with people in front
// until they reach their starting place.  This moves other people
// back so it is necessary to start recheck indices that were updated.

// For example, given the array:
// [1, 2, 5, 3, 7, 8, 6, 4]
// we can compute their positions relative to their starting positions
// [0, 0, 2, -1, 2, 2, -1, -4]
// the choice of sign here was arbitrary

// 3 is the first number in the array that is 'behind' its starting
// position.  We first move the 3 to its starting position, and update
// the relative position values.  This took 1 swap.
// [1, 2, 3, 5, 7, 8, 6, 4]
// [0, 0, 0, 1, 2, 2, -1, -4]

// 6 is now the first number in the array that is 'behind' its starting
// position.  This took 1 swap, total number of swaps is 2.
// [1, 2, 3, 5, 7, 6, 8, 4]
// [0, 0, 0, 1, 2, 0, 1, -4]

// Next we move the 4.  This took 4 swaps, total number of swaps is 6.
// [1, 2, 3, 4, 5, 7, 6, 8]
// [0, 0, 0, 0, 0, 1, -1, 0]

// That moved the 6 one spot behind its starting position
// So the next step is to move the 6 adding one more swap for a total of 7.
// [1, 2, 3, 4, 5, 7, 6, 8]
// [0, 0, 0, 0, 0, 0, 0, 0]


function minimumBribes(q) {
    const differences = [];
    let bribeCount = 0;
    for (let i = 0; i < q.length; i++) {
        // we were given a 1-indexed array
        differences[i] = q[i] - i - 1
    }
    for (let i = 1; i < differences.length; i++) {
        const difference = differences[i]
        if (difference > 2) {
            // Any person that has moved 3 or more spaces ahead
            // will result in an invalid number of swaps
            bribeCount = 'Too chaotic'
            i = differences.length
        } else if (difference < 0) {
            bribeCount += Math.abs(difference)
            for (let j = i; j > i + difference; j--) {
                const swap = differences[j]
                differences[j] = differences[j-1]-1
                differences[j-1] = swap + 1
            }
            // here I back up instead of run through the array
            // multiple times.
            i += difference;
        }
    }
    console.log(bribeCount);
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
