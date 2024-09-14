import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { gigId: string } }) {
    try {
        const { userId } = auth()
        const { gigId } = params
        const values = await req.json()

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const gig = await db.gig.update({
            where: {
                id: gigId,
                userId,
            },
            data: {
                ...values,
            },
        })

        return NextResponse.json(gig)
    } catch (error) {
        console.log('[GIG_ID]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}