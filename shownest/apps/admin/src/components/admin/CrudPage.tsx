'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'
import { AdminCard, DataTable, EmptyState, LoadingSkeleton, PageHeader } from '@/components/admin'

interface CrudPageProps {
  title: string
  description: string
  columns: Array<{ key: string; label: string }>
  rows: Array<Record<string, string | number | ReactNode>>
  createLabel?: string
  onCreate?: () => void
  searchPlaceholder?: string
  filters?: Array<{ label: string; value: string }>
  activeFilter?: string
  onFilterChange?: (value: string) => void
  formContent?: ReactNode
  emptyTitle?: string
  emptyDescription?: string
}

export function CrudPage({
  title,
  description,
  columns,
  rows,
  createLabel = 'Create',
  onCreate,
  searchPlaceholder = 'Search',
  filters,
  activeFilter,
  onFilterChange,
  formContent,
  emptyTitle = 'No records found',
  emptyDescription = 'Try a different search or add a new entry.',
}: CrudPageProps) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 6

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 220)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return rows

    return rows.filter((row) => {
      return Object.values(row).some((value) => String(value).toLowerCase().includes(normalized))
    })
  }, [query, rows])

  const pageRows = filteredRows.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))

  useEffect(() => {
    setPage(1)
  }, [query])

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        action={onCreate ? <button onClick={onCreate} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">{createLabel}</button> : undefined}
      />

      <AdminCard title="Operations" description="Search, filter, and manage entries from a unified admin workspace.">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-4 py-2 text-sm outline-none lg:max-w-sm"
            />
            {filters ? (
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => onFilterChange?.(filter.value)}
                    className={`rounded-full border px-3 py-2 text-sm ${activeFilter === filter.value ? 'border-[#ba0036] bg-[#ffe9e9] text-[#ba0036]' : 'border-[#e5bdbe] bg-white text-[#5c3f41]'}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {loading ? <LoadingSkeleton /> : null}
          {!loading && filteredRows.length === 0 ? (
            <EmptyState title={emptyTitle} description={emptyDescription} />
          ) : null}
          {!loading && filteredRows.length > 0 ? (
            <>
              <DataTable columns={columns} rows={pageRows} />
              <div className="flex items-center justify-between gap-3 text-sm text-[#5c3f41]">
                <span>Showing {pageRows.length} of {filteredRows.length}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-full border border-[#e5bdbe] px-3 py-1.5 disabled:opacity-50">
                    Previous
                  </button>
                  <span>{page}/{totalPages}</span>
                  <button onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded-full border border-[#e5bdbe] px-3 py-1.5 disabled:opacity-50">
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </AdminCard>

      {formContent ? <div>{formContent}</div> : null}
    </div>
  )
}
