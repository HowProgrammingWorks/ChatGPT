'use strict';

// Prompt:
// Optimize following code

// ChatGPT 3.5 reply:
// Here are some optimizations that can be made to the given code:
// - Use a TypedArray instead of DataView:
//   Since the DataView is slower than TypedArray, it is better to use
//   the TypedArray instead of the DataView.
// - Use Int32Array instead of DataView:
//   Since the createIdBuffer function always creates an ArrayBuffer
//   of length ID_LENGTH (which is always 4), we can use the Int32Array
//   to set the integer value at the beginning of the buffer.
// - Use a shared buffer:
//   Instead of creating a new buffer every time createIdBuffer is called,
//   we can use a shared buffer and only modify the integer value using
//   setInt32. This can save memory allocations and deallocations.
//
// With these optimizations, we are using a shared buffer and a faster
// TypedArray to reduce memory allocations and improve the performance
// of the code.
//
// Here is the optimized code:

const ID_LENGTH = 4;
const idBuffer = new ArrayBuffer(ID_LENGTH);
const idView = new Int32Array(idBuffer);

class Chunk {
  static encode(id, payload) {
    idView[0] = id;
    const chunkView = new Uint8Array(idBuffer.byteLength + payload.length);
    chunkView.set(new Uint8Array(idBuffer));
    chunkView.set(payload, ID_LENGTH);
    return chunkView;
  }

  static decode(chunkView) {
    const id = new Int32Array(chunkView.buffer, 0, 1)[0];
    const payload = chunkView.subarray(ID_LENGTH);
    return { id, payload };
  }
}

module.exports = { Chunk };
