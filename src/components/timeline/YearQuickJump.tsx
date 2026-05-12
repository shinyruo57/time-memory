import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, X } from 'lucide-react'

interface Props {
  years: number[]
  activeYear: number | null
  onSelectYear: (year: number | null) => void
}

export default function YearQuickJump({ years, activeYear, onSelectYear }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-card text-caption text-text-secondary"
        whileTap={{ scale: 0.95 }}
      >
        <Calendar size={14} />
        {activeYear ? `${activeYear}年` : '全部时间'}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-float p-2 z-30 min-w-[140px]"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-small text-text-tertiary">按年份筛选</span>
              <button onClick={() => setIsOpen(false)}>
                <X size={14} color="#8E8E93" />
              </button>
            </div>
            <button
              onClick={() => { onSelectYear(null); setIsOpen(false) }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-body ${
                activeYear === null ? 'bg-accent/10 text-accent' : 'text-text-primary'
              }`}
            >
              全部时间
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => { onSelectYear(year); setIsOpen(false) }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-body ${
                  activeYear === year ? 'bg-accent/10 text-accent' : 'text-text-primary'
                }`}
              >
                {year}年
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
