'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Badge, Alert, Separator, Input } from '@shownest/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock data
const mockEventData = {
  poster: 'https://via.placeholder.com/150x225/4F46E5/FFFFFF?text=Movie',
  title: 'The Grand Adventure',
  language: 'English',
  format: 'IMAX 2D',
  duration: '2h 30m',
  genre: 'Action, Adventure',
}

const mockBookingInfo = {
  theatreName: 'PVR Cinemas',
  auditorium: 'Screen 3',
  city: 'Mumbai',
  date: 'Sat, Jan 15, 2026',
  showtime: '6:30 PM',
  seats: ['H5', 'H6', 'H7'],
  numberOfTickets: 3,
}

const mockPricing = {
  ticketPrice: 350,
  convenienceFee: 30,
  taxes: 45,
  addons: [
    { name: 'Popcorn (Large)', price: 150 },
    { name: 'Coke (Large)', price: 120 },
  ],
  promoDiscount: 0,
}

export default function ReviewPage() {
  const params = useParams()
  const showtimeId = params.showtimeId as string
  
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const calculateTotal = () => {
    const ticketTotal = mockPricing.ticketPrice * mockBookingInfo.numberOfTickets
    const addonsTotal = mockPricing.addons.reduce((sum, addon) => sum + addon.price, 0)
    const subtotal = ticketTotal + addonsTotal + mockPricing.convenienceFee + mockPricing.taxes
    return subtotal - mockPricing.promoDiscount
  }

  const handleApplyPromo = () => {
    if (!promoCode) {
      setPromoMessage({ type: 'error', text: 'Please enter a promo code' })
      return
    }
    
    // Placeholder for promo code validation
    if (promoCode.toUpperCase() === 'SAVE20') {
      mockPricing.promoDiscount = 100
      setPromoApplied(true)
      setPromoMessage({ type: 'success', text: 'Promo code applied! You saved ₹100' })
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code' })
    }
  }

  const handleContinueToPayment = () => {
    setIsProcessing(true)
    
    // Placeholder for payment flow
    setTimeout(() => {
      setIsProcessing(false)
    }, 1000)
  }

  const ticketTotal = mockPricing.ticketPrice * mockBookingInfo.numberOfTickets
  const addonsTotal = mockPricing.addons.reduce((sum, addon) => sum + addon.price, 0)
  const grandTotal = calculateTotal()

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/booking/${showtimeId}/seats`}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg
              className="w-4 h-4 mr-1"
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
            Back to Seat Selection
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Review Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Event and Booking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Movie/Event Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={mockEventData.poster}
                      alt={mockEventData.title}
                      className="w-32 h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {mockEventData.title}
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="info">{mockEventData.language}</Badge>
                        <Badge variant="success">{mockEventData.format}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Duration:</span> {mockEventData.duration}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Genre:</span> {mockEventData.genre}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Information */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Theatre</p>
                    <p className="font-medium text-gray-900">{mockBookingInfo.theatreName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Screen</p>
                    <p className="font-medium text-gray-900">{mockBookingInfo.auditorium}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">City</p>
                    <p className="font-medium text-gray-900">{mockBookingInfo.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">{mockBookingInfo.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Showtime</p>
                    <p className="font-medium text-gray-900">{mockBookingInfo.showtime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-medium text-gray-900">
                      {mockBookingInfo.seats.join(', ')}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Number of Tickets</span>
                  <Badge variant="default">{mockBookingInfo.numberOfTickets}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Pricing Summary */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Price Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Tickets ({mockBookingInfo.numberOfTickets} × ₹{mockPricing.ticketPrice})
                    </span>
                    <span className="font-medium">₹{ticketTotal}</span>
                  </div>
                  
                  {mockPricing.addons.map((addon, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{addon.name}</span>
                      <span className="font-medium">₹{addon.price}</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Convenience Fee</span>
                    <span className="font-medium">₹{mockPricing.convenienceFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium">₹{mockPricing.taxes}</span>
                  </div>
                  
                  {mockPricing.promoDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Promo Discount</span>
                      <span className="font-medium text-green-600">-₹{mockPricing.promoDiscount}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code Section */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button
                      onClick={handleApplyPromo}
                      disabled={promoApplied || !promoCode}
                      variant="outline"
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </Button>
                  </div>
                  {promoMessage && (
                    <Alert variant={promoMessage.type}>
                      <p className="text-sm">{promoMessage.text}</p>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleContinueToPayment}
                loading={isProcessing}
                disabled={isProcessing}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Continue to Payment
              </Button>
              
              {/* Secure Payment Indicator */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>

            {/* Booking Terms */}
            <div className="text-xs text-gray-500 space-y-2">
              <p>
                By proceeding, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
              <p>
                Cancellation policy: Free cancellation up to 2 hours before showtime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
