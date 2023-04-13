'use strict';

// Prompt:
// Optimize following code for complexity, readability, memory, and speed

// ChatGPT 3.5 reply:
// The code looks reasonably efficient, readable, and concise. However, there
// are a few minor optimizations that can be made:
// - Use a constant instead of ID_LENGTH in Chunk.encode().
//   This will make the code more readable and slightly faster since
//   the interpreter doesn't have to look up the constant.
// - Use DataView's byteLength property instead of payload.length to calculate
//   the length of the chunkView. This avoids having to pass ID_LENGTH around
//   and makes the code more concise.
// - Use Int32Array instead of DataView in createIdBuffer() and getStreamId().
//   This will make the code faster since Int32Array is optimized for 32-bit
//   integer operations.

const ID_BYTE_LENGTH = 4;

const createIdBuffer = (id) => {
  const buffer = new ArrayBuffer(ID_BYTE_LENGTH);
  const view = new Int32Array(buffer);
  view[0] = id;
  return buffer;
};

const getStreamId = (buffer) => {
  const view = new Int32Array(buffer);
  return view[0];
};

class Chunk {
  static encode(id, payload) {
    const idView = new Uint8Array(createIdBuffer(id));
    const chunkView = new Uint8Array(idView.byteLength + payload.byteLength);
    chunkView.set(idView);
    chunkView.set(payload, idView.byteLength);
    return chunkView;
  }

  static decode(chunkView) {
    const id = getStreamId(chunkView.buffer);
    const payload = chunkView.subarray(ID_BYTE_LENGTH);
    return { id, payload };
  }
}

module.exports = { Chunk };
