'use client'

import { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#281718]/60 p-4">
      <div className="w-full max-w-2xl rounded-[28px] border border-[#e5bdbe] bg-white p-6 shadow-[0_30px_70px_-30px_rgba(40,23,24,0.4)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[#281718]">{title}</h3>
            <p className="mt-1 text-sm text-[#5c3f41]">Edits stay local to this admin experience and use mock data only.</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-[#e5bdbe] px-3 py-1.5 text-sm text-[#5c3f41]">
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
        {footer ? <div className="mt-6 flex justify-end gap-3">{footer}</div> : null}
      </div>
    </div>
  )
}
