import { motion } from 'framer-motion'

export default function DateHero() {
  const today = new Date()
  const dateStr = `${today.getFullYear()} / ${today.getMonth() + 1} / ${today.getDate()}`
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const weekday = weekdays[today.getDay()]

  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.p
        className="text-small text-text-tertiary mb-2 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        今日回忆
      </motion.p>
      <motion.h1
        className="text-[40px] font-bold text-text-primary tracking-tight leading-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
      >
        {dateStr}
      </motion.h1>
      <motion.p
        className="text-caption text-text-secondary mt-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        星期{weekday}
      </motion.p>
    </motion.div>
  )
}
