import { motion } from 'framer-motion'
import { Clock, MapPin, Cloud } from 'lucide-react'

interface Props {
  date: string
  time: string
  weather?: string
  location?: string
}

export default function TimeCardBadge({ date, time, weather, location }: Props) {
  const items = [
    { icon: Clock, text: `${date} ${time}` },
    ...(weather ? [{ icon: Cloud, text: weather }] : []),
    ...(location ? [{ icon: MapPin, text: location }] : []),
  ]

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.3 }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F2F2F7] rounded-full text-small text-text-secondary"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.08 }}
        >
          <item.icon size={13} color="#8E8E93" />
          {item.text}
        </motion.div>
      ))}
    </motion.div>
  )
}
