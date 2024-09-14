import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { TitleForm } from './_components/title-form'
import { DateForm } from './_components/date-form'
import { LocationForm } from './_components/location-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const GigIdPage = async ({
    params,
}: {
    params: {
        gigId: string
    }
}) => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/')
    }

    const gig = await db.gig.findUnique({
        where: {
            id: params.gigId,
        },
    })

    if (!gig) {
        return redirect('/')
    }

    const requiredFields = [
        gig.title,
        gig.date,
        gig.location,
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`

    return (
        <div className="p-6">
            <Link
                href={`/gigs/`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to gigs
            </Link>

            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Gig setup
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
                            Customize your gig
                        </h2>
                    </div>
                    <TitleForm
                        initialData={gig}
                        gigId={gig.id}
                    />
                    <DateForm
                        initialData={{ ...gig, date: gig.date.toISOString() }}
                        gigId={gig.id}
                    />
                    <LocationForm
                        initialData={gig}
                        gigId={gig.id}
                    />
                </div>
            </div>
        </div>
    )
}

export default GigIdPage