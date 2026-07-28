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
import { artistsMock } from '@/mock/adminModules'

interface ArtistItem {
  id: string
  name: string
  category: string
  events: string[]
  status: 'active' | 'paused'
  image: string
}

interface ArtistFormState {
  name: string
  category: string
  events: string
  status: 'active' | 'paused'
  image: string
}

const emptyForm = (): ArtistFormState => ({ name: '', category: 'Singer', events: '', status: 'active', image: '' })

export default function ArtistsPage() {
  const [rows, setRows] = useState<ArtistItem[]>(artistsMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ArtistFormState>(emptyForm())

  const columns = [
    { key: 'name', label: 'Artist' },
    { key: 'category', label: 'Category' },
    { key: 'events', label: 'Associated Events' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    events: item.events.join(', '),
    status: <StatusBadge status={item.status === 'active' ? 'Active' : 'Paused'} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'Edit', onClick: () => handleEdit(item) },
          { label: 'Pause', onClick: () => handleStatus(item.id, 'paused') },
          { label: 'Delete', onClick: () => handleDelete(item.id), danger: true },
        ]}
      />
    ),
  })), [rows])

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({ name: item.name, category: item.category, events: item.events.join(', '), status: item.status, image: item.image })
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    setRows((current) => current.filter((item) => item.id !== id))
  }

  function handleStatus(id: string, status: 'active' | 'paused') {
    setRows((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  function handleSubmit() {
    if (!form.name) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, name: form.name, category: form.category, events: form.events.split(',').map((entry) => entry.trim()), status: form.status, image: form.image || item.image } : item))
    } else {
      setRows((current) => [{ id: `ar-${Date.now()}`, name: form.name, category: form.category, events: form.events.split(',').map((entry) => entry.trim()), status: form.status, image: form.image || '/assets/heroes/hero.jpg' }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Artists Management"
        description="Maintain artist profiles, event associations, and status updates."
        columns={columns}
        rows={tableRows}
        createLabel="Create Artist"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search artists"
        filters={[{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }, { label: 'Paused', value: 'paused' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Artist' : 'Create Artist'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Artist Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} placeholder="Enter artist name" />
          <SelectField label="Category" value={form.category} onChange={(value) => setForm((current) => ({ ...current, category: value }))} options={[{ label: 'Singer', value: 'Singer' }, { label: 'Performer', value: 'Performer' }, { label: 'Host', value: 'Host' }]} />
          <TextInputField label="Associated Events" value={form.events} onChange={(value) => setForm((current) => ({ ...current, events: value }))} placeholder="Event A, Event B" />
          <div className="md:col-span-2">
            <TextareaField label="Notes" value="" onChange={() => undefined} placeholder="Optional artist notes" />
          </div>
          <div className="md:col-span-2">
            <ImageUploadPlaceholder label="Profile image" />
          </div>
          <div className="md:col-span-2">
            <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as ArtistFormState['status'] }))} options={[{ label: 'Active', value: 'active' }, { label: 'Paused', value: 'paused' }]} />
          </div>
        </div>
      </Modal>
    </>
  )
}
