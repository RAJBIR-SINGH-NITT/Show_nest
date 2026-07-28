import * as React from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { Modal as ModalComponent } from './Modal'
import { Card, CardContent } from './Card'
import { Badge } from './Badge'
import { Skeleton } from './Skeleton'

export interface City {
  id: string
  name: string
  state: string
  image?: string
  isPopular?: boolean
}

export interface CitySelectorProps {
  currentCity?: string
  onCityChange?: (city: City) => void
  className?: string
}

const mockCities: City[] = [
  { id: '1', name: 'Chennai', state: 'Tamil Nadu', isPopular: true },
  { id: '2', name: 'Bengaluru', state: 'Karnataka', isPopular: true },
  { id: '3', name: 'Hyderabad', state: 'Telangana', isPopular: true },
  { id: '4', name: 'Mumbai', state: 'Maharashtra', isPopular: true },
  { id: '5', name: 'Delhi', state: 'Delhi NCR', isPopular: true },
  { id: '6', name: 'Kolkata', state: 'West Bengal', isPopular: true },
  { id: '7', name: 'Pune', state: 'Maharashtra', isPopular: true },
  { id: '8', name: 'Ahmedabad', state: 'Gujarat', isPopular: true },
  { id: '9', name: 'Kochi', state: 'Kerala', isPopular: true },
  { id: '10', name: 'Jaipur', state: 'Rajasthan', isPopular: true },
  { id: '11', name: 'Lucknow', state: 'Uttar Pradesh' },
  { id: '12', name: 'Chandigarh', state: 'Punjab' },
  { id: '13', name: 'Indore', state: 'Madhya Pradesh' },
  { id: '14', name: 'Nagpur', state: 'Maharashtra' },
  { id: '15', name: 'Surat', state: 'Gujarat' },
  { id: '16', name: 'Bhopal', state: 'Madhya Pradesh' },
  { id: '17', name: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { id: '18', name: 'Patna', state: 'Bihar' },
  { id: '19', name: 'Ludhiana', state: 'Punjab' },
  { id: '20', name: 'Nashik', state: 'Maharashtra' },
]

const mockRecentCities: City[] = [
  { id: '1', name: 'Chennai', state: 'Tamil Nadu' },
  { id: '2', name: 'Bengaluru', state: 'Karnataka' },
  { id: '3', name: 'Hyderabad', state: 'Telangana' },
]

export const CitySelector = React.forwardRef<HTMLDivElement, CitySelectorProps>(
  ({ currentCity = 'Mumbai', onCityChange, className = '' }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [selectedCity, setSelectedCity] = React.useState<City>(mockCities[3]) // Default to Mumbai
    const [isDetectingLocation, setIsDetectingLocation] = React.useState(false)

    const popularCities = mockCities.filter((city) => city.isPopular)
    
    const filteredCities = React.useMemo(() => {
      if (!searchQuery) return mockCities
      return mockCities.filter(
        (city) =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }, [searchQuery])

    const groupedCities = React.useMemo(() => {
      const groups: Record<string, City[]> = {}
      filteredCities.forEach((city) => {
        const firstLetter = city.name.charAt(0).toUpperCase()
        if (!groups[firstLetter]) {
          groups[firstLetter] = []
        }
        groups[firstLetter].push(city)
      })
      return groups
    }, [filteredCities])

    const handleCitySelect = (city: City) => {
      setSelectedCity(city)
      setIsOpen(false)
      onCityChange?.(city)
    }

    const handleDetectLocation = () => {
      setIsDetectingLocation(true)
      // Simulate location detection
      setTimeout(() => {
        setIsDetectingLocation(false)
        const detectedCity = mockCities[Math.floor(Math.random() * mockCities.length)]
        handleCitySelect(detectedCity)
      }, 2000)
    }

    const CityCard = ({ city }: { city: City }) => (
      <button
        onClick={() => handleCitySelect(city)}
        className="w-full text-left hover:bg-gray-50 rounded-lg p-3 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            {city.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{city.name}</p>
            <p className="text-sm text-gray-500">{city.state}</p>
          </div>
          {selectedCity.id === city.id && (
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </button>
    )

    return (
      <div ref={ref} className={className}>
        {/* Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Select city"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-medium text-gray-900">{selectedCity.name}</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Modal */}
        <ModalComponent
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Select Your City"
        >
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your city..."
                className="pl-10"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Current Location */}
            <div>
              <button
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDetectingLocation ? (
                  <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                <div className="text-left">
                  <p className="font-medium text-gray-900">
                    {isDetectingLocation ? 'Detecting location...' : 'Use Current Location'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isDetectingLocation ? 'Please wait' : "We'll detect your city automatically"}
                  </p>
                </div>
              </button>
            </div>

            {/* Recent Cities */}
            {mockRecentCities.length > 0 && !searchQuery && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Cities</h3>
                <div className="space-y-2">
                  {mockRecentCities.map((city) => (
                    <CityCard key={city.id} city={city} />
                  ))}
                </div>
              </div>
            )}

            {/* Popular Cities */}
            {!searchQuery && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Cities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {popularCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleCitySelect(city)}
                      className="relative p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-2">
                        {city.name.charAt(0)}
                      </div>
                      <p className="font-medium text-gray-900 text-sm">{city.name}</p>
                      <p className="text-xs text-gray-500">{city.state}</p>
                      {selectedCity.id === city.id && (
                        <div className="absolute top-2 right-2">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All Cities (Grouped Alphabetically) */}
            {searchQuery && (
              <div>
                {Object.keys(groupedCities).length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-900 font-medium">No cities found</p>
                    <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {Object.entries(groupedCities)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([letter, cities]) => (
                        <div key={letter}>
                          <h3 className="text-sm font-semibold text-gray-900 mb-2 sticky top-0 bg-white py-1">{letter}</h3>
                          <div className="space-y-1">
                            {cities.map((city) => (
                              <CityCard key={city.id} city={city} />
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </ModalComponent>
      </div>
    )
  }
)

CitySelector.displayName = 'CitySelector'
