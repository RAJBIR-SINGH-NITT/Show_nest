'use client'

import { useMemo, useState } from 'react'
import {
  ActionMenu,
  CrudPage,
  Modal,
  SelectField,
  StatusBadge,
  TextInputField,
} from '@/components/admin'
import { showtimesMock } from '@/mock/adminModules'

interface ShowtimeItem {
  id: string
  movie: string
  venue: string
  screen: string
  date: string
  time: string
  duration: string
  format: string
  priceTier: string
  status: 'scheduled' | 'conflict'
}

interface ShowtimeFormState {
  movie: string
  venue: string
  screen: string
  date: string
  time: string
  duration: string
  format: string
  priceTier: string
  status: 'scheduled' | 'conflict'
}

const emptyForm = (): ShowtimeFormState => ({ movie: '', venue: '', screen: '', date: '', time: '', duration: '', format: 'IMAX', priceTier: 'Premium', status: 'scheduled' })

export default function ShowtimesPage() {
  const [rows, setRows] = useState<ShowtimeItem[]>(showtimesMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ShowtimeFormState>(emptyForm())

  const columns = [
    { key: 'movie', label: 'Movie/Event' },
    { key: 'venue', label: 'Venue' },
    { key: 'screen', label: 'Screen' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'format', label: 'Format' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    status: <StatusBadge status={item.status === 'conflict' ? 'Conflict' : 'Scheduled'} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'Edit', onClick: () => handleEdit(item) },
          { label: 'Conflict Warning', onClick: () => setModalOpen(true) },
          { label: 'Delete', onClick: () => handleDelete(item.id), danger: true },
        ]}
      />
    ),
  })), [rows])

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({ movie: item.movie, venue: item.venue, screen: item.screen, date: item.date, time: item.time, duration: item.duration, format: item.format, priceTier: item.priceTier, status: item.status })
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    setRows((current) => current.filter((item) => item.id !== id))
  }

  function handleSubmit() {
    if (!form.movie) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, ...form, id: item.id } : item))
    } else {
      setRows((current) => [{ id: `st-${Date.now()}`, ...form }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Showtime Management"
        description="Coordinate showtimes, venues, screens, and pricing tiers with conflict visibility."
        columns={columns}
        rows={tableRows}
        createLabel="Create Showtime"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search showtimes"
        filters={[{ label: 'All', value: 'all' }, { label: 'Scheduled', value: 'scheduled' }, { label: 'Conflict', value: 'conflict' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Showtime' : 'Create Showtime'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Movie / Event" value={form.movie} onChange={(value) => setForm((current) => ({ ...current, movie: value }))} placeholder="Movie or event" />
          <TextInputField label="Venue" value={form.venue} onChange={(value) => setForm((current) => ({ ...current, venue: value }))} placeholder="Venue" />
          <TextInputField label="Screen" value={form.screen} onChange={(value) => setForm((current) => ({ ...current, screen: value }))} placeholder="Screen" />
          <TextInputField label="Date" type="date" value={form.date} onChange={(value) => setForm((current) => ({ ...current, date: value }))} />
          <TextInputField label="Time" type="time" value={form.time} onChange={(value) => setForm((current) => ({ ...current, time: value }))} />
          <TextInputField label="Duration" value={form.duration} onChange={(value) => setForm((current) => ({ ...current, duration: value }))} placeholder="142 mins" />
          <SelectField label="Format" value={form.format} onChange={(value) => setForm((current) => ({ ...current, format: value }))} options={[{ label: 'IMAX', value: 'IMAX' }, { label: '4DX', value: '4DX' }, { label: '2D', value: '2D' }]} />
          <SelectField label="Price Tier" value={form.priceTier} onChange={(value) => setForm((current) => ({ ...current, priceTier: value }))} options={[{ label: 'Premium', value: 'Premium' }, { label: 'Gold', value: 'Gold' }, { label: 'Silver', value: 'Silver' }]} />
          <div className="md:col-span-2">
            <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as ShowtimeFormState['status'] }))} options={[{ label: 'Scheduled', value: 'scheduled' }, { label: 'Conflict', value: 'conflict' }]} />
          </div>
        </div>
      </Modal>
    </>
  )
}
