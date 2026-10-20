import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { canonicalRegistry } from './src/domain/index.ts';
import { publicMediaManifest } from './src/domain/media.ts';

export default defineConfig({
  base: process.env.PREVIEW_BASE || '/',
  publicDir: false,
  plugins: [tailwindcss(), {
    name: 'preview-version',
    generateBundle() {
      for (const [path, expected] of Object.entries(publicMediaManifest(canonicalRegistry))) {
        const source = readFileSync(new URL('./src/' + path, import.meta.url));
        if (source.byteLength !== expected.bytes || createHash('sha256').update(source).digest('hex') !== expected.sha256) throw Error('Approved media identity mismatch: ' + path);
        this.emitFile({ type: 'asset', fileName: path, source });
      }
      this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({
        stage: 3, prototype: true, sourceCommit: process.env.VITE_SOURCE_COMMIT || 'local-unversioned',
      }, null, 2) + '\n' });
      this.emitFile({ type: 'asset', fileName: '.nojekyll', source: '' });
    },
  }],
  build: {
    sourcemap: false,
    rollupOptions: { input: {
      main: new URL('./index.html', import.meta.url).pathname,
      responsive: new URL('./responsive-review.html', import.meta.url).pathname,
    } },
  },
  server: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['terminal.local'] },
});
