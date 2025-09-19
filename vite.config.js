import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base: '/health-career-consultant/', // <-- This is important for GitHub Pages
  plugins: [vue()],
})
