// Exercise 3

/*
Write a function arrayToList that builds up a list structure like the one shown when given
[1, 2, 3] as argument. Also write a listToArray function that produces an array from a list.
Add the helper functions prepend, which takes an element and a list and creates a new list 
that adds the element to the front of the input list, and nth, which takes a list and a 
number and returns the element at the given position in the list (with zero referring to 
the first element) or undefined when there is no such element.

let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};

If you haven’t already, also write a recursive version of nth.
*/
// Given an array as an argument, returns linked list
function arrayToList(arr) {
  if (arr.length === 1) {
    return {value: arr[0], rest: null};
  }
  for (let el of arr) {
    return ({value: el, rest: arrayToList(arr.slice(1, arr.length))});
  }
}

  // produces an array from a list
  function listToArray(list) {
    const arr = [];
    for (let node = list; node; node = node.rest) {
      arr.push(node.value);
    }
    return arr;
  }
  
  // takes an element and a list and creates a new list that 
  // adds the element to the front of the input list
  function preprend(el, list) {
    return { value: el, rest: list};
  }
  
  // which takes a list and a number and returns the element at the given 
  // position in the list (with zero referring to the first element) or undefined 
  // when there is no such element.
  function nth(list, n) {
    const array = listToArray(list);
    if (array != null) {
      return array[n];
    }
  }
  
  
  console.log(arrayToList([10, 20, 30]));
  // → {value: 10, rest: {value: 20, rest: null}}
  console.log(listToArray(arrayToList([10, 20, 30])));
  // → [10, 20, 30]
  console.log(prepend(10, prepend(20, null)));
  // → {value: 10, rest: {value: 20, rest: null}}
  console.log(nth(arrayToList([10, 20, 30]), 1));
  // → 20

// Exercise 4

  function deepEqual(arg1, arg2) {
    if (arg1 === null || arg2 === null) {
      return arg1 === arg2;
    }
    else if (typeof arg1 !== 'object' || typeof arg2 !== 'object') {
      return (typeof arg1 === typeof arg2);
    } else {
      const arg1Keys = Object.keys(arg1);
      const arg2Keys = Object.keys(arg2);
      if (arg1Keys.length !== arg2Keys.length) return false;
      for (let i = 0;i <= arg1Keys.length-1;i++) {
      return deepEqual(arg1[arg1Keys[i]], arg2[arg2Keys[i]]);
      }
    }
  }
  
  
  console.log(deepEqual(123, {first: 123}));
  let obj = {here: {is: "an"}, object: 2};
  console.log(deepEqual(obj, obj));
  // → true
  console.log(deepEqual(obj, {here: 1, object: 2}));
  // → false
  console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
  // → true