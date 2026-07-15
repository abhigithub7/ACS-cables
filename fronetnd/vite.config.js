import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemapPlugin from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemapPlugin({
      hostname: 'https://acscables.in/',
      routes: [
        '/',
        '/products',
        '/categories',
        '/about',
        '/contact',
        '/login',
        '/register',
        '/cart',
        '/checkout',
        '/orders',
      ],
      exclude: ['/login', '/register', '/cart', '/checkout', '/orders'],
      priority: {
        '/': 1.0,
        '/products': 0.8,
        '/categories': 0.7,
        '/about': 0.5,
        '/contact': 0.4,
      },
      changefreq: {
        '/': 'daily',
        '/products': 'daily',
        '/categories': 'weekly',
        '/about': 'monthly',
        '/contact': 'monthly',
      },
    }),
  ],
})