'use client'

import { useState } from 'react'
import { Button, Input, Card, CardContent, Badge, Tabs, TabsList, TabsTrigger, EmptyState } from '@shownest/ui'
import Link from 'next/link'

// Mock event data
const mockEvents = [
  {
    id: 'event-1',
    name: 'Neon Horizon Live: World Stadium Tour',
    category: 'Concert',
    venue: 'Jio World Garden',
    city: 'Mumbai',
    date: 'Feb 14, 2026',
    time: '7:00 PM',
    duration: '4h',
    startingPrice: '₹1,999',
    ageRestriction: '16+',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    description: 'An electrifying night of synth-pop and lasers with top electronic artists.',
    isFeatured: true,
    isTrending: true,
    limitedSeats: false,
    isNew: false,
  },
  {
    id: 'event-2',
    name: 'Stand-up Comedy Arena Special',
    category: 'Comedy',
    venue: 'NESCO Center',
    city: 'Mumbai',
    date: 'Feb 18, 2026',
    time: '8:00 PM',
    duration: '2h 30m',
    startingPrice: '₹799',
    ageRestriction: '18+',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    description: 'A hilarious evening with the nation\'s biggest stand-up comedians.',
    isFeatured: false,
    isTrending: true,
    limitedSeats: true,
    isNew: false,
  },
  {
    id: 'event-3',
    name: 'Symphony Under The Stars',
    category: 'Concert',
    venue: 'Royal Opera House',
    city: 'Mumbai',
    date: 'Feb 22, 2026',
    time: '6:30 PM',
    duration: '3h',
    startingPrice: '₹1,200',
    ageRestriction: 'All Ages',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    description: 'A grand classical orchestral experience featuring 80 live musicians.',
    isFeatured: true,
    isTrending: false,
    limitedSeats: true,
    isNew: false,
  },
  {
    id: 'event-4',
    name: 'EDM Pulse Warehouse Rave',
    category: 'Concert',
    venue: 'Dome NSCI',
    city: 'Mumbai',
    date: 'Feb 28, 2026',
    time: '10:00 PM',
    duration: '6h',
    startingPrice: '₹2,499',
    ageRestriction: '21+',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    description: 'Non-stop bass, laser lights, and international guest DJs.',
    isFeatured: false,
    isTrending: true,
    limitedSeats: false,
    isNew: true,
  },
  {
    id: 'event-5',
    name: 'International Food & Jazz Fest',
    category: 'Festival',
    venue: 'Mahalaxmi Racecourse',
    city: 'Mumbai',
    date: 'Mar 05, 2026',
    time: '04:00 PM',
    duration: '8h',
    startingPrice: '₹499',
    ageRestriction: 'All Ages',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    description: 'Gourmet street food, craft brews, and live smooth jazz bands.',
    isFeatured: true,
    isTrending: false,
    limitedSeats: false,
    isNew: false,
  },
  {
    id: 'event-6',
    name: 'Broadway Musical: Phantom',
    category: 'Theatre',
    venue: 'NMACC Grand Theatre',
    city: 'Mumbai',
    date: 'Mar 12, 2026',
    time: '07:30 PM',
    duration: '2h 45m',
    startingPrice: '₹1,500',
    ageRestriction: '12+',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop&q=80',
    description: 'The world famous Broadway musical live on stage with full orchestra.',
    isFeatured: false,
    isTrending: false,
    limitedSeats: true,
    isNew: false,
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [isFavorite, setIsFavorite] = useState<Set<string>>(new Set())

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = !searchQuery || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = activeCategory === 'all' || event.category.toLowerCase() === activeCategory.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  const handleToggleFavorite = (eventId: string) => {
    const newFavorites = new Set(isFavorite)
    if (newFavorites.has(eventId)) {
      newFavorites.delete(eventId)
    } else {
      newFavorites.add(eventId)
    }
    setIsFavorite(newFavorites)
  }

  return (
    <div className="min-h-screen bg-[#080509] text-white">
      {/* Live Concert Experience Hero Banner */}
      <section className="relative w-full h-[540px] md:h-[640px] flex items-center overflow-hidden bg-[#050206]">
        {/* Background Image Sourced from /assets/heroes/events/ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/heroes/events/event-hero.jpg"
            alt="Live Concert Experience"
            className="w-full h-full object-cover animate-kenburns opacity-60"
            onError={(e) => {
              // Fallback to high resolution concert imagery if user hasn't uploaded event hero image yet
              e.currentTarget.src = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&auto=format&fit=crop&q=80'
            }}
          />
        </div>

        {/* Concert Stage Spotlights & Purple Mixed with Golden Lighting */}
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top,_rgba(147,51,234,0.45)_0%,_rgba(245,158,11,0.22)_45%,_transparent_75%)] pointer-events-none" />
        <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-20 right-10 w-[450px] h-[450px] rounded-full bg-amber-500/25 blur-3xl pointer-events-none" />

        {/* Laser Beams Lines Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-purple-400 via-purple-600 to-transparent transform -rotate-45" />
          <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-amber-400 via-amber-600 to-transparent transform rotate-45" />
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-fuchsia-400 via-purple-600 to-transparent transform -rotate-12" />
        </div>

        {/* Dark Vignetting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080509] via-[#080509]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#080509] pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-16 flex flex-col justify-center">
          <div className="max-w-3xl space-y-6 animate-fade-in-up">
            {/* Live Concert Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
              <span>🎸 Live Concerts & Arena Shows</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
              Feel The Pulse Of <br />
              <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-lg">
                Live Music & Festivals
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-purple-100/80 font-light leading-relaxed max-w-2xl">
              Front row stadium passes, explosive laser light shows, world tour headline acts, and unforgettable live festival energy.
            </p>

            {/* Concert Search Input */}
            <div className="pt-3 max-w-xl">
              <div className="relative">
                <Input
                  placeholder="Search concerts, artists, venues, or comedy specials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 bg-black/70 border-purple-500/40 text-white placeholder-purple-200/40 rounded-xl focus:border-amber-400 focus:ring-purple-500/30 backdrop-blur-md text-sm shadow-2xl"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Events Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Category Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-amber-400 rounded-full shadow-[0_0_10px_#a855f7]" />
            <div>
              <h2 className="text-2xl font-extrabold font-display uppercase tracking-wider text-white">
                Upcoming Live Experiences
              </h2>
              <p className="text-xs text-purple-200/60 font-medium">Verified Tickets & Instant Entry QR Pass</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Category Filter Tabs */}
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-black/70 border border-purple-500/30 p-1 rounded-xl">
                <TabsTrigger value="all" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">All Events</TabsTrigger>
                <TabsTrigger value="concert" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Concerts</TabsTrigger>
                <TabsTrigger value="comedy" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Comedy</TabsTrigger>
                <TabsTrigger value="festival" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Festivals</TabsTrigger>
                <TabsTrigger value="theatre" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Theatre</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/70 border border-purple-500/30 text-purple-100 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-amber-400"
            >
              <option value="popularity">Most Popular</option>
              <option value="date">Upcoming Date</option>
              <option value="price">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Live Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <EmptyState
            title="No Events Found"
            description="We couldn't find any live concerts or events matching your criteria."
            action={{
              label: 'Reset Filters',
              onClick: () => {
                setSearchQuery('')
                setActiveCategory('all')
              },
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group relative bg-[#130b17] rounded-2xl overflow-hidden border border-purple-500/30 hover:border-amber-400/70 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] flex flex-col justify-between"
              >
                {/* Large Concert Banner Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#130b17] via-transparent to-black/50" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                    {event.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-amber-400 text-black font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <span>★</span>
                    <span>{event.rating}</span>
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => handleToggleFavorite(event.id)}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black transition-colors"
                    aria-label="Favorite"
                  >
                    <span className={isFavorite.has(event.id) ? 'text-[#ba0036]' : 'text-white/70'}>
                      {isFavorite.has(event.id) ? '♥' : '♡'}
                    </span>
                  </button>
                </div>

                {/* Event Details Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {event.name}
                    </h3>
                    <p className="text-xs text-purple-200/70 leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-purple-100/70 pt-2 border-t border-purple-500/20">
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span className="font-semibold text-white">{event.venue}, {event.city}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>📅 {event.date}</span>
                      <span>🕒 {event.time} ({event.duration})</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-purple-200/50 uppercase tracking-wider block">Passes From</span>
                      <span className="text-xl font-bold font-display text-amber-300">{event.startingPrice}</span>
                    </div>

                    <Link href={`/events/mumbai/neon-horizon-live`}>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 hover:brightness-110 text-white font-bold px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
                      >
                        Get Passes 🎟️
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
