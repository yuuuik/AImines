'use client';

import { TrendingUp } from 'lucide-react';

const NAMES = [
  'Игрок ***12', 'Игрок ***87', 'Игрок ***34', 'Игрок ***56', 'Игрок ***91',
  'Игрок ***23', 'Игрок ***65', 'Игрок ***48', 'Игрок ***77', 'Игрок ***03',
  'Игрок ***59', 'Игрок ***81', 'Игрок ***44', 'Игрок ***29', 'Игрок ***67',
];

const MINE_RESULTS = [
  { mult: 2.34, cells: 3 }, { mult: 5.88, cells: 7 }, { mult: 8.40, cells: 9 },
  { mult: 12.5, cells: 10 }, { mult: 3.12, cells: 5 }, { mult: 47.3, cells: 15 },
  { mult: 1.94, cells: 2 }, { mult: 21.6, cells: 12 }, { mult: 6.72, cells: 8 },
  { mult: 15.3, cells: 11 }, { mult: 4.05, cells: 6 }, { mult: 31.8, cells: 14 },
  { mult: 9.70, cells: 9 }, { mult: 18.2, cells: 11 }, { mult: 2.88, cells: 4 },
  { mult: 11.4, cells: 10 }, { mult: 3.77, cells: 6 }, { mult: 24.0, cells: 13 },
  { mult: 7.50, cells: 8 },  { mult: 4.44, cells: 7 },
];

const BETS = [50, 100, 200, 500, 1000, 2000, 5000];

function randomWin(seed: number) {
  const n = (seed * 1664525 + 1013904223) & 0x7fffffff;
  const name = NAMES[n % NAMES.length];
  const result = MINE_RESULTS[(n >> 4) % MINE_RESULTS.length];
  const bet = BETS[(n >> 8) % BETS.length];
  const win = Math.floor(bet * result.mult);
  return { name, mult: result.mult, cells: result.cells, win };
}

const ITEMS = Array.from({ length: 22 }, (_, i) => randomWin(i * 31337 + 12345));

export default function WinsTicker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="shrink-0 flex items-center overflow-hidden"
      style={{ height: 38, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-marquee {
          animation: ticker-scroll 45s linear infinite;
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
        }
      `}</style>

      {/* Label */}
      <div className="flex items-center gap-1 px-3 shrink-0 z-10">
        <TrendingUp size={11} className="text-green-400" />
        <span className="text-white/25 text-[10px] uppercase tracking-widest font-bold">Выигрыши</span>
      </div>

      {/* Scrolling strip */}
      <div className="flex-1 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0e0f18, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0e0f18, transparent)' }} />

        <div className="ticker-marquee">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              <div
                className="flex items-center gap-2 px-3 mx-2 rounded-lg"
                style={{
                  height: 24,
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.18)',
                }}
              >
                <span className="text-white/35 text-[11px]">{item.name}</span>
                <span className="text-white/15 text-[9px]">·</span>
                <span className="text-blue-400 text-[11px]">💎 {item.cells}</span>
                <span className="text-white/15 text-[9px]">·</span>
                <span className="text-green-400 text-[11px] font-bold">×{item.mult}</span>
                <span className="text-white/15 text-[9px]">·</span>
                <span className="text-green-300 text-[11px] font-semibold">+{item.win.toLocaleString('ru-RU')} ₽</span>
              </div>
              <span className="text-white/8 text-xs shrink-0 select-none">│</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
