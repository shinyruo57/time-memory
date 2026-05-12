import { motion } from 'framer-motion'

export default function MemoryHeroImage({ src, title }: { src: string; title: string }) {
  return (
    <motion.div
      className="w-full h-80 rounded-b-[40px] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={src} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-b-[40px]" />
    </motion.div>
  )
}
