import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useMemoryStore } from '../stores/memoryStore'
import PageContainer from '../components/layout/PageContainer'
import TodayMemoryBanner from '../components/timeline/TodayMemoryBanner'
import YearQuickJump from '../components/timeline/YearQuickJump'
import TimelineList from '../components/timeline/TimelineList'

export default function HomePage() {
  const { memories, isLoading, fetchMemories } = useMemoryStore()
  const [activeYear, setActiveYear] = useState<number | null>(null)

  useEffect(() => {
    fetchMemories()
  }, [fetchMemories])

  const filtered = useMemo(() => {
    if (activeYear === null) return memories
    return memories.filter((m) => new Date(m.date).getFullYear() === activeYear)
  }, [memories, activeYear])

  const years = useMemo(() => {
    const set = new Set(memories.map((m) => new Date(m.date).getFullYear()))
    return Array.from(set).sort((a, b) => b - a)
  }, [memories])

  return (
    <PageContainer className="pt-4">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-h1 text-text-primary">旧时光</h1>
          <p className="text-caption text-text-secondary mt-0.5">
            {memories.length} 条回忆
          </p>
        </div>
        <div className="relative">
          <YearQuickJump
            years={years}
            activeYear={activeYear}
            onSelectYear={setActiveYear}
          />
        </div>
      </motion.div>

      {/* Today's memory banner */}
      <TodayMemoryBanner />

      {/* Timeline */}
      <TimelineList memories={filtered} isLoading={isLoading} />
    </PageContainer>
  )
}
