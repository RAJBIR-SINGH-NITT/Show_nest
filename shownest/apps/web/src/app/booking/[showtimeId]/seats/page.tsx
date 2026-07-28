'use client'

import { useState } from 'react'
import { Button, Card, CardContent, Badge, Alert, Separator } from '@shownest/ui'
import Link from 'next/link'

// Mock booking data
const mockBooking = {
  movie: {
    id: 'movie-1',
    title: 'The Grand Adventure',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80',
  },
  venue: {
    name: 'PVR IMAX Phoenix Palladium',
    address: 'Phoenix Mall, Lower Parel',
  },
  date: 'Jan 25, 2026',
  showtime: '7:30 PM',
  screenFormat: 'IMAX 3D',
  language: 'English',
}

// Mock seat sections
const mockSeatSections = [
  {
    id: 'vip',
    name: 'VIP Recliner',
    price: 650,
    rows: ['J'],
    seatsPerRow: 8,
    seatType: 'vip',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 550,
    rows: ['A', 'B'],
    seatsPerRow: 10,
    seatType: 'vip',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 450,
    rows: ['C', 'D', 'E'],
    seatsPerRow: 12,
    seatType: 'standard',
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 350,
    rows: ['F', 'G', 'H', 'I'],
    seatsPerRow: 14,
    seatType: 'standard',
  },
]

// Mock seat availability (seatId: status)
const mockSeatAvailability: Record<string, 'available' | 'booked' | 'reserved' | 'disabled' | 'companion'> = {
  // Platinum row A
  'A1': 'booked', 'A2': 'booked', 'A3': 'available', 'A4': 'available', 'A5': 'available',
  'A6': 'available', 'A7': 'booked', 'A8': 'booked', 'A9': 'available', 'A10': 'available',
  // Platinum row B
  'B1': 'available', 'B2': 'available', 'B3': 'booked', 'B4': 'booked', 'B5': 'available',
  'B6': 'available', 'B7': 'available', 'B8': 'booked', 'B9': 'available', 'B10': 'available',
  // Gold row C
  'C1': 'booked', 'C2': 'available', 'C3': 'available', 'C4': 'available', 'C5': 'booked',
  'C6': 'booked', 'C7': 'available', 'C8': 'available', 'C9': 'available', 'C10': 'booked',
  'C11': 'available', 'C12': 'available',
  // Gold row D
  'D1': 'available', 'D2': 'booked', 'D3': 'booked', 'D4': 'available', 'D5': 'available',
  'D6': 'available', 'D7': 'booked', 'D8': 'booked', 'D9': 'available', 'D10': 'available',
  'D11': 'booked', 'D12': 'available',
  // Gold row E
  'E1': 'available', 'E2': 'available', 'E3': 'available', 'E4': 'booked', 'E5': 'booked',
  'E6': 'available', 'E7': 'available', 'E8': 'available', 'E9': 'booked', 'E10': 'booked',
  'E11': 'available', 'E12': 'available',
  // Silver row F
  'F1': 'booked', 'F2': 'booked', 'F3': 'available', 'F4': 'available', 'F5': 'available',
  'F6': 'available', 'F7': 'available', 'F8': 'booked', 'F9': 'booked', 'F10': 'available',
  'F11': 'available', 'F12': 'available', 'F13': 'available', 'F14': 'booked',
  // Silver row G
  'G1': 'available', 'G2': 'booked', 'G3': 'booked', 'G4': 'available', 'G5': 'available',
  'G6': 'booked', 'G7': 'available', 'G8': 'available', 'G9': 'available', 'G10': 'booked',
  'G11': 'booked', 'G12': 'available', 'G13': 'booked', 'G14': 'available',
  // Silver row H
  'H1': 'available', 'H2': 'available', 'H3': 'available', 'H4': 'booked', 'H5': 'booked',
  'H6': 'available', 'H7': 'booked', 'H8': 'available', 'H9': 'available', 'H10': 'available',
  'H11': 'booked', 'H12': 'available', 'H13': 'available', 'H14': 'booked',
  // Silver row I
  'I1': 'booked', 'I2': 'available', 'I3': 'available', 'I4': 'available', 'I5': 'booked',
  'I6': 'booked', 'I7': 'available', 'I8': 'booked', 'I9': 'available', 'I10': 'available',
  'I11': 'available', 'I12': 'booked', 'I13': 'available', 'I14': 'available',
  // VIP row J
  'J1': 'available', 'J2': 'booked', 'J3': 'available', 'J4': 'available', 'J5': 'booked',
  'J6': 'available', 'J7': 'available', 'J8': 'booked',
}

// Mock offers
const mockOffers = [
  { id: 'offer-1', title: 'HDFC Bank Offer', description: 'Get 20% off on bookings', discount: 50 },
  { id: 'offer-2', title: 'Student Discount', description: '15% off with valid ID', discount: 37 },
]

