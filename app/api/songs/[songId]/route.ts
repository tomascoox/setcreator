import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
    req: Request,
    { params }: { params: { songId: string } }
) {
    try {
        const { userId } = auth()
        const { songId } = params
        const values = await req.json()

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const song = await db.song.update({
            where: {
                id: songId,
                userId,
            },
            data: {
                ...values,
            },
        })

        return NextResponse.json(song)
    } catch (error) {
        console.log('[SONG_ID]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
