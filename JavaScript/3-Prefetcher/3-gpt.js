'use strict';

// Chat GPT version 4
// Prompt: Please optimize following code
// Reply: Here's the optimized version of the given code:

const crypto = require('crypto');

class CryptoRandomPrefetcher {
  constructor(bufSize, valueSize) {
    if (bufSize % valueSize !== 0) {
      throw new RangeError('buffer size must be a multiple of value size');
    }
    this.buf = crypto.randomBytes(bufSize);
    this.pos = 0;
    this.vsz = valueSize;
  }

  // Return Buffer with next `valueSize` random bytes.
  next() {
    if (this.pos === this.buf.length) {
      this.pos = 0;
      crypto.randomFillSync(this.buf);
    }
    const end = this.pos + this.vsz;
    const buf = this.buf.slice(this.pos, end);
    this.pos = end;
    return buf;
  }

  [Symbol.iterator]() {
    const nextFunc = () => ({ value: this.next(), done: false });
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: nextFunc,
    };
  }
}

const cryptoPrefetcher = (bufSize, valueSize) =>
  new CryptoRandomPrefetcher(bufSize, valueSize);

const randPrefetcher = cryptoPrefetcher(4096, 4);
const UINT32_MAX = 0xffffffff;

const cryptoRandom = () =>
  randPrefetcher.next().readUInt32LE(0) / (UINT32_MAX + 1);

// Chat GPT comments:
// I have made the following optimization:
// - Removed the second parameter true from the readUInt32LE() function call,
//   as it is not needed. By default, it is set to false, which means
//   the function will not check for out of bounds access. Since you have
//   already ensured that the buffer size is a multiple of the value size,
//   this check is not necessary.

module.exports = { cryptoRandom };
