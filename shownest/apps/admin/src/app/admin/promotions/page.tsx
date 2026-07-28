'use client'

import { useMemo, useState } from 'react'
import { ActionMenu, CrudPage, Modal, SelectField, StatusBadge, TextInputField } from '@/components/admin'
import { promotionsMock } from '@/mock/adminModules'

interface PromotionItem {
  id: string
  code: string
  title: string
  discountType: 'percentage' | 'flat'
  value: number
  validity: string
  usageLimit: number
  currentUsage: number
  status: 'active' | 'draft'
}

interface PromotionFormState {
  code: string
  title: string
  discountType: 'percentage' | 'flat'
  value: string
  validity: string
  usageLimit: string
  status: 'active' | 'draft'
}

const emptyForm = (): PromotionFormState => ({ code: '', title: '', discountType: 'percentage', value: '', validity: '', usageLimit: '', status: 'draft' })

export default function PromotionsPage() {
  const [rows, setRows] = useState<PromotionItem[]>(promotionsMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PromotionFormState>(emptyForm())

  const columns = [
    { key: 'code', label: 'Coupon Code' },
    { key: 'title', label: 'Promotion' },
    { key: 'discountType', label: 'Discount Type' },
    { key: 'value', label: 'Value' },
    { key: 'validity', label: 'Validity' },
    { key: 'currentUsage', label: 'Current Usage' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    discountType: item.discountType === 'percentage' ? 'Percentage' : 'Flat',
    value: item.discountType === 'percentage' ? `${item.value}%` : `₹${item.value}`,
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
    setForm({ code: item.code, title: item.title, discountType: item.discountType, value: String(item.value), validity: item.validity, usageLimit: String(item.usageLimit), status: item.status })
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    setRows((current) => current.filter((item) => item.id !== id))
  }

  function handleStatus(id: string, status: 'active' | 'draft') {
    setRows((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  function handleSubmit() {
    if (!form.code) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, code: form.code, title: form.title, discountType: form.discountType, value: Number(form.value), validity: form.validity, usageLimit: Number(form.usageLimit), status: form.status } : item))
    } else {
      setRows((current) => [{ id: `pm-${Date.now()}`, code: form.code, title: form.title, discountType: form.discountType, value: Number(form.value), validity: form.validity, usageLimit: Number(form.usageLimit), currentUsage: 0, status: form.status }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Promotions"
        description="Create and manage promotional offers, coupons, and activation status."
        columns={columns}
        rows={tableRows}
        createLabel="Create Promotion"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search promotions"
        filters={[{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Promotion' : 'Create Promotion'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Coupon Code" value={form.code} onChange={(value) => setForm((current) => ({ ...current, code: value }))} placeholder="SUMMER20" />
          <TextInputField label="Promotion Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} placeholder="Summer Launch" />
          <SelectField label="Discount Type" value={form.discountType} onChange={(value) => setForm((current) => ({ ...current, discountType: value as PromotionFormState['discountType'] }))} options={[{ label: 'Percentage', value: 'percentage' }, { label: 'Flat', value: 'flat' }]} />
          <TextInputField label="Value" value={form.value} onChange={(value) => setForm((current) => ({ ...current, value: value }))} placeholder="20" />
          <TextInputField label="Validity" type="date" value={form.validity} onChange={(value) => setForm((current) => ({ ...current, validity: value }))} />
          <TextInputField label="Usage Limit" value={form.usageLimit} onChange={(value) => setForm((current) => ({ ...current, usageLimit: value }))} placeholder="500" />
          <div className="md:col-span-2">
            <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as PromotionFormState['status'] }))} options={[{ label: 'Draft', value: 'draft' }, { label: 'Active', value: 'active' }]} />
          </div>
        </div>
      </Modal>
    </>
  )
}
