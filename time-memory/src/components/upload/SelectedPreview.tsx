import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  photos: string[]
  onRemove: (url: string) => void
}

export default function SelectedPreview({ photos, onRemove }: Props) {
  if (photos.length === 0) return null

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
      <AnimatePresence>
        {photos.map((url, i) => (
          <motion.div
            key={url}
            className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => onRemove(url)}
              className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center"
            >
              <X size={10} color="white" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
