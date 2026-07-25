'use client'

import { useState, useEffect } from 'react'
import { Navbar, Footer, Carousel, Button, Card, CardContent, Badge, Input, Label } from '@shownest/ui'
import Link from 'next/link'

// Mock data for sections using local user assets & cinema images
const mockNowShowing = [
  {
    id: 1,
    title: 'The Grand Adventure',
    genre: 'Action, Adventure',
    rating: '8.5',
    language: 'English',
    duration: '2h 30m',
    poster: '/assets/heroes/home/hero-1.png',
  },
  {
    id: 2,
    title: 'Romantic Comedy',
    genre: 'Comedy, Romance',
    rating: '7.8',
    language: 'Hindi',
    duration: '2h 15m',
    poster: '/assets/heroes/home/hero-2.png',
  },
  {
    id: 3,
    title: 'Sci-Fi Epic',
    genre: 'Sci-Fi, Thriller',
    rating: '9.0',
    language: 'English',
    duration: '2h 45m',
    poster: '/assets/heroes/home/hero-3.png',
  },
  {
    id: 4,
    title: 'Action Thriller',
    genre: 'Action, Thriller',
    rating: '8.2',
    language: 'Hindi',
    duration: '2h 20m',
    poster: '/assets/heroes/home/hero-4.png',
  },
  {
    id: 5,
    title: 'Drama Series',
    genre: 'Drama',
    rating: '8.7',
    language: 'English',
    duration: '2h 10m',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
  },
]

const mockUpcomingMovies = [
  {
    id: 1,
    title: 'Mystery Unveiled',
    releaseDate: 'Feb 15, 2026',
    poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Family Adventure',
    releaseDate: 'Feb 20, 2026',
    poster: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Horror Nights',
    releaseDate: 'Mar 1, 2026',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Comedy Special',
    releaseDate: 'Mar 5, 2026',
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
  },
]

const mockEvents = [
  {
    id: 1,
    title: 'Neon Horizon Live: World Tour',
    category: 'Concert',
    date: 'Feb 14, 2026',
    venue: 'Jio World Garden',
    image: '/assets/heroes/events/event-hero.png',
  },
  {
    id: 2,
    title: 'Stand-up Comedy Arena Special',
    category: 'Comedy',
    date: 'Feb 18, 2026',
    venue: 'NESCO Center',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Symphony Under The Stars',
    category: 'Concert',
    date: 'Feb 22, 2026',
    venue: 'Royal Opera House',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'EDM Pulse Warehouse Rave',
    category: 'Concert',
    date: 'Feb 28, 2026',
    venue: 'Dome NSCI',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=80',
  },
]

const mockSports = [
  {
    id: 1,
    title: 'India vs Australia — T20 International',
    category: 'Cricket',
    date: 'Feb 22, 2026',
    venue: 'Wankhede Stadium',
    image: '/assets/sports/stadium-1.png',
  },
  {
    id: 2,
    title: 'Mumbai City FC vs Mohun Bagan',
    category: 'Football',
    date: 'Feb 26, 2026',
    venue: 'Mumbai Football Arena',
    image: '/assets/sports/stadium-2.png',
  },
  {
    id: 3,
    title: 'Tata IPL 2026 Opener: MI vs CSK',
    category: 'Cricket',
    date: 'Mar 25, 2026',
    venue: 'Wankhede Stadium',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Pro Kabaddi Semi-Finals',
    category: 'Kabaddi',
    date: 'Mar 02, 2026',
    venue: 'SVP Stadium',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=500&auto=format&fit=crop&q=80',
  },
]

const mockTrendingCategories = [
  { id: 1, name: 'IMAX 3D Movies', icon: '🎬', color: 'bg-amber-500/20 text-amber-300' },
  { id: 2, name: 'Live Music Concerts', icon: '🎸', color: 'bg-purple-500/20 text-purple-300' },
  { id: 3, name: 'Stand-up Comedy', icon: '🎤', color: 'bg-pink-500/20 text-pink-300' },
  { id: 4, name: 'Stadium Cricket', icon: '🏏', color: 'bg-emerald-500/20 text-emerald-300' },
  { id: 5, name: 'Broadway Theatre', icon: '🎭', color: 'bg-red-500/20 text-red-300' },
]

const mockVenues = [
  {
    id: 1,
    name: 'PVR IMAX Phoenix Palladium',
    city: 'Mumbai',
    upcomingShows: 24,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'INOX Megaplex Inorbit',
    city: 'Mumbai',
    upcomingShows: 18,
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Cinepolis Grand Mall',
    city: 'Mumbai',
    upcomingShows: 15,
    image: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Jio World Garden',
    city: 'Mumbai',
    upcomingShows: 12,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80',
  },
]

