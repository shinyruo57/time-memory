import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function TodayMemoryBanner() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-accent/10 via-accent-warm/10 to-accent/10 mb-6 cursor-pointer"
      onClick={() => navigate('/today')}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={20} color="#FF6B6B" />
          </motion.div>
          <div>
            <p className="text-body font-medium text-text-primary">今日回忆</p>
            <p className="text-small text-text-secondary">看看去年的今天发生了什么</p>
          </div>
        </div>
        <ArrowRight size={18} color="#8E8E93" />
      </div>
    </motion.div>
  )
}
