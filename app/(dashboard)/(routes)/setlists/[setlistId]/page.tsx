import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { TitleForm } from './_components/title-form'

const SetlistIdPage = async ({
    params,
}: {
    params: {
        setlistId: string
    }
}) => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/')
    }

    const setlist = await db.setlist.findUnique({
        where: {
            id: params.setlistId,
        },
    })

    if (!setlist) {
        return redirect('/')
    }

    const requiredFields = [
        setlist.title,
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`


    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Setlist setup
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
                            Customize your setlist
                        </h2>
                    </div>
                    <TitleForm
                        initialData={setlist}
                        setlistId={setlist.id}
                    />
                </div>
            </div>
        </div>
    )
}

export default SetlistIdPage
