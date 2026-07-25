'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Badge, Alert, Checkbox, RadioGroup, RadioGroupItem, Separator } from '@shownest/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock booking data
const mockBookingData = {
  bookingId: 'SN-2026-78542',
  status: 'upcoming',
  poster: 'https://via.placeholder.com/100x150/4F46E5/FFFFFF?text=Movie',
  title: 'The Grand Adventure',
  language: 'English',
  format: 'IMAX 2D',
  theatre: 'PVR Cinemas',
  screen: 'Screen 3',
  city: 'Mumbai',
  currentDate: 'Sat, Jan 15, 2026',
  currentShowtime: '6:30 PM',
  seats: ['H5', 'H6', 'H7'],
  ticketCount: 3,
}

// Mock available showtimes for rescheduling
const mockAvailableShows = [
  {
    id: 'show-1',
    date: 'Sun, Jan 16, 2026',
    showtime: '3:00 PM',
    theatre: 'PVR Cinemas',
    screen: 'Screen 1',
    language: 'English',
    format: 'IMAX 2D',
    seatAvailability: 'Available',
  },
  {
    id: 'show-2',
    date: 'Sun, Jan 16, 2026',
    showtime: '6:30 PM',
    theatre: 'PVR Cinemas',
    screen: 'Screen 3',
    language: 'English',
    format: 'IMAX 2D',
    seatAvailability: 'Limited',
  },
  {
    id: 'show-3',
    date: 'Mon, Jan 17, 2026',
    showtime: '9:00 PM',
    theatre: 'PVR Cinemas',
    screen: 'Screen 5',
    language: 'English',
    format: '4DX',
    seatAvailability: 'Available',
  },
  {
    id: 'show-4',
    date: 'Tue, Jan 18, 2026',
    showtime: '6:00 PM',
    theatre: 'INOX',
    screen: 'Screen 2',
    language: 'English',
    format: '2D',
    seatAvailability: 'Available',
  },
]

