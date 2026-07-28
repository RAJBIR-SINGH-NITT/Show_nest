import * as React from 'react'

export interface TimelineItem {
  label: string
  date: string
  time: string
  status?: 'completed' | 'pending' | 'current'
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className = '', items, ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-4 ${className}`} {...props}>
        {items.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-4 h-4 rounded-full border-2
                  ${item.status === 'completed' ? 'bg-green-500 border-green-500' : ''}
                  ${item.status === 'pending' ? 'bg-gray-200 border-gray-300' : ''}
                  ${item.status === 'current' ? 'bg-blue-500 border-blue-500' : ''}
                `}
              />
              {index < items.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 mt-2" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <p className="font-medium text-gray-900">{item.label}</p>
              <p className="text-sm text-gray-600">{item.date}</p>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
)

Timeline.displayName = 'Timeline'
