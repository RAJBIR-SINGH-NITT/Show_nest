import type { Metadata } from 'next'
import VendorNav from './VendorNav'
import { Navbar, Footer } from '@shownest/ui'
import { RoleGate } from '@/shared/auth'

export const metadata: Metadata = {
  title: 'Vendor Portal | ShowNest',
  description: 'Vendor portal for event approvals and management.',
}

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGate role="vendor">
      <div className="min-h-screen bg-[#0a0808] text-white">
        <div className="border-b border-white/10 bg-[#080606]">
          <VendorNav />
        </div>
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
      </div>
    </RoleGate>
  )
}
