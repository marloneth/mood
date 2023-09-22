import { auth } from "@clerk/nextjs"
import { prisma } from "./db"
import { User } from "@prisma/client"

export async function getUserByClerkId() {
  const { userId } = await auth()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId!
    }
  })

  return user
}