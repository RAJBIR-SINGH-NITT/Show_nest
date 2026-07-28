'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Badge, Input, Label, Select, Modal, Alert, Separator, EmptyState } from '@shownest/ui'
import Link from 'next/link'

// Mock waitlist data
const mockActiveWaitlists = [
  {
    id: 'waitlist-1',
    movieName: 'The Grand Adventure',
    poster: 'https://via.placeholder.com/80x120/4F46E5/FFFFFF?text=Movie',
    venue: 'PVR Cinemas',
    date: 'Jan 20, 2026',
    showtime: '7:30 PM',
    currentPosition: 3,
    estimatedAvailability: '2-3 hours',
    ticketsRequested: 2,
    dateJoined: 'Jan 15, 2026',
    status: 'waiting',
    bookingPreference: 'Standard',
    seatCategory: 'Premium',
    language: 'English',
    notificationMethod: 'email',
    expirationTime: 'Jan 20, 2026, 7:00 PM',
  },
  {
    id: 'waitlist-2',
    movieName: 'Action Thriller',
    poster: 'https://via.placeholder.com/80x120/DC2626/FFFFFF?text=Movie',
    venue: 'INOX',
    date: 'Jan 25, 2026',
    showtime: '9:00 PM',
    currentPosition: 1,
    estimatedAvailability: '30 minutes',
    ticketsRequested: 4,
    dateJoined: 'Jan 18, 2026',
    status: 'available',
    bookingPreference: 'Standard',
    seatCategory: 'Standard',
    language: 'Hindi',
    notificationMethod: 'push',
    expirationTime: 'Jan 25, 2026, 8:30 PM',
  },
  {
    id: 'waitlist-3',
    movieName: 'Romantic Comedy',
    poster: 'https://via.placeholder.com/80x120/EC4899/FFFFFF?text=Movie',
    venue: 'Cinepolis',
    date: 'Feb 1, 2026',
    showtime: '6:00 PM',
    currentPosition: 5,
    estimatedAvailability: 'Not available',
    ticketsRequested: 2,
    dateJoined: 'Jan 10, 2026',
    status: 'cancelled',
    bookingPreference: 'Standard',
    seatCategory: 'Premium',
    language: 'English',
    notificationMethod: 'sms',
    expirationTime: 'Feb 1, 2026, 5:30 PM',
  },
]

const mockWaitlistHistory = [
  {
    id: 'history-1',
    movieName: 'Sci-Fi Epic',
    venue: 'PVR Cinemas',
    date: 'Jan 5, 2026',
    finalStatus: 'Successfully Booked',
  },
  {
    id: 'history-2',
    movieName: 'Drama Series',
    venue: 'INOX',
    date: 'Dec 28, 2025',
    finalStatus: 'Expired',
  },
  {
    id: 'history-3',
    movieName: 'Comedy Special',
    venue: 'Carnival',
    date: 'Dec 20, 2025',
    finalStatus: 'Cancelled',
  },
]

const mockMovies = [
  { id: 'movie-1', name: 'The Grand Adventure' },
  { id: 'movie-2', name: 'Action Thriller' },
  { id: 'movie-3', name: 'Romantic Comedy' },
  { id: 'movie-4', name: 'Sci-Fi Epic' },
  { id: 'movie-5', name: 'Drama Series' },
]

const mockVenues = [
  { id: 'venue-1', name: 'PVR Cinemas' },
  { id: 'venue-2', name: 'INOX' },
  { id: 'venue-3', name: 'Cinepolis' },
  { id: 'venue-4', name: 'Carnival' },
]

const mockDates = [
  { id: 'date-1', name: 'Jan 20, 2026' },
  { id: 'date-2', name: 'Jan 21, 2026' },
  { id: 'date-3', name: 'Jan 22, 2026' },
  { id: 'date-4', name: 'Jan 23, 2026' },
]

const mockShowtimes = [
  { id: 'show-1', name: '10:00 AM' },
  { id: 'show-2', name: '1:30 PM' },
  { id: 'show-3', name: '4:00 PM' },
  { id: 'show-4', name: '7:30 PM' },
  { id: 'show-5', name: '9:00 PM' },
]

const seatCategories = [
  { id: 'standard', name: 'Standard' },
  { id: 'premium', name: 'Premium' },
  { id: 'vip', name: 'VIP' },
]

const notificationMethods = [
  { id: 'email', name: 'Email' },
  { id: 'sms', name: 'SMS' },
  { id: 'push', name: 'Push Notification' },
]

