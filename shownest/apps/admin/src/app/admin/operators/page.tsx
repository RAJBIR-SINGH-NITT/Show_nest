'use client'

import { useMemo, useState } from 'react'
import { ActionMenu, CrudPage, Modal, SelectField, StatusBadge, TextInputField, TextareaField } from '@/components/admin'
import { getOperators, type OperatorRow } from '@/services/admin/operatorService'

interface OperatorFormState {
  name: string
  company: string
  email: string
  phone: string
  status: 'active' | 'suspended' | 'inactive'
  role: string
  venue: string
  notes: string
}

const emptyForm = (): OperatorFormState => ({ name: '', company: '', email: '', phone: '', status: 'active', role: 'Operator', venue: 'Main Venue', notes: '' })

export default function OperatorsPage() {
  const initialRows = useMemo(() => getOperators(), [])
  const [rows, setRows] = useState<OperatorRow[]>(initialRows)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<OperatorFormState>(emptyForm())
  const [activeFilter, setActiveFilter] = useState('all')

  const columns = [
    { key: 'name', label: 'Operator' },
    { key: 'company', label: 'Company' },
    { key: 'email', label: 'Login Email' },
    { key: 'status', label: 'Status' },
    { key: 'role', label: 'Role' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows
    .filter((item) => activeFilter === 'all' || item.status === activeFilter)
    .map((item) => ({
      ...item,
      status: <StatusBadge status={item.status === 'active' ? 'Active' : item.status === 'suspended' ? 'Suspended' : 'Inactive'} />,
      actions: (
        <ActionMenu
          actions={[
            { label: 'View Details', onClick: () => window.location.assign(`/admin/operators/${item.id}`) },
            { label: 'Edit', onClick: () => handleEdit(item) },
            { label: 'Suspend', onClick: () => handleStatus(item.id, 'suspended') },
            { label: 'Activate', onClick: () => handleStatus(item.id, 'active') },
            { label: 'Remove', onClick: () => handleRemove(item.id), danger: true },
          ]}
        />
      ),
    })), [activeFilter, rows])

  function handleEdit(item: OperatorRow) {
    setEditingId(item.id)
    setForm({ name: item.name, company: item.company, email: item.email, phone: item.phone, status: item.status, role: item.role, venue: item.venue, notes: item.notes })
    setModalOpen(true)
  }

  function handleStatus(id: string, status: OperatorFormState['status']) {
    setRows((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  function handleRemove(id: string) {
    setRows((current) => current.filter((item) => item.id !== id))
  }

  function handleSubmit() {
    if (!form.name) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, name: form.name, company: form.company, email: form.email, phone: form.phone, status: form.status, role: form.role, venue: form.venue, notes: form.notes } : item))
    } else {
      setRows((current) => [{ id: `op-${Date.now()}`, name: form.name, company: form.company, email: form.email, phone: form.phone, status: form.status, role: form.role, venue: form.venue, notes: form.notes, lastActive: 'Just now', contact: form.email, activity: 'Created' }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Operator Management"
        description="Search, filter, and manage operator accounts, assignments, and operational access."
        columns={columns}
        rows={tableRows}
        createLabel="Add Operator"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search operators"
        filters={[{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }, { label: 'Suspended', value: 'suspended' }, { label: 'Inactive', value: 'inactive' }]}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Operator' : 'Add Operator'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Operator Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} placeholder="Asha Singh" />
          <TextInputField label="Company" value={form.company} onChange={(value) => setForm((current) => ({ ...current, company: value }))} placeholder="ShowNest Partners" />
          <TextInputField label="Login Email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} placeholder="operator@example.com" />
          <TextInputField label="Phone Number" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} placeholder="+91 99999 00000" />
          <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as OperatorFormState['status'] }))} options={[{ label: 'Active', value: 'active' }, { label: 'Suspended', value: 'suspended' }, { label: 'Inactive', value: 'inactive' }]} />
          <TextInputField label="Assigned Role" value={form.role} onChange={(value) => setForm((current) => ({ ...current, role: value }))} placeholder="Operator" />
          <TextInputField label="Assigned Venue" value={form.venue} onChange={(value) => setForm((current) => ({ ...current, venue: value }))} placeholder="Main Venue" />
          <div className="md:col-span-2">
            <TextareaField label="Notes" value={form.notes} onChange={(value) => setForm((current) => ({ ...current, notes: value }))} placeholder="Operational notes and account context" />
          </div>
        </div>
      </Modal>
    </>
  )
}
