import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  
  // Tell Vite that when we refer to "parse" we talk about the minified version
  resolve: {
    alias: {
      parse: "parse/dist/parse.min.js",
    },
    
  // Beter performance during development 
  optimizeDeps: {
    include: ["parse"],
  },
  }
})
