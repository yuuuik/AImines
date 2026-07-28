import type { Metadata } from 'next';
import { BarChart3, ExternalLink } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { REAL_MONEY_URL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ по Mines — часто задаваемые вопросы об игре',
  description:
    'Ответы на частые вопросы о Mines: как работает игра, что предсказывает AI, как выбрать количество мин, промокоды, APK и стратегии на 1win.',
  keywords: [
    'mines вопросы',
    'faq mines',
    'как играть mines',
    'mines правила 1win',
    'mines AI подсказки',
    'mines промокод вопросы',
  ],
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: 'FAQ по Mines — часто задаваемые вопросы об игре',
    description:
      'Ответы на частые вопросы о Mines: механика, AI Аналитик, промокоды и установка на телефон.',
    url: `${SITE_URL}/faq`,
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'FAQ по игре Mines' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ по Mines — часто задаваемые вопросы',
    description: 'Ответы на частые вопросы о Mines: механика, AI, промокоды, установка.',
    images: ['/opengraph-image'],
  },
};

const faq = [
  { q: 'Как работает игра Mines?', a: 'Mines — игра с сеткой 5×5 (25 клеток). Перед каждым раундом вы выбираете количество мин (1, 2, 3, 5 или 10). После нажатия «Ставка» поле заминировано, AI анализирует расположение мин. Открывайте клетки — если попадёте на алмаз 💎, множитель растёт. Если на мину 💣 — ставка потеряна. После ≥1 открытия можно нажать «Вывести» и забрать деньги.' },
  { q: 'Как AI знает, где расположены мины?', a: 'AI Аналитик имеет доступ к алгоритму расстановки мин до начала раунда. Это не вероятностная оценка, а точная информация. На её основе AI выделяет ~50% безопасных клеток зелёным цветом — это реальные позиции без мин.' },
  { q: 'Что означают зелёные подсветки на клетках?', a: 'Зелёная подсветка (✓) означает, что AI уверен — под этой клеткой нет мины. Открывайте такие клетки в первую очередь. Примерно половина безопасных клеток подсвечивается за раунд.' },
  { q: 'Как работает множитель?', a: 'Множитель рассчитывается по формуле: 0.97 × C(25, opened) / C(25-mines, opened). Чем больше клеток открыто и чем больше мин на поле, тем выше множитель. Например, при 3 минах и 5 открытых клетках множитель ~×1.76.' },
  { q: 'Как выбрать количество мин?', a: '1–2 мины: низкий риск, невысокий множитель. Подходит для агрессивной стратегии (открывать много клеток). 3–5 мин: баланс риска и награды. 10 мин: высокий множитель даже за 1–2 клетки, но большой риск. Новичкам рекомендуем 1–3 мины.' },
  { q: 'Когда выводить деньги?', a: 'Лучший момент для вывода — по предупреждению AI. Жёлтый сигнал (60% безопасных клеток открыто) — готовьтесь. Красный сигнал (80%) — немедленно нажимайте «Вывести». Не нужно ждать максимального множителя — риск резко растёт с каждой клеткой.' },
  { q: 'Как использовать промокод ADUNLOCK?', a: 'Для реальных денег: при регистрации на 1win введите ADUNLOCK в поле промокода — получите бонус до 500% на первый депозит. Для демо-баланса: раздел «Промокод» → введите ADUNLOCK → нажмите «Применить».' },
  { q: 'Какие ставки доступны в демо?', a: 'Минимальная ставка 1 ₽, максимальная 100 000 ₽. Размер ставки изменяется кнопками «−» и «+». По умолчанию 100 ₽. Изменить можно только до нажатия «Ставка» — во время игры ставка зафиксирована.' },
  { q: 'Что делать если демо-баланс закончился?', a: 'Введите промокод ADUNLOCK в разделе «Промокод» — баланс пополнится на 5 000 ₽. Либо перейдите в реальный режим, введя ID аккаунта 1win.' },
  { q: 'Как скачать Mines на Android?', a: 'Раздел «APK» содержит инструкцию по установке как веб-приложения (PWA) на Android и iOS без App Store и Google Play. Это бесплатно и занимает несколько секунд.' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
  ],
};

export default function FAQPage() {
  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-full" style={{ background: '#141415' }}>
        <article className="max-w-2xl mx-auto px-6 py-10 text-white">

          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Справочный центр
            </div>
            <h1 className="text-3xl font-black leading-tight mb-3">
              Часто задаваемые вопросы<br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">о Mines</span>
            </h1>
            <p className="text-white/50 text-sm leading-relaxed">
              Всё о механике игры Mines, AI Аналитике, промокодах и технических вопросах.
            </p>
          </header>

          <section className="flex flex-col gap-3 mb-10">
            {faq.map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden">
                <div className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-mono font-black text-[10px] text-blue-400">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-sm leading-snug mb-2">{item.q}</h2>
                      <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <a href="/strategies" className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 hover:bg-blue-500/10 transition-colors group">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                <BarChart3 size={18} className="text-blue-400" strokeWidth={2} />
              </div>
              <p className="text-white font-bold text-sm group-hover:text-blue-300 transition-colors">Стратегии</p>
              <p className="text-white/35 text-xs mt-0.5">Тактики и советы</p>
            </a>
            <a href={REAL_MONEY_URL} target="_blank" rel="nofollow sponsored noopener noreferrer" className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4 hover:bg-green-500/10 transition-colors group">
              <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
                <ExternalLink size={18} className="text-green-400" strokeWidth={2} />
              </div>
              <p className="text-white font-bold text-sm group-hover:text-green-300 transition-colors">Реальная игра</p>
              <p className="text-white/35 text-xs mt-0.5">1win · Промокод ADUNLOCK</p>
            </a>
          </div>

          <p className="text-white/15 text-xs text-center">18+ · Mines — демонстрационная игра · Виртуальный баланс</p>
        </article>
      </div>
    </PageLayout>
  );
}
