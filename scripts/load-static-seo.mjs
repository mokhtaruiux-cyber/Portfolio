import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

export const DEFAULT_SITE_URL = 'https://www.mokhtar.design';

export const resolveBuildSiteUrl = () => {
  const raw = process.env.VITE_SITE_URL;
  const isPlaceholder = !raw || raw.includes('%VITE_SITE_URL%');
  const isCi = process.env.CI === 'true' || process.env.NODE_ENV === 'production';

  if (isPlaceholder) {
    if (isCi) {
      throw new Error('VITE_SITE_URL is required to build production metadata artifacts.');
    }
    return {
      siteUrl: DEFAULT_SITE_URL,
      usingFallback: true,
    };
  }

  return {
    siteUrl: raw.replace(/\/+$/, ''),
    usingFallback: false,
  };
};

export const withStaticRouteSeo = async (callback) => {
  const bundleDir = await mkdtemp(path.join(os.tmpdir(), 'mokhtar-route-seo-'));
  const bundlePath = path.join(bundleDir, 'route-seo.bundle.mjs');

  try {
    await build({
      entryPoints: [path.resolve(process.cwd(), 'scripts', 'route-seo.entry.ts')],
      outfile: bundlePath,
      bundle: true,
      format: 'esm',
      platform: 'node',
      target: 'node20',
      logLevel: 'silent',
    });

    const { staticRouteSeo } = await import(pathToFileURL(bundlePath).href);
    return await callback(staticRouteSeo);
  } finally {
    await rm(bundleDir, { recursive: true, force: true });
  }
};
