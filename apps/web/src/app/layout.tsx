import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShowNest Vendor Preview',
  description: 'Vendor preview experience for the ShowNest portal.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-[#0a0808]">
      <body className="flex flex-col min-h-screen bg-[#0a0808] text-white antialiased">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
