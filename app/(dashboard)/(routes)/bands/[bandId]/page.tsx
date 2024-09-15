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

    return (
        <div className="p-6">
            <Link
                href="/bands"
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to bands
            </Link>

            <h1 className="text-2xl font-medium mb-6">
                Band setup
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    )
}

export default BandIdPage