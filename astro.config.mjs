import node from '@astrojs/node'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    {
      name: 'generate-design-tokens',
      hooks: {
        'astro:config:setup': async () => {
          await import('./src/styles/tokens-to-vars.mjs')
          console.log('✓ Design tokens generated')
        },
      },
    },
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['react', 'react-dom', '@mantine/core', '@mantine/hooks'],
    },
  },
  output: 'server',
  adapter: node({ mode: 'standalone' }),
})
