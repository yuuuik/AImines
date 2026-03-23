import { AIMessage, AIAgent } from '@/store/gameStore';

let id = 0;
const msg = (text: string, type: AIMessage['type']): AIMessage => ({
  id: id++, text, type, timestamp: Date.now(),
});

export const AI_AGENTS: Record<AIAgent, {
  name: string;
  fullName: string;
  color: string;
  gradient: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  ringColor: string;
}> = {
  chatgpt: {
    name: 'ChatGPT',
    fullName: 'GPT-4o',
    color: '#10a37f',
    gradient: 'from-[#10a37f] to-[#0d7a60]',
    borderColor: 'border-[#10a37f]/40',
    bgColor: 'bg-[#10a37f]/10',
    textColor: 'text-[#10a37f]',
    ringColor: 'ring-[#10a37f]/50',
  },
  deepseek: {
    name: 'DeepSeek',
    fullName: 'DeepSeek-V3',
    color: '#4d90fe',
    gradient: 'from-blue-500 to-blue-700',
    borderColor: 'border-blue-500/40',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    ringColor: 'ring-blue-500/50',
  },
  gemini: {
    name: 'Gemini',
    fullName: 'Gemini Pro',
    color: '#a78bfa',
    gradient: 'from-violet-500 to-purple-700',
    borderColor: 'border-violet-500/40',
    bgColor: 'bg-violet-500/10',
    textColor: 'text-violet-400',
    ringColor: 'ring-violet-500/50',
  },
  claude: {
    name: 'Claude',
    fullName: 'Claude 3.7',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
    ringColor: 'ring-amber-500/50',
  },
};

/** Called at round start — announces mine layout and safe hints */
export function getRoundStartMessages(mineCount: number, safeHintCount: number, agent: AIAgent = 'chatgpt'): AIMessage[] {
  const safeTotal = 25 - mineCount;
  const recMax = Math.floor(safeTotal * 0.6);

  switch (agent) {
    case 'chatgpt': return [
      msg(`📊 Анализ минного поля завершён. Данные обработаны.`, 'info'),
      msg(`💣 Обнаружил ${mineCount} мин на поле. Безопасных клеток: ${safeTotal}.`, 'warning'),
      msg(`✅ Подсвечиваю ${safeHintCount} безопасных клеток. Рекомендую открыть не более ${recMax} клеток.`, 'success'),
      msg(`📌 Оптимальная стратегия: открывайте подсвеченные зелёным клетки.`, 'info'),
    ];
    case 'deepseek': return [
      msg(`⚙️ Сканирование минного поля завершено.`, 'info'),
      msg(`💣 mines_count=${mineCount}. safe_cells=${safeTotal}. Статус: АКТИВНО.`, 'warning'),
      msg(`✅ Безопасные клетки подсвечены: ${safeHintCount}. Рекомендуемый лимит: ${recMax} клеток.`, 'success'),
      msg(`▶ Алгоритм: открывать только помеченные клетки, вывод до порога риска.`, 'info'),
    ];
    case 'gemini': return [
      msg(`✨ Анализ поля готов! Нашла все мины 😊`, 'info'),
      msg(`💣 ${mineCount} мин на поле! Но не бойся — у тебя ${safeTotal} безопасных клеток!`, 'warning'),
      msg(`✅ Показываю ${safeHintCount} безопасных зон. Открой до ${recMax} — и забирай! 🎯`, 'success'),
      msg(`💡 Следи за зелёными подсказками — это мои рекомендации! 🍀`, 'info'),
    ];
    case 'claude': return [
      msg(`🔍 Тщательно проанализировал минное поле.`, 'info'),
      msg(`💣 ${mineCount} мин расставлено. Безопасных клеток: ${safeTotal}.`, 'warning'),
      msg(`✅ Выделяю ${safeHintCount} надёжных позиций. Рекомендую ограничиться ${recMax} открытиями.`, 'success'),
      msg(`🤝 Следуйте зелёным подсказкам — я уверен в этих клетках.`, 'info'),
    ];
  }
}

/** Called during play at threshold (60% or 80% of safe cells revealed) */
export function getThresholdWarning(
  revealed: number,
  safeTotal: number,
  agent: AIAgent = 'chatgpt',
): AIMessage | null {
  const pct = revealed / safeTotal;
  const isUrgent = pct >= 0.8;

  if (isUrgent) {
    switch (agent) {
      case 'chatgpt': return msg(`⚠️ СТОП! Открыто ${revealed} из ${safeTotal} безопасных клеток. Риск максимальный — забирайте прямо сейчас!`, 'danger');
      case 'deepseek': return msg(`⚠️ КРИТИЧНО! revealed=${revealed}/${safeTotal}. Вероятность мины: ВЫСОКАЯ. Немедленный вывод!`, 'danger');
      case 'gemini': return msg(`🚨 СТОП! Уже ${revealed} клеток открыто! Пора забирать, не рискуй! 😱`, 'danger');
      case 'claude': return msg(`⚠️ Прошу остановиться. Открыто ${revealed} из ${safeTotal} — до предела совсем мало. Выводите прямо сейчас.`, 'danger');
    }
  } else {
    switch (agent) {
      case 'chatgpt': return msg(`Открыто ${revealed} из ${safeTotal} безопасных клеток. Риск существенно растёт — готовьтесь к выводу.`, 'warning');
      case 'deepseek': return msg(`Прогресс: ${revealed}/${safeTotal}. Коэффициент риска: ВЫСОКИЙ. Рекомендую подготовиться к выводу.`, 'warning');
      case 'gemini': return msg(`Осторожно! Уже ${revealed} клеток открыто из ${safeTotal} 🤔 Подумай о выводе!`, 'warning');
      case 'claude': return msg(`Стоит быть осторожнее — открыто ${revealed} из ${safeTotal}. Уже хороший множитель.`, 'warning');
    }
  }
  return null;
}

