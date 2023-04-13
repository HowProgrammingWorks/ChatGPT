'use strict';

// Chat GPT version 4

// Prompt: Optimize without moving console.log inside try block, without let
// (use just const), and without adding extra immediately invoked function,
// and without even creating new async function.
// I believe it is possible to rewrite it with all listed requirements.
// Maybe you can use Promise chain for that.

// Reply: You're right, using a Promise chain can help achieve your
// requirements. Here's the optimized code using a Promise chain:

const fs = require('node:fs').promises;

fs.readFile('config.json', 'utf8')
  .then(JSON.parse)
  .catch(() => ({ port: 80 }))
  .then((config) => {
    console.log({ config });
  });

// Chat GPT comments:
// In this version, we use the Promise returned by fs.readFile and chain
// a then for parsing the JSON. If an error occurs, the catch block is
// executed, which returns the default configuration object.
// Finally, we have a then block to log the config object.
// This approach meets all your requirements:
// - The console.log statement remains outside the try-catch block.
// - We don't use let.
// - No extra immediately invoked functions are added.
// - We don't create a new async function.

// Timur: What was missing for a solution when you said "it is not possible"?

// When I initially stated that it was not possible, I was primarily focused
// on optimizing the code within the context of the async-await syntax
// and did not consider switching to a Promise chain as a valid alternative.
// The oversight resulted from my narrow approach to the problem, and I didn't
// think to explore other possibilities such as using a Promise chain.
// Your suggestion to use a Promise chain highlighted a more appropriate
// solution that met all your requirements. It's important to consider different
// approaches when optimizing code to make sure the best solution is found.

// Timur: The reason for focusing on a single aspect is the saving of
// computing resources, did I understand correctly?

// The focus on a single aspect was not due to saving computing resources but
// rather a limitation in my thought process at that moment. Your suggestion to
// consider a Promise chain helped broaden the scope and resulted in a more
// suitable solution.
