import { prisma } from "@/lib/prisma"
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { GigForm } from './_components/gig-form'

const GigIdPage = async ({
    params,
}: {
    params: { gigId: string }
}) => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/')
    }

    const gig = await prisma.gig.findUnique({
        where: {
            id: params.gigId,
        },
    })

    if (!gig) {
        return redirect('/gigs')
    }

    return (
        <div className="p-6">
            <Link
                href="/gigs"
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to gigs
            </Link>

            <h1 className="text-2xl font-medium mb-6">
                Gig setup
            </h1>

            <GigForm
                initialData={gig}
                gigId={gig.id}
            />
        </div>
    )
}

export default GigIdPage