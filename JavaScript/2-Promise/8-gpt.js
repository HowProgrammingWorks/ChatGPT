'use strict';

// Chat GPT version 4
// Prompt: Optimize without moving console.log inside try block,
// without let (use just const), and without adding extra immediately
// invoked function.
// Reply: As per your request, here's an optimized version of the code
// without using let, moving console.log inside the try-catch block,
// and without adding an extra immediately invoked function:

const fs = require('node:fs').promises;

(async () => {
  const readConfig = async () => {
    try {
      const data = await fs.readFile('config.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { port: 80 };
    }
  };

  const config = await readConfig();
  console.log({ config });
})();

// Chat GPT comments:
// In this version, we define an async function called readConfig()
// that handles reading and parsing the config file, and returns
// the parsed JSON or the default configuration object if an error occurs.
// Then we await the result of this function and assign it to the config
// constant. The console.log statement remains outside the try-catch block.
