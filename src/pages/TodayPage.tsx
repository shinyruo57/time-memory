import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, RefreshCw, Share2 } from 'lucide-react'
import type { Memory } from '../types'
import { mockGetTodayMemory } from '../mocks/services'
import { useAppStore } from '../stores/appStore'
import PageContainer from '../components/layout/PageContainer'
import DateHero from '../components/today/DateHero'
import MemoryCardLarge from '../components/today/MemoryCardLarge'

export default function TodayPage() {
  const navigate = useNavigate()
  const { showToast } = useAppStore()
  const [memory, setMemory] = useState<Memory | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await mockGetTodayMemory()
    setMemory(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft size={22} color="#1C1C1E" />
        </button>
        <h1 className="text-h3 text-text-primary">今日回忆</h1>
        <button onClick={load} className="w-10 h-10 flex items-center justify-center">
          <RefreshCw size={18} color="#8E8E93" />
        </button>
      </div>

      {/* Date hero */}
      <DateHero />

      {/* Content */}
      {loading || !memory ? (
        <div className="space-y-4 px-2">
          <div className="shimmer-bg rounded-2xl h-56" />
          <div className="shimmer-bg rounded h-6 w-3/4" />
          <div className="shimmer-bg rounded h-4 w-full" />
          <div className="shimmer-bg rounded h-4 w-2/3" />
        </div>
      ) : (
        <>
          <MemoryCardLarge memory={memory} />

          {/* Share */}
          <motion.div
            className="mt-8 px-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <motion.button
              onClick={() => showToast('分享卡片已生成')}
              className="w-full h-12 rounded-xl bg-accent text-white text-body font-semibold shadow-accent flex items-center justify-center gap-2"
              whileTap={{ scale: 0.96 }}
            >
              <Share2 size={18} />
              分享这张回忆卡片
            </motion.button>
          </motion.div>
        </>
      )}
    </PageContainer>
  )
}
