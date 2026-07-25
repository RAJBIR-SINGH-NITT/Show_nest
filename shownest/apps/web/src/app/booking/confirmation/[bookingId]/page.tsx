'use client'

import { Button, Card, CardHeader, CardContent, Badge, Alert, Separator, QRCode } from '@shownest/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock booking data
const mockBookingData = {
  bookingId: 'SN-2026-78542',
  bookingDate: 'Sat, Jan 25, 2026 at 6:35 PM',
  poster: '/assets/heroes/success/hero-backdrop.jpg',
  fallbackPoster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
  moviePoster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
  title: 'The Grand Adventure',
  language: 'English',
  format: 'IMAX 3D',
  duration: '2h 30m',
  theatre: 'PVR IMAX Phoenix Palladium',
  screen: 'IMAX Screen 1',
  city: 'Mumbai',
  date: 'Sat, Jan 25, 2026',
  showtime: '7:30 PM',
  seats: ['J5', 'J6', 'J7'],
  numberOfTickets: 3,
  ticketPrice: 1050,
  convenienceFee: 30,
  taxes: 45,
  addons: 570,
  discount: 100,
  totalPaid: 1595,
  paymentMethod: 'UPI (Google Pay)',
  paymentStatus: 'Confirmed & Verified',
}

export default function ConfirmationPage() {
  const params = useParams()
  const bookingId = (params?.bookingId as string) || mockBookingData.bookingId

  const handleDownloadTicket = () => {
    console.log('Download ticket clicked for booking:', bookingId)
  }

  const handleShareBooking = () => {
    console.log('Share booking clicked for booking:', bookingId)
  }

  return (
    <div className="min-h-screen bg-[#070506] text-white relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Hero Backdrop Sourced from /assets/heroes/success/ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <img
          src={mockBookingData.poster}
          alt="Success Backdrop"
          className="w-full h-full object-cover animate-kenburns"
          onError={(e) => {
            e.currentTarget.src = mockBookingData.fallbackPoster
          }}
        />
      </div>

      {/* Golden Spotlight & Confetti Sparkles Ambient Overlay */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.3)_0%,_rgba(186,0,54,0.12)_45%,_transparent_75%)] pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      {/* Floating Golden Confetti Stars */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-16 left-1/5 text-amber-300 text-lg animate-particle-1">✨</div>
        <div className="absolute top-28 right-1/4 text-amber-400 text-xl animate-particle-2">🎉</div>
        <div className="absolute top-40 left-1/3 text-amber-200 text-sm animate-particle-3">⭐</div>
        <div className="absolute top-20 right-1/5 text-amber-300 text-base animate-particle-1" style={{ animationDelay: '-3s' }}>🍿</div>
      </div>

      {/* Dark Vignetting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070506]/80 via-transparent to-[#070506] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-20 space-y-10">
        {/* Animated Success Checkmark & Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-[#ba0036] rounded-full p-1 shadow-[0_0_35px_rgba(245,158,11,0.6)] animate-pulse">
            <div className="w-full h-full bg-[#070506] rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <Badge variant="outline" className="border-amber-400/40 text-amber-300 bg-amber-500/10 font-bold px-4 py-1 text-xs">
              ✨ Premiere Confirmed
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              Movie Night <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-[#ba0036] bg-clip-text text-transparent">Confirmed!</span>
            </h1>
            <p className="text-amber-100/80 text-base font-light max-w-lg mx-auto">
              Your tickets are locked for an unforgettable cinema premiere experience.
            </p>
          </div>

          <div className="inline-flex items-center gap-4 bg-black/60 border border-white/10 px-5 py-2 rounded-xl backdrop-blur-md text-xs text-amber-200/70">
            <span>Booking ID: <strong className="text-white font-mono">{bookingId}</strong></span>
            <span>•</span>
            <span>Booked: {mockBookingData.bookingDate}</span>
          </div>
        </div>

        {/* Digital Ticket Pass Stub */}
        <div className="relative bg-[#140e10] border-2 border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Perforated Perforation Cuts */}
          <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-[#070506] rounded-r-full border-r-2 border-amber-400/40 z-20" />
          <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-[#070506] rounded-l-full border-l-2 border-amber-400/40 z-20" />

          <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Movie Info & Poster */}
            <div className="lg:col-span-2 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <img
                src={mockBookingData.moviePoster}
                alt={mockBookingData.title}
                className="w-36 h-52 object-cover rounded-2xl border-2 border-amber-400/30 shadow-xl"
              />
              <div className="space-y-4 flex-1">
                <div>
                  <Badge variant="outline" className="border-amber-400/40 text-amber-300 text-[10px] uppercase tracking-wider mb-2">
                    {mockBookingData.format}
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    {mockBookingData.title}
                  </h2>
                  <p className="text-xs text-amber-100/60 mt-0.5">{mockBookingData.language} • {mockBookingData.duration}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-black/60 p-4 rounded-xl border border-white/10">
                  <div>
                    <span className="text-amber-200/50 block text-[10px] uppercase">Cinema</span>
                    <span className="font-bold text-white line-clamp-1">{mockBookingData.theatre}</span>
                  </div>
                  <div>
                    <span className="text-amber-200/50 block text-[10px] uppercase">Screen & Seats</span>
                    <span className="font-bold text-amber-300">{mockBookingData.screen} ({mockBookingData.seats.join(', ')})</span>
                  </div>
                  <div>
                    <span className="text-amber-200/50 block text-[10px] uppercase">Date & Time</span>
                    <span className="font-bold text-white">{mockBookingData.date}</span>
                  </div>
                  <div>
                    <span className="text-amber-200/50 block text-[10px] uppercase">Showtime</span>
                    <span className="font-bold text-amber-300">{mockBookingData.showtime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right QR Code Section */}
            <div className="flex flex-col items-center justify-center p-6 bg-[#0c080a] border border-amber-400/20 rounded-2xl text-center space-y-3">
              <div className="bg-white p-3 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <QRCode value={bookingId} size="md" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Scan For Express Entry Pass</p>
              <span className="text-[10px] text-white/50">{mockBookingData.numberOfTickets} Digital Passes Included</span>
            </div>
          </div>
        </div>

        {/* Payment Summary & Entry Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Receipt */}
          <div className="bg-[#140e10] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold font-display text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <span>💳</span> Payment Summary
            </h3>
            <div className="space-y-2.5 text-xs text-amber-100/70">
              <div className="flex justify-between">
                <span>Tickets ({mockBookingData.numberOfTickets} × ₹350)</span>
                <span className="font-semibold text-white">₹{mockBookingData.ticketPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience & Booking Fee</span>
                <span className="font-semibold text-white">₹{mockBookingData.convenienceFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (GST 18%)</span>
                <span className="font-semibold text-white">₹{mockBookingData.taxes}</span>
              </div>
              <div className="flex justify-between">
                <span>Food & Beverage Add-ons</span>
                <span className="font-semibold text-white">₹{mockBookingData.addons}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Discount Applied</span>
                <span>-₹{mockBookingData.discount}</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm font-extrabold font-display text-white">
                <span>Total Amount Paid</span>
                <span className="text-xl text-amber-300">₹{mockBookingData.totalPaid}</span>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-white/50">
                <span>Method: {mockBookingData.paymentMethod}</span>
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
                  ✓ {mockBookingData.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Entry Instructions */}
          <div className="bg-[#140e10] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold font-display text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <span>📌</span> Multiplex Guidelines
            </h3>
            <div className="space-y-3 text-xs text-amber-100/70">
              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl">
                <p className="font-bold text-amber-300 mb-1">Entrance Timing</p>
                <p className="text-[#ffe9e9]/80 leading-relaxed">Please arrive 20 minutes prior to showtime for seamless QR scanning and concessions collection.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <p className="font-bold text-white mb-1">Cancellation Terms</p>
                <p className="text-white/60 leading-relaxed">100% free cancellation up to 2 hours before showtime via your account dashboard.</p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <Button variant="outline" size="sm" onClick={handleDownloadTicket} className="flex-1 border-amber-400/40 text-amber-200 hover:bg-amber-500/10 font-bold text-xs py-2.5">
                  📥 Download PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleShareBooking} className="flex-1 border-white/20 text-white hover:bg-white/10 font-bold text-xs py-2.5">
                  📲 Share Ticket
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/account/bookings">
            <Button size="lg" variant="outline" className="border-amber-400/40 text-amber-200 hover:bg-amber-500/10 px-8 py-3.5 rounded-xl font-bold">
              View My Bookings
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-[#ba0036] via-amber-600 to-[#ba0036] hover:brightness-110 text-white font-bold px-8 py-3.5 rounded-xl shadow-2xl">
              Back To Home Page 🍿
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
