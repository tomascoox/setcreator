'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    date: z.string().nonempty('Date is required'),
})

type DateFormProps = {
    initialData: {
        date: string
    }
    gigId: string
}

export const DateForm = ({
    initialData,
    gigId,
}: DateFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date(initialData.date))

    const toggleEdit = () => setIsEditing(current => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: format(new Date(initialData.date), 'yyyy-MM-dd HH:mm'),
        },
    })

    const { isSubmitting, isValid } = form.formState
    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/gigs/${gigId}`, {
                ...values,
                date: selectedDate.toISOString(),
            })
            toast.success('Gig updated')
            toggleEdit()
            router.refresh()
        } catch (error) {
            console.error('Error updating gig:', error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Gig Date
                <Button
                    onClick={toggleEdit}
                    variant="ghost"
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit date
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {format(new Date(initialData.date), 'yyyy-MM-dd / HH:mm')}
                </p>
            )}
            {isEditing && (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                >
                    <div>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => {
                                if (date) setSelectedDate(date)
                            }}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd / HH:mm"
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            )}
        </div>
    )
}