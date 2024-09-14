import { Heading } from '@/components/heading'
import { AudioLines } from 'lucide-react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

const SongsPage = async () => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/')
    }

    const songs = await db.song.findMany({
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
                title="Songs"
                description="Handle all your songs here."
                icon={AudioLines}
                iconColor="text-violet-500"
                bgColor="text-violet-500/10"
            />
            <DataTable
                columns={columns}
                data={songs}
            />
        </div>
    )
}

export default SongsPage
