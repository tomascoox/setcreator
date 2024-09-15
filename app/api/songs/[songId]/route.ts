import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export async function PATCH(
    req: Request,
    { params }: { params: { songId: string } }
) {
    try {
        const { userId } = auth()
        const { title, artist, duration, lyrics } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const song = await prisma.song.findUnique({
            where: {
                id: params.songId,
            },
        })

        if (!song) {
            return new NextResponse("Song not found", { status: 404 })
        }

        const updatedSong = await prisma.song.update({
            where: {
                id: params.songId,
            },
            data: {
                title,
                artist,
                duration: duration !== null ? parseInt(duration, 10) : null,
                lyrics,
            },
        })

        return NextResponse.json(updatedSong)
    } catch (error) {
        console.error('[SONG_PATCH]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
