'use client'

import { Button, Card, CardHeader, CardContent, Badge, Separator, Alert, QRCode, Timeline } from '@shownest/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock booking data
const mockBookingData = {
  bookingId: 'SN-2026-78542',
  status: 'upcoming',
  poster: 'https://via.placeholder.com/150x225/4F46E5/FFFFFF?text=Movie',
  title: 'The Grand Adventure',
  language: 'English',
  format: 'IMAX 2D',
  genre: 'Action, Adventure',
  duration: '2h 30m',
  rating: 'UA',
  theatre: 'PVR Cinemas',
  screen: 'Screen 3',
  address: 'Phoenix Mall, Lower Parel',
  city: 'Mumbai',
  showDate: 'Sat, Jan 15, 2026',
  showTime: '6:30 PM',
  bookingDate: 'Jan 10, 2026',
  numberOfTickets: 3,
  seats: ['H5', 'H6', 'H7'],
  ticketPrice: 1050,
  convenienceFee: 30,
  taxes: 45,
  addons: 570,
  discount: 100,
  totalPaid: 1595,
  paymentMethod: 'UPI',
  transactionId: 'TXN-2026-78542-UPI',
  paymentStatus: 'Paid Successfully',
  ticketNumber: 'TKT-78542-001',
  timeline: [
    {
      label: 'Booking Created',
      date: 'Jan 10, 2026',
      time: '2:30 PM',
      status: 'completed' as const,
    },
    {
      label: 'Payment Completed',
      date: 'Jan 10, 2026',
      time: '2:31 PM',
      status: 'completed' as const,
    },
    {
      label: 'Ticket Confirmed',
      date: 'Jan 10, 2026',
      time: '2:32 PM',
      status: 'current' as const,
    },
  ],
}

export default function BookingDetailPage() {
  const params = useParams()
  const bookingId = params.id as string

  const handleDownloadTicket = () => {
    console.log('Download ticket for booking:', bookingId)
  }

  const handleShareTicket = () => {
    console.log('Share ticket for booking:', bookingId)
  }

  const handleCancelBooking = () => {
    console.log('Cancel booking:', bookingId)
  }

  const handleReschedule = () => {
    console.log('Reschedule booking:', bookingId)
  }

  const handleContactSupport = () => {
    console.log('Contact support for booking:', bookingId)
  }

  const handleViewOnMap = () => {
    console.log('View on map')
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
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
    switch (status.toLowerCase()) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/account/bookings">
            <Button variant="ghost" size="sm" className="mb-4">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to My Bookings
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Details</h1>
              <p className="text-gray-600">Booking ID: {bookingId}</p>
            </div>
            <Badge variant={getStatusBadgeVariant(mockBookingData.status)} size="lg">
              {getStatusLabel(mockBookingData.status)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Movie/Event Details */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={mockBookingData.poster}
                    alt={mockBookingData.title}
                    className="w-32 h-48 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {mockBookingData.title}
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="info">{mockBookingData.language}</Badge>
                        <Badge variant="default">{mockBookingData.format}</Badge>
                        <Badge variant="warning">{mockBookingData.rating}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Genre:</span> {mockBookingData.genre}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Duration:</span> {mockBookingData.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Venue Details */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Venue Details</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Theatre</p>
                    <p className="font-medium text-gray-900">{mockBookingData.theatre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Screen</p>
                    <p className="font-medium text-gray-900">{mockBookingData.screen}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">{mockBookingData.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">City</p>
                    <p className="font-medium text-gray-900">{mockBookingData.city}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewOnMap}
                    className="mt-2"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    View on Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Show Details */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Show Details</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Show Date</p>
                    <p className="font-medium text-gray-900">{mockBookingData.showDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Show Time</p>
                    <p className="font-medium text-gray-900">{mockBookingData.showTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Booking Date</p>
                    <p className="font-medium text-gray-900">{mockBookingData.bookingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Tickets</p>
                    <p className="font-medium text-gray-900">{mockBookingData.numberOfTickets}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Seat Numbers</p>
                    <p className="font-medium text-gray-900">{mockBookingData.seats.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tickets (3 × ₹350)</span>
                    <span className="font-medium">₹{mockBookingData.ticketPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Convenience Fee</span>
                    <span className="font-medium">₹{mockBookingData.convenienceFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium">₹{mockBookingData.taxes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Add-ons</span>
                    <span className="font-medium">₹{mockBookingData.addons}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount (SAVE20)</span>
                    <span className="font-medium text-green-600">-₹{mockBookingData.discount}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span>₹{mockBookingData.totalPaid}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium text-gray-900">{mockBookingData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-medium text-gray-900">{mockBookingData.transactionId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Status</span>
                    <Badge variant="success">{mockBookingData.paymentStatus}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Timeline */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Booking Timeline</h3>
              </CardHeader>
              <CardContent>
                <Timeline items={mockBookingData.timeline} />
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Important Information</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert variant="warning">
                    <p className="text-sm">
                      <strong>Cancellation Policy:</strong> Free cancellation up to 2 hours before showtime. 
                      After that, no refunds will be processed.
                    </p>
                  </Alert>
                  <Alert variant="info">
                    <p className="text-sm">
                      <strong>Refund Policy:</strong> Refunds will be processed within 5-7 business days 
                      to the original payment method.
                    </p>
                  </Alert>
                  <Alert variant="info">
                    <p className="text-sm">
                      <strong>Entry Guidelines:</strong> Please arrive at the venue 30 minutes before the showtime. 
                      Show your booking confirmation and QR code at the entrance.
                    </p>
                  </Alert>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Need Help?</p>
                    <p>Contact our support team:</p>
                    <p>Email: support@shownest.com</p>
                    <p>Phone: +91 1800-123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Digital Ticket & Actions */}
          <div className="space-y-6">
            {/* Digital Ticket */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Digital Ticket</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <QRCode size="lg" value={bookingId} />
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Scan this QR code at the theatre entrance
                  </p>
                  <Separator className="my-4 w-full" />
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ticket Number</span>
                      <span className="font-medium text-gray-900">{mockBookingData.ticketNumber}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg w-full">
                    <p className="text-xs text-yellow-800 text-center">
                      <strong>Entry Instructions:</strong> Present this QR code along with a valid ID proof at the entrance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Booking Actions</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    onClick={handleDownloadTicket}
                    variant="primary"
                    className="w-full"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Ticket
                  </Button>
                  <Button
                    onClick={handleShareTicket}
                    variant="outline"
                    className="w-full"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share Ticket
                  </Button>
                  {mockBookingData.status === 'upcoming' && (
                    <>
                      <Button
                        onClick={handleReschedule}
                        variant="outline"
                        className="w-full"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Reschedule Booking
                      </Button>
                      <Button
                        onClick={handleCancelBooking}
                        variant="ghost"
                        className="w-full text-red-600 hover:text-red-700"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Cancel Booking
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={handleContactSupport}
                    variant="outline"
                    className="w-full"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
