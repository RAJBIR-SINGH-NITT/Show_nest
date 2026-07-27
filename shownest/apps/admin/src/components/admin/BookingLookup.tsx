'use client'

import { useMemo, useState } from 'react'
import { SupportDashboardCard } from '@/components/admin/SupportDashboardCard'
import { getBookingById } from '@/services/admin/operationalService'
import { Modal, StatusBadge, TextInputField } from '@/components/admin'

export function BookingLookup() {
  const [query, setQuery] = useState('')
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const booking = useMemo(() => {
    if (!query.trim()) return null
    return getBookingById(query.trim())
  }, [query])

  const handleAction = () => {
    setConfirmOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <TextInputField label="Booking ID / Customer / Email / Phone" value={query} onChange={setQuery} placeholder="Try BK-101 or Riya Sharma" />
        <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">
          <p className="font-semibold text-[#281718]">Lookup Help</p>
          <p className="mt-2">Search by booking identifier, customer name, email, or phone number. Mock results are returned from the existing operational service.</p>
        </div>
      </div>

      {booking ? (
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-[#281718]">Booking Summary</p>
                <p className="mt-1 text-sm text-[#5c3f41]">{booking.movie}</p>
              </div>
              <StatusBadge status={booking.status === 'confirmed' ? 'Confirmed' : booking.status === 'pending' ? 'Pending' : 'Cancelled'} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SupportDashboardCard title="Customer" value={booking.customer} description="Primary owner" />
              <SupportDashboardCard title="Venue" value={booking.venue} description="Assigned venue" />
              <SupportDashboardCard title="Showtime" value={booking.showtime} description="Scheduled slot" />
              <SupportDashboardCard title="Seats" value={booking.seats} description="Reserved seats" />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SupportDashboardCard title="Payment Status" value={booking.paymentStatus} description="Current gateway state" />
              <SupportDashboardCard title="Refund Status" value="Pending review" description="Support queue" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => { setSelectedBookingId(booking.id); handleAction() }} className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 text-sm text-[#5c3f41]">View Booking</button>
              <button onClick={() => setConfirmOpen(true)} className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 text-sm text-[#5c3f41]">Resend Ticket</button>
              <button onClick={() => setConfirmOpen(true)} className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 text-sm text-[#5c3f41]">Initiate Refund</button>
              <button onClick={() => setConfirmOpen(true)} className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 text-sm text-[#5c3f41]">Copy Details</button>
            </div>
          </div>

          <div className="space-y-4">
            <SupportDashboardCard title="Timeline" value="Booked 2h ago" description="Latest update from support operations" />
            <SupportDashboardCard title="Internal Notes" value="Customer requested follow-up" description="Tagged to support staff" />
            <SupportDashboardCard title="Audit Trail" value="3 events" description="Support and finance review" />
          </div>
        </div>
      ) : null}

      <Modal open={confirmOpen} title="Support Action" onClose={() => setConfirmOpen(false)} footer={(
        <>
          <button onClick={() => setConfirmOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={() => setConfirmOpen(false)} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Confirm</button>
        </>
      )}>
        <p className="text-sm text-[#5c3f41]">This mock action is ready for the support workflow and will be wired to the service layer in later phases.</p>
      </Modal>
    </div>
  )
}
