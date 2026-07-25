'use client'

import { useState } from 'react'
import { Button, Input, Card, CardContent, Badge, Tabs, TabsList, TabsTrigger, EmptyState } from '@shownest/ui'
import Link from 'next/link'

// Mock search data
const mockMovies = [
  {
    id: 'movie-1',
    type: 'movie',
    title: 'The Grand Adventure',
    genre: 'Action, Adventure',
    rating: '8.5',
    duration: '2h 30m',
    languages: ['English', 'Hindi'],
    status: 'Now Showing',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'movie-2',
    type: 'movie',
    title: 'Romantic Comedy',
    genre: 'Comedy, Romance',
    rating: '7.8',
    duration: '2h 15m',
    languages: ['Hindi', 'Tamil'],
    status: 'Now Showing',
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'movie-3',
    type: 'movie',
    title: 'Sci-Fi Epic',
    genre: 'Sci-Fi, Thriller',
    rating: '9.0',
    duration: '2h 45m',
    languages: ['English'],
    status: 'Coming Soon',
    poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=500&auto=format&fit=crop&q=80',
  },
]

const mockEvents = [
  {
    id: 'event-1',
    type: 'event',
    title: 'Neon Horizon Live: World Tour',
    category: 'Concert',
    venue: 'Jio World Garden',
    date: 'Feb 14, 2026',
    time: '7:00 PM',
    startingPrice: '₹1,999',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Stand-up Comedy Arena Special',
    category: 'Comedy',
    venue: 'NESCO Center',
    date: 'Feb 18, 2026',
    time: '8:00 PM',
    startingPrice: '₹799',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
  },
]

const mockSports = [
  {
    id: 'sport-1',
    type: 'sport',
    title: 'India vs Australia — T20 International',
    tournament: 'T20 Series 2026',
    teams: 'India vs Australia',
    venue: 'Wankhede Stadium',
    date: 'Feb 22, 2026',
    time: '7:00 PM',
    ticketPrice: '₹1,200',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'sport-2',
    type: 'sport',
    title: 'Tata IPL 2026 Opener: MI vs CSK',
    tournament: 'IPL 2026',
    teams: 'Mumbai Indians vs Chennai Super Kings',
    venue: 'Wankhede Stadium',
    date: 'Mar 25, 2026',
    time: '7:30 PM',
    ticketPrice: '₹2,500',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=80',
  },
]

const mockVenues = [
  {
    id: 'venue-1',
    type: 'venue',
    name: 'PVR IMAX Phoenix Palladium',
    city: 'Mumbai',
    upcomingEvents: 14,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'venue-2',
    type: 'venue',
    name: 'INOX Megaplex Inorbit',
    city: 'Mumbai',
    upcomingEvents: 10,
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
  },
]

const mockRecentSearches = [
  'The Grand Adventure',
  'IMAX Movies Mumbai',
  'Live Concerts BKC',
  'India vs Australia T20',
]

