import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function POST(
    req: Request,
    { params }: { params: { bandId: string } }
) {
    try {
        const { userId } = auth()
        const { email } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const band = await prisma.band.findUnique({
            where: { id: params.bandId },
            include: { members: true },
        })

        if (!band) {
            return new NextResponse("Band not found", { status: 404 })
        }

        const isAdmin = band.members.some(member => member.userId === userId && member.role === 'admin')

        if (!isAdmin) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const invitedUser = await prisma.user.findUnique({
            where: { email },
        })

        if (!invitedUser) {
            return new NextResponse("User not found", { status: 404 })
        }

        const newMember = await prisma.bandMember.create({
            data: {
                userId: invitedUser.id,
                bandId: band.id,
                role: 'member',
            },
        })

        return NextResponse.json(newMember)
    } catch (error) {
        console.error('[BAND_MEMBER_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}