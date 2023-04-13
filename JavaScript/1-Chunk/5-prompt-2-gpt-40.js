'use strict';

// Prompt:
// Optimize following code

// ChatGPT 4 reply:
// You can optimize the given code by removing the unnecessary createIdBuffer
// function and simplifying the Chunk.encode method.
//
// Here's the optimized code:

const ID_LENGTH = 4;

const getStreamId = (buffer) => {
  const view = new DataView(buffer);
  return view.getInt32(0);
};

class Chunk {
  static encode(id, payload) {
    const chunkView = new Uint8Array(ID_LENGTH + payload.length);
    const idView = new DataView(chunkView.buffer);
    idView.setInt32(0, id);
    chunkView.set(payload, ID_LENGTH);
    return chunkView;
  }

  static decode(chunkView) {
    const id = getStreamId(chunkView.buffer);
    const payload = chunkView.subarray(ID_LENGTH);
    return { id, payload };
  }
}

module.exports = { Chunk };
