/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * https://www.hackerrank.com/contests/projecteuler/challenges/euler030/problem  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function processData(power) {    
    // the input comes in as a string, make sure it is a Number
    power = Number(power);
    
    // the choice to use an array here doesn't have a significant
    // impact on the performance, but lets us read out all the
    // valid terms in the solution if we want to see them.
    let foundNumbers = [0];
    
    // using an algorithm similar to the one below I determined the
    // greatest possible candidate.
    // First criteria for the max candidate was 
    // 9^n * x > 10^(x-1)
    // then subsequent refinements could be made by iteratively reducing
    // the leading digit like so
    // 8^n * 1 + 9^n * (x-1) > 10^(x-1)
    // then once a minimum viable leading digit was found the second digit
    // could be refined
    // 2^n * 1 + 8^n * 1 + 9^n * (x-2) > 10^(x-1), and so on.
    
    // for N=1, last possible candidate is 9
    // for N=2, last possible candidate is 99
    // for N=3, last possible candidate is 1,999
    // for N=4, last possible candidate is 19,999
    // for N=5, last possible candidate is 229,999
    // for N=6, last possible candidate is 2,999,999
    let limit = 0;
    switch (power) {
      case 1:
        limit = 10;
        break;
      case 2:
        limit = 100;
        break;
      case 3:
        limit = 2000;
        break;
      case 4:
        limit = 20000;
        break;
      case 5:
        limit = 230000;
        break;
      case 6:
        limit = 3000000;
        break;
      default:
        limit = 3000000;
        break;
    }
    
    // The problem states we should ignore the trivial solution of 1
    // so that's why we are starting from 2 here.
    for (let i=2; i < limit; i++) {
      let j = i;
      let runningTotal = 0;
      let keepGoing = true;
      while (keepGoing) {
        if (j > 0) {
          runningTotal += Math.pow(j % 10, power);
          j = Math.floor(j /= 10);
        } else {
          if (runningTotal === i) {
            foundNumbers.push(i);
          }
          keepGoing = false;
        }
      }
    }
    const reducer = (acc, val) => acc + val;
    const total = foundNumbers.reduce(reducer);
    console.log(total);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
