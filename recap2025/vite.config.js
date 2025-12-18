import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
            // БЕЗ additionalData!
            // Мы будем импортировать переменные вручную в каждом файле
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
});
