const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'producers.json');
const dest = path.join(__dirname, '..', 'dist', 'producers.json');

try {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('Copied', src, '->', dest);
} catch (err) {
  console.error('Failed to copy producers.json:', err.message);
  process.exit(1);
}
