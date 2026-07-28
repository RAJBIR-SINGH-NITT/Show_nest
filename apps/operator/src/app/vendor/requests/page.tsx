'use client'

import { useMemo } from 'react'
import { Card, CardContent, Badge } from '@shownest/ui'
import { getVendorRequests } from '@/features/vendor/service'

export default function VendorRequestsPage() {
  const requests = useMemo(() => getVendorRequests(), [])

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#FFC107]/20 bg-gradient-to-br from-[#1b0f12] via-[#120a0c] to-[#2a1218] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#FFC107]">Requests</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Event Requests</h1>
        </div>
      </div>

      <div className="grid gap-6">
        {requests.map((request) => (
          <Card key={request.id} className="border-sky-400/20 bg-slate-900/95 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-white">{request.eventInfo}</h2>
                    <Badge className="border-[#FFC107]/20 bg-[#FFC107]/10 text-[#FFC107]">{request.requestType}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{request.newData}</p>
                  <p className="mt-3 text-sm text-slate-400">Vendor: {request.vendorEmail}</p>
                </div>
                <Badge className={request.status === 'approved' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : request.status === 'rejected' ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-[#FFC107]/20 bg-[#FFC107]/10 text-[#FFC107]'}>{request.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
