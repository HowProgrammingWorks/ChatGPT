'use strict';

// Prompt:
// Can you please optimize following code:
// - use one typed array memory allocation instead of two
// - remove unneeded class
// - just two functions

// ChatGPT 3.5 reply:
// Certainly!
// Changes made:
// - Removed the Chunk class, since it was not needed.
// - Combined the createIdBuffer and encodeChunk functions into
//   a single function, encodeChunk.
// - Moved the allocation of the memory for chunkView to
//   the encodeChunk function, and created the DataView object
//   using the buffer of chunkView.
// - Combined the getStreamId and decodeChunk functions into
//   a single function, decodeChunk.
// - Removed the need for the idView variable in encodeChunk
//   by setting the ID directly on the DataView object.
//
// This code now uses only one typed array memory allocation instead of two,
// and has been simplified to just two functions.
//
// Here's the optimized code:

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

module.exports = { encodeChunk, decodeChunk };
