import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface Props {
  count: number
  loading: boolean
  onClick: () => void
}

export default function UploadActionButton({ count, loading, onClick }: Props) {
  if (count === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-30">
      <div className="w-full max-w-mobile p-4 safe-bottom">
        <motion.button
          onClick={onClick}
          disabled={loading}
          className={`w-full h-14 rounded-xl text-h3 font-semibold flex items-center justify-center gap-2 ${
            loading
              ? 'bg-separator text-text-tertiary'
              : 'bg-accent text-white shadow-accent'
          }`}
          animate={
            loading
              ? { y: 0, opacity: 1 }
              : { y: 0, opacity: 1, scale: [1, 1.025, 1] }
          }
          transition={
            loading
              ? {}
              : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
          }
          whileTap={!loading ? { scale: 0.96 } : undefined}
          initial={{ y: 40, opacity: 0 }}
          exit={{ y: 40, opacity: 0 }}
        >
          <Sparkles size={20} />
          {loading ? '正在整理...' : `整理 ${count} 张照片`}
        </motion.button>
      </div>
    </div>
  )
}
