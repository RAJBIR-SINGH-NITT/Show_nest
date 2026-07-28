'use client'

import { useMemo, useState } from 'react'
import { CrudPage, FeatureFlagCard, Modal, SelectField, TextInputField } from '@/components/admin'
import { getFeatureFlags } from '@/services/admin/governanceService'

interface FlagFormState {
  name: string
  description: string
  environment: 'Production' | 'Staging' | 'Development'
  owner: string
  status: 'enabled' | 'disabled' | 'scheduled'
  category: string
}

const emptyForm = (): FlagFormState => ({ name: '', description: '', environment: 'Development', owner: '', status: 'disabled', category: '' })

export default function FeatureFlagsPage() {
  const initialRows = useMemo(() => getFeatureFlags(), [])
  const [rows, setRows] = useState(initialRows)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FlagFormState>(emptyForm())
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const columns = [
    { key: 'name', label: 'Flag' },
    { key: 'environment', label: 'Environment' },
    { key: 'owner', label: 'Owner' },
    { key: 'status', label: 'Status' },
    { key: 'category', label: 'Category' },
    { key: 'lastUpdated', label: 'Last Updated' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    environment: item.environment,
    status: item.status,
  })), [rows])

  function handleEdit(flag: (typeof rows)[number]) {
    setEditingId(flag.id)
    setForm({ name: flag.name, description: flag.description, environment: flag.environment, owner: flag.owner, status: flag.status, category: flag.category })
    setModalOpen(true)
  }

  function handleSubmit() {
    if (!form.name) return
    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, name: form.name, description: form.description, environment: form.environment, owner: form.owner, status: form.status, category: form.category, lastUpdated: new Date().toISOString().slice(0, 10) } : item))
    } else {
      setRows((current) => [{ id: `ff-${Date.now()}`, name: form.name, description: form.description, environment: form.environment, owner: form.owner, status: form.status, category: form.category, lastUpdated: new Date().toISOString().slice(0, 10) }, ...current])
    }
    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Feature Flags"
        description="Manage environment-specific rollouts, owners, and activation states."
        columns={columns}
        rows={tableRows}
        createLabel="Create Flag"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search feature flags"
        filters={[{ label: 'All', value: 'all' }, { label: 'Enabled', value: 'enabled' }, { label: 'Disabled', value: 'disabled' }, { label: 'Scheduled', value: 'scheduled' }]}
      />

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {rows.map((flag) => (
          <FeatureFlagCard
            key={flag.id}
            name={flag.name}
            description={flag.description}
            environment={flag.environment}
            owner={flag.owner}
            status={flag.status}
            lastUpdated={flag.lastUpdated}
            category={flag.category}
            onToggle={() => setConfirmId(flag.id)}
          />
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Feature Flag' : 'Create Feature Flag'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Flag Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} placeholder="Early Access Checkout" />
          <TextInputField label="Owner" value={form.owner} onChange={(value) => setForm((current) => ({ ...current, owner: value }))} placeholder="Asha Mehta" />
          <TextInputField label="Category" value={form.category} onChange={(value) => setForm((current) => ({ ...current, category: value }))} placeholder="Payments" />
          <SelectField label="Environment" value={form.environment} onChange={(value) => setForm((current) => ({ ...current, environment: value as FlagFormState['environment'] }))} options={[{ label: 'Production', value: 'Production' }, { label: 'Staging', value: 'Staging' }, { label: 'Development', value: 'Development' }]} />
          <SelectField label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as FlagFormState['status'] }))} options={[{ label: 'Enabled', value: 'enabled' }, { label: 'Disabled', value: 'disabled' }, { label: 'Scheduled', value: 'scheduled' }]} />
          <div className="md:col-span-2">
            <TextInputField label="Description" value={form.description} onChange={(value) => setForm((current) => ({ ...current, description: value }))} placeholder="Feature description" />
          </div>
        </div>
      </Modal>

      <Modal open={Boolean(confirmId)} title="Confirm Toggle" onClose={() => setConfirmId(null)} footer={(
        <>
          <button onClick={() => setConfirmId(null)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={() => {
            setRows((current) => current.map((item) => item.id === confirmId ? { ...item, status: item.status === 'enabled' ? 'disabled' : 'enabled' } : item))
            setConfirmId(null)
          }} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Confirm</button>
        </>
      )}>
        <p className="text-sm text-[#5c3f41]">Toggle the selected feature flag between enabled and disabled states.</p>
      </Modal>
    </>
  )
}
