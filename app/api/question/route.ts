import { getUserByClerkId } from '../../../util/auth'
import { prisma } from '../../../util/db'
import { qa } from '../../../util/ai'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { question } = await req.json()
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)
  return NextResponse.json({ data: answer })
}
