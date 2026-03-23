'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore, calcMult, type MineCount } from '@/store/gameStore';
import {
  getRoundStartMessages, getThresholdWarning,
  getCashOutMessage, getMineHitMessage, getPreRoundWarning,
} from '@/lib/aiLogic';
import { useState } from 'react';

const MINE_COUNTS: MineCount[] = [1, 2, 3, 5, 10];

export default function GameCanvas() {
  const {
    phase, grid, mineCount, revealedCount, currentMult,
    balance, bet, attempts, isRealMode, roundId,
    startGame, revealCell, cashOut, setMineCount,
    setShowLimitModal, selectedAgent,
    addAIMessage, setTyping,
  } = useGameStore();

  const [warned60, setWarned60] = useState(false);
  const [warned80, setWarned80] = useState(false);

  const dispatchAI = useCallback((text: string, type: import('@/store/gameStore').AIMessage['type']) => {
    setTyping(true);
    setTimeout(() => { addAIMessage(text, type); setTyping(false); }, 400 + Math.random() * 400);
  }, [addAIMessage, setTyping]);

  // Round start → AI messages (fires every new round, even in REAL mode)
  useEffect(() => {
    if (roundId === 0) return;
    setWarned60(false);
    setWarned80(false);
    const safeHintCount = grid.filter(c => c.isSafeHint).length;
    const msgs = getRoundStartMessages(mineCount, safeHintCount, selectedAgent);
    msgs.forEach((m, i) => {
      setTimeout(() => dispatchAI(m.text, m.type), i * 800);
    });
  }, [roundId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Phase change → AI messages for end-of-round states
  useEffect(() => {
    if (phase === 'hit_mine') {
      const msgs = getMineHitMessage(mineCount, selectedAgent);
      msgs.forEach((m, i) => setTimeout(() => dispatchAI(m.text, m.type), i * 700));
      const warns = getPreRoundWarning(mineCount, selectedAgent);
      warns.forEach((m, i) => setTimeout(() => dispatchAI(m.text, m.type), 1600 + i * 800));
    }

    if (phase === 'cashed_out') {
      const reward = Math.floor(bet * currentMult);
      const co = getCashOutMessage(currentMult, reward, selectedAgent);
      setTimeout(() => dispatchAI(co.text, co.type), 300);
      const warns = getPreRoundWarning(mineCount, selectedAgent);
      warns.forEach((m, i) => setTimeout(() => dispatchAI(m.text, m.type), 1000 + i * 800));
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Threshold warnings when cells are revealed
  useEffect(() => {
    if (phase !== 'playing' || revealedCount === 0) return;
    const safeTotal = 25 - mineCount;
    const pct = revealedCount / safeTotal;

    if (pct >= 0.8 && !warned80) {
      setWarned80(true);
      const w = getThresholdWarning(revealedCount, safeTotal, selectedAgent);
      if (w) setTimeout(() => dispatchAI(w.text, w.type), 0);
    } else if (pct >= 0.6 && !warned60) {
      setWarned60(true);
      const w = getThresholdWarning(revealedCount, safeTotal, selectedAgent);
      if (w) setTimeout(() => dispatchAI(w.text, w.type), 0);
    }
  }, [revealedCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const canPlay = isRealMode ? true : (balance >= bet && attempts > 0);
  const reward = phase === 'playing' && revealedCount > 0 ? Math.floor(bet * currentMult) : 0;

  const handleStart = () => {
    if (!isRealMode) {
      if (attempts <= 0) { setShowLimitModal(true); return; }
      if (balance < bet) return;
    }
    startGame();
  };

  const handleCellClick = (index: number) => {
    if (phase !== 'playing' || isRealMode) return;
    revealCell(index);
  };

  const multColor =
    phase === 'hit_mine' ? '#ef4444' :
    currentMult >= 5 ? '#22c55e' :
    currentMult >= 2 ? '#eab308' : '#ffffff';

  return (
    <div className="flex flex-col w-full h-full">

      {/* Main game area */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-3 gap-4 overflow-hidden">

        {/* Multiplier display */}
        <AnimatePresence mode="wait">
          {phase === 'playing' || phase === 'cashed_out' || phase === 'hit_mine' ? (
            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="text-center shrink-0"
            >
              {phase === 'hit_mine' ? (
                <div>
                  <p className="font-black tabular-nums" style={{ fontSize: 'clamp(32px,7vw,64px)', color: '#ef4444', textShadow: '0 0 30px rgba(239,68,68,0.5)' }}>
                    💣 МИ­НА!
                  </p>
                  <p className="text-red-400 font-bold text-sm mt-1">Ставка потеряна</p>
                </div>
              ) : phase === 'cashed_out' ? (
                <div>
                  <p className="font-black tabular-nums" style={{ fontSize: 'clamp(32px,7vw,64px)', color: '#22c55e', textShadow: '0 0 30px rgba(34,197,94,0.5)' }}>
                    ×{currentMult.toFixed(2)}
                  </p>
                  <p className="text-green-400 font-bold text-sm mt-1">+{Math.floor(bet * currentMult)} ₽</p>
                </div>
              ) : (
                <div>
                  <motion.p
                    className="font-black tabular-nums"
                    style={{ fontSize: 'clamp(32px,7vw,64px)', color: multColor, textShadow: `0 0 30px ${multColor}66` }}
                  >
                    ×{revealedCount > 0 ? currentMult.toFixed(2) : '1.00'}
                  </motion.p>
                  <p className="text-white/40 text-xs mt-1">
                    Открыто: {revealedCount} / {25 - mineCount} · {mineCount} мин
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center shrink-0"
            >
              <p className="text-5xl mb-2">💎</p>
              <p className="text-white font-black text-xl tracking-tight">Mines</p>
              <p className="text-white/40 text-sm mt-1">Найди алмазы, избегай мин</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5×5 Grid */}
        <div
          className="shrink-0"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '6px',
            width: 'min(340px, 90vw)',
          }}
        >
          {grid.map((cell, index) => {
            const isRevealed = cell.revealed;
            const isSafeHint = !isRevealed && cell.isSafeHint && phase === 'playing';
            const canClick = phase === 'playing' && !isRevealed && !isRealMode;

            let bg = 'rgba(255,255,255,0.05)';
            let border = '1px solid rgba(255,255,255,0.08)';
            let shadow = 'none';
            let cursor = 'default';

            if (isRevealed) {
              if (cell.hasMine) {
                bg = 'rgba(239,68,68,0.15)';
                border = '1px solid rgba(239,68,68,0.4)';
              } else {
                bg = 'rgba(34,197,94,0.15)';
                border = '1px solid rgba(34,197,94,0.4)';
              }
            } else if (isSafeHint) {
              bg = 'rgba(34,197,94,0.08)';
              border = '1px solid rgba(34,197,94,0.35)';
              shadow = '0 0 8px rgba(34,197,94,0.25)';
            } else if (canClick) {
              cursor = 'pointer';
              bg = 'rgba(255,255,255,0.06)';
              border = '1px solid rgba(255,255,255,0.12)';
            }

            return (
              <motion.button
                key={index}
                whileHover={canClick ? { scale: 1.06, background: 'rgba(255,255,255,0.1)' } : {}}
                whileTap={canClick ? { scale: 0.94 } : {}}
                onClick={() => handleCellClick(index)}
                style={{
                  aspectRatio: '1',
                  borderRadius: 10,
                  background: bg,
                  border,
                  boxShadow: shadow,
                  cursor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(16px, 4vw, 24px)',
                  transition: 'background 0.15s, border 0.15s',
                }}
              >
                <AnimatePresence>
                  {isRevealed ? (
                    <motion.span
                      key="revealed"
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {cell.hasMine ? '💣' : '💎'}
                    </motion.span>
                  ) : isSafeHint ? (
                    <motion.span
                      key="hint"
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      style={{ fontSize: '0.6em', color: 'rgba(34,197,94,0.6)' }}
                    >
                      ✓
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Mine count selector (idle/result state only) */}
        <AnimatePresence>
          {(phase === 'idle' || phase === 'cashed_out' || phase === 'hit_mine') && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
              className="shrink-0 flex flex-col items-center gap-2"
            >
              <p className="text-white/30 text-[10px] uppercase tracking-widest">Количество мин</p>
              <div className="flex gap-2">
                {MINE_COUNTS.map(n => (
                  <button
                    key={n}
                    onClick={() => setMineCount(n)}
                    className="px-3 py-1.5 rounded-lg font-bold text-sm transition-all"
                    style={mineCount === n
                      ? { background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)', color: '#f87171' }
                      : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)' }
                    }
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-white/20 text-xs">
                Множитель при 5 клетках: ×{calcMult(5, mineCount).toFixed(2)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bet controls */}
      <div
        className="shrink-0 px-4 py-3 flex items-center gap-3"
        style={{ background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {isRealMode ? (
          /* REAL mode: mine count + round button */
          <>
            <div className="flex flex-col gap-1.5 shrink-0">
              <p className="text-white/25 text-[9px] uppercase tracking-widest text-center">Мины</p>
              <div className="flex gap-1">
                {MINE_COUNTS.map(n => (
                  <button
                    key={n}
                    onClick={() => setMineCount(n)}
                    className="w-8 h-8 rounded-lg font-bold text-xs transition-all"
                    style={mineCount === n
                      ? { background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)', color: '#f87171' }
                      : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }
                    }
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleStart}
              className="flex-1 py-3.5 rounded-xl font-black text-base uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
              }}
            >
              {phase === 'idle' ? 'Запустить раунд' : 'Следующий раунд'}
            </motion.button>
          </>
        ) : phase === 'playing' ? (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={cashOut}
            disabled={revealedCount === 0}
            className="flex-1 py-3.5 rounded-xl font-black text-base uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={revealedCount > 0 ? {
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              color: '#052e16',
              boxShadow: '0 4px 20px rgba(34,197,94,0.35)',
            } : {
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            {revealedCount > 0 ? `Вывести +${reward} ₽` : 'Откройте клетку'}
          </motion.button>
        ) : (
          <>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <BetControls />
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleStart}
              disabled={!canPlay}
              className="flex-1 py-3.5 rounded-xl font-black text-base uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={canPlay ? {
                background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(239,68,68,0.35)',
              } : {
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              {balance < bet ? 'Недостаточно' : attempts <= 0 ? 'Лимит исчерпан' : 'Ставка'}
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}

function BetControls() {
  const { bet, setBet, phase, attempts, maxAttempts } = useGameStore();
  const [val, setVal] = useState(String(bet));
  const [focused, setFocused] = useState(false);
  const isPlaying = phase === 'playing';
  const step = bet < 100 ? 10 : bet < 1000 ? 50 : 100;

  const commit = (raw: string) => {
    const v = parseInt(raw.replace(/\D/g, ''), 10);
    const c = isNaN(v) || v < 1 ? 1 : v;
    setBet(c); setVal(String(c));
  };
  const adjust = (d: number) => {
    if (isPlaying) return;
    const next = Math.max(1, Math.min(100000, bet + d));
    setBet(next); setVal(String(next));
  };

  return (
    <>
      <button
        onClick={() => adjust(-step)} disabled={isPlaying}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-white/60 disabled:opacity-30 hover:bg-white/10 transition-colors text-lg font-bold"
      >−</button>
      <div className="flex items-baseline gap-0.5">
        <input
          type="text" inputMode="numeric"
          value={focused ? val : bet.toLocaleString('ru-RU')}
          disabled={isPlaying}
          onChange={e => setVal(e.target.value.replace(/\D/g, ''))}
          onFocus={() => { setFocused(true); setVal(String(bet)); }}
          onBlur={e => { setFocused(false); commit(e.target.value); }}
          onKeyDown={e => e.key === 'Enter' && commit(val)}
          className="text-base font-black tabular-nums bg-transparent outline-none text-center disabled:opacity-40"
          style={{ color: '#fff', width: 72 }}
        />
        <span className="text-xs font-bold" style={{ color: '#c9973a' }}>₽</span>
      </div>
      <button
        onClick={() => adjust(step)} disabled={isPlaying}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-white/60 disabled:opacity-30 hover:bg-white/10 transition-colors text-lg font-bold"
      >+</button>
      <div className="h-4 w-px mx-1 bg-white/10" />
      <span className="text-xs text-white/40 tabular-nums">{attempts}/{maxAttempts}</span>
    </>
  );
}
