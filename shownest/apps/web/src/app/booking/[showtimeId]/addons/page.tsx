'use client'

import { useState } from 'react'
import { Button, Input, Card, CardContent, Badge, Tabs, TabsList, TabsTrigger, TabsContent, Alert, Separator, EmptyState } from '@shownest/ui'
import Link from 'next/link'

// Mock booking data
const mockBooking = {
  movie: {
    title: 'The Grand Adventure',
  },
  venue: {
    name: 'PVR Cinemas',
  },
  date: 'Jan 25, 2026',
  showtime: '7:30 PM',
  selectedSeats: ['A3', 'A4', 'A5'],
  ticketQuantity: 3,
  ticketTotal: 1650,
}

// Mock add-ons data
const mockAddons = [
  // Food & Beverages
  {
    id: 'addon-1',
    name: 'Caramel Popcorn (Large)',
    category: 'food',
    description: 'Sweet and buttery caramel popcorn',
    price: 180,
    image: 'https://via.placeholder.com/200x150/FFB84D/FFFFFF?text=Popcorn',
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 'addon-2',
    name: 'Nachos with Cheese',
    category: 'food',
    description: 'Crispy nachos with melted cheese dip',
    price: 220,
    image: 'https://via.placeholder.com/200x150/F59E0B/FFFFFF?text=Nachos',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'addon-3',
    name: 'French Fries',
    category: 'food',
    description: 'Golden crispy french fries',
    price: 150,
    image: 'https://via.placeholder.com/200x150/FCD34D/FFFFFF?text=Fries',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'addon-4',
    name: 'Pizza Slice',
    category: 'food',
    description: 'Fresh baked pizza slice',
    price: 200,
    image: 'https://via.placeholder.com/200x150/EF4444/FFFFFF?text=Pizza',
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 'addon-5',
    name: 'Coca-Cola (Large)',
    category: 'drinks',
    description: 'Refreshing cold drink',
    price: 120,
    image: 'https://via.placeholder.com/200x150/DC2626/FFFFFF?text=Coke',
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 'addon-6',
    name: 'Pepsi (Large)',
    category: 'drinks',
    description: 'Refreshing cold drink',
    price: 120,
    image: 'https://via.placeholder.com/200x150/1E40AF/FFFFFF?text=Pepsi',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'addon-7',
    name: 'Iced Tea',
    category: 'drinks',
    description: 'Refreshing iced tea with lemon',
    price: 100,
    image: 'https://via.placeholder.com/200x150/10B981/FFFFFF?text=Tea',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'addon-8',
    name: 'Coffee',
    category: 'drinks',
    description: 'Hot brewed coffee',
    price: 90,
    image: 'https://via.placeholder.com/200x150/78350F/FFFFFF?text=Coffee',
    isPopular: false,
    isAvailable: true,
  },
  // Merchandise
  {
    id: 'addon-9',
    name: 'Movie Poster',
    category: 'merchandise',
    description: 'Official movie poster',
    price: 350,
    image: 'https://via.placeholder.com/200x150/8B5CF6/FFFFFF?text=Poster',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'addon-10',
    name: 'Movie T-Shirt',
    category: 'merchandise',
    description: 'Official movie t-shirt',
    price: 599,
    image: 'https://via.placeholder.com/200x150/6366F1/FFFFFF?text=T-Shirt',
    isPopular: true,
    isAvailable: true,
  },
  // Premium Services
  {
    id: 'addon-11',
    name: 'VIP Lounge Access',
    category: 'premium',
    description: 'Access to exclusive VIP lounge',
    price: 500,
    image: 'https://via.placeholder.com/200x150/7C3AED/FFFFFF?text=VIP',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'addon-12',
    name: 'Priority Entry',
    category: 'premium',
    description: 'Skip the line with priority entry',
    price: 150,
    image: 'https://via.placeholder.com/200x150/EC4899/FFFFFF?text=Priority',
    isPopular: false,
    isAvailable: true,
  },
]

