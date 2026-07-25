import type { Metadata } from 'next'
import './globals.css'
import { Navbar, Footer } from '@shownest/ui'

export const metadata: Metadata = {
  title: 'ShowNest - Movies, Events & Sports Tickets',
  description: 'Book movie tickets, live concerts, comedy shows, and sports event tickets online with ShowNest.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-[#0a0808]">
      <body className="flex flex-col min-h-screen bg-[#0a0808] text-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
