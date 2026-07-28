'use client'

import { useState } from 'react'
import { Button, Card, CardContent, Badge, Tabs, TabsList, TabsTrigger, TabsContent, EmptyState } from '@shownest/ui'
import Link from 'next/link'

const mockWishlistItems = [
  {
    id: 'w-1',
    type: 'movie',
    title: 'The Grand Adventure',
    genre: 'Action, Sci-Fi',
    rating: '8.5',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80',
    status: 'Now Showing',
  },
  {
    id: 'w-2',
    type: 'event',
    title: 'Neon Horizon World Tour',
    genre: 'Concert',
    rating: '4.9',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80',
    status: 'Selling Fast',
  },
]

export default function WishlistPage() {
  const [items, setItems] = useState(mockWishlistItems)

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#fff8f7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-display text-[#281718]">My Wishlist</h1>
          <p className="text-[#5c3f41] mt-1 text-sm">Saved movies, concerts, and live experiences you plan to attend.</p>
        </div>

        {items.length === 0 ? (
          <EmptyState
            title="Your Wishlist is Empty"
            description="You haven't saved any movies or events to your wishlist yet."
            action={{
              label: 'Explore Movies & Events',
              onClick: () => window.location.href = '/movies',
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="bg-white border-[#e5bdbe] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="relative aspect-[3/2]">
                  <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                  <Badge variant="success" className="absolute top-3 left-3 bg-[#ba0036] text-white">
                    {item.status}
                  </Badge>
                </div>
                <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#281718] font-display">{item.title}</h3>
                    <p className="text-xs text-[#5c3f41] mt-1">{item.genre} • ★ {item.rating}</p>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-[#e5bdbe]">
                    <Link href={`/movies/mumbai/the-grand-adventure`} className="flex-1">
                      <Button size="sm" variant="primary" className="w-full bg-[#ba0036] text-white">
                        Book Now
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#e5bdbe] text-[#ba0036]"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
