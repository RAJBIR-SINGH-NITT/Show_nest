'use client'

import { useState } from 'react'
import { Button, Card, Badge, Tabs, TabsList, TabsTrigger, TabsContent, Avatar, Separator } from '@shownest/ui'
import Link from 'next/link'

const mockMovie = {
  id: 'movie-1',
  title: 'The Grand Adventure',
  tagline: 'An epic journey through uncharted territories',
  backdrop: '/assets/heroes/movie-details/backdrop.jpg',
  fallbackBackdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&auto=format&fit=crop&q=80',
  poster: '/assets/heroes/movie-details/poster.jpg',
  fallbackPoster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
  genre: ['Action', 'Adventure', 'Sci-Fi'],
  rating: '8.5',
  ageCertification: 'UA',
  runtime: '2h 30m',
  languages: ['English', 'Hindi', 'Tamil'],
  formats: ['IMAX 3D', '4DX', 'Dolby Atmos', '2D'],
  releaseDate: 'Jan 15, 2026',
  status: 'Now Showing In IMAX',
  synopsis: 'In a world where humanity has pushed beyond the boundaries of Earth, a team of explorers embarks on a dangerous mission to discover new habitable planets. Led by Captain James Mitchell, the crew of the starship Horizon faces unimaginable challenges as they navigate through uncharted space, encounter alien civilizations, and uncover secrets that could change the fate of humanity forever.',
  country: 'USA',
  subtitleAvailability: 'English, Hindi, Tamil',
  distributor: 'Universal Pictures',
  productionHouse: 'DreamWorks Studios',
  trailerUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80',
}

