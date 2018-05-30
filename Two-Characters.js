'use strict';

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

// Complete the twoCharaters function below.
function twoCharaters(s) {
    // steps
    // 1 clean the input string to lighten the workload
    // 2 make an unordered list of the frequency that each character appears in the cleaned input string
    // 3 make an array with the characters in order by frequency
    // 4 make a list of the candidate 2-character combinations
    // 5 test each candidate and track the maximum valid string length
    
    const testString = cleanedString(s)
    
    // early return
    if (!testString || testString.length < 2) {return 0;}
    
    const unsortedCharFrequencyList = buildFrequencyList(testString)
    const sortedCharFrequencyList = sortFrequencyList(unsortedCharFrequencyList)
    
    // early return
    if (sortedCharFrequencyList.length === 1) {return 0;}

    let maxLength = 0;
    let candidatesArray = findCandidates(sortedCharFrequencyList);
    let lengths = putCandidatesThruCalcFunction(candidatesArray, testString)
    maxLength = Math.max(...lengths);
    return maxLength;
}

function cleanedString(s) {
    // simplify our input string
    // with the given constraints any characters that appear twice in a row can never produce valid strings
    let cleanString = s.slice(0);
    var doublesRemaining = true;
    while (doublesRemaining === true && cleanString.length > 0) {
        doublesRemaining = false;
        for (let i = 0; i < s.length; i++) {
            if (cleanString[i] && cleanString[i + 1] && cleanString[i] === cleanString[i + 1]) {
                cleanString = cleanString.replace(new RegExp(cleanString[i], 'g'), '');
                doublesRemaining = true;
            }
        }
    }
    return cleanString;
}

