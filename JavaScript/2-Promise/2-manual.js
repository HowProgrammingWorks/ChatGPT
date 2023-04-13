'use strict';

// Manual optimizations

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

// Problems:
// - mutable config variable