const mockCast = [
  { id: 'cast-1', name: 'John Smith', character: 'Captain James Mitchell', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
  { id: 'cast-2', name: 'Emma Johnson', character: 'Dr. Sarah Chen', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
  { id: 'cast-3', name: 'Michael Brown', character: 'Engineer Tom Wilson', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
  { id: 'cast-4', name: 'Sophia Davis', character: 'Commander Lisa Park', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
]

const mockGallery = [
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=800&auto=format&fit=crop&q=80',
]

const mockShowtimes = [
  {
    id: 'theatre-1',
    name: 'PVR IMAX Phoenix Palladium',
    city: 'Mumbai',
    formats: ['IMAX 3D', 'Dolby Atmos'],
    showtimes: ['10:30 AM', '01:30 PM', '04:30 PM', '07:30 PM', '10:30 PM'],
    startingPrice: '₹350',
    availableSeats: 120,
  },
  {
    id: 'theatre-2',
    name: 'INOX Megaplex Inorbit',
    city: 'Mumbai',
    formats: ['4DX', 'Dolby Atmos'],
    showtimes: ['11:00 AM', '02:00 PM', '05:00 PM', '08:00 PM'],
    startingPrice: '₹300',
    availableSeats: 85,
  },
  {
    id: 'theatre-3',
    name: 'Cinepolis Grand Mall',
    city: 'Mumbai',
    formats: ['IMAX 2D', 'Standard'],
    showtimes: ['12:00 PM', '03:00 PM', '06:00 PM', '09:00 PM'],
    startingPrice: '₹280',
    availableSeats: 200,
  },
]

const mockReviews = [
  {
    id: 'review-1',
    user: { name: 'Rahul Sharma', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80' },
    rating: 5,
    text: 'Absolutely stunning! The IMAX 3D visuals and sound design are unbelievable. A true cinema premiere experience.',
    date: 'Jan 20, 2026',
  },
  {
    id: 'review-2',
    user: { name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
    rating: 5,
    text: 'Top notch sci-fi adventure! The acting and soundtrack left me speechless.',
    date: 'Jan 19, 2026',
  },
]

export default function MovieDetailsPage({ params }: { params?: { city?: string; slug?: string } }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [expandedSynopsis, setExpandedSynopsis] = useState(false)
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0808] text-white">
      {/* Huge IMAX Premiere Backdrop Header */}
      <section className="relative w-full min-h-[620px] lg:min-h-[720px] flex items-end overflow-hidden bg-[#030202]">
        {/* Background Image Sourced from /assets/heroes/movie-details/ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={mockMovie.backdrop}
            alt={mockMovie.title}
            className="w-full h-full object-cover animate-kenburns opacity-65"
            onError={(e) => {
              // Fallback if backdrop image is missing
              e.currentTarget.src = mockMovie.fallbackBackdrop
            }}
          />
        </div>

        {/* IMAX Spotlight & Golden Lighting */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.25)_0%,_rgba(186,0,54,0.1)_50%,_transparent_75%)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(186,0,54,0.2)_0%,_transparent_70%)] blur-2xl pointer-events-none" />

        {/* Dark Vignetting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-[#0a0808]/75 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0808] via-[#0a0808]/60 to-transparent pointer-events-none" />

        {/* Premiere Header Content Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12 pt-24">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10">
            {/* Poster on Left */}
            <div className="flex-shrink-0 group">
              <div className="relative w-64 sm:w-72 lg:w-80 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 group-hover:border-amber-400 group-hover:scale-102 transition-all duration-500">
                <img
                  src={mockMovie.poster}
                  alt={mockMovie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = mockMovie.fallbackPoster
                  }}
                />
                {/* IMAX Metallic Badge */}
                <div className="absolute top-3 left-3 bg-black/80 border border-amber-400/50 text-amber-300 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full backdrop-blur-md">
                  <span>IMAX Experience</span>
                </div>
              </div>
            </div>

            {/* Movie Details on Right */}
            <div className="flex-1 space-y-5 animate-fade-in-up text-center lg:text-left">
              {/* Badges & Status */}
              <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
                <span className="bg-[#ba0036] text-white font-extrabold text-xs px-3.5 py-1 rounded-full shadow-[0_0_12px_rgba(186,0,54,0.5)]">
                  {mockMovie.status}
                </span>
                <span className="border border-white/30 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                  {mockMovie.ageCertification}
                </span>
                <span className="text-amber-200/80 text-xs font-semibold">{mockMovie.runtime}</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
                  {mockMovie.title}
                </h1>
                <p className="text-lg text-amber-100/80 italic font-light">&quot;{mockMovie.tagline}&quot;</p>
              </div>

              {/* Genres */}
              <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                {mockMovie.genre.map((g) => (
                  <span key={g} className="bg-black/60 border border-amber-400/30 text-amber-200 text-xs px-3 py-1 rounded-lg backdrop-blur-sm font-medium">
                    {g}
                  </span>
                ))}
              </div>

              {/* Golden Ratings */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-base px-4 py-1.5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-1.5">
                  <span>★</span>
                  <span>{mockMovie.rating}</span>
                  <span className="text-black/60 text-xs font-normal">/ 10</span>
                </div>
                <span className="text-white/40">•</span>
                <span className="text-xs text-amber-100/80">{mockMovie.languages.join(', ')}</span>
                <span className="text-white/40">•</span>
                <span className="text-xs text-amber-100/80">{mockMovie.releaseDate}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <Link href="#showtimes">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#ba0036] via-amber-600 to-[#ba0036] hover:brightness-110 text-white font-extrabold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Book Tickets 🎟️
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`border-amber-400/40 font-medium px-6 py-4 rounded-xl backdrop-blur-md transition-all ${
                    isWishlisted ? 'bg-[#ba0036] text-white border-[#ba0036]' : 'text-amber-100 hover:bg-amber-500/10'
                  }`}
                >
                  {isWishlisted ? '♥ Saved in Wishlist' : '♡ Add to Wishlist'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Detail Sections Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Tabs Navigation */}
        <Tabs defaultValue="showtimes">
          <TabsList className="bg-black/70 border border-amber-500/30 p-1 rounded-xl mb-10 flex-wrap">
            <TabsTrigger value="showtimes" className="px-6 py-2 rounded-lg font-semibold text-xs text-white">Showtimes & Venues</TabsTrigger>
            <TabsTrigger value="synopsis" className="px-6 py-2 rounded-lg font-semibold text-xs text-white">Story Synopsis</TabsTrigger>
            <TabsTrigger value="cast" className="px-6 py-2 rounded-lg font-semibold text-xs text-white">Cast & Crew</TabsTrigger>
            <TabsTrigger value="trailer" className="px-6 py-2 rounded-lg font-semibold text-xs text-white">Trailer & Media</TabsTrigger>
            <TabsTrigger value="reviews" className="px-6 py-2 rounded-lg font-semibold text-xs text-white">Reviews</TabsTrigger>
          </TabsList>

          {/* Showtimes & Venues Tab */}
          <TabsContent value="showtimes" id="showtimes" className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-extrabold font-display text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-1.5 h-7 bg-[#ba0036] rounded-full" />
                <span>Available IMAX & 4DX Showtimes</span>
              </h2>
              <Badge variant="outline" className="border-amber-500/30 text-amber-300">
                Today, Jan 25
              </Badge>
            </div>

            <div className="space-y-6">
              {mockShowtimes.map((theatre) => (
                <div key={theatre.id} className="bg-[#140e10] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-sm">
                      <h3 className="text-xl font-bold text-white font-display">{theatre.name}</h3>
                      <p className="text-xs text-amber-100/60">📍 {theatre.city}</p>
                      <div className="flex gap-2">
                        {theatre.formats.map((fmt) => (
                          <span key={fmt} className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded">
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] text-amber-200/50 uppercase tracking-wider font-semibold block mb-2">Select Showtime</span>
                      <div className="flex flex-wrap gap-2.5">
                        {theatre.showtimes.map((time, idx) => (
                          <Link key={time} href={`/booking/showtime-${theatre.id}-${idx}/seats`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/20 text-white font-semibold rounded-xl text-xs"
                            >
                              {time}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                      <span className="text-[10px] text-amber-200/50 uppercase tracking-wider">Starts From</span>
                      <span className="text-2xl font-bold text-white font-display">{theatre.startingPrice}</span>
                      <span className="text-xs text-emerald-400 font-semibold">{theatre.availableSeats} seats available</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Synopsis Tab */}
          <TabsContent value="synopsis">
            <div className="bg-[#140e10] border border-white/10 rounded-2xl p-8 space-y-6 shadow-xl">
              <h2 className="text-2xl font-bold font-display text-white">Story Synopsis</h2>
              <p className="text-amber-100/80 leading-relaxed text-base font-light">
                {expandedSynopsis ? mockMovie.synopsis : `${mockMovie.synopsis.substring(0, 240)}...`}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-400 hover:bg-amber-500/10 font-semibold"
                onClick={() => setExpandedSynopsis(!expandedSynopsis)}
              >
                {expandedSynopsis ? 'Show Less ▲' : 'Read Full Synopsis ▼'}
              </Button>

              <Separator className="my-6 border-white/10" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                <div>
                  <span className="text-xs text-amber-200/50 block uppercase tracking-wider font-semibold">Distributor</span>
                  <span className="font-medium text-white">{mockMovie.distributor}</span>
                </div>
                <div>
                  <span className="text-xs text-amber-200/50 block uppercase tracking-wider font-semibold">Studio</span>
                  <span className="font-medium text-white">{mockMovie.productionHouse}</span>
                </div>
                <div>
                  <span className="text-xs text-amber-200/50 block uppercase tracking-wider font-semibold">Subtitles</span>
                  <span className="font-medium text-white">{mockMovie.subtitleAvailability}</span>
                </div>
                <div>
                  <span className="text-xs text-amber-200/50 block uppercase tracking-wider font-semibold">Country</span>
                  <span className="font-medium text-white">{mockMovie.country}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Cast Carousel / Grid Tab */}
          <TabsContent value="cast">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-white">Featured Cast & Crew</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {mockCast.map((cast) => (
                  <div key={cast.id} className="bg-[#140e10] border border-white/10 rounded-2xl p-5 text-center shadow-xl hover:border-amber-400/50 transition-all">
                    <Avatar src={cast.photo} alt={cast.name} className="w-24 h-24 mx-auto mb-4 border-2 border-amber-400/40 shadow-md" />
                    <h3 className="font-bold text-white text-base">{cast.name}</h3>
                    <p className="text-xs text-amber-200/60 mt-1">{cast.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Trailer & Media Section */}
          <TabsContent value="trailer">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold font-display text-white">Official IMAX Trailer</h2>
              {/* Trailer Card with Play Trigger */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl group cursor-pointer bg-black">
                <img src={mockMovie.trailerUrl} alt="Trailer Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#ba0036] text-white flex items-center justify-center shadow-[0_0_30px_rgba(186,0,54,0.8)] group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-bold ml-1">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded-xl border border-white/20">
                  <p className="text-white text-sm font-bold">Watch Official IMAX 3D Trailer</p>
                  <p className="text-amber-200/60 text-xs">2m 45s • 4K Ultra HD</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-white">Audience & Critic Reviews</h2>
              <div className="space-y-4">
                {mockReviews.map((rev) => (
                  <div key={rev.id} className="bg-[#140e10] border border-white/10 p-6 rounded-2xl space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar src={rev.user.avatar} alt={rev.user.name} className="w-10 h-10 border border-amber-400/40" />
                        <div>
                          <h4 className="font-bold text-white text-sm">{rev.user.name}</h4>
                          <span className="text-xs text-amber-200/50">{rev.date}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-amber-400 border-amber-400/40 font-extrabold text-xs">
                        ★ {rev.rating} / 5
                      </Badge>
                    </div>
                    <p className="text-sm text-amber-100/80 font-light leading-relaxed">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
