import { Heading } from '@/components/heading'
import { CalendarDays } from 'lucide-react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

const GigsPage = async () => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/')
    }

    const gigs = await db.gig.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div>
            <Heading
                title="Gigs"
                description="Handle all your gigs here."
                icon={CalendarDays}
                iconColor="text-green-500"
                bgColor="text-green-500/10"
            />
            <DataTable
                columns={columns}
                data={gigs}
            />
        </div>
    )
}

export default GigsPage