const { spawn } = require('child_process');
console.log('parent pid', process.pid);

// Simple child that runs `node -e "console.log('child ok')"`
const cp = spawn(process.execPath, ['-e', "console.log('child ok')"], { stdio: ['ignore', 'pipe', 'pipe'] });

cp.stdout.on('data', (d) => console.log('child stdout:', d.toString().trim()));
cp.stderr.on('data', (d) => console.error('child stderr:', d.toString().trim()));
cp.on('exit', (code, signal) => console.log('child exit', code, signal));
cp.on('error', (err) => console.error('spawn err', err));
