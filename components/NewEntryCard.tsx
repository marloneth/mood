'use client'

import { useRouter } from 'next/navigation'
import { createNewEntry } from '../util/api'

export default function NewEntryCard() {
  const router = useRouter()

  async function handleOnClick() {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}
