import * as React from 'react'

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className = '', children, value, onValueChange, ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-2 ${className}`} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              checked: value !== undefined ? child.props.value === value : child.props.checked,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (child.props.onChange) child.props.onChange(e)
                if (onValueChange) onValueChange(e.target.value)
              },
            } as any)
          }
          return child
        })}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string
  label?: string
  description?: string
  value?: string
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
              w-4 h-4 text-[#ba0036] border-[#e5bdbe]
              focus:ring-2 focus:ring-[#ba0036] focus:ring-offset-2
              cursor-pointer
              ${className}
            `}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3">
            <label htmlFor={id} className="text-sm font-medium text-[#281718] cursor-pointer">
              {label}
            </label>
            {description && (
              <p className="text-xs text-[#5c3f41]">{description}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)

RadioGroupItem.displayName = 'RadioGroupItem'
