'use strict';

let i = 0;

const f1 = async () => {
  console.log(i++);
  await null; // or any non-promise or even non-thenable
  await f1();
};

f1();
