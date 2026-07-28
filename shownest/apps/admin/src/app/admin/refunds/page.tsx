'use client'

import { useMemo, useState } from 'react'
import { ActionMenu, CrudPage, Modal, SelectField, StatusBadge, TextInputField } from '@/components/admin'
import { getRefunds, type RefundRow } from '@/services/admin/operationalService'

interface RefundFormState {
  customer: string
  reason: string
  requestedAmount: string
  approvedAmount: string
  paymentMethod: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  reviewer: string
}

const emptyForm = (): RefundFormState => ({ customer: '', reason: '', requestedAmount: '', approvedAmount: '', paymentMethod: 'Card', status: 'pending', reviewer: '' })

export default function RefundsPage() {
  const initialRows = useMemo(() => getRefunds(), [])
  const [rows, setRows] = useState<RefundRow[]>(initialRows)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<RefundFormState>(emptyForm())

  const columns = [
    { key: 'bookingId', label: 'Booking ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'reason', label: 'Reason' },
    { key: 'requestedAmount', label: 'Requested Amount' },
    { key: 'approvedAmount', label: 'Approved Amount' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    requestedAmount: `₹${item.requestedAmount}`,
    approvedAmount: `₹${item.approvedAmount}`,
    status: <StatusBadge status={item.status === 'approved' ? 'Approved' : item.status === 'rejected' ? 'Rejected' : item.status === 'completed' ? 'Completed' : 'Pending'} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'View Refund', onClick: () => window.location.assign(`/admin/refunds/${item.id}/approve`) },
          { label: 'Edit Refund', onClick: () => handleEdit(item) },
          { label: 'Approve', onClick: () => handleStatus(item.id, 'approved') },
          { label: 'Reject', onClick: () => handleStatus(item.id, 'rejected') },
        ]}
      />
    ),
  })), [rows])

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({ customer: item.customer, reason: item.reason, requestedAmount: String(item.requestedAmount), approvedAmount: String(item.approvedAmount), paymentMethod: item.paymentMethod, status: item.status, reviewer: item.reviewer })
    setModalOpen(true)
  }

  function handleStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'completed') {
    setRows((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  function handleSubmit() {
    if (!form.customer) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, customer: form.customer, reason: form.reason, requestedAmount: Number(form.requestedAmount), approvedAmount: Number(form.approvedAmount), paymentMethod: form.paymentMethod, status: form.status, reviewer: form.reviewer } : item))
    } else {
      setRows((current) => [{ id: `rf-${Date.now()}`, bookingId: 'bk-000', customer: form.customer, reason: form.reason, requestedAmount: Number(form.requestedAmount), approvedAmount: Number(form.approvedAmount), paymentMethod: form.paymentMethod, requestDate: new Date().toISOString().slice(0, 10), status: form.status, reviewer: form.reviewer }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Refund Management"
        description="Review refund requests, approvals, payment methods, and reviewer queues."
        columns={columns}
        rows={tableRows}
        createLabel="Create Refund"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search refunds"
        filters={[{ label: 'All', value: 'all' }, { label: 'Pending', value: 'pending' }, { label: 'Approved', value: 'approved' }, { label: 'Rejected', value: 'rejected' }, { label: 'Completed', value: 'completed' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Refund' : 'Create Refund'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Customer" value={form.customer} onChange={(value) => setForm((current) => ({ ...current, customer: value }))} placeholder="Customer name" />
          <TextInputField label="Reason" value={form.reason} onChange={(value) => setForm((current) => ({ ...current, reason: value }))} placeholder="Reason" />
          <TextInputField label="Requested Amount" value={form.requestedAmount} onChange={(value) => setForm((current) => ({ ...current, requestedAmount: value }))} placeholder="1500" />
          <TextInputField label="Approved Amount" value={form.approvedAmount} onChange={(value) => setForm((current) => ({ ...current, approvedAmount: value }))} placeholder="1500" />
          <TextInputField label="Payment Method" value={form.paymentMethod} onChange={(value) => setForm((current) => ({ ...current, paymentMethod: value }))} placeholder="Card" />
          <TextInputField label="Reviewer" value={form.reviewer} onChange={(value) => setForm((current) => ({ ...current, reviewer: value }))} placeholder="Reviewer" />
          <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as RefundFormState['status'] }))} options={[{ label: 'Pending', value: 'pending' }, { label: 'Approved', value: 'approved' }, { label: 'Rejected', value: 'rejected' }, { label: 'Completed', value: 'completed' }]} />
        </div>
      </Modal>
    </>
  )
}
