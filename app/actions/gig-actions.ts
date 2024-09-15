import { prisma } from "@/lib/prisma"

export async function addCollaborator(gigId: string, email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error("User not found")
  }

  await prisma.collaboration.create({
    data: {
      user: { connect: { id: user.id } },
      gig: { connect: { id: gigId } },
    },
  })

  await prisma.gig.update({
    where: { id: gigId },
    data: { isCollaborative: true },
  })
}