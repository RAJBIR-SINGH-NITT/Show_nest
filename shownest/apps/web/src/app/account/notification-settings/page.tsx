'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Switch, Input, Label, Alert, Separator } from '@shownest/ui'
import Link from 'next/link'

// Mock notification settings
const mockNotificationSettings = {
  channels: {
    email: true,
    sms: false,
    push: true,
    inApp: true,
  },
  booking: {
    confirmation: true,
    reminder: true,
    cancellation: true,
    rescheduled: true,
    ticketDownload: true,
  },
  payment: {
    success: true,
    failure: true,
    refund: true,
    invoice: false,
  },
  promotional: {
    movieRecommendations: true,
    eventRecommendations: false,
    exclusiveOffers: true,
    loyaltyRewards: true,
    giftCardOffers: false,
    seasonalPromotions: true,
  },
  emailPreferences: {
    weeklyNewsletter: true,
    newReleases: true,
    upcomingEvents: false,
    accountUpdates: true,
  },
  quietHours: {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
  },
}

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState(mockNotificationSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSavePreferences = () => {
    setIsSaving(true)
    setSaveStatus('idle')

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveStatus('success')

      setTimeout(() => setSaveStatus('idle'), 3000)
    }, 1500)
  }

  const handleResetToDefault = () => {
    setSettings(mockNotificationSettings)
  }

  const handleCancel = () => {
    setSettings(mockNotificationSettings)
  }

  const handleChannelToggle = (channel: keyof typeof settings.channels) => {
    setSettings({
      ...settings,
      channels: {
        ...settings.channels,
        [channel]: !settings.channels[channel],
      },
    })
  }

  const handleBookingToggle = (setting: keyof typeof settings.booking) => {
    setSettings({
      ...settings,
      booking: {
        ...settings.booking,
        [setting]: !settings.booking[setting],
      },
    })
  }

  const handlePaymentToggle = (setting: keyof typeof settings.payment) => {
    setSettings({
      ...settings,
      payment: {
        ...settings.payment,
        [setting]: !settings.payment[setting],
      },
    })
  }

  const handlePromotionalToggle = (setting: keyof typeof settings.promotional) => {
    setSettings({
      ...settings,
      promotional: {
        ...settings.promotional,
        [setting]: !settings.promotional[setting],
      },
    })
  }

  const handleEmailPreferenceToggle = (preference: keyof typeof settings.emailPreferences) => {
    setSettings({
      ...settings,
      emailPreferences: {
        ...settings.emailPreferences,
        [preference]: !settings.emailPreferences[preference],
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Settings</h1>
          <p className="text-gray-600">Manage how and when you receive notifications from ShowNest</p>
        </div>

        {saveStatus === 'success' && (
          <Alert variant="success" className="mb-6">
            <p className="text-sm">Preferences saved successfully!</p>
          </Alert>
        )}

        {saveStatus === 'error' && (
          <Alert variant="error" className="mb-6">
            <p className="text-sm">Failed to save preferences. Please try again.</p>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Notification Channels */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Notification Channels</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Email Notifications"
                  checked={settings.channels.email}
                  onChange={(e) => handleChannelToggle('email')}
                />
                <Switch
                  label="SMS Notifications"
                  checked={settings.channels.sms}
                  onChange={(e) => handleChannelToggle('sms')}
                />
                <Switch
                  label="Push Notifications"
                  checked={settings.channels.push}
                  onChange={(e) => handleChannelToggle('push')}
                />
                <Switch
                  label="In-App Notifications"
                  checked={settings.channels.inApp}
                  onChange={(e) => handleChannelToggle('inApp')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Notifications */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Booking Notifications</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Booking Confirmation"
                  checked={settings.booking.confirmation}
                  onChange={(e) => handleBookingToggle('confirmation')}
                />
                <Switch
                  label="Booking Reminder"
                  checked={settings.booking.reminder}
                  onChange={(e) => handleBookingToggle('reminder')}
                />
                <Switch
                  label="Booking Cancellation"
                  checked={settings.booking.cancellation}
                  onChange={(e) => handleBookingToggle('cancellation')}
                />
                <Switch
                  label="Booking Rescheduled"
                  checked={settings.booking.rescheduled}
                  onChange={(e) => handleBookingToggle('rescheduled')}
                />
                <Switch
                  label="Ticket Download Ready"
                  checked={settings.booking.ticketDownload}
                  onChange={(e) => handleBookingToggle('ticketDownload')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Notifications */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Payment Notifications</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Payment Success"
                  checked={settings.payment.success}
                  onChange={(e) => handlePaymentToggle('success')}
                />
                <Switch
                  label="Payment Failure"
                  checked={settings.payment.failure}
                  onChange={(e) => handlePaymentToggle('failure')}
                />
                <Switch
                  label="Refund Processed"
                  checked={settings.payment.refund}
                  onChange={(e) => handlePaymentToggle('refund')}
                />
                <Switch
                  label="Invoice Available"
                  checked={settings.payment.invoice}
                  onChange={(e) => handlePaymentToggle('invoice')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Promotional Notifications */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Promotional Notifications</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Movie Recommendations"
                  checked={settings.promotional.movieRecommendations}
                  onChange={(e) => handlePromotionalToggle('movieRecommendations')}
                />
                <Switch
                  label="Event Recommendations"
                  checked={settings.promotional.eventRecommendations}
                  onChange={(e) => handlePromotionalToggle('eventRecommendations')}
                />
                <Switch
                  label="Exclusive Offers"
                  checked={settings.promotional.exclusiveOffers}
                  onChange={(e) => handlePromotionalToggle('exclusiveOffers')}
                />
                <Switch
                  label="Loyalty Rewards"
                  checked={settings.promotional.loyaltyRewards}
                  onChange={(e) => handlePromotionalToggle('loyaltyRewards')}
                />
                <Switch
                  label="Gift Card Offers"
                  checked={settings.promotional.giftCardOffers}
                  onChange={(e) => handlePromotionalToggle('giftCardOffers')}
                />
                <Switch
                  label="Seasonal Promotions"
                  checked={settings.promotional.seasonalPromotions}
                  onChange={(e) => handlePromotionalToggle('seasonalPromotions')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Email Preferences */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Email Preferences</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Weekly Newsletter"
                  checked={settings.emailPreferences.weeklyNewsletter}
                  onChange={(e) => handleEmailPreferenceToggle('weeklyNewsletter')}
                />
                <Switch
                  label="New Releases"
                  checked={settings.emailPreferences.newReleases}
                  onChange={(e) => handleEmailPreferenceToggle('newReleases')}
                />
                <Switch
                  label="Upcoming Events"
                  checked={settings.emailPreferences.upcomingEvents}
                  onChange={(e) => handleEmailPreferenceToggle('upcomingEvents')}
                />
                <Switch
                  label="Account Updates"
                  checked={settings.emailPreferences.accountUpdates}
                  onChange={(e) => handleEmailPreferenceToggle('accountUpdates')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quiet Hours */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Quiet Hours</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Switch
                  label="Enable Quiet Hours"
                  checked={settings.quietHours.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    quietHours: { ...settings.quietHours, enabled: e.target.checked },
                  })}
                />
                {settings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={settings.quietHours.startTime}
                        onChange={(e) => setSettings({
                          ...settings,
                          quietHours: { ...settings.quietHours, startTime: e.target.value },
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={settings.quietHours.endTime}
                        onChange={(e) => setSettings({
                          ...settings,
                          quietHours: { ...settings.quietHours, endTime: e.target.value },
                        })}
                      />
                    </div>
                  </div>
                )}
                <Alert variant="info">
                  <p className="text-sm">
                    During quiet hours, you will not receive push notifications or SMS. 
                    Email notifications will still be delivered.
                  </p>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Price Alerts Shortcut */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Alerts</h3>
                  <p className="text-gray-600 text-sm">
                    Get notified when ticket prices drop for your favorite movies and events.
                  </p>
                </div>
                <Link href="/account/price-alerts">
                  <Button variant="outline">
                    Manage Price Alerts
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSavePreferences}
              variant="primary"
              disabled={isSaving}
              className="flex-1"
            >
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </Button>
            <Button
              onClick={handleResetToDefault}
              variant="outline"
              disabled={isSaving}
              className="flex-1"
            >
              Reset to Default
            </Button>
            <Button
              onClick={handleCancel}
              variant="ghost"
              disabled={isSaving}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>

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
  )
}
