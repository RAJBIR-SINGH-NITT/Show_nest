'use client'

import { useState } from 'react'
import { Button, Input, Card, CardContent, Badge, Tabs, TabsList, TabsTrigger, EmptyState } from '@shownest/ui'
import Link from 'next/link'

// Mock sports matches data
const mockSportsMatches = [
  {
    id: 'sports-1',
    title: 'India vs Australia — T20 International',
    category: 'Cricket',
    tournament: 'Paytm T20 Series 2026',
    venue: 'Wankhede Stadium',
    city: 'Mumbai',
    date: 'Feb 22, 2026',
    time: '07:00 PM IST',
    startingPrice: '₹1,200',
    teams: [
      { name: 'India', flag: '🇮🇳', rank: '#1 T20' },
      { name: 'Australia', flag: '🇦🇺', rank: '#2 T20' },
    ],
    status: 'Selling Fast',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 'sports-2',
    title: 'Mumbai City FC vs Mohun Bagan',
    category: 'Football',
    tournament: 'Indian Super League 2026',
    venue: 'Mumbai Football Arena',
    city: 'Mumbai',
    date: 'Feb 26, 2026',
    time: '07:30 PM IST',
    startingPrice: '₹499',
    teams: [
      { name: 'Mumbai City', flag: '⚽', rank: 'Host' },
      { name: 'Mohun Bagan', flag: '⚽', rank: 'Rival' },
    ],
    status: 'Limited Seats',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    isFeatured: false,
    isTrending: true,
  },
  {
    id: 'sports-3',
    title: 'Tata IPL 2026 Opener: MI vs CSK',
    category: 'Cricket',
    tournament: 'Indian Premier League 2026',
    venue: 'Wankhede Stadium',
    city: 'Mumbai',
    date: 'Mar 25, 2026',
    time: '07:30 PM IST',
    startingPrice: '₹2,500',
    teams: [
      { name: 'Mumbai Indians', flag: '🏏', rank: '5x Champions' },
      { name: 'Chennai Super Kings', flag: '🏏', rank: '5x Champions' },
    ],
    status: 'Upcoming',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80',
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 'sports-4',
    title: 'Pro Kabaddi League Semi-Finals',
    category: 'Kabaddi',
    tournament: 'Pro Kabaddi Season 12',
    venue: 'Sardar Vallabhbhai Patel Stadium',
    city: 'Mumbai',
    date: 'Mar 02, 2026',
    time: '08:00 PM IST',
    startingPrice: '₹350',
    teams: [
      { name: 'U Mumba', flag: '🤼', rank: 'Finalist' },
      { name: 'Jaipur Pink Panthers', flag: '🤼', rank: 'Finalist' },
    ],
    status: 'Available',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=800&auto=format&fit=crop&q=80',
    isFeatured: false,
    isTrending: false,
  },
  {
    id: 'sports-5',
    title: 'BWF Super 750 Badminton Masters',
    category: 'Badminton',
    tournament: 'India Open 2026',
    venue: 'Indira Gandhi Indoor Stadium',
    city: 'Delhi',
    date: 'Mar 15, 2026',
    time: '10:00 AM IST',
    startingPrice: '₹600',
    teams: [
      { name: 'Satwik / Chirag', flag: '🏸', rank: '#1 Seeds' },
      { name: 'Li / Liu', flag: '🏸', rank: '#2 Seeds' },
    ],
    status: 'Available',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
    isFeatured: false,
    isTrending: false,
  },
]

