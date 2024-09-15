import { prisma } from "@/lib/prisma"
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BandForm } from './_components/band-form'
import { MembersForm } from './_components/members-form'

const BandIdPage = async ({
    params,
}: {
    params: { bandId: string }
}) => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/')
    }

    const band = await prisma.band.findUnique({
        where: {
            id: params.bandId,
        },
        include: {
            members: true,
        },
    })

    if (!band) {
        return redirect('/bands')
    }

    const isMember = band.members.some(member => member.userId === userId)

    if (!isMember) {
        return redirect('/bands')
    }

    const requiredFields = [
        band.name,
        band.members.length > 0
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`

    return (
        <div className="p-6">
            <Link
                href="/bands"
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to bands
            </Link>

            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Band setup
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
                            Customize your band
                        </h2>
                    </div>
                    <BandForm
                        initialData={band}
                        bandId={band.id}
                    />
                    <MembersForm
                        initialData={band}
                        bandId={band.id}
                    />
                </div>
            </div>
        </div>
    )
}

export default BandIdPage