import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Note: the original base44() plugin (from @base44/vite-plugin) has been
// removed here. It provided base44's own dev-time tooling (hot-reload
// notifications, their visual editor, analytics) which requires a
// connection to base44's platform and isn't needed to build or run the
// site independently. The base44 plugin also handled resolving the "@/"
// import alias, so that's replaced here with Vite's standard resolve.alias.
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
