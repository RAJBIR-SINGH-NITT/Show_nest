'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Badge, Input, Label, Select, Modal, Alert, Separator, EmptyState } from '@shownest/ui'
import Link from 'next/link'

// Mock price alert data
const mockActiveAlerts = [
  {
    id: 'alert-1',
    movieName: 'The Grand Adventure',
    poster: 'https://via.placeholder.com/80x120/4F46E5/FFFFFF?text=Movie',
    venue: 'PVR Cinemas',
    targetPrice: 250,
    currentPrice: 300,
    status: 'active',
    creationDate: 'Jan 10, 2026',
    preferredDate: 'Jan 20, 2026',
    notificationMethod: 'email',
  },
  {
    id: 'alert-2',
    movieName: 'Action Thriller',
    poster: 'https://via.placeholder.com/80x120/DC2626/FFFFFF?text=Movie',
    venue: 'INOX',
    targetPrice: 200,
    currentPrice: 180,
    status: 'triggered',
    creationDate: 'Jan 5, 2026',
    preferredDate: 'Jan 15, 2026',
    notificationMethod: 'push',
  },
  {
    id: 'alert-3',
    movieName: 'Romantic Comedy',
    poster: 'https://via.placeholder.com/80x120/EC4899/FFFFFF?text=Movie',
    venue: 'PVR Cinemas',
    targetPrice: 180,
    currentPrice: 220,
    status: 'paused',
    creationDate: 'Dec 28, 2025',
    preferredDate: 'Feb 5, 2026',
    notificationMethod: 'sms',
  },
]

