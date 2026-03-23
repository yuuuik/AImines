import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mines — Игра с AI предсказаниями | 1win',
    short_name: 'Mines',
    description: 'Демо-игра Mines с AI Аналитиком. Промокод MARCHMINES даёт бонус 500% на 1win.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#141415',
    theme_color: '#0e0f18',
    icons: [
      { src: '/mines.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/mines.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    categories: ['games', 'entertainment'],
  };
}
