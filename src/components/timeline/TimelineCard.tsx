import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MapPin, Cloud } from 'lucide-react'
import type { Memory } from '../../types'

interface Props {
  memory: Memory
  index: number
}

export default function TimelineCard({ memory, index }: Props) {
  const navigate = useNavigate()
  const date = new Date(memory.date)
  const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

  return (
    <motion.div
      className="relative pl-8 pb-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Timeline line */}
      <div className="absolute left-[13px] top-2 bottom-0 w-px bg-separator" />

      {/* Date dot */}
      <div className="absolute left-[7px] top-2 w-3.5 h-3.5 rounded-full border-2 border-accent bg-white z-10" />

      {/* Date label */}
      <p className="text-small text-text-tertiary mb-3 tracking-wide">
        {formattedDate} · {memory.time}
      </p>

      {/* Card */}
      <motion.div
        className="bg-white rounded-xl overflow-hidden shadow-card cursor-pointer"
        onClick={() => navigate(`/result/${memory.id}`)}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        layoutId={`card-${memory.id}`}
      >
        {/* Cover image */}
        <div className="relative w-full h-44 overflow-hidden">
          <img
            src={memory.coverUrl}
            alt={memory.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {memory.isFavorite && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <Heart size={14} className="fill-accent text-accent" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-h3 text-text-primary mb-1.5">{memory.title}</h3>
          <p className="text-caption text-text-secondary line-clamp-2 leading-relaxed mb-3">
            {memory.emotionText}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-small text-text-tertiary mb-3">
            {memory.location && (
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {memory.location}
              </span>
            )}
            {memory.weather && (
              <span className="flex items-center gap-1">
                <Cloud size={11} />
                {memory.weather}
              </span>
            )}
          </div>

          {/* Tags */}
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
    </motion.div>
  )
}
