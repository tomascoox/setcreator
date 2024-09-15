import { prisma } from "@/lib/prisma"

export async function addCollaborator(songId: string, email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error("User not found")
  }

  await prisma.collaboration.create({
    data: {
      user: { connect: { id: user.id } },
      song: { connect: { id: songId } },
    },
  })

  await prisma.song.update({
    where: { id: songId },
    data: { isCollaborative: true },
  })
}