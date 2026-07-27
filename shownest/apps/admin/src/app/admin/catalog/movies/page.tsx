'use client'

import { useMemo, useState } from 'react'
import {
  ActionMenu,
  AdminCard,
  CrudPage,
  Modal,
  SelectField,
  StatusBadge,
  TextInputField,
  TextareaField,
  ImageUploadPlaceholder,
} from '@/components/admin'
import { moviesMock } from '@/mock/adminModules'

interface MovieItem {
  id: string
  title: string
  genre: string
  language: string
  duration: string
  releaseDate: string
  certification: string
  status: 'draft' | 'published' | 'archived'
  poster: string
  description: string
}

interface MovieFormState {
  title: string
  genre: string
  language: string
  duration: string
  releaseDate: string
  certification: string
  description: string
  status: 'draft' | 'published' | 'archived'
}

const emptyForm = (): MovieFormState => ({
  title: '',
  genre: 'Adventure',
  language: 'English',
  duration: '',
  releaseDate: '',
  certification: 'UA',
  description: '',
  status: 'draft',
})

export default function MoviesPage() {
  const [rows, setRows] = useState<MovieItem[]>(moviesMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<MovieFormState>(emptyForm())

  const columns = [
    { key: 'title', label: 'Movie' },
    { key: 'genre', label: 'Genre' },
    { key: 'language', label: 'Language' },
    { key: 'duration', label: 'Duration' },
    { key: 'releaseDate', label: 'Release Date' },
    { key: 'certification', label: 'Certification' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const renderStatus = (status: string) => {
    switch (status) {
      case 'published':
        return 'Published'
      case 'archived':
        return 'Archived'
      default:
        return 'Draft'
    }
  }

  const tableRows = useMemo(() => rows.map((item) => ({
    ...item,
    status: <StatusBadge status={renderStatus(item.status)} />,
    actions: (
      <ActionMenu
        actions={[
          { label: 'Preview', onClick: () => setModalOpen(true) },
          { label: 'Edit', onClick: () => handleEdit(item) },
          { label: 'Publish', onClick: () => handleStatus(item.id, 'published') },
          { label: 'Archive', onClick: () => handleStatus(item.id, 'archived') },
          { label: 'Delete', onClick: () => handleDelete(item.id), danger: true },
        ]}
      />
    ),
  })), [rows])

  function handleEdit(item: typeof rows[number]) {
    setEditingId(item.id)
    setForm({
      title: item.title,
      genre: item.genre,
      language: item.language,
      duration: item.duration,
      releaseDate: item.releaseDate,
      certification: item.certification,
      description: item.description,
      status: item.status,
    })
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    setRows((current) => current.filter((item) => item.id !== id))
  }

  function handleStatus(id: string, status: 'draft' | 'published' | 'archived') {
    setRows((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  function handleSubmit() {
    if (!form.title) return

    if (editingId) {
      setRows((current) => current.map((item) => item.id === editingId ? { ...item, ...form, id: item.id } : item))
    } else {
      setRows((current) => [{ id: `mv-${Date.now()}`, poster: '/assets/heroes/hero.jpg', ...form }, ...current])
    }

    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  return (
    <>
      <CrudPage
        title="Movies Management"
        description="Create, preview, publish, and archive cinematic assets with a reusable admin workflow."
        columns={columns}
        rows={tableRows}
        createLabel="Create Movie"
        onCreate={() => {
          setEditingId(null)
          setForm(emptyForm())
          setModalOpen(true)
        }}
        searchPlaceholder="Search movies"
        filters={[{ label: 'All', value: 'all' }, { label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }, { label: 'Archived', value: 'archived' }]}
      />

      <Modal open={modalOpen} title={editingId ? 'Edit Movie' : 'Create Movie'} onClose={() => setModalOpen(false)} footer={(
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-full border border-[#e5bdbe] px-4 py-2 text-sm text-[#5c3f41]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-full bg-[#ba0036] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </>
      )}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInputField label="Movie Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} placeholder="Enter title" />
          <SelectField label="Genre" value={form.genre} onChange={(value) => setForm((current) => ({ ...current, genre: value }))} options={[{ label: 'Adventure', value: 'Adventure' }, { label: 'Sci-Fi', value: 'Sci-Fi' }, { label: 'Drama', value: 'Drama' }]} />
          <SelectField label="Language" value={form.language} onChange={(value) => setForm((current) => ({ ...current, language: value }))} options={[{ label: 'English', value: 'English' }, { label: 'Hindi', value: 'Hindi' }, { label: 'Tamil', value: 'Tamil' }]} />
          <TextInputField label="Duration" value={form.duration} onChange={(value) => setForm((current) => ({ ...current, duration: value }))} placeholder="142 mins" />
          <TextInputField label="Release Date" type="date" value={form.releaseDate} onChange={(value) => setForm((current) => ({ ...current, releaseDate: value }))} />
          <SelectField label="Certification" value={form.certification} onChange={(value) => setForm((current) => ({ ...current, certification: value }))} options={[{ label: 'UA', value: 'UA' }, { label: 'A', value: 'A' }, { label: 'U', value: 'U' }]} />
          <div className="md:col-span-2">
            <TextareaField label="Description" value={form.description} onChange={(value) => setForm((current) => ({ ...current, description: value }))} placeholder="Add synopsis" />
          </div>
          <div className="md:col-span-2">
            <ImageUploadPlaceholder label="Poster preview" />
          </div>
          <div className="md:col-span-2">
            <SelectField label="Publish Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as MovieFormState['status'] }))} options={[{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }, { label: 'Archived', value: 'archived' }]} />
          </div>
        </div>
      </Modal>
    </>
  )
}
