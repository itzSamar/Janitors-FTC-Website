import { defineConfig } from 'vite'

// Static site: friend's design ships as index.html + public/assets (DC runtime).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
})
