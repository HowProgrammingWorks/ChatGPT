'use strict';

/* Prompt:

// Please propose solution to have behavior like
// Promise.all when we use `await []`

(async () => {
  const p1 = f1();
  const p2 = f2();
  const p3 = f3();
  // Now p1, p2, p3 are instances of Promise
  // Place your code here
  await [p1, p2, p3];
})();

// Do not change line: `await [p1, p2, p3]`.
// You need to change array behaviour.

*/

// Answer:

// To achieve the behavior of `Promise.all` when using
// `await [p1, p2, p3]` without changing that line,
// you can modify the array prototype to handle promises
// correctly. Here's the solution:

const p1 = f1();
const p2 = f2();
const p3 = f3();

// Enhance array prototype to handle promises

Array.prototype.then = function (onFulfilled, onRejected) {
    return Promise.all(this).then(onFulfilled, onRejected);
};

await [p1, p2, p3];

// This way, the array `[p1, p2, p3]` will behave like
// `Promise.all([p1, p2, p3])` when awaited.
