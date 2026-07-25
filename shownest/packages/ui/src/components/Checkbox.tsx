import * as React from 'react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: React.ReactNode
  error?: string
  onCheckedChange?: (checked: boolean) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', id, label, error, checked, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e)
      if (onCheckedChange) onCheckedChange(e.target.checked)
    }

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            checked={checked}
            onChange={handleChange}
            className={`
              w-4 h-4 text-[#ba0036] border-[#e5bdbe] rounded
              focus:ring-2 focus:ring-[#ba0036] focus:ring-offset-2
              cursor-pointer
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3">
            <label
              htmlFor={id}
              className="text-sm text-[#281718] cursor-pointer font-medium"
            >
              {label}
            </label>
            {error && (
              <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
