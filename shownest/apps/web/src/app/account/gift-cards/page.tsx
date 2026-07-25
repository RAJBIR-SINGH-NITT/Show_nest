'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Badge, Input, Label, Modal, Alert, Separator, EmptyState } from '@shownest/ui'
import Link from 'next/link'

// Mock gift card data
const mockGiftCards = [
  {
    id: 'gc-1',
    name: 'Birthday Special',
    cardNumber: 'GC-XXXX-XXXX-1234',
    currentBalance: 500,
    originalValue: 1000,
    expiryDate: 'Dec 31, 2026',
    status: 'active',
    purchaseDate: 'Jan 15, 2026',
    lastUsed: 'Jan 20, 2026',
    theme: 'birthday',
  },
  {
    id: 'gc-2',
    name: 'Movie Night',
    cardNumber: 'GC-XXXX-XXXX-5678',
    currentBalance: 250,
    originalValue: 500,
    expiryDate: 'Mar 31, 2026',
    status: 'active',
    purchaseDate: 'Feb 1, 2026',
    lastUsed: 'Feb 10, 2026',
    theme: 'movie',
  },
  {
    id: 'gc-3',
    name: 'Celebration Gift',
    cardNumber: 'GC-XXXX-XXXX-9012',
    currentBalance: 0,
    originalValue: 750,
    expiryDate: 'Jan 15, 2026',
    status: 'redeemed',
    purchaseDate: 'Aug 20, 2025',
    lastUsed: 'Jan 10, 2026',
    theme: 'celebration',
  },
]

const mockTransactionHistory = [
  {
    id: 1,
    date: 'Jan 20, 2026',
    type: 'Movie Booking',
    amountUsed: 200,
    remainingBalance: 500,
  },
  {
    id: 2,
    date: 'Jan 15, 2026',
    type: 'Purchase',
    amountUsed: 0,
    remainingBalance: 700,
  },
  {
    id: 3,
    date: 'Jan 10, 2026',
    type: 'Concessions',
    amountUsed: 150,
    remainingBalance: 700,
  },
]

const giftCardThemes = [
  { id: 'birthday', name: 'Birthday', color: 'bg-pink-500' },
  { id: 'movie', name: 'Movie Night', color: 'bg-blue-500' },
  { id: 'celebration', name: 'Celebration', color: 'bg-purple-500' },
  { id: 'anniversary', name: 'Anniversary', color: 'bg-red-500' },
  { id: 'generic', name: 'Generic', color: 'bg-gray-500' },
]

const giftCardAmounts = [250, 500, 750, 1000, 1500, 2000]

