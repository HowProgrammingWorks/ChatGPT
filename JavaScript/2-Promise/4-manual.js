'use strict';

const fs = require('node:fs').promises;

// Manual optimizations

(async () => {
  const config = await fs
    .readFile('config.json', 'utf8')
    .then(JSON.parse)
    .catch(() => ({ port: 80 }));
  console.log({ config });
})();

// Final optimizations as for me