// Mock combo deals
const mockCombos = [
  {
    id: 'combo-1',
    name: 'Classic Combo',
    items: ['Caramel Popcorn (Large)', 'Coca-Cola (Large)'],
    originalPrice: 300,
    discountedPrice: 250,
    savings: 50,
    image: 'https://via.placeholder.com/200x150/3B82F6/FFFFFF?text=Combo+1',
  },
  {
    id: 'combo-2',
    name: 'Family Combo',
    items: ['Caramel Popcorn (Large) x2', 'Nachos with Cheese', 'Coca-Cola (Large) x2'],
    originalPrice: 700,
    discountedPrice: 550,
    savings: 150,
    image: 'https://via.placeholder.com/200x150/10B981/FFFFFF?text=Combo+2',
  },
  {
    id: 'combo-3',
    name: 'Couple Combo',
    items: ['Pizza Slice x2', 'Coca-Cola (Large) x2'],
    originalPrice: 640,
    discountedPrice: 500,
    savings: 140,
    image: 'https://via.placeholder.com/200x150/F59E0B/FFFFFF?text=Combo+3',
  },
]

// Mock recommended add-ons
const mockRecommended = [
  {
    id: 'addon-1',
    name: 'Caramel Popcorn (Large)',
    price: 180,
    image: 'https://via.placeholder.com/200x150/FFB84D/FFFFFF?text=Popcorn',
    reason: 'Frequently bought together',
  },
  {
    id: 'addon-5',
    name: 'Coca-Cola (Large)',
    price: 120,
    image: 'https://via.placeholder.com/200x150/DC2626/FFFFFF?text=Coke',
    reason: 'Perfect with popcorn',
  },
]

// Mock offers
const mockOffers = [
  { id: 'offer-1', title: 'Combo Discount', description: 'Get 20% off on all combos', discount: 50 },
  { id: 'offer-2', title: 'Bank Offer', description: 'Use HDFC card for ₹100 off', discount: 100 },
]

