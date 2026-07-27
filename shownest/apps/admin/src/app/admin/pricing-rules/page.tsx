'use client'

import { useMemo, useState } from 'react'
import { ActionMenu, CrudPage, Modal, SelectField, StatusBadge, TextInputField } from '@/components/admin'
import { pricingRulesMock } from '@/mock/adminModules'

interface PricingRuleItem {
  id: string
  name: string
  basePrice: number
  type: string
  value: number
  status: 'active' | 'draft'
}

interface PricingRuleFormState {
  name: string
  basePrice: string
  type: string
  value: string
  status: 'active' | 'draft'
}

const emptyForm = (): PricingRuleFormState => ({ name: '', basePrice: '', type: 'Weekend', value: '', status: 'draft' })

export default function PricingRulesPage() {
  const [rows, setRows] = useState<PricingRuleItem[]>(pricingRulesMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PricingRuleFormState>(emptyForm())

  const columns = [
    { key: 'name', label: 'Rule' },
    { key: 'basePrice', label: 'Base Price' },
    { key: 'type', label: 'Pricing Type' },
    { key: 'value', label: 'Adjustment' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    basePrice: `₹${item.basePrice}`,
    value: `${item.value}%`,
    status: <StatusBadge status={item.status === 'active' ? 'Active' : 'Draft'} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'Edit', onClick: () => handleEdit(item) },
          { label: 'Activate', onClick: () => handleStatus(item.id, 'active') },
          { label: 'Delete', onClick: () => handleDelete(item.id), danger: true },
        ]}
      />
    ),
  })), [rows])

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({ name: item.name, basePrice: String(item.basePrice), type: item.type, value: String(item.value), status: item.status })
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    setRows((current) => current.filter((item) => item.id !== id))
  }

  function handleStatus(id: string, status: 'active' | 'draft') {
    setRows((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  function handleSubmit() {
    if (!form.name) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, name: form.name, basePrice: Number(form.basePrice), type: form.type, value: Number(form.value), status: form.status } : item))
    } else {
      setRows((current) => [{ id: `pr-${Date.now()}`, name: form.name, basePrice: Number(form.basePrice), type: form.type, value: Number(form.value), status: form.status }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Pricing Rules"
        description="Manage dynamic pricing and condition-based pricing rules."
        columns={columns}
        rows={tableRows}
        createLabel="Create Rule"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search pricing rules"
        filters={[{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Pricing Rule' : 'Create Pricing Rule'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Rule Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} placeholder="Weekend Premium" />
          <TextInputField label="Base Price" value={form.basePrice} onChange={(value) => setForm((current) => ({ ...current, basePrice: value }))} placeholder="250" />
          <SelectField label="Pricing Type" value={form.type} onChange={(value) => setForm((current) => ({ ...current, type: value }))} options={[{ label: 'Weekend', value: 'Weekend' }, { label: 'Holiday', value: 'Holiday' }, { label: 'Premium Seat', value: 'Premium Seat' }]} />
          <TextInputField label="Adjustment" value={form.value} onChange={(value) => setForm((current) => ({ ...current, value: value }))} placeholder="20" />
          <div className="md:col-span-2">
            <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as PricingRuleFormState['status'] }))} options={[{ label: 'Draft', value: 'draft' }, { label: 'Active', value: 'active' }]} />
          </div>
        </div>
      </Modal>
    </>
  )
}
