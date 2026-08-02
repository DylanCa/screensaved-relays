import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain at the root -> base '/'. Everything in public/ (privacy
// policy, Spotify OAuth relay, CNAME) is copied into the build verbatim so
// their URLs never change.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
