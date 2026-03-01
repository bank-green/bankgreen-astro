import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://bank.green',
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
      include: ['react', 'react-dom', '@mantine/core', '@mantine/hooks', 'htmlparser2'],
    },
    ssr: {
      // htmlparser2 needs to be bundled for SSR/static builds
      noExternal: ['htmlparser2'],
    },
  },
  output: 'server',
  adapter: cloudflare({ imageService: 'compile' }),
  trailingSlash: 'never',
})
