import { create } from 'zustand'
import type { Memory } from '../types'
import { mockAIGenerate } from '../mocks/services'

type UploadStatus = 'idle' | 'selecting' | 'processing' | 'done' | 'error'

interface UploadState {
  selectedPhotos: string[]
  status: UploadStatus
  currentResult: Memory | null
  processingStage: number
  selectPhotos: (photos: string[]) => void
  clearSelection: () => void
  startProcessing: () => Promise<void>
  reset: () => void
}

export const useUploadStore = create<UploadState>((set, get) => ({
  selectedPhotos: [],
  status: 'idle',
  currentResult: null,
  processingStage: 0,
  selectPhotos: (photos) => set({ selectedPhotos: photos, status: 'selecting' }),
  clearSelection: () => set({ selectedPhotos: [], status: 'idle' }),
  startProcessing: async () => {
    const { selectedPhotos } = get()
    if (selectedPhotos.length === 0) return
    set({ status: 'processing', processingStage: 0 })

    // Simulate AI processing stages
    const stages = ['正在识别照片主题...', '正在生成回忆标题...', '正在书写情绪文案...']
    for (let i = 0; i < stages.length; i++) {
      await new Promise(r => setTimeout(r, 800))
      set({ processingStage: i + 1 })
    }

    const result = await mockAIGenerate(selectedPhotos.length)
    set({ status: 'done', currentResult: result, processingStage: 3 })
  },
  reset: () => set({ selectedPhotos: [], status: 'idle', currentResult: null, processingStage: 0 }),
}))
