import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import { useUploadStore } from '../stores/uploadStore'
import { useMemoryStore } from '../stores/memoryStore'
import { useAppStore } from '../stores/appStore'
import PageContainer from '../components/layout/PageContainer'
import PhotoGridPicker from '../components/upload/PhotoGridPicker'
import SelectedPreview from '../components/upload/SelectedPreview'
import LoadingSpinner from '../components/shared/LoadingSpinner'

export default function UploadPage() {
  const navigate = useNavigate()
  const {
    selectedPhotos,
    status,
    processingStage,
    currentResult,
    selectPhotos,
    clearSelection,
    startProcessing,
    reset,
  } = useUploadStore()
  const { addMemory } = useMemoryStore()
  const { showToast } = useAppStore()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleToggle = (url: string) => {
    const newSelection = selectedPhotos.includes(url)
      ? selectedPhotos.filter((u) => u !== url)
      : [...selectedPhotos, url]
    selectPhotos(newSelection)
  }

  const handleRemove = (url: string) => {
    selectPhotos(selectedPhotos.filter((u) => u !== url))
  }

  const handleStart = async () => {
    await startProcessing()
  }

  const handleConfirmAdd = async () => {
    if (!currentResult) return
    setSaving(true)
    addMemory(currentResult)
    await new Promise(r => setTimeout(r, 400))
    setSaving(false)
    setSaved(true)
    showToast('回忆已添加到时间轴')
    setTimeout(() => {
      reset()
      navigate('/home', { replace: true })
    }, 800)
  }

  const handleRetry = () => {
    reset()
  }

  useEffect(() => {
    return () => { reset() }
  }, [])

  return (
    <PageContainer hasTabBar={true}>
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft size={22} color="#1C1C1E" />
        </button>
        <h1 className="text-h3 text-text-primary">添加回忆</h1>
        <div className="w-10" />
      </div>

      <AnimatePresence mode="wait">
        {status === 'processing' ? (
          <motion.div
            key="processing"
            className="flex flex-col items-center justify-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSpinner stage={processingStage} />
            <p className="text-small text-text-tertiary mt-10">
              {processingStage < 3
                ? 'AI 正在为你整理照片，请稍等...'
                : '整理完成！'}
            </p>
          </motion.div>
        ) : status === 'done' && currentResult ? (
          <motion.div
            key="result"
            className="pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Result card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-card">
              <img
                src={currentResult.coverUrl}
                alt=""
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-h2 text-text-primary mb-2">{currentResult.title}</h2>
                <p className="text-body text-text-secondary leading-relaxed mb-4">
                  {currentResult.emotionText}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {currentResult.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-[#F2F2F7] text-text-secondary text-[11px] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-small text-text-tertiary">
                  <span>{currentResult.date}</span>
                  {currentResult.weather && <span>{currentResult.weather}</span>}
                  {currentResult.location && <span>{currentResult.location}</span>}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <motion.button
                onClick={handleRetry}
                className="flex-1 h-12 rounded-xl border border-separator text-text-secondary text-body font-medium"
                whileTap={{ scale: 0.96 }}
              >
                重新选择
              </motion.button>

              <motion.button
                onClick={handleConfirmAdd}
                disabled={saving || saved}
                className="flex-[2] h-12 rounded-xl bg-accent text-white text-body font-semibold shadow-accent flex items-center justify-center gap-2 disabled:opacity-60"
                whileTap={!saving && !saved ? { scale: 0.96 } : undefined}
              >
                <AnimatePresence mode="wait">
                  {saving ? (
                    <motion.span
                      key="saving"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Sparkles size={18} className="animate-spin" />
                      正在添加...
                    </motion.span>
                  ) : saved ? (
                    <motion.span
                      key="saved"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={20} />
                      已添加
                    </motion.span>
                  ) : (
                    <motion.span
                      key="confirm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={20} />
                      确认添加
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Selection hint */}
            <p className="text-caption text-text-secondary mb-3">
              {selectedPhotos.length === 0
                ? '选择你想整理的照片（最多9张）'
                : `已选择 ${selectedPhotos.length} 张照片`}
            </p>

            {/* Selected preview */}
            <SelectedPreview photos={selectedPhotos} onRemove={handleRemove} />

            {/* Photo grid */}
            <div className="mt-4">
              <PhotoGridPicker
                selected={selectedPhotos}
                onToggle={handleToggle}
                maxSelection={9}
              />
            </div>

            {/* Start button (inline, not floating) */}
            <AnimatePresence>
              {selectedPhotos.length > 0 && (
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 12, height: 0 }}
                >
                  <motion.button
                    onClick={handleStart}
                    className="w-full h-14 rounded-xl bg-accent text-white text-h3 font-semibold shadow-accent flex items-center justify-center gap-2"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Sparkles size={20} />
                    整理 {selectedPhotos.length} 张照片
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}
