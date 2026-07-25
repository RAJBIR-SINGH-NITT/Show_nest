'use client'

import { Button, Card, CardHeader, CardContent, Badge, Avatar, Separator } from '@shownest/ui'
import Link from 'next/link'

// Mock user data
const mockUserData = {
  fullName: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  memberSince: 'Jan 2024',
  membershipTier: 'Gold',
  preferredCity: 'Mumbai',
  preferredLanguage: 'English',
  avatar: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=RS',
}

// Mock statistics
const mockStatistics = {
  upcomingBookings: 2,
  completedBookings: 15,
  loyaltyPoints: 1250,
  savedPaymentMethods: 2,
}

// Mock recent bookings
const mockRecentBookings = [
  {
    id: 'SN-2026-78542',
    poster: 'https://via.placeholder.com/60x90/4F46E5/FFFFFF?text=Movie',
    title: 'The Grand Adventure',
    theatre: 'PVR Cinemas',
    date: 'Sat, Jan 15, 2026',
    showtime: '6:30 PM',
    status: 'Confirmed',
  },
  {
    id: 'SN-2026-78123',
    poster: 'https://via.placeholder.com/60x90/10B981/FFFFFF?text=Movie',
    title: 'Action Hero',
    theatre: 'INOX',
    date: 'Sun, Jan 10, 2026',
    showtime: '3:00 PM',
    status: 'Completed',
  },
  {
    id: 'SN-2026-77890',
    poster: 'https://via.placeholder.com/60x90/F59E0B/FFFFFF?text=Movie',
    title: 'Romantic Evening',
    theatre: 'Cinepolis',
    date: 'Fri, Jan 5, 2026',
    showtime: '8:00 PM',
    status: 'Cancelled',
  },
]

const quickActions = [
  { label: 'My Bookings', href: '/account/bookings', icon: '🎫' },
  { label: 'Wishlist', href: '/account/wishlist', icon: '♥' },
  { label: 'Profile Settings', href: '/account/profile', icon: '👤' },
  { label: 'Payment Methods', href: '/account/payment-methods', icon: '💳' },
  { label: 'Loyalty & Rewards', href: '/account/loyalty', icon: '🎁' },
  { label: 'Gift Cards', href: '/account/gift-cards', icon: '🎟️' },
  { label: 'Waitlists', href: '/account/waitlists', icon: '⏳' },
  { label: 'Notification Settings', href: '/account/notification-settings', icon: '🔔' },
  { label: 'Price Alerts', href: '/account/price-alerts', icon: '📈' },
]

export default function AccountPage() {
  const handleEditProfile = () => {
    console.log('Edit profile clicked')
  }

  const handleLogout = () => {
    console.log('Logout clicked')
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success'
      case 'completed':
        return 'info'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Quick Actions */}
          <div className="space-y-6">
            {/* User Profile Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar
                    src={mockUserData.avatar}
                    alt={mockUserData.fullName}
                    size="xl"
                    fallback={mockUserData.fullName.charAt(0)}
                    className="mb-4"
                  />
                  <h2 className="text-xl font-bold text-gray-900">{mockUserData.fullName}</h2>
                  <p className="text-sm text-gray-600">{mockUserData.email}</p>
                  <p className="text-sm text-gray-600">{mockUserData.phone}</p>
                  <Separator className="my-4" />
                  <div className="space-y-2 w-full">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-medium">{mockUserData.memberSince}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Membership</span>
                      <Badge variant="success">{mockUserData.membershipTier}</Badge>
                    </div>
                  </div>
                  <Button
                    onClick={handleEditProfile}
                    variant="outline"
                    className="mt-4 w-full"
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <span className="text-2xl mb-2">{action.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{mockUserData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-medium text-gray-900">{mockUserData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Preferred City</p>
                    <p className="font-medium text-gray-900">{mockUserData.preferredCity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Preferred Language</p>
                    <p className="font-medium text-gray-900">{mockUserData.preferredLanguage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Statistics & Recent Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Statistics */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Account Statistics</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-blue-600">{mockStatistics.upcomingBookings}</p>
                    <p className="text-sm text-gray-600">Upcoming Bookings</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-600">{mockStatistics.completedBookings}</p>
                    <p className="text-sm text-gray-600">Completed Bookings</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-600">{mockStatistics.loyaltyPoints}</p>
                    <p className="text-sm text-gray-600">Loyalty Points</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-orange-600">{mockStatistics.savedPaymentMethods}</p>
                    <p className="text-sm text-gray-600">Saved Payment Methods</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                  <Link href="/account/bookings">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all"
                    >
                      <img
                        src={booking.poster}
                        alt={booking.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{booking.title}</h4>
                        <p className="text-sm text-gray-600">{booking.theatre}</p>
                        <p className="text-sm text-gray-600">{booking.date} at {booking.showtime}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={getStatusBadgeVariant(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Link href={`/booking/confirmation/${booking.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/account/bookings" className="flex-1">
                <Button variant="primary" size="lg" className="w-full">
                  View All Bookings
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
