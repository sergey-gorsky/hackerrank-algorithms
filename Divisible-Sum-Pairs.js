'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/challenges/divisible-sum-pairs/problem *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

// Complete the divisibleSumPairs function below.
function divisibleSumPairs(n, divisor, array) {
    // the time complexity of this algorithm is O(n)
    // O(n) = O(3n) + O(n/2) + O(1)
    
    // for the example described, the divisor is 7
    // and the input array is:
    // [36 46 25 97 57 14 21 50 75 58 54 32 73 11 36 22 95 46 54 61 8]
    
    const modArray = array.map(x => x % divisor); // O(n)
    // [36 46 25 97 57 14 21 50 75 58 54 32 73 11 36 22 95 46 54 61 8]
    //  v  v  v  v  v  v  v  v  v  v  v  v  v  v  v  v  v  v  v  v  v
    // [1  4  4  6  1  0  0  1  5  2  5  4  3  4  1  1  4  4  5  5  1]
    const frequencyArray = buildFrequencyArray(modArray, divisor);  // O(2n)
    // [1  4  4  6  1  0  0  1  5  2  5  4  3  4  1  1  4  4  5  5  1]
    //  reduces to:
    // [3  6  1  1  6  4  1]
    // explanation: 0 occurs three times in the modArray so
    // we use that 0 as the index in the frequencyArray
    // therefore frequencyArray[0]=3
    // frequencyArray has the length of the divisor = 7 (or k)
    // k can be as great as n so worst case length is n
    const firstTypeOfPair = nChoose2(frequencyArray[0])/2  // O(1)
    // numbers that had a mod of 0 are multiples of 7
    // therefore we calculate 3 choose 2.
    let secondTypeOfPair = 0; // O(n/2)
    for (let i = 1; i < divisor/2; i++) {
        secondTypeOfPair += frequencyArray[i] * (frequencyArray[frequencyArray.length - i])
    }
    // numbers that contributed to frequencyArray[1] can only be combined with
    // frequencyArray[length - 1]
    // the numbers that went into frequencyArray[1] are: 36, 57, 50, 36, 22, 8 
    // and those that are are in  frequencyArray[6] are: 97
    // so any pair where one is taken from the first and the other is taken from the
    // second will sum to a number that is divisible by 7
    // in general we can just multiply by the quantities of these two
    // so there are 6 of this pair type
    let thirdTypeOfPair = 0; // O(1)
    if (divisor%2 === 0) {
        thirdTypeOfPair = nChoose2(frequencyArray[divisor/2])/2
    }
    // the third pair type needs to be included when the divisor is even
    // when the divisor is even then the lenght of the frequencyArray is
    // even.  Sorting through the frequencyArray in the manner described above
    // will not reach the index at the mid-point of the array.
    // If we had an even divisor here is how the frequencyArray might look
    // [4 6 1 4 7 4]
    //  first type= 6
    //  second type= 6*4 + 1*7
    // at index 3 we see there are 4 numbers that had a modulus of 3
    // for these numbers we do another n choose 2, where n=4
    //  third type = 6
    return (firstTypeOfPair + secondTypeOfPair + thirdTypeOfPair)
    // the solution is simply the sum of the types of pairs
}

function buildFrequencyArray(modArray, divisor) {
    const frequencyArray = emptyArrayOfLength(divisor)
    for (let i in modArray) {
        i = Number(i)
        frequencyArray[modArray[i]]++
    }
    return frequencyArray
}

function emptyArrayOfLength(length) {
    const emptyArray = [];
    for (let i = 0; i < length; i++) {
        emptyArray[i] = 0;
    }
    return emptyArray;
}

function nChoose2(n) {
    if (n < 2) {
        return 0
    }
    const nFactorial = factorialize(n)
    const kFactorial = 2
    const nMinusKFactorial = factorialize(n-2)
    return (nFactorial / nMinusKFactorial)
}

function factorialize(num) {
    // worst case this has a time-complexity of O(n)
    // this would happen if all the numbers given
    // are divisible by the divisor.
    // In that case the
    // actual complexity of the
    // buildFrequencyArray function would be
    // O(1) instead of O(2n)
  if (num === 0 || num === 1)
    return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}

function testFactorialize() {
    /// factorialize(num) ///
    const num = 2
    const expected = 2
    const computed = factorialize(num)
}


function testSuite() {
    testFactorialize()
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    // testSuite();
    
    let result = divisibleSumPairs(n, k, ar);

    ws.write(result + "\n");

    ws.end();
}
