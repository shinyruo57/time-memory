import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
  onClick?: () => void
  size?: number
  color?: string
  className?: string
  badge?: number
}

export default function IconButton({ icon: Icon, onClick, size = 24, color = '#1C1C1E', className = '', badge }: Props) {
  return (
    <motion.button
      className={`relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      <Icon size={size} color={color} />
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </motion.button>
  )
}
