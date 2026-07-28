'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Badge, Input, Label, Checkbox, Modal, Alert, Separator, EmptyState } from '@shownest/ui'
import Link from 'next/link'

// Mock payment method data
const mockPaymentMethods = [
  {
    id: 'card-1',
    type: 'card',
    brand: 'Visa',
    lastFour: '4587',
    cardholderName: 'Rahul Sharma',
    expiryDate: '12/26',
    isDefault: true,
  },
  {
    id: 'card-2',
    type: 'card',
    brand: 'Mastercard',
    lastFour: '2341',
    cardholderName: 'Rahul Sharma',
    expiryDate: '08/25',
    isDefault: false,
  },
  {
    id: 'upi-1',
    type: 'upi',
    upiId: 'rahul.sharma@okhdfcbank',
    provider: 'HDFC Bank',
    isDefault: false,
  },
]

type PaymentMethod = typeof mockPaymentMethods[0]

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addMethodType, setAddMethodType] = useState<'card' | 'upi'>('card')
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [cardForm, setCardForm] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveAsDefault: false,
  })
  const [upiForm, setUpiForm] = useState({
    upiId: '',
    saveAsDefault: false,
  })

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    )
  }

  const handleEdit = (id: string) => {
    // Placeholder for edit payment method functionality
  }

  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
    }
  }

  const handleAddCard = () => {
    setIsSaving(true)
    setSaveStatus('idle')

    // Simulate API call
    setTimeout(() => {
      const newCard: PaymentMethod = {
        id: `card-${Date.now()}`,
        type: 'card',
        brand: 'Visa',
        lastFour: cardForm.cardNumber.slice(-4),
        cardholderName: cardForm.cardholderName,
        expiryDate: cardForm.expiryDate,
        isDefault: cardForm.saveAsDefault,
      }

      setPaymentMethods((prev) => {
        if (cardForm.saveAsDefault) {
          return prev.map((m) => ({ ...m, isDefault: false })).concat(newCard)
        }
        return prev.concat(newCard)
      })

      setIsSaving(false)
      setIsAddModalOpen(false)
      setSaveStatus('success')
      setCardForm({ cardholderName: '', cardNumber: '', expiryDate: '', cvv: '', saveAsDefault: false })

      setTimeout(() => setSaveStatus('idle'), 3000)
    }, 1500)
  }

  const handleAddUPI = () => {
    setIsSaving(true)
    setSaveStatus('idle')

    // Simulate API call
    setTimeout(() => {
      const newUPI: PaymentMethod = {
        id: `upi-${Date.now()}`,
        type: 'upi',
        upiId: upiForm.upiId,
        provider: 'Unknown',
        isDefault: upiForm.saveAsDefault,
      }

      setPaymentMethods((prev) => {
        if (upiForm.saveAsDefault) {
          return prev.map((m) => ({ ...m, isDefault: false })).concat(newUPI)
        }
        return prev.concat(newUPI)
      })

      setIsSaving(false)
      setIsAddModalOpen(false)
      setSaveStatus('success')
      setUpiForm({ upiId: '', saveAsDefault: false })

      setTimeout(() => setSaveStatus('idle'), 3000)
    }, 1500)
  }

  const getCardBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return (
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
        )
      case 'mastercard':
        return (
          <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
            MC
          </div>
        )
      case 'rupay':
        return (
          <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
            RuPay
          </div>
        )
      default:
        return (
          <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
            {brand.charAt(0)}
          </div>
        )
    }
  }

  const getUPIProviderIcon = (provider: string) => {
    return (
      <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
        UPI
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Methods</h1>
              <p className="text-gray-600">Manage your saved payment methods for faster checkout</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} variant="primary">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Payment Method
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Total Saved Payment Methods: {paymentMethods.length}
          </p>
        </div>

        {saveStatus === 'success' && (
          <Alert variant="success" className="mb-6">
            <p className="text-sm">Payment method added successfully!</p>
          </Alert>
        )}

        {/* Saved Payment Methods */}
        {paymentMethods.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
            title="No Payment Methods Added"
            description="Add a payment method to make your checkout experience faster and smoother."
            action={
              <Button onClick={() => setIsAddModalOpen(true)} variant="primary">
                Add Payment Method
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {method.type === 'card' ? (
                        <div className="flex items-center gap-4">
                          {getCardBrandIcon(method.brand || '')}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-gray-900">{method.brand}</p>
                              {method.isDefault && (
                                <Badge variant="success" size="sm">Default</Badge>
                              )}
                            </div>
                            <p className="text-gray-600">**** **** **** {method.lastFour}</p>
                            <p className="text-sm text-gray-500">{method.cardholderName}</p>
                            <p className="text-sm text-gray-500">Expires: {method.expiryDate}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          {getUPIProviderIcon(method.provider || '')}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-gray-900">UPI</p>
                              {method.isDefault && (
                                <Badge variant="success" size="sm">Default</Badge>
                              )}
                            </div>
                            <p className="text-gray-600">{method.upiId}</p>
                            <p className="text-sm text-gray-500">{method.provider}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      {!method.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(method.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(method.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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

      {/* Add Payment Method Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Payment Method"
      >
        <div className="space-y-6">
          {/* Method Type Selection */}
          <div className="flex gap-4">
            <Button
              variant={addMethodType === 'card' ? 'primary' : 'outline'}
              onClick={() => setAddMethodType('card')}
              className="flex-1"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Card
            </Button>
            <Button
              variant={addMethodType === 'upi' ? 'primary' : 'outline'}
              onClick={() => setAddMethodType('upi')}
              className="flex-1"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              UPI
            </Button>
          </div>

          {addMethodType === 'card' ? (
            /* Card Form */
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardholderName">Cardholder Name *</Label>
                <Input
                  id="cardholderName"
                  value={cardForm.cardholderName}
                  onChange={(e) => setCardForm({ ...cardForm, cardholderName: e.target.value })}
                  placeholder="Enter cardholder name"
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  value={cardForm.cardNumber}
                  onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    value={cardForm.expiryDate}
                    onChange={(e) => setCardForm({ ...cardForm, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    type="password"
                    value={cardForm.cvv}
                    onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveAsDefaultCard"
                  checked={cardForm.saveAsDefault}
                  onCheckedChange={(checked) => setCardForm({ ...cardForm, saveAsDefault: checked as boolean })}
                />
                <label htmlFor="saveAsDefaultCard" className="text-sm text-gray-700 cursor-pointer">
                  Set as default payment method
                </label>
              </div>
              <Separator />
              <div className="flex gap-3">
                <Button
                  onClick={handleAddCard}
                  variant="primary"
                  disabled={isSaving || !cardForm.cardholderName || !cardForm.cardNumber || !cardForm.expiryDate || !cardForm.cvv}
                  className="flex-1"
                >
                  {isSaving ? 'Adding...' : 'Add Card'}
                </Button>
                <Button
                  onClick={() => setIsAddModalOpen(false)}
                  variant="outline"
                  disabled={isSaving}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            /* UPI Form */
            <div className="space-y-4">
              <div>
                <Label htmlFor="upiId">UPI ID *</Label>
                <Input
                  id="upiId"
                  value={upiForm.upiId}
                  onChange={(e) => setUpiForm({ ...upiForm, upiId: e.target.value })}
                  placeholder="yourname@bank"
                />
              </div>
              <Alert variant="info">
                <p className="text-sm">
                  Enter your UPI ID (e.g., rahul@okhdfcbank). Make sure the UPI ID is linked to your bank account.
                </p>
              </Alert>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveAsDefaultUPI"
                  checked={upiForm.saveAsDefault}
                  onCheckedChange={(checked) => setUpiForm({ ...upiForm, saveAsDefault: checked as boolean })}
                />
                <label htmlFor="saveAsDefaultUPI" className="text-sm text-gray-700 cursor-pointer">
                  Set as default payment method
                </label>
              </div>
              <Separator />
              <div className="flex gap-3">
                <Button
                  onClick={handleAddUPI}
                  variant="primary"
                  disabled={isSaving || !upiForm.upiId}
                  className="flex-1"
                >
                  {isSaving ? 'Adding...' : 'Add UPI'}
                </Button>
                <Button
                  onClick={() => setIsAddModalOpen(false)}
                  variant="outline"
                  disabled={isSaving}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
