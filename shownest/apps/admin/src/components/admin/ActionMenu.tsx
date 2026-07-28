'use client'

import { useEffect, useRef, useState } from 'react'

interface ActionMenuProps {
  actions: Array<{ label: string; onClick: () => void; danger?: boolean }>
}

export function ActionMenu({ actions }: ActionMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="relative">
      <button onClick={() => setOpen((value) => !value)} className="rounded-full border border-[#e5bdbe] px-3 py-1.5 text-sm font-semibold text-[#5c3f41]">
        Actions
      </button>
      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-[#e5bdbe] bg-white p-2 shadow-[0_20px_40px_-15px_rgba(40,23,24,0.12)]">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                action.onClick()
                setOpen(false)
              }}
              className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm ${action.danger ? 'text-[#ba0036]' : 'text-[#281718]'}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
