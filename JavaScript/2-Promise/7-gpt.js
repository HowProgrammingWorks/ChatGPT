'use strict';

// Chat GPT version 4
// Prompt: Optimize without moving console.log inside try block and without let
// (use just const)
// Reply: Understood. Here's an optimized version of the code without
// using let and keeping console.log outside the try-catch block:

const fs = require('node:fs').promises;

(async () => {
  const config = await (async () => {
    try {
      const data = await fs.readFile('config.json', 'utf8');
      return JSON.parse(data);
    } catch {
      return { port: 80 };
    }
  })();

  console.log({ config });
})();

// Chat GPT comments:
// This version wraps the try-catch block inside an immediately invoked
// async function expression. This allows you to use const for the config
// variable and maintain the scope of the console.log statement outside
// the try-catch block.
