'use client'

import { useMemo, useState } from 'react'
import {
  ActionMenu,
  CrudPage,
  Modal,
  SelectField,
  StatusBadge,
  TextInputField,
  TextareaField,
  ImageUploadPlaceholder,
} from '@/components/admin'
import { eventsMock } from '@/mock/adminModules'

interface EventItem {
  id: string
  title: string
  category: string
  venue: string
  organizer: string
  date: string
  time: string
  status: 'draft' | 'published'
}

interface EventFormState {
  title: string
  category: string
  venue: string
  organizer: string
  date: string
  time: string
  description: string
  status: 'draft' | 'published'
}

const emptyForm = (): EventFormState => ({ title: '', category: 'Concert', venue: 'Jio World Garden', organizer: '', date: '', time: '', description: '', status: 'draft' })

export default function EventsPage() {
  const [rows, setRows] = useState<EventItem[]>(eventsMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<EventFormState>(emptyForm())

  const columns = [
    { key: 'title', label: 'Event' },
    { key: 'category', label: 'Category' },
    { key: 'venue', label: 'Venue' },
    { key: 'organizer', label: 'Organizer' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    status: <StatusBadge status={item.status === 'published' ? 'Published' : 'Draft'} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'Preview', onClick: () => setModalOpen(true) },
          { label: 'Edit', onClick: () => handleEdit(item) },
          { label: 'Publish', onClick: () => handleStatus(item.id, 'published') },
          { label: 'Delete', onClick: () => handleDelete(item.id), danger: true },
        ]}
      />
    ),
  })), [rows])

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({ title: item.title, category: item.category, venue: item.venue, organizer: item.organizer, date: item.date, time: item.time, description: '', status: item.status })
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    setRows((current) => current.filter((item) => item.id !== id))
  }

  function handleStatus(id: string, status: 'draft' | 'published') {
    setRows((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  function handleSubmit() {
    if (!form.title) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, ...form, id: item.id } : item))
    } else {
      setRows((current) => [{ id: `ev-${Date.now()}`, ...form }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Events Management"
        description="Manage events, organizers, venue placements, and publishing states."
        columns={columns}
        rows={tableRows}
        createLabel="Create Event"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search events"
        filters={[{ label: 'All', value: 'all' }, { label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Event' : 'Create Event'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Event Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} placeholder="Enter event title" />
          <SelectField label="Category" value={form.category} onChange={(value) => setForm((current) => ({ ...current, category: value }))} options={[{ label: 'Concert', value: 'Concert' }, { label: 'Festival', value: 'Festival' }, { label: 'Sports', value: 'Sports' }]} />
          <TextInputField label="Venue" value={form.venue} onChange={(value) => setForm((current) => ({ ...current, venue: value }))} placeholder="Venue name" />
          <TextInputField label="Organizer" value={form.organizer} onChange={(value) => setForm((current) => ({ ...current, organizer: value }))} placeholder="Organizer" />
          <TextInputField label="Date" type="date" value={form.date} onChange={(value) => setForm((current) => ({ ...current, date: value }))} />
          <TextInputField label="Time" type="time" value={form.time} onChange={(value) => setForm((current) => ({ ...current, time: value }))} />
          <div className="md:col-span-2">
            <TextareaField label="Description" value={form.description} onChange={(value) => setForm((current) => ({ ...current, description: value }))} placeholder="Add event details" />
          </div>
          <div className="md:col-span-2">
            <ImageUploadPlaceholder label="Event banner" />
          </div>
          <div className="md:col-span-2">
            <SelectField label="Publish Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as EventFormState['status'] }))} options={[{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }]} />
          </div>
        </div>
      </Modal>
    </>
  )
}
