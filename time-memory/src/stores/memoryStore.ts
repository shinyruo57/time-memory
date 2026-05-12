import { create } from 'zustand'
import type { Memory } from '../types'
import { mockFetchMemories, mockGetTodayMemory, mockFetchByYear } from '../mocks/services'

interface MemoryState {
  memories: Memory[]
  todayMemory: Memory | null
  isLoading: boolean
  fetchMemories: () => Promise<void>
  addMemory: (memory: Memory) => void
  fetchTodayMemory: () => Promise<void>
  fetchByYear: (year: number) => Promise<Memory[]>
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  memories: [],
  todayMemory: null,
  isLoading: false,
  fetchMemories: async () => {
    set({ isLoading: true })
    const memories = await mockFetchMemories()
    set({ memories, isLoading: false })
  },
  addMemory: (memory) => {
    set({ memories: [memory, ...get().memories] })
  },
  fetchTodayMemory: async () => {
    const todayMemory = await mockGetTodayMemory()
    set({ todayMemory })
  },
  fetchByYear: async (year: number) => {
    return mockFetchByYear(year)
  },
}))
