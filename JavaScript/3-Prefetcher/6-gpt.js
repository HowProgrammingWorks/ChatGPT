'use strict';

// Chat GPT version 4
// Prompt: Remove dead code
// Reply:
// Here's the cleaned-up version of the code with dead code removed:

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

module.exports = { cryptoRandom };

// Chat GPT comments:
// The previous versions of the code did not contain any dead code. The code
// provided above is already clean and free from dead or unreachable code.

module.exports = { cryptoRandom };
