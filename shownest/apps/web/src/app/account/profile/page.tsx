'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardContent, Input, Label, Avatar, Switch, Select, Separator, Alert } from '@shownest/ui'
import Link from 'next/link'

// Mock user data
const mockUserData = {
  firstName: 'Rahul',
  lastName: 'Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  preferredCity: 'Mumbai',
  preferredLanguage: 'English',
  preferredTimeZone: 'Asia/Kolkata',
  avatar: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=RS',
  membershipTier: 'Gold',
  memberSince: 'Jan 2024',
  emailVerified: true,
  preferredMovieLanguage: 'English',
  favoriteGenres: ['Action', 'Adventure', 'Sci-Fi'],
  favoriteEventCategories: ['Movies', 'Concerts'],
  marketingEmails: true,
  marketingSMS: false,
  marketingPush: true,
}

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune']
const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada']
const timeZones = ['Asia/Kolkata', 'Asia/Dubai', 'America/New_York', 'Europe/London']
const genders = ['Male', 'Female', 'Other', 'Prefer not to say']

export default function ProfilePage() {
  const [formData, setFormData] = useState(mockUserData)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveChanges = () => {
    setIsSaving(true)
    setSaveStatus('idle')

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveStatus('success')
    }, 2000)
  }

  const handleCancel = () => {
    setFormData(mockUserData)
  }

  const handleResetChanges = () => {
    setFormData(mockUserData)
  }

  const handleChangePhoto = () => {
    // Placeholder for change photo functionality
  }

  const handleRemovePhoto = () => {
    // Placeholder for remove photo functionality
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        {saveStatus === 'success' && (
          <Alert variant="success" className="mb-6">
            <p className="text-sm">Profile updated successfully!</p>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Header & Photo */}
          <div className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar
                    src={formData.avatar}
                    alt={`${formData.firstName} ${formData.lastName}`}
                    size="xl"
                    fallback={`${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`}
                    className="mb-4"
                  />
                  <h2 className="text-xl font-bold text-gray-900">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600">Member Since: {formData.memberSince}</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm font-medium text-yellow-600">{formData.membershipTier} Member</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {formData.emailVerified ? (
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">Not Verified</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Photo */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar
                    src={formData.avatar}
                    alt={`${formData.firstName} ${formData.lastName}`}
                    size="xl"
                    fallback={`${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleChangePhoto}
                    >
                      Change Photo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemovePhoto}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                      >
                        {genders.map((gender) => (
                          <option key={gender} value={gender.toLowerCase()}>
                            {gender}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Preferences */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Location Preferences</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="preferredCity">Preferred City</Label>
                    <Select
                      id="preferredCity"
                      value={formData.preferredCity}
                      onChange={(e) => handleChange('preferredCity', e.target.value)}
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="preferredLanguage">Preferred Language</Label>
                    <Select
                      id="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                    >
                      {languages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="preferredTimeZone">Preferred Time Zone</Label>
                    <Select
                      id="preferredTimeZone"
                      value={formData.preferredTimeZone}
                      onChange={(e) => handleChange('preferredTimeZone', e.target.value)}
                    >
                      {timeZones.map((timeZone) => (
                        <option key={timeZone} value={timeZone}>
                          {timeZone}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Preferences */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Account Preferences</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="preferredMovieLanguage">Preferred Movie Language</Label>
                    <Select
                      id="preferredMovieLanguage"
                      value={formData.preferredMovieLanguage}
                      onChange={(e) => handleChange('preferredMovieLanguage', e.target.value)}
                    >
                      {languages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="favoriteGenres">Favorite Genres</Label>
                    <Input
                      id="favoriteGenres"
                      value={formData.favoriteGenres.join(', ')}
                      onChange={(e) => handleChange('favoriteGenres', e.target.value.split(', '))}
                      placeholder="Enter genres separated by commas"
                    />
                  </div>
                  <div>
                    <Label htmlFor="favoriteEventCategories">Favorite Event Categories</Label>
                    <Input
                      id="favoriteEventCategories"
                      value={formData.favoriteEventCategories.join(', ')}
                      onChange={(e) => handleChange('favoriteEventCategories', e.target.value.split(', '))}
                      placeholder="Enter categories separated by commas"
                    />
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-base font-medium mb-4">Marketing Preferences</Label>
                    <div className="space-y-3">
                      <Switch
                        label="Receive marketing emails"
                        checked={formData.marketingEmails}
                        onChange={(e) => handleChange('marketingEmails', e.target.checked)}
                      />
                      <Switch
                        label="Receive marketing SMS"
                        checked={formData.marketingSMS}
                        onChange={(e) => handleChange('marketingSMS', e.target.checked)}
                      />
                      <Switch
                        label="Receive push notifications"
                        checked={formData.marketingPush}
                        onChange={(e) => handleChange('marketingPush', e.target.checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSaveChanges}
                variant="primary"
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                disabled={isSaving}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleResetChanges}
                variant="ghost"
                disabled={isSaving}
                className="flex-1"
              >
                Reset Changes
              </Button>
            </div>

            {/* Back to Account */}
            <Link href="/account">
              <Button variant="ghost" className="w-full">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
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