function buildFrequencyList(s) {
    // calculate the number of times each character appears in the string
    // useful because valid 2-character combinations can never have frequencies that differ by more than 1
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

function sortFrequencyList(unsortedCharFrequencyList) {
    const unsortedArray = [];
    let sortedList = [];
    Object.keys(unsortedCharFrequencyList).map(x => unsortedArray.push({"char": x, "freq": unsortedCharFrequencyList[x]}))
    sortedList = unsortedArray.slice(0).sort(function (a, b) {
        return b.freq - a.freq;
    });
    return sortedList;
}

function findCandidates(sortedCharFrequencyList) {
    let foundCandidates = [];
    for (let i = 0; i < sortedCharFrequencyList.length; i++) {
        for (let j = i + 1; j < sortedCharFrequencyList.length; j++) {
            if (sortedCharFrequencyList[i]['freq'] - sortedCharFrequencyList[j]['freq'] < 2) {
                foundCandidates.push(`${sortedCharFrequencyList[i]['char']}${sortedCharFrequencyList[j]['char']}`)
            }
        }
    }
    return foundCandidates;
}

function calcLengthIfCandidateIsValid(candidate, testString) {
    const cleanedString = testString.replace(new RegExp('[^' + candidate + ']' , 'g'), "");
    let evenChars = ''
    let oddChars = ''
    for (let i = 0; i < cleanedString.length; i += 2) {
        evenChars += cleanedString[i]
    }
    for (let i = 0; i < evenChars.length - 1; i++) {
        if (evenChars[i] === evenChars[i+1]) {
            /// potentially valid
        } else {
            return 0
        }
    }
    for (let i = 1; i < cleanedString.length; i += 2) {
        oddChars += cleanedString[i]
    }
    for (let i = 0; i < oddChars.length - 1; i++) {
       if (oddChars[i] === oddChars[i+1]) {
            /// potentially valid
        } else {
            return 0
        } 
    }
    return cleanedString.length;
}

function putCandidatesThruCalcFunction(candidatesArray, testString) {
    let lengths = [];
    for (let i = 0; i < candidatesArray.length; i++) {
        lengths.push(calcLengthIfCandidateIsValid(candidatesArray[i], testString))
    }
    return lengths;
}

function testSuite() {
    unitTest1();
    unitTest2();
    unitTest3();
    unitTest4();
    unitTest5();
    unitTest6();
    unitTest7();
    unitTest8();
    integrationTest1();
}

function unitTest1() {
    /// buildFrequencyList(s) ///
    const s = 'gattaca'
    const expected = { g: 1, a: 3, t: 2, c: 2 }
    const expectedProps = Object.getOwnPropertyNames(expected)
    const computed = buildFrequencyList(s)
    const computedProps = Object.getOwnPropertyNames(computed)
    const comparison = computedProps.length === expectedProps.length
    if ( comparison ) {
        /// passed ///
    } else {
        console.log("unitTest 1 failed.  Unexpected number of properties in object returned from buildFrequencyList()" )
        return false
    }
}

function unitTest2() {
    /// buildFrequencyList(s) ///
    const s = 'gattaca'
    const expected = { g: 1, a: 3, t: 2, c: 1 }
    const expectedProps = Object.getOwnPropertyNames(expected)
    const computed = buildFrequencyList(s)
    const computedProps = Object.getOwnPropertyNames(computed)
    if (computedProps.length === expectedProps.length) {    
        for (let i = 0; i < computedProps.length; i++) {
            var unitTestProp1 = computedProps[i];
            var unitTestProp2 = expectedProps[i];
            if (computed[unitTestProp1] === expected[unitTestProp1]) {
                /// passed ///
            } else {
                console.log("unitTest 2 failed.  expected props to be equal but ", unitTestProp1, computed[unitTestProp1], "doesn't match", unitTestProp1, expected[unitTestProp1])
                return false
            }
            if (computed[unitTestProp2] === expected[unitTestProp2]) {
                /// passed ///
            } else {
                console.log("unitTest 2 failed.  expected props to be equal but ", unitTestProp2, computed[unitTestProp2], "doesn't match", unitTestProp2, expected[unitTestProp2])
                return false
            }
        }
    } else {
        console.log("unitTest 2 failed.  expected computedProps.length and expectedProps.length to be equal")
        return false;
    }
}

function unitTest3() {
    /// sortFrequencyList(unsortedCharFrequencyList) ///
    const unsortedCharFrequencyList = { g: 1, a: 3, t: 2, c: 2 }
    const expected = [{'char': 'a', 'freq': 3}, {'char': 't', 'freq': 2}, {'char': 'c', 'freq': 2}, {'char': 'g', 'freq': 1}]
    const computed = sortFrequencyList(unsortedCharFrequencyList)
    const comparison = computed.length === expected.length
    if (comparison) {
        /// passed ///
    } else {
        console.log("unitTest 3 failed.  expected computed.length to equal expected.length but got ", comparison)
        return false;
    }
}

function unitTest4() {
    /// sortFrequencyList(unsortedCharFrequencyList) ///
    const unsortedCharFrequencyList = { g: 1, a: 3, t: 2, c: 2 }
    const expected = [{'char': 'a', 'freq': 3}, {'char': 't', 'freq': 2}, {'char': 'c', 'freq': 2}, {'char': 'g', 'freq': 1}];
    const computed = sortFrequencyList(unsortedCharFrequencyList)
    for (let i = 0; i < computed.length; i++) {
        if(computed[i]['char'] === expected[i]['char'] && computed[i]['freq'] === expected[i]['freq']) {
            /// passed ///
        } else {
            console.log("unitTest 4 failed, computed and expected arrays from sortFrequencyList don't match")
            console.log('expected', expected, 'but got', computed)
            return false;
        }
    }
}

function unitTest5() {
    /// findCandidates(sortedCharFrequencyList) ///
    const sortedCharFrequencyList = [{'char': 'b', 'freq': 7}, {'char': 'd', 'freq': 4}, {'char': 'a', 'freq': 3}, {'char': 'c', 'freq': 1}, {'char': 'e', 'freq': 1}, {'char': 'f', 'freq': 1} ]
    const expected = ['da', 'ce', 'cf', 'ef']
    const computed = findCandidates(sortedCharFrequencyList)
    if (computed.length === expected.length) {
        for (let i = 0; i < computed.length; i++) {
            if(computed[i] === expected[i]) {
                /// passed ///
            } else {
                console.log("unitTest 5 failed, computed and expected arrays from findCandidates() don't match")
                console.log('expected', expected, 'but got', computed)
                return false;
            }
        }
    } else {
        console.log('unitTest 5 failed, computed.length and expected.length from findCandidates() did not match')
        return false;
    }
}

function unitTest6() {
    /// unitTest of calcLengthIfCandidateIsValid(candidate, testString) ///
    const candidate = 'zy'
    const testString = 'abczadbycabdzycbadczabdcbycdz'
    const expected = 7;
    const computed = calcLengthIfCandidateIsValid(candidate, testString);
    if (expected === computed) {
        /// passed ///
    } else {
        console.log('unitTest 6 failed, expected:', expected, 'but got', computed, 'from calcLengthIfCandidateIsValid()')
        return false
    }
}

function unitTest7() {
    /// putCandidatesThruCalcFunction(candidatesArray, testString) ///
    const candidatesArray = [ 'dz', 'ba'];
    const testString = 'dbzadbz'
    const expected = [4, 3];
    const computed = putCandidatesThruCalcFunction(candidatesArray, testString);
    if (computed.length === expected.length) {
        for (let i = 0; i < computed.length; i++) {
            if(computed[i] === expected[i]) {
                /// passed ///
            } else {
                console.log("unit test 7 failed, computed and expected arrays from putCandidatesThruCalcFunction() did not match")
                return false;
            }
        }
        
    } else {
        console.log('unitTest 7 failed, computed.length and expected.length from putCandidatesThruCalcFunction() did not match')
        return false;
    }
}

function unitTest8() {
    /// cleanedString(s) ///
    const s = 'aabociaioadeoeofigioohioiijioeekolomnoiooop'
    const expected = 'bcdfghjklmnp'
    const computed = cleanedString(s)
    if (expected === computed) {
        /// test passed ///
    } else {
        console.log('unitTest8 failed, strings do not match')
    }
}

function integrationTest1() {
    /// twoCharaters(s) ///
    const s1 = 'ab';
    const expected1 = 2;
    const computed1 = twoCharaters(s1);
    const s2 = 'aaaaa';
    const expected2 = 0;
    const computed2 = twoCharaters(s2);
    const s3 = 'cobmjdczpffbxputsaqrwnfcweuothoygvlzugazulgjdbdbarnlffzpogdprjxvtvbmxjujeubiofecvmjmxvofejdvovtjulhhfyadr';
    const expected3 = 8;
    const computed3 = twoCharaters(s3);
    const s4 = 'muqqzbcjmyknwlmlcfqjujabwtekovkwsfjrwmswqfurtpahkdyqdttizqbkrsmfpxchbjrbvcunogcvragjxivasdykamtkinxpgasmwz'
    const expected4 = 6;
    const computed4 = twoCharaters(s4);
    const s5 = 'tlymrvjcylhqifsqtyyzfaugtibkkghfhyzxqbsizkjguqlqwwetyofqihtpkmpdlgthfybfhhmjerjdkybwppwrdapirukcshkpngayrdruanjtziknnwxmsjpnuswllymhkmztsrcwwzmlbcoakswwffveobbvzinkhnmvwqhpfednhsuzmffaebi'
    const expected5 = 0;
    const computed5 = twoCharaters(s5);
    if (computed1 === expected1) {
        /// integration test passed ///
    } else {
        console.log('integration test failed')
        return false
    }

    if (computed2 === expected2) {
        /// integration test passed ///
    } else {
        console.log('integration test failed')
        return false
    }
    
    if (computed3 === expected3) {
        /// integration test passed ///
    } else {
        console.log('integration test failed')
        return false
    }
    
    if (computed4 === expected4) {
        /// integration test passed ///
    } else {
        console.log('integration test failed')
        return false
    }
    
    if (computed5 === expected5) {
        /// integration test passed ///
    } else {
        console.log('integration test failed')
        return false
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const length = parseInt(readLine(), 10);
    
    // early return
    if (length < 2) {
        ws.write(0 + "\n");
    } else {
        const s = readLine();

        let testResults = testSuite();
        let result = twoCharaters(s);

        ws.write(result + "\n");
    }
    ws.end();
}
