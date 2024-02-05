import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
    }),
  ],

  build: {
    outDir: 'dist-electron',
  },
});
