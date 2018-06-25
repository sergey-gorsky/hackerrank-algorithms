Here are some of my HackerRank solutions

| Challenge Title       | Links                | Comments             |
| ----------------------|----------------------|----------------------|
| Divisible Sum Pairs   | [Challenge](https://www.hackerrank.com/challenges/divisible-sum-pairs/problem) <br/> [Solution](https://github.com/lucask42/hackerrank-algorithms/blob/master/Divisible-Sum-Pairs.js) | This problem has a naive solution that has a time-complexity of O(n^2), I came up with a solution that is O(n).  I commented the code to explain each step and its complexity. |
| Find The Median       | [Challenge](https://www.hackerrank.com/challenges/find-the-median/problem) <br/> [Solution](https://github.com/lucask42/hackerrank-algorithms/blob/master/Find-The-Median.js) | My solution to this problem has a time-complexity of O(n). It uses a 'divide-and-conquer' strategy but only goes on to conquer one-half of what was divided.  The algorithm starts by making n comparisons, then n/2 comparisons, then n/4, n/8, etc.  n + n/2 + n/4 + n/8 + ... n/2^n = 2.  Sorted and reverse-sorted arrays are solved with a single recursion.  Arrays with 10000 random integers are solved in three recursions.
| Closest Numbers       | [Challenge](https://www.hackerrank.com/challenges/closest-numbers/problem) <br/> [Solution](https://github.com/lucask42/hackerrank-algorithms/blob/master/Closest-Numbers.js) | This solution uses a modified quicksort.  When the partitions are 10 items or fewer a simpler, non-recursive sorting algorithm is used.  This reduces the number of comparisons required to complete the sort.
| Two Characters        | [Challenge](https://www.hackerrank.com/challenges/two-characters/problem) <br/> [Solution](https://github.com/lucask42/hackerrank-algorithms/blob/master/Two-Characters.js) | Thinking this was an easy problem I spent a long time making two big ugly messy non-working solutions without writing any tests.  After taking a breath I started over and applied TDD and I cut straight to a working and satisfying solution.
| Caesar-Cipher         | [Challenge](https://www.hackerrank.com/challenges/caesar-cipher-1/problem) <br/> [Solution](https://github.com/lucask42/hackerrank-algorithms/blob/master/Caesar-Cipher.js) | The classic cipher.  This solution can accept offsets that are greater and 26 and less than -26.
| Mars Exploration      | [Challenge](https://www.hackerrank.com/challenges/mars-exploration/problem) <br/> [Solution](https://github.com/lucask42/hackerrank-algorithms/blob/master/Mars-Exploration.js) | Measuring data corruption in a string
| Sherlock and the <br/> Valid String | [Challenge](https://www.hackerrank.com/challenges/sherlock-and-valid-string/problem) <br/> [Solution](https://github.com/lucask42/hackerrank-algorithms/blob/master/Sherlock-and-the-Valid-String.js) | I was able to reuse work from other solutions and I also implemented unit tests ensure the several functions in this algorithm work as expected.
| Best and Worst Records | [Challenge](https://www.hackerrank.com/challenges/breaking-best-and-worst-records/problem) <br/> [Solution](https://github.com/lucask42/hackerrank-algorithms/blob/master/Best-And-Worst-Records.js) | Straightforward use case of Array.reduce
| Birthday Chocolate | [Challenge](https://www.hackerrank.com/challenges/the-birthday-bar/problem) <br/> [Solution](https://github.com/lucask42/hackerrank-algorithms/blob/master/Birthday-Chocolate.js) | One Array.reduce to create a 'sliding window', and a nested Array.reduce to get the sum of each window