export default function SeatSelectionPage({ params }: { params: { showtimeId: string } }) {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set())
  const [ticketQuantity, setTicketQuantity] = useState(2)
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSeatClick = (seatId: string, status: string) => {
    if (status !== 'available') return

    const newSelectedSeats = new Set(selectedSeats)
    
    if (newSelectedSeats.has(seatId)) {
      newSelectedSeats.delete(seatId)
    } else {
      if (newSelectedSeats.size >= ticketQuantity) {
        setValidationError(`You can only select ${ticketQuantity} seat(s)`)
        return
      }
      newSelectedSeats.add(seatId)
    }
    
    setSelectedSeats(newSelectedSeats)
    setValidationError(null)
  }

  const handleClearSelection = () => {
    setSelectedSeats(new Set())
    setValidationError(null)
  }

  const getSeatStatus = (seatId: string): string => {
    if (selectedSeats.has(seatId)) return 'selected'
    return mockSeatAvailability[seatId] || 'available'
  }

  const getSeatStyles = (status: string, seatType: string) => {
    const baseStyles = 'w-8 h-8 sm:w-9 sm:h-9 rounded-md transition-all duration-300 cursor-pointer flex items-center justify-center text-[11px] font-bold select-none'
    
    // Selected: Bright Gold
    if (status === 'selected') {
      return `${baseStyles} bg-amber-400 border-2 border-amber-300 text-black shadow-[0_0_16px_rgba(245,158,11,0.9)] scale-110 z-10`
    }
    
    // Booked: Dark Red
    if (status === 'booked') {
      return `${baseStyles} bg-[#3b0d11] border border-[#5e141b] text-red-900/60 cursor-not-allowed`
    }
    
    if (status === 'reserved' || status === 'disabled' || status === 'companion') {
      return `${baseStyles} bg-[#26090c] border border-[#3b0d11] text-red-950 cursor-not-allowed opacity-60`
    }
    
    // Available VIP seats: Gold
    if (seatType === 'vip') {
      return `${baseStyles} bg-gradient-to-br from-amber-500/80 to-amber-700/80 border border-amber-400/80 text-black shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:brightness-125 hover:scale-105`
    }
    
    // Available Standard seats: Gray
    return `${baseStyles} bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:border-amber-400/50 hover:text-white hover:scale-105`
  }

  const calculateTotal = () => {
    let subtotal = 0
    selectedSeats.forEach(seatId => {
      const section = mockSeatSections.find(s => 
        s.rows.some(row => seatId.startsWith(row))
      )
      if (section) {
        subtotal += section.price
      }
    })
    
    const convenienceFee = selectedSeats.size > 0 ? 30 : 0
    const bookingFee = selectedSeats.size > 0 ? 20 : 0
    const taxes = Math.round((subtotal + convenienceFee + bookingFee) * 0.18)
    const discount = selectedOffer ? mockOffers.find(o => o.id === selectedOffer)?.discount || 0 : 0
    
    return {
      subtotal,
      convenienceFee,
      bookingFee,
      taxes,
      discount,
      total: subtotal + convenienceFee + bookingFee + taxes - discount,
    }
  }

  const pricing = calculateTotal()

  return (
    <div className="min-h-screen bg-[#050304] text-white relative overflow-hidden">
      {/* Dim Lighting & Projector Glow Overlay */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.22)_0%,_rgba(255,255,255,0.06)_30%,_transparent_70%)] pointer-events-none" />

      {/* Header Bar */}
      <div className="bg-[#0b080a]/90 border-b border-white/10 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/booking/venue-showtime">
                <Button variant="ghost" size="sm" className="text-amber-200 hover:bg-white/10">
                  ← Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <img src={mockBooking.movie.poster} alt={mockBooking.movie.title} className="w-10 h-14 object-cover rounded-md border border-amber-400/30" />
                <div>
                  <h1 className="text-base font-bold font-display text-white">{mockBooking.movie.title}</h1>
                  <p className="text-xs text-amber-100/60">{mockBooking.venue.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="border-amber-400/30 text-amber-300 text-xs">{mockBooking.date}</Badge>
              <Badge variant="outline" className="border-amber-400/30 text-amber-300 text-xs">{mockBooking.showtime}</Badge>
              <Badge variant="outline" className="border-amber-400/30 text-amber-300 text-xs">{mockBooking.screenFormat}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Theatre Area & Seat Map */}
          <div className="flex-1 space-y-8">
            {/* Ticket Quantity Selector & Legend */}
            <div className="bg-[#120e10] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-amber-200/70 uppercase">Ticket Quantity:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setTicketQuantity(num)
                        if (selectedSeats.size > num) {
                          setSelectedSeats(new Set())
                        }
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        ticketQuantity === num
                          ? 'bg-amber-400 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                          : 'bg-zinc-800 text-white hover:bg-zinc-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Code Legend */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-zinc-800 border border-zinc-700" />
                  <span className="text-zinc-300">Available (Gray)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-amber-500 border border-amber-400 shadow-[0_0_6px_#f59e0b]" />
                  <span className="text-amber-300">VIP (Gold)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-amber-400 border border-amber-300 shadow-[0_0_10px_#f59e0b]" />
                  <span className="text-amber-300 font-bold">Selected (Bright Gold)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-[#3b0d11] border border-[#5e141b]" />
                  <span className="text-red-400">Booked (Dark Red)</span>
                </div>
              </div>
            </div>

            {/* Large IMAX Screen Visualizer */}
            <div className="space-y-3 text-center pt-4">
              <div className="relative mx-auto max-w-2xl">
                {/* Curved Screen Curve */}
                <div className="h-4 w-full bg-gradient-to-r from-amber-400/20 via-amber-300 to-amber-400/20 rounded-[100%] shadow-[0_0_30px_rgba(245,158,11,0.6)] border-t-2 border-amber-300" />
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-amber-200/60 pt-2">
                  All Eyes This Way • IMAX Screen 1
                </p>
              </div>
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="bg-[#3b0d11] border border-red-500/50 text-red-200 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
                <span>{validationError}</span>
                <button onClick={() => setValidationError(null)} className="text-red-400 font-bold">✕</button>
              </div>
            )}

            {/* Cinema Seat Grid Map */}
            <div className="bg-[#0e0a0c]/80 border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl backdrop-blur-md overflow-x-auto">
              {mockSeatSections.map((section) => (
                <div key={section.id} className="space-y-3 min-w-[500px]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-1 text-xs">
                    <span className="font-extrabold font-display uppercase tracking-wider text-amber-300">
                      {section.name} — ₹{section.price}
                    </span>
                    <span className="text-white/40">{section.seatType === 'vip' ? 'Recliner Luxury' : 'Standard Multiplex'}</span>
                  </div>

                  <div className="space-y-2.5">
                    {section.rows.map((row) => (
                      <div key={row} className="flex items-center justify-center gap-2">
                        <span className="w-5 text-xs font-bold text-amber-300 text-right pr-2">{row}</span>
                        <div className="flex gap-2">
                          {Array.from({ length: section.seatsPerRow }, (_, i) => {
                            const seatId = `${row}${i + 1}`
                            const status = getSeatStatus(seatId)
                            return (
                              <button
                                key={seatId}
                                onClick={() => handleSeatClick(seatId, status)}
                                className={getSeatStyles(status, section.seatType)}
                                disabled={status === 'booked' || status === 'reserved'}
                              >
                                {i + 1}
                              </button>
                            )
                          })}
                        </div>
                        <span className="w-5 text-xs font-bold text-amber-300 text-left pl-2">{row}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-[#120e10] border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
              <h2 className="text-lg font-bold font-display text-white border-b border-white/10 pb-3">
                Booking Summary
              </h2>

              {/* Selected Seats Listing */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-100/70">
                  <span>Seats ({selectedSeats.size})</span>
                  {selectedSeats.size > 0 && (
                    <button onClick={handleClearSelection} className="text-[#ba0036] hover:underline font-semibold">
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {selectedSeats.size === 0 ? (
                    <span className="text-xs text-white/40 italic">No seats selected yet</span>
                  ) : (
                    Array.from(selectedSeats).map((seat) => (
                      <span key={seat} className="bg-amber-400 text-black font-extrabold text-xs px-2.5 py-1 rounded-md shadow-sm">
                        {seat}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/80">
                  <span>Tickets Subtotal</span>
                  <span className="font-bold">₹{pricing.subtotal}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Convenience & Booking Fee</span>
                  <span>₹{pricing.convenienceFee + pricing.bookingFee}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>GST (18%)</span>
                  <span>₹{pricing.taxes}</span>
                </div>

                <div className="flex justify-between text-base font-extrabold font-display text-amber-300 pt-3 border-t border-white/10">
                  <span>Total Amount</span>
                  <span>₹{pricing.total}</span>
                </div>
              </div>

              {/* Proceed to Add-ons Button */}
              <Link href={selectedSeats.size > 0 ? `/booking/${params.showtimeId}/addons` : '#'}>
                <Button
                  size="lg"
                  disabled={selectedSeats.size === 0}
                  className={`w-full font-bold py-3.5 rounded-xl shadow-xl transition-all ${
                    selectedSeats.size > 0
                      ? 'bg-gradient-to-r from-[#ba0036] via-amber-600 to-[#ba0036] hover:brightness-110 text-white'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  Proceed To Add-ons →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
