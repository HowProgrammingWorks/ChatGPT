'use strict';

const ID_LENGTH = 4;

const createIdBuffer = (id) => {
  const buffer = new ArrayBuffer(ID_LENGTH);
  const view = new DataView(buffer);
  view.setInt32(0, id);
  return buffer;
};

const getStreamId = (buffer) => {
  const view = new DataView(buffer);
  return view.getInt32(0);
};

class Chunk {
  static encode(id, payload) {
    const idView = new Uint8Array(createIdBuffer(id));
    const chunkView = new Uint8Array(ID_LENGTH + payload.length);
    chunkView.set(idView);
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
