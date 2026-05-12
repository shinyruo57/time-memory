import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import type { Memory } from '../types'
import { mockFetchMemoryById } from '../mocks/services'
import MemoryHeroImage from '../components/result/MemoryHeroImage'
import MemoryTitle from '../components/result/MemoryTitle'
import EmotionText from '../components/result/EmotionText'
import TimeCardBadge from '../components/result/TimeCardBadge'
import TagList from '../components/result/TagList'
import SaveShareBar from '../components/result/SaveShareBar'

export default function ResultPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [memory, setMemory] = useState<Memory | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const data = await mockFetchMemoryById(id)
      setMemory(data)
      setIsFavorite(data?.isFavorite ?? false)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading || !memory) {
    return (
      <div className="w-full max-w-mobile mx-auto h-screen bg-[#F2F2F7] flex items-center justify-center">
        <div className="space-y-6 w-full px-8">
          <div className="shimmer-bg rounded-b-[40px] h-80" />
          <div className="shimmer-bg rounded h-8 w-3/4" />
          <div className="shimmer-bg rounded h-4 w-full" />
          <div className="shimmer-bg rounded h-4 w-2/3" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-mobile mx-auto min-h-screen bg-[#F2F2F7] safe-top">
      {/* Back button overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="w-full max-w-mobile px-4 pt-4 pointer-events-auto">
          <motion.button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-card"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ArrowLeft size={20} color="#1C1C1E" />
          </motion.button>
        </div>
      </div>

      {/* Hero image */}
      <MemoryHeroImage src={memory.coverUrl} title={memory.title} />

      {/* Content */}
      <div className="px-5 -mt-10 relative z-10">
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-card space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <MemoryTitle title={memory.title} />
          <EmotionText text={memory.emotionText} />
          <TimeCardBadge
            date={memory.date}
            time={memory.time}
            weather={memory.weather}
            location={memory.location}
          />
          <TagList tags={memory.tags} />
          <SaveShareBar
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite(!isFavorite)}
          />
        </motion.div>

        {/* Photo gallery */}
        {memory.photos.length > 1 && (
          <motion.div
            className="mt-4 bg-white rounded-2xl p-4 shadow-card space-y-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <p className="text-caption text-text-secondary mb-2">
              全部照片 · {memory.photos.length}张
            </p>
            <div className="grid grid-cols-2 gap-2">
              {memory.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt=""
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
              ))}
            </div>
          </motion.div>
        )}

        <div className="h-10" />
      </div>
    </div>
  )
}
