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
import { venuesMock } from '@/mock/adminModules'

interface VenueItem {
  id: string
  name: string
  address: string
  city: string
  state: string
  screens: number
  capacity: number
  amenities: string[]
  parking: boolean
  accessibility: boolean
  status: 'active' | 'maintenance'
}

interface VenueFormState {
  name: string
  address: string
  city: string
  state: string
  capacity: string
  amenities: string
  parking: 'yes' | 'no'
  accessibility: 'yes' | 'no'
  status: 'active' | 'maintenance'
}

const emptyForm = (): VenueFormState => ({ name: '', address: '', city: '', state: '', capacity: '', amenities: '', parking: 'yes', accessibility: 'yes', status: 'active' })

export default function VenuesPage() {
  const [rows, setRows] = useState<VenueItem[]>(venuesMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<VenueFormState>(emptyForm())

  const columns = [
    { key: 'name', label: 'Venue' },
    { key: 'address', label: 'Address' },
    { key: 'city', label: 'City' },
    { key: 'screens', label: 'Screens' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    capacity: item.capacity.toLocaleString(),
    status: <StatusBadge status={item.status === 'active' ? 'Active' : 'Maintenance'} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'Edit', onClick: () => handleEdit(item) },
          { label: 'Manage Screens', onClick: () => window.location.assign(`/admin/venues/${item.id}/screens`) },
          { label: 'Delete', onClick: () => handleDelete(item.id), danger: true },
        ]}
      />
    ),
  })), [rows])

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({ name: item.name, address: item.address, city: item.city, state: item.state, capacity: String(item.capacity), amenities: item.amenities.join(', '), parking: item.parking ? 'yes' : 'no', accessibility: item.accessibility ? 'yes' : 'no', status: item.status })
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    setRows((current) => current.filter((item) => item.id !== id))
  }

  function handleSubmit() {
    if (!form.name) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, name: form.name, address: form.address, city: form.city, state: form.state, capacity: Number(form.capacity), amenities: form.amenities.split(',').map((entry) => entry.trim()), parking: form.parking === 'yes', accessibility: form.accessibility === 'yes', status: form.status } : item))
    } else {
      setRows((current) => [{ id: `vn-${Date.now()}`, name: form.name, address: form.address, city: form.city, state: form.state, screens: 0, capacity: Number(form.capacity), amenities: form.amenities.split(',').map((entry) => entry.trim()), parking: form.parking === 'yes', accessibility: form.accessibility === 'yes', status: form.status }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Venue Management"
        description="Control venues, capacity, amenities, and accessibility across the network."
        columns={columns}
        rows={tableRows}
        createLabel="Create Venue"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search venues"
        filters={[{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }, { label: 'Maintenance', value: 'maintenance' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Venue' : 'Create Venue'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Venue Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} placeholder="Enter venue name" />
          <TextInputField label="Capacity" value={form.capacity} onChange={(value) => setForm((current) => ({ ...current, capacity: value }))} placeholder="1200" />
          <TextInputField label="City" value={form.city} onChange={(value) => setForm((current) => ({ ...current, city: value }))} placeholder="City" />
          <TextInputField label="State" value={form.state} onChange={(value) => setForm((current) => ({ ...current, state: value }))} placeholder="State" />
          <div className="md:col-span-2">
            <TextareaField label="Address" value={form.address} onChange={(value) => setForm((current) => ({ ...current, address: value }))} placeholder="Full venue address" />
          </div>
          <TextInputField label="Amenities" value={form.amenities} onChange={(value) => setForm((current) => ({ ...current, amenities: value }))} placeholder="Parking, Lounge" />
          <SelectField label="Parking" value={form.parking} onChange={(value) => setForm((current) => ({ ...current, parking: value as VenueFormState['parking'] }))} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
          <SelectField label="Accessibility" value={form.accessibility} onChange={(value) => setForm((current) => ({ ...current, accessibility: value as VenueFormState['accessibility'] }))} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
          <div className="md:col-span-2">
            <ImageUploadPlaceholder label="Venue visuals" />
          </div>
          <div className="md:col-span-2">
            <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as VenueFormState['status'] }))} options={[{ label: 'Active', value: 'active' }, { label: 'Maintenance', value: 'maintenance' }]} />
          </div>
        </div>
      </Modal>
    </>
  )
}
