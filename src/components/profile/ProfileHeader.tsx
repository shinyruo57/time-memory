import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

export default function ProfileHeader() {
  return (
    <motion.div
      className="flex flex-col items-center py-8"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-warm flex items-center justify-center">
          <Camera size={28} color="white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-card flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <path d="M5 0L6.5 3.5L10 5L6.5 6.5L5 10L3.5 6.5L0 5L3.5 3.5L5 0Z" />
            </svg>
          </div>
        </div>
      </div>
      <h2 className="text-h2 text-text-primary">时光记录者</h2>
      <p className="text-caption text-text-secondary mt-0.5">记录生活中的每一束光</p>
    </motion.div>
  )
}
