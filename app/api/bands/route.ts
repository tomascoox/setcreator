import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export async function GET() {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const bands = await prisma.band.findMany({
            where: {
                members: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                members: true
            }
        })

        return NextResponse.json(bands)
    } catch (error) {
        console.error('[BANDS_GET]', error)
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: (error as Error).message }), { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const { name } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const band = await prisma.band.create({
            data: {
                name,
                members: {
                    create: {
                        userId,
                        role: 'admin'
                    }
                }
            },
            include: {
                members: true
            }
        })

        return NextResponse.json(band)
    } catch (error) {
        console.error('[BANDS_POST]', error)
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: (error as Error).message }), { status: 500 })
    }
}