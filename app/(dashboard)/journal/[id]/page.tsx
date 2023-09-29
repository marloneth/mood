import React from 'react'
import Editor from '../../../../components/Editor'
import { getUserByClerkId } from '../../../../util/auth'
import { prisma } from '../../../../util/db'
import { Analysis, JournalEntry } from '@prisma/client'

interface Params {
  id: string
}

interface Props {
  params: Params
}

async function getEntry(id: string) {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry as JournalEntry & { analysis: Analysis }
}

export default async function EntryPage({ params }: Props) {
  const entry = await getEntry(params.id)

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}
