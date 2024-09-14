import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { TitleForm } from './_components/title-form'
import { ArtistForm } from './_components/artist-form'
import { NotesForm } from './_components/notes-form'
import { DurationForm } from './_components/duration-form'
import { LyricsForm } from './_components/lyrics-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const SongIdPage = async ({
    params,
}: {
    params: {
        songId: string
    }
}) => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/')
    }

    const song = await db.song.findUnique({
        where: {
            id: params.songId,
        },
    })

    if (!song) {
        return redirect('/')
    }

    const requiredFields = [
        song.title,
        song.artist,
        song.duration,
        song.notes,
        song.lyrics,
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`

    return (
        <div className="p-6">
            <Link
                href={`/songs/`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to songs
            </Link>

            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Song setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-xl">
                            Customize your song
                        </h2>
                    </div>
                    <TitleForm
                        initialData={song}
                        songId={song.id}
                    />
                    <ArtistForm
                        initialData={song}
                        songId={song.id}
                    />
                    <NotesForm
                        initialData={song}
                        songId={song.id}
                    />
                    <DurationForm
                        initialData={song}
                        songId={song.id}
                    />
                    <LyricsForm
                        initialData={song}
                        songId={song.id}
                    />
                </div>
            </div>
        </div>
    )
}

export default SongIdPage
