import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // الـ '/' بتخلي الموقع يقرأ المسارات بشكل صحيح لو هترفع بدومين مخصص أو على منصات زي Vercel/Netlify
  base: '/', 
})
