'use strict';

// Chat GPT version 4
// Prompt: Optimize following without moving console.log inside try block
// Reply: I understand that you want to keep the console.log statement
// outside the try-catch block. Here's an optimized version of the code:

const fs = require('node:fs').promises;

(async () => {
  let config;
  try {
    const data = await fs.readFile('config.json', 'utf8');
    config = JSON.parse(data);
  } catch {
    config = { port: 80 };
  }
  console.log({ config });
})();

// Chat GPT comments:
// The optimization includes:
// - Moving the config variable outside the try-catch block
//   to maintain its scope.
// - Removing the unnecessary conditional operator in favor
//   of directly assigning the parsed JSON or default configuration
//   object inside the try-catch block.
