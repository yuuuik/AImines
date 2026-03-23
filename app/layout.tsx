import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SITE_URL } from '@/lib/constants';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Mines 1win',
    default: 'Mines — демо-игра с AI предсказаниями | 1win',
  },
  description:
    'Бесплатная демо-игра Mines с AI Аналитиком. AI знает расположение всех мин и подсвечивает безопасные клетки. Промокод MARCHMINES — бонус 500% на первый депозит 1win.',
  keywords: [
    'mines',
    'mines 1win',
    'mines игра онлайн',
    'демо mines',
    'mines онлайн бесплатно',
    'AI предсказания mines',
    'mines стратегия',
    'промокод 1win',
  ],
  authors: [{ name: 'Mines 1win', url: SITE_URL }],
  creator: 'Mines 1win',
  publisher: 'Mines 1win',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Mines 1win',
    title: 'Mines — демо-игра с AI предсказаниями | 1win',
    description:
      'Бесплатная демо-игра Mines с AI Аналитиком. AI знает расположение всех мин. Промокод MARCHMINES — бонус 500% на 1win.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mines — демо-игра с AI предсказаниями на 1win',
      },
    ],
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mines — демо-игра с AI предсказаниями | 1win',
    description:
      'Бесплатная демо-игра Mines с AI Аналитиком. AI знает где мины. Промокод MARCHMINES — бонус 500%.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/mines.png',
    apple: '/mines.png',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mines 1win',
  url: SITE_URL,
  description:
    'Бесплатная демо-игра Mines с AI Аналитиком. Промокод MARCHMINES для бонуса 500% на платформе 1win.',
  inLanguage: 'ru-RU',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/faq?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <body
        className={`${inter.className} text-white overflow-hidden select-none h-full`}
        style={{ background: '#141415' }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108208200', 'ym');
          ym(108208200, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
        `}</Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/108208200" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
