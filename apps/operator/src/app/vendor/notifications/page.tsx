'use client'

import { useMemo } from 'react'
import { Card, CardContent } from '@shownest/ui'
import { getVendorNotifications } from '@/features/vendor/service'

export default function VendorNotificationsPage() {
  const notifications = useMemo(() => getVendorNotifications(), [])

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#FFC107]/20 bg-gradient-to-br from-[#1b0f12] via-[#120a0c] to-[#2a1218] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#FFC107]">Notifications</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Vendor Inbox</h1>
        </div>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="border-sky-400/20 bg-slate-900/95 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{notification.title}</h2>
                  <p className="mt-2 text-sm text-slate-300">{notification.message}</p>
                </div>
                <span className="text-sm text-slate-300">{new Date(notification.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
