import { motion } from 'framer-motion'
import { MapPin, Cloud, Heart } from 'lucide-react'
import type { Memory } from '../../types'

export default function MemoryCardLarge({ memory }: { memory: Memory }) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img src={memory.coverUrl} alt={memory.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {memory.isFavorite && (
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <Heart size={15} className="fill-accent text-accent" />
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-[22px] font-semibold text-white mb-1">{memory.title}</h2>
          <p className="text-[13px] text-white/80">{memory.date} · {memory.time}</p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <p className="text-body text-text-secondary leading-relaxed">
          {memory.emotionText}
        </p>

        <div className="flex items-center gap-4 text-small text-text-tertiary">
          {memory.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {memory.location}
            </span>
          )}
          {memory.weather && (
            <span className="flex items-center gap-1">
              <Cloud size={12} /> {memory.weather}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {memory.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-[#F2F2F7] text-text-secondary text-[11px] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
