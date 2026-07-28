export interface User {
  id: string
  email: string
  name: string
}

export interface Movie {
  id: string
  title: string
  slug: string
}

export interface Event {
  id: string
  title: string
  slug: string
}

export interface Venue {
  id: string
  name: string
  city: string
}

export interface Showtime {
  id: string
  movieId: string
  venueId: string
  startTime: Date
}

export interface Booking {
  id: string
  userId: string
  showtimeId: string
  status: 'pending' | 'confirmed' | 'cancelled'
}
