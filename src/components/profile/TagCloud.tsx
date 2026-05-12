import { motion } from 'framer-motion'
import type { MemoryStats } from '../../types'

export default function TagCloud({ tags }: { tags: MemoryStats['topTags'] }) {
  if (tags.length === 0) return null

  return (
    <motion.div
      className="bg-white rounded-xl p-5 shadow-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.3 }}
    >
      <h3 className="text-h3 text-text-primary mb-3">主题标签</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <motion.span
            key={tag.name}
            className="px-3 py-1.5 bg-[#F2F2F7] text-text-secondary text-caption rounded-full flex items-center gap-1.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.04 }}
          >
            {tag.name}
            <span className="text-text-tertiary text-small">{tag.count}</span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
