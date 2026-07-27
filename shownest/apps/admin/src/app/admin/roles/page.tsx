'use client'

import { useMemo, useState } from 'react'
import { CrudPage, Modal, PermissionMatrix, RoleCard, SelectField, StatusBadge, TextInputField } from '@/components/admin'
import { getRoles } from '@/services/admin/governanceService'

interface RoleFormState {
  name: string
  description: string
  status: 'active' | 'inactive' | 'draft'
  usersCount: string
  createdAt: string
}

const emptyForm = (): RoleFormState => ({ name: '', description: '', status: 'draft', usersCount: '0', createdAt: '' })

export default function RolesPage() {
  const initialRows = useMemo(() => getRoles(), [])
  const [rows, setRows] = useState(initialRows)
  const [modalOpen, setModalOpen] = useState(false)
  const [detailId, setDetailId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<RoleFormState>(emptyForm())

  const columns = [
    { key: 'name', label: 'Role' },
    { key: 'description', label: 'Description' },
    { key: 'usersCount', label: 'Assigned Users' },
    { key: 'createdAt', label: 'Created' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    usersCount: String(item.usersCount),
    createdAt: item.createdAt,
    status: <StatusBadge status={item.status === 'active' ? 'Active' : item.status === 'inactive' ? 'Inactive' : 'Draft'} />,
    actions: (
      <div className="flex gap-2">
        <button onClick={() => handleOpenDetail(item.id)} className="rounded-full border border-[#e5bdbe] px-3 py-1.5 text-sm text-[#5c3f41]">Details</button>
        <button onClick={() => handleEdit(item)} className="rounded-full border border-[#e5bdbe] px-3 py-1.5 text-sm text-[#5c3f41]">Edit</button>
      </div>
    ),
  })), [rows])

  function handleOpenDetail(id: string) {
    setDetailId(id)
  }

  function handleEdit(item: (typeof rows)[number]) {
    setEditingId(item.id)
    setForm({ name: item.name, description: item.description, status: item.status, usersCount: String(item.usersCount), createdAt: item.createdAt })
    setModalOpen(true)
  }

  function handleSubmit() {
    if (!form.name) return
    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, name: form.name, description: form.description, status: form.status, usersCount: Number(form.usersCount), createdAt: form.createdAt } : item))
    } else {
      setRows((current) => [{ id: `role-${Date.now()}`, name: form.name, description: form.description, status: form.status, usersCount: Number(form.usersCount), createdAt: form.createdAt || new Date().toISOString().slice(0, 10), permissions: {} }, ...current])
    }
    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  const selectedRole = rows.find((role) => role.id === detailId)

  return (
    <div className="space-y-6">
      <CrudPage
        title="Roles & Permissions"
        description="Manage role lifecycles, assignments, and governance controls."
        columns={columns}
        rows={tableRows}
        createLabel="Create Role"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search roles"
        filters={[{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }, { label: 'Inactive', value: 'inactive' }]}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {rows.map((role) => (
          <RoleCard key={role.id} name={role.name} description={role.description} status={role.status} usersCount={role.usersCount} createdAt={role.createdAt} onOpen={() => handleOpenDetail(role.id)} />
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Role' : 'Create Role'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Role Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} placeholder="Operations Lead" />
          <TextInputField label="Assigned Users" value={form.usersCount} onChange={(value) => setForm((current) => ({ ...current, usersCount: value }))} placeholder="8" />
          <TextInputField label="Created At" value={form.createdAt} onChange={(value) => setForm((current) => ({ ...current, createdAt: value }))} placeholder="2026-01-10" />
          <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as RoleFormState['status'] }))} options={[{ label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }, { label: 'Inactive', value: 'inactive' }]} />
          <div className="md:col-span-2">
            <TextInputField label="Description" value={form.description} onChange={(value) => setForm((current) => ({ ...current, description: value }))} placeholder="Role description" />
          </div>
        </div>
      </Modal>

      {selectedRole ? (
        <div className="rounded-3xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
          <PermissionMatrix roleName={selectedRole.name} description={selectedRole.description} permissions={selectedRole.permissions} />
        </div>
      ) : null}
    </div>
  )
}