export default function AddonsPage({ params }: { params: { showtimeId: string } }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({})
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'food', label: 'Food' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'merchandise', label: 'Merchandise' },
    { id: 'premium', label: 'Premium' },
    { id: 'combos', label: 'Combos' },
  ]

  const filteredAddons = mockAddons.filter((addon) => {
    const matchesCategory = selectedCategory === 'all' || 
      selectedCategory === 'combos' || 
      addon.category === selectedCategory
    const matchesSearch = !searchQuery || 
      addon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleQuantityChange = (addonId: string, delta: number) => {
    setAddonQuantities((prev) => {
      const current = prev[addonId] || 0
      const newQuantity = Math.max(0, current + delta)
      if (newQuantity === 0) {
        const { [addonId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [addonId]: newQuantity }
    })
  }

  const calculateAddonsTotal = () => {
    let total = 0
    Object.entries(addonQuantities).forEach(([addonId, quantity]) => {
      const addon = mockAddons.find((a) => a.id === addonId)
      if (addon) {
        total += addon.price * quantity
      }
    })
    return total
  }

  const addonsTotal = calculateAddonsTotal()
  const convenienceFee = addonsTotal > 0 ? 30 : 0
  const taxes = Math.round((addonsTotal + convenienceFee) * 0.18)
  const discount = selectedOffer ? mockOffers.find(o => o.id === selectedOffer)?.discount || 0 : 0
  const grandTotal = mockBooking.ticketTotal + addonsTotal + convenienceFee + taxes - discount

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/booking/${params.showtimeId}/seats`}>
              <Button variant="ghost" size="sm">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">Add-ons</h1>
              <p className="text-sm text-gray-600">Enhance your movie experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Summary Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex flex-wrap gap-4">
              <div>
                <span className="text-gray-500">Movie:</span>
                <span className="font-medium ml-1">{mockBooking.movie.title}</span>
              </div>
              <div>
                <span className="text-gray-500">Venue:</span>
                <span className="font-medium ml-1">{mockBooking.venue.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>
                <span className="font-medium ml-1">{mockBooking.date}, {mockBooking.showtime}</span>
              </div>
              <div>
                <span className="text-gray-500">Seats:</span>
                <span className="font-medium ml-1">{mockBooking.selectedSeats.join(', ')}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-gray-500">Tickets:</span>
                <span className="font-medium ml-1">₹{mockBooking.ticketTotal}</span>
              </div>
              <div>
                <span className="text-gray-500">Add-ons:</span>
                <span className="font-medium ml-1">₹{addonsTotal}</span>
              </div>
              <div className="font-bold text-blue-700">
                Total: ₹{grandTotal}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Add-ons Content */}
          <div className="flex-1">
            {/* Search & Filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search add-ons..."
                  className="pl-12 pr-12"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="mb-6">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* All / Food / Drinks / Merchandise / Premium */}
              <TabsContent value={selectedCategory === 'combos' ? 'all' : selectedCategory}>
                {filteredAddons.length === 0 ? (
                  <EmptyState
                    icon={
                      <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    }
                    title="No Add-ons Available"
                    description="We couldn't find any add-ons matching your criteria."
                    action={
                      <Link href={`/booking/${params.showtimeId}/payment`}>
                        <Button variant="primary">Continue to Checkout</Button>
                      </Link>
                    }
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAddons.map((addon) => (
                      <Card key={addon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <img src={addon.image} alt={addon.name} className="w-full h-32 object-cover" />
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                              <p className="text-sm text-gray-500">{addon.description}</p>
                            </div>
                            {addon.isPopular && (
                              <Badge variant="warning" size="sm">Popular</Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <p className="text-lg font-bold text-gray-900">₹{addon.price}</p>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(addon.id, -1)}
                                disabled={!addonQuantities[addon.id]}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center font-medium">{addonQuantities[addon.id] || 0}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(addon.id, 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Combos */}
              <TabsContent value="combos">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockCombos.map((combo) => (
                    <Card key={combo.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-green-500">
                      <div className="relative">
                        <img src={combo.image} alt={combo.name} className="w-full h-32 object-cover" />
                        <Badge variant="success" className="absolute top-2 right-2">Save ₹{combo.savings}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{combo.name}</h3>
                        <ul className="text-sm text-gray-600 mb-3 space-y-1">
                          {combo.items.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 line-through">₹{combo.originalPrice}</p>
                            <p className="text-lg font-bold text-green-600">₹{combo.discountedPrice}</p>
                          </div>
                          <Button variant="primary" size="sm">
                            Add Combo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Recommended Add-ons */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended for You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockRecommended.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img src={item.image} alt={item.name} className="w-full h-24 object-cover" />
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-sm text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{item.reason}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-900">₹{item.price}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Promotional Offers */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Special Offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockOffers.map((offer) => (
                  <Card key={offer.id} className="bg-gradient-to-br from-purple-900 to-blue-900 border-purple-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="success" className="mb-2">Offer</Badge>
                          <h3 className="font-semibold text-lg">{offer.title}</h3>
                          <p className="text-sm text-gray-300">{offer.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">-₹{offer.discount}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:w-96">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Price Summary</h3>
                
                {/* Booking Details */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Movie</p>
                    <p className="font-medium">{mockBooking.movie.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="font-medium">{mockBooking.venue.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{mockBooking.date}, {mockBooking.showtime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-medium">{mockBooking.selectedSeats.join(', ')}</p>
                  </div>
                </div>

                {/* Selected Add-ons */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <label className="text-sm font-medium text-gray-900 mb-2 block">Selected Add-ons</label>
                  {Object.keys(addonQuantities).length === 0 ? (
                    <p className="text-sm text-gray-500">No add-ons selected</p>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(addonQuantities).map(([addonId, quantity]) => {
                        const addon = mockAddons.find((a) => a.id === addonId)
                        if (!addon || quantity === 0) return null
                        return (
                          <div key={addonId} className="flex justify-between text-sm">
                            <span>{addon.name} x{quantity}</span>
                            <span className="font-medium">₹{addon.price * quantity}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ticket Subtotal</span>
                    <span className="font-medium">₹{mockBooking.ticketTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Add-ons Total</span>
                    <span className="font-medium">₹{addonsTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Convenience Fee</span>
                    <span className="font-medium">₹{convenienceFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes (18%)</span>
                    <span className="font-medium">₹{taxes}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-₹{discount}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link href={`/booking/${params.showtimeId}/payment`}>
                    <Button variant="primary" className="w-full">
                      Continue to Checkout
                    </Button>
                  </Link>
                  <Link href={`/booking/${params.showtimeId}/payment`}>
                    <Button variant="outline" className="w-full">
                      Skip Add-ons
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
