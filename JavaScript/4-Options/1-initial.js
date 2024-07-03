'use strict';

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
