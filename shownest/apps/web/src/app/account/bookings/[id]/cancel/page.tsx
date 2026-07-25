'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Badge, Alert, Checkbox, RadioGroup, RadioGroupItem, Textarea, Separator } from '@shownest/ui'
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
  date: 'Sat, Jan 15, 2026',
  showtime: '6:30 PM',
  seats: ['H5', 'H6', 'H7'],
  numberOfTickets: 3,
  cancellationEligible: true,
  refundEligible: true,
  cancellationDeadline: 'Sat, Jan 15, 2026, 4:30 PM',
  estimatedRefund: 1495,
  refundProcessingTime: '5-7 business days',
  ticketAmount: 1050,
  convenienceFee: 30,
  cancellationCharges: 100,
  refundAmount: 980,
}

const cancellationReasons = [
  { value: 'change-of-plans', label: 'Change of plans' },
  { value: 'booked-by-mistake', label: 'Booked by mistake' },
  { value: 'schedule-conflict', label: 'Schedule conflict' },
  { value: 'better-seats', label: 'Found better seats' },
  { value: 'health-reasons', label: 'Health reasons' },
  { value: 'other', label: 'Other' },
]

export default function CancelBookingPage() {
  const params = useParams()
  const bookingId = params.id as string

  const [selectedReason, setSelectedReason] = useState('')
  const [otherReason, setOtherReason] = useState('')
  const [policyAcknowledged, setPolicyAcknowledged] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [cancellationStatus, setCancellationStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleConfirmCancellation = () => {
    if (!policyAcknowledged || !selectedReason) {
      return
    }

    setIsConfirming(true)
    setCancellationStatus('idle')

    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false)
      setCancellationStatus('success')
    }, 2000)
  }

  const handleKeepBooking = () => {
    console.log('Keep booking for:', bookingId)
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

  if (cancellationStatus === 'success') {
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Cancelled Successfully</h1>
              <p className="text-gray-600 mb-6">
                Your booking has been cancelled and refund of ₹{mockBookingData.refundAmount} will be processed within {mockBookingData.refundProcessingTime}.
              </p>
              <div className="space-y-3">
                <Link href="/account/bookings">
                  <Button variant="primary" className="w-full">
                    View My Bookings
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Return to Home
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancel Booking</h1>
              <p className="text-gray-600">Booking ID: {bookingId}</p>
            </div>
            <Badge variant={getStatusBadgeVariant(mockBookingData.status)}>
              {getStatusLabel(mockBookingData.status)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Booking Summary & Cancellation Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Booking Summary</h3>
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
                        <span className="font-medium">Date:</span> {mockBookingData.date}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Showtime:</span> {mockBookingData.showtime}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Seats:</span> {mockBookingData.seats.join(', ')}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Tickets:</span> {mockBookingData.numberOfTickets}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Details */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Cancellation Details</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cancellation Eligible</span>
                    <Badge variant={mockBookingData.cancellationEligible ? 'success' : 'error'}>
                      {mockBookingData.cancellationEligible ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Refund Eligible</span>
                    <Badge variant={mockBookingData.refundEligible ? 'success' : 'error'}>
                      {mockBookingData.refundEligible ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">Cancellation Deadline</span>
                    <p className="font-medium text-gray-900">{mockBookingData.cancellationDeadline}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Estimated Refund</span>
                    <p className="font-medium text-gray-900">₹{mockBookingData.estimatedRefund}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Refund Processing Time</span>
                    <p className="font-medium text-gray-900">{mockBookingData.refundProcessingTime}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <Alert variant="info">
                  <p className="text-sm">
                    <strong>Cancellation Policy:</strong> Free cancellation is available up to 2 hours before showtime. 
                    After that, cancellation charges may apply.
                  </p>
                </Alert>
              </CardContent>
            </Card>

            {/* Cancellation Reason */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Cancellation Reason</h3>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                  <div className="space-y-3">
                    {cancellationReasons.map((reason) => (
                      <div key={reason.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={reason.value} id={reason.value} />
                        <label
                          htmlFor={reason.value}
                          className="text-sm font medium text-gray-700 cursor-pointer"
                        >
                          {reason.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {selectedReason === 'other' && (
                  <div className="mt-4">
                    <Textarea
                      label="Please provide additional details"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      rows={4}
                      placeholder="Tell us why you want to cancel this booking..."
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Warning Notice */}
            <Alert variant="warning">
              <p className="text-sm">
                <strong>Important:</strong> Cancellation is irreversible. Once confirmed, your booking will be cancelled 
                and the refund will be processed to your original payment method within {mockBookingData.refundProcessingTime}. 
                Please ensure you have reviewed all details before proceeding.
              </p>
            </Alert>
          </div>

          {/* Right Column - Refund Summary & Actions */}
          <div className="space-y-6">
            {/* Refund Summary */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Refund Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ticket Amount</span>
                    <span className="font-medium">₹{mockBookingData.ticketAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Convenience Fee</span>
                    <span className="font-medium">₹{mockBookingData.convenienceFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cancellation Charges</span>
                    <span className="font-medium text-red-600">-₹{mockBookingData.cancellationCharges}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Refund Amount</span>
                    <span className="text-green-600">₹{mockBookingData.refundAmount}</span>
                  </div>
                </div>
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
                      I acknowledge that I have read and understood the cancellation policy. 
                      I understand that this action is irreversible.
                    </label>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Button
                      onClick={handleConfirmCancellation}
                      variant="primary"
                      className="w-full"
                      disabled={!policyAcknowledged || !selectedReason || isConfirming}
                    >
                      {isConfirming ? 'Processing...' : 'Confirm Cancellation'}
                    </Button>
                    <Button
                      onClick={handleKeepBooking}
                      variant="outline"
                      className="w-full"
                      disabled={isConfirming}
                    >
                      Keep Booking
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
