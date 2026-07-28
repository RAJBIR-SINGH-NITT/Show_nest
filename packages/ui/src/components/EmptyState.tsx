import * as React from 'react'
import { Button } from './Button'

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'action'> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode | { label: string; onClick: () => void }
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className = '', icon, title, description, action, ...props }, ref) => {
    const renderAction = () => {
      if (!action) return null
      if (React.isValidElement(action)) return action
      if (typeof action === 'object' && 'label' in action) {
        return (
          <Button variant="primary" onClick={action.onClick} className="bg-[#ba0036] text-white">
            {action.label}
          </Button>
        )
      }
      return null
    }

    return (
      <div
        ref={ref}
        className={`
          flex flex-col items-center justify-center text-center py-12 px-4 bg-white border border-[#e5bdbe] rounded-2xl
          ${className}
        `}
        {...props}
      >
        {icon ? (
          <div className="mb-4 text-[#ba0036]">{icon}</div>
        ) : (
          <div className="w-16 h-16 bg-[#ffe9e9] rounded-full flex items-center justify-center mb-4 text-[#ba0036] text-2xl">
            🎟️
          </div>
        )}
        <h3 className="text-xl font-bold font-display text-[#281718] mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-[#5c3f41] mb-6 max-w-md">{description}</p>
        )}
        {renderAction()}
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'
