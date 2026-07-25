'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Badge, Separator, Input, RadioGroup, RadioGroupItem, Select, Checkbox, Alert } from '@shownest/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock data
const mockBookingData = {
  poster: 'https://via.placeholder.com/80x120/4F46E5/FFFFFF?text=Movie',
  title: 'The Grand Adventure',
  theatre: 'PVR Cinemas',
  screen: 'Screen 3',
  date: 'Sat, Jan 15, 2026',
  showtime: '6:30 PM',
  seats: ['H5', 'H6', 'H7'],
  numberOfTickets: 3,
  totalAmount: 1695,
}

const bankOptions = [
  { value: '', label: 'Select your bank' },
  { value: 'sbi', label: 'State Bank of India' },
  { value: 'hdfc', label: 'HDFC Bank' },
  { value: 'icici', label: 'ICICI Bank' },
  { value: 'axis', label: 'Axis Bank' },
  { value: 'kotak', label: 'Kotak Mahindra Bank' },
  { value: 'pnb', label: 'Punjab National Bank' },
]

const walletOptions = [
  { id: 'paytm', name: 'Paytm', icon: '💳' },
  { id: 'phonepe', name: 'PhonePe', icon: '💳' },
  { id: 'gpay', name: 'Google Pay', icon: '💳' },
  { id: 'amazon', name: 'Amazon Pay', icon: '💳' },
]

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'giftcard' | 'loyalty'

export default function PaymentPage() {
  const params = useParams()
  const showtimeId = params.showtimeId as string
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [saveCard, setSaveCard] = useState(false)
  const [upiId, setUpiId] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [selectedWallet, setSelectedWallet] = useState('')
  const [giftCardCode, setGiftCardCode] = useState('')
  const [loyaltyPoints, setLoyaltyPoints] = useState(false)

  const handlePayNow = () => {
    setIsProcessing(true)
    console.log('Processing payment with method:', paymentMethod)
    console.log('ShowtimeId:', showtimeId)
    
    // Placeholder for payment processing
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    setExpiryDate(value)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/booking/${showtimeId}/review`}
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
            Back to Review
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={mockBookingData.poster}
                    alt={mockBookingData.title}
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{mockBookingData.title}</h3>
                    <p className="text-sm text-gray-600">{mockBookingData.theatre} - {mockBookingData.screen}</p>
                    <p className="text-sm text-gray-600">{mockBookingData.date} at {mockBookingData.showtime}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="default">{mockBookingData.numberOfTickets} Tickets</Badge>
                      <Badge variant="info">{mockBookingData.seats.join(', ')}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">₹{mockBookingData.totalAmount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Select Payment Method</h3>
              </CardHeader>
              <CardContent>
                <RadioGroup>
                  <RadioGroupItem
                    id="card"
                    label="Credit / Debit Card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <RadioGroupItem
                    id="upi"
                    label="UPI"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <RadioGroupItem
                    id="netbanking"
                    label="Net Banking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                  />
                  <RadioGroupItem
                    id="wallet"
                    label="Wallets"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                  />
                  <RadioGroupItem
                    id="giftcard"
                    label="Gift Card"
                    checked={paymentMethod === 'giftcard'}
                    onChange={() => setPaymentMethod('giftcard')}
                  />
                  <RadioGroupItem
                    id="loyalty"
                    label="Loyalty Points"
                    description="Available: 500 points (₹50 value)"
                    checked={paymentMethod === 'loyalty'}
                    onChange={() => setPaymentMethod('loyalty')}
                  />
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Card Payment Section */}
            {paymentMethod === 'card' && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Card Details</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Holder Name
                      </label>
                      <Input
                        placeholder="Name on card"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <Input
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <Input
                          type="password"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <Checkbox
                      id="saveCard"
                      label="Save this card for future payments"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* UPI Payment Section */}
            {paymentMethod === 'upi' && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">UPI Payment</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <Input
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-4">Or scan QR code</p>
                      <div className="inline-flex items-center justify-center w-48 h-48 bg-gray-100 rounded-lg">
                        <span className="text-gray-400">QR Code Placeholder</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Net Banking Section */}
            {paymentMethod === 'netbanking' && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Net Banking</h3>
                </CardHeader>
                <CardContent>
                  <Select
                    id="bank"
                    label="Select Your Bank"
                    options={bankOptions}
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                  />
                </CardContent>
              </Card>
            )}

            {/* Wallets Section */}
            {paymentMethod === 'wallet' && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Select Wallet</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {walletOptions.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => setSelectedWallet(wallet.id)}
                        className={`
                          p-4 rounded-lg border-2 text-left transition-all
                          ${selectedWallet === wallet.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{wallet.icon}</span>
                          <span className="font-medium">{wallet.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gift Card Section */}
            {paymentMethod === 'giftcard' && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Gift Card</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gift Card Code
                      </label>
                      <Input
                        placeholder="Enter your gift card code"
                        value={giftCardCode}
                        onChange={(e) => setGiftCardCode(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="w-full">
                      Apply Gift Card
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loyalty Points Section */}
            {paymentMethod === 'loyalty' && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Loyalty Points</h3>
                </CardHeader>
                <CardContent>
                  <Alert variant="info">
                    <p className="text-sm">
                      You have 500 loyalty points available (worth ₹50). 
                      Remaining amount will be paid via other payment method.
                    </p>
                  </Alert>
                  <div className="mt-4">
                    <Checkbox
                      id="useLoyalty"
                      label="Use 500 loyalty points (₹50)"
                      checked={loyaltyPoints}
                      onChange={(e) => setLoyaltyPoints(e.target.checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tickets (3 × ₹350)</span>
                    <span className="font-medium">₹1,050</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Convenience Fee</span>
                    <span className="font-medium">₹30</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium">₹45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Add-ons</span>
                    <span className="font-medium">₹570</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{mockBookingData.totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo & Offers */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Offers & Discounts</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-800">SAVE20 Applied</p>
                      <p className="text-xs text-green-600">Promo code discount</p>
                    </div>
                    <Badge variant="success">-₹100</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Payable Amount</span>
                    <span>₹{mockBookingData.totalAmount - 100}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>100% Secure Payment</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <svg
                  className="w-5 h-5 text-blue-600"
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
                <span>SSL Encrypted</span>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handlePayNow}
              loading={isProcessing}
              disabled={isProcessing}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Pay ₹{mockBookingData.totalAmount - 100}
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500">
              By proceeding, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
