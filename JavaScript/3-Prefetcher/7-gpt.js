'use strict';

// Chat GPT version 4
// Prompt: Remove if statement with throw because it can be precalculated
// Reply:
// You're correct that the check can be precalculated if the bufSize and
// valueSize are constants.
// In that case, the code can be simplified as follows:

const crypto = require('node:crypto');

const bufSize = 4096;
const valueSize = 4;

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
// I've removed the if statement with the throw since the bufSize and
// valueSize are constants and the condition (bufSize % valueSize !== 0)
// can be precalculated. In this case, it evaluates to false, so there's
// no need for the check in the code.

module.exports = { cryptoRandom };
