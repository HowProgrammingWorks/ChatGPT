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

module.exports = { Chunk };
