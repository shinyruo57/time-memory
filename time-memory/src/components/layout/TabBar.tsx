import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Plus, User } from 'lucide-react'

const tabs = [
  { path: '/home', icon: Clock, label: '回忆' },
  { path: '/upload', icon: Plus, label: '上传', isCenter: true },
  { path: '/profile', icon: User, label: '我的' },
]

export default function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  // Hide on full-screen pages
  if (['/splash', '/result'].some(p => location.pathname.startsWith(p))) {
    return null
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
      <div className="w-full max-w-mobile glass border-t border-separator safe-bottom">
        <div className="flex items-center justify-around h-[64px] px-4">
          {tabs.map((tab) => {
            const active = isActive(tab.path)
            if (tab.isCenter) {
              return (
                <motion.button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className="relative -mt-6 w-14 h-14 rounded-full bg-accent shadow-accent flex items-center justify-center"
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <tab.icon size={26} color="#FFFFFF" strokeWidth={2} />
                </motion.button>
              )
            }
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center gap-0.5 min-w-[60px]"
              >
                <tab.icon
                  size={22}
                  color={active ? '#FF6B6B' : '#8E8E93'}
                  strokeWidth={active ? 2.5 : 1.5}
                />
                <span
                  className={`text-[10px] font-medium ${
                    active ? 'text-accent' : 'text-text-secondary'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
