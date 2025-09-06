'use client'

import React from 'react'
import { cn } from '../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'default', 
    children, 
    ...props 
  }, ref) => {
    const baseClasses = "font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
      primary: "px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      secondary: "px-6 py-3 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-100 focus:ring-pink-500", 
      outline: "px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      accent: "px-6 py-3 rounded-full border border-orange-300 text-orange-700 hover:bg-orange-100 focus:ring-orange-500"
    }

    const sizes = {
      default: "text-base",
      sm: "px-4 py-2 text-sm",
      lg: "px-8 py-4 text-lg"
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
export type { ButtonProps } 