import { NextResponse } from 'next/server'
import { getUserByClerkId } from '../../../../util/auth'
import { prisma } from '../../../../util/db'
import { analyze } from '@/util/ai'

interface Params {
  id: string
}

interface Props {
  params: Params
}

export async function PATCH(request: Request, { params }: Props) {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: { content },
    include: {
      analysis: true,
    },
  })

  const analysis = await analyze(updatedEntry.content)
  const updated = await prisma.analysis.upsert({
    where: { entryId: updatedEntry.id },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  })

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}
