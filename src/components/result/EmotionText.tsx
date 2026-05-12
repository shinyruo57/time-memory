import { motion } from 'framer-motion'
import { useTypewriter } from '../../hooks/useTypewriter'

export default function EmotionText({ text }: { text: string }) {
  const { displayText } = useTypewriter(text, 60, 600)

  return (
    <motion.p
      className="text-body text-text-secondary leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block w-0.5 h-4 bg-accent ml-0.5 align-middle"
      />
    </motion.p>
  )
}
