import * as React from 'react'

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-2 ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string
  label: string
  description?: string
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ id, label, description, className = '', ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="radio"
            id={id}
            className={`
              w-4 h-4 text-blue-600 border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              cursor-pointer
              ${className}
            `}
            {...props}
          />
        </div>
        <div className="ml-3">
          <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer">
            {label}
          </label>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
    )
  }
)

RadioGroupItem.displayName = 'RadioGroupItem'
