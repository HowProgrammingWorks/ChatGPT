'use strict';

const ID_LENGTH = 4;

const encodeChunk = (id, payload) => {
  const chunkView = new Uint8Array(ID_LENGTH + payload.length);
  const view = new DataView(chunkView.buffer);
  view.setInt32(0, id);
  chunkView.set(payload, ID_LENGTH);
  return chunkView;
};

const decodeChunk = (chunkView) => {
  const view = new DataView(chunkView.buffer);
  const id = view.getInt32(0);
  const payload = chunkView.subarray(ID_LENGTH);
  return { id, payload };
};

// Usage example

const encoder = new TextEncoder();
const data = encoder.encode('Hello World');
const packet = encodeChunk(123, data);
console.log(packet);

const { id, payload } = decodeChunk(packet);
const decoder = new TextDecoder();
const text = decoder.decode(payload);
console.log({ id, payload: text });

const assert = require('node:assert/strict');
assert.equal(id, 123);
assert.equal(text, 'Hello World');

module.exports = { encodeChunk, decodeChunk };
