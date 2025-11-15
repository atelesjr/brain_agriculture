const { spawnSync } = require('child_process');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

function findTests(dir) {
  const results = [];
  const entries = readdirSync(dir);
  for (const e of entries) {
    const full = join(dir, e);
    const st = statSync(full);
    if (st.isDirectory()) {
      results.push(...findTests(full));
    } else if (/\.test\.(ts|tsx)$/.test(e)) {
      results.push(full);
    }
  }
  return results;
}

const root = process.cwd();
const tests = findTests(join(root, 'src'));
if (!tests.length) {
  console.log('No test files found');
  process.exit(0);
}

let failed = false;
for (const t of tests) {
  console.log('\n--- Running', t, '---');
  const res = spawnSync('npx', ['vitest', 'run', t, '--run'], { stdio: 'inherit', shell: true });
  if (res.status !== 0) {
    failed = true;
    console.error('Test failed:', t);
  }
}

process.exit(failed ? 1 : 0);
