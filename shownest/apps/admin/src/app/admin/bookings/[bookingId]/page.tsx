'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BookingTimeline, DetailSection, InformationCard, PageHeader, StatusBadge } from '@/components/admin'
import { getBookingById } from '@/services/admin/operationalService'

export default function BookingDetailsPage() {
  const params = useParams<{ bookingId: string }>()
  const booking = getBookingById(params.bookingId)

  if (!booking) {
    return <div className="rounded-2xl border border-[#e5bdbe] bg-white p-8 text-[#5c3f41]">Booking not found.</div>
  }

  const timeline = [
    { id: 't1', title: 'Booking Created', detail: 'Customer completed checkout and seat reservation.', time: '08:10' },
    { id: 't2', title: 'Payment Authorized', detail: 'Payment gateway confirmed the transaction.', time: '08:12' },
    { id: 't3', title: 'Ticket Issued', detail: 'Electronic ticket and QR were prepared for delivery.', time: '08:20' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Booking ${booking.id}`}
        description="Operational booking details, payment state, and timeline."
        action={<Link href="/admin/bookings" className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-4 py-2 text-sm font-semibold text-[#ba0036]">Back to Bookings</Link>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Booking Summary" description="Core booking context and current status.">
          <div className="grid gap-4 md:grid-cols-2">
            <InformationCard title="Booking Status" value={<span className="inline-flex"><StatusBadge status={booking.status === 'confirmed' ? 'Confirmed' : booking.status === 'cancelled' ? 'Cancelled' : 'Pending'} /></span>} caption="Current booking state" />
            <InformationCard title="Payment Status" value={booking.paymentStatus} caption="Gateway state" />
            <InformationCard title="Booking Source" value={booking.bookingSource} caption="Origin channel" />
            <InformationCard title="Seats" value={booking.seats} caption="Number of seats" />
          </div>
        </DetailSection>

        <DetailSection title="Customer Information" description="Primary customer context for support and fulfilment.">
          <div className="grid gap-4">
            <InformationCard title="Customer" value={booking.customer} caption="Primary booking owner" />
            <InformationCard title="Movie / Event" value={booking.movie} caption="Reserved experience" />
            <InformationCard title="Venue" value={booking.venue} caption="Physical location" />
          </div>
        </DetailSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Showtime & Seat Details" description="Event timing and assigned seats.">
          <div className="grid gap-4 md:grid-cols-2">
            <InformationCard title="Showtime" value={booking.showtime} caption="Reserved slot" />
            <InformationCard title="Booking Date" value={booking.bookingDate} caption="When the booking was made" />
            <InformationCard title="Payment Summary" value={`₹${booking.amount}`} caption="Gross booking value" />
            <InformationCard title="Taxes" value="₹120" caption="Included in total" />
          </div>
        </DetailSection>

        <DetailSection title="Payments & Fees" description="Pricing breakdown and service charges.">
          <div className="grid gap-4">
            <InformationCard title="Convenience Fee" value="₹80" caption="Platform processing fee" />
            <InformationCard title="Discounts" value="₹0" caption="No active promotions" />
            <InformationCard title="Promo Code" value="N/A" caption="No promo applied" />
          </div>
        </DetailSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Booking Timeline" description="Operational milestones around the reservation.">
          <BookingTimeline items={timeline} />
        </DetailSection>

        <DetailSection title="Audit History Placeholder" description="Future audit stream will plug into this panel.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">Booking held for review by operations team.</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">Customer support flagged duplicate booking request.</div>
          </div>
        </DetailSection>
      </div>
    </div>
  )
}
