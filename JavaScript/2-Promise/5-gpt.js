'use strict';

// Chat GPT version 4
// Prompt: Please optimize following
// Reply: Below is the optimized version of the given code snippet:

const fs = require('node:fs').promises;

(async () => {
  try {
    const data = await fs.readFile('config.json', 'utf8');
    const config = JSON.parse(data);
    console.log({ config });
  } catch {
    console.log({ config: { port: 80 } });
  }
})();

// Chat GPT comments: The optimization includes:
// - Moving the data variable inside the try block to limit its scope.
// - Removing the unnecessary conditional operator in favor of directly logging
//   the default configuration object inside the catch block.
