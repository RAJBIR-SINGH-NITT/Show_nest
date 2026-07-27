'use client'

import { useState } from 'react'
import { TextInputField } from '@/components/admin'

export function ManualEntryForm() {
  const [ticketId, setTicketId] = useState('')

  return (
    <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4">
      <p className="text-lg font-semibold text-[#281718]">Manual Ticket Entry</p>
      <div className="mt-4 space-y-3">
        <TextInputField label="Booking ID / Ticket Code" value={ticketId} onChange={setTicketId} placeholder="Enter ticket code" />
        <button className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Validate Ticket</button>
      </div>
    </div>
  )
}
