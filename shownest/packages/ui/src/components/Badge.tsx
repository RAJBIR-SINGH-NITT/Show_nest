import * as React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-[#ffe9e9] text-[#ba0036]',
      warning: 'bg-amber-100 text-amber-900',
      error: 'bg-rose-100 text-rose-800',
      info: 'bg-blue-100 text-blue-800',
      outline: 'bg-transparent border border-[#e5bdbe] text-[#5c3f41]',
      secondary: 'bg-[#ffe9e9] text-[#281718]',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    }
    
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center rounded-full font-medium
          ${variants[variant] || variants.default}
          ${sizes[size] || sizes.md}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
