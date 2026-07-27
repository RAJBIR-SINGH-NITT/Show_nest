'use client'

import { useMemo } from 'react'
import { ChartPlaceholder, DetailSection, ExportToolbar, MetricCard, PageHeader, ReportCard } from '@/components/admin'
import { getReportsMetrics } from '@/services/admin/governanceService'

export default function ReportsPage() {
  const metrics = useMemo(() => getReportsMetrics(), [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Review revenue, occupancy, bookings, and audience trends with enterprise-style dashboards."
        action={<ExportToolbar title="Export Overview" />}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <ReportCard key={item.id} title={item.title} value={item.value} description={item.description} tone={item.tone} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Revenue Overview" description="Rolling revenue trend with comparison context.">
          <ChartPlaceholder title="Revenue" values={[{ label: 'Jan', value: 3 }, { label: 'Feb', value: 4 }, { label: 'Mar', value: 5 }, { label: 'Apr', value: 6 }, { label: 'May', value: 7 }, { label: 'Jun', value: 8 }]} />
        </DetailSection>
        <DetailSection title="Booking Trends" description="Daily demand and conversion signals.">
          <ChartPlaceholder title="Bookings" values={[{ label: 'Mon', value: 2 }, { label: 'Tue', value: 3 }, { label: 'Wed', value: 4 }, { label: 'Thu', value: 5 }, { label: 'Fri', value: 6 }, { label: 'Sat', value: 8 }]} />
        </DetailSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DetailSection title="Movie Performance" description="Top-performing titles and demand by city.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">The Grand Adventure · 92% occupancy</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Neon Horizon Live · 87% occupancy</div>
          </div>
        </DetailSection>
        <DetailSection title="Event Performance" description="Event schedules and converted audience demand.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Sports Finale · 74% attendance</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Cultural Gala · 68% attendance</div>
          </div>
        </DetailSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DetailSection title="Venue Performance" description="Venue utilization by city and premiere venue.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">PVR Phoenix · 84% utilization</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Jio World Garden · 79% utilization</div>
          </div>
        </DetailSection>
        <DetailSection title="Top Cities & Peak Hours" description="Demand peaks and city growth patterns.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Mumbai · 38% of bookings</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Peak hour · 7:00 PM</div>
          </div>
        </DetailSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DetailSection title="Popular Genres" description="Audience preferences by content type.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Action · 34%</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Live Events · 27%</div>
          </div>
        </DetailSection>
        <DetailSection title="Most Active Users" description="High-value users and frequency patterns.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Riya Sharma · 12 bookings</div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">Arjun Rao · 9 bookings</div>
          </div>
        </DetailSection>
      </div>
    </div>
  )
}
