'use client'

import { useMemo, useState } from 'react'
import { ActionMenu, CrudPage, DetailSection, EnvironmentBadge, Modal, StatusBadge, TextInputField } from '@/components/admin'
import { getAuditLogs } from '@/services/admin/governanceService'

export default function AuditLogsPage() {
  const initialRows = useMemo(() => getAuditLogs(), [])
  const [rows, setRows] = useState(initialRows)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const columns = [
    { key: 'actionType', label: 'Action Type' },
    { key: 'actor', label: 'Actor' },
    { key: 'resource', label: 'Resource' },
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'environment', label: 'Environment' },
    { key: 'severity', label: 'Severity' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    actionType: item.actionType.toUpperCase(),
    environment: <EnvironmentBadge environment={item.environment} />,
    severity: <StatusBadge status={item.severity} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'View Details', onClick: () => setSelectedId(item.id) },
          { label: 'Export Entry', onClick: () => window.alert('Export placeholder') },
        ]}
      />
    ),
  })), [rows])

  const selectedLog = rows.find((item) => item.id === selectedId)

  return (
    <div className="space-y-6">
      <CrudPage
        title="Audit Logs"
        description="Review administrative, governance, and operational history with searchable audit records."
        columns={columns}
        rows={tableRows}
        searchPlaceholder="Search audit logs"
        filters={[{ label: 'All', value: 'all' }, { label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }]}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DetailSection title="Audit Timeline" description="Recent significant changes and actions.">
          <div className="space-y-3">
            {rows.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-2xl border border-[#e5bdbe] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#281718]">{item.actionType.toUpperCase()} · {item.resource}</p>
                    <p className="mt-1 text-sm text-[#5c3f41]">By {item.actor}</p>
                  </div>
                  <span className="text-sm text-[#906f70]">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection title="Advanced Audit Filters" description="Filter by actor, resource, environment, or severity.">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInputField label="Actor" value="" onChange={() => undefined} placeholder="Search actor" />
            <TextInputField label="Resource" value="" onChange={() => undefined} placeholder="Search resource" />
            <TextInputField label="IP Address" value="" onChange={() => undefined} placeholder="10.14.6.22" />
            <TextInputField label="Timestamp" value="" onChange={() => undefined} placeholder="2026-07-26" />
          </div>
        </DetailSection>
      </div>

      <Modal open={Boolean(selectedLog)} title="Audit Details" onClose={() => setSelectedId(null)} footer={<button onClick={() => setSelectedId(null)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Close</button>}>
        {selectedLog ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">
              <p className="font-semibold text-[#281718]">Action</p>
              <p className="mt-2">{selectedLog.actionType.toUpperCase()} · {selectedLog.resource}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">
                <p className="font-semibold text-[#281718]">Old Value</p>
                <p className="mt-2">{selectedLog.oldValue}</p>
              </div>
              <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">
                <p className="font-semibold text-[#281718]">New Value</p>
                <p className="mt-2">{selectedLog.newValue}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">
              <p className="font-semibold text-[#281718]">Details</p>
              <p className="mt-2">{selectedLog.details}</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
