'use client'

import { useState } from 'react'
import { Button, Card, CardContent, Badge, Tabs, TabsList, TabsTrigger, TabsContent, Separator } from '@shownest/ui'
import Link from 'next/link'

const mockMatch = {
  id: 'sports-1',
  title: 'India vs Australia - T20 International',
  category: 'Cricket',
  venue: 'Wankhede Stadium',
  city: 'Mumbai',
  date: 'Sunday, Feb 22, 2026',
  time: '07:00 PM IST',
  startingPrice: '₹1,200',
  banner: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&auto=format&fit=crop&q=80',
  teams: [
    { name: 'India', flag: '🇮🇳', rank: '#1 T20 Team' },
    { name: 'Australia', flag: '🇦🇺', rank: '#2 T20 Team' },
  ],
  stands: [
    { id: 'stand-1', name: 'Sachin Tendulkar Stand (Tier 1)', price: '₹1,200', status: 'Available' },
    { id: 'stand-2', name: 'Garware Pavilion Premium', price: '₹2,500', status: 'Selling Fast' },
    { id: 'stand-3', name: 'President Box VIP', price: '₹6,000', status: 'Limited' },
  ],
}

export default function SportsDetailsPage() {
  const [selectedStand, setSelectedStand] = useState('stand-2')

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#281718]">
      {/* Hero Header */}
      <div className="relative bg-[#281718] text-white py-16">
        <div className="absolute inset-0 opacity-30">
          <img src={mockMatch.banner} alt={mockMatch.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#281718] via-[#281718]/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <Badge variant="success" className="bg-[#ba0036] text-white">
            {mockMatch.category} International
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white">{mockMatch.title}</h1>
          <p className="text-lg text-white/80">🏟️ {mockMatch.venue}, {mockMatch.city} • 📅 {mockMatch.date} • {mockMatch.time}</p>

          {/* Teams Matchup */}
          <div className="flex items-center justify-center gap-12 pt-6">
            <div className="text-center">
              <span className="text-5xl">{mockMatch.teams[0].flag}</span>
              <h3 className="text-2xl font-bold text-white mt-2 font-display">{mockMatch.teams[0].name}</h3>
              <span className="text-xs text-white/70">{mockMatch.teams[0].rank}</span>
            </div>
            <div className="text-2xl font-bold text-[#ba0036] font-display">VS</div>
            <div className="text-center">
              <span className="text-5xl">{mockMatch.teams[1].flag}</span>
              <h3 className="text-2xl font-bold text-white mt-2 font-display">{mockMatch.teams[1].name}</h3>
              <span className="text-xs text-white/70">{mockMatch.teams[1].rank}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold font-display text-[#281718]">Select Stadium Stand</h2>
          <div className="space-y-4">
            {mockMatch.stands.map((stand) => (
              <Card
                key={stand.id}
                className={`p-6 rounded-xl cursor-pointer border transition-all ${
                  selectedStand === stand.id
                    ? 'border-[#ba0036] bg-[#ffe9e9]/30 ring-2 ring-[#ba0036]/20'
                    : 'border-[#e5bdbe] bg-white hover:border-[#ba0036]'
                }`}
                onClick={() => setSelectedStand(stand.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#281718] font-display">{stand.name}</h3>
                    <Badge variant="outline" className="mt-1 border-amber-300 text-amber-700">
                      {stand.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#281718] font-display">{stand.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div>
          <Card className="bg-white border-[#e5bdbe] p-6 rounded-xl space-y-6 sticky top-24 shadow-sm">
            <h3 className="text-xl font-bold font-display text-[#281718]">Match Tickets</h3>
            <div className="space-y-2 text-sm text-[#5c3f41]">
              <div className="flex justify-between">
                <span>Selected Stand:</span>
                <span className="font-bold text-[#281718]">
                  {mockMatch.stands.find((s) => s.id === selectedStand)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ticket Price:</span>
                <span className="font-bold text-[#281718]">
                  {mockMatch.stands.find((s) => s.id === selectedStand)?.price}
                </span>
              </div>
            </div>

            <Link href="/booking/sports-showtime-1/seats" className="block">
              <Button variant="primary" size="lg" className="w-full bg-[#ba0036] hover:bg-[#e21e4a] text-white">
                Book Tickets Now
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