export default function SportsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredMatches = mockSportsMatches.filter((match) => {
    const matchesSearch = !searchQuery || 
      match.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.tournament.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = activeCategory === 'all' || match.category.toLowerCase() === activeCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#031711] text-white">
      {/* Stadium Under Floodlights Hero Section */}
      <section className="relative w-full h-[540px] md:h-[640px] flex items-center overflow-hidden bg-[#020f0b]">
        {/* Background Image Sourced from /assets/sports/ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/sports/stadium-hero.jpg"
            alt="Stadium Under Floodlights"
            className="w-full h-full object-cover animate-kenburns opacity-55"
            onError={(e) => {
              // Fallback to high resolution stadium light image if hero image is not uploaded yet
              e.currentTarget.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&auto=format&fit=crop&q=80'
            }}
          />
        </div>

        {/* Stadium Lights Flaring & Dramatic Sky Overlay */}
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.35)_0%,_rgba(16,185,129,0.25)_40%,_transparent_80%)] pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

        {/* Dramatic Sky & Vignetting Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031711] via-[#031711]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#031711] pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-16">
          <div className="max-w-3xl space-y-6 animate-fade-in-up">
            {/* Floodlight Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>🏟️ Stadium Matchday Central</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
              Stadium Under <br />
              <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-xl">
                The Floodlights
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed max-w-2xl">
              Experience the roaring crowd, floodlit turf, international cricket clashes, and high-intensity stadium derby matches live.
            </p>

            {/* Sports Match Search */}
            <div className="pt-2 max-w-xl">
              <div className="relative">
                <Input
                  placeholder="Search matches by team, tournament, or stadium..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 bg-black/70 border-emerald-500/40 text-white placeholder-emerald-200/40 rounded-xl focus:border-amber-400 focus:ring-emerald-500/30 backdrop-blur-md text-sm shadow-2xl"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sports Matches Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header & Sport Category Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-emerald-400 via-amber-400 to-emerald-600 rounded-full shadow-[0_0_12px_#10b981]" />
            <div>
              <h2 className="text-2xl font-extrabold font-display uppercase tracking-wider text-white">
                Live Stadium Matches
              </h2>
              <p className="text-xs text-emerald-200/60 font-medium">Official Stadium Stand Tickets & Fast-Track Entry</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-black/70 border border-emerald-500/30 p-1 rounded-xl">
                <TabsTrigger value="all" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">All Sports</TabsTrigger>
                <TabsTrigger value="cricket" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Cricket</TabsTrigger>
                <TabsTrigger value="football" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Football</TabsTrigger>
                <TabsTrigger value="kabaddi" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Kabaddi</TabsTrigger>
                <TabsTrigger value="badminton" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Badminton</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Stadium Match Cards */}
        {filteredMatches.length === 0 ? (
          <EmptyState
            title="No Matches Found"
            description="No match schedules found matching your search term."
            action={{
              label: 'View All Matches',
              onClick: () => {
                setSearchQuery('')
                setActiveCategory('all')
              },
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className="group relative bg-[#06241a] rounded-2xl overflow-hidden border border-emerald-500/30 hover:border-amber-400/70 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] flex flex-col justify-between"
              >
                {/* Stadium Card Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <img
                    src={match.image}
                    alt={match.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06241a] via-transparent to-black/60" />

                  {/* Tournament Pill */}
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                    {match.tournament}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-amber-400 text-black font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <span>★</span>
                    <span>{match.rating}</span>
                  </div>
                </div>

                {/* Match Info & Teams Matchup */}
                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {match.title}
                    </h3>

                    {/* Team Versus Box */}
                    <div className="bg-[#021711] p-3.5 rounded-xl border border-emerald-500/20 flex items-center justify-around text-center">
                      <div>
                        <span className="text-2xl">{match.teams[0].flag}</span>
                        <p className="text-xs font-bold text-white mt-1">{match.teams[0].name}</p>
                        <span className="text-[10px] text-emerald-200/50">{match.teams[0].rank}</span>
                      </div>
                      <span className="text-xs font-black text-amber-400 font-display">VS</span>
                      <div>
                        <span className="text-2xl">{match.teams[1].flag}</span>
                        <p className="text-xs font-bold text-white mt-1">{match.teams[1].name}</p>
                        <span className="text-[10px] text-emerald-200/50">{match.teams[1].rank}</span>
                      </div>
                    </div>
                  </div>

                  {/* Match Date & Venue */}
                  <div className="space-y-1.5 text-xs text-emerald-100/70 pt-2 border-t border-emerald-500/20">
                    <p className="flex items-center gap-2">
                      <span>🏟️</span>
                      <span className="font-semibold text-white">{match.venue}, {match.city}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{match.date} • {match.time}</span>
                    </p>
                  </div>

                  {/* Pricing & Booking Action */}
                  <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-200/50 uppercase tracking-wider block">Stand Tickets From</span>
                      <span className="text-xl font-bold font-display text-amber-300">{match.startingPrice}</span>
                    </div>

                    <Link href={`/sports/mumbai/t20-international`}>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 hover:brightness-110 text-white font-bold px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
                      >
                        Book Passes 🎟️
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
