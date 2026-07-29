import type { Metadata } from 'next';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { REAL_MONEY_URL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mines — правила игры, демо-баланс и как заработать',
  description:
    'Mines автомат — полное руководство: правила игры, как играть с демо-балансом бесплатно, что означает RTP и как AI Аналитик помогает находить безопасные клетки. Демо мины казино без регистрации.',
  keywords: [
    'mines автомат игровой',
    'мины с демо балансом',
    'mines заработок',
    'мины играть казино',
    'демо мины казино',
    'mines правила игры',
  ],
  alternates: {
    canonical: `${SITE_URL}/guide`,
  },
  openGraph: {
    title: 'Mines — правила игры, демо-баланс и как заработать',
    description:
      'Полное руководство по игровому автомату Mines: правила, демо-баланс, RTP и подсказки AI Аналитика.',
    url: `${SITE_URL}/guide`,
    type: 'article',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Гайд по игре Mines' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mines — правила игры и демо-баланс',
    description: 'Как играть в Mines: правила, демо-режим бесплатно, RTP и AI-подсказки.',
  },
};

const faq = [
  {
    q: 'Что такое mines автомат игровой?',
    a: 'Mines — игровой автомат в жанре "найди безопасную клетку": на поле 5×5 случайно расположены мины, остальные клетки — выигрышные. Чем больше клеток вы откроете без попадания на мину, тем выше множитель ставки.',
  },
  {
    q: 'Как играть в мины с демо балансом?',
    a: 'При первом заходе на сайт демо-баланс начисляется автоматически — 5000 виртуальных рублей без регистрации и без ввода реальных денег. Этого достаточно, чтобы освоить механику и протестировать стратегии перед игрой на реальные средства.',
  },
  {
    q: 'Можно ли реально заработать на Mines?',
    a: 'Mines — игра с случайным результатом и встроенным преимуществом казино (RTP около 97%), поэтому гарантированного заработка не существует. AI Аналитик повышает информированность решений, подсвечивая статистически безопасные клетки, но не отменяет риск.',
  },
  {
    q: 'Как выбрать количество мин для игры?',
    a: 'Меньше мин (1–3) — ниже риск, ниже множитель за клетку, подходит для стабильной консервативной игры. Больше мин (5–10) — выше риск и множитель за каждую открытую клетку, подходит для агрессивной стратегии на короткой дистанции.',
  },
  {
    q: 'Нужна ли регистрация, чтобы играть в демо мины казино?',
    a: 'Нет, демо-режим на этом сайте доступен без регистрации — играть можно сразу с виртуальным балансом. Регистрация нужна только для перехода на 1win и игры на реальные деньги.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Гайд', item: `${SITE_URL}/guide` },
  ],
};

export default function GuidePage() {
  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="min-h-full" style={{ background: '#141415' }}>
        <article className="max-w-2xl mx-auto px-6 py-10 text-white">

          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Полное руководство
            </div>
            <h1 className="text-3xl font-black leading-tight mb-3">
              Mines автомат игровой:<br />
              <span className="bg-gradient-to-r from-emerald-300 to-blue-400 bg-clip-text text-transparent">
                правила, демо-баланс и RTP
              </span>
            </h1>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg">
              Mines — популярный игровой автомат в стиле "найди безопасную клетку". Разбираем правила,
              демо-режим без регистрации и что означает RTP на практике.
            </p>
          </header>

          <section className="mb-10 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-5">
            <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Правила игры Mines</h2>
            <div className="flex flex-col gap-3">
              {[
                'Поле состоит из 25 клеток (5×5), под частью из них скрыты мины',
                'Перед раундом выберите количество мин от 1 до 10 и размер ставки',
                'Открывайте клетки по одной — каждая безопасная клетка увеличивает множитель',
                'В любой момент можно нажать «Вывести» и забрать текущий выигрыш',
                'Попадание на мину завершает раунд, ставка сгорает',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-white/65 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-blue-400 inline-block" />
              Демо-баланс и как заработать
            </h2>
            <p className="text-white/65 text-sm leading-relaxed mb-4">
              На этом сайте демо-баланс начисляется автоматически без регистрации — вы сразу получаете
              виртуальные средства для тренировки. Это позволяет разобраться в механике игры, попробовать
              разные количества мин и оценить, как работают AI-подсказки, прежде чем переходить на реальные ставки.
            </p>
            <p className="text-white/65 text-sm leading-relaxed mb-4">
              RTP (Return to Player) в Mines обычно составляет около 97% — это доля ставок, которая
              в среднем возвращается игрокам в долгосрочной перспективе. Это статистический показатель:
              он не гарантирует выигрыш в конкретном раунде, а описывает поведение игры на больших объёмах ставок.
            </p>
            <p className="text-white/65 text-sm leading-relaxed">
              Подробные тактики по количеству открываемых клеток и моментам вывода — в разделе{' '}
              <a href="/strategies" className="text-blue-300 underline underline-offset-2">Стратегии Mines</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Частые вопросы
            </h2>
            <div className="flex flex-col gap-3">
              {faq.map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                  <p className="text-white font-semibold text-sm mb-2">{q}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <a
            href={REAL_MONEY_URL}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full block text-center rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold py-4 px-6 hover:opacity-90 transition-opacity"
          >
            Перейти на 1win и играть на реальные деньги
          </a>

          <section className="mt-10">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-blue-400 inline-block" />
              Другие демо-игры с AI-аналитикой
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://towerrush-predictor.vercel.app/" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
                <p className="text-white font-semibold text-sm mb-1">Tower Rush — демо краш-игры</p>
                <p className="text-white/40 text-xs">Башня растёт этаж за этажом с AI-сигналами</p>
              </a>
              <a href="https://astronaut-prediction.vercel.app/" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
                <p className="text-white font-semibold text-sm mb-1">Astronaut — демо краш-игры</p>
                <p className="text-white/40 text-xs">Растущий множитель с AI-сигналами вывода</p>
              </a>
            </div>
          </section>

        </article>
      </div>
    </PageLayout>
  );
}
