import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
    req: Request,
    { params }: { params: { setlistId: string } }
) {
    try {
        const { userId } = auth()
        const { setlistId } = params
        const values = await req.json()

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const setlist = await db.setlist.update({
            where: {
                id: setlistId,
                userId,
            },
            data: {
                ...values,
            },
        })

        return NextResponse.json(setlist)
    } catch (error) {
        console.log('[SETLIST_ID]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
