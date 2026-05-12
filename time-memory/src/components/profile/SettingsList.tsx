import { motion } from 'framer-motion'
import { Bell, Info, Star, Shield, ChevronRight } from 'lucide-react'
import { useAppStore } from '../../stores/appStore'

const settings = [
  { icon: Bell, label: '通知设置', desc: '每日回忆提醒' },
  { icon: Star, label: '评分支持', desc: '在 App Store 给我们鼓励' },
  { icon: Shield, label: '隐私政策', desc: '你的数据只属于你' },
  { icon: Info, label: '关于', desc: '整理旧时光 v1.0.0' },
]

export default function SettingsList() {
  const { showToast } = useAppStore()

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.3 }}
    >
      {settings.map((item, i) => (
        <motion.button
          key={item.label}
          className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#F2F2F7]/50 transition-colors"
          onClick={() => showToast(`${item.label}功能开发中`)}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 + i * 0.05 }}
        >
          <div className="w-9 h-9 rounded-lg bg-[#F2F2F7] flex items-center justify-center">
            <item.icon size={18} color="#FF6B6B" />
          </div>
          <div className="flex-1">
            <p className="text-body text-text-primary">{item.label}</p>
            <p className="text-small text-text-tertiary">{item.desc}</p>
          </div>
          <ChevronRight size={16} color="#C7C7CC" />
        </motion.button>
      ))}
    </motion.div>
  )
}