const mockOffers = [
  { id: 1, title: 'HDFC Card Cashback', category: 'Bank Offer', description: 'Flat ₹200 off on 2 tickets', color: 'bg-amber-500/10 border-amber-500/30' },
  { id: 2, title: 'Weekend Movie BOGO', category: 'Special', description: 'Buy 1 Get 1 Free on Friday shows', color: 'bg-purple-500/10 border-purple-500/30' },
  { id: 3, title: 'Food Combo Voucher', category: 'Concessions', description: 'Free Large Popcorn with IMAX pass', color: 'bg-red-500/10 border-red-500/30' },
  { id: 4, title: 'Student Pass Pass', category: 'Discount', description: '15% instant off with student ID', color: 'bg-emerald-500/10 border-emerald-500/30' },
]

const mockFeatures = [
  { id: 1, title: 'Secure Instant Booking', description: '100% encrypted & verified ticket QR passes', icon: '🔒' },
  { id: 2, title: 'IMAX & 4DX Screen Selection', description: 'Reserved luxury seating with 3D seat views', icon: '🎬' },
  { id: 3, title: 'Verified Luxury Venues', description: 'Hand-picked PVR, INOX, and Cinepolis multiplexes', icon: '✨' },
  { id: 4, title: 'Paperless Contactless Pass', description: 'No printouts needed — instant smartphone entry', icon: '📱' },
  { id: 5, title: '24/7 Priority Support', description: 'Round the clock customer care for showtimes', icon: '🎧' },
]

