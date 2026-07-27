import { ReactNode } from 'react'

interface InformationCardProps {
  title: string
  value: ReactNode
  caption?: string
}

export function InformationCard({ title, value, caption }: InformationCardProps) {
  return (
    <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
      <p className="text-sm text-[#5c3f41]">{title}</p>
      <p className="mt-2 text-base font-semibold text-[#281718]">{value}</p>
      {caption ? <p className="mt-1 text-sm text-[#906f70]">{caption}</p> : null}
    </div>
  )
}
