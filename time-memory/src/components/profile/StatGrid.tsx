import { motion } from 'framer-motion'
import type { MemoryStats } from '../../types'

export default function StatGrid({ stats }: { stats: MemoryStats }) {
  const items = [
    { label: '总回忆', value: stats.totalMemories, suffix: '条' },
    { label: '记录天数', value: stats.totalDays, suffix: '天' },
    { label: '跨越年份', value: stats.totalYears, suffix: '年' },
    { label: '活跃月份', value: stats.activeMonths, suffix: '月' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          className="bg-white rounded-xl p-4 shadow-card text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
        >
          <p className="text-[28px] font-bold text-text-primary">
            {item.value}
            <span className="text-caption text-text-secondary font-normal ml-0.5">
              {item.suffix}
            </span>
          </p>
          <p className="text-small text-text-tertiary mt-1">{item.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
