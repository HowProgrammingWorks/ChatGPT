'use strict';

// Chat GPT version 4
// Prompt:
// - We do not need factory, just define object and combine state and next()
//   function to this single instance
// Reply:
// Here's the code with the requested changes:

const crypto = require('node:crypto');

const bufSize = 4096;
const valueSize = 4;

if (bufSize % valueSize !== 0) {
  throw new RangeError('buffer size must be a multiple of value size');
}

const randPrefetcher = {
  buf: crypto.randomBytes(bufSize),
  pos: 0,
  vsz: valueSize,

  next() {
    if (this.pos === this.buf.length) {
      this.pos = 0;
      crypto.randomFillSync(this.buf);
    }
    const end = this.pos + this.vsz;
    const buf = this.buf.slice(this.pos, end);
    this.pos = end;
    return buf;
  },
};

const UINT32_MAX = 0xffffffff;

const cryptoRandom = () =>
  randPrefetcher.next().readUInt32LE(0) / (UINT32_MAX + 1);

// Chat GPT comments:
// In this version of the code:
// - Removed the factory function and directly defined the randPrefetcher
//   object with its state and next() method.
// - Removed the cryptoPrefetcher function as it's no longer needed.

module.exports = { cryptoRandom };
