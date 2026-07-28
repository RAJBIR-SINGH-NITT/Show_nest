'use client'

import { useMemo, useState } from 'react'
import { ActionMenu, CrudPage, Modal, SelectField, StatusBadge, TextInputField, UserProfileCard } from '@/components/admin'
import { getUsers, type UserRow } from '@/services/admin/operationalService'

interface UserFormState {
  name: string
  email: string
  phone: string
  role: string
  status: 'active' | 'inactive' | 'locked'
  verification: 'verified' | 'pending'
}

const emptyForm = (): UserFormState => ({ name: '', email: '', phone: '', role: 'Customer', status: 'active', verification: 'verified' })

export default function UsersPage() {
  const initialRows = useMemo(() => getUsers(), [])
  const [rows, setRows] = useState<UserRow[]>(initialRows)
  const [modalOpen, setModalOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof rows[number] | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<UserFormState>(emptyForm())

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'verification', label: 'Verification' },
    { key: 'lastLogin', label: 'Last Login' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    status: <StatusBadge status={item.status === 'active' ? 'Active' : item.status === 'locked' ? 'Locked' : 'Inactive'} />,
    verification: <StatusBadge status={item.verification === 'verified' ? 'Verified' : 'Pending'} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'View User', onClick: () => handleView(item) },
          { label: 'Edit User', onClick: () => handleEdit(item) },
          { label: 'Deactivate', onClick: () => handleStatus(item.id, 'inactive') },
          { label: 'Activate', onClick: () => handleStatus(item.id, 'active') },
          { label: 'Lock Account', onClick: () => handleStatus(item.id, 'locked') },
        ]}
      />
    ),
  })), [rows])

  function handleView(item: typeof rows[number]) {
    setSelectedUser(item)
    setDetailOpen(true)
  }

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({ name: item.name, email: item.email, phone: item.phone, role: item.role, status: item.status, verification: item.verification })
    setModalOpen(true)
  }

  function handleStatus(id: string, status: 'active' | 'inactive' | 'locked') {
    setRows((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  function handleSubmit() {
    if (!form.name) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, name: form.name, email: form.email, phone: form.phone, role: form.role, status: form.status, verification: form.verification } : item))
    } else {
      setRows((current) => [{ id: `usr-${Date.now()}`, name: form.name, email: form.email, phone: form.phone, role: form.role, status: form.status, verification: form.verification, registrationDate: new Date().toISOString().slice(0, 10), lastLogin: 'Now' }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="User Management"
        description="Manage account state, roles, verification, and user lifecycles."
        columns={columns}
        rows={tableRows}
        createLabel="Create User"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search users"
        filters={[{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }, { label: 'Locked', value: 'locked' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit User' : 'Create User'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} placeholder="Customer name" />
          <TextInputField label="Email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} placeholder="name@example.com" />
          <TextInputField label="Phone" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} placeholder="Phone" />
          <TextInputField label="Role" value={form.role} onChange={(value) => setForm((current) => ({ ...current, role: value }))} placeholder="Customer" />
          <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as UserFormState['status'] }))} options={[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }, { label: 'Locked', value: 'locked' }]} />
          <SelectField label="Verification" value={form.verification} onChange={(value) => setForm((current) => ({ ...current, verification: value as UserFormState['verification'] }))} options={[{ label: 'Verified', value: 'verified' }, { label: 'Pending', value: 'pending' }]} />
        </div>
      </Modal>

      <Modal open={detailOpen} title="User Details" onClose={() => setDetailOpen(false)} footer={(
        <button onClick={() => setDetailOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Close</button>
      )}>
        {selectedUser ? (
          <div className="space-y-4">
            <UserProfileCard name={selectedUser.name} email={selectedUser.email} role={selectedUser.role} status={selectedUser.status} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">
                <p className="font-semibold text-[#281718]">Contact Information</p>
                <p className="mt-2">{selectedUser.phone}</p>
              </div>
              <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">
                <p className="font-semibold text-[#281718]">Registration Date</p>
                <p className="mt-2">{selectedUser.registrationDate}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">
              <p className="font-semibold text-[#281718]">Recent Activity Placeholder</p>
              <p className="mt-2">Booking history and refund history will appear here in a later phase.</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  )
}
