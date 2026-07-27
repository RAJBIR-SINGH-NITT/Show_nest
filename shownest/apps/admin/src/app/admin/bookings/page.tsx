'use client'

import { useMemo, useState } from 'react'
import { ActionMenu, CrudPage, Modal, SelectField, StatusBadge, TextInputField } from '@/components/admin'
import { getBookings, type BookingRow } from '@/services/admin/operationalService'

interface BookingFormState {
  customer: string
  movie: string
  venue: string
  showtime: string
  bookingDate: string
  seats: string
  amount: string
  bookingSource: string
  status: 'confirmed' | 'pending' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'refunded'
}

const emptyForm = (): BookingFormState => ({
  customer: '',
  movie: '',
  venue: '',
  showtime: '',
  bookingDate: '',
  seats: '',
  amount: '',
  bookingSource: 'Web',
  status: 'pending',
  paymentStatus: 'pending',
})

export default function BookingsPage() {
  const initialRows = useMemo(() => getBookings(), [])
  const [rows, setRows] = useState<BookingRow[]>(initialRows)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<BookingFormState>(emptyForm())

  const columns = [
    { key: 'customer', label: 'Customer' },
    { key: 'movie', label: 'Movie/Event' },
    { key: 'venue', label: 'Venue' },
    { key: 'showtime', label: 'Showtime' },
    { key: 'bookingDate', label: 'Booking Date' },
    { key: 'seats', label: 'Seats' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    amount: `₹${item.amount}`,
    status: <StatusBadge status={item.status === 'confirmed' ? 'Confirmed' : item.status === 'cancelled' ? 'Cancelled' : 'Pending'} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'View Booking', onClick: () => window.location.assign(`/admin/bookings/${item.id}`) },
          { label: 'Edit Booking', onClick: () => handleEdit(item) },
          { label: 'Cancel Booking', onClick: () => handleStatus(item.id, 'cancelled') },
          { label: 'Issue Refund', onClick: () => window.location.assign(`/admin/refunds`) },
          { label: 'Internal Notes', onClick: () => setModalOpen(true) },
        ]}
      />
    ),
  })), [rows])

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({
      customer: item.customer,
      movie: item.movie,
      venue: item.venue,
      showtime: item.showtime,
      bookingDate: item.bookingDate,
      seats: item.seats,
      amount: String(item.amount),
      bookingSource: item.bookingSource,
      status: item.status,
      paymentStatus: item.paymentStatus,
    })
    setModalOpen(true)
  }

  function handleStatus(id: string, status: 'confirmed' | 'pending' | 'cancelled') {
    setRows((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  function handleSubmit() {
    if (!form.customer) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, customer: form.customer, movie: form.movie, venue: form.venue, showtime: form.showtime, bookingDate: form.bookingDate, seats: form.seats, amount: Number(form.amount), bookingSource: form.bookingSource, status: form.status, paymentStatus: form.paymentStatus } : item))
    } else {
      setRows((current) => [{ id: `bk-${Date.now()}`, customer: form.customer, movie: form.movie, venue: form.venue, showtime: form.showtime, bookingDate: form.bookingDate, seats: form.seats, amount: Number(form.amount), bookingSource: form.bookingSource, status: form.status, paymentStatus: form.paymentStatus }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Bookings Management"
        description="Review bookings, ticket status, customer activity, and payment state."
        columns={columns}
        rows={tableRows}
        createLabel="Create Booking"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search bookings"
        filters={[{ label: 'All', value: 'all' }, { label: 'Confirmed', value: 'confirmed' }, { label: 'Pending', value: 'pending' }, { label: 'Cancelled', value: 'cancelled' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Booking' : 'Create Booking'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Customer" value={form.customer} onChange={(value) => setForm((current) => ({ ...current, customer: value }))} placeholder="Customer name" />
          <TextInputField label="Movie / Event" value={form.movie} onChange={(value) => setForm((current) => ({ ...current, movie: value }))} placeholder="Movie or event" />
          <TextInputField label="Venue" value={form.venue} onChange={(value) => setForm((current) => ({ ...current, venue: value }))} placeholder="Venue" />
          <TextInputField label="Showtime" value={form.showtime} onChange={(value) => setForm((current) => ({ ...current, showtime: value }))} placeholder="2026-08-19 20:00" />
          <TextInputField label="Booking Date" type="date" value={form.bookingDate} onChange={(value) => setForm((current) => ({ ...current, bookingDate: value }))} />
          <TextInputField label="Seats" value={form.seats} onChange={(value) => setForm((current) => ({ ...current, seats: value }))} placeholder="4" />
          <TextInputField label="Amount" value={form.amount} onChange={(value) => setForm((current) => ({ ...current, amount: value }))} placeholder="1500" />
          <TextInputField label="Booking Source" value={form.bookingSource} onChange={(value) => setForm((current) => ({ ...current, bookingSource: value }))} placeholder="Web" />
          <SelectField label="Booking Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as BookingFormState['status'] }))} options={[{ label: 'Confirmed', value: 'confirmed' }, { label: 'Pending', value: 'pending' }, { label: 'Cancelled', value: 'cancelled' }]} />
          <SelectField label="Payment Status" value={form.paymentStatus} onChange={(value) => setForm((current) => ({ ...current, paymentStatus: value as BookingFormState['paymentStatus'] }))} options={[{ label: 'Paid', value: 'paid' }, { label: 'Pending', value: 'pending' }, { label: 'Refunded', value: 'refunded' }]} />
        </div>
      </Modal>
    </>
  )
}
