import { prisma } from '@/util/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

async function createNewUser() {
  const user = (await currentUser())!
  const match = await prisma.user.findUnique({
    where: { clerkId: user.id },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

export default async function NewUser() {
  await createNewUser()
  return <div>...Loading</div>
}
