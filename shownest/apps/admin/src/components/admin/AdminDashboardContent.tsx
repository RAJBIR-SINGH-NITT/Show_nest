import Link from 'next/link'
import {
  AdminCard,
  AnalyticsCard,
  ChartPlaceholder,
  DataTable,
  HealthIndicator,
  MetricCard,
  NotificationList,
  PageHeader,
  QuickActionCard,
  StatusBadge,
  Timeline,
} from '@/components/admin'
import {
  getDashboardActivities,
  getDashboardMetrics,
  getDashboardNotifications,
  getQuickActions,
  getServiceHealth,
  getUpcomingEvents,
} from '@/services/admin/dashboardService'

const bookingColumns = [
  { key: 'id', label: 'Booking ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'item', label: 'Movie/Event' },
  { key: 'venue', label: 'Venue' },
  { key: 'showtime', label: 'Showtime' },
  { key: 'seats', label: 'Seats' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'time', label: 'Booking Time' },
  { key: 'action', label: 'Actions' },
]

const recentBookings = [
  {
    id: 'B-1042',
    customer: 'Riya Sharma',
    item: 'The Grand Adventure',
    venue: 'PVR Phoenix',
    showtime: '8:30 PM',
    seats: '2',
    amount: '₹1,500',
    status: <StatusBadge status="Confirmed" />,
    time: '08:24',
    action: <Link href="/admin/bookings" className="text-sm font-semibold text-[#ba0036]">View</Link>,
  },
  {
    id: 'B-1043',
    customer: 'Arjun Rao',
    item: 'Neon Horizon Live',
    venue: 'Jio World Garden',
    showtime: '7:00 PM',
    seats: '4',
    amount: '₹3,200',
    status: <StatusBadge status="Pending" />,
    time: '09:11',
    action: <Link href="/admin/bookings" className="text-sm font-semibold text-[#ba0036]">View</Link>,
  },
  {
    id: 'B-1044',
    customer: 'Pooja Nair',
    item: 'Sports Finale',
    venue: 'Wankhede Stadium',
    showtime: '6:45 PM',
    seats: '6',
    amount: '₹7,800',
    status: <StatusBadge status="Refund Pending" />,
    time: '10:02',
    action: <Link href="/admin/refunds" className="text-sm font-semibold text-[#ba0036]">Review</Link>,
  },
]

export function AdminDashboardContent() {
  const metrics = getDashboardMetrics()
  const activities = getDashboardActivities()
  const notifications = getDashboardNotifications()
  const upcomingEvents = getUpcomingEvents()
  const health = getServiceHealth()
  const quickActions = getQuickActions()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Command center for catalog, bookings, venue operations, and system health."
        action={<Link href="/admin/reports" className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-4 py-2 text-sm font-semibold text-[#ba0036]">View Reports</Link>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            description={metric.description}
            trend={metric.trend}
            icon={metric.icon}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <AnalyticsCard title="Revenue Trend" description="Front-end placeholder for future charting integration.">
          <ChartPlaceholder title="Revenue (₹M)" values={[{ label: 'Mon', value: 4 }, { label: 'Tue', value: 6 }, { label: 'Wed', value: 5 }, { label: 'Thu', value: 8 }, { label: 'Fri', value: 7 }, { label: 'Sat', value: 10 }]} />
        </AnalyticsCard>

        <AnalyticsCard title="Bookings Trend" description="Live occupancy signals for the day.">
          <ChartPlaceholder title="Bookings" values={[{ label: '08', value: 2 }, { label: '10', value: 4 }, { label: '12', value: 5 }, { label: '14', value: 6 }, { label: '16', value: 8 }, { label: '18', value: 9 }]} />
        </AnalyticsCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AnalyticsCard title="Top Venues" description="Venue demand snapshot.">
          <div className="space-y-3">
            {['PVR Phoenix', 'Jio World Garden', 'Wankhede Stadium'].map((venue, index) => (
              <div key={venue} className="flex items-center justify-between rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] px-4 py-3">
                <div>
                  <p className="font-semibold text-[#281718]">{venue}</p>
                  <p className="text-sm text-[#5c3f41]">{index + 1}0{index + 1}% share</p>
                </div>
                <StatusBadge status="High Demand" />
              </div>
            ))}
          </div>
        </AnalyticsCard>

        <AnalyticsCard title="Most Popular Movies" description="Catalog traction by title.">
          <div className="space-y-3">
            {['The Grand Adventure', 'Sci-Fi Epic', 'Romantic Comedy'].map((film) => (
              <div key={film} className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] px-4 py-3 text-sm text-[#281718]">
                {film}
              </div>
            ))}
          </div>
        </AnalyticsCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <AdminCard title="Recent Bookings" description="Operational overview of the latest reservations.">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <input className="min-w-[220px] flex-1 rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-4 py-2 text-sm outline-none" placeholder="Search bookings" />
              <button className="rounded-full border border-[#e5bdbe] bg-white px-3 py-2 text-sm text-[#5c3f41]">Filter</button>
            </div>
            <DataTable columns={bookingColumns} rows={recentBookings} />
          </div>
        </AdminCard>

        <div className="space-y-6">
          <AdminCard title="Recent Activities" description="A timeline of admin and operations events.">
            <Timeline items={activities} />
          </AdminCard>
          <AdminCard title="Notifications" description="Recent operational alerts.">
            <NotificationList items={notifications} />
          </AdminCard>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminCard title="Quick Actions" description="Fast navigation to key admin modules.">
          <div className="grid gap-3 md:grid-cols-2">
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} title={action.title} description={action.description} href={action.href} icon={action.icon} />
            ))}
          </div>
        </AdminCard>

        <AdminCard title="System Health" description="Mock service monitoring panel.">
          <div className="grid gap-3">
            {health.map((service) => (
              <HealthIndicator key={service.id} label={service.name} status={service.status} detail={service.detail} />
            ))}
          </div>
        </AdminCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard title="Upcoming Events" description="Shows and events due soon.">
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex flex-col gap-3 rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-semibold text-[#281718]">{event.title}</p>
                  <p className="text-sm text-[#5c3f41]">{event.venue}</p>
                </div>
                <div className="text-sm text-[#5c3f41]">
                  <p>{event.date} · {event.time}</p>
                  <p>{event.bookingsCount} bookings · {event.occupancy}% occupancy</p>
                </div>
                <StatusBadge status={event.status} />
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Most Popular Events" description="Event interest across the network.">
          <div className="space-y-3">
            {['Neon Horizon Live', 'Stand-up Comedy Arena', 'Symphony Under The Stars'].map((event) => (
              <div key={event} className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] px-4 py-3 text-sm text-[#281718]">
                {event}
              </div>
            ))}
          </div>
        </AdminCard>
      </section>
    </div>
  )
}
