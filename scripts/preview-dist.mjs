import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { URL } from 'node:url';

const distDir = path.resolve(process.cwd(), 'dist');

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

const getArgValue = (flag, fallback) => {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
};

const host = getArgValue('--host', process.env.HOST ?? '127.0.0.1');
const port = Number.parseInt(getArgValue('--port', process.env.PORT ?? '4173'), 10);

const isWithinDist = (candidatePath) => {
  const relativePath = path.relative(distDir, candidatePath);
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
};

const tryResolveFile = async (candidatePath) => {
  if (!isWithinDist(candidatePath)) return null;

  try {
    const fileStat = await stat(candidatePath);
    if (fileStat.isFile()) return candidatePath;
    if (fileStat.isDirectory()) {
      const indexPath = path.join(candidatePath, 'index.html');
      const indexStat = await stat(indexPath);
      return indexStat.isFile() ? indexPath : null;
    }
  } catch {
    return null;
  }

  return null;
};

const resolveRequestPath = async (pathname) => {
  if (pathname === '/') {
    return tryResolveFile(path.join(distDir, 'index.html'));
  }

  const relativePath = pathname.replace(/^\/+/, '');
  const candidates = [path.join(distDir, relativePath)];

  if (!path.extname(relativePath)) {
    candidates.push(path.join(distDir, relativePath, 'index.html'));
  }

  for (const candidate of candidates) {
    const resolved = await tryResolveFile(candidate);
    if (resolved) return resolved;
  }

  return null;
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? `${host}:${port}`}`);
  const filePath = await resolveRequestPath(decodeURIComponent(url.pathname));

  if (!filePath) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const content = await readFile(filePath);

  response.writeHead(200, {
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    'Content-Type': contentTypes.get(ext) ?? 'application/octet-stream',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  response.end(content);
});

server.listen(port, host, () => {
  console.log(`  ➜  Local:   http://${host}:${port}/`);
});
