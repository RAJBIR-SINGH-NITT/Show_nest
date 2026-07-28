import * as React from 'react'
import { Button } from './Button'
import { ShowNestLogo } from './ShowNestLogo'
import Link from 'next/link'

export interface NavbarProps {
  logo?: React.ReactNode
  currentCity?: string
  children?: React.ReactNode
  className?: string
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ logo, currentCity = 'Mumbai', children, className = '' }, ref) => {
    return (
      <nav
        ref={ref as any}
        className={`sticky top-0 z-50 bg-[#120a0c]/85 backdrop-blur-xl border-b border-[#FFC107]/20 shadow-2xl ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo & City Selection (Untouched) */}
            <div className="flex items-center gap-8">
              <Link href="/">
                {logo || <ShowNestLogo size="md" />}
              </Link>

              {/* City Selection Shortcut with Gold Pill */}
              <Link href="/cities">
                <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/10 transition-all duration-200 cursor-pointer border border-[#FFC107]/30 backdrop-blur-md shadow-sm">
                  <span>📍</span>
                  <span>{currentCity}</span>
                  <span className="text-[10px] text-amber-400">▼</span>
                </div>
              </Link>
            </div>

            {/* Middle: Navigation Links with Gold Hover & Underline Indicators */}
            <div className="hidden md:flex items-center gap-10">
              <Link
                href="/movies"
                className="relative py-1.5 text-gray-200 hover:text-[#FFC107] font-semibold text-sm tracking-wide transition-all duration-200 ease-in-out group flex items-center"
              >
                <span>Movies</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FFC107] via-amber-400 to-[#ba0036] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out rounded-full shadow-[0_0_8px_#FFC107]" />
              </Link>

              <Link
                href="/events"
                className="relative py-1.5 text-gray-200 hover:text-[#FFC107] font-semibold text-sm tracking-wide transition-all duration-200 ease-in-out group flex items-center"
              >
                <span>Events</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FFC107] via-amber-400 to-[#ba0036] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out rounded-full shadow-[0_0_8px_#FFC107]" />
              </Link>

              <Link
                href="/sports"
                className="relative py-1.5 text-gray-200 hover:text-[#FFC107] font-semibold text-sm tracking-wide transition-all duration-200 ease-in-out group flex items-center"
              >
                <span>Sports</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FFC107] via-amber-400 to-[#ba0036] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out rounded-full shadow-[0_0_8px_#FFC107]" />
              </Link>

              <Link
                href="/search"
                className="relative py-1.5 text-gray-200 hover:text-[#FFC107] font-semibold text-sm tracking-wide transition-all duration-200 ease-in-out group flex items-center"
              >
                <span>Search</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FFC107] via-amber-400 to-[#ba0036] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out rounded-full shadow-[0_0_8px_#FFC107]" />
              </Link>

              {children}
            </div>

            {/* Right: Button & Search Action Hierarchy */}
            <div className="flex items-center gap-4">
              {/* Compact Premium Search Button Input */}
              <Link href="/search" className="hidden lg:flex items-center">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(20,20,20,0.7)] border border-[#FFC107]/30 hover:border-[#FFC107]/60 text-xs text-gray-300 hover:text-white transition-all duration-200 ease-in-out shadow-sm backdrop-blur-md cursor-pointer group">
                  <span className="text-[#FFC107] group-hover:scale-110 transition-transform duration-200">🔍</span>
                  <span className="font-medium">Search titles...</span>
                </div>
              </Link>

              {/* My Account Glassmorphism Button */}
              <Link href="/account">
                <Button
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center justify-center bg-white/5 border border-white/20 hover:border-[#FFC107] text-gray-100 hover:text-[#FFC107] hover:bg-[#FFC107]/10 text-xs font-medium tracking-wide rounded-xl px-4 py-2 transition-all duration-200 ease-in-out backdrop-blur-md shadow-sm"
                >
                  My Account
                </Button>
              </Link>

              {/* Sign In Primary CTA with Gold/Red Glow */}
              <Link href="/auth/login">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#ba0036] via-[#d97706] to-[#ba0036] hover:brightness-110 text-white font-bold rounded-xl text-xs px-5 py-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_22px_rgba(245,158,11,0.5)] transition-all duration-200 ease-in-out"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
)

Navbar.displayName = 'Navbar'
