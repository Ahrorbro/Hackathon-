#!/usr/bin/env node
/**
 * Proxy in front of Expo dev server so the manifest returned to clients
 * (e.g. via ngrok) has URLs without :8081. Ngrok serves on 443, so :8081
 * in URLs breaks loading the bundle and assets.
 *
 * Usage: node scripts/ngrok-proxy.js [expo-port] [proxy-port]
 *   expo-port: Expo/Metro port (default 8081)
 *   proxy-port: Port this proxy listens on; point ngrok here (default 8080)
 *
 * Then: ngrok http 8080
 */

const http = require('http');

const EXPO_PORT = parseInt(process.env.EXPO_PORT || process.argv[2] || '8081', 10);
const PROXY_PORT = parseInt(process.env.PROXY_PORT || process.argv[3] || '8080', 10);

function rewriteManifest(body) {
  if (typeof body !== 'string') return body;
  return body.replace(/:8081/g, '');
}

const server = http.createServer((clientReq, clientRes) => {
  const opts = {
    hostname: '127.0.0.1',
    port: EXPO_PORT,
    path: clientReq.url,
    method: clientReq.method,
    headers: { ...clientReq.headers },
  };

  const proxy = http.request(opts, (upstreamRes) => {
    const chunks = [];
    upstreamRes.on('data', (chunk) => chunks.push(chunk));
    upstreamRes.on('end', () => {
      let body = Buffer.concat(chunks);
      const ct = (upstreamRes.headers['content-type'] || '').toLowerCase();
      if (ct.includes('application/json') && body.includes('launchAsset')) {
        body = Buffer.from(rewriteManifest(body.toString()), 'utf8');
      }
      clientRes.writeHead(upstreamRes.statusCode, upstreamRes.headers);
      clientRes.end(body);
    });
  });

  proxy.on('error', (err) => {
    clientRes.writeHead(502, { 'Content-Type': 'text/plain' });
    clientRes.end(`Proxy error: ${err.message}`);
  });

  clientReq.pipe(proxy, { end: true });
});

server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`Ngrok proxy: http://0.0.0.0:${PROXY_PORT} -> http://127.0.0.1:${EXPO_PORT}`);
  console.log(`Run: npx ngrok http ${PROXY_PORT}`);
});
