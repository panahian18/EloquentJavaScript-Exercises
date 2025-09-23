/*
Ex.1
Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the 
original arrays.

*/

let arrays = [[1, 2, 3], [4, 5], [6]];


const flattenedArray = arrays.reduce((flat, current) => flat.concat(current));


/*
Your own loop

Write a higher-order function loop that provides something like a for loop statement. It should take a value, a test function, an update function, 
and a body function. Each iteration, it should first run the test function on the current loop value and stop if that returns false. 
It should then call the body function, giving it the current value, and finally call the update function to create a new value and start over 
from the beginning.

When defining the function, you can use a regular loop to do the actual looping.
*/

function loop(start, test, udpate, body) {
    for (let i = start; test(i); i = udpate(i)) {
        body(i);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

/*
Arrays also have an every method analogous to the some method. This method returns true when the given function returns true for every 
element in the array. In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.

Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a 
loop and one using the some method.
*/

function every(array, test) {
  for (let el of array) {
    if (!test(el)) {
      return false;
    }
  }
  return true;
}

function every2(array, test) {
  return !array.some(el => !test(test));
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true