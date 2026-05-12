import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'

export default function EmptyState() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-20 px-8">
      <motion.div
        className="w-20 h-20 rounded-full bg-[#F2F2F7] flex items-center justify-center mb-6"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Camera size={32} color="#C7C7CC" />
      </motion.div>

      <h3 className="text-h3 text-text-primary mb-2">还没有回忆</h3>
      <p className="text-caption text-text-secondary text-center mb-8 leading-relaxed">
        上传你的第一张照片
        <br />
        让 AI 帮你整理美好记忆
      </p>

      <motion.button
        onClick={() => navigate('/upload')}
        className="px-8 py-3 bg-accent text-white rounded-full text-body font-medium shadow-accent"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
      >
        开始记录
      </motion.button>
    </div>
  )
}
