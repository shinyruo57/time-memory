import { motion } from 'framer-motion'

const stages = [
  '正在识别照片主题...',
  '正在生成回忆标题...',
  '正在书写情绪文案...',
  '即将完成...',
]

interface Props {
  stage: number
}

export default function LoadingSpinner({ stage }: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent-warm"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-caption text-text-secondary"
        >
          {stages[stage] || stages[0]}
        </motion.p>

        <div className="flex gap-1 mt-2">
          {stages.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full bg-separator"
              animate={{
                width: i <= stage ? 24 : 8,
                backgroundColor: i <= stage ? '#FF6B6B' : '#E5E5EA',
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
