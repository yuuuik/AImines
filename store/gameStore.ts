import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GamePhase = 'idle' | 'playing' | 'cashed_out' | 'hit_mine';
export type AIAgent = 'chatgpt' | 'deepseek' | 'gemini' | 'claude';

export interface AIMessage {
  id: number;
  text: string;
  type: 'info' | 'warning' | 'danger' | 'success';
  timestamp: number;
}

export interface GridCell {
  hasMine: boolean;
  revealed: boolean;
  isSafeHint: boolean;
}

export type MineCount = 1 | 2 | 3 | 5 | 10;

/**
 * Multiplier formula: mult(k, m) = 0.97 * C(25,k) / C(25-m, k)
 * = 0.97 * product_{i=0}^{k-1} (25-i) / (25-m-i)
 */
export function calcMult(revealed: number, mineCount: number): number {
  if (revealed === 0) return 1.0;
  const safeTotal = 25 - mineCount;
  let mult = 0.97;
  for (let i = 0; i < revealed; i++) {
    mult *= (25 - i) / (safeTotal - i);
  }
  return Math.round(mult * 100) / 100;
}

let msgId = 0;

interface RoundRecord {
  mult: number;
  safe: number;
  mines: number;
}

interface GameState {
  balance: number;
  bet: number;
  attempts: number;
  maxAttempts: number;

  phase: GamePhase;
  mineCount: MineCount;
  grid: GridCell[];
  minePositions: number[];
  revealedCount: number;
  currentMult: number;

  roundHistory: RoundRecord[];
  roundsCompleted: number;
  roundId: number;

  aiMessages: AIMessage[];
  isTyping: boolean;
  showLimitModal: boolean;
  limitModalError: string;
  promoResult: { success: boolean; message: string } | null;
  showRealMoneyModal: boolean;
  selectedAgent: AIAgent;

  isRealMode: boolean;
  realUserId: string;

  // Actions
  setMineCount: (n: MineCount) => void;
  setBet: (v: number) => void;
  setSelectedAgent: (agent: AIAgent) => void;
  applyPromoCode: (code: string) => void;
  clearPromoResult: () => void;
  setShowRealMoneyModal: (v: boolean) => void;
  startGame: () => void;
  revealCell: (index: number) => void;
  cashOut: () => void;
  resetDemo: () => void;
  addAIMessage: (text: string, type: AIMessage['type']) => void;
  setTyping: (v: boolean) => void;
  setShowLimitModal: (v: boolean) => void;
  setLimitModalError: (v: string) => void;
  tryUnlockWithId: (id: string) => void;
  activateRealMode: (userId: string) => void;
}

