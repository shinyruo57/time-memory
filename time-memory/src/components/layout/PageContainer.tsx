import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  noPadding?: boolean
  hasTabBar?: boolean
}

export default function PageContainer({ children, className = '', noPadding = false, hasTabBar = true }: Props) {
  return (
    <div
      className={`w-full max-w-mobile mx-auto min-h-screen safe-top ${
        hasTabBar ? 'pb-safe' : ''
      } ${noPadding ? '' : 'px-4'} ${className}`}
    >
      {children}
    </div>
  )
}
