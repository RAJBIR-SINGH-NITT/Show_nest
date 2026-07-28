'use client'

import { useState } from 'react'
import { CitySelector, Button, Card, CardContent, Badge } from '@shownest/ui'
import Link from 'next/link'

const featuredCities = [
  { name: 'Mumbai', count: '142 Shows Today', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Bengaluru', count: '98 Shows Today', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80' },
  { name: 'Delhi NCR', count: '120 Shows Today', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80' },
  { name: 'Chennai', count: '75 Shows Today', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80' },
  { name: 'Hyderabad', count: '85 Shows Today', image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&auto=format&fit=crop&q=80' },
  { name: 'Kolkata', count: '64 Shows Today', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop&q=80' },
]

export default function CitiesPage() {
  const [selectedCity, setSelectedCity] = useState('Mumbai')

  return (
    <div className="min-h-screen bg-[#fff8f7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge variant="outline" className="text-[#ba0036] border-[#e5bdbe] bg-[#ffe9e9]">
            Location Preferences
          </Badge>
          <h1 className="text-4xl font-bold text-[#281718] font-display">Select Your City</h1>
          <p className="text-[#5c3f41] text-lg">
            Choose your city to discover movies, live concerts, comedy shows, and sports events happening near you.
          </p>
        </div>

        {/* City Selector Widget */}
        <Card className="bg-white border-[#e5bdbe] shadow-sm rounded-2xl p-6">
          <CitySelector
            currentCity={selectedCity}
            onCityChange={(city) => setSelectedCity(city.name)}
          />
        </Card>

        {/* Featured Cities Visual Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#281718] font-display">Popular Hubs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCities.map((city) => (
              <div
                key={city.name}
                className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm border border-[#e5bdbe] transition-all hover:-translate-y-1 hover:shadow-md"
                onClick={() => setSelectedCity(city.name)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#281718]/90 via-[#281718]/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{city.name}</h3>
                    <p className="text-xs text-white/80">{city.count}</p>
                  </div>
                  <Link href={`/movies`}>
                    <Button size="sm" variant="primary" className="bg-[#ba0036] hover:bg-[#e21e4a]">
                      Explore
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-6">
          <Link href="/">
            <Button variant="outline" className="border-[#e5bdbe] text-[#281718]">
              ← Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
