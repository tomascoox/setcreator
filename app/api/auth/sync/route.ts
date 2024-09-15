import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const updatedUser = await prisma.user.upsert({
      where: { id: userId },
      update: {
        name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username,
        email: user.emailAddresses[0]?.emailAddress,
        image: user.imageUrl,
      },
      create: {
        id: userId,
        name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username,
        email: user.emailAddresses[0]?.emailAddress,
        image: user.imageUrl,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}