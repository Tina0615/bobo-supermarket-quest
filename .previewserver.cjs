const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8766);
const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8'
};

function isAllowed(relativePath) {
  return relativePath === 'index.html'
    || relativePath === 'styles.css'
    || relativePath.startsWith(`src${path.sep}`)
    || relativePath.startsWith(`assets${path.sep}`);
}

const server = http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  const absolutePath = path.resolve(ROOT, `.${pathname}`);
  const relativePath = path.relative(ROOT, absolutePath);
  const remainsInsideProject = relativePath !== '..'
    && !relativePath.startsWith(`..${path.sep}`)
    && !path.isAbsolute(relativePath);

  if (!remainsInsideProject || !isAllowed(relativePath) || !fs.existsSync(absolutePath)) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const stat = fs.statSync(absolutePath);
  if (!stat.isFile()) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  const contentType = MIME_TYPES[path.extname(absolutePath).toLowerCase()] || 'application/octet-stream';
  response.writeHead(200, {
    'content-type': contentType,
    'content-length': stat.size,
    'cache-control': 'no-store'
  });
  if (request.method === 'HEAD') {
    response.end();
  } else {
    fs.createReadStream(absolutePath).pipe(response);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Bobo 超市探險隊已準備好：http://127.0.0.1:${PORT}/`);
});
