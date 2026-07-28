import type { Metadata } from 'next';
import { Check, X, TrendingUp, BookOpen, Shield, Zap, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { REAL_MONEY_URL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Стратегии Mines — как выигрывать в Mines онлайн',
  description:
    'Лучшие стратегии для игры Mines на 1win. Консервативная (×1.1–×1.3), умеренная (×1.5–×2.5) и агрессивная (×50+) тактики. Как читать AI подсказки и управлять банкроллом.',
  keywords: [
    'mines стратегии',
    'как выиграть mines',
    'стратегия mines 1win',
    'мины игра тактика',
    'mines AI подсказки стратегия',
    'управление банкроллом mines',
  ],
  alternates: {
    canonical: `${SITE_URL}/strategies`,
  },
  openGraph: {
    title: 'Стратегии Mines — как выигрывать в Mines онлайн',
    description:
      'Консервативная, умеренная и агрессивная стратегии Mines. Сигналы AI Аналитика и управление банкроллом.',
    url: `${SITE_URL}/strategies`,
    type: 'article',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Стратегии игры Mines' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Стратегии Mines — как выигрывать онлайн',
    description: 'Три проверенных стратегии Mines с AI подсказками. Когда выводить и как читать сигналы.',
    images: ['/opengraph-image'],
  },
};

const strategies = [
  {
    level: 'Консервативная',
    range: '1–3 клетки',
    mult: '×1.1 — ×1.3',
    borderColor: 'border-emerald-500/25',
    bgColor: 'from-emerald-950/60 to-emerald-950/20',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    multColor: 'text-emerald-400',
    pros: [
      'Стабильный плюс при любом раскладе',
      'Минимальный риск попасть на мину',
      'Идеально для новичков',
      'Работает при любом количестве мин',
    ],
    cons: ['Медленный рост баланса', 'Небольшая прибыль за раунд'],
    when: 'При 3–5 минах открывай 2–3 подсвеченные клетки и сразу выводи.',
  },
  {
    level: 'Умеренная',
    range: '5–8 клеток',
    mult: '×1.5 — ×2.5',
    borderColor: 'border-yellow-500/25',
    bgColor: 'from-yellow-950/60 to-yellow-950/20',
    badgeColor: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
    multColor: 'text-yellow-400',
    pros: [
      'Удвоение ставки за один раунд',
      'Оптимальное соотношение риск/доход',
      'AI предупреждает при приближении к пределу',
    ],
    cons: [
      'Невыгодна при большом числе мин',
      'Нужно следить за предупреждениями AI',
    ],
    when: 'При 1–3 минах открывай 5–8 клеток следуя зелёным подсказкам.',
  },
  {
    level: 'Агрессивная',
    range: '10+ клеток',
    mult: '×3.0 — ×50+',
    borderColor: 'border-red-500/25',
    bgColor: 'from-red-950/60 to-red-950/20',
    badgeColor: 'bg-red-500/15 text-red-300 border-red-500/25',
    multColor: 'text-red-400',
    pros: [
      'Потенциал ×50 и выше от ставки',
      'Одна победа перекрывает несколько поражений',
    ],
    cons: [
      'Высокий риск попасть на мину',
      'Только при 1–2 минах',
      'Только для опытных игроков',
    ],
    when: 'При 1–2 минах. Выводи при первом предупреждении AI (жёлтый сигнал).',
  },
];

const aiSignals = [
  { color: 'bg-emerald-400', label: 'Зелёная подсветка', text: 'Клетка помечена AI как безопасная. Открывай в первую очередь.' },
  { color: 'bg-yellow-400',  label: 'Жёлтый сигнал',    text: 'Открыто 60% безопасных клеток. Готовьтесь к выходу.' },
  { color: 'bg-red-400',     label: 'Красный сигнал',   text: 'Открыто 80%+ — СТОП! Немедленно выводите.' },
  { color: 'bg-white/20',    label: 'Мина',              text: 'Попадание на мину. Ставка потеряна. AI проанализирует следующий раунд.' },
];

const bankrollTips = [
  { Icon: Shield,     title: 'Правило 10%',            text: 'Не ставьте более 10% баланса за один раунд. При 5 000 ₽ — ставка не более 500 ₽.' },
  { Icon: TrendingUp, title: 'Фиксируйте прибыль',     text: 'Заработали ×2 от стартового баланса? Снизьте ставку и зафиксируйте результат.' },
  { Icon: Zap,        title: 'Без погони за потерями',  text: 'Три проигрыша подряд — снизьте ставку вдвое. Серия проигрышей не гарантирует победу.' },
  { Icon: BookOpen,   title: 'Используйте промокоды',   text: 'Промокод ADUNLOCK на 1win даёт бонус до 500% — больше баланса, больше возможностей.' },
];

const quickTips = [
  '💎 Всегда открывай подсвеченные зелёным клетки в первую очередь',
  '⚡ Жёлтый сигнал = готовься. Красный сигнал = выводи прямо сейчас',
  '🎯 При 1 мине можно открывать до 15 клеток за раунд',
  '💡 История раундов вверху помогает видеть свой прогресс',
  '🔄 Выбирай меньше мин для стабильного дохода с множителем',
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Стратегии Mines — как выигрывать в Mines онлайн на 1win',
  description:
    'Консервативная, умеренная и агрессивная стратегии для игры Mines. Как использовать AI подсказки и управлять банкроллом.',
  url: `${SITE_URL}/strategies`,
  inLanguage: 'ru-RU',
  dateModified: new Date().toISOString().split('T')[0],
  author: { '@type': 'Organization', name: 'Mines 1win', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Mines 1win', url: SITE_URL },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/strategies` },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Стратегии', item: `${SITE_URL}/strategies` },
  ],
};

