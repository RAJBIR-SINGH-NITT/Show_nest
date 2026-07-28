'use client'

import { useEffect } from 'react'
import { Button, Card } from '@shownest/ui'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#fff8f7] flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white border-[#e5bdbe] rounded-2xl p-8 text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-[#ba0036] text-3xl font-bold font-display">
          ⚠️
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-display text-[#281718]">Something Went Wrong</h1>
          <p className="text-sm text-[#5c3f41]">
            An unexpected error occurred while loading this page. Please try again.
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => reset()}
            className="w-full bg-[#ba0036] hover:bg-[#e21e4a] text-white"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/'}
            className="w-full border-[#e5bdbe] text-[#281718]"
          >
            Go to Homepage
          </Button>
        </div>
      </Card>
    </div>
  )
}
