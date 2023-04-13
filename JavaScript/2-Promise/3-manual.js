'use strict';

// Manual optimizations

const fs = require('node:fs').promises;

(async () => {
  let config;
  await fs
    .readFile('config.json', 'utf8')
    .then((data) => {
      config = JSON.parse(data);
    })
    .catch(() => {
      config = { port: 80 };
    });
  console.log({ config });
})();

// Problems:
// - mutable config variable
// - then/cache write to outer scope
