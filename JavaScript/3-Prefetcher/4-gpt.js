'use strict';

// Chat GPT version 4
// Prompt:
// - We do not need class here, convert prefetcher to the object with
//   methods and properties (state)
// - No need in iterable contract here, prefetcher can have just next()
//   function to get next value
// - Use node: prefix in require
// Reply:
// Here's the refactored version of the code with the requested changes:

const crypto = require('node:crypto');

function createCryptoRandomPrefetcher(bufSize, valueSize) {
  if (bufSize % valueSize !== 0) {
    throw new RangeError('buffer size must be a multiple of value size');
  }

  const state = {
    buf: crypto.randomBytes(bufSize),
    pos: 0,
    vsz: valueSize,
  };

  function next() {
    if (state.pos === state.buf.length) {
      state.pos = 0;
      crypto.randomFillSync(state.buf);
    }
    const end = state.pos + state.vsz;
    const buf = state.buf.slice(state.pos, end);
    state.pos = end;
    return buf;
  }

  return { next };
}

const cryptoPrefetcher = (bufSize, valueSize) =>
  createCryptoRandomPrefetcher(bufSize, valueSize);

const randPrefetcher = cryptoPrefetcher(4096, 4);
const UINT32_MAX = 0xffffffff;

const cryptoRandom = () =>
  randPrefetcher.next().readUInt32LE(0) / (UINT32_MAX + 1);

module.exports = { cryptoRandom };

// Chat GPT comments:
// The changes I made are:
// - Replaced the CryptoRandomPrefetcher class with a factory function
//   createCryptoRandomPrefetcher that returns an object with a next method.
// - Removed the iterable implementation from the prefetcher.
// - Changed the require statement to use the node: prefix.

module.exports = { cryptoRandom };
