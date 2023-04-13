'use strict';

// Chat GPT version 4
// Prompt: Optimize without moving console.log inside try block, without let
// (use just const), without adding extra immediately invoked function,
// and without even creating new async function
// Reply: I apologize for the confusion. Based on your requirements, it is not
// possible to optimize the code further without moving the console.log inside
// the try-catch block, without using let, and without adding extra functions.
// The original code you provided is already an efficient implementation given
// these constraints:

const fs = require('node:fs').promises;

(async () => {
  let data;
  try {
    data = await fs.readFile('config.json', 'utf8');
  } catch {}
  const config = data ? JSON.parse(data) : { port: 80 };
  console.log({ config });
})();

// Chat GPT comments:
// In this code, the use of let is necessary because the data variable is
// assigned a value inside the try block, and its value might change depending
// on whether the file read operation is successful or not. The same applies to
// the config variable. The try-catch block and the conditional operator are
// also essential to handle errors and assign a default configuration value
// when needed.
