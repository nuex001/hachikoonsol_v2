import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/leaderboard': 'http://localhost:3001',
      '/leaderboard/refresh': 'http://localhost:3001',
    }
  }
})