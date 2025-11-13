import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite + Tailwind + DaisyUI
export default defineConfig({
  plugins: [react(), tailwindcss()],
 
})
