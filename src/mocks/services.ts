import type { Memory, MemoryStats } from '../types'
import { presetMemories } from './data'

function delay(ms: number = 800): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const aiTitleTemplates = [
  '那一天的温柔时光',
  '被阳光亲吻的午后',
  '藏在照片里的夏天',
  '属于我们的这一刻',
  '时间停住的地方',
]

const aiEmotionTemplates = [
  '按下快门的瞬间，我知道这一刻值得被记住。生活的美好，就藏在每一个不经意的片段里。',
  '有时候翻看照片，会发现原来自己拥有过这么多珍贵的时刻。感谢当时记录下来的自己。',
  '日子总是匆匆而过，但这些被定格的画面，让时光有了温度，让回忆有了形状。',
]

export async function mockAIGenerate(photoCount: number): Promise<Memory> {
  await delay(2500)

  const template = presetMemories[Math.floor(Math.random() * presetMemories.length)]
  const titleIndex = Math.floor(Math.random() * aiTitleTemplates.length)
  const emotionIndex = Math.floor(Math.random() * aiEmotionTemplates.length)

  return {
    ...template,
    id: `gen-${Date.now()}`,
    title: aiTitleTemplates[titleIndex],
    emotionText: aiEmotionTemplates[emotionIndex],
    date: new Date().toISOString().split('T')[0],
    time: ['上午', '下午', '傍晚', '深夜'][Math.floor(Math.random() * 4)],
    createdAt: new Date().toISOString(),
    isFavorite: false,
  }
}

export async function mockFetchMemories(): Promise<Memory[]> {
  await delay(600)
  return [...presetMemories].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function mockFetchMemoryById(id: string): Promise<Memory | null> {
  await delay(300)
  return presetMemories.find(m => m.id === id) ?? null
}

export async function mockGetTodayMemory(): Promise<Memory | null> {
  await delay(500)
  const today = new Date()
  const month = today.getMonth()
  const sameMonth = presetMemories.filter(m => {
    const mDate = new Date(m.date)
    return mDate.getMonth() === month
  })
  if (sameMonth.length === 0) return presetMemories[0]
  return sameMonth[Math.floor(Math.random() * sameMonth.length)]
}

export async function mockFetchByYear(year: number): Promise<Memory[]> {
  await delay(400)
  return presetMemories.filter(m => new Date(m.date).getFullYear() === year)
}

export async function mockFetchStats(): Promise<MemoryStats> {
  await delay(300)
  const allTags = presetMemories.flatMap(m => m.tags)
  const tagCount: Record<string, number> = {}
  allTags.forEach(t => {
    tagCount[t] = (tagCount[t] || 0) + 1
  })
  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }))

  const years = new Set(presetMemories.map(m => new Date(m.date).getFullYear()))
  const dates = new Set(presetMemories.map(m => m.date))

  return {
    totalMemories: presetMemories.length,
    totalDays: dates.size,
    totalYears: years.size,
    activeMonths: Math.floor(dates.size * 0.7),
    topTags,
  }
}

export async function mockSaveMemory(_memory: Memory): Promise<void> {
  await delay(400)
}
