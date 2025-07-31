'use client'

interface ScrollToButtonProps {
  target: string | number
  children: React.ReactNode
  className?: string
  duration?: number
}

export function ScrollToButton({ 
  target, 
  children, 
  className = '', 
  duration = 1
}: ScrollToButtonProps) {
  const handleClick = () => {
    if (typeof target === 'string') {
      const element = document.querySelector(target)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
  }

  return (
    <button 
      onClick={handleClick}
      className={`transition-all hover:opacity-80 ${className}`}
    >
      {children}
    </button>
  )
} 