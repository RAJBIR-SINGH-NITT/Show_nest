import * as React from 'react'
import Link from 'next/link'

export interface FooterProps {
  children?: React.ReactNode
  className?: string
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ children, className = '' }, ref) => {
    return (
      <footer
        ref={ref as any}
        className={`bg-[#281718] text-[#ffe9e9] ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#ba0036] rounded-xl flex items-center justify-center font-bold text-white font-display">
                  S
                </div>
                <span className="text-2xl font-bold font-display text-white">ShowNest</span>
              </div>
              <p className="text-sm text-[#ffe9e9]/70 leading-relaxed">
                India&apos;s premier entertainment ticketing platform. Discover movies, live concerts, stand-up comedy, and live sports near you.
              </p>
            </div>

            {/* Quick Categories */}
            <div>
              <h3 className="text-white font-bold font-display text-base mb-4">Categories</h3>
              <ul className="space-y-2.5 text-sm text-[#ffe9e9]/80">
                <li><Link href="/movies" className="hover:text-[#ba0036] transition-colors">Movies in Cinemas</Link></li>
                <li><Link href="/events" className="hover:text-[#ba0036] transition-colors">Live Concerts & Events</Link></li>
                <li><Link href="/sports/mumbai/t20-international" className="hover:text-[#ba0036] transition-colors">Sports Matches</Link></li>
                <li><Link href="/cities" className="hover:text-[#ba0036] transition-colors">Popular Cities</Link></li>
              </ul>
            </div>

            {/* Account & Support */}
            <div>
              <h3 className="text-white font-bold font-display text-base mb-4">Account & Help</h3>
              <ul className="space-y-2.5 text-sm text-[#ffe9e9]/80">
                <li><Link href="/account/bookings" className="hover:text-[#ba0036] transition-colors">My Ticket Bookings</Link></li>
                <li><Link href="/account/wishlist" className="hover:text-[#ba0036] transition-colors">Saved Wishlist</Link></li>
                <li><Link href="/account/loyalty" className="hover:text-[#ba0036] transition-colors">Loyalty Rewards</Link></li>
                <li><Link href="/account/notification-settings" className="hover:text-[#ba0036] transition-colors">Preferences & Alerts</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold font-display text-base mb-4">Legal & Security</h3>
              <ul className="space-y-2.5 text-sm text-[#ffe9e9]/80">
                <li><a href="#" className="hover:text-[#ba0036] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#ba0036] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#ba0036] transition-colors">Cancellation & Refund Policy</a></li>
                <li><a href="#" className="hover:text-[#ba0036] transition-colors">Security Safeguards</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#ffe9e9]/60">
            <p>© 2026 ShowNest Ticketing Platform. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Verified SSL Encryption</span>
              <span>PCI-DSS Compliant</span>
            </div>
          </div>
        </div>

        {children}
      </footer>
    )
  }
)

Footer.displayName = 'Footer'
