'use client'

import { Card, CardContent, Badge } from '@shownest/ui'

export default function VendorSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#FFC107]/20 bg-gradient-to-br from-[#1b0f12] via-[#120a0c] to-[#2a1218] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#FFC107]">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Vendor Settings</h1>
        </div>
      </div>

      <Card className="border-sky-400/20 bg-slate-900/95 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-600 bg-slate-900/95 p-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Approval workflow</h2>
              <p className="mt-1 text-sm text-slate-300">All vendor changes enter a pending request queue.</p>
            </div>
            <Badge className="border-[#FFC107]/20 bg-[#FFC107]/10 text-[#FFC107]">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-slate-600 bg-slate-900/95 p-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Notification alerts</h2>
              <p className="mt-1 text-sm text-slate-300">Email and in-app notifications are ready for future backend sync.</p>
            </div>
            <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">Configured</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
