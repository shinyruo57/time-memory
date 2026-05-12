import { useState, useEffect, useRef } from 'react'

export function useTypewriter(text: string, speed: number = 60, delay: number = 500) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const startedRef = useRef(false)

  useEffect(() => {
    setDisplayText('')
    setIsComplete(false)
    indexRef.current = 0
    startedRef.current = false

    const timeout = setTimeout(() => {
      startedRef.current = true
      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayText(text.slice(0, indexRef.current + 1))
          indexRef.current++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return { displayText, isComplete }
}
