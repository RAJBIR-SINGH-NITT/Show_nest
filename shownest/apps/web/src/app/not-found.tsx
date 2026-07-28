'use client'

import { Button, Card, CardContent } from '@shownest/ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fff8f7] flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white border-[#e5bdbe] rounded-2xl p-8 text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 bg-[#ffe9e9] rounded-full flex items-center justify-center mx-auto text-[#ba0036] text-3xl font-bold font-display">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-display text-[#281718]">Page Not Found</h1>
          <p className="text-sm text-[#5c3f41]">
            The ticket, show, or page you were looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <Link href="/">
            <Button variant="primary" size="lg" className="w-full bg-[#ba0036] hover:bg-[#e21e4a] text-white">
              Back to Home
            </Button>
          </Link>
          <Link href="/movies">
            <Button variant="outline" size="lg" className="w-full border-[#e5bdbe] text-[#281718]">
              Browse Movies
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
