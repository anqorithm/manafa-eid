import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.VITE_APP_SUPABASE_URL': JSON.stringify(env.VITE_APP_SUPABASE_URL),
      'process.env.VITE_APP_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_APP_SUPABASE_ANON_KEY),
    },
    plugins: [react()],
  }
})