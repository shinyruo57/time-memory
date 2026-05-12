import { motion } from 'framer-motion'
import { Heart, Share2, Download } from 'lucide-react'

interface Props {
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function SaveShareBar({ isFavorite, onToggleFavorite }: Props) {
  return (
    <motion.div
      className="flex items-center gap-4 pt-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.3 }}
    >
      <motion.button
        className="flex-1 h-12 rounded-xl bg-accent text-white text-body font-semibold shadow-accent"
        whileTap={{ scale: 0.96 }}
      >
        分享回忆
      </motion.button>

      <motion.button
        onClick={onToggleFavorite}
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isFavorite ? 'bg-accent/10' : 'bg-[#F2F2F7]'
        }`}
        whileTap={{ scale: 0.9 }}
      >
        <Heart
          size={20}
          color={isFavorite ? '#FF6B6B' : '#8E8E93'}
          fill={isFavorite ? '#FF6B6B' : 'transparent'}
        />
      </motion.button>

      <motion.button
        className="w-12 h-12 rounded-xl bg-[#F2F2F7] flex items-center justify-center"
        whileTap={{ scale: 0.9 }}
      >
        <Download size={20} color="#8E8E93" />
      </motion.button>
    </motion.div>
  )
}