export default function GiftCardsPage() {
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedGiftCard, setSelectedGiftCard] = useState<typeof mockGiftCards[0] | null>(null)
  const [redeemForm, setRedeemForm] = useState({ code: '', pin: '' })
  const [purchaseForm, setPurchaseForm] = useState({
    amount: 500,
    theme: 'birthday',
    recipientName: '',
    recipientEmail: '',
    message: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [redeemStatus, setRedeemStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const totalActiveCards = mockGiftCards.filter((gc) => gc.status === 'active').length
  const totalAvailableBalance = mockGiftCards
    .filter((gc) => gc.status === 'active')
    .reduce((sum, gc) => sum + gc.currentBalance, 0)

  const handleRedeemGiftCard = () => {
    if (!redeemForm.code || !redeemForm.pin) {
      return
    }

    setIsProcessing(true)
    setRedeemStatus('idle')

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setRedeemStatus('success')
      setRedeemForm({ code: '', pin: '' })
      setIsRedeemModalOpen(false)

      setTimeout(() => setRedeemStatus('idle'), 3000)
    }, 1500)
  }

  const handlePurchaseGiftCard = () => {
    if (!purchaseForm.recipientName || !purchaseForm.recipientEmail) {
      return
    }

    setIsProcessing(true)
    setPurchaseStatus('idle')

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setPurchaseStatus('success')
      setPurchaseForm({
        amount: 500,
        theme: 'birthday',
        recipientName: '',
        recipientEmail: '',
        message: '',
      })
      setIsPurchaseModalOpen(false)

      setTimeout(() => setPurchaseStatus('idle'), 3000)
    }, 1500)
  }

  const handleViewDetails = (giftCard: typeof mockGiftCards[0]) => {
    setSelectedGiftCard(giftCard)
    setIsDetailsModalOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success'
      case 'redeemed':
        return 'info'
      case 'expired':
        return 'error'
      default:
        return 'default'
    }
  }

  const getThemeColor = (theme: string) => {
    const themeObj = giftCardThemes.find((t) => t.id === theme)
    return themeObj?.color || 'bg-gray-500'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gift Cards</h1>
          <p className="text-gray-600">Manage your gift cards or purchase new ones for friends and family</p>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Active Gift Cards:</span>
              <Badge variant="success">{totalActiveCards}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Available Balance:</span>
              <span className="text-lg font-bold text-blue-600">₹{totalAvailableBalance.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {redeemStatus === 'success' && (
          <Alert variant="success" className="mb-6">
            <p className="text-sm">Gift card redeemed successfully!</p>
          </Alert>
        )}

        {purchaseStatus === 'success' && (
          <Alert variant="success" className="mb-6">
            <p className="text-sm">Gift card purchased successfully!</p>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button onClick={() => setIsRedeemModalOpen(true)} variant="primary">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Redeem Gift Card
          </Button>
          <Button onClick={() => setIsPurchaseModalOpen(true)} variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Purchase Gift Card
          </Button>
        </div>

        {/* Active Gift Cards */}
        {mockGiftCards.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
            title="No Gift Cards"
            description="You don't have any gift cards yet. Purchase one or redeem a gift card code to get started."
            action={
              <Button onClick={() => setIsPurchaseModalOpen(true)} variant="primary">
                Purchase Gift Card
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockGiftCards.map((giftCard) => (
              <Card key={giftCard.id} className="overflow-hidden">
                <div className={`${getThemeColor(giftCard.theme)} h-32 relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white opacity-20">🎁</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={getStatusBadgeVariant(giftCard.status)}>
                      {giftCard.status.charAt(0).toUpperCase() + giftCard.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{giftCard.name}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Card Number</span>
                      <span className="text-gray-900 font-mono">{giftCard.cardNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Balance</span>
                      <span className="text-gray-900 font-medium">₹{giftCard.currentBalance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original Value</span>
                      <span className="text-gray-900">₹{giftCard.originalValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires</span>
                      <span className="text-gray-900">{giftCard.expiryDate}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => handleViewDetails(giftCard)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTransactionHistory.map((transaction) => (
                <div key={transaction.id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.amountUsed > 0 ? `-₹${transaction.amountUsed}` : '₹0'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                    <p className="text-xs text-gray-500">Balance: ₹{transaction.remainingBalance}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Back to Account */}
        <div className="mt-8">
          <Link href="/account">
            <Button variant="ghost" className="w-full">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to My Account
            </Button>
          </Link>
        </div>
      </div>

      {/* Redeem Gift Card Modal */}
      <Modal
        isOpen={isRedeemModalOpen}
        onClose={() => setIsRedeemModalOpen(false)}
        title="Redeem Gift Card"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="redeemCode">Gift Card Code *</Label>
            <Input
              id="redeemCode"
              value={redeemForm.code}
              onChange={(e) => setRedeemForm({ ...redeemForm, code: e.target.value })}
              placeholder="Enter gift card code"
            />
          </div>
          <div>
            <Label htmlFor="redeemPin">PIN *</Label>
            <Input
              id="redeemPin"
              type="password"
              value={redeemForm.pin}
              onChange={(e) => setRedeemForm({ ...redeemForm, pin: e.target.value })}
              placeholder="Enter PIN"
              maxLength={4}
            />
          </div>
          <Alert variant="info">
            <p className="text-sm">
              Enter the 16-digit gift card code and 4-digit PIN found on your gift card. 
              The balance will be added to your account upon successful redemption.
            </p>
          </Alert>
          <Separator />
          <div className="flex gap-3">
            <Button
              onClick={handleRedeemGiftCard}
              variant="primary"
              disabled={isProcessing || !redeemForm.code || !redeemForm.pin}
              className="flex-1"
            >
              {isProcessing ? 'Redeeming...' : 'Redeem Gift Card'}
            </Button>
            <Button
              onClick={() => setIsRedeemModalOpen(false)}
              variant="outline"
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Purchase Gift Card Modal */}
      <Modal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        title="Purchase Gift Card"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Gift Card Amount *</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {giftCardAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={purchaseForm.amount === amount ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setPurchaseForm({ ...purchaseForm, amount })}
                >
                  ₹{amount}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="theme">Gift Card Theme *</Label>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {giftCardThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setPurchaseForm({ ...purchaseForm, theme: theme.id })}
                  className={`
                    p-2 rounded-lg text-xs font-medium transition-all
                    ${purchaseForm.theme === theme.id ? theme.color + ' text-white ring-2 ring-offset-2 ring-blue-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="recipientName">Recipient Name *</Label>
            <Input
              id="recipientName"
              value={purchaseForm.recipientName}
              onChange={(e) => setPurchaseForm({ ...purchaseForm, recipientName: e.target.value })}
              placeholder="Enter recipient name"
            />
          </div>
          <div>
            <Label htmlFor="recipientEmail">Recipient Email *</Label>
            <Input
              id="recipientEmail"
              type="email"
              value={purchaseForm.recipientEmail}
              onChange={(e) => setPurchaseForm({ ...purchaseForm, recipientEmail: e.target.value })}
              placeholder="Enter recipient email"
            />
          </div>
          <div>
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <textarea
              id="message"
              value={purchaseForm.message}
              onChange={(e) => setPurchaseForm({ ...purchaseForm, message: e.target.value })}
              placeholder="Add a personal message"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              maxLength={200}
            />
          </div>
          <Separator />
          <div className="flex gap-3">
            <Button
              onClick={handlePurchaseGiftCard}
              variant="primary"
              disabled={isProcessing || !purchaseForm.recipientName || !purchaseForm.recipientEmail}
              className="flex-1"
            >
              {isProcessing ? 'Processing...' : `Purchase ₹${purchaseForm.amount}`}
            </Button>
            <Button
              onClick={() => setIsPurchaseModalOpen(false)}
              variant="outline"
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Gift Card Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Gift Card Details"
      >
        {selectedGiftCard && (
          <div className="space-y-4">
            <div className={`${getThemeColor(selectedGiftCard.theme)} h-32 rounded-lg relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white opacity-20">🎁</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-xl">{selectedGiftCard.name}</p>
                <p className="text-white opacity-80">₹{selectedGiftCard.currentBalance} available</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Card Number</span>
                <span className="text-gray-900 font-mono">{selectedGiftCard.cardNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Purchase Date</span>
                <span className="text-gray-900">{selectedGiftCard.purchaseDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Expiration Date</span>
                <span className="text-gray-900">{selectedGiftCard.expiryDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Remaining Balance</span>
                <span className="text-gray-900 font-medium">₹{selectedGiftCard.currentBalance}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Original Value</span>
                <span className="text-gray-900">₹{selectedGiftCard.originalValue}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Last Used</span>
                <span className="text-gray-900">{selectedGiftCard.lastUsed}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Status</span>
                <Badge variant={getStatusBadgeVariant(selectedGiftCard.status)}>
                  {selectedGiftCard.status.charAt(0).toUpperCase() + selectedGiftCard.status.slice(1)}
                </Badge>
              </div>
            </div>
            <Separator />
            <Button variant="outline" className="w-full">
              View Full Transaction History
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
