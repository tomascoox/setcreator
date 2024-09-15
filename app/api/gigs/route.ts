import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export async function GET() {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const gigs = await prisma.gig.findMany({
            where: {
                userId: userId
            }
        })

        return NextResponse.json(gigs)
    } catch (error) {
        console.log('[GIGS_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const { title, date, venue } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!title || !date || !venue) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const gig = await prisma.gig.create({
            data: {
                title,
                date: new Date(date),
                venue,
                userId
            }
        })

        return NextResponse.json(gig)
    } catch (error) {
        console.log('[GIGS_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// Keep the existing POST method