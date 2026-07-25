'use client'

import { useState } from 'react'
import { Button, Input, Card, CardContent, Badge, Tabs, TabsList, TabsTrigger, EmptyState } from '@shownest/ui'
import Link from 'next/link'

// Mock movie data
const mockMovies = [
  {
    id: 'movie-1',
    title: 'The Grand Adventure',
    genre: 'Action, Adventure',
    languages: ['English', 'Hindi'],
    runtime: '2h 30m',
    ageRating: 'UA',
    rating: '8.5',
    formats: ['2D', 'IMAX'],
    status: 'Now Showing',
    startingPrice: '₹250',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
    synopsis: 'An epic journey through uncharted territories.',
    availableShows: 15,
    isPopular: true,
    isTrending: false,
  },
  {
    id: 'movie-2',
    title: 'Romantic Comedy',
    genre: 'Comedy, Romance',
    languages: ['Hindi', 'Tamil'],
    runtime: '2h 15m',
    ageRating: 'U',
    rating: '7.8',
    formats: ['2D'],
    status: 'Now Showing',
    startingPrice: '₹200',
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&auto=format&fit=crop&q=80',
    synopsis: 'A heartwarming tale of love and laughter.',
    availableShows: 12,
    isPopular: false,
    isTrending: false,
  },
  {
    id: 'movie-3',
    title: 'Sci-Fi Epic',
    genre: 'Sci-Fi, Thriller',
    languages: ['English'],
    runtime: '2h 45m',
    ageRating: 'UA',
    rating: '9.0',
    formats: ['2D', '3D', 'IMAX', '4DX'],
    status: 'Coming Soon',
    startingPrice: '₹350',
    poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
    synopsis: 'A futuristic battle for humanity\'s survival.',
    availableShows: 0,
    isPopular: true,
    isTrending: true,
  },
  {
    id: 'movie-4',
    title: 'Action Thriller',
    genre: 'Action, Thriller',
    languages: ['Hindi', 'Telugu'],
    runtime: '2h 20m',
    ageRating: 'A',
    rating: '8.2',
    formats: ['2D', 'Dolby'],
    status: 'Now Showing',
    startingPrice: '₹280',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    synopsis: 'High-octane action with unexpected twists.',
    availableShows: 18,
    isPopular: false,
    isTrending: true,
  },
  {
    id: 'movie-5',
    title: 'Drama Series',
    genre: 'Drama',
    languages: ['English', 'Malayalam'],
    runtime: '2h 10m',
    ageRating: 'UA',
    rating: '8.7',
    formats: ['2D'],
    status: 'Now Showing',
    startingPrice: '₹220',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
    synopsis: 'An emotional journey through family bonds.',
    availableShows: 10,
    isPopular: true,
    isTrending: false,
  },
  {
    id: 'movie-6',
    title: 'Horror Nights',
    genre: 'Horror, Thriller',
    languages: ['Hindi', 'Kannada'],
    runtime: '2h 00m',
    ageRating: 'A',
    rating: '7.5',
    formats: ['2D', '3D'],
    status: 'Now Showing',
    startingPrice: '₹240',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1200&auto=format&fit=crop&q=80',
    synopsis: 'Terrifying encounters in the dark.',
    availableShows: 8,
    isPopular: false,
    isTrending: false,
  },
  {
    id: 'movie-7',
    title: 'Family Adventure',
    genre: 'Adventure, Family',
    languages: ['English', 'Hindi', 'Tamil'],
    runtime: '2h 25m',
    ageRating: 'U',
    rating: '8.0',
    formats: ['2D', 'IMAX'],
    status: 'Coming Soon',
    startingPrice: '₹300',
    poster: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
    synopsis: 'A magical journey for the whole family.',
    availableShows: 0,
    isPopular: true,
    isTrending: false,
  },
  {
    id: 'movie-8',
    title: 'Animation Special',
    genre: 'Animation, Comedy',
    languages: ['English', 'Hindi'],
    runtime: '1h 50m',
    ageRating: 'U',
    rating: '8.3',
    formats: ['2D', '3D'],
    status: 'Now Showing',
    startingPrice: '₹180',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80',
    synopsis: 'Colorful adventures in a fantasy world.',
    availableShows: 20,
    isPopular: false,
    isTrending: true,
  },
]

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFavorite, setIsFavorite] = useState<Set<string>>(new Set())

  const filteredMovies = mockMovies.filter((movie) => {
    const matchesSearch = !searchQuery || 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'now-showing' && movie.status === 'Now Showing') ||
      (activeTab === 'coming-soon' && movie.status === 'Coming Soon')
    
    return matchesSearch && matchesTab
  })

  const handleToggleFavorite = (movieId: string) => {
    const newFavorites = new Set(isFavorite)
    if (newFavorites.has(movieId)) {
      newFavorites.delete(movieId)
    } else {
      newFavorites.add(movieId)
    }
    setIsFavorite(newFavorites)
  }

  return (
    <div className="min-h-screen bg-[#0d090a] text-white">
      {/* Huge Cinematic Multiplex Banner */}
      <section className="relative w-full h-[520px] md:h-[620px] flex items-center overflow-hidden bg-[#050304]">
        {/* Background Image Sourced from /assets/heroes/ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/heroes/hero-main.jpg"
            alt="Movies Banner"
            className="w-full h-full object-cover animate-kenburns opacity-60"
            onError={(e) => {
              // Fallback to high resolution cinema image if hero file isn't uploaded yet
              e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&auto=format&fit=crop&q=80'
            }}
          />
        </div>

        {/* Dark Overlay Vignetting */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0d090a] pointer-events-none" />

        {/* Warm Golden Spotlight Lighting & Glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.22)_0%,_rgba(180,83,9,0.05)_50%,_transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(186,0,54,0.18)_0%,_transparent_70%)] blur-2xl pointer-events-none" />

        {/* Banner Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-5 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>IMAX & 4DX Premium Lineup</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
              Enter The Ultimate <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-[#ba0036] bg-clip-text text-transparent">
                Cinema Multiplex
              </span>
            </h1>

            <p className="text-base sm:text-lg text-amber-100/80 font-light leading-relaxed">
              Discover blockbuster premieres, IMAX 3D sensory experiences, and luxury recliner showtimes across top theatres.
            </p>

            {/* Quick Filter Bar */}
            <div className="pt-2 max-w-lg">
              <div className="relative">
                <Input
                  placeholder="Search movies by title or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3.5 bg-black/60 border-amber-500/30 text-white placeholder-amber-100/40 rounded-xl focus:border-amber-400 focus:ring-amber-400/20 backdrop-blur-md"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Movie Poster Collage Stack */}
          <div className="hidden lg:flex items-center gap-4 relative z-10 transform rotate-1">
            <div className="w-40 h-60 rounded-xl overflow-hidden shadow-2xl border border-amber-500/30 transform -rotate-6 hover:rotate-0 transition-transform duration-500 hover:scale-105">
              <img src={mockMovies[0].poster} alt={mockMovies[0].title} className="w-full h-full object-cover" />
            </div>
            <div className="w-48 h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-amber-400/50 transform z-10 hover:scale-105 transition-transform duration-500">
              <img src={mockMovies[2].poster} alt={mockMovies[2].title} className="w-full h-full object-cover" />
            </div>
            <div className="w-40 h-60 rounded-xl overflow-hidden shadow-2xl border border-amber-500/30 transform rotate-6 hover:rotate-0 transition-transform duration-500 hover:scale-105">
              <img src={mockMovies[3].poster} alt={mockMovies[3].title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Multiplex Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Controls & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Netflix + IMAX Style Section Title */}
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#ba0036] via-amber-400 to-amber-500 rounded-full" />
            <div>
              <h2 className="text-2xl font-extrabold font-display uppercase tracking-wider text-white">
                Now Showing in Cinemas
              </h2>
              <p className="text-xs text-amber-200/60 font-medium">Verified Showtimes & Direct Booking</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Filter Tabs */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-black/60 border border-amber-500/30 p-1 rounded-xl">
                <TabsTrigger value="all" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">All Movies</TabsTrigger>
                <TabsTrigger value="now-showing" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Now Showing</TabsTrigger>
                <TabsTrigger value="coming-soon" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white">Coming Soon</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/60 border border-amber-500/30 text-amber-100 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-amber-400"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="release">Newest Releases</option>
            </select>
          </div>
        </div>

        {/* Movie Cards Grid */}
        {filteredMovies.length === 0 ? (
          <EmptyState
            title="No Movies Found"
            description="We couldn't find any showtimes matching your search query or filter."
            action={{
              label: 'Clear Search',
              onClick: () => {
                setSearchQuery('')
                setActiveTab('all')
              },
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-[#140e0f] rounded-2xl overflow-hidden border border-[#e5bdbe]/20 hover:border-amber-400/60 shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Premium Poster Container */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0f] via-transparent to-black/40" />

                  {/* Gold Rating Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-xs px-2.5 py-1 rounded-md shadow-[0_0_12px_rgba(245,158,11,0.4)] flex items-center gap-1">
                    <span>★</span>
                    <span>{movie.rating}</span>
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => handleToggleFavorite(movie.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black transition-colors"
                    aria-label="Favorite"
                  >
                    <span className={isFavorite.has(movie.id) ? 'text-[#ba0036]' : 'text-white/70'}>
                      {isFavorite.has(movie.id) ? '♥' : '♡'}
                    </span>
                  </button>

                  {/* Formats Pills */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                    {movie.formats.map((fmt) => (
                      <span key={fmt} className="bg-black/70 border border-amber-400/40 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-amber-100/60 font-medium">{movie.genre}</p>
                    <p className="text-xs text-white/50">{movie.languages.join(', ')} • {movie.runtime}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-200/50 uppercase tracking-wider block">Tickets From</span>
                      <span className="text-base font-bold font-display text-white">{movie.startingPrice}</span>
                    </div>

                    <Link href={`/movies/mumbai/the-grand-adventure`}>
                      <Button
                        size="sm"
                        className="bg-[#ba0036] hover:bg-[#e21e4a] text-white font-bold px-4 py-2 rounded-xl shadow-md transition-all"
                      >
                        Book Now
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
