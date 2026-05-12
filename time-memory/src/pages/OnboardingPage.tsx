import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ArrowRight } from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  {
    emoji: '📸',
    title: '拍照，记录生活',
    desc: '把每一个值得纪念的瞬间\n装进你的时光相册里',
  },
  {
    emoji: '✨',
    title: 'AI 为你整理回忆',
    desc: '自动识别照片主题\n生成温暖的回忆文案',
  },
  {
    emoji: '💫',
    title: '让时光重新流动',
    desc: '在时间轴上浏览你的故事\n每一天都值得被重温',
  },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { completeOnboarding } = useAppStore()
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const isLastSlide = activeIndex === slides.length - 1

  const handleNext = () => {
    if (isLastSlide) {
      completeOnboarding()
      navigate('/home', { replace: true })
    } else {
      swiperRef.current?.slideNext()
    }
  }

  return (
    <div className="w-full max-w-mobile mx-auto h-screen bg-[#F2F2F7] flex flex-col">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="flex-1"
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex)
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="h-full flex flex-col items-center justify-center px-10 pb-24">
              <motion.div
                className="text-7xl mb-10"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {slide.emoji}
              </motion.div>

              <motion.h2
                className="text-h2 text-text-primary mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {slide.title}
              </motion.h2>

              <motion.p
                className="text-body text-text-secondary text-center whitespace-pre-line leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                {slide.desc}
              </motion.p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-12 safe-bottom z-30 pointer-events-none">
        <div className="w-full max-w-mobile px-10 pointer-events-auto">
          <motion.button
            onClick={handleNext}
            className="w-full h-14 bg-accent text-white rounded-xl text-h3 font-semibold shadow-accent flex items-center justify-center gap-2"
            whileTap={{ scale: 0.96 }}
          >
            {isLastSlide ? '开始使用' : '下一步'}
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
