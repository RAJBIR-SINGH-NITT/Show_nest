'use client'

import { Card, CardContent, Badge } from '@shownest/ui'

export default function VendorProfilePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#FFC107]/20 bg-gradient-to-br from-[#1b0f12] via-[#120a0c] to-[#2a1218] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#FFC107]">Profile</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Vendor Profile</h1>
        </div>
      </div>

      <Card className="border-sky-400/20 bg-slate-900/95 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">ShowNest Vendor Co.</h2>
              <p className="mt-1 text-sm text-slate-200">Premium event partner</p>
            </div>
            <Badge className="border-[#FFC107]/20 bg-[#FFC107]/10 text-[#FFC107]">Verified</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-600 bg-slate-900/95 p-4">
              <p className="text-sm text-slate-300">Primary contact</p>
              <p className="mt-2 text-white">vendor@example.com</p>
            </div>
            <div className="rounded-2xl border border-slate-600 bg-slate-900/95 p-4">
              <p className="text-sm text-slate-300">Approval mode</p>
              <p className="mt-2 text-white">Admin review required</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
