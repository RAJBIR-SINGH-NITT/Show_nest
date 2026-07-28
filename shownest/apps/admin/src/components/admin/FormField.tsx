'use client'

import { ChangeEvent } from 'react'

interface TextInputFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}

export function TextInputField({ label, value, onChange, placeholder, type = 'text' }: TextInputFieldProps) {
  return (
    <label className="block text-sm text-[#281718]">
      <span className="mb-2 block font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 outline-none"
      />
    </label>
  )
}

interface SelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ label: string; value: string }>
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="block text-sm text-[#281718]">
      <span className="mb-2 block font-medium">{label}</span>
      <select
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

interface TextareaFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TextareaField({ label, value, onChange, placeholder }: TextareaFieldProps) {
  return (
    <label className="block text-sm text-[#281718]">
      <span className="mb-2 block font-medium">{label}</span>
      <textarea
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-[110px] w-full rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] px-3 py-2 outline-none"
      />
    </label>
  )
}

export function ImageUploadPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#e5bdbe] bg-[#fff8f7] p-4 text-sm text-[#5c3f41]">
      <p className="font-medium text-[#281718]">{label}</p>
      <p className="mt-2">Upload placeholder for imagery and asset previews.</p>
    </div>
  )
}
