import { motion } from 'framer-motion'

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          className="px-3 py-1.5 bg-gradient-to-r from-accent/8 to-accent-warm/8 text-accent text-small font-medium rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + i * 0.06, type: 'spring', stiffness: 300 }}
        >
          #{tag}
        </motion.span>
      ))}
    </motion.div>
  )
}
