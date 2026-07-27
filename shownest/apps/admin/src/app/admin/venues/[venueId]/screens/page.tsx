'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  ActionMenu,
  CrudPage,
  Modal,
  SelectField,
  StatusBadge,
  TextInputField,
} from '@/components/admin'
import { screensMock } from '@/mock/adminModules'

interface ScreenFormState {
  name: string
  format: string
  capacity: string
  seatCount: string
  status: 'active' | 'maintenance'
}

const emptyForm = (): ScreenFormState => ({ name: '', format: 'IMAX', capacity: '', seatCount: '', status: 'active' })

export default function ScreensPage() {
  const params = useParams<{ venueId: string }>()
  const [rows, setRows] = useState(screensMock.filter((screen) => screen.venueId === params.venueId))
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ScreenFormState>(emptyForm())

  const columns = [
    { key: 'name', label: 'Screen' },
    { key: 'format', label: 'Format' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'seatCount', label: 'Seat Count' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    status: <StatusBadge status={item.status === 'active' ? 'Active' : 'Maintenance'} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'Edit', onClick: () => handleEdit(item) },
          { label: 'View Layout', onClick: () => window.location.assign(`/admin/venues/${params.venueId}/screens/${item.id}/layout`) },
          { label: 'Delete', onClick: () => handleDelete(item.id), danger: true },
        ]}
      />
    ),
  })), [rows, params.venueId])

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({ name: item.name, format: item.format, capacity: String(item.capacity), seatCount: String(item.seatCount), status: item.status })
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    setRows((current) => current.filter((item) => item.id !== id))
  }

  function handleSubmit() {
    if (!form.name) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, name: form.name, format: form.format, capacity: Number(form.capacity), seatCount: Number(form.seatCount), status: form.status } : item))
    } else {
      setRows((current) => [{ id: `sc-${Date.now()}`, venueId: params.venueId, name: form.name, format: form.format, capacity: Number(form.capacity), seatCount: Number(form.seatCount), status: form.status }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Screen Management"
        description="Manage screens, formats, and seating capacities for each venue."
        columns={columns}
        rows={tableRows}
        createLabel="Create Screen"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search screens"
        filters={[{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }, { label: 'Maintenance', value: 'maintenance' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Screen' : 'Create Screen'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Screen Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} placeholder="Screen A" />
          <SelectField label="Format" value={form.format} onChange={(value) => setForm((current) => ({ ...current, format: value }))} options={[{ label: 'IMAX', value: 'IMAX' }, { label: '4DX', value: '4DX' }, { label: '2D', value: '2D' }]} />
          <TextInputField label="Capacity" value={form.capacity} onChange={(value) => setForm((current) => ({ ...current, capacity: value }))} placeholder="320" />
          <TextInputField label="Seat Count" value={form.seatCount} onChange={(value) => setForm((current) => ({ ...current, seatCount: value }))} placeholder="320" />
          <div className="md:col-span-2">
            <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as ScreenFormState['status'] }))} options={[{ label: 'Active', value: 'active' }, { label: 'Maintenance', value: 'maintenance' }]} />
          </div>
        </div>
      </Modal>
    </>
  )
}
