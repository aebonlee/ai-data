import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      closeBundle() {
        const dist = resolve(__dirname, 'dist')
        const index = join(dist, 'index.html')
        const fallback = join(dist, '404.html')
        if (fs.existsSync(index)) {
          fs.copyFileSync(index, fallback)
        }
      }
    }
  ],
  base: '/',
  build: {
    outDir: 'dist'
  },
  server: {
    host: true,
    port: 5174
  }
})
