'use client'

interface SupportNoteCardProps {
  author: string
  note: string
  status: string
  timestamp: string
  tag: string
}

export function SupportNoteCard({ author, note, status, timestamp, tag }: SupportNoteCardProps) {
  return (
    <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-[#281718]">{author}</p>
          <p className="mt-1 text-sm text-[#5c3f41]">{note}</p>
        </div>
        <span className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ba0036]">{tag}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-[#5c3f41]">
        <span>{status}</span>
        <span>{timestamp}</span>
      </div>
    </div>
  )
}
