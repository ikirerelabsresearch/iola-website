import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
    })
  ],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunking for better caching
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'framer-motion',
      'react-intersection-observer'
    ]
  },
  // Performance optimizations
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
