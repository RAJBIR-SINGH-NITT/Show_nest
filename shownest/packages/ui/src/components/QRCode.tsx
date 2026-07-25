import * as React from 'react'

export interface QRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  value?: string
}

export const QRCode = React.forwardRef<HTMLDivElement, QRCodeProps>(
  ({ className = '', size = 'md', value, ...props }, ref) => {
    const sizes = {
      sm: 'w-32 h-32',
      md: 'w-48 h-48',
      lg: 'w-64 h-64',
    }
    
    return (
      <div
        ref={ref}
        className={`
          inline-flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <p className="text-xs text-gray-400 mt-2">QR Code</p>
          {value && <p className="text-xs text-gray-300 mt-1">{value}</p>}
        </div>
      </div>
    )
  }
)

QRCode.displayName = 'QRCode'
