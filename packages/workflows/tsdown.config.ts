import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'workers/worker-a': './src/workers/worker-a.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  outDir: './dist',
});