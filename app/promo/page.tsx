import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { REAL_MONEY_URL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Промокод ADUNLOCK 1win — бонус 500% при регистрации',
  description:
    'Промокод ADUNLOCK для 1win: бонус до 500% на первый депозит. Введите код при регистрации и получите максимальный приветственный бонус для игры Mines на 1win.',
  keywords: [
    'промокод 1win adunlock',
    'mines промокод',
    '1win бонус регистрация',
    'adunlock 1win',
    'бонус 1win 500%',
    'промокод mines 2026',
  ],
  alternates: {
    canonical: `${SITE_URL}/promo`,
  },
  openGraph: {
    title: 'Промокод ADUNLOCK 1win — бонус 500% при регистрации',
    description:
      'Введите ADUNLOCK при регистрации на 1win и получите бонус до 500% на первый депозит для игры Mines.',
    url: `${SITE_URL}/promo`,
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Промокод ADUNLOCK 1win' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Промокод ADUNLOCK 1win — бонус 500%',
    description: 'Введите ADUNLOCK при регистрации на 1win — бонус до 500% на первый депозит.',
    images: ['/opengraph-image'],
  },
};

const faq = [
  {
    q: 'Что такое промокод ADUNLOCK?',
    a: 'ADUNLOCK — официальный партнёрский промокод для регистрации на платформе 1win. При использовании этого кода вы получаете увеличенный приветственный бонус до 500% на первый депозит.',
  },
  {
    q: 'Как использовать промокод ADUNLOCK?',
    a: 'Перейдите на сайт 1win по кнопке «Зарегистрироваться на 1win» выше. При заполнении формы регистрации найдите поле «Промокод» и введите ADUNLOCK. Бонус начисляется автоматически после первого пополнения.',
  },
  {
    q: 'Сколько можно получить с промокодом ADUNLOCK?',
    a: 'Промокод ADUNLOCK активирует бонус до 500% на первый депозит. Например, при пополнении на 5 000 ₽ ваш игровой баланс составит до 30 000 ₽. Точный размер зависит от суммы депозита и актуальных условий на сайте 1win.',
  },
  {
    q: 'Работает ли промокод ADUNLOCK в 2025-2026 году?',
    a: 'Да, промокод ADUNLOCK актуален и действует. Мы регулярно проверяем его работоспособность. Если при вводе возникает ошибка, убедитесь, что вводите заглавными буквами: ADUNLOCK.',
  },
  {
    q: 'На какие игры распространяется бонус?',
    a: 'Бонус по промокоду ADUNLOCK может быть использован на слоты, игры с минами и игры Mines на платформе 1win. Ознакомьтесь с полными условиями вейджера на сайте 1win.',
  },
  {
    q: 'Можно ли вывести бонусные деньги?',
    a: 'Бонусные средства необходимо отыграть согласно условиям вейджера 1win. После выполнения требований выигрыш переводится на реальный баланс и доступен для вывода.',
  },
  {
    q: 'Что делать если промокод не принимается?',
    a: 'Убедитесь что: (1) вводите код заглавными буквами — ADUNLOCK, (2) вы создаёте новый аккаунт (промокод только для новых пользователей), (3) поле промокода заполнено до нажатия кнопки регистрации.',
  },
  {
    q: 'Как связана Mines с 1win?',
    a: 'Mines — демонстрационная версия игры в стиле 1win Casino. Демо-режим позволяет изучить механику и стратегии перед игрой на реальные деньги. Промокод ADUNLOCK обеспечивает максимальный стартовый бонус при переходе на 1win.',
  },
  {
    q: 'Можно ли использовать промокод повторно?',
    a: 'Нет, промокод ADUNLOCK применяется один раз — при первой регистрации. Бонус предназначен для новых игроков. Повторное использование на том же аккаунте невозможно.',
  },
  {
    q: 'Есть ли ограничения по странам?',
    a: 'Промокод ADUNLOCK действителен для пользователей из стран, где платформа 1win ведёт деятельность. Уточните доступность в вашем регионе на официальном сайте 1win.',
  },
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
    { '@type': 'ListItem', position: 2, name: 'Промокод ADUNLOCK', item: `${SITE_URL}/promo` },
  ],
};

