'use client'

import { Button, Card, CardHeader, CardContent, Badge, ProgressBar, Alert, Separator } from '@shownest/ui'
import Link from 'next/link'

// Mock loyalty data
const mockLoyaltyData = {
  loyaltyTier: 'Gold',
  memberSince: 'Jan 2024',
  totalRewardPoints: 12500,
  availablePoints: 3200,
  lifetimePointsEarned: 15000,
  pointsExpiringSoon: 500,
  pointsExpiringDate: 'Feb 28, 2026',
  currentTierPoints: 12500,
  nextTierPoints: 20000,
  nextTier: 'Platinum',
}

const mockPointsHistory = [
  {
    id: 1,
    date: 'Jan 15, 2026',
    activity: 'Movie Booking - The Grand Adventure',
    pointsEarned: 100,
    pointsRedeemed: 0,
    runningBalance: 3200,
  },
  {
    id: 2,
    date: 'Jan 10, 2026',
    activity: 'Birthday Bonus',
    pointsEarned: 500,
    pointsRedeemed: 0,
    runningBalance: 3100,
  },
  {
    id: 3,
    date: 'Jan 5, 2026',
    activity: 'Redeemed - Free Popcorn',
    pointsEarned: 0,
    pointsRedeemed: 200,
    runningBalance: 2600,
  },
  {
    id: 4,
    date: 'Dec 28, 2025',
    activity: 'Movie Booking - Action Thriller',
    pointsEarned: 80,
    pointsRedeemed: 0,
    runningBalance: 2800,
  },
  {
    id: 5,
    date: 'Dec 20, 2025',
    activity: 'Referral Bonus',
    pointsEarned: 1000,
    pointsRedeemed: 0,
    runningBalance: 2720,
  },
]

const mockRewards = [
  {
    id: 1,
    title: 'Free Popcorn',
    description: 'Get a free medium popcorn with any movie booking',
    requiredPoints: 200,
    available: true,
    icon: '🍿',
  },
  {
    id: 2,
    title: 'Movie Ticket Discount',
    description: '25% off on your next movie ticket',
    requiredPoints: 500,
    available: true,
    icon: '🎬',
  },
  {
    id: 3,
    title: 'Premium Seat Upgrade',
    description: 'Upgrade to premium seats at no extra cost',
    requiredPoints: 800,
    available: true,
    icon: '💺',
  },
  {
    id: 4,
    title: 'Event Discount',
    description: '15% off on concert and event tickets',
    requiredPoints: 600,
    available: true,
    icon: '🎵',
  },
  {
    id: 5,
    title: 'Merchandise Voucher',
    description: '₹200 voucher for movie merchandise',
    requiredPoints: 1000,
    available: false,
    icon: '🎁',
  },
]

const mockBenefits = [
  {
    title: 'Priority Booking',
    description: 'Book tickets 24 hours before general public',
    icon: '⚡',
  },
  {
    title: 'Exclusive Offers',
    description: 'Access to member-only discounts and promotions',
    icon: '🎟️',
  },
  {
    title: 'Birthday Rewards',
    description: '500 bonus points on your birthday',
    icon: '🎂',
  },
  {
    title: 'Early Access to Events',
    description: 'Priority access to concert and event tickets',
    icon: '🎭',
  },
  {
    title: 'Special Discounts',
    description: '10% off on concessions and merchandise',
    icon: '💰',
  },
]

export default function LoyaltyPage() {
  const handleRedeemReward = (rewardId: number) => {
    console.log('Redeem reward:', rewardId)
  }

  const progressPercentage = (mockLoyaltyData.currentTierPoints / mockLoyaltyData.nextTierPoints) * 100
  const pointsNeeded = mockLoyaltyData.nextTierPoints - mockLoyaltyData.currentTierPoints

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Loyalty Rewards</h1>
          <p className="text-gray-600">Earn points with every booking and unlock exclusive rewards</p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="warning" size="lg">
              {mockLoyaltyData.loyaltyTier} Member
            </Badge>
            <span className="text-sm text-gray-500">Member since {mockLoyaltyData.memberSince}</span>
          </div>
        </div>

        {/* Loyalty Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{mockLoyaltyData.totalRewardPoints.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Available</p>
              <p className="text-2xl font-bold text-blue-600">{mockLoyaltyData.availablePoints.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Lifetime Earned</p>
              <p className="text-2xl font-bold text-gray-900">{mockLoyaltyData.lifetimePointsEarned.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-600">{mockLoyaltyData.pointsExpiringSoon}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Current Tier</p>
              <p className="text-2xl font-bold text-yellow-600">{mockLoyaltyData.loyaltyTier}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tier & Benefits */}
          <div className="space-y-6">
            {/* Membership Tier */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Membership Tier</h3>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-4xl">👑</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{mockLoyaltyData.loyaltyTier}</p>
                  <p className="text-sm text-gray-600">{mockLoyaltyData.currentTierPoints.toLocaleString()} points</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress to {mockLoyaltyData.nextTier}</span>
                    <span className="font-medium text-gray-900">{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <ProgressBar value={mockLoyaltyData.currentTierPoints} max={mockLoyaltyData.nextTierPoints} />
                  <p className="text-sm text-gray-500 text-center">
                    {pointsNeeded.toLocaleString()} more points needed
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Your Benefits</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-2xl">{benefit.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expiring Points */}
            {mockLoyaltyData.pointsExpiringSoon > 0 && (
              <Alert variant="warning">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Points Expiring Soon</p>
                    <p className="text-sm text-gray-600">
                      {mockLoyaltyData.pointsExpiringSoon} points will expire on {mockLoyaltyData.pointsExpiringDate}. 
                      Redeem them before they&apos;re gone!
                    </p>
                  </div>
                </div>
              </Alert>
            )}
          </div>

          {/* Middle Column - Available Rewards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Available Rewards</h3>
                  <Badge variant="info">{mockRewards.filter(r => r.available).length} Available</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRewards.map((reward) => (
                    <div key={reward.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{reward.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                            <Badge variant={reward.available ? 'success' : 'error'} size="sm">
                              {reward.available ? 'Available' : 'Unavailable'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-600">
                              {reward.requiredPoints} points
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRedeemReward(reward.id)}
                              disabled={!reward.available || mockLoyaltyData.availablePoints < reward.requiredPoints}
                            >
                              Redeem
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Points History */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Points History</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPointsHistory.map((entry) => (
                    <div key={entry.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">{entry.activity}</p>
                        <div className="text-right">
                          {entry.pointsEarned > 0 && (
                            <p className="text-sm font-medium text-green-600">+{entry.pointsEarned}</p>
                          )}
                          {entry.pointsRedeemed > 0 && (
                            <p className="text-sm font-medium text-red-600">-{entry.pointsRedeemed}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{entry.date}</p>
                        <p className="text-xs text-gray-500">Balance: {entry.runningBalance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button variant="primary" className="w-full">
                  Redeem Rewards
                </Button>
                <Button variant="outline" className="w-full">
                  View Reward History
                </Button>
                <Button variant="ghost" className="w-full">
                  Learn More About Loyalty Program
                </Button>
              </CardContent>
            </Card>

            {/* Back to Account */}
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
      </div>
    </div>
  )
}
