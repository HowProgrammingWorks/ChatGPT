'use strict';

// Initial code (before optimizations)

const fs = require('node:fs').promises;

(async () => {
  let data;
  try {
    data = await fs.readFile('config.json', 'utf8');
  } catch {}
  const config = data ? JSON.parse(data) : { port: 80 };
  console.log({ config });
})();

// Problems:
// - mutable data
// - empty catch
// - default config placed in one line with parsing
// - ternary operator reduces readability in this place
