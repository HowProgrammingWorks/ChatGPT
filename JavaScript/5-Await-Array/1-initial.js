'use strict';

// Please propose solution to have behavior like
// Promise.all when we use `await []`

const f1 = async () => {
};


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
