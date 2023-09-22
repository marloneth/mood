import { getUserByClerkId } from '@/util/auth'
import { prisma } from '@/util/db'

async function getEntries() {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

export default async function JournalPage() {
  const entries = await getEntries()
  return <div></div>
}
