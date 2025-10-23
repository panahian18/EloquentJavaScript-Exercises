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

/*
Write a function that computes the dominant writing direction in a string of text. Remember that each script object has a direction property 
that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).

The dominant direction is the direction of a majority of the characters that have a script associated with them. The characterScript and 
countBy functions defined earlier in the chapter are probably useful here.
*/
/*
{
  name: "Coptic",
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
  direction: "ltr",
  year: -200,
  living: false,
  link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}
*/

// tells you if the code is contained in any of the scripts
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

// The countBy function expects a collection (anything that we can loop over with for/of) and a function that computes a group name 
// for a given element. It returns an array of objects, each of which names a group and tells you the number of elements that 
// were found in that group.
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.find(c => c.name == name);
    if (!known) {
      counts.push({ name, count: 1 });
    } else {
      known.count++;
    }
  }
  return counts;
}

function dominantDirection(text) {
  const textToArray = text.split('');
  const charCodes = [];
  textToArray.forEach(char => charCodes.push(char.charCodeAt()));
  const textDirections = [{ dir: 'ltr', count: 0 }, { dir: 'rtl', count: 0 }, { dir: 'ttb', count: 0 }];
  charCodes.forEach(char => {
    const lang = characterScript(char);
    if (lang != null) {
      const matchingLang = textDirections.find(el => el.dir == lang.direction);
      matchingLang.count++
    }
  });
  const winningLang = textDirections.reduce((previousValue, currentValue) => {
    if (previousValue.count > currentValue.count) {
      return previousValue
    } else {
      return currentValue;
    }
  });
  return winningLang;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl3