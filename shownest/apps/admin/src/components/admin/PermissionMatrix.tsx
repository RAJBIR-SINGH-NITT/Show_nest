'use client'

import { useState } from 'react'

interface PermissionMatrixProps {
  roleName: string
  description: string
  permissions: Record<string, string[]>
}

const categories = ['Movies', 'Events', 'Artists', 'Venues', 'Operators', 'Bookings', 'Refunds', 'Pricing', 'Promotions', 'Reports', 'Audit Logs', 'Feature Flags', 'Support', 'Gate Check-in']
const operations = ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage']

const permissionMap: Record<string, string[]> = {
  Movies: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage'],
  Events: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage'],
  Artists: ['View', 'Create', 'Edit', 'Delete', 'Manage'],
  Venues: ['View', 'Create', 'Edit', 'Delete', 'Manage'],
  Operators: ['View', 'Create', 'Edit', 'Delete', 'Manage'],
  Bookings: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage'],
  Refunds: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage'],
  Pricing: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage'],
  Promotions: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage'],
  Reports: ['View', 'Create', 'Edit', 'Delete', 'Export', 'Manage'],
  'Audit Logs': ['View', 'Export', 'Manage'],
  'Feature Flags': ['View', 'Create', 'Edit', 'Delete', 'Manage'],
  Support: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage'],
  'Gate Check-in': ['View', 'Manage'],
}

export function PermissionMatrix({ roleName, description, permissions }: PermissionMatrixProps) {
  const [localPermissions, setLocalPermissions] = useState(permissions)

  return (
    <div className="space-y-4 rounded-2xl border border-[#e5bdbe] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-[#281718]">{roleName}</p>
          <p className="mt-1 text-sm text-[#5c3f41]">{description}</p>
        </div>
        <span className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ba0036]">Matrix</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#e5bdbe] text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#5c3f41]">Category</th>
              {operations.map((operation) => (
                <th key={operation} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#5c3f41]">{operation}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5bdbe]">
            {categories.map((category) => {
              const allowed = localPermissions[category] || []
              return (
                <tr key={category} className="hover:bg-[#fff8f7]">
                  <td className="px-3 py-2 font-medium text-[#281718]">{category}</td>
                  {operations.map((operation) => {
                    const available = permissionMap[category]?.includes(operation)
                    const active = allowed.includes(operation.toLowerCase()) || allowed.includes(operation)
                    return (
                      <td key={`${category}-${operation}`} className="px-3 py-2">
                        {available ? (
                          <button
                            type="button"
                            onClick={() => setLocalPermissions((current) => {
                              const next = { ...current }
                              const currentList = next[category] || []
                              const normalized = operation.toLowerCase()
                              next[category] = currentList.includes(normalized) ? currentList.filter((item) => item !== normalized) : [...currentList, normalized]
                              return next
                            })}
                            className={`h-3 w-3 rounded-full border ${active ? 'border-[#ba0036] bg-[#ba0036]' : 'border-[#e5bdbe] bg-white'}`}
                            aria-label={`${category} ${operation}`}
                          />
                        ) : (
                          <span className="text-xs text-[#906f70]">—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
