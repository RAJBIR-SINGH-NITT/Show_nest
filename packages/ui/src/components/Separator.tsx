import * as React from 'react'

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`relative my-6 ${className}`} {...props}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        {children && (
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">{children}</span>
          </div>
        )}
      </div>
    )
  }
)

Separator.displayName = 'Separator'