export default function WaitlistsPage() {
  const [activeWaitlists, setActiveWaitlists] = useState(mockActiveWaitlists)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedWaitlist, setSelectedWaitlist] = useState<typeof mockActiveWaitlists[0] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [joinForm, setJoinForm] = useState({
    movieId: '',
    venueId: '',
    dateId: '',
    showtimeId: '',
    ticketQuantity: '',
    seatCategory: 'standard',
    notificationMethod: 'email',
  })

  const totalActiveWaitlists = activeWaitlists.filter((wl) => wl.status === 'waiting' || wl.status === 'available').length

  const handleJoinWaitlist = () => {
    if (!joinForm.movieId || !joinForm.venueId || !joinForm.dateId || !joinForm.showtimeId || !joinForm.ticketQuantity) {
      return
    }

    setIsProcessing(true)
    setWaitlistStatus('idle')

    // Simulate API call
    setTimeout(() => {
      const newWaitlist = {
        id: `waitlist-${Date.now()}`,
        movieName: mockMovies.find((m) => m.id === joinForm.movieId)?.name || 'Unknown',
        poster: 'https://via.placeholder.com/80x120/4F46E5/FFFFFF?text=Movie',
        venue: mockVenues.find((v) => v.id === joinForm.venueId)?.name || 'Unknown',
        date: mockDates.find((d) => d.id === joinForm.dateId)?.name || 'Unknown',
        showtime: mockShowtimes.find((s) => s.id === joinForm.showtimeId)?.name || 'Unknown',
        currentPosition: Math.floor(Math.random() * 10) + 1,
        estimatedAvailability: '2-4 hours',
        ticketsRequested: parseInt(joinForm.ticketQuantity),
        dateJoined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'waiting',
        bookingPreference: 'Standard',
        seatCategory: seatCategories.find((sc) => sc.id === joinForm.seatCategory)?.name || 'Standard',
        language: 'English',
        notificationMethod: joinForm.notificationMethod,
        expirationTime: '2 hours before showtime',
      }

      setActiveWaitlists([newWaitlist, ...activeWaitlists])
      setIsProcessing(false)
      setIsJoinModalOpen(false)
      setWaitlistStatus('success')
      setJoinForm({
        movieId: '',
        venueId: '',
        dateId: '',
        showtimeId: '',
        ticketQuantity: '',
        seatCategory: 'standard',
        notificationMethod: 'email',
      })

      setTimeout(() => setWaitlistStatus('idle'), 3000)
    }, 1500)
  }

  const handleLeaveWaitlist = (waitlistId: string) => {
    if (confirm('Are you sure you want to leave this waitlist? You will lose your current position.')) {
      setActiveWaitlists(
        activeWaitlists.map((wl) =>
          wl.id === waitlistId ? { ...wl, status: 'cancelled' as const } : wl
        )
      )
    }
  }

  const handleViewDetails = (waitlist: typeof mockActiveWaitlists[0]) => {
    setSelectedWaitlist(waitlist)
    setIsDetailsModalOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'waiting':
        return 'warning'
      case 'available':
        return 'success'
      case 'expired':
        return 'error'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'waiting':
        return 'Waiting'
      case 'available':
        return 'Tickets Available'
      case 'expired':
        return 'Expired'
      case 'cancelled':
        return 'Cancelled'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Waitlists</h1>
              <p className="text-gray-600">Join waitlists for sold-out shows and get notified when tickets become available</p>
            </div>
            <Button onClick={() => setIsJoinModalOpen(true)} variant="primary">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Join New Waitlist
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Active Waitlists:</span>
              <Badge variant="success">{totalActiveWaitlists}</Badge>
            </div>
          </div>
        </div>

        {waitlistStatus === 'success' && (
          <Alert variant="success" className="mb-6">
            <p className="text-sm">Successfully joined waitlist!</p>
          </Alert>
        )}

        {/* Active Waitlists */}
        {activeWaitlists.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="You're Not on Any Waitlists"
            description="Join a waitlist for sold-out shows and get notified when tickets become available."
            action={
              <div className="flex gap-3">
                <Link href="/movies">
                  <Button variant="outline">Browse Movies</Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline">Browse Events</Button>
                </Link>
                <Button onClick={() => setIsJoinModalOpen(true)} variant="primary">
                  Join Waitlist
                </Button>
              </div>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activeWaitlists.map((waitlist) => (
              <Card key={waitlist.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4 mb-4">
                    <img
                      src={waitlist.poster}
                      alt={waitlist.movieName}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{waitlist.movieName}</h3>
                        <Badge variant={getStatusBadgeVariant(waitlist.status)} size="sm">
                          {getStatusLabel(waitlist.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{waitlist.venue}</p>
                      <p className="text-xs text-gray-500">{waitlist.date} at {waitlist.showtime}</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Position</span>
                      <span className="font-medium text-gray-900">#{waitlist.currentPosition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Availability</span>
                      <span className="text-gray-900">{waitlist.estimatedAvailability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tickets</span>
                      <span className="text-gray-900">{waitlist.ticketsRequested}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined</span>
                      <span className="text-gray-900">{waitlist.dateJoined}</span>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(waitlist)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    {waitlist.status === 'waiting' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLeaveWaitlist(waitlist.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Leave
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Waitlist History */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Waitlist History</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockWaitlistHistory.map((history) => (
                <div key={history.id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{history.movieName}</p>
                      <div className="flex gap-4 text-sm text-gray-600 mt-1">
                        <span>{history.venue}</span>
                        <span>{history.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          history.finalStatus === 'Successfully Booked'
                            ? 'success'
                            : history.finalStatus === 'Expired'
                            ? 'error'
                            : 'warning'
                        }
                      >
                        {history.finalStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Back to Account */}
        <div className="mt-8">
          <Link href="/account">
            <Button variant="ghost" className="w-full">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to My Account
            </Button>
          </Link>
        </div>
      </div>

      {/* Join Waitlist Modal */}
      <Modal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        title="Join Waitlist"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="movie">Movie/Event *</Label>
            <Select
              id="movie"
              value={joinForm.movieId}
              onChange={(e) => setJoinForm({ ...joinForm, movieId: e.target.value })}
            >
              <option value="">Select a movie or event</option>
              {mockMovies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="venue">Venue *</Label>
            <Select
              id="venue"
              value={joinForm.venueId}
              onChange={(e) => setJoinForm({ ...joinForm, venueId: e.target.value })}
            >
              <option value="">Select a venue</option>
              {mockVenues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date *</Label>
            <Select
              id="date"
              value={joinForm.dateId}
              onChange={(e) => setJoinForm({ ...joinForm, dateId: e.target.value })}
            >
              <option value="">Select a date</option>
              {mockDates.map((date) => (
                <option key={date.id} value={date.id}>
                  {date.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="showtime">Showtime *</Label>
            <Select
              id="showtime"
              value={joinForm.showtimeId}
              onChange={(e) => setJoinForm({ ...joinForm, showtimeId: e.target.value })}
            >
              <option value="">Select a showtime</option>
              {mockShowtimes.map((showtime) => (
                <option key={showtime.id} value={showtime.id}>
                  {showtime.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="ticketQuantity">Ticket Quantity *</Label>
            <Input
              id="ticketQuantity"
              type="number"
              value={joinForm.ticketQuantity}
              onChange={(e) => setJoinForm({ ...joinForm, ticketQuantity: e.target.value })}
              placeholder="Number of tickets"
              min="1"
              max="10"
            />
          </div>
          <div>
            <Label htmlFor="seatCategory">Seat Category</Label>
            <Select
              id="seatCategory"
              value={joinForm.seatCategory}
              onChange={(e) => setJoinForm({ ...joinForm, seatCategory: e.target.value })}
            >
              {seatCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="notificationMethod">Notification Method *</Label>
            <Select
              id="notificationMethod"
              value={joinForm.notificationMethod}
              onChange={(e) => setJoinForm({ ...joinForm, notificationMethod: e.target.value })}
            >
              {notificationMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </Select>
          </div>
          <Alert variant="info">
            <p className="text-sm">
              You will be notified when tickets become available. You have 30 minutes to complete your booking 
              after receiving the notification. Your position in the waitlist is maintained until tickets become available.
            </p>
          </Alert>
          <Separator />
          <div className="flex gap-3">
            <Button
              onClick={handleJoinWaitlist}
              variant="primary"
              disabled={
                isProcessing ||
                !joinForm.movieId ||
                !joinForm.venueId ||
                !joinForm.dateId ||
                !joinForm.showtimeId ||
                !joinForm.ticketQuantity
              }
              className="flex-1"
            >
              {isProcessing ? 'Joining...' : 'Join Waitlist'}
            </Button>
            <Button
              onClick={() => setIsJoinModalOpen(false)}
              variant="outline"
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Waitlist Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Waitlist Details"
      >
        {selectedWaitlist && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <img
                src={selectedWaitlist.poster}
                alt={selectedWaitlist.movieName}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{selectedWaitlist.movieName}</h3>
                <p className="text-gray-600">{selectedWaitlist.venue}</p>
                <p className="text-gray-600">{selectedWaitlist.date} at {selectedWaitlist.showtime}</p>
                <Badge variant={getStatusBadgeVariant(selectedWaitlist.status)} className="mt-2">
                  {getStatusLabel(selectedWaitlist.status)}
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Current Position</span>
                <span className="font-medium text-gray-900">#{selectedWaitlist.currentPosition}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Estimated Availability</span>
                <span className="text-gray-900">{selectedWaitlist.estimatedAvailability}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Tickets Requested</span>
                <span className="text-gray-900">{selectedWaitlist.ticketsRequested}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Date Joined</span>
                <span className="text-gray-900">{selectedWaitlist.dateJoined}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Booking Preference</span>
                <span className="text-gray-900">{selectedWaitlist.bookingPreference}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Seat Category</span>
                <span className="text-gray-900">{selectedWaitlist.seatCategory}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Language</span>
                <span className="text-gray-900">{selectedWaitlist.language}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Notification Method</span>
                <span className="text-gray-900 capitalize">{selectedWaitlist.notificationMethod}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Expiration Time</span>
                <span className="text-gray-900">{selectedWaitlist.expirationTime}</span>
              </div>
            </div>
            <Separator />
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Edit Preferences
              </Button>
              {selectedWaitlist.status === 'waiting' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLeaveWaitlist(selectedWaitlist.id)
                    setIsDetailsModalOpen(false)
                  }}
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  Leave Waitlist
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
