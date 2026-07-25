import * as React from 'react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', id, label, error, checked, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            checked={checked}
            className={`
              w-4 h-4 text-blue-600 border-gray-300 rounded
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
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
              className="text-sm text-gray-700 cursor-pointer"
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
