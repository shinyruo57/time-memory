import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { photos } from '../../mocks/photos'

interface Props {
  selected: string[]
  onToggle: (url: string) => void
  maxSelection?: number
}

const allPhotos = [...photos.travel, ...photos.food, ...photos.daily, ...photos.milestone, ...photos.city, ...photos.nature].slice(0, 20)

function PhotoItem({ url, index, isSelected, isDisabled, onToggle, selected }: {
  url: string
  index: number
  isSelected: boolean
  isDisabled: boolean
  onToggle: (url: string) => void
  selected: string[]
}) {
  return (
    <motion.button
      key={url}
      className={`relative aspect-square rounded-lg overflow-hidden ${isDisabled ? 'opacity-40' : ''}`}
      onClick={() => !isDisabled && onToggle(url)}
      whileTap={!isDisabled ? { scale: 0.94 } : undefined}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
    >
      <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-accent/30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-accent flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Check size={16} color="white" strokeWidth={3} />
          </motion.div>
        </motion.div>
      )}
      {isSelected && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
          <span className="text-white text-[10px] font-semibold">
            {selected.indexOf(url) + 1}
          </span>
        </div>
      )}
    </motion.button>
  )
}

export default function PhotoGridPicker({ selected, onToggle, maxSelection = 9 }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {allPhotos.map((url, i) => (
        <PhotoItem
          key={url}
          url={url}
          index={i}
          isSelected={selected.includes(url)}
          isDisabled={!selected.includes(url) && selected.length >= maxSelection}
          onToggle={onToggle}
          selected={selected}
        />
      ))}
    </div>
  )
}
