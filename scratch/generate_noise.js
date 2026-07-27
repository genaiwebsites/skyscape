const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create 256x256 RGBA noise PNG buffer
const width = 256;
const height = 256;
const rawData = Buffer.alloc(height * (width * 4 + 1));

let offset = 0;
for (let y = 0; y < height; y++) {
  rawData[offset++] = 0; // PNG scanline filter type 0 (None)
  for (let x = 0; x < width; x++) {
    const val = Math.floor(Math.random() * 256);
    rawData[offset++] = val; // R
    rawData[offset++] = val; // G
    rawData[offset++] = val; // B
    rawData[offset++] = 255; // A
  }
}

const compressed = zlib.deflateSync(rawData);

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
  }
  return ~c;
}

function makeChunk(type, data) {
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeInt32BE(crcVal, 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8; // 8 bit
ihdr[9] = 6; // RGBA
ihdr[10] = 0; // deflate
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace

const ihdrChunk = makeChunk('IHDR', ihdr);
const idatChunk = makeChunk('IDAT', compressed);
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const pngBuffer = Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);

const galleryDir = path.join(__dirname, '..', 'public', 'gallery');
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}
fs.writeFileSync(path.join(galleryDir, 'noise.png'), pngBuffer);
console.log('Successfully generated public/gallery/noise.png (' + pngBuffer.length + ' bytes)');
