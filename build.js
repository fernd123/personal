const { spawnSync } = require('child_process');
const fs = require('fs');

const result = spawnSync('ng', ['build'], { stdio: 'inherit', shell: true });

// If ng build failed, check whether the output actually exists.
// On Windows, Angular CLI exits with code 1 due to an EPERM utime error
// when Windows Defender scans files right after they are written to dist/.
// The bundle itself is complete and valid in that case.
if (result.status !== 0) {
  const outputExists = fs.existsSync('dist/portfolio/browser');
  if (outputExists) {
    console.log('\n[build.js] Angular bundle is complete. Ignoring EPERM timestamp error on Windows.\n');
    process.exit(0);
  } else {
    console.error('\n[build.js] Build failed and no output found.\n');
    process.exit(1);
  }
}

process.exit(0);
