'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import Modal from '@/components/Modal';
import RealMoneyModal from '@/components/RealMoneyModal';
import PromoToast from '@/components/PromoToast';
import { REAL_MONEY_URL } from '@/lib/constants';
import { Bot, X } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { AI_AGENTS } from '@/lib/aiLogic';

const GameCanvas = dynamic(() => import('@/components/GameCanvas'), { ssr: false });
const AIChat = dynamic(() => import('@/components/AIChat'), { ssr: false });
const WinsTicker = dynamic(() => import('@/components/WinsTicker'), { ssr: false });

export default function HomeClient() {
  const [showMobileAI, setShowMobileAI] = useState(false);
  const { balance, isRealMode, selectedAgent } = useGameStore();
  const agentCfg = AI_AGENTS[selectedAgent];

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden" style={{ background: '#0e0f18' }}>

      {/* Sidebar (desktop only) */}
      <div className="hidden md:flex w-[260px] shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">

        {/* Header */}
        <header
          className="shrink-0 flex items-center px-4 gap-3"
          style={{
            height: 56,
            background: 'rgba(255,255,255,0.02)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Mobile logo */}
          <div className="md:hidden flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mines.png" alt="Mines" width={28} height={28} style={{ borderRadius: 8, objectFit: 'cover' }} />
            <span className="font-black text-white text-sm tracking-tight">MINES</span>
          </div>

          {/* Mode badge */}
          {isRealMode ? (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full shrink-0" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400">REAL</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full shrink-0" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(74,222,128,0.9)' }}>ДЕМО</span>
            </div>
          )}

          <div className="flex-1" />

          {/* Balance */}
          {!isRealMode && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl shrink-0"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="text-white font-black text-sm tabular-nums">
                {balance.toLocaleString('ru-RU')}
              </span>
              <span className="text-xs font-bold" style={{ color: '#c9973a' }}>₽</span>
            </div>
          )}

          {/* Mobile AI button */}
          {!isRealMode && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMobileAI(true)}
              className="md:hidden relative flex items-center gap-1.5 px-3 rounded-xl shrink-0"
              style={{
                height: 34,
                background: agentCfg.color + '18',
                border: `1px solid ${agentCfg.color}40`,
                color: agentCfg.color,
              }}
            >
              <Bot size={14} />
              <span className="text-[11px] font-bold">AI</span>
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                style={{ background: agentCfg.color, boxShadow: `0 0 4px ${agentCfg.color}` }}
              />
            </motion.button>
          )}

          {/* 1WIN CTA */}
          <a href={REAL_MONEY_URL} target="_blank" rel="nofollow sponsored noopener noreferrer" className="shrink-0">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-3 rounded-xl font-black text-[11px] tracking-wider whitespace-nowrap"
              style={{
                height: 34,
                background: 'linear-gradient(135deg, #00e87a 0%, #00ba62 100%)',
                color: '#00200e',
                boxShadow: '0 2px 12px rgba(0,200,100,0.3)',
              }}
            >
              ИГРАТЬ НА 1WIN
            </motion.div>
          </a>
        </header>

        {/* Content */}
        <div className="flex-1 min-h-0 flex pb-[60px] md:pb-0">
          <>
            {/* Game canvas column */}
            <div className="flex-1 min-w-0 h-full flex flex-col">
              {!isRealMode && <WinsTicker />}
              <div className="flex-1 min-h-0">
                <GameCanvas />
              </div>
            </div>

            {/* AI Chat — desktop inline */}
            <div
              className="hidden md:flex w-[280px] shrink-0 h-full"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}
            >
              <AIChat />
            </div>
          </>
        </div>

        {/* Mobile bottom nav */}
        <div className="md:hidden shrink-0">
          <MobileNav />
        </div>
      </div>

      {/* Mobile AI overlay */}
      <AnimatePresence>
        {showMobileAI && !isRealMode && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowMobileAI(false)}
              className="md:hidden fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
              style={{
                height: '85dvh',
                background: '#141415',
                border: '1px solid rgba(255,255,255,0.08)',
                borderBottom: 'none',
                boxShadow: '0 -20px 60px rgba(0,0,0,0.6)',
              }}
            >
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileAI(false)}
                className="absolute top-3 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <X size={14} className="text-white/50" />
              </motion.button>
              <div className="h-full overflow-hidden">
                <AIChat />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Modal />
      {!isRealMode && <RealMoneyModal />}
      {!isRealMode && <PromoToast />}
    </div>
  );
}
