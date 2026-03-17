// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  publicDir: 'static_assets',
  outDir: 'public_dist',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
