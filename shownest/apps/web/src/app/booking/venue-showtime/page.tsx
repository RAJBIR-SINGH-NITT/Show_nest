'use client'

import { useState } from 'react'
import { Button, Input, Card, CardContent, Badge, Modal, EmptyState, Skeleton, Separator } from '@shownest/ui'
import Link from 'next/link'

// Mock movie/event data
const mockMovie = {
  id: 'movie-1',
  title: 'The Grand Adventure',
  poster: 'https://via.placeholder.com/100x150/4F46E5/FFFFFF?text=Poster',
  genre: 'Action, Adventure, Sci-Fi',
  category: 'Movie',
}

// Mock dates
const mockDates = [
  { id: 'date-1', day: 'Mon', date: '20', month: 'Jan', isWeekend: false, isHoliday: false },
  { id: 'date-2', day: 'Tue', date: '21', month: 'Jan', isWeekend: false, isHoliday: false },
  { id: 'date-3', day: 'Wed', date: '22', month: 'Jan', isWeekend: false, isHoliday: false },
  { id: 'date-4', day: 'Thu', date: '23', month: 'Jan', isWeekend: false, isHoliday: false },
  { id: 'date-5', day: 'Fri', date: '24', month: 'Jan', isWeekend: false, isHoliday: false },
  { id: 'date-6', day: 'Sat', date: '25', month: 'Jan', isWeekend: true, isHoliday: false },
  { id: 'date-7', day: 'Sun', date: '26', month: 'Jan', isWeekend: true, isHoliday: false },
]

// Mock venues with showtimes
const mockVenues = [
  {
    id: 'venue-1',
    name: 'PVR Cinemas',
    address: 'Phoenix Mall, Lower Parel',
    distance: '2.5 km',
    rating: '4.5',
    facilities: ['Parking', 'Food Court', 'Wheelchair Accessible', 'Recliner Seats'],
    showtimes: [
      { id: 'show-1', time: '10:30 AM', format: '2D', language: 'English', availability: 'Available', price: '₹250' },
      { id: 'show-2', time: '1:30 PM', format: 'IMAX', language: 'English', availability: 'Filling Fast', price: '₹450' },
      { id: 'show-3', time: '4:30 PM', format: '2D', language: 'Hindi', availability: 'Available', price: '₹250' },
      { id: 'show-4', time: '7:30 PM', format: '4DX', language: 'English', availability: 'Almost Full', price: '₹550' },
      { id: 'show-5', time: '10:30 PM', format: 'IMAX', language: 'English', availability: 'Sold Out', price: '₹450' },
    ],
    pricing: { standard: '₹250', premium: '₹350', recliner: '₹450', vip: '₹550' },
    isFavorite: false,
  },
  {
    id: 'venue-2',
    name: 'INOX',
    address: 'Oberoi Mall, Goregaon',
    distance: '4.2 km',
    rating: '4.3',
    facilities: ['Parking', 'Food Court', 'Dolby Atmos', 'VIP'],
    showtimes: [
      { id: 'show-6', time: '11:00 AM', format: '2D', language: 'English', availability: 'Available', price: '₹280' },
      { id: 'show-7', time: '2:00 PM', format: 'Dolby', language: 'English', availability: 'Filling Fast', price: '₹380' },
      { id: 'show-8', time: '5:00 PM', format: '2D', language: 'Hindi', availability: 'Available', price: '₹280' },
      { id: 'show-9', time: '8:00 PM', format: 'IMAX', language: 'English', availability: 'Almost Full', price: '₹480' },
    ],
    pricing: { standard: '₹280', premium: '₹380', recliner: '₹480', vip: '₹580' },
    isFavorite: true,
  },
  {
    id: 'venue-3',
    name: 'Cinepolis',
    address: 'Viviana Mall, Thane',
    distance: '6.8 km',
    rating: '4.4',
    facilities: ['Parking', 'Food Court', 'Recliner Seats', '3D'],
    showtimes: [
      { id: 'show-10', time: '12:00 PM', format: '2D', language: 'English', availability: 'Available', price: '₹260' },
      { id: 'show-11', time: '3:00 PM', format: '3D', language: 'English', availability: 'Filling Fast', price: '₹360' },
      { id: 'show-12', time: '6:00 PM', format: '2D', language: 'Tamil', availability: 'Available', price: '₹260' },
      { id: 'show-13', time: '9:00 PM', format: 'IMAX', language: 'English', availability: 'Available', price: '₹460' },
    ],
    pricing: { standard: '₹260', premium: '₹360', recliner: '₹460', vip: '₹560' },
    isFavorite: false,
  },
]

