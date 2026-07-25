'use client'

import { useState } from 'react'
import { Button, Card, CardContent, Badge, Tabs, TabsList, TabsTrigger, TabsContent, Avatar, Separator } from '@shownest/ui'
import Link from 'next/link'

const mockEvent = {
  id: 'event-1',
  title: 'Neon Horizon World Tour: Live in Concert',
  category: 'Concert',
  venue: 'Jio World Convention Centre, BKC',
  city: 'Mumbai',
  date: 'Saturday, Feb 14, 2026',
  time: '07:00 PM onwards',
  duration: '3h 30m',
  ageRestriction: '16+ Only',
  startingPrice: '₹1,999',
  banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&auto=format&fit=crop&q=80',
  poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
  description: 'Experience an unforgettable night with international synth-pop sensation Neon Horizon! Featuring cutting-edge laser shows, immersive audio engineering, and live guest performances by top electronic artists.',
  artist: {
    name: 'Neon Horizon',
    role: 'Headliner Band',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
    followers: '2.4M Followers',
  },
  ticketTiers: [
    { id: 'tier-1', name: 'General Admission - GA', price: '₹1,999', perks: 'Entry to GA Zone, Standard Bar Access', available: true },
    { id: 'tier-2', name: 'Front Phase Fan Pit', price: '₹3,999', perks: 'Closest proximity to main stage, Dedicated Entry Lane', available: true },
    { id: 'tier-3', name: 'VIP Lounge Pass', price: '₹7,499', perks: 'Elevated Deck View, Unlimited F&B Tokens, Reserved Lounge Seating', available: true },
  ],
}

export default function EventDetailsPage({ params }: { params?: { city?: string; slug?: string } }) {
  const [selectedTier, setSelectedTier] = useState<string>('tier-2')
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#281718]">
      {/* Event Header Banner */}
      <div className="relative bg-[#281718] text-white">
        <div className="absolute inset-0 opacity-40">
          <img src={mockEvent.banner} alt={mockEvent.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#281718] via-[#281718]/70 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            <img
              src={mockEvent.poster}
              alt={mockEvent.title}
              className="w-60 h-80 object-cover rounded-xl shadow-xl border-2 border-white/20"
            />
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="success" className="bg-[#ba0036] text-white font-medium">
                  {mockEvent.category}
                </Badge>
                <Badge variant="outline" className="text-white border-white/30">
                  {mockEvent.ageRestriction}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold font-display text-white">{mockEvent.title}</h1>
              <p className="text-white/80 font-medium">{mockEvent.venue}, {mockEvent.city}</p>
              <p className="text-sm text-white/70">📅 {mockEvent.date} • 🕒 {mockEvent.time}</p>

              <div className="flex gap-4 pt-4">
                <Link href="#tickets">
                  <Button variant="primary" size="lg" className="bg-[#ba0036] hover:bg-[#e21e4a] text-white">
                    Book Tickets ({mockEvent.startingPrice}+)
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? 'bg-[#ba0036] text-white' : 'border-white/30 text-white hover:bg-white/10'}
                >
                  ♥ {isWishlisted ? 'Saved' : 'Save Event'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Ticket Tiers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10" id="tickets">
        <div className="lg:col-span-2 space-y-8">
          {/* About Event */}
          <Card className="bg-white border-[#e5bdbe] p-8 rounded-xl space-y-4 shadow-sm">
            <h2 className="text-2xl font-bold font-display text-[#281718]">About the Event</h2>
            <p className="text-[#5c3f41] leading-relaxed">{mockEvent.description}</p>

            <Separator className="my-6 border-[#e5bdbe]" />

            {/* Artist Info */}
            <h3 className="text-xl font-bold font-display text-[#281718]">Featured Artist</h3>
            <div className="flex items-center gap-4 bg-[#fff8f7] p-4 rounded-xl border border-[#e5bdbe]">
              <Avatar src={mockEvent.artist.image} alt={mockEvent.artist.name} className="w-16 h-16 border-2 border-[#ba0036]" />
              <div>
                <h4 className="font-bold text-[#281718] text-lg">{mockEvent.artist.name}</h4>
                <p className="text-xs text-[#5c3f41]">{mockEvent.artist.role} • {mockEvent.artist.followers}</p>
              </div>
            </div>
          </Card>

          {/* Ticket Options */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-[#281718]">Select Ticket Tier</h2>
            {mockEvent.ticketTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`p-6 rounded-xl cursor-pointer transition-all border ${
                  selectedTier === tier.id
                    ? 'border-[#ba0036] bg-[#ffe9e9]/30 shadow-md ring-2 ring-[#ba0036]/20'
                    : 'border-[#e5bdbe] bg-white hover:border-[#ba0036]'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#281718] font-display">{tier.name}</h3>
                    <p className="text-sm text-[#5c3f41] mt-1">{tier.perks}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#281718] font-display">{tier.price}</span>
                    <span className="block text-xs text-emerald-700 font-medium">Selling Fast</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <Card className="bg-white border-[#e5bdbe] p-6 rounded-xl space-y-6 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold font-display text-[#281718]">Booking Summary</h3>
            <div className="space-y-3 text-sm text-[#5c3f41]">
              <div className="flex justify-between">
                <span>Selected Tier:</span>
                <span className="font-bold text-[#281718]">
                  {mockEvent.ticketTiers.find((t) => t.id === selectedTier)?.name.split('-')[0]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Price per ticket:</span>
                <span className="font-bold text-[#281718]">
                  {mockEvent.ticketTiers.find((t) => t.id === selectedTier)?.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Booking Fee:</span>
                <span className="font-bold text-[#281718]">₹49</span>
              </div>
              <Separator className="my-2 border-[#e5bdbe]" />
              <div className="flex justify-between text-base font-bold text-[#281718]">
                <span>Total Amount:</span>
                <span className="text-[#ba0036] font-display text-xl">
                  ₹{parseInt(mockEvent.ticketTiers.find((t) => t.id === selectedTier)?.price.replace(/[^0-9]/g, '') || '1999') + 49}
                </span>
              </div>
            </div>

            <Link href="/booking/event-showtime-1/seats" className="block">
              <Button variant="primary" size="lg" className="w-full bg-[#ba0036] hover:bg-[#e21e4a] text-white">
                Proceed to Checkout
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
