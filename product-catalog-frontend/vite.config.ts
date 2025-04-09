import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem'),
    },
    port: +process.env.VITE_DEFAULT_PORT!,
  },
});
