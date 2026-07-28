'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Badge, Input, Tabs, TabsList, TabsTrigger, TabsContent, Skeleton, EmptyState, Separator } from '@shownest/ui'
import Link from 'next/link'

// Mock booking data
const mockBookings = [
  {
    id: 'SN-2026-78542',
    poster: 'https://via.placeholder.com/80x120/4F46E5/FFFFFF?text=Movie',
    title: 'The Grand Adventure',
    language: 'English',
    format: 'IMAX 2D',
    bookingDate: 'Jan 10, 2026',
    showDate: 'Sat, Jan 15, 2026',
    showtime: '6:30 PM',
    theatre: 'PVR Cinemas',
    screen: 'Screen 3',
    seats: ['H5', 'H6', 'H7'],
    status: 'upcoming',
  },
  {
    id: 'SN-2026-78123',
    poster: 'https://via.placeholder.com/80x120/10B981/FFFFFF?text=Movie',
    title: 'Action Hero',
    language: 'Hindi',
    format: '2D',
    bookingDate: 'Jan 5, 2026',
    showDate: 'Sun, Jan 10, 2026',
    showtime: '3:00 PM',
    theatre: 'INOX',
    screen: 'Screen 1',
    seats: ['A12', 'A13'],
    status: 'completed',
  },
  {
    id: 'SN-2026-77890',
    poster: 'https://via.placeholder.com/80x120/F59E0B/FFFFFF?text=Movie',
    title: 'Romantic Evening',
    language: 'English',
    format: '2D',
    bookingDate: 'Jan 2, 2026',
    showDate: 'Fri, Jan 5, 2026',
    showtime: '8:00 PM',
    theatre: 'Cinepolis',
    screen: 'Screen 2',
    seats: ['B5'],
    status: 'cancelled',
  },
  {
    id: 'SN-2026-77567',
    poster: 'https://via.placeholder.com/80x120/8B5CF6/FFFFFF?text=Movie',
    title: 'Sci-Fi Thriller',
    language: 'English',
    format: '4DX',
    bookingDate: 'Dec 28, 2025',
    showDate: 'Sat, Jan 20, 2026',
    showtime: '9:00 PM',
    theatre: 'PVR Cinemas',
    screen: 'Screen 5',
    seats: ['F8', 'F9', 'F10', 'F11'],
    status: 'upcoming',
  },
  {
    id: 'SN-2026-77234',
    poster: 'https://via.placeholder.com/80x120/EC4899/FFFFFF?text=Movie',
    title: 'Comedy Night',
    language: 'Hindi',
    format: '2D',
    bookingDate: 'Dec 20, 2025',
    showDate: 'Sun, Dec 25, 2025',
    showtime: '5:30 PM',
    theatre: 'INOX',
    screen: 'Screen 4',
    seats: ['C15', 'C16'],
    status: 'completed',
  },
]

type BookingStatus = 'all' | 'upcoming' | 'completed' | 'cancelled'

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDownloadTicket = (bookingId: string) => {
    // Placeholder for download ticket functionality
  }

  const handleCancelBooking = (bookingId: string) => {
    // Placeholder for cancel booking functionality
  }

  const handleReschedule = (bookingId: string) => {
    // Placeholder for reschedule booking functionality
  }

  const handleShareTicket = (bookingId: string) => {
    // Placeholder for share ticket functionality
  }

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesStatus = activeTab === 'all' || booking.status === activeTab
    const matchesSearch =
      searchQuery === '' ||
      booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.theatre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'success'
      case 'completed':
        return 'info'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming'
      case 'completed':
        return 'Completed'
      case 'cancelled':
        return 'Cancelled'
      default:
        return status
    }
  }

  const BookingCardSkeleton = () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Skeleton className="w-20 h-28 rounded" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            View and manage all your movie and event bookings
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total Bookings: {mockBookings.length}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            placeholder="Search by movie name, theatre, or booking ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Filters */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as BookingStatus)}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Bookings ({mockBookings.length})</TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming ({mockBookings.filter(b => b.status === 'upcoming').length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({mockBookings.filter(b => b.status === 'completed').length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({mockBookings.filter(b => b.status === 'cancelled').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="space-y-4">
                <BookingCardSkeleton />
                <BookingCardSkeleton />
                <BookingCardSkeleton />
              </div>
            ) : filteredBookings.length === 0 ? (
              <EmptyState
                icon={
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                }
                title="No Bookings Found"
                description={
                  searchQuery
                    ? 'No bookings match your search criteria'
                    : 'You have no bookings in this category'
                }
                action={
                  <div className="flex gap-3">
                    <Link href="/movies">
                      <Button variant="primary">Browse Movies</Button>
                    </Link>
                    <Link href="/events">
                      <Button variant="outline">Browse Events</Button>
                    </Link>
                  </div>
                }
              />
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <img
                          src={booking.poster}
                          alt={booking.title}
                          className="w-20 h-28 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {booking.title}
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="info">{booking.language}</Badge>
                                <Badge variant="default">{booking.format}</Badge>
                                <Badge variant={getStatusBadgeVariant(booking.status)}>
                                  {getStatusLabel(booking.status)}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">{booking.id}</p>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600">Booking Date</p>
                              <p className="font-medium text-gray-900">{booking.bookingDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Show Date</p>
                              <p className="font-medium text-gray-900">{booking.showDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Showtime</p>
                              <p className="font-medium text-gray-900">{booking.showtime}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Theatre</p>
                              <p className="font-medium text-gray-900">{booking.theatre}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Screen</p>
                              <p className="font-medium text-gray-900">{booking.screen}</p>
                            </div>
                            <div className="col-span-2 md:col-span-3">
                              <p className="text-gray-600">Seats</p>
                              <p className="font-medium text-gray-900">{booking.seats.join(', ')}</p>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="flex flex-wrap gap-2">
                            <Link href={`/booking/confirmation/${booking.id}`}>
                              <Button variant="primary" size="sm">
                                View Details
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadTicket(booking.id)}
                            >
                              Download Ticket
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShareTicket(booking.id)}
                            >
                              Share Ticket
                            </Button>
                            {booking.status === 'upcoming' && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleReschedule(booking.id)}
                                >
                                  Reschedule
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCancelBooking(booking.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Cancel Booking
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {!isLoading && filteredBookings.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="primary" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