/** Called on cash out */
export function getCashOutMessage(mult: number, reward: number, agent: AIAgent = 'chatgpt'): AIMessage {
  const m = mult.toFixed(2);
  switch (agent) {
    case 'chatgpt': {
      const msgs = [
        `✅ Позиция закрыта на ×${m}. Профит: +${reward} ₽. Решение: оптимальное.`,
        `📈 Зафиксировано на ×${m}. +${reward} ₽. Прогноз выполнен точно.`,
        `💰 Выход на ×${m}. Доход: +${reward} ₽. Стратегия сработала.`,
      ];
      return msg(msgs[Math.floor(Math.random() * msgs.length)], 'success');
    }
    case 'deepseek': {
      const msgs = [
        `✔ Транзакция завершена: mult=×${m}, profit=+${reward}₽. Статус: УСПЕХ.`,
        `▶ Выход на ×${m}. Прибыль: +${reward}₽. Эффективность: высокая.`,
        `✅ Позиция закрыта: ×${m} | reward=+${reward}₽ | результат: ПОБЕДА`,
      ];
      return msg(msgs[Math.floor(Math.random() * msgs.length)], 'success');
    }
    case 'gemini': {
      const msgs = [
        `🎉 Отлично! Забрал на ×${m} — +${reward} ₽! Молодец!`,
        `✨ Умное решение! ×${m}, прибыль +${reward} ₽! Я бы тоже так сделал! 😄`,
        `🏆 Вовремя вышел! +${reward} ₽ на ×${m}. Так держать! 🎊`,
      ];
      return msg(msgs[Math.floor(Math.random() * msgs.length)], 'success');
    }
    case 'claude': {
      const msgs = [
        `💚 Хорошее решение. Выход на ×${m} принёс +${reward} ₽ — именно то, о чём я говорил.`,
        `✅ Разумный выбор. ×${m}, прибыль +${reward} ₽. Вы прислушались — это важно.`,
        `🎯 Своевременный выход. +${reward} ₽ на ×${m}. Именно так и стоит играть.`,
      ];
      return msg(msgs[Math.floor(Math.random() * msgs.length)], 'success');
    }
  }
}

/** Called when player hits a mine */
export function getMineHitMessage(mineCount: number, agent: AIAgent = 'chatgpt'): AIMessage[] {
  switch (agent) {
    case 'chatgpt': return [
      msg(`💥 Подтверждено: попадание на мину. При ${mineCount} минах вероятность была ненулевой.`, 'danger'),
      msg(`📊 Ставка списана. Жмите «Ставка» для нового раунда — снова покажу безопасные клетки.`, 'info'),
    ];
    case 'deepseek': return [
      msg(`💥 Критический отказ: mine_hit=TRUE. mines_count=${mineCount}. Потеря ставки.`, 'danger'),
      msg(`▶ Раунд завершён. Инициализирую новый анализ минного поля для следующего раунда.`, 'info'),
    ];
    case 'gemini': return [
      msg(`💥 Ой, наступил на мину 😔 При ${mineCount} минах это могло случиться...`, 'danger'),
      msg(`💪 Не расстраивайся! В следующем раунде снова покажу безопасные клетки — удача придёт! 🌟`, 'info'),
    ];
    case 'claude': return [
      msg(`💥 Попадание на мину. При ${mineCount} минах риск был реальным. Сожалею о потере.`, 'danger'),
      msg(`💭 Ставка проиграна, но это опыт. В следующем раунде постараемся быть аккуратнее вместе.`, 'info'),
    ];
  }
}

/** Called before next round to set expectations */
export function getPreRoundWarning(nextMineCount: number, agent: AIAgent = 'chatgpt'): AIMessage[] {
  if (nextMineCount <= 2) return [];
  switch (agent) {
    case 'chatgpt': return [
      msg(`🔔 Следующий раунд: ${nextMineCount} мин. Будьте осторожны — поле становится опаснее.`, 'warning'),
    ];
    case 'deepseek': return [
      msg(`🔔 Предварительный анализ: mines=${nextMineCount}. Уровень опасности: ПОВЫШЕННЫЙ.`, 'warning'),
    ];
    case 'gemini': return [
      msg(`🔔 Следующий раунд будет с ${nextMineCount} минами — чуть сложнее! Но я помогу 😊`, 'warning'),
    ];
    case 'claude': return [
      msg(`🔔 В следующем раунде ${nextMineCount} мин. Рекомендую быть особенно внимательным.`, 'warning'),
    ];
  }
}
