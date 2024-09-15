import { prisma } from "@/lib/prisma"
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SongForm } from './_components/song-form'

const SongIdPage = async ({
    params,
}: {
    params: { songId: string }
}) => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/')
    }

    const song = await prisma.song.findUnique({
        where: {
            id: params.songId,
        },
    })

    if (!song) {
        return redirect('/songs')
    }

    return (
        <div className="p-6">
            <Link
                href="/songs"
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to songs
            </Link>

            <h1 className="text-2xl font-medium mb-6">
                Song setup
            </h1>

            <SongForm
                initialData={song}
                songId={song.id}
            />
        </div>
    )
}

export default SongIdPage
