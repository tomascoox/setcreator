import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const { title, artist } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!title || !artist) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const song = await prisma.song.create({
            data: {
                title,
                artist,
                userId
            }
        })

        return NextResponse.json(song)
    } catch (error) {
        console.log('[SONGS_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET() {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const songs = await prisma.song.findMany({
            where: {
                userId: userId
            }
        })

        return NextResponse.json(songs)
    } catch (error) {
        console.log('[SONGS_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
