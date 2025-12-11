import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), {
    name: 'generate-design-tokens',
    hooks: {
      'astro:config:setup': async () => {
        await import('./src/styles/tokens-to-vars.mjs')
        console.log('✓ Design tokens generated')
      },
    },
  }, sitemap()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['react', 'react-dom', '@mantine/core', '@mantine/hooks'],
    },
  },
  // Static output (default) - perfect for content sites
  output: 'static',
})