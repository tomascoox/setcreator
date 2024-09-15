import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { Band } from '@prisma/client'
import { prisma } from '@/lib/prisma' // Add this line

export async function PATCH(
    req: Request,
    { params }: { params: { bandId: string } }
) {
    try {
        const { userId } = auth()
        const { name } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const band = await prisma.band.findUnique({
            where: {
                id: params.bandId,
            },
            include: {
                members: true,
            },
        })

        if (!band) {
            return new NextResponse("Band not found", { status: 404 })
        }

        const isMember = band.members.some(member => member.userId === userId)

        if (!isMember) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const updatedBand = await prisma.band.update({
            where: {
                id: params.bandId,
            },
            data: {
                name,
            },
        })

        return NextResponse.json(updatedBand)
    } catch (error) {
        console.error('[BAND_PATCH]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}