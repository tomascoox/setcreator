import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const { title, date, location } = await req.json()

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const gig = await db.gig.create({
            data: {
                userId,
                title,
                date: new Date(date),
                location,
            },
        })
        return NextResponse.json(gig)
    } catch (error) {
        console.log('[GIGS]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}