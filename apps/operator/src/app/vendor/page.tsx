'use client'

import { Card, CardContent, Badge } from '@shownest/ui'
import Link from 'next/link'

const stats = [
  { label: 'Approved Events', value: '12', accent: 'from-amber-500/20 to-amber-500/5' },
  { label: 'Pending Requests', value: '3', accent: 'from-[#ba0036]/20 to-[#ba0036]/5' },
  { label: 'Rejected Requests', value: '1', accent: 'from-red-500/20 to-red-500/5' },
  { label: 'Notifications', value: '4', accent: 'from-emerald-500/20 to-emerald-500/5' },
]

const vendorEvents = [
  { title: 'Neon Horizon Live', venue: 'Jio World Garden', status: 'Approved' },
  { title: 'Midnight Cinema Nights', venue: 'PVR Phoenix', status: 'Pending' },
]

const requests = [
  { title: 'Create Event – Neon Horizon', status: 'Pending' },
  { title: 'Update Event – Midnight Cinema', status: 'Approved' },
]

const notifications = [
  { title: 'Request submitted', message: 'Your CREATE_EVENT request has been received.' },
  { title: 'Request approved', message: 'Your UPDATE_EVENT request was approved.' },
]

export default function VendorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0808] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="overflow-hidden rounded-[32px] border border-[#FFC107]/20 bg-slate-950 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge className="mb-4 border-[#FFC107]/20 bg-[#FFC107]/10 text-[#111827]">Vendor Portal</Badge>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Overview</h1>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-3">
              <Link
                href="/vendor/events"
                className="rounded-3xl bg-[#FFC107] px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-[#facc15]"
              >
                View events
              </Link>
              <Link
                href="/vendor/requests"
                className="rounded-3xl bg-[#FFC107] px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-[#facc15]"
              >
                View requests
              </Link>
              <Link
                href="/vendor/notifications"
                className="rounded-3xl bg-[#FFC107] px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-[#facc15]"
              >
                View notifications
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <Card key={item.label} className="border-[#FFC107]/20 bg-slate-900 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <CardContent className={`rounded-2xl bg-slate-950 p-6`}>
                <p className="text-sm text-gray-300">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Card className="border-[#FFC107]/20 bg-slate-900 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Events</h2>
                </div>
                <div className="mt-5 space-y-3">
                  {vendorEvents.map((event) => (
                    <div key={event.title} className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-white">{event.title}</h3>
                          <p className="mt-1 text-sm text-gray-300">{event.venue}</p>
                        </div>
                        <Badge className="border-[#FFC107]/20 bg-[#FFC107]/10 text-[#111827]">{event.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#FFC107]/20 bg-slate-900 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Requests</h2>
                </div>
                <div className="mt-5 space-y-3">
                  {requests.map((request) => (
                    <div key={request.title} className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-gray-200">{request.title}</p>
                        <Badge className="border-[#FFC107]/20 bg-[#FFC107]/10 text-[#111827]">{request.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-[#FFC107]/20 bg-slate-900 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white">Notifications</h2>
                <div className="mt-5 space-y-3">
                  {notifications.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-300">{item.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#FFC107]/20 bg-slate-900 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white">Profile & Settings</h2>
                <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm text-gray-200">
                  <p>Company: ShowNest Vendor Co.</p>
                  <p>Contact: vendor@shownest.com</p>
                  <p>Email alerts: Enabled</p>
                  <p>Review mode: Admin approval required</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