const heroImages = [
  '/assets/heroes/home/hero-1.png',
  '/assets/heroes/home/hero-2.png',
  '/assets/heroes/home/hero-3.png',
  '/assets/heroes/home/hero-4.png',
]

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window === 'undefined') return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const targetX = ((clientX / innerWidth) - 0.5) * 8
    const targetY = ((clientY / innerHeight) - 0.5) * 8
    requestAnimationFrame(() => {
      setMouseOffset({ x: targetX, y: targetY })
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0808] text-white">
      {/* Premium Cinematic Hero Section */}
      <section
        onMouseMove={handleMouseMove}
        className="relative w-full h-[85vh] sm:h-[calc(100vh-5rem)] min-h-[600px] max-h-[1080px] flex items-center justify-center overflow-hidden bg-[#0a0808]"
      >
        {/* Background Hero Image with Mouse Parallax & Slow Subtle Kenburns Zoom */}
        <div
          className="absolute -inset-4 overflow-hidden pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          }}
        >
          {heroImages.map((imgSrc, idx) => (
            <div
              key={imgSrc}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                activeSlide === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={imgSrc}
                alt="The Biggest Movie Experience"
                className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%] md:object-center lg:object-[center_35%] animate-kenburns"
              />
            </div>
          ))}
        </div>

        {/* Soft Cinematic Vignetting & Gradient Overlays (Lighter overlay to showcase artwork) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0a0808] pointer-events-none" />

        {/* Warm Golden Lighting Spotlights */}
        <div className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.22)_0%,_rgba(180,83,9,0.06)_50%,_transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(217,119,6,0.15)_0%,_transparent_70%)] blur-2xl pointer-events-none" />

        {/* Subtle Smoke Effect Layers */}
        <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
          <div className="absolute -inset-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_rgba(255,255,255,0.02)_40%,_transparent_70%)] blur-2xl animate-smoke" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,119,6,0.12)_0%,_transparent_60%)] animate-smoke" style={{ animationDelay: '-6s' }} />
        </div>

        {/* Soft Floating Golden Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <div className="absolute top-1/3 left-1/5 w-2 h-2 rounded-full bg-amber-400/60 shadow-[0_0_12px_#f59e0b] animate-particle-1" />
          <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 rounded-full bg-[#ba0036]/50 shadow-[0_0_16px_#ba0036] animate-particle-2" />
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-amber-300/50 shadow-[0_0_14px_#fcd34d] animate-particle-3" />
          <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-400/70 shadow-[0_0_10px_#f59e0b] animate-particle-1" style={{ animationDelay: '-4s' }} />
        </div>

        {/* Bottom Gradient Blending into Page Background */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0a0808] via-[#0a0808]/70 to-transparent pointer-events-none z-10" />

        {/* Foreground Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full pt-16">
          <div className="max-w-3xl space-y-6 animate-fade-in-up">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm">
              <span>✨ Premiere Experience</span>
            </div>

            {/* Large Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-display text-white tracking-tight leading-[1.08] drop-shadow-2xl">
              The Biggest <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-[#ba0036] bg-clip-text text-transparent">
                Movie Experience
              </span>
            </h1>

            {/* Small Subtitle */}
            <p className="text-lg sm:text-xl text-amber-100/80 max-w-2xl font-light leading-relaxed drop-shadow">
              Immerse yourself in blockbuster cinema, ultra-HD IMAX visuals, and Dolby Atmos audio across certified luxury screens.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/movies">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#ba0036] via-amber-600 to-[#ba0036] hover:brightness-110 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 btn-shimmer"
                >
                  Book Tickets
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-400/40 text-amber-100 hover:bg-amber-500/10 backdrop-blur-md px-8 py-4 rounded-xl font-medium transition-all duration-300"
                >
                  Explore Events
                </Button>
              </Link>
            </div>

            {/* Hero Slide Indicators */}
            <div className="flex items-center gap-2 pt-8">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Bar */}
      <section className="relative bg-[#0a0808] py-8 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative group rounded-[18px] border border-[#FFC107]/30 hover:border-[#FFC107]/60 focus-within:border-[#FFC107] focus-within:shadow-[0_0_20px_rgba(255,193,7,0.35)] bg-[rgba(20,20,20,0.7)] backdrop-blur-md shadow-2xl transition-all duration-200 ease-in-out">
              <Input
                placeholder="Search for movies, live concerts, sports, multiplexes..."
                className="pl-12 pr-4 py-4 bg-transparent border-0 text-white placeholder-gray-400 text-base sm:text-lg rounded-[18px] focus:ring-0 outline-none"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              <Link href="/movies"><Badge variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 cursor-pointer">Movies</Badge></Link>
              <Link href="/events"><Badge variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 cursor-pointer">Events</Badge></Link>
              <Link href="/sports"><Badge variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 cursor-pointer">Sports</Badge></Link>
              <Link href="/events"><Badge variant="outline" className="border-pink-500/30 text-pink-300 hover:bg-pink-500/10 cursor-pointer">Concerts</Badge></Link>
              <Link href="/cities"><Badge variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 cursor-pointer">Venues</Badge></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="py-16 bg-gradient-to-b from-[#0a0808] via-[#120a0c] to-[#0a0808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-gradient-to-b from-[#ba0036] via-amber-400 to-amber-500 rounded-full" />
              <div>
                <h2 className="text-3xl font-extrabold font-display uppercase tracking-wider text-white">Now Showing In Cinemas</h2>
                <p className="text-xs text-amber-200/60 font-medium">Verified Showtimes & Direct Seats</p>
              </div>
            </div>
            <Link href="/movies" className="text-amber-400 hover:text-amber-300 text-sm font-bold flex items-center gap-1 transition-colors">
              <span>View All Movies</span> <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {mockNowShowing.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-[#140e10] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/60 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] flex flex-col justify-between"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e10] via-transparent to-black/40" />
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <span>★</span>
                    <span>{movie.rating}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base font-display text-white group-hover:text-amber-300 transition-colors truncate">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-amber-100/60 truncate">{movie.genre}</p>
                    <p className="text-xs text-white/50">{movie.language} • {movie.duration}</p>
                  </div>

                  <Link href="/movies/mumbai/the-grand-adventure">
                    <Button size="sm" className="w-full bg-[#ba0036] hover:bg-[#e21e4a] text-white font-bold rounded-xl btn-shimmer">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-[#0a0808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-amber-400 rounded-full" />
              <div>
                <h2 className="text-3xl font-extrabold font-display uppercase tracking-wider text-white">Live Concerts & Events</h2>
                <p className="text-xs text-purple-200/60 font-medium">Stadium Shows, Festivals & Stand-Up Comedy</p>
              </div>
            </div>
            <Link href="/events" className="text-purple-400 hover:text-purple-300 text-sm font-bold flex items-center gap-1 transition-colors">
              <span>View All Events</span> <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="group relative bg-[#130b17] rounded-2xl overflow-hidden border border-purple-500/30 hover:border-amber-400/70 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#130b17] via-transparent to-black/50" />
                  <span className="absolute top-3 left-3 bg-purple-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                    {event.category}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base font-display text-white group-hover:text-amber-300 transition-colors truncate">
                      {event.title}
                    </h3>
                    <p className="text-xs text-purple-200/70">{event.date}</p>
                    <p className="text-xs text-white/50">{event.venue}</p>
                  </div>

                  <Link href="/events/mumbai/neon-horizon-live">
                    <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 hover:brightness-110 text-white font-bold rounded-xl btn-shimmer">
                      Book Passes
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-16 bg-gradient-to-b from-[#0a0808] via-[#041a13] to-[#0a0808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-gradient-to-b from-emerald-400 via-amber-400 to-emerald-600 rounded-full" />
              <div>
                <h2 className="text-3xl font-extrabold font-display uppercase tracking-wider text-white">Stadium Sports Matches</h2>
                <p className="text-xs text-emerald-200/60 font-medium">Cricket Series, Football Derbies & Tournaments</p>
              </div>
            </div>
            <Link href="/sports" className="text-emerald-400 hover:text-emerald-300 text-sm font-bold flex items-center gap-1 transition-colors">
              <span>View All Sports</span> <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockSports.map((sport) => (
              <div
                key={sport.id}
                className="group relative bg-[#06241a] rounded-2xl overflow-hidden border border-emerald-500/30 hover:border-amber-400/70 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={sport.image}
                    alt={sport.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06241a] via-transparent to-black/60" />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                    {sport.category}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {sport.title}
                    </h3>
                    <p className="text-xs text-emerald-200/70">{sport.date}</p>
                    <p className="text-xs text-white/50">{sport.venue}</p>
                  </div>

                  <Link href="/sports/mumbai/t20-international">
                    <Button size="sm" className="w-full bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 hover:brightness-110 text-white font-bold rounded-xl btn-shimmer">
                      Book Passes
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
