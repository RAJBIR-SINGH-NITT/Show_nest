'use client'

import { Card, CardContent, Badge, Button } from '@shownest/ui'

const requests = [
  {
    id: 'req-1',
    vendor: 'BrightLane Events',
    type: 'CREATE_EVENT',
    status: 'Pending',
  },
  {
    id: 'req-2',
    vendor: 'CinePulse',
    type: 'UPDATE_EVENT',
    status: 'Pending',
  },
]

export default function AdminVendorRequestsPage() {
  return (
    <div className="min-h-screen bg-[#0a0808] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[28px] border border-[#FFC107]/20 bg-gradient-to-br from-[#1b0f12] via-[#120a0c] to-[#2a1218] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
          <h1 className="text-3xl font-semibold text-white">Vendor Requests</h1>
          <p className="mt-2 text-sm text-gray-400">Review vendor submissions and approve or reject them.</p>
        </div>

        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="border-[#FFC107]/10 bg-[#140d10] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{request.vendor}</h2>
                  <p className="mt-1 text-sm text-gray-400">{request.type}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border-[#FFC107]/20 bg-[#FFC107]/10 text-[#FFC107]">{request.status}</Badge>
                  <Button className="bg-emerald-600 text-white">Approve</Button>
                  <Button variant="outline" className="border-red-400/40 text-red-300">Reject</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