const mockTrendingSearches = [
  'Neon Horizon World Tour',
  'Tata IPL 2026 Tickets',
  'Stand-up Comedy Arena',
  'IMAX 3D Movies',
  'PVR Phoenix Palladium',
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const allResults = [...mockMovies, ...mockEvents, ...mockSports, ...mockVenues]

  const filteredResults = allResults.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory
    const matchesSearch = !searchQuery || 
      ((item as any).title || (item as any).name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item as any).genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item as any).category?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const handleRemoveRecentSearch = (search: string) => {
    // UI only
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(regex, '<mark class="bg-amber-400 text-black font-bold rounded px-1">$1</mark>')
  }

  return (
    <div className="min-h-screen bg-[#0a0808] text-white relative overflow-hidden">
      {/* Soft Golden Glow Ambient Background */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.18)_0%,_rgba(186,0,54,0.08)_50%,_transparent_75%)] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="border-amber-500/30 text-amber-300 bg-amber-500/10">
            Search Experience
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Discover <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-[#ba0036] bg-clip-text text-transparent">Entertainment</span>
          </h1>
          {searchQuery ? (
            <p className="text-amber-100/70 text-sm">
              Showing {filteredResults.length} results for <span className="text-amber-300 font-semibold">&quot;{searchQuery}&quot;</span>
            </p>
          ) : (
            <p className="text-amber-100/70 text-sm">Search movies, live concerts, sports matches, and venue showtimes.</p>
          )}
        </div>

        {/* Premium Glass Search Box */}
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-[#ba0036]/30 to-amber-500/30 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-[#140e10]/80 border border-amber-500/30 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center">
              <svg className="ml-5 w-6 h-6 text-amber-400/90 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, events, sports, venues..."
                className="w-full bg-transparent px-4 py-4 text-base sm:text-lg text-white placeholder-amber-100/40 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-5 text-amber-200/60 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Minimalist Category Filter Tabs & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-black/60 border border-amber-500/20 p-1 rounded-xl">
              <TabsTrigger value="all" className="px-5 py-1.5 text-xs font-semibold rounded-lg text-white">All Results</TabsTrigger>
              <TabsTrigger value="movie" className="px-5 py-1.5 text-xs font-semibold rounded-lg text-white">Movies</TabsTrigger>
              <TabsTrigger value="event" className="px-5 py-1.5 text-xs font-semibold rounded-lg text-white">Events</TabsTrigger>
              <TabsTrigger value="sport" className="px-5 py-1.5 text-xs font-semibold rounded-lg text-white">Sports</TabsTrigger>
              <TabsTrigger value="venue" className="px-5 py-1.5 text-xs font-semibold rounded-lg text-white">Venues</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <span className="text-xs text-amber-100/60">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/60 border border-amber-500/20 text-amber-100 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-amber-400"
            >
              <option value="relevance">Relevance</option>
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="outline" className="border-amber-400/40 text-amber-300 cursor-pointer" onClick={() => handleRemoveFilter(filter)}>
                {filter} ✕
              </Badge>
            ))}
          </div>
        )}

        {/* Minimal Recent & Trending Searches (when search query is empty) */}
        {!searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Recent Searches */}
            <div className="bg-[#140e10]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 font-display flex items-center gap-2">
                <span>🕒</span> Recent Searches
              </h3>
              <div className="space-y-2">
                {mockRecentSearches.map((search) => (
                  <div key={search} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                    <button
                      onClick={() => setSearchQuery(search)}
                      className="text-left text-amber-100/80 hover:text-amber-300 transition-colors font-medium"
                    >
                      {search}
                    </button>
                    <button
                      onClick={() => handleRemoveRecentSearch(search)}
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div className="bg-[#140e10]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 font-display flex items-center gap-2">
                <span>🔥</span> Trending Searches
              </h3>
              <div className="space-y-2">
                {mockTrendingSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => setSearchQuery(search)}
                    className="block w-full text-left text-sm text-amber-100/80 hover:text-amber-300 transition-colors py-2 border-b border-white/5 last:border-0 font-medium"
                  >
                    ⚡ {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Grid with Beautiful Hover Animations */}
        {searchQuery && filteredResults.length === 0 ? (
          <EmptyState
            title="No Matching Results"
            description="No movies, events, or venues match your query."
            action={{
              label: 'Clear Search',
              onClick: () => setSearchQuery(''),
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((item: any) => {
              // Movie Result Card
              if (item.type === 'movie') {
                return (
                  <div
                    key={item.id}
                    className="group relative bg-[#140e10] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/60 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] flex flex-col justify-between"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140e10] via-transparent to-black/40" />

                      <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                        <span>★</span>
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <Badge variant="outline" className="border-amber-500/30 text-amber-300 text-[10px] mb-2">
                          Movie
                        </Badge>
                        <h3 
                          className="font-bold text-lg font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1"
                          dangerouslySetInnerHTML={{ __html: highlightText(item.title, searchQuery) }}
                        />
                        <p className="text-xs text-amber-100/60 mt-1">{item.genre} • {item.duration}</p>
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <Link href={`/movies/mumbai/the-grand-adventure`}>
                          <Button size="sm" className="w-full bg-[#ba0036] hover:bg-[#e21e4a] text-white font-bold rounded-xl">
                            Book Tickets
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }

              // Event Result Card
              if (item.type === 'event') {
                return (
                  <div
                    key={item.id}
                    className="group relative bg-[#140e10] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/60 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140e10] via-transparent to-black/40" />

                      <span className="absolute top-3 left-3 bg-purple-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 
                          className="font-bold text-lg font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1"
                          dangerouslySetInnerHTML={{ __html: highlightText(item.title, searchQuery) }}
                        />
                        <p className="text-xs text-amber-100/60 mt-1">{item.date} • {item.venue}</p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-sm font-bold text-amber-300 font-display">{item.startingPrice}</span>
                        <Link href={`/events/mumbai/neon-horizon-live`}>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl">
                            Get Passes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }

              // Sports Result Card
              if (item.type === 'sport') {
                return (
                  <div
                    key={item.id}
                    className="group relative bg-[#140e10] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/60 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140e10] via-transparent to-black/40" />

                      <span className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        {item.tournament}
                      </span>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 
                          className="font-bold text-lg font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1"
                          dangerouslySetInnerHTML={{ __html: highlightText(item.title, searchQuery) }}
                        />
                        <p className="text-xs text-amber-100/60 mt-1">{item.teams}</p>
                        <p className="text-xs text-white/50">{item.date} • {item.venue}</p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-sm font-bold text-amber-300 font-display">{item.ticketPrice}</span>
                        <Link href={`/sports/mumbai/t20-international`}>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">
                            Book Passes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }

              // Venue Result Card
              if (item.type === 'venue') {
                return (
                  <div
                    key={item.id}
                    className="group relative bg-[#140e10] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/60 shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140e10] via-transparent to-black/40" />

                      <span className="absolute top-3 left-3 bg-amber-500 text-black font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        Venue
                      </span>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 
                          className="font-bold text-lg font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1"
                          dangerouslySetInnerHTML={{ __html: highlightText(item.name, searchQuery) }}
                        />
                        <p className="text-xs text-amber-100/60 mt-1">📍 {item.city}</p>
                        <p className="text-xs text-white/50">{item.upcomingEvents} upcoming showtimes</p>
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <Link href={`/booking/venue-showtime`}>
                          <Button size="sm" variant="outline" className="w-full border-amber-400/40 text-amber-200 hover:bg-amber-500/10 font-medium rounded-xl">
                            View Showtimes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }

              return null
            })}
          </div>
        )}
      </div>
    </div>
  )
}
