'use client'

import { Button, Card, CardHeader, CardContent, Badge, Alert, Separator, QRCode } from '@shownest/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock booking data
const mockBookingData = {
  bookingId: 'SN-2026-78542',
  bookingDate: 'Sat, Jan 15, 2026 at 6:35 PM',
  poster: 'https://via.placeholder.com/150x225/4F46E5/FFFFFF?text=Movie',
  title: 'The Grand Adventure',
  language: 'English',
  format: 'IMAX 2D',
  duration: '2h 30m',
  theatre: 'PVR Cinemas',
  screen: 'Screen 3',
  city: 'Mumbai',
  date: 'Sat, Jan 15, 2026',
  showtime: '6:30 PM',
  seats: ['H5', 'H6', 'H7'],
  numberOfTickets: 3,
  ticketPrice: 1050,
  convenienceFee: 30,
  taxes: 45,
  addons: 570,
  discount: 100,
  totalPaid: 1595,
  paymentMethod: 'UPI',
  paymentStatus: 'Paid Successfully',
}

export default function ConfirmationPage() {
  const params = useParams()
  const bookingId = params.bookingId as string

  const handleDownloadTicket = () => {
    console.log('Download ticket clicked for booking:', bookingId)
  }

  const handleShareBooking = () => {
    console.log('Share booking clicked for booking:', bookingId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Your tickets have been booked successfully
          </p>
          <div className="mt-4 space-y-1">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Booking ID:</span> {bookingId}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Booked on:</span> {mockBookingData.bookingDate}
            </p>
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
                        <Badge variant="success">{mockBookingData.format}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Duration:</span> {mockBookingData.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Venue & Show Details */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Show Details</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Theatre</p>
                    <p className="font-medium text-gray-900">{mockBookingData.theatre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Screen</p>
                    <p className="font-medium text-gray-900">{mockBookingData.screen}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">City</p>
                    <p className="font-medium text-gray-900">{mockBookingData.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">{mockBookingData.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Showtime</p>
                    <p className="font-medium text-gray-900">{mockBookingData.showtime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-medium text-gray-900">
                      {mockBookingData.seats.join(', ')}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Number of Tickets</span>
                  <Badge variant="default">{mockBookingData.numberOfTickets}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Payment Summary</h3>
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
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Status</span>
                  <Badge variant="success">{mockBookingData.paymentStatus}</Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Payment Method</span>
                  <span className="text-sm font-medium text-gray-900">{mockBookingData.paymentMethod}</span>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Important Information</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert variant="info">
                    <p className="text-sm">
                      <strong>Entry Instructions:</strong> Please arrive at the venue 30 minutes before the showtime. 
                      Show your booking confirmation and QR code at the entrance.
                    </p>
                  </Alert>
                  <Alert variant="warning">
                    <p className="text-sm">
                      <strong>Cancellation Policy:</strong> Free cancellation up to 2 hours before showtime. 
                      After that, no refunds will be processed.
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

          {/* Right Column - QR Code & Actions */}
          <div className="space-y-6">
            {/* Digital Ticket QR Code */}
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
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg w-full">
                    <p className="text-xs text-yellow-800 text-center">
                      <strong>Ticket Validity:</strong> Valid only for the booked show date and time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleDownloadTicket}
                variant="primary"
                size="lg"
                className="w-full"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                onClick={handleShareBooking}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Share Booking
              </Button>
              <Link href="/bookings" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  View My Bookings
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="ghost" size="lg" className="w-full">
                  Book Another Show
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="ghost" size="lg" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>

            {/* Email Confirmation Notice */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to your registered email address
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
