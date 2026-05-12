export interface Memory {
  id: string
  title: string
  emotionText: string
  coverUrl: string
  photos: string[]
  tags: string[]
  date: string
  time: string
  weather?: string
  location?: string
  createdAt: string
  isFavorite: boolean
}

export interface MemoryStats {
  totalMemories: number
  totalDays: number
  totalYears: number
  topTags: { name: string; count: number }[]
  activeMonths: number
}
