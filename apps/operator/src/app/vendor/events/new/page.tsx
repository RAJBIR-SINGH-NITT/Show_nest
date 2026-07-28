'use client'

import { useState } from 'react'
import { Button, Card, CardContent, Input, Label, Textarea } from '@shownest/ui'
import { createVendorRequest } from '@/features/vendor/service'

export default function NewVendorEventPage() {
  const [title, setTitle] = useState('')
  const [venue, setVenue] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    createVendorRequest({
      vendorName: 'Vendor Partner',
      vendorEmail: 'vendor@example.com',
      requestType: 'create',
      eventInfo: title || 'Untitled event',
      oldData: null,
      newData: `Create request for ${title || 'event'} at ${venue || 'venue'}. ${description}`,
      status: 'pending',
    })

    setTitle('')
    setVenue('')
    setDescription('')
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#FFC107]/20 bg-gradient-to-br from-[#1b0f12] via-[#120a0c] to-[#2a1218] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#FFC107]">Create Event</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">New Vendor Event Request</h1>
          <p className="mt-2 text-sm text-gray-300">This flow creates a pending request instead of publishing anything immediately.</p>
        </div>
      </div>

      <Card className="border-[#FFC107]/10 bg-[#140d10] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
        <CardContent className="p-6 space-y-4">
          <Input label="Event title" value={title} onChange={(event) => setTitle(event.target.value)} />
          <Input label="Venue" value={venue} onChange={(event) => setVenue(event.target.value)} />
          <Textarea label="Event details" value={description} onChange={(event) => setDescription(event.target.value)} />
          <Button className="bg-gradient-to-r from-[#ba0036] via-[#d97706] to-[#ba0036] text-white" onClick={handleSubmit}>Submit Pending Request</Button>
        </CardContent>
      </Card>
    </div>
  )
}
