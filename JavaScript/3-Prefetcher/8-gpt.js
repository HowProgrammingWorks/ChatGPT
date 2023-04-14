'use strict';

// Chat GPT version 4
// Prompt:
// - We do not need vsz property (copy of valueSize) because it is constant
// - Use UPPER_CAMEL for file-wide constants
// Reply:
// Here's the updated code with the file-wide constants bufSize and valueSize
// using UPPER_CAMEL case:

const crypto = require('node:crypto');

const BUF_SIZE = 4096;
const VALUE_SIZE = 4;

const randPrefetcher = {
  buf: crypto.randomBytes(BUF_SIZE),
  pos: 0,

  next() {
    if (this.pos === this.buf.length) {
      this.pos = 0;
      crypto.randomFillSync(this.buf);
    }
    const end = this.pos + VALUE_SIZE;
    const buf = this.buf.slice(this.pos, end);
    this.pos = end;
    return buf;
  },
};

const UINT32_MAX = 0xffffffff;

const cryptoRandom = () =>
  randPrefetcher.next().readUInt32LE(0) / (UINT32_MAX + 1);

// Chat GPT comments:
// I've removed the vsz property from the randPrefetcher object and replaced
// its usage in the next() method with the constant valueSize.
// I've changed the names of the constants bufSize and valueSize to BUF_SIZE and
// VALUE_SIZE, respectively, to follow the UPPER_CAMEL naming convention for
// file-wide constants.

module.exports = { cryptoRandom };
