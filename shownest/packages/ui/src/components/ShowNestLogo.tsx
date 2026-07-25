import * as React from 'react'

export interface ShowNestLogoProps {
  className?: string
  iconOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const ShowNestLogo: React.FC<ShowNestLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  }

  return (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      {/* Cinema & Filmmaking Vector Brand Logo Icon */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-br from-amber-400 via-[#ba0036] to-amber-500 p-[1.5px] shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-300`}
      >
        <div className="w-full h-full bg-[#1b0d10] rounded-[10.5px] flex items-center justify-center relative overflow-hidden">
          {/* Gold + Coral Vector Film Reel & Cinema Ticket Icon */}
          <svg
            className="w-3/5 h-3/5 text-amber-400 group-hover:text-amber-300 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Film Reel Outer Ring */}
            <circle cx="12" cy="12" r="9" stroke="url(#logo-grad)" strokeWidth="2" />
            {/* Center Reel Hub */}
            <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
            {/* 4 Circular Reel Aperture Holes */}
            <circle cx="12" cy="6.5" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="12" cy="17.5" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="6.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="17.5" cy="12" r="1.3" fill="currentColor" stroke="none" />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="logo-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f59e0b" />
                <stop offset="0.5" stopColor="#ba0036" />
                <stop offset="1" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {!iconOnly && (
        <span className={`font-bold font-display ${textSizes[size]} tracking-tight text-white`}>
          Show<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-[#ba0036]">Nest</span>
        </span>
      )}
    </div>
  )
}
