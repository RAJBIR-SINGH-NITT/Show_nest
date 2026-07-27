'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { DetailSection, InformationCard, PageHeader, StatusBadge } from '@/components/admin'
import { getOperatorById } from '@/services/admin/operatorService'

export default function OperatorDetailsPage() {
  const params = useParams<{ operatorId: string }>()
  const operator = getOperatorById(params.operatorId)

  if (!operator) {
    return <div className="rounded-2xl border border-[#e5bdbe] bg-white p-8 text-[#5c3f41]">Operator not found.</div>
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${operator.name}`}
        description="Operator account context, assignments, and audit placeholder panels."
        action={<Link href="/admin/operators" className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-4 py-2 text-sm font-semibold text-[#ba0036]">Back to Operators</Link>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Basic Information" description="Primary operator identity and access details.">
          <div className="grid gap-4 md:grid-cols-2">
            <InformationCard title="Current Status" value={<StatusBadge status={operator.status === 'active' ? 'Active' : operator.status === 'suspended' ? 'Suspended' : 'Inactive'} />} caption="Operational account state" />
            <InformationCard title="Login Email" value={operator.email} caption="Primary sign-in address" />
            <InformationCard title="Phone Number" value={operator.phone} caption="Direct contact line" />
            <InformationCard title="Assigned Role" value={operator.role} caption="Current role assignment" />
          </div>
        </DetailSection>

        <DetailSection title="Company Information" description="Operator organization and venue ownership context.">
          <div className="grid gap-4">
            <InformationCard title="Company" value={operator.company} caption="Business organization" />
            <InformationCard title="Assigned Venue" value={operator.venue} caption="Primary venue assignment" />
            <InformationCard title="Notes" value={operator.notes} caption="Operational notes" />
          </div>
        </DetailSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Assignments" description="Venue, screen, show, and event coverage.">
          <div className="grid gap-4 md:grid-cols-2">
            <InformationCard title="Assigned Venues" value="Phoenix Venue, West Gate" caption="Venue access" />
            <InformationCard title="Assigned Screens" value="Screen 01, Screen 03" caption="Screen coverage" />
            <InformationCard title="Managed Shows" value="Midnight Premiere, Live Sports" caption="Managed experiences" />
            <InformationCard title="Assigned Events" value="Launch Night, Fan Meetup" caption="Event assignments" />
          </div>
        </DetailSection>

        <DetailSection title="Permissions" description="Role-based access matrix for operator actions.">
          <div className="grid gap-4">
            <InformationCard title="Assigned Permissions" value="View tickets, manage show schedules, approve check-in" caption="Mocked permissions" />
            <InformationCard title="Assignment Timeline" value="Added 3 days ago • Role updated 1 day ago" caption="Administrative history" />
          </div>
        </DetailSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Recent Activity" description="Recent operator activity highlights.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">Activated venue access for the evening premiere.</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">Reviewed check-in queue ahead of the live event.</div>
          </div>
        </DetailSection>

        <DetailSection title="Audit & History" description="Placeholder panels for login history and audit history.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">Login History placeholder</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">Audit History placeholder</div>
          </div>
        </DetailSection>
      </div>
    </div>
  )
}