// Mock venue details for modal
const mockVenueDetails = {
  id: 'venue-1',
  name: 'PVR Cinemas',
  images: [
    'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Venue+1',
    'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Venue+2',
    'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Venue+3',
  ],
  facilities: ['Parking', 'Food Court', 'Wheelchair Accessible', 'Recliner Seats', 'Dolby Atmos', '3D', 'IMAX'],
  parking: 'Available in basement parking - ₹50/hour',
  foodOptions: 'Popcorn, Nachos, Soft Drinks, Sandwiches, Pizza',
  accessibility: 'Wheelchair accessible, Elevator access, Reserved seating',
  contact: '+91 98765 43210',
  address: 'Phoenix Mall, Lower Parel, Mumbai - 400013',
}

// Mock offers
const mockOffers = [
  { id: 'offer-1', title: 'HDFC Bank Offer', description: 'Get 20% off on bookings with HDFC credit cards', badge: 'Bank Offer' },
  { id: 'offer-2', title: 'Student Discount', description: 'Show valid student ID and get 15% off', badge: 'Student' },
  { id: 'offer-3', title: 'Combo Offer', description: 'Get free popcorn with every ticket booking', badge: 'Combo' },
]

export default function VenueShowtimePage() {
  const [selectedDate, setSelectedDate] = useState(mockDates[0])
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedShowtime, setSelectedShowtime] = useState<any>(null)
  const [selectedVenue, setSelectedVenue] = useState<any>(null)
  const [showVenueModal, setShowVenueModal] = useState(false)
  const [venueModalData, setVenueModalData] = useState<any>(null)
  const [favoriteVenues, setFavoriteVenues] = useState<Set<string>>(new Set(['venue-2']))

  const filters = [
    { id: 'all', label: 'All Venues' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'imax', label: 'IMAX' },
    { id: 'dolby', label: 'Dolby' },
    { id: '3d', label: '3D' },
    { id: '2d', label: '2D' },
    { id: 'recliner', label: 'Recliner' },
    { id: 'vip', label: 'VIP' },
    { id: 'fast-filling', label: 'Fast Filling' },
  ]

  const filteredVenues = mockVenues.filter((venue) => {
    const matchesSearch = !searchQuery || 
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'nearby' && parseFloat(venue.distance) <= 5) ||
      (selectedFilter === 'imax' && venue.showtimes.some(s => s.format === 'IMAX')) ||
      (selectedFilter === 'dolby' && venue.facilities.includes('Dolby Atmos')) ||
      (selectedFilter === '3d' && venue.showtimes.some(s => s.format === '3D')) ||
      (selectedFilter === '2d' && venue.showtimes.some(s => s.format === '2D')) ||
      (selectedFilter === 'recliner' && venue.facilities.includes('Recliner Seats')) ||
      (selectedFilter === 'vip' && venue.facilities.includes('VIP')) ||
      (selectedFilter === 'fast-filling' && venue.showtimes.some(s => s.availability === 'Filling Fast'))
    
    return matchesSearch && matchesFilter
  })

  const handleShowtimeSelect = (venue: any, showtime: any) => {
    setSelectedVenue(venue)
    setSelectedShowtime(showtime)
  }

  const handleToggleFavorite = (venueId: string) => {
    const newFavorites = new Set(favoriteVenues)
    if (newFavorites.has(venueId)) {
      newFavorites.delete(venueId)
    } else {
      newFavorites.add(venueId)
    }
    setFavoriteVenues(newFavorites)
  }

  const handleViewVenueDetails = (venue: any) => {
    setVenueModalData(mockVenueDetails)
    setShowVenueModal(true)
  }

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'Available':
        return <Badge variant="success">{availability}</Badge>
      case 'Filling Fast':
        return <Badge variant="warning">{availability}</Badge>
      case 'Almost Full':
        return <Badge variant="error">{availability}</Badge>
      case 'Sold Out':
        return <Badge variant="outline" className="opacity-50">{availability}</Badge>
      default:
        return <Badge variant="outline">{availability}</Badge>
    }
  }

  const getShowtimeButtonVariant = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'outline'
      case 'Filling Fast':
        return 'primary'
      case 'Almost Full':
        return 'primary'
      case 'Sold Out':
        return 'ghost'
      default:
        return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/movies/movie-1">
              <Button variant="ghost" size="sm">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-4 flex-1">
              <img src={mockMovie.poster} alt={mockMovie.title} className="w-16 h-24 object-cover rounded" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{mockMovie.title}</h1>
                <p className="text-sm text-gray-600">{mockMovie.genre}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Mumbai</Badge>
              <Badge variant="info">{selectedDate.day}, {selectedDate.date} {selectedDate.month}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Date Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Select Date</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {mockDates.map((date) => (
              <button
                key={date.id}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 w-20 p-3 rounded-lg border-2 transition-colors ${
                  selectedDate.id === date.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <p className="text-sm font-medium">{date.day}</p>
                <p className="text-2xl font-bold">{date.date}</p>
                <p className="text-xs">{date.month}</p>
                {date.isWeekend && <Badge variant="warning" size="sm" className="mt-1">Weekend</Badge>}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Filters</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Venue */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search venues..."
              className="pl-12 pr-12"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Venue List */}
        {filteredVenues.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            title="No Shows Available"
            description="We couldn't find any shows matching your criteria. Try changing the date or filters."
            action={
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedFilter('all')}>
                  Change Filters
                </Button>
                <Button variant="primary" onClick={() => setSelectedDate(mockDates[1])}>
                  Change Date
                </Button>
              </div>
            }
          />
        ) : (
          <div className="space-y-4">
            {filteredVenues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden">
                <CardContent className="p-6">
                  {/* Venue Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium">{venue.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">{venue.distance}</span>
                      </div>
                      <p className="text-gray-600 mb-3">{venue.address}</p>
                      <div className="flex flex-wrap gap-2">
                        {venue.facilities.map((facility) => (
                          <Badge key={facility} variant="secondary" size="sm">{facility}</Badge>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(venue.id)}
                      className="ml-4"
                      aria-label="Favorite venue"
                    >
                      <svg 
                        className={`w-6 h-6 ${favoriteVenues.has(venue.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                        fill={favoriteVenues.has(venue.id) ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  <Separator className="mb-4" />

                  {/* Showtimes */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Showtimes</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {venue.showtimes.map((showtime) => (
                        <button
                          key={showtime.id}
                          onClick={() => showtime.availability !== 'Sold Out' && handleShowtimeSelect(venue, showtime)}
                          disabled={showtime.availability === 'Sold Out'}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            selectedShowtime?.id === showtime.id
                              ? 'border-blue-500 bg-blue-50'
                              : showtime.availability === 'Sold Out'
                              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                              : 'border-gray-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900">{showtime.time}</span>
                            {getAvailabilityBadge(showtime.availability)}
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" size="sm">{showtime.format}</Badge>
                            <Badge variant="secondary" size="sm">{showtime.language}</Badge>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{showtime.price}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Information */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Pricing</h4>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Standard:</span>
                        <span className="font-medium ml-1">{venue.pricing.standard}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Premium:</span>
                        <span className="font-medium ml-1">{venue.pricing.premium}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Recliner:</span>
                        <span className="font-medium ml-1">{venue.pricing.recliner}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">VIP:</span>
                        <span className="font-medium ml-1">{venue.pricing.vip}</span>
                      </div>
                    </div>
                  </div>

                  {/* Venue Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewVenueDetails(venue)}>
                      View Venue Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      Show on Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Promotional Offers */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockOffers.map((offer) => (
              <Card key={offer.id} className="bg-gradient-to-br from-purple-900 to-blue-900 border-purple-500">
                <CardContent className="p-4">
                  <Badge variant="success" className="mb-2">{offer.badge}</Badge>
                  <h3 className="font-semibold text-lg mb-1">{offer.title}</h3>
                  <p className="text-sm text-gray-300">{offer.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selection Summary */}
        {selectedShowtime && selectedVenue && (
          <Card className="mt-8 bg-blue-50 border-blue-200 sticky bottom-4">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Booking Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Movie</p>
                      <p className="font-medium">{mockMovie.title}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Venue</p>
                      <p className="font-medium">{selectedVenue.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date & Time</p>
                      <p className="font-medium">{selectedDate.date} {selectedDate.month}, {selectedShowtime.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Format</p>
                      <p className="font-medium">{selectedShowtime.format} ({selectedShowtime.language})</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-500">Starting from</p>
                    <p className="text-xl font-bold text-gray-900">{selectedShowtime.price}</p>
                  </div>
                </div>
                <div className="ml-6">
                  <Link href={`/booking/${selectedShowtime.id}`}>
                    <Button variant="primary" size="lg">
                      Continue to Seat Selection
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Venue Details Modal */}
      <Modal isOpen={showVenueModal} onClose={() => setShowVenueModal(false)} title={venueModalData?.name}>
        {venueModalData && (
          <div className="space-y-6">
            {/* Venue Images */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Venue Images</h3>
              <div className="grid grid-cols-3 gap-2">
                {venueModalData.images.map((image: string, index: number) => (
                  <img key={index} src={image} alt={`Venue ${index + 1}`} className="w-full h-24 object-cover rounded" />
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Facilities</h3>
              <div className="flex flex-wrap gap-2">
                {venueModalData.facilities.map((facility: string) => (
                  <Badge key={facility} variant="outline">{facility}</Badge>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Parking</p>
                <p className="font-medium">{venueModalData.parking}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Food Options</p>
                <p className="font-medium">{venueModalData.foodOptions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Accessibility</p>
                <p className="font-medium">{venueModalData.accessibility}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{venueModalData.contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{venueModalData.address}</p>
              </div>
            </div>

            <Button variant="primary" className="w-full" onClick={() => setShowVenueModal(false)}>
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
