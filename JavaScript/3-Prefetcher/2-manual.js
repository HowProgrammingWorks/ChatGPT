'use strict';

const crypto = require('node:crypto');

const UINT32_MAX = 0xffffffff;
const BUF_LEN = 1024;
const BUF_SIZE = BUF_LEN * Uint32Array.BYTES_PER_ELEMENT;

const randomPrefetcher = {
  buf: crypto.randomBytes(BUF_SIZE),
  pos: 0,
  next() {
    const { buf, pos } = this;
    let start = pos;
    if (start === buf.length) {
      start = 0;
      crypto.randomFillSync(buf);
    }
    const end = start + Uint32Array.BYTES_PER_ELEMENT;
    this.pos = end;
    return buf.slice(start, end);
  },
};

const cryptoRandom = () => {
  const buf = randomPrefetcher.next();
  return buf.readUInt32LE(0) / (UINT32_MAX + 1);
};

module.exports = { cryptoRandom };