const mockAlertHistory = [
  {
    id: 'history-1',
    movieName: 'Sci-Fi Epic',
    targetPrice: 300,
    triggeredPrice: 280,
    triggerDate: 'Jan 8, 2026',
    finalStatus: 'triggered',
  },
  {
    id: 'history-2',
    movieName: 'Drama Series',
    targetPrice: 200,
    triggeredPrice: 195,
    triggerDate: 'Dec 20, 2025',
    finalStatus: 'triggered',
  },
  {
    id: 'history-3',
    movieName: 'Comedy Special',
    targetPrice: 150,
    triggeredPrice: null,
    triggerDate: null,
    finalStatus: 'expired',
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

const notificationMethods = [
  { id: 'email', name: 'Email' },
  { id: 'sms', name: 'SMS' },
  { id: 'push', name: 'Push Notification' },
]

export default function PriceAlertsPage() {
  const [activeAlerts, setActiveAlerts] = useState(mockActiveAlerts)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [alertStatus, setAlertStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [createForm, setCreateForm] = useState({
    movieId: '',
    venueId: '',
    preferredDate: '',
    targetPrice: '',
    notificationMethod: 'email',
  })

  const totalActiveAlerts = activeAlerts.filter((alert) => alert.status === 'active').length

  const handleCreateAlert = () => {
    if (!createForm.movieId || !createForm.targetPrice) {
      return
    }

    setIsProcessing(true)
    setAlertStatus('idle')

    // Simulate API call
    setTimeout(() => {
      const newAlert = {
        id: `alert-${Date.now()}`,
        movieName: mockMovies.find((m) => m.id === createForm.movieId)?.name || 'Unknown',
        poster: 'https://via.placeholder.com/80x120/4F46E5/FFFFFF?text=Movie',
        venue: mockVenues.find((v) => v.id === createForm.venueId)?.name || 'Any Venue',
        targetPrice: parseInt(createForm.targetPrice),
        currentPrice: 350,
        status: 'active',
        creationDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        preferredDate: createForm.preferredDate || 'Any Date',
        notificationMethod: createForm.notificationMethod,
      }

      setActiveAlerts([newAlert, ...activeAlerts])
      setIsProcessing(false)
      setIsCreateModalOpen(false)
      setAlertStatus('success')
      setCreateForm({
        movieId: '',
        venueId: '',
        preferredDate: '',
        targetPrice: '',
        notificationMethod: 'email',
      })

      setTimeout(() => setAlertStatus('idle'), 3000)
    }, 1500)
  }

  const handlePauseAlert = (alertId: string) => {
    setActiveAlerts(
      activeAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, status: 'paused' as const } : alert
      )
    )
  }

  const handleResumeAlert = (alertId: string) => {
    setActiveAlerts(
      activeAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, status: 'active' as const } : alert
      )
    )
  }

  const handleDeleteAlert = (alertId: string) => {
    if (confirm('Are you sure you want to delete this price alert?')) {
      setActiveAlerts(activeAlerts.filter((alert) => alert.id !== alertId))
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success'
      case 'triggered':
        return 'info'
      case 'expired':
        return 'error'
      case 'paused':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Price Alerts</h1>
              <p className="text-gray-600">Get notified when ticket prices drop for your favorite movies and events</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Alert
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Active Alerts:</span>
              <Badge variant="success">{totalActiveAlerts}</Badge>
            </div>
          </div>
        </div>

        {alertStatus === 'success' && (
          <Alert variant="success" className="mb-6">
            <p className="text-sm">Price alert created successfully!</p>
          </Alert>
        )}

        {/* Active Price Alerts */}
        {activeAlerts.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
            title="No Price Alerts Yet"
            description="Create a price alert to get notified when ticket prices drop for your favorite movies and events."
            action={
              <div className="flex gap-3">
                <Link href="/movies">
                  <Button variant="outline">Browse Movies</Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline">Browse Events</Button>
                </Link>
                <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
                  Create Alert
                </Button>
              </div>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activeAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4 mb-4">
                    <img
                      src={alert.poster}
                      alt={alert.movieName}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{alert.movieName}</h3>
                        <Badge variant={getStatusBadgeVariant(alert.status)} size="sm">
                          {getStatusLabel(alert.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{alert.venue}</p>
                      <p className="text-xs text-gray-500">Created: {alert.creationDate}</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Price</span>
                      <span className="font-medium text-gray-900">₹{alert.targetPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Price</span>
                      <span className="font-medium text-gray-900">₹{alert.currentPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preferred Date</span>
                      <span className="text-gray-900">{alert.preferredDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Notification</span>
                      <span className="text-gray-900 capitalize">{alert.notificationMethod}</span>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex gap-2">
                    {alert.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePauseAlert(alert.id)}
                        className="flex-1"
                      >
                        Pause
                      </Button>
                    )}
                    {alert.status === 'paused' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResumeAlert(alert.id)}
                        className="flex-1"
                      >
                        Resume
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Alert History */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Alert History</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAlertHistory.map((history) => (
                <div key={history.id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{history.movieName}</p>
                      <div className="flex gap-4 text-sm text-gray-600 mt-1">
                        <span>Target: ₹{history.targetPrice}</span>
                        {history.triggeredPrice && (
                          <span>Triggered: ₹{history.triggeredPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusBadgeVariant(history.finalStatus)}>
                        {getStatusLabel(history.finalStatus)}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {history.triggerDate || 'Not triggered'}
                      </p>
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

      {/* Create Price Alert Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Price Alert"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="movie">Movie/Event *</Label>
            <Select
              id="movie"
              value={createForm.movieId}
              onChange={(e) => setCreateForm({ ...createForm, movieId: e.target.value })}
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
            <Label htmlFor="venue">Preferred Venue</Label>
            <Select
              id="venue"
              value={createForm.venueId}
              onChange={(e) => setCreateForm({ ...createForm, venueId: e.target.value })}
            >
              <option value="">Any venue</option>
              {mockVenues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="preferredDate">Preferred Date</Label>
            <Input
              id="preferredDate"
              type="date"
              value={createForm.preferredDate}
              onChange={(e) => setCreateForm({ ...createForm, preferredDate: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="targetPrice">Target Price (₹) *</Label>
            <Input
              id="targetPrice"
              type="number"
              value={createForm.targetPrice}
              onChange={(e) => setCreateForm({ ...createForm, targetPrice: e.target.value })}
              placeholder="Enter target price"
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="notificationMethod">Notification Method *</Label>
            <Select
              id="notificationMethod"
              value={createForm.notificationMethod}
              onChange={(e) => setCreateForm({ ...createForm, notificationMethod: e.target.value })}
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
              You will be notified when the ticket price drops to or below your target price. 
              The alert will remain active until triggered or manually deleted.
            </p>
          </Alert>
          <Separator />
          <div className="flex gap-3">
            <Button
              onClick={handleCreateAlert}
              variant="primary"
              disabled={isProcessing || !createForm.movieId || !createForm.targetPrice}
              className="flex-1"
            >
              {isProcessing ? 'Creating...' : 'Create Alert'}
            </Button>
            <Button
              onClick={() => setIsCreateModalOpen(false)}
              variant="outline"
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
