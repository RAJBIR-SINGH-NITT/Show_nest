'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BookingTimeline, DetailSection, InformationCard, PageHeader, StatusBadge } from '@/components/admin'
import { getRefundById } from '@/services/admin/operationalService'

export default function RefundApprovalPage() {
  const params = useParams<{ refundId: string }>()
  const refund = getRefundById(params.refundId)

  if (!refund) {
    return <div className="rounded-2xl border border-[#e5bdbe] bg-white p-8 text-[#5c3f41]">Refund not found.</div>
  }

  const timeline = [
    { id: 'r1', title: 'Refund Requested', detail: 'Customer raised a refund request after the schedule change.', time: '09:30' },
    { id: 'r2', title: 'Reviewer Assigned', detail: 'Operations reviewer picked up the request.', time: '09:45' },
    { id: 'r3', title: 'Decision Pending', detail: 'Approval decision is waiting for confirmation.', time: '10:10' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Refund Approval ${refund.id}`}
        description="Approve or reject a refund request with a structured review panel."
        action={<Link href="/admin/refunds" className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-4 py-2 text-sm font-semibold text-[#ba0036]">Back to Refunds</Link>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Refund Summary" description="Key refund request information.">
          <div className="grid gap-4 md:grid-cols-2">
            <InformationCard title="Refund Status" value={<span className="inline-flex"><StatusBadge status={refund.status === 'approved' ? 'Approved' : refund.status === 'rejected' ? 'Rejected' : refund.status === 'completed' ? 'Completed' : 'Pending'} /></span>} caption="Current approval state" />
            <InformationCard title="Requested Amount" value={`₹${refund.requestedAmount}`} caption="Requested by customer" />
            <InformationCard title="Approved Amount" value={`₹${refund.approvedAmount}`} caption="Approved or proposed refund" />
            <InformationCard title="Payment Method" value={refund.paymentMethod} caption="Refund destination" />
          </div>
        </DetailSection>

        <DetailSection title="Customer & Booking" description="Customer and booking context for the review.">
          <div className="grid gap-4">
            <InformationCard title="Customer" value={refund.customer} caption="Refund request owner" />
            <InformationCard title="Booking ID" value={refund.bookingId} caption="Related reservation" />
            <InformationCard title="Assigned Reviewer" value={refund.reviewer} caption="Current owner" />
          </div>
        </DetailSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Refund Details" description="Reason and policy information.">
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">
              <p className="font-semibold text-[#281718]">Reason</p>
              <p className="mt-2">{refund.reason}</p>
            </div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">
              <p className="font-semibold text-[#281718]">Refund Policy Placeholder</p>
              <p className="mt-2">Policy guidelines will be connected here in a later phase.</p>
            </div>
          </div>
        </DetailSection>

        <DetailSection title="Decision Panel" description="Approve or reject the request.">
          <div className="space-y-4">
            <textarea className="min-h-[110px] w-full rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 text-sm outline-none" placeholder="Approval notes" />
            <textarea className="min-h-[110px] w-full rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 text-sm outline-none" placeholder="Reject notes" />
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Approve</button>
              <button className="rounded-full border border-[#e5bdbe] bg-white px-4 py-2 text-sm text-[#5c3f41]">Reject</button>
            </div>
          </div>
        </DetailSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Timeline" description="Refund review activity history.">
          <BookingTimeline items={timeline} />
        </DetailSection>

        <DetailSection title="History" description="Recent review events.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">Request captured and routed to the reviewer queue.</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">Policy placeholder is now available for final approval.</div>
          </div>
        </DetailSection>
      </div>
    </div>
  )
}
