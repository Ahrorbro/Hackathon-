#!/usr/bin/env node
/**
 * Stop any existing ngrok tunnel, then start ngrok to the proxy port (8080).
 * Traffic: ngrok (443) -> proxy (8080) -> Expo (8081). Proxy rewrites manifest
 * so bundle/asset URLs have no :8081 and the frontend loads.
 *
 * Run the proxy first in another terminal: npm run proxy
 * Then: npm run tunnel
 */

const { spawn } = require('child_process');
const isWindows = process.platform === 'win32';

function killExistingNgrok() {
  return new Promise((resolve) => {
    const cmd = isWindows
      ? spawn('taskkill', ['/F', '/IM', 'ngrok.exe'], { stdio: 'ignore' })
      : spawn('pkill', ['-f', 'ngrok'], { stdio: 'ignore' });
    cmd.on('close', (code) => {
      if (code === 0) {
        console.log('Stopped existing ngrok.');
      }
      resolve();
    });
    cmd.on('error', () => resolve());
  });
}

async function main() {
  await killExistingNgrok();
  await new Promise((r) => setTimeout(r, 2000));

  console.log('Starting ngrok http 8080 (proxy). Ensure "npm run proxy" is running.\n');
  const ngrok = spawn('npx', ['ngrok', 'http', '8080'], {
    stdio: 'inherit',
    cwd: require('path').resolve(__dirname, '..'),
  });
  ngrok.on('close', (code) => process.exit(code || 0));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
