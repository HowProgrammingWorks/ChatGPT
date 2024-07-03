'use strict';

// Initial code (before optimizations)

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
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => ({ value: this.next(), done: false }),
    };
  }
}

const cryptoPrefetcher = (bufSize, valueSize) =>
  new CryptoRandomPrefetcher(bufSize, valueSize);

const randPrefetcher = cryptoPrefetcher(4096, 4);
const UINT32_MAX = 0xffffffff;

const cryptoRandom = () =>
  randPrefetcher.next().readUInt32LE(0, true) / (UINT32_MAX + 1);

module.exports = { cryptoRandom };
