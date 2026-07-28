'use client'

import { useMemo, useState } from 'react'
import { Button, Card, CardContent, Badge, Input } from '@shownest/ui'
import { getVendorEvents, getVendorRequests } from '@/features/vendor/service'

export default function VendorEventsPage() {
  const [query, setQuery] = useState('')
  const events = useMemo(() => getVendorEvents(), [])
  const requests = useMemo(() => getVendorRequests(), [])

  const filteredEvents = events.filter((event) =>
    `${event.title} ${event.venue}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#FFC107]/20 bg-gradient-to-br from-[#1b0f12] via-[#120a0c] to-[#2a1218] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#FFC107]">Events</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">My Events</h1>
          </div>
          <Button className="bg-gradient-to-r from-[#ba0036] via-[#d97706] to-[#ba0036] text-white">Create Event</Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-[#FFC107]/10 bg-[#140d10] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Event catalog</h2>
              <span className="text-sm text-gray-400">Search and filter</span>
            </div>
            <Input
              label="Search events"
              placeholder="Search by title or venue"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="mt-5 space-y-3">
              {filteredEvents.map((event) => (
                <div key={event.id} className="rounded-2xl border border-slate-600 bg-slate-900/95 p-4 shadow-sm shadow-slate-950/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{event.title}</h3>
                      <p className="mt-1 text-sm text-slate-300">{event.venue}</p>
                      <p className="mt-2 text-sm text-slate-400">{event.description}</p>
                    </div>
                    <Badge className="border-[#FFC107]/20 bg-[#FFC107]/15 text-[#FFC107]">{event.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#FFC107]/10 bg-[#140d10] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-white">Pending requests</h2>
            <div className="mt-5 space-y-3">
              {requests.filter((request) => request.status === 'pending').map((request) => (
                <div key={request.id} className="rounded-2xl border border-slate-600 bg-slate-900/95 p-4 shadow-sm shadow-slate-950/40">
                  <p className="text-sm font-semibold text-white">{request.eventInfo}</p>
                  <p className="mt-1 text-sm text-slate-300">{request.requestType.toUpperCase()} • {request.status}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
