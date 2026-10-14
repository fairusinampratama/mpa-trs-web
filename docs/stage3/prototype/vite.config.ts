import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: process.env.PREVIEW_BASE || '/',
  publicDir: false,
  plugins: [tailwindcss(), {
    name: 'preview-version',
    generateBundle() {
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
