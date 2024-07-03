'use strict';

/* Prompt:
// Please implement getSelected function and
// propose solution for following example:

// Place your code here
const options = {
  [x]: 'Uno',
  [_]: 'Due',
  [x]: 'Tre',
  [_]: 'Quatro',
};
const selected = getSelected(options);
console.log(selected);

// We need following output: ["Uno", "Tre"]
*/

// Answer:

const x = Symbol('x');
const _ = Symbol('_');

const options = {
  [x]: 'Uno',
  [_]: 'Due',
  [x]: 'Tre',
  [_]: 'Quatro',
};

function getSelected(options) {
  const selectedKeys = Object.getOwnPropertySymbols(options).filter(symbol => symbol.description === 'x');
  return selectedKeys.map(key => options[key]);
}

const selected = getSelected(options);
console.log(selected); // Output: ["Uno", "Tre"]
