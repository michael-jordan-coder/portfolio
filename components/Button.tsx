'use client'

import React from 'react'
import { cn } from '../lib/utils' // We'll create this utility

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
      secondary: "btn-secondary focus:ring-secondary-500", 
      outline: "btn-outline focus:ring-white",
      accent: "btn-accent focus:ring-accent-500"
    }

    const sizes = {
      default: "text-body",
      sm: "px-4 py-2 text-body-small",
      lg: "px-8 py-4 text-body-large"
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