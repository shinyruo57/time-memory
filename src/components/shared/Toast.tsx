import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../stores/appStore'

export default function Toast() {
  const { toastMessage, dismissToast } = useAppStore()

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(dismissToast, 2000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage, dismissToast])

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-text-primary text-white rounded-full text-caption shadow-float"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