export default function RescheduleBookingPage() {
  const params = useParams()
  const bookingId = params.id as string

  const [selectedShowId, setSelectedShowId] = useState('')
  const [policyAcknowledged, setPolicyAcknowledged] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [rescheduleStatus, setRescheduleStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const selectedShow = mockAvailableShows.find((show) => show.id === selectedShowId)

  const handleConfirmReschedule = () => {
    if (!policyAcknowledged || !selectedShowId) {
      return
    }

    setIsConfirming(true)
    setRescheduleStatus('idle')

    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false)
      setRescheduleStatus('success')
    }, 2000)
  }

  const handleCancelReschedule = () => {
    console.log('Cancel reschedule for booking:', bookingId)
  }

  const getSeatAvailabilityBadgeVariant = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'available':
        return 'success'
      case 'limited':
        return 'warning'
      case 'full':
        return 'error'
      default:
        return 'default'
    }
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

  if (rescheduleStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Rescheduled Successfully</h1>
              <p className="text-gray-600 mb-6">
                Your booking has been rescheduled to {selectedShow?.date} at {selectedShow?.showtime}. 
                An updated ticket has been sent to your email.
              </p>
              <div className="space-y-3">
                <Link href={`/account/bookings/${bookingId}`}>
                  <Button variant="primary" className="w-full">
                    View Updated Booking
                  </Button>
                </Link>
                <Link href="/account/bookings">
                  <Button variant="outline" className="w-full">
                    View My Bookings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Link href={`/account/bookings/${bookingId}`}>
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
              Back to Booking Details
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reschedule Booking</h1>
              <p className="text-gray-600">Booking ID: {bookingId}</p>
            </div>
            <Badge variant={getStatusBadgeVariant(mockBookingData.status)}>
              {getStatusLabel(mockBookingData.status)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Current Booking & Available Shows */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Booking Details */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Current Booking Details</h3>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src={mockBookingData.poster}
                    alt={mockBookingData.title}
                    className="w-24 h-36 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {mockBookingData.title}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="info">{mockBookingData.language}</Badge>
                        <Badge variant="default">{mockBookingData.format}</Badge>
                      </div>
                      <p className="text-gray-600">
                        <span className="font-medium">Theatre:</span> {mockBookingData.theatre}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Screen:</span> {mockBookingData.screen}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">City:</span> {mockBookingData.city}
                      </p>
                      <Separator className="my-2" />
                      <p className="text-gray-600">
                        <span className="font-medium">Current Date:</span> {mockBookingData.currentDate}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Current Showtime:</span> {mockBookingData.currentShowtime}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Seats:</span> {mockBookingData.seats.join(', ')}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Tickets:</span> {mockBookingData.ticketCount}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Select New Show */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Select New Show</h3>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedShowId} onValueChange={setSelectedShowId}>
                  <div className="space-y-3">
                    {mockAvailableShows.map((show) => (
                      <div
                        key={show.id}
                        className={`
                          p-4 border rounded-lg cursor-pointer transition-all
                          ${selectedShowId === show.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value={show.id} id={show.id} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <label
                                htmlFor={show.id}
                                className="font-medium text-gray-900 cursor-pointer"
                              >
                                {show.date} at {show.showtime}
                              </label>
                              <Badge variant={getSeatAvailabilityBadgeVariant(show.seatAvailability)}>
                                {show.seatAvailability}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>
                                <span className="font-medium">Theatre:</span> {show.theatre}
                              </p>
                              <p>
                                <span className="font-medium">Screen:</span> {show.screen}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="info" size="sm">{show.language}</Badge>
                                <Badge variant="default" size="sm">{show.format}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Rescheduling Policy */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Rescheduling Policy</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert variant="info">
                    <p className="text-sm">
                      <strong>Eligibility:</strong> Free rescheduling is available up to 24 hours before showtime. 
                      After that, rescheduling charges may apply.
                    </p>
                  </Alert>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rescheduling Deadline</span>
                      <span className="font-medium text-gray-900">24 hours before showtime</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maximum Reschedules</span>
                      <span className="font-medium text-gray-900">2 times per booking</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fare Difference</span>
                      <span className="font-medium text-gray-900">Payable or refundable</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rescheduling Fee</span>
                      <span className="font-medium text-gray-900">₹50 per reschedule</span>
                    </div>
                  </div>
                  <Alert variant="warning">
                    <p className="text-sm">
                      <strong>Important:</strong> Seat availability is subject to change. If your preferred seats are not available, 
                      you will be offered alternative seats. The original booking will be cancelled upon successful rescheduling.
                    </p>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - New Booking Summary & Actions */}
          <div className="space-y-6">
            {/* New Booking Summary */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">New Booking Summary</h3>
              </CardHeader>
              <CardContent>
                {selectedShow ? (
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">New Date</span>
                      <p className="font-medium text-gray-900">{selectedShow.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">New Showtime</span>
                      <p className="font-medium text-gray-900">{selectedShow.showtime}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">New Venue</span>
                      <p className="font-medium text-gray-900">{selectedShow.theatre}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Screen</span>
                      <p className="font-medium text-gray-900">{selectedShow.screen}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Selected Seats</span>
                      <p className="font-medium text-gray-900">{mockBookingData.seats.join(', ')}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fare Difference</span>
                      <span className="font-medium text-gray-900">₹0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rescheduling Fee</span>
                      <span className="font-medium text-gray-900">₹50</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Additional Amount</span>
                      <span className="text-blue-600">₹50</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg
                      className="w-12 h-12 mx-auto mb-2 text-gray-300"
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
                    <p className="text-sm">Select a showtime to view summary</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Confirmation */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Confirmation</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="policy-acknowledgment"
                      checked={policyAcknowledged}
                      onCheckedChange={(checked) => setPolicyAcknowledged(checked as boolean)}
                    />
                    <label
                      htmlFor="policy-acknowledgment"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      I acknowledge that I have read and understood the rescheduling policy. 
                      I understand that my original booking will be cancelled upon successful rescheduling.
                    </label>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Button
                      onClick={handleConfirmReschedule}
                      variant="primary"
                      className="w-full"
                      disabled={!policyAcknowledged || !selectedShowId || isConfirming}
                    >
                      {isConfirming ? 'Processing...' : 'Confirm Reschedule'}
                    </Button>
                    <Button
                      onClick={handleCancelReschedule}
                      variant="outline"
                      className="w-full"
                      disabled={isConfirming}
                    >
                      Cancel
                    </Button>
                    <Link href={`/account/bookings/${bookingId}`}>
                      <Button variant="ghost" className="w-full" disabled={isConfirming}>
                        Back to Booking Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
