import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(),],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@font-family': 'Inter, sans-serif',
          '@primary-color': '#3b82f6', // Tailwind blue-500
          '@text-color': '#1f2937', // slate-800
          '@text-color-secondary': '#6b7280', // slate-500
          '@input-bg': '#F9FAFC', // Filled background
          '@border-radius-base': '8px',
          '@input-border-color': '#e5e7eb', // gray-200
          '@card-radius': '12px',
          '@card-padding-base': '20px',
        },
      },
    },
  },
  resolve: {
    alias: {
      'assets': path.resolve(__dirname, "src/assets"),
      'interfaces': path.resolve(__dirname, "src/interfaces"),
      'reducers': path.resolve(__dirname, "src/reducers"),
      'components': path.resolve(__dirname, "src/components"),
      'screens': path.resolve(__dirname, "src/screens"),
      'constants': path.resolve(__dirname, "src/constants"),
      'helpers': path.resolve(__dirname, "src/helpers"),
      'utils': path.resolve(__dirname, 'src/utils'),
      'hooks': path.resolve(__dirname, "src/hooks"),
      'hocs': path.resolve(__dirname, "src/hocs"),
      'styles': path.resolve(__dirname, "src/styles"),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname)] // allow full project root
    },
    allowedHosts:["*", "2f45-43-248-241-58.ngrok-free.app"],
    proxy: {
      '^/(v1|api|b2b)': {
        target: 'https://api-stage.plem.in',
        changeOrigin: true,
        secure: false, // bypass SSL cert issues
      }
    }
  },
  base: '/',
});