export default function StrategiesPage() {
  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-full" style={{ background: '#141415' }}>
        <article className="max-w-2xl mx-auto px-6 py-10 text-white">

          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Гайд по игре
            </div>
            <h1 className="text-3xl font-black leading-tight mb-3">
              Стратегии Mines:<br />
              <span className="bg-gradient-to-r from-blue-300 to-green-400 bg-clip-text text-transparent">
                когда выводить и как читать AI
              </span>
            </h1>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg">
              В Mines AI Аналитик знает расположение всех мин и подсвечивает безопасные клетки.
              Ваша задача — открыть нужное количество клеток и вовремя забрать выигрыш.
            </p>
          </header>

          {/* How it works */}
          <section className="mb-10 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-5">
            <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Как работает раунд</h2>
            <div className="flex flex-col gap-3">
              {[
                { n: '1', text: 'Выберите количество мин (1, 2, 3, 5 или 10) и поставьте ставку' },
                { n: '2', text: 'AI анализирует поле и подсвечивает зелёным ~50% безопасных клеток' },
                { n: '3', text: 'Открывайте клетки: 💎 алмаз = безопасно, 💣 мина = потеря ставки' },
                { n: '4', text: 'После ≥1 открытой клетки нажмите «Вывести» — получите ставку × множитель' },
              ].map(({ n, text }) => (
                <div key={n} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-black text-blue-400">{n}</span>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Strategies */}
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-green-400 inline-block" />
              Три проверенных стратегии
            </h2>
            <div className="flex flex-col gap-4">
              {strategies.map(s => (
                <div key={s.level} className={`rounded-2xl border ${s.borderColor} overflow-hidden`}>
                  <div className={`bg-gradient-to-br ${s.bgColor} px-5 py-5`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${s.badgeColor} mb-1 inline-block`}>{s.level}</span>
                        <h3 className={`font-black text-xl ${s.multColor}`}>{s.mult}</h3>
                        <p className="text-white/40 text-xs">{s.range}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs mb-3">
                      <div className="flex-1">
                        <p className="text-white/40 mb-1.5 font-medium uppercase text-[10px] tracking-wide">Плюсы</p>
                        {s.pros.map(p => (
                          <div key={p} className="flex items-start gap-1.5 mb-1">
                            <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={9} className="text-green-400" strokeWidth={3} />
                            </div>
                            <p className="text-white/65 leading-relaxed">{p}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1">
                        <p className="text-white/40 mb-1.5 font-medium uppercase text-[10px] tracking-wide">Минусы</p>
                        {s.cons.map(c => (
                          <div key={c} className="flex items-start gap-1.5 mb-1">
                            <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                              <X size={9} className="text-red-400" strokeWidth={3} />
                            </div>
                            <p className="text-white/40 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl bg-black/20 border border-white/5 px-3 py-2 text-xs flex items-start gap-2">
                      <ChevronRight size={12} className="text-white/30 shrink-0 mt-0.5" />
                      <span className="text-white/55">{s.when}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI signals */}
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-green-400 inline-block" />
              Сигналы AI Аналитика
            </h2>
            <div className="flex flex-col gap-2.5">
              {aiSignals.map(s => (
                <div key={s.label} className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.025] px-4 py-3">
                  <div className={`w-3 h-3 rounded-full ${s.color} shrink-0 mt-1`} />
                  <div>
                    <span className="text-white font-semibold text-sm">{s.label} — </span>
                    <span className="text-white/55 text-sm">{s.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick tips */}
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-green-400 inline-block" />
              Быстрые советы
            </h2>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] divide-y divide-white/5">
              {quickTips.map(tip => (
                <p key={tip} className="px-4 py-3 text-sm text-white/60 leading-relaxed">{tip}</p>
              ))}
            </div>
          </section>

          {/* Bankroll */}
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-green-400 inline-block" />
              Управление банкроллом
            </h2>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] divide-y divide-white/5">
              {bankrollTips.map(({ Icon, title, text }) => (
                <div key={title} className="flex gap-3 px-4 py-3.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-blue-400" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{title}</p>
                    <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-green-900/20">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #141f14 0%, #141415 100%)' }} />
            <div className="absolute inset-0 border border-green-500/20 rounded-3xl" />
            <div className="relative px-6 py-7 flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                <TrendingUp size={22} className="text-green-400" strokeWidth={2} />
              </div>
              <div>
                <p className="text-white font-black text-lg">Готовы к реальной игре?</p>
                <p className="text-white/40 text-sm mt-1">Применяйте стратегии с бонусом 1win</p>
              </div>
              <a href={REAL_MONEY_URL} target="_blank" rel="nofollow sponsored noopener noreferrer" className="w-full">
                <div className="w-full py-3.5 rounded-2xl font-bold text-sm text-white text-center cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #15803d 0%, #16a34a 60%, #4ade80 100%)' }}>
                  Играть на реальные деньги · Промокод ADUNLOCK
                </div>
              </a>
            </div>
          </div>

          <p className="text-white/15 text-xs text-center mt-8">18+ · Демо-режим · Стратегии не гарантируют выигрыш</p>
        </article>
      </div>
    </PageLayout>
  );
}