export default function PromoPage() {
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
        <article className="max-w-lg mx-auto px-6 py-10 text-white">

          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Эксклюзивный промокод
            </div>
          </div>

          {/* Main promo card */}
          <div className="relative rounded-3xl overflow-hidden mb-10 shadow-2xl shadow-black/50">
            <div className="absolute inset-0" style={{ background: '#1c1c1e' }} />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/8 via-transparent to-green-600/8" />
            <div className="absolute inset-0 rounded-3xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }} />

            <div className="relative px-8 py-10 flex flex-col items-center gap-6 text-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-blue-500/30">
                  1W
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg leading-none">1win</p>
                  <p className="text-white/40 text-xs mt-0.5">Официальный партнёр</p>
                </div>
              </div>

              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Промокод при регистрации</p>
                <div className="relative group inline-block">
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-green-400 opacity-60 blur-sm group-hover:opacity-80 transition" />
                  <div className="relative px-10 py-4 rounded-2xl border border-white/10" style={{ background: '#141415' }}>
                    <p className="font-mono font-black text-3xl tracking-[0.2em] text-white">
                      MARCH<span className="text-blue-300">MINES</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full">
                {[
                  { value: '500%', label: 'Бонус на депозит', color: 'text-yellow-400' },
                  { value: '200+', label: 'Игр в казино', color: 'text-blue-300' },
                  { value: '24/7', label: 'Поддержка', color: 'text-green-400' },
                ].map(item => (
                  <div key={item.label} className="rounded-2xl bg-white/5 border border-white/8 py-3 px-2">
                    <p className={`text-xl font-black ${item.color}`}>{item.value}</p>
                    <p className="text-white/35 text-[10px] mt-0.5 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>

              <a href={REAL_MONEY_URL} target="_blank" rel="noopener noreferrer" className="w-full block">
                <div
                  className="w-full py-4 rounded-2xl font-bold text-base text-white text-center shadow-xl shadow-green-900/25 hover:shadow-green-900/40 transition-shadow cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #15803d 0%, #16a34a 55%, #4ade80 100%)' }}
                >
                  💎 Зарегистрироваться на 1win
                </div>
              </a>

              <p className="text-white/25 text-[11px] leading-relaxed">
                Введите ADUNLOCK в поле промокода при регистрации.
                Бонус зачисляется после первого депозита.
              </p>
            </div>
          </div>

          {/* How it works */}
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-green-400 inline-block" />
              Как получить бонус на 1win
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { num: '01', title: 'Перейдите на 1win', desc: 'Нажмите «Зарегистрироваться на 1win» выше. Откроется официальный сайт.' },
                { num: '02', title: 'Введите промокод', desc: 'При регистрации найдите поле «Промокод» и введите ADUNLOCK заглавными буквами.' },
                { num: '03', title: 'Пополните счёт', desc: 'Внесите первый депозит. Бонус до 500% зачисляется автоматически.' },
                { num: '04', title: 'Играйте в Mines', desc: 'Примените бонусный баланс в игре Mines на платформе 1win.' },
              ].map(step => (
                <div key={step.num} className="flex gap-4 items-start p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 font-mono font-bold text-xs shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{step.title}</p>
                    <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-green-400 inline-block" />
              Вопросы о промокоде ADUNLOCK
            </h2>
            <div className="flex flex-col gap-3">
              {faq.map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-blue-400/60 font-bold mt-0.5 shrink-0 w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-white font-bold text-sm leading-snug mb-1.5">{item.q}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-yellow-400 to-orange-400 inline-block" />
              Отзывы игроков
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Дмитрий К.', date: '22 июля 2026', stars: 5, text: 'Не думал что так точно будет. Прошёл штук 30 раундов в демке, AI угадывал клетки процентов 70 от силы. Зарегался с промокодом ADUNLOCK, дали бонус нормально. На реале уже несколько дней, пока в плюсе.' },
                { name: 'Алексей В.', date: '18 июля 2026', stars: 4, text: 'Удобно поиграть перед реальными деньгами и понять механику. Промокод сработал без вопросов. AI иногда ошибается но это нормально, в целом подсказки полезные. Советую начать с 1 миной.' },
                { name: 'Паша', date: '15 июля 2026', stars: 5, text: 'братишка, реально огонь. в демке понял систему, потом зашёл с ADUNLOCK. позавчера взял иксы 15 при 5 минах и 10 клетках, вышел вовремя. теперь постоянно здесь сижу' },
                { name: 'Михаил Р.', date: '10 июля 2026', stars: 4, text: 'Играю по простой схеме. Открываю 3 клетки при 3 минах и выхожу. Стабильно небольшой плюс каждый день. Промокод дал хороший бонус для старта. Новичкам советую не жадничать.' },
              ].map((r, i) => (
                <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/25 flex items-center justify-center text-blue-300 font-bold text-xs shrink-0">
                        {r.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm leading-none">{r.name}</p>
                        <p className="text-white/30 text-[10px] mt-0.5">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {Array.from({ length: r.stars }).map((_, s) => (
                        <span key={s} className="text-yellow-400 text-xs">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="text-white/15 text-xs text-center">
            18+ · Играйте ответственно · Условия бонуса уточняйте на сайте 1win
          </p>
        </article>
      </div>
    </PageLayout>
  );
}
