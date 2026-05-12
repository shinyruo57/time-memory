import { useMemo } from 'react'
import type { Memory } from '../../types'
import TimelineCard from './TimelineCard'
import EmptyState from './EmptyState'

interface Props {
  memories: Memory[]
  isLoading: boolean
}

export default function TimelineList({ memories, isLoading }: Props) {
  const sorted = useMemo(
    () => [...memories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [memories]
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="pl-8 pb-8 relative">
            <div className="absolute left-[13px] top-2 bottom-0 w-px bg-separator" />
            <div className="absolute left-[7px] top-2 w-3.5 h-3.5 rounded-full border-2 border-separator bg-white z-10" />
            <div className="shimmer-bg h-3 w-20 rounded mb-3" />
            <div className="bg-white rounded-xl p-4 space-y-3">
              <div className="shimmer-bg rounded-lg h-40" />
              <div className="shimmer-bg rounded h-5 w-3/4" />
              <div className="shimmer-bg rounded h-3 w-full" />
              <div className="flex gap-2">
                <div className="shimmer-bg rounded-full h-6 w-12" />
                <div className="shimmer-bg rounded-full h-6 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (sorted.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="pb-4">
      {sorted.map((memory, index) => (
        <TimelineCard key={memory.id} memory={memory} index={index} />
      ))}
    </div>
  )
}
