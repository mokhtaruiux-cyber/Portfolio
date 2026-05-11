import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;
