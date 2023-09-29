import { NextResponse } from 'next/server'
import { getUserByClerkId } from '../../../util/auth'
import { prisma } from '../../../util/db'
import { revalidatePath } from 'next/cache'
import { analyze } from '@/util/ai'

export async function POST() {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day',
    },
  })

  const analysis = await analyze(entry.content)
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
