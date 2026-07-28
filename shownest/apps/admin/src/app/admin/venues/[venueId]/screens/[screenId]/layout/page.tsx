'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminCard, PageHeader, StatusBadge } from '@/components/admin'
import { seatLayoutsMock } from '@/mock/adminModules'

const seatCategories = ['Premium', 'Gold', 'Silver', 'VIP', 'Wheelchair Accessible', 'Companion Seats', 'Blocked']

export default function SeatLayoutPage() {
  const params = useParams<{ venueId: string; screenId: string }>()
  const [rows, setRows] = useState(seatLayoutsMock[params.screenId] ?? [])
  const [selectedCategory, setSelectedCategory] = useState(seatCategories[0])

  const totalSeats = useMemo(() => rows.reduce((acc, row) => acc + row.seats.length, 0), [rows])

  function addRow() {
    const label = String.fromCharCode(65 + rows.length)
    setRows((current) => [...current, { id: `${label}-${Date.now()}`, label, seats: [] }])
  }

  function deleteRow(rowId: string) {
    setRows((current) => current.filter((row) => row.id !== rowId))
  }

  function addSeat(rowId: string) {
    setRows((current) => current.map((row) => row.id === rowId ? { ...row, seats: [...row.seats, { id: `${row.label}${row.seats.length + 1}`, number: row.seats.length + 1, category: selectedCategory }] } : row))
  }

  function deleteSeat(rowId: string, seatId: string) {
    setRows((current) => current.map((row) => row.id === rowId ? { ...row, seats: row.seats.filter((seat) => seat.id !== seatId) } : row))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Seat Layout Builder"
        description="Create a visual seat map for the selected screen using mock-only state."
        action={<button className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save Layout</button>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard title="Designer Workspace" description="Add rows, assign seat categories, and build a layout visually.">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button onClick={addRow} className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-4 py-2 text-sm">Add Row</button>
              <button className="rounded-full border border-[#e5bdbe] bg-white px-4 py-2 text-sm">Reset Layout</button>
              <button className="rounded-full border border-[#e5bdbe] bg-white px-4 py-2 text-sm">Load Template</button>
              <button className="rounded-full border border-[#e5bdbe] bg-white px-4 py-2 text-sm">Undo</button>
              <button className="rounded-full border border-[#e5bdbe] bg-white px-4 py-2 text-sm">Redo</button>
            </div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
              <div className="flex flex-wrap gap-2">
                {seatCategories.map((category) => (
                  <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-full px-3 py-2 text-sm ${selectedCategory === category ? 'bg-[#ba0036] text-white' : 'border border-[#e5bdbe] bg-white text-[#5c3f41]'}`}>
                    {category}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                {rows.map((row) => (
                  <div key={row.id} className="rounded-2xl border border-[#e5bdbe] bg-white p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#281718]">Row {row.label}</p>
                        <p className="text-sm text-[#5c3f41]">{row.seats.length} seats</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => addSeat(row.id)} className="rounded-full border border-[#e5bdbe] px-3 py-1.5 text-sm">Add Seat</button>
                        <button onClick={() => deleteRow(row.id)} className="rounded-full border border-[#e5bdbe] px-3 py-1.5 text-sm text-[#ba0036]">Delete Row</button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {row.seats.map((seat) => (
                        <button key={seat.id} onClick={() => deleteSeat(row.id, seat.id)} className="rounded-xl border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 text-sm text-[#281718]">
                          {row.label}{seat.number} · {seat.category}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Layout Summary" description="A quick summary of the current layout state.">
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
              <p className="text-sm text-[#5c3f41]">Screen</p>
              <p className="mt-1 text-lg font-semibold text-[#281718]">{params.screenId}</p>
            </div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
              <p className="text-sm text-[#5c3f41]">Seat Count</p>
              <p className="mt-1 text-lg font-semibold text-[#281718]">{totalSeats}</p>
            </div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
              <p className="text-sm text-[#5c3f41]">Seat Categories</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {seatCategories.map((category) => <span key={category} className="rounded-full border border-[#e5bdbe] bg-white px-3 py-1 text-sm text-[#5c3f41]">{category}</span>)}
              </div>
            </div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
              <p className="text-sm text-[#5c3f41]">Status</p>
              <div className="mt-2"><StatusBadge status="Draft" /></div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  )
}
