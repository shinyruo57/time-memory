import { motion } from 'framer-motion'

export default function MemoryTitle({ title }: { title: string }) {
  return (
    <motion.h1
      className="text-h1 text-text-primary"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      {title}
    </motion.h1>
  )
}
