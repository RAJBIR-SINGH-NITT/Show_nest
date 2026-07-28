export const moviesMock = [
  {
    id: 'mv-001',
    title: 'The Grand Adventure',
    genre: 'Adventure',
    language: 'English',
    duration: '142 mins',
    releaseDate: '2026-09-12',
    certification: 'UA',
    status: 'published' as const,
    poster: '/assets/heroes/hero.jpg',
    description: 'A visual spectacle with a heartfelt narrative.',
  },
  {
    id: 'mv-002',
    title: 'Neon Horizon',
    genre: 'Sci-Fi',
    language: 'Hindi',
    duration: '128 mins',
    releaseDate: '2026-10-02',
    certification: 'A',
    status: 'draft' as const,
    poster: '/assets/heroes/hero.jpg',
    description: 'A fast-moving story of orbit and ambition.',
  },
]

export const eventsMock = [
  {
    id: 'ev-001',
    title: 'Neon Horizon Live',
    category: 'Concert',
    venue: 'Jio World Garden',
    organizer: 'Astra Live',
    date: '2026-08-18',
    time: '19:30',
    status: 'published' as const,
  },
  {
    id: 'ev-002',
    title: 'City Lights Festival',
    category: 'Festival',
    venue: 'Wankhede Stadium',
    organizer: 'Pulse Events',
    date: '2026-09-25',
    time: '17:00',
    status: 'draft' as const,
  },
]

export const artistsMock = [
  {
    id: 'ar-001',
    name: 'Mira Das',
    category: 'Singer',
    events: ['Neon Horizon Live'],
    status: 'active' as const,
    image: '/assets/heroes/hero.jpg',
  },
  {
    id: 'ar-002',
    name: 'Aman Shah',
    category: 'Performer',
    events: ['City Lights Festival'],
    status: 'paused' as const,
    image: '/assets/heroes/hero.jpg',
  },
]

export const venuesMock = [
  {
    id: 'vn-001',
    name: 'PVR Phoenix',
    address: 'Lower Parel, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    screens: 6,
    capacity: 1800,
    amenities: ['Parking', 'Wheelchair Access'],
    parking: true,
    accessibility: true,
    status: 'active' as const,
  },
  {
    id: 'vn-002',
    name: 'Jio World Garden',
    address: 'Bandra Kurla Complex, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    screens: 4,
    capacity: 2600,
    amenities: ['VIP Lounge', 'Food Court'],
    parking: true,
    accessibility: true,
    status: 'maintenance' as const,
  },
]

export const screensMock = [
  {
    id: 'sc-001',
    venueId: 'vn-001',
    name: 'Screen A',
    format: 'IMAX',
    capacity: 320,
    seatCount: 320,
    status: 'active' as const,
  },
  {
    id: 'sc-002',
    venueId: 'vn-001',
    name: 'Screen B',
    format: '4DX',
    capacity: 220,
    seatCount: 220,
    status: 'maintenance' as const,
  },
]

export const seatLayoutsMock: Record<string, Array<{ id: string; label: string; seats: Array<{ id: string; number: number; category: string }> }>> = {
  'sc-001': [
    { id: 'row-a', label: 'A', seats: [{ id: 'a1', number: 1, category: 'Premium' }, { id: 'a2', number: 2, category: 'Gold' }] },
    { id: 'row-b', label: 'B', seats: [{ id: 'b1', number: 1, category: 'Silver' }, { id: 'b2', number: 2, category: 'VIP' }] },
  ],
}

export const showtimesMock = [
  {
    id: 'st-001',
    movie: 'The Grand Adventure',
    venue: 'PVR Phoenix',
    screen: 'Screen A',
    date: '2026-08-19',
    time: '20:00',
    duration: '142 mins',
    format: 'IMAX',
    priceTier: 'Premium',
    status: 'scheduled' as const,
  },
  {
    id: 'st-002',
    movie: 'Neon Horizon',
    venue: 'Jio World Garden',
    screen: 'Screen B',
    date: '2026-08-20',
    time: '18:30',
    duration: '128 mins',
    format: '4DX',
    priceTier: 'Gold',
    status: 'conflict' as const,
  },
]

export const pricingRulesMock = [
  {
    id: 'pr-001',
    name: 'Weekend Premium',
    basePrice: 250,
    type: 'Weekend',
    value: 20,
    status: 'active' as const,
  },
  {
    id: 'pr-002',
    name: 'Holiday Surge',
    basePrice: 300,
    type: 'Holiday',
    value: 15,
    status: 'draft' as const,
  },
]

export const promotionsMock = [
  {
    id: 'pm-001',
    code: 'SUMMER20',
    title: 'Summer Launch',
    discountType: 'percentage' as const,
    value: 20,
    validity: '2026-09-30',
    usageLimit: 500,
    currentUsage: 142,
    status: 'active' as const,
  },
  {
    id: 'pm-002',
    code: 'EARLYBIRD',
    title: 'Early Bird',
    discountType: 'flat' as const,
    value: 80,
    validity: '2026-08-15',
    usageLimit: 200,
    currentUsage: 198,
    status: 'draft' as const,
  },
]
