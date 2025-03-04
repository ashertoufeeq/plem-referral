import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
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
      'hooks': path.resolve(__dirname, "src/hooks")

    },
  },
});