function buildGrid(mineCount: number): { grid: GridCell[]; minePositions: number[] } {
  // Place mines randomly
  const positions = new Set<number>();
  while (positions.size < mineCount) {
    positions.add(Math.floor(Math.random() * 25));
  }
  const minePositions = Array.from(positions);

  // Build cells
  const grid: GridCell[] = Array.from({ length: 25 }, (_, i) => ({
    hasMine: positions.has(i),
    revealed: false,
    isSafeHint: false,
  }));

  // Mark ~50% of safe cells as hints
  const safeCells = grid.map((c, i) => (!c.hasMine ? i : -1)).filter(i => i >= 0);
  const hintCount = Math.max(1, Math.floor(safeCells.length * 0.5));
  // Shuffle and pick
  const shuffled = [...safeCells].sort(() => Math.random() - 0.5);
  for (let i = 0; i < hintCount; i++) {
    grid[shuffled[i]].isSafeHint = true;
  }

  return { grid, minePositions };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      balance: 10000,
      bet: 100,
      attempts: 10,
      maxAttempts: 10,
      phase: 'idle' as GamePhase,
      mineCount: 3 as MineCount,
      grid: Array.from({ length: 25 }, () => ({ hasMine: false, revealed: false, isSafeHint: false })),
      minePositions: [],
      revealedCount: 0,
      currentMult: 1.0,
      roundHistory: [],
      roundsCompleted: 0,
      roundId: 0,
      aiMessages: [],
      isTyping: false,
      showLimitModal: false,
      limitModalError: '',
      promoResult: null,
      showRealMoneyModal: false,
      selectedAgent: 'chatgpt' as AIAgent,
      isRealMode: false,
      realUserId: '',

      setMineCount: (n) => {
        if (get().phase !== 'idle' && !get().isRealMode) return;
        set({ mineCount: n });
      },

      setBet: v => set({ bet: Math.max(1, Math.min(100000, v)) }),

      setSelectedAgent: agent => set({ selectedAgent: agent, aiMessages: [], isTyping: false }),

      applyPromoCode: (code) => {
        const upper = code.trim().toUpperCase();
        const promos: Record<string, { balance?: number; attempts?: number; label: string }> = {
          'MARCHMINES': { balance: 5000, label: '+5000 ₽ бонус' },
        };
        const promo = promos[upper];
        if (!promo) {
          set({ promoResult: { success: false, message: 'Промокод не найден или уже использован.' } });
          return;
        }
        set(s => ({
          balance: promo.balance ? s.balance + promo.balance : s.balance,
          attempts: promo.attempts ?? s.attempts,
          promoResult: { success: true, message: `Промокод применён! ${promo.label} начислено на счёт.` },
        }));
      },

      clearPromoResult: () => set({ promoResult: null }),
      setShowRealMoneyModal: v => set({ showRealMoneyModal: v }),

      startGame: () => {
        const { balance, bet, attempts, mineCount, isRealMode } = get();
        if (!isRealMode && (attempts <= 0 || balance < bet)) { set({ showRealMoneyModal: true }); return; }
        msgId = 0;
        const { grid, minePositions } = buildGrid(mineCount);
        const safeHintCount = grid.filter(c => c.isSafeHint).length;
        // In real mode: reveal all mines, mark all safe cells as hints
        const finalGrid = isRealMode
          ? grid.map(c => ({ ...c, revealed: c.hasMine, isSafeHint: !c.hasMine }))
          : grid;
        set(s => ({
          phase: 'playing',
          grid: finalGrid,
          minePositions,
          revealedCount: 0,
          currentMult: 1.0,
          balance: isRealMode ? balance : balance - bet,
          attempts: isRealMode ? attempts : attempts - 1,
          aiMessages: [],
          isTyping: false,
          roundId: s.roundId + 1,
        }));
        return;
        // safeHintCount used by callers who read grid
        void safeHintCount;
      },

      revealCell: (index: number) => {
        const { phase, grid, revealedCount, mineCount, bet, balance, isRealMode, roundHistory, roundsCompleted } = get();
        if (phase !== 'playing') return;
        if (grid[index].revealed) return;

        const cell = grid[index];
        const newGrid = grid.map((c, i) => i === index ? { ...c, revealed: true } : c);

        if (cell.hasMine) {
          // Reveal all mines
          const finalGrid = newGrid.map(c => c.hasMine ? { ...c, revealed: true } : c);
          const newCount = roundsCompleted + 1;
          set({
            phase: 'hit_mine',
            grid: finalGrid,
            roundsCompleted: newCount,
            showRealMoneyModal: !isRealMode && newCount % 5 === 0,
            roundHistory: [{ mult: 0, safe: revealedCount, mines: mineCount }, ...roundHistory].slice(0, 20),
          });
        } else {
          const newRevealed = revealedCount + 1;
          const newMult = calcMult(newRevealed, mineCount);
          // Check if all safe cells revealed
          const safeCells = 25 - mineCount;
          if (newRevealed >= safeCells) {
            // Auto cash out — all safe cells revealed
            const reward = Math.floor(bet * newMult);
            const newCount = roundsCompleted + 1;
            set({
              phase: 'cashed_out',
              grid: newGrid,
              revealedCount: newRevealed,
              currentMult: newMult,
              balance: isRealMode ? balance : balance + reward,
              roundsCompleted: newCount,
              showRealMoneyModal: !isRealMode && newCount % 5 === 0,
              roundHistory: [{ mult: newMult, safe: newRevealed, mines: mineCount }, ...roundHistory].slice(0, 20),
            });
          } else {
            set({ grid: newGrid, revealedCount: newRevealed, currentMult: newMult });
          }
        }
      },

      cashOut: () => {
        const { phase, currentMult, revealedCount, bet, balance, isRealMode, mineCount, roundHistory, roundsCompleted } = get();
        if (phase !== 'playing' || revealedCount === 0) return;
        const reward = Math.floor(bet * currentMult);
        const newCount = roundsCompleted + 1;
        set({
          phase: 'cashed_out',
          balance: isRealMode ? balance : balance + reward,
          roundsCompleted: newCount,
          showRealMoneyModal: !isRealMode && newCount % 5 === 0,
          roundHistory: [{ mult: currentMult, safe: revealedCount, mines: mineCount }, ...roundHistory].slice(0, 20),
        });
      },

      resetDemo: () => set({
        balance: 10000, attempts: 10, phase: 'idle',
        grid: Array.from({ length: 25 }, () => ({ hasMine: false, revealed: false, isSafeHint: false })),
        minePositions: [],
        revealedCount: 0,
        currentMult: 1.0,
        aiMessages: [], showLimitModal: false, limitModalError: '',
        showRealMoneyModal: false,
        isRealMode: false, realUserId: '',
      }),

      addAIMessage: (text, type) => {
        const m: AIMessage = { id: msgId++, text, type, timestamp: Date.now() };
        set(s => ({ aiMessages: [...s.aiMessages.slice(-40), m] }));
      },

      setTyping: v => set({ isTyping: v }),
      setShowLimitModal: v => set({ showLimitModal: v }),
      setLimitModalError: v => set({ limitModalError: v }),

      tryUnlockWithId: id => {
        if (id.trim() === 'demo123') {
          set({ attempts: 10, showLimitModal: false, limitModalError: '' });
        } else {
          set({ limitModalError: 'Неверный ID' });
        }
      },

      activateRealMode: (userId: string) => {
        msgId = 0;
        set({
          isRealMode: true,
          realUserId: userId,
          showLimitModal: false,
          limitModalError: '',
          phase: 'idle',
          grid: Array.from({ length: 25 }, () => ({ hasMine: false, revealed: false, isSafeHint: false })),
          minePositions: [],
          revealedCount: 0,
          currentMult: 1.0,
          aiMessages: [],
          isTyping: false,
          attempts: 999,
          maxAttempts: 999,
        });
      },
    }),
    {
      name: 'mines-v1',
      partialize: s => ({
        balance: s.balance,
        attempts: s.attempts,
        isRealMode: s.isRealMode,
        realUserId: s.realUserId,
      }),
    }
  )
);
