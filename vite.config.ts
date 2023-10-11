import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        electron({
            main: {
                entry: './src/electron.ts'
            }
        })
    ]
